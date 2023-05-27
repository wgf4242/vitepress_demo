使用 CreateProcess 创建进程就会有 双引号"
双击运行就不会有双引号
--- 缺陷： 用命令行也是 createprocess, 就会出错
但是可以 hook 附加。。

# Windows API

## 样本调试

| Column1                    | Column2                         | Column3                           | Column4                     | Column5                     |
| -------------------------- | ------------------------------- | --------------------------------- | --------------------------- | --------------------------- |
| LoadLibraryA 加载 DLL      | DeleteFileA 删除文件            | CreateToolhelp32SnapShot 枚举进程 | Module32FirstW              | GetTempPathA                |
| LoadLibraryW               | DeleteFileW                     | Heap32ListFirst                   | Module32NextW               | GetTempPathW                |
| LoadLibraryExA             | CreateThread 创建线程           | Heap32ListNext                    | Process32First              | CreateProcessA 创建进程     |
| LoadLibraryExW             | CreateRemoteThread              | Heap32First                       | Process32FirstW             | CreateProcessW              |
| GetModuleHandleA 查找模块  | OpenProcess 打开进程            | Heap32Next                        | Process32Next               | ShellExecuteA               |
| GetModuleHandleW           | WriteProcessMemory 跨进程写内存 | Module32First 枚举模块            | Process32NextW              | ShellExecuteW               |
| GetModuleHandleExA         | ReadProcessMemory 跨进程读内存  | Module32Next                      | PostQuitMessage             | WinExec                     |
| GetModuleHandleExW         | CreateMutexA 创建互斥体         |                                   | Toolhelp32ReadProcessMemory | UrlDownloadToFileA 下载文件 |
| CreateFileA 创建或打开文件 | CreateMutexW                    |                                   | ZwQueryInformationProcess   | UrlDownloadToFileW          |
| CreateFileW                | OpenMutexA 打开互斥体           |                                   | SetTimer                    | GetDesktopWindow            |
| ReadFile 读文件            | OpenMutexW                      |                                   |                             |                             |
| WriteFile 写文件           |                                 |                                   |                             |                             |

## 对抗分析

| Column1                                                    | Column2                                                           | Column3                                              | Column4                              |
| ---------------------------------------------------------- | ----------------------------------------------------------------- | ---------------------------------------------------- | ------------------------------------ |
| IsDebuggerPresent 检测调试器                               | VirtualProtectEx 修改内存权限触发异常检测调试器                   | GetLocalTime 执行耗时估算，超时认为被调试            | BlockInput 一直返回 TRUE 表明被 HOOK |
| CheckRemoteDebuggerPresent                                 | RtlQueryProcessHeapInformation 堆标志位检测调试器                 | GetSystemTime 执行耗时估算，超时认为被调试           | EnumWindows 检测父进程窗口标题       |
| NtQueryInformationProcess 多个标志位检测调试器，检测父进程 | RtlQueryProcessDebugInformation 堆标志位检测调试器                | GetTickCount 执行耗时估算，超时认为被调试            | SwitchDesktop 切换桌面反调试         |
| UnhandledExceptionFilter                                   | NtQuerySystemInformation 检测调试器                               | NtGetTickCount 执行耗时估算，超时认为被调试          | FindWindowA 探测调试器窗口类名       |
| OutputDebugStringA 检查错误码探测调试器                    | OopenProcess 打开 csrss.exe 成功表示有调试器                      | QueryPerformanceCounter 执行耗时估算，超时认为被调试 | FindWindowW 探测调试器窗口类名       |
| OutputDebugStringW                                         | CreateFileA 独占方式打开文件，失败表示有调试器                    | timeGetTime 执行耗时估算，超时认为被调试             | FindWindowExA 探测调试器窗口类名     |
| GetThreadContext 探测硬件断点                              | CreateFileW                                                       | NtQueryVirtualMemory 内存断点检测                    | FindWindowExW 探测调试器窗口类名     |
| GetProcessHeap LFH:低碎片堆                                | NtClose 捕获 EXCEPTION_INVALID_HANDLE 异常表示存在调试器          | AddVectoredExceptionHandler 注册 VEH                 | DbgSetDebugFilterState               |
| GetProcAddress 检测 HOOK                                   | CloseHandle                                                       | RemoveVectoredExceptionHandler 移除 VEH              | SwitchToThread                       |
| NtSetInformationThread 向调试器隐藏线程                    | NtQueryObject 探测调试对象                                        | DebugActiveProcess 创建子进程调试自己                | GetWriteWatch                        |
| NtYieldExecution                                           | SetUnhandledExceptionFilter 如果存在调试器，则回调不调用          | DbgUiDebugActiveProcess 创建子进程调试自己           |                                      |
| ReadProcessMemory int3 断点检测                            | RaiseException 抛出 DBG_CONTROL_C 等特殊异常，未接管则有调试器    | NtDebugActiveProcess 创建子进程调试自己              |                                      |
| VirtualProtect 修改内存权限触发异常检测调试器              | RtlRaiseException 抛出 DBG_CONTROL_C 等特殊异常，未接管则有调试器 | SetConsoleCtrlHandler 拦截 CTRL_C_EVENT 异常         |                                      |

