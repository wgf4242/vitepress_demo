解决方法
1. 跳转到前10行的代码造成死循环然后，附加调试。  https://www.52pojie.cn/thread-1831696-1-1.html
2. scyllahide等插件

# 反调试
* [Windows | 反调试技术学习](https://mp.weixin.qq.com/s/KPOt_ezHVwSNPlyblLByXQ)
* [anti_all_in_one](https://github.com/Hipepper/anti_all_in_one/wiki)
* [反调试技术整理](https://www.cnblogs.com/hed10ne/p/anti-debug-techs.html)
* https://ctf-wiki.org/reverse/windows/anti-debug/zwsetinformationthread/
* ZwSetInformationThread 第 2 个参数为 ThreadHideFromDebugger，若为 0x11 修改为其他值
* https://www.thestar0.cn/article/20f75995-1829-4fc6-9f33-13b64eb7e0be
* [done-适合入门【和三叶草一起打基础】—程序的保护技术](https://www.bilibili.com/video/BV1wB4y1k7x9)
* https://bbs.pediy.com/thread-225740.htm#msg_header_h1_3
* [反调试与反虚拟机](https://mp.weixin.qq.com/s/Ywf0Tg3fZDNBLqOLD7BRjg)
* [32位转64位 | 天堂之门-调试器的末路](https://mp.weixin.qq.com/s/oO2WBqksPSULYSP9of9_Og)

## IsDebuggerPresent()
当进程处于调试状态时, PEB.BeingDebugged成员值被设为1,

破解方法:将PEB.Being Debugged的值修改设置为0.

## PEB, BeingDebugged, NtGlobalFlag, fs:[30h], gs:[60h]
[PEB](https://blog.csdn.net/lyshark_lyshark/article/details/125851873)

```
typedef struct _PEB { // Size: 0x1D8
/*002*/ UCHAR BeingDebugged;						// 无调试器时 = 0，有调试器时 = 1, isDebuggerPresent()访问这个
...
/*068*/ LARGE_INTEGER NtGlobalFlag; 				// 有调试器时会被赋值为 70h = 112, 破解方法:将该PEB.NtGlobalFlag值设置为0;
}
```

 __32位进程：__ 
```
mov eax, fs:[30h]
cmp byte ptr [eax+2], 0
jne being_debugged
```

 __64位进程：__ 
```
mov rax, gs:[60h]
cmp byte ptr [rax+2], 0
jne being_debugged
```

 __WOW64 进程：__ 
```
mov eax, fs:[30h]
cmp byte ptr [eax+1002h], 0
```
## VEH,SEH

CRTStartup ->  __scrt_common_main() -> __scrt_common_main_seh()

VEH是进程的异常处理，有提供的API，只需要创建一个VEH然后再创建一个VEH的异常处理函数就好了。
SEH是线程的异常处理，用__try 和except语句使用，也可以创建SEH的处理函数和调用SHE来实现内部逻辑结构。

实例 wuhen.exe
```c
  if ( dword_7FF627741FC0 )
    v2 = 1;
  else  {
    dword_7FF627741FC0 = 1;
    if ( initterm_e((_PIFV *)&qword_7FF627736298, (_PIFV *)&qword_7FF6277362D0) )
      return 255i64;
    initterm((_PVFV *)&First, (_PVFV *)&Last); // 看First, Last
  }
// sub_7FF627722390(_EXCEPTION_POINTERS *a1) 设置Type为 _EXCEPTION_POINTERS
```

**解决方式:**
极客大挑战 EX: C++异常处理的题，不能直接反编译出throw对应的catch块，使用ida指令粒度的trace，虽然trace不到catch块，但是可以trace到catch块最后的jmp指令

## Ldr(+0xC)
调试进程时,堆区域会有特殊表示,表示正处于调试状态.最明显的便是未使用区域全部填充着0xEEFEEEFE,证明该进程正处于调试状态.

PEB.Ldr成员是一个指向_PEB_LDR_DATA结构体指针,该结构体恰好是在堆内存区域中创建的,所以在该区域中可轻松查找到OxEEFEEEFE的区域.

破解方法:把OxEEFEEEFE全部填充为nop掉


## ptrace
 ```c
#include "sys/ptrace.h"
#include <stdio.h>

int main(int argc, char *argv[], char **env) {
    if (ptrace(PTRACE_TRACEME, 0, 0, 0) == -1) {
        printf("don't trace me: \n");
        return 1;
    }
    printf("no one trace me: \n");
    return 0;
}
```

ptrace是 process trace的缩写,是linux中父进程对子进程进行跟踪控制的一个系统调用.

对于进程来说,每个进程只允许被PTRACE＿TRACEME一次.所以如果在程序开头就先进行一次调用,那么再用调试器调试时就无法进行调试了.


# android 安卓反调试

```bash
# 1.更改IDA调式默认端口：
root@phone:/data/local/tmp # ./as_64 -p12346
# 2. 特征文件检测 更改 android_server64 为 as_64
# 3. Tracepid 检测
```

# 花指令

[RE - Anti IDA 反反编译与反反反编译](http://note.youdao%2ecom/noteshare?id=3eb748f7bc67698d08107f963af77ab4&sub=6DC9E91DB3B24EC98DFA09E3AC3D6857)

例 0xE8为call指令, 后面四个字节为地址, 反汇编器就会一下子读取5个字节.同样,有的字节码会读取2、3、4个字节.<br>
例如两条汇编中出现一个0xE8字节, 跟着四个字节处理地址, call 0xbalabala 但其实后面四个字节码是其他指令.

**常见花指令**
1.互补条件跳转
```c
asm{
    jz code
    jnz code
    db thunkcode
code:
}
```

https://blog.node189.top/posts/junk-instructions
```c
_asm {
	call sub2
	_emit 0xEB
	jmp label2
sub2:
	add dword ptr[esp],1 ; esp 处指定的数字 + 1，返回的时候 eip 会跳过 _emit 0xE8
	retn
label2:
}
```
我们先来看看这段代码是如何运行的，这段代码中可能 _emit 这个伪代码有点陌生，这个东西主要是用来在汇编中插入数据用的，相当于在 call sub2 和 jmp label2 这个指令中间插入了 0xEB 这个数据

然后我们来看看这个代码是如何执行的，首先这个代码执行 call sub2 ，执行这个代码的时候首先会将 eip 指向 _emit 0xEB 这个数据，然后会将 eip 的值 push 入系统栈。然后转到 sub2 这个地方继续执行。

然后在 sub2 这个地方，代码将 esp 指向的数据 +1，而这个数据其实就是刚刚 push 入栈的先前 eip 数据，将 eip 数据 + 1 了以后，之后在执行 retn 的时候 pop eip，就会跳过 _emit 0xEB，执行 jmp label2，

所以可以看到这个地方 _emit 0xEB 插入了一个寂寞，但是做反逆向的人可不是乱加的，这可是有备而来。

因为 0xEB 对应的汇编指令是 jmp 指令，就算是 IDA 采用了什么牛逼哄哄的递归下降反汇编算法，毕竟不是真的执行代码，所以他还是会在分析 call sub2 这个指令之后，一边分析 sub2 的子过程代码，还会直接分析 call sub2 后的代码，于是 _emit 0xEB 插入的数据还是会被当成 jmp 指令来分析，然后导致 IDA 的分析出错。


2.构造永恒跳转
```c
asm{
    push ebx
    xor ebx,ebx
    test
    ebx,ebx
    jnz codel
    jz code2
code1:
    call 0xbalabala
code2:
    pop
    ebx
}
```

## 1.简单花 E9 ED  2022赣政杯.re2
E9 是 jmp 机器码

.text:00401395 E9 ED 58 E9 8C 00 00 00        jmp     near ptr 8D296C87h
E9 ED 是 jmp某地址 E9 8C是 jmp 下跳0x0000008C, 第一个跳有问题nop掉。
E9 - jmp， 读取到E9时，读四个字节的数据作为跳转地址的偏移，所以才会看到错误的汇编代码。

2.[破坏堆栈](https://blog.csdn.net/Captain_RB/article/details/123858864)
```
		test eax,0         // 构造必然条件实现跳转，绕过破坏堆栈平衡的指令
		jz label           
		add esp,0x1        // 这里不会执行，但反编译器报错，nop掉。
		label:
```

[制作花1](https://www.anquanke.com/post/id/208682)

patch方法
方法0 选中Ctrl+N
方法1 单击要修改位置, Alt+4(HexView), F2 修改为90, F2保存
方法2 Edit Patch - change bytes 为90

常见花指令，进行nop, 其他代码按c转成代码 再按P ,再F5
```
xor eax,eax
jz xxxxx
```
## 简单强制跳转花
moectf2022 chicken_soup.zip
```asm
.text:00401088 57                            push    edi
.text:00401089 74 03                         jz      short near ptr loc_40108D+1     ; jz跳到8d+1
.text:00401089
.text:0040108B 75 01                         jnz     short near ptr loc_40108D+1     ; jnz跳到8d+1
.text:0040108B
.text:0040108D
.text:0040108D                               loc_40108D:                             ; CODE XREF: .text:00401089↑j
.text:0040108D                                                                       ; .text:0040108B↑j
.text:0040108D E9 C7 45 F8 00                jmp     near ptr 1385659h               ; 所以jmp识别的不对, nop掉E9, 先U再Ctrl+N
```
肯定跳 8d+1的位置即 C7 45 F8 这里。E9命令会略过，不会执行。JMP识别的不对报错。按u再Ctrl+N nop掉E9, 再F5

## 连续的push, buuoj Findkey,

```
.text:00401640                                         ; 这里开始变灰了，分析不了了。
.text:00401640 loc_401640:                             ; CODE XREF: sub_401014↑j
.text:00401640                 push    ebp
......
.text:00401918                 push    offset byte_428C54
.text:0040191D
.text:0040191D loc_40191D:                             ; CODE XREF: .text:0040193D↓j  ;这里标红提示出错了
.text:0040191D                 push    offset byte_428C54     ; mark1
.text:00401922                 call    _strlen
.text:00401927                 add     esp, 4
.text:0040192A                 push    eax
.text:0040192B                 push    offset byte_428C54
.text:00401930                 call    sub_40101E
.text:00401935                 add     esp, 0Ch              ; mark1-1
.text:00401938                 nop
.text:00401939                 jz      short loc_401948
.text:0040193B                 jnz     short loc_401948
.text:0040193D                 jmp     short near ptr loc_40191D+2 ;mark2
```
方式1 mark1处nop, 导致mark1-1栈不平衡，要修复栈
方式2 mark2处nop. 在 0x401640 处按 P 创建函数并 F5，首先观察他的 else 分支：

## [HDCTF2019]Maze
IDA载入
```
0040102E      E8 58C745EC   call EC85D78B
```
E8花指令。去掉, 在main起始处按p恢复

```
.text:00401000                 push    ebp           ; main处这里按p
.text:00401001                 mov     ebp, esp
.text:00401003                 sub     esp, 18h
.text:00401006                 push    ebx
.text:00401007                 push    esi
.text:00401008                 push    edi
```
## Java标识符混淆

用 Proguard 混淆

## OLLVM(控制流平坦化)
## SEH 结构化异常处理
https://www.yunzh1jun.com/2022/04/14/WindowsSEH/

IDA 伪代码里看不到throw后的catch块，因为由libc决定的返回 ida不会向后分析。但是汇编里能看到。

破解方法：通过分析对应catch块，改为jmp

```c
#include <cstdio>
#include <exception>

using namespace std;

int main() {
    int num;
    scanf("%d", &num);
    try {
        if (num == 1) throw 'c';
        else if (num == 2) throw 1;
        else throw "error";
    }
    catch (char ch) {
        printf("hello world\n");
    }
    catch (int t) {
        printf("hello exception\n");
    }
    catch (const char *msg) {
        printf("%s\n", msg);
    }
    return 0;
}
```

![](https://s2.loli.net/2022/09/17/iCH1lNo8BhDMqyv.jpg)

