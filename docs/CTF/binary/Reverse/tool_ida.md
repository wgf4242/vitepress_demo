[在 IDA pro 下调试 DLL 的方法](http://www.360doc.com/content/15/0524/14/12129652_472898279.shtml)
TODO:
19:00 tracing 使用 - 2022 强网杯 Reverse——find_basic.mp4
Edit - Segments - Create Segments, start:0x96150, end: 0x97150, Segments - Rebase Programme: 0

## 环境配置

- String: 1.显示中文 https://blog.csdn.net/fuchaosz/article/details/104827280
  - Option - General - Strings - Default8bit - cp936 , 一定要在 Shift+F12 之前这样做。否则不要保存数据，重来
  - 方式 2 选中地址，按 alt+a，设置 c style 即可
  - Shift+F12, 右击 Rebuild
  - 方式 3 字符串窗口 右键 - Setup - 勾 Unicode C-Style(16 bit)
- String: 显示 16bit: Shift+F12, 右击 - Setup - × C-Style, √, Unicode C-Style(16bits)
- 加载程序后 选项 - Auto Comments √
- General - Instruction indentation : 20
- 关闭自动反汇编: 工具栏 绿色按钮切换/Analysis, 才能方便手动改机器码去花指令
- 汇编窗口不能显示伪代码: `HKEY_CURRENT_USER\Software\Hex-Rays\IDA\Hidden Messages`

## 入门

- 连续的内存可设置 struct
- import 可看到 GetMessageBoxA, 在 import 处双击跳转
- 读取卡死 载入选择 Binary

- 基址设置: See Edit-->Segments-->Rebase program
- 创建结构体 struct: 右击 `func(__int64 a1)` 中的 a1 -> Create new struct type

### ida 中的汇编与类型

defs.h

| Type         | value      |       |
| ------------ | ---------- | ----- |
| BYTE0/LOBYTE | 0x11223344 | 取 44 |
| BYTE1        | 0x11223344 | 取 33 |
| BYTE2        | 0x11223344 | 取 22 |
| HIBYTE       | 0x11223344 | 取 11 |
|              |            |       |
|              |            |       |

### 界面

蓝色变量 - 全局变量

### 符号修复

```c
*(&::ptr + (unsigned int)cnt) = ptr;
// void* ptr -> void* ptr[]
```

### 枚举值修复

举例 ptrace: `sub_44CC50(12LL, a1, 0LL, v7);`
伪代码里面的 sub_44CC50 就是 ptrace 函数，点进去可以看到 sys_ptrace 的调用。

选中 12 这个数字，按下快捷键 "M"，在弹出的窗口中选择对应的常量值，在弹出的窗口 CTRL + F 搜索 ptrace 相关的常量值，可以找到 PTRACE_GETREGS，不知道常量值名字可以去查查开
`sub_44CC50)(PTRACE_GETREGS, a1, 0LL, v7);`

快捷键 CTRL + ALT + X，查看全局对 field_40 这个字段的交叉引用, 再进一步修正

## 快捷键

| 快捷键          | 描述                               |
| --------------- | ---------------------------------- |
| Ctrl+E          | entrypoit                          |
| v               | convert function to void           |
| Ctrl+N          | Set ip, 设置下一步走到哪个位置。   |
| Alt+D           | 修改变量类型                       |
| Ctrl+S          | Go to Segments                     |
| Ctrl+G          | Choose Address                     |
| %               | 跳转括号                           |
| Ins             | Insert anterior comment            |
| Shift + Ins     | Insert posterior comment           |
| :               | Insert inline comment              |
| ;               | Insert repeatable comment          |
| Alt+A           | String literials - 转长度(如 UTF8) |
| Alt+Q           | Struct var                         |
| Alt+F7          | Run Script                         |
| Alt+P           | Patch Bytes                        |
| 右击 E          | Edit Function                      |
| Debug \| Ctrl+E | SetIP                              |
| Debug \| F4     | 运行到光标                         |
| CTRL + ALT + X  | 全局对 field_40 字段引用           |

## 窗口介绍

### 相对偏移查看

![](https://s2.loli.net/2022/08/23/wojXVv4NC9n3MQc.png)
或 Option - General Disassembly - Function Offsets

### 搜索二进制 Search Binary

如 ff f8 ff 56, 定位 f8 ff, Alt+B 搜索 "f8 ff", 或反序无空格 "fff8"

### 技巧:变量转数组导出

1.按 d 切换到 dword 2.按 Y 修改为数组 int dword_14001D000[44]; 3.再 Shift+E => initialized C Variable

### 结构体/Structure

添加方式 1. Shift+F9, insert
添加方式 2. Shift+F1, insert

怎样删除?

```
00000000 keys struc ; (sizeof=0x7F, mappedto_37)
00000000 data db 64 dup(?)
00000040 index db ?
00000041 field_41 dw ?   // 删除:按U, Ctrl+S
00000043 db ?            // 按d添加名称
00000044 d2 dd 15 dup(?) //
0000007F keys ends
```

### 已有类型

```
_BYTE
```

## Debug

### gdb server

```shell
gdbserver *:23946 ./elf
gdbserver 0.0.0.0:23946 ./elf
```

## Plugins

diaphora,可以将函数名、注释、结构体等的先前版本移植到新版本
BinDiff（程序本体需手动安装） 和 ret-sync 插件
BinCAT 插件，需要手动导入脚本安装

### Finger 符号还原

[Link](https://sec-lab.aliyun.com/2021/10/15/Finger：一款函数符号识别神器/)
[Finger 加速](https://github.com/Holit/Finger-Multi-threading)

```bat
IDA_Pro\python38\python -m pip install finger_sdk
copy plugin_files IDA_Pro_7.7\plugins\
```

### Bindiff 对比恢复符号

1.编译一版有符号的。用 ida 保存 database. 2.打开无符号文件, File-Bindiff, 载入 i64 文件 3.在 Matched Functions 选中绿色，右击 Import

### d810 反混淆

Ctrl-Shift-D, 点击 start, 再 F5

### keypatch/assemble/汇编修改

16 进制 keypatch 要用 0x33, 不能 33h
ida 自带 assemble 要用 33h, 不能 0x33

printf 改 puts, 注意 printf 没有换行符, puts 会有换行符. 产生多余的换行可能 check 失败.

```sh
# printf改 puts 使用 plt段的 puts地址, 而不是 _puts, 用.puts
# .plt.sec:0010C0                               ; int puts

# keypatch call地址时会自动修改偏移, 可以 call .puts
Assembly: call 0x10c0
```

如何手动计算偏移值

```py
# .plt.sec:0010C0                               ; int puts
.text:0000000000001462 E8 59 FC FF FF                call    _puts
.text:0000000000001467 48 8D 3D EA 0C 00 00          lea     rdi, byte_2158
.text:000000000000146E E8 4D FC FF FF                call    _puts
.text:0000000000001473 83 45 FC 01                   add     [rbp+var_4], 1

# E8是call的机器码
hex(0x10C0-0x1467 & 0xffffffff) # 0xfffffc59
hex(0x10C0-0x1473 & 0xffffffff) # 0xfffffc4d
```

## 使用技巧

### 让变量字符串/文本 直接显示值

Y 改前面加 const

### 无法 F5 的代码怎样处理

选中区域按 p 会根据你框选范围 自动设置 function end<br>
也可能需要手动 patch 地址改为 0xc3 即 retn

## 使用 bindiff 识别符号

```sh
gcc -static main.c
# 1.编译后用ida打开a.out 保存idb文件
# 2.ida打开目标target,  file - bindiff, 打开idb文件
# 3.import全绿函数识别
```

## FAQ

[Link](https://blog.csdn.net/CSNN2019/article/details/117219906)

### 变量按 a 后，还是不能显示中文，自动恢复少了 2 个 bytes.变成旧的字符了。

按 n 重命名变量。

### 1. graph is too big , more than 1000 nodes

options - general - graph
将 1000 改为 10000

### 怎样查看函数使用寄存器

在伪代码视图 j，鼠标放到函数上。

### 1. upx 脱壳时：提示：无法读取被调试进程 XXXXXXX 的内存。

```
方法1.去除随机地址。
方法2.请使用 52pojie WinXP虚拟机2.0。或者去掉随机地址ASLR
```

### Decompilation failure: 83A: too big function

[ACTF 新生赛 2020]SoulLike
解决办法是将 ida /ctg 目录下的 hexrays.cfg 文件中的 MAX_FUNCSIZE=64 改为 MAX_FUNCSIZE=1024。

### View XMM registers

https://reverseengineering.stackexchange.com/questions/20035/view-xmm-registers-in-ida-pro-while-debugging

Debugger -> Debugger Windows -> XMM Registers 子窗口

### 反汇编跟踪值 偏移查看

![](https://s2.loli.net/2022/09/18/O3u2rkyZUtLzwFA.png)

找 v3+80 的值, v3 是栈顶, 在函数入口双击 Str1 入栈结构, 按 G80, 定位到 Str1 的位置。就是 v3+80 即 Str1.

### LOBYTE, BYTE0

```c
//测试 LOBYTE、HIBYTE
typedef unsigned char   uint8;
typedef unsigned short   uint16;
typedef unsigned long DWORD_PTR;
#define BYTE  uint8
#define WORD  uint16
#define DWORD unsigned long
#define LOBYTE(w)           ((BYTE)(((DWORD_PTR)(w)) & 0xff))
#define HIBYTE(w)           ((BYTE)((((DWORD_PTR)(w)) >> 8) & 0xff))
#define BYTEn(x, n)   (*((BYTE*)&(x)+n))
#define WORDn(x, n)   (*((WORD*)&(x)+n))
#define BYTE0(x)   BYTEn(x,  0)         // byte 0 (counting from 0)  添加此宏定义
#define BYTE1(x)   BYTEn(x,  1)         // byte 1 (counting from 0)
#define BYTE2(x)   BYTEn(x,  2)
#define BYTE3(x)   BYTEn(x,  3)
#define BYTE4(x)   BYTEn(x,  4)


	unsigned int data = 0x12345678;

	printf("%04X\n", LOBYTE(data));//0078 ，所以LOBYTE相当于就是BYTE0；
	printf("%04X\n", HIBYTE(data));//0056  所以HIBYTE相当于就是BY
```

### 1410: stack frame is too Big

双击变量进入栈,

函数如下

```
var_1E84C8= word ptr -1E84C8h
var_1E84C6= byte ptr -1E84C6h
var_1E84B8= byte ptr -1E84B8h
var_39= byte ptr -39h  ; 3. 按里按u再再按p
; __unwind {
push    r15
mov     edi, 0Ah
push    r14
lea     r14, format
push    r13
xor     r13d, r13d
push    r12
push    rbp
push    rbx
sub     rsp, 1E8558h  ; 1. patch小点 rsp, 558h
...
...
add     rsp, 1E8558h  ; 2. patch小点 rsp, 558h
...
retn
```

4.按 u 再按 p 重分析 变成这样

```
var_4C6= byte ptr -4C6h
var_4B8= byte ptr -4B8h
arg_1E7FBF= byte ptr  1E7FC7h ; 5.双击这里 进栈按u， 再按F5即可
```

### main2 endp ； sp-analysis failed 修复 sp

- 可能是 1 个函数被拆分错了，把下面的 function u 掉。main u 掉。在 main 处按 p 即可。见 lld 的附件.zip

一. --
一个明显错误的地方就是 0X00403C22 到 0X00403C27 处，在调用了 firstClass_Init 函数(有一个参数)后，栈顶指针还是 02C，没有变成 028，解决办法：

1、在 0X00403C22 处点击 02C 栈顶，右键点击 Change stack pointer…（快捷键 Alt+K），修改成 0X4，如下图：

2. --

但是 main 函数报了错两种方法修复
0000004021E9 main endp ; sp-analysis failed (Alt+K)
1.main 的 endp 出错下方的函数 全部按 u, 直到 0x402220, 右击 main, edit function 修改到 0x402220。然后在分析的代码处点击按 C。
2.main 包含的全部函数按 u,按 u, 回到 main 头部 0x402219, 按 p

### ida python/调试

[函数名变化 ](https://hex-rays.com/products/ida/support/ida74_idapython_no_bc695_porting_guide.shtml)

https://github.com/ioncodes/idacode

### 函数显示中文

```
1.在ida.cfg文件中搜索Block_CJK_Unified_Ideographs，去掉Block_CJK_Unified_Ideographs这一行前面的注释
2.将ida.dll文件放入IDA64中，然后字符串搜索[](),*&，将其有下划线这一行nop掉
```

# plugins

[IDA 插件大赛 2022](https://mp.weixin.qq.com/s/zhjNHLJbTDHdQtoToe0hvg)

## lazyida

1.功能 1: 右击数据 convert 转化成 python list 2.功能 2: 右键扫描格式化字符串漏洞的功能，这个不多讲，直接右键，scanformat 就好了

## Gepetto/ChatGPT AI 版反编译

https://github.com/JusticeRage/Gepetto

## pwntools 和 ida 联合调试

```bash
sudo ./linuxserver64

socat TCP-LISTEN:12345,fork,reuseaddr EXEC:./test,pty,rawer
# 1. pwntools
remote('127.0.0.1', 12345)
pause()
# 2. ida attach to process
```

## WinDBG/API hooks

attach 时用 WinDBG

load DMP 文件时自动加载

```sh
WinDBG
# register
WinDBG>r
# threads
WinDBG>~
WinDBG>!for_each_module !chkimg -d @#ModuleName
WinDBG>!chkimg -d user32.dll
```

API attach

1. vs 调试状态下启动程序
2. ida: Debugger - Attach - Windbg - Debug options - set specific optons - None Invasive user-mode process attach

- 右击 Module 窗口的 Debug 文件, Load debug symbol

# Article

[IDAPython 速查表](https://www.cnblogs.com/hed10ne/p/idapython_cheatsheet.html)
[IDAPython/Tracing calls tutorial](https://magiclantern.fandom.com/wiki/IDAPython/Tracing_calls_tutorial)

[IDAPython 系列 —— 画出两个函数的交叉引用图](https://mp.weixin.qq.com/s/p_YHwFuXmPWXGDhpLa9Cyg)
[IDA Python 去混淆](https://mp.weixin.qq.com/s/a7RLme8bTWiB6MfNT-5AKg)

[怎么让 IDA 的 F5 支持一种新指令集？](https://mp.weixin.qq.com/s/b8TeuClegr6Bj0cveaPkIA)

## plugin

[ida 脚本开发环境配置 idapython&idacpp 三端环境(win、mac、linux)](https://mp.weixin.qq.com/s/uU67NR1lHpIMS1gGnZcfOw)

[IDA 插件编写入门及油管博主种草](https://www.bilibili.com/video/BV1Uj41117BY/)
[给 IDA 写个 small 插件](https://mp.weixin.qq.com/s/B1rRYFEmZoTRd0KHxDLF7g)

[plugins | 小巧可爱的 IDA 插件——uEmu 超级模拟器](https://mp.weixin.qq.com/s/Bksot8q9qn6OveXyPnPrrA)