## 网络

- send
- sendto
- WSASend
- WSASendTo
- recv
- inet_addr
- connect

## 对话框

| Column1                  | Column2                      | Column3                         | Column4                       |
| ------------------------ | ---------------------------- | ------------------------------- | ----------------------------- |
| MessageBoxA 弹对话框     | DialogBoxIndirectParamW      | DispatchMessageW                | SetWindowLongW                |
| MessageBoxW              | EndDialog 清除模态对话框     | CallWindowProcA 调用窗口过程    | SetWindowLongPtrA             |
| MessageBoxExA            | GetWindowTextA 取控件文本    | CallWindowProcW                 | SetWindowLongPtrW             |
| MessageBoxExW            | GetWindowTextW               | DefWindowProcA 默认消息处理     | ShowWindow 显示窗口           |
| MessageBoxIndirectA      | SetWindowTextA 设置控件文本  | DefWindowProcW                  | UpdateWindow 更新窗口         |
| MessageBoxIndirectW      | SetWindowTextW               | MessageBeep 系统警告声          | TranslateMessage 消息队列     |
| CreateWindowExA 创建窗口 | GetDlgItemTextA              | DrawTextA 文本描绘到矩形中      | GetMessageA 取消息队列        |
| CreateWindowExW          | GetDlgItemTextW              | DrawTextW                       | GetMessageW                   |
| CreateWindowA            | SetDlgItemTextA              | DrawTextExA                     | PeekMessageA 查消息队列       |
| CreateWindowW            | SetDlgItemTextW              | DrawTextExW                     | PeekMessageW                  |
| DestroyWindow 销毁窗口   | GetDlgItemInt 取控件中整数   | FindWindowA 获取窗口句柄        | SetMenu 建菜单                |
| DialogBoxA 模态对话框    | SetDlgItemInt 设置控件中整数 | FindWindowW                     | DestroyMenu 删除菜单          |
| DialogBoxW               | SendMessageA 发消息          | GetClipboardData 获取剪贴板数据 | DeleteMenu 删除菜单项         |
| DialogBoxParamA          | SendMessageW                 | CoInitialize 初始化 COM 库      | EnableMenuItem 菜单有无变灰   |
| DialogBoxParamW          | SendDlgItemMessage           | CoCreateInstance 创建 COM 对象  | EnableWindow 禁止键盘鼠标输入 |
| DialogBoxIndirectA       | IsDialogMessageA             | LoadIconA 载入图标资源          |                               |
| DialogBoxIndirectW       | IsDialogMessageW             | LoadIconW                       |                               |
| DialogBoxIndirectParamA  | DispatchMessageA 消息派发    | SetWindowLongA 设置窗口属性     |                               |

## 文件处理

| Column1                           | Column2                         | Column3                                   | Column4                               |
| --------------------------------- | ------------------------------- | ----------------------------------------- | ------------------------------------- |
| OpenFile 打开文件                 | CreateFileMappingA 创建文件对象 | MoveFileW                                 | GetPrivateProfileIntW                 |
| GetFileSize 取文件大小            | CreateFileMappingW              | MoveFileExA                               | GetPrivateProfileStringA 取字符串     |
| FindFirstFileA 查找文件           | CopyFileA 复制文件              | MoveFileExW                               | GetPrivateProfileStringW              |
| FindFirstFileW                    | CopyFileW                       | LoadCursorFromFileA 创建文件光标          | WritePrivateProfileStringA 设置字符串 |
| GetModuleFileNameA 查模块路径     | CopyFileExA                     | LoadCursorFromFileW                       | WritePrivateProfileStringW            |
| GetModuleFileNameW                | CopyFileExW                     | GetPrivateProfileStringA INI 重启验证常用 |                                       |
| OpenFileMappingA 打开文件映射对象 | SetFilePointer 设置文件读写位置 | GetPrivateProfileStringW                  |                                       |
| OpenFileMappingW                  | MoveFileA 移动文件              | GetPrivateProfileIntA                     |                                       |

