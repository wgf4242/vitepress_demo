[在IDA pro下调试DLL的方法](http://www.360doc.com/content/15/0524/14/12129652_472898279.shtml)
TODO: 
19:00 tracing使用 - 2022强网杯Reverse——find_basic.mp4
Edit - Segments - Create Segments, start:0x96150, end: 0x97150, Segments - Rebase Programme: 0
## 环境配置

* 1.显示中文 https://blog.csdn.net/fuchaosz/article/details/104827280
  - Option - General - Strings - Default8bit - cp936 , 一定要在Shift+F12之前这样做。否则不要保存数据，重来
  - Shift+F12, 右击 Rebuild

## 入门 
* 连续的内存可设置 struct
* import 可看到 GetMessageBoxA, 在import处双击跳转
* 读取卡死 载入选择 Binary 


## 快捷键 

| 快捷键         | 描述                              |
| -------------- | --------------------------------- |
| Ctrl+N         | Set ip, 设置下一步走到哪个位置。  |
| Alt+D          | 修改变量类型                      |
| Go to Segments | Ctrl+S                            |
| %              | 跳转括号                          |
| Ins            | Insert anterior comment           |
| Shift + Ins    | Insert posterior comment          |
| :              | Insert inline comment             |
| ;              | Insert repeatable comment         |
| Alt+A          | String literials - 转长度(如UTF8) |
| Alt+Q          | Struct var                        |

## 窗口介绍

### 相对偏移查看
![](https://s2.loli.net/2022/08/23/wojXVv4NC9n3MQc.png)
或  Option - General Disassembly - Function Offsets

### 搜索二进制 Search Binary
如ff f8 ff 56, 定位f8 ff, Alt+B搜索 "f8 ff", 或反序无空格 "fff8"

### 技巧:变量转数组导出
1.按d切换到dword
2.按Y修改为数组 int dword_14001D000[44];
3.再Shift+E => initialized C Variable

### 结构体/Structure
添加方式1. Shift+F9, insert
添加方式2. Shift+F1, insert

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
[Finger加速](https://github.com/Holit/Finger-Multi-threading)

```bat
IDA_Pro\python38\python -m pip install finger_sdk
copy plugin_files IDA_Pro_7.7\plugins\
```

### Bindiff 对比恢复符号
1.编译一版有符号的。用ida保存database.
2.打开无符号文件, File-Bindiff, 载入i64文件
3.在Matched Functions 选中绿色，右击 Import

### d810 反混淆
Ctrl-Shift-D, 点击start, 再F5

### keypatch//assemble
16进制keypatch 要用0x33, 不能33h


## 使用技巧

### 让变量字符串/文本 直接显示值 
Y 改前面加 const 

### 无法F5的代码怎样处理
选中区域按p 会根据你框选范围 自动设置function end<br>
也可能需要手动patch地址改为 0xc3即retn

## FAQ
### 1. graph is too big , more than 1000 nodes
options - general - graph 
将1000改为10000

### 怎样查看函数使用寄存器
在伪代码视图j，鼠标放到函数上。

### 1. upx脱壳时：提示：无法读取被调试进程 XXXXXXX 的内存。

```   
方法1.去除随机地址。
方法2.请使用 52pojie WinXP虚拟机2.0。或者去掉随机地址ASLR
```
### Decompilation failure: 83A: too big function
[ACTF新生赛2020]SoulLike
解决办法是将ida /ctg目录下的hexrays.cfg文件中的MAX_FUNCSIZE=64 改为 MAX_FUNCSIZE=1024。

### View XMM registers
https://reverseengineering.stackexchange.com/questions/20035/view-xmm-registers-in-ida-pro-while-debugging

Debugger -> Debugger Windows -> XMM Registers子窗口
### 反汇编跟踪值 偏移查看
![](https://s2.loli.net/2022/09/18/O3u2rkyZUtLzwFA.png)

找v3+80的值, v3是栈顶, 在函数入口双击Str1入栈结构, 按G80, 定位到Str1的位置。就是v3+80即Str1.

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
4.按u再按p重分析 变成这样

```
var_4C6= byte ptr -4C6h
var_4B8= byte ptr -4B8h
arg_1E7FBF= byte ptr  1E7FC7h ; 5.双击这里 进栈按u， 再按F5即可
```

### ida python 调试
https://github.com/ioncodes/idacode

