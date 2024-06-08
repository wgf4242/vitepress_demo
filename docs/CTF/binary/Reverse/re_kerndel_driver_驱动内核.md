工具
debugview, windows驱动调试的小工具
windbg

# Win10禁用驱动签名
1. 设置 - 更改高级启动选项 - 高级启动, 疑难解答 - 启动设置
2. 启动后显示出菜单, 禁用驱动签名, 进入系统。
3. 管理员身份启动 Openark,  驱动管理 - 驱动工具箱 - 选择 sys 文件 - 写入注册表, 安装。
4. 管理员身份启动 DebugView(如果显示 Not Connected 为失败) 进行调试。
## Win7
重启时直接 F8 禁用驱动签名



# Download_Tools
- [Win7X86](http://download.microsoft.com/download/A/6/A/A6AC035D-DA3F-4F0C-ADA4-37C8E5D34E3D/setup/WinSDKDebuggingTools/dbg_x86.msi​)
/ [Win7x64](http://download.microsoft.com/download/A/6/A/A6AC035D-DA3F-4F0C-ADA4-37C8E5D34E3D/setup/WinSDKDebuggingTools_amd64/dbg_amd64.msi​)
/ [Win10x86](https://download.microsoft.com/download/4/2/2/42245968-6A79-4DA7-A5FB-08C0AD0AE661/windowssdk/Installers/X86%20Debuggers%20And%20Tools-x86_en-us.msi​)
/ [Win10x64](https://download.microsoft.com/download/4/2/2/42245968-6A79-4DA7-A5FB-08C0AD0AE661/windowssdk/Installers/X64%20Debuggers%20And%20Tools-x64_en-us.msi​)
/ [Windbg preview (WindbgX) from Microsoft Store​](https://www.microsoft.com/store/p/windbg/9pgjgd53tn86​)
/ [Windbg for windows 10(WinDbg 10.0.25921.1001/1.2308.2002.0)​](https://windbg.download.prss.microsoft.com/dbazure/prod/1-2308-2002-0/windbg.msixbundle​)

下载后 使用PowerShell 进入windbg.msixbundle所在目录​
运行 Add-AppxPackage .\windbg.msixbundle

# Article

[HITCON CTF 2022 Writeup-checker](https://www.bilibili.com/read/cv20807188/)
[2019 RoarCTF driverCuora.c](https://github.com/berTrAM888/RoarCTF-Writeup-some-Source-Code/blob/master/Reverse/zprotect/src/driverCuora.c)
[2019 RoarCTF driverCuora.c wp](https://www.secpulse.com/archives/115908.html)
[二进制 - VT虚拟化&内核驱动](https://www.bilibili.com/video/BV1Yw4m117SN/)
[x64环境下利用IDA+Windbg+VmWare实现对Nt!KiSystemStartup 的调试](https://mp.weixin.qq.com/s/001s9A9vvfAjWAdPSTturA)