## 时间处理

- SetSystemTime 设置系统时间
- TimerProc 回调函数
- SetLocalTime 设置本地时间
- 获取本地时间
- GetCurrentTime 获取系统时间
- GetFileTime 获取文件时间
- GetTickCount 系统启动后所经过的毫秒数
- CompareFileTime 比较文件时间
- SetTimer 创建定时器
- KillTimer 移除定时器
- timeSetEvent 多媒体定时器

## 进程函数

| Column1                         | Column2                           | Column3                         | Column4                               |
| ------------------------------- | --------------------------------- | ------------------------------- | ------------------------------------- |
| CreateThread 创建线程           | ZwReadVirtualMemory               | Process32First 取进程句柄       | Heap32ListNext 取堆句柄               |
| CreateRemoteThread 创建远程线程 | CreateProcessA 创建进程           | Process32FirstW 取模块句柄      | GetProcessHeap 取堆句柄               |
| GetModuleHandleA 查模块基址     | CreateProcessW                    | Process32Next 取堆句柄          | Heap32First 取进程堆相关信息          |
| GetModuleHandleW                | OpenProcess 打开进程              | Process32NextW 取进程堆相关信息 | Heap32Next 取进程堆相关信息           |
| OpenMutexA 打开互斥体           | ExitProcess 结束进程              | Module32Next 取模块句柄         | PostQuitMessage 终止线程              |
| OpenMutexW                      | ExitThread 结束当前线程           | Module32NextW                   | IsDebuggerPresent 检测调试器          |
| WriteProcesMemory 写内存        | TerminateProcess 终止进程         | Module32First                   | OpenFrocessToken 获取进程访问令牌句柄 |
| ZwWriteVirtualMemory            | TerminateThread 终止线程          | Module32FirstW                  | OpenThreadToken                       |
| ReadProcesMemory 读内存         | CreateToolhelp32Snapshot 进程快照 | Heap32ListFirst 取堆句柄        | ZwQueryInformationProcess             |

## 内存

| Column1                                  | Column2                         | Column3               | Column4                 |
| ---------------------------------------- | ------------------------------- | --------------------- | ----------------------- |
| FindWindow 取窗口句柄                    | CreateRemoteThread 创建远程线程 | VirtualAlloc 申请内存 | GetVersion 获取系统版本 |
| GetWindowThreadFrocessId 获取窗口进程 ID | CreateMutexA 创建互斥体         | HeapAlloc             | ZwAllocateVirtualMemory |
| OpenFrocess 打开进程                     | CreateMutexW                    | VirtualFree 释放内存  | ZwWriteVirtualMemory    |
| VirtualAllocEx 申请内存                  | GetModuleHandleA 查模块基址     | HeapFree              | ZwReadVirtualMemory     |
| WriteFrocessMlemory 写内存               | GetModuleHandleW                | LoadLibraryA 载入 DLL |                         |
| ReadProcessMemory 读内存                 | GetProcAddress 查函数地址       | LoadLibraryW          |                         |

## 磁盘

- GetDiskFreeSpaceA 获取磁盘信息
- GetDiskFreeSpaceExA
- GetDiskFreeSpaceExW
- GetDriveTypeA 判断磁盘驱动器类型
- GetDriveTypeW
- GetLogicalDrives 取驱动器字母
- GetLogicalDriveStringsA 取驱动器路径
- GetLogicalDriveStringsW

## 注册表

| Column1                    | Column2                     | Column3                | Column4                      |
| -------------------------- | --------------------------- | ---------------------- | ---------------------------- |
| ReglpenKeyA 打开注册表项   | RegQueryValueA 取注册表键值 | RegCloseKey 关闭注册表 | RegSetValueW                 |
| ReglpenKeyW                | RegQueryValueW              | RegDeleteKeyA 删除键值 | RegSetValueEx 设置指定项的值 |
| Reg0penKeyExA 重启验证常用 | RegQueryValueExA            | RegDeleteKey           | RegSetValueExW               |
| RegOpenKeyExW              | RegQueryValueExW            | RegEnumKeyEx 枚举子项  |                              |
| RegCreateKeyExA            | RegCreateKeyA 创建新项      | RegEnunKeyExW          |                              |
| RegCreateKeyExW            | RegCreateKeyW               | RegSetValue 设置默认值 |                              |

## VB

| Column1                           | Column2                          | Column3                        | Column4                    |
| --------------------------------- | -------------------------------- | ------------------------------ | -------------------------- |
| FindResourceA VB 校验             | rtcInputBox 输入框               | \_\_vbaI2Str 字符转 1 字节数值 | \_\_vbaStrCmp 字符串比较   |
| CreateFileA VB 校验               | GetMemStr                        | \_\_vbal4Str 字符转 4 字节数值 | \_\_vbaStrComp 字符串比较  |
| GetVolumeInformation 磁盘卷       | rtcRoValFromBstr                 | \_\_vbar4Str 字符转 4 浮点型   | \_\_vbaVarTstEq 比较变里   |
| MultiByteToWideChar A 转 U 字符串 | rtoGetPresendDate                | \_\_vbar8Str 字符转 8 浮点型   | \_\_vbaFreeStr             |
| WideCharTolultiByte U 转 A 字符串 | rtcBeep                          | \_\_vbavaradd 变量值相加       | \_\_vbaStrCopy             |
| GetFileSize 获取文件大小          | rtoTrimBstr 字符串去除空格       | \_\_vbavarsub 变量值相减       | \_\_vbaLenBstr             |
| VarCyFromStr 字符串转整型         | rtcMi dCharVar 字符串中取字符    | \_\_vbavarmul 变量值相乘       | \_\_vbavarfornext 循环结构 |
| arBstrFromI2 整型转字符串         | rtcLeftCharVar 字符串左边取字符  | \_\_vbavaridiv 变量值相除      | \_\_vbafreeobj 释放对象    |
| rtoFileLen VB 自校验              | rtcRightCharVar 字符串右边取字符 | \_\_vbavarxor 变量值异或       |                            |
| rtcFileLenth                      | StrConv 转换字符串               | \_\_vbaStrCat 字符串相连       |                            |
| rtcMsgBox 显示对话框              | rtcT8ValFromBstr 字符串转浮点数  | \_\_vbaVarCat 连接字串         |                            |

## VC/MFC

- lstrcmpA 字符串比较
- DefwindowProcA 调用默认窗口过程
- DefWindowProcW
- RegisterClassA 注册窗口类
- RegisterClassW
- RegisterClassExA
- RegisterClassExW
- FindResourceA 查找资源
- FindResourceW
- LoadResource 加载资源
- SetHandleCount 取变里地址
- IsWindowEnabled 可否输入键鼠

## 加密狗/穿山甲

| Column1                            | Column2                 | Column3                                | Column4                       |
| ---------------------------------- | ----------------------- | -------------------------------------- | ----------------------------- |
| CreateThread 寻找 OEP              | CreateFileMappingA 辅助 | RefreshDeviceList 深思 3               | GetLogicalDrives 取驱动器列表 |
| GeModuleHandleA 魔幻跳转           | LoadLibrary 载入 DLL    | DeviceIoControl 操作设备               | GetDriveTyPpeA 判断驱动器类型 |
| OperMutexA 1 转单进程两次改跳      | LoadLibraryWw           | Prestochangoselector                   | CreateFileA 读狗驱动          |
| GetSystemTime 补丁 KEY             | LoadLibraryExA          | FreeEnvirormentStringsA 释放环境字串块 | FindFirstFileA 查找文件       |
| VirtualProtect 2EAX 为 401000 返回 | LoadLibraryExW          | GetLogicalDriveStringsA 取列表         |                               |

## 其他

| Column1                      | Column2                 | Column3                           | Column4                  |
| ---------------------------- | ----------------------- | --------------------------------- | ------------------------ |
| FindFirstFileA 查找文件      | VirtualProtect Vmp 脱壳 | send 发送封包                     | SHFormatDrive 格盘 API   |
| ExitFrocess 程序退出         | ExitwindowsEx 关机断点  | WSASend 发送封包                  | RemoveDirectory 删除目录 |
| GetStartupInfoA 获取启动信息 | CreateFileA 自校验      | recv 接收封包                     | DeleteFileA 删除文件     |
| GetFileSize 获取文件大小     | GetVersion 易语言脱壳   | RtlAdjustPrivilege 易语言快速关机 | GetLastError 返回错误码  |
