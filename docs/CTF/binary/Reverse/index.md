- [[toc]]

- [Frida](./frida)

- [相关加密](./recrypto.md)

## TODO

https://www.52pojie.cn/thread-1623713-1-1.html finger 符号还原

## 解题思路

前置准备

1. [反调试, 开插件 | 打补丁](anti-debug_%E5%8F%8D%E8%B0%83%E8%AF%95.md)
1. 资源文件 0x80, 0xff 异或
1. 二进制搜索
1. 找 ip 端口 上传微步
1. 放 die 看 EntryPoint 位置。
1. 放 die 看编译器, 如果是 gcc, IDA: Option - Compiler - GNU C++
1. 看 FindCrypt
1. bindiff, 恢复符号, 见 re_symbols.md
1. 见 [程序执行顺序](#程序执行顺序), 有没 SEH
1. ida 打不开/ghidra/cutter
1. apk: jadx, jeb 都打开 jeb 能解些 brainfucks
1. 输入 fuzz 模糊测试
   - L1. 输入 1 ascii: 49, -> out1
   - L1. 输入 b ascii: 98, -> out2
   - L1. 对比结果 out2/out1 看看是怎么变换的
   - L2. 输入 32 个 a, 看输出是不是等量 线性变换。能否输入全部字符直接换表
1. 输入输出变换了大端小端
2. 调试原生文件如dll/so, 关注导出表

1.简单题目 patch 调试 set EIP 到后面执行一下 2.多用调试直接过逻辑看结果。 1.搜到关键字如 0x33445566, 先 google/baidu ctf 0x33445566 4.没去符号 函数调用少 C 代码复制出来改一改爆破更快的 5.或者 asm 改成 call puts 6.已知算法未成功执行，检查有符号 还是无符号，可能有改变。 6.调试时

- 1. 通过%s 搜 scanf scanf 如果没变量 断点动调, 切汇编再 F5 可能不一样
- 3. 考虑给内存地址打硬件断点
- 2. 在 flag 查交叉引用
- 3. 经常看图, 看汇编, encflag 通常在分叉前一点
     1.smc 2.搜索++ 当作索引 找关键信息 3.两串密文先猜异或
     4.key/enc 看交叉引用前面有没有修改，有修改用动调拿到修改后的 5.迷宫题多观察迷宫

* 1.可能暴露起点和终点位置
* 2.直接找到上下左右字母。DFS 解题 7.变量混淆执行流程

- ida D810 选 examples_anel。去除 变量混淆控制流。

1. mrb 文件 - ruby 字节码 16 进制显示 RITE0300 , CISCN2022 babycode https://docs.qq.com/doc/DRmhseWVMV1dJbUR1
2. swift ast https://docs.qq.com/doc/DRmhseWVMV1dJbUR1 CISCN2022 babytree
3. ebpf 程序，使用 bpftool 提取字节码, [西湖论剑 2023-Berkeley](http://lu1u.bxsteam.tk/2023/02/03/2023XHLJ-RE/#Berkeley) , [2022 虎符 ftype](https://lu1u.bxsteam.tk/2022/03/28/RE_Challenge/) [字节码逆向](https://tttang.com/archive/1550/)

解题技巧

- patch 程序， 输出匹配的密文数量到 exitcode。 2023 安洵杯 SYCTF ez_cpp , 见 ## 解题技巧

## 程序执行顺序

1.  Shift+F4, Name: **\_CTOR_LIST** 有没有对应函数地址. function: \_\_do_global_ctors() : constructor
2.  init_array
3.  main
4.  fini_array . function: **do_global_dtors, Name: **DTOR_LIST\_\_

```c
  sub_401800(v14, v13, v15); // main前这里也可能是 init
  _initenv = envp;
  result = main(argc, (const char **)argv, (const char **)envp);
```

## C/IDA 相关

```
plugins\hexrays_sdk\include\defs.h  包含各种类型
```

## 程序头修改

1. 55 48 89 E5

```
push rbp
mov rbp,rsp
```

2.  机器码 55 56 53 48 49 E5

```asm
push rbp
push rsi
push ebx
mov rbp, rsp
```

## angr

- [angr 题库](https://github.com/jakespringer/angr_ctf)

- [参照文章](https://www.anquanke.com/post/id/212816)

## 提问

ida 调试时 watch view 怎样计算地址值比如 \*(Map+1100+1)
idapython 怎样通过变量名获取变量地址

## WinAPI

https://docs.microsoft.com/en-us/windows/win32/api/wincrypt/nf-wincrypt-cryptcreatehash
ALG_ID https://docs.microsoft.com/en-us/windows/win32/seccrypto/alg-id

| Identifier | Value  | Description |
| ---------- | ------ | ----------- |
| CALG_MD5   | 0x8003 | MD5         |
| CALG_SHA   | 0x8004 | SHA1        |
| CALG_AES   | 0x660E | AES128      |

CryptCreateHash(phProv, Algid, 0, 0, &phHash); 定义加密类型 创建一个空哈希对象
CryptGetHashParam(phHash, 2u, v6, (DWORD \*)v8, 0); 将值输出到 v6 的地址
CryptDeriveKey 从一个密码中派生一个密钥

CryptEncrypt 和 CryptDecrypt 要求在被调用前指定一个密钥。
CryptEncrypt 使用指定加密密钥来加密一段明文

```ts
BOOL CryptDeriveKey(
  [in]      HCRYPTPROV hProv,
  [in]      ALG_ID     Algid,
  [in]      HCRYPTHASH hBaseData,
  [in]      DWORD      dwFlags,
  [in, out] HCRYPTKEY  *phKey
);
BOOL CryptEncrypt(
  [in]      HCRYPTKEY  hKey,
  [in]      HCRYPTHASH hHash,
  [in]      BOOL       Final,
  [in]      DWORD      dwFlags,
  [in, out] BYTE       *pbData,
  [in, out] DWORD      *pdwDataLen,
  [in]      DWORD      dwBufLen
);

```

### VirtualProtect()

https://zhuanlan.zhihu.com/p/66797526
https://www.google.com/search?q=ctf+virtualprotect

在 Windows 程序中使用了 VirtualProtect()函数来改变虚拟内存区域的属性。

```c
#include <Memoryapi.h>
BOOL VirtualProtect(
  LPVOID lpAddress,
  SIZE_T dwSize,
  DWORD  flNewProtect,
  PDWORD lpflOldProtect
);
```

VirtualProtect()函数有 4 个参数，lpAddress 是要改变属性的内存起始地址，dwSize 是要改变属性的内存区域大小，flAllocationType 是内存新的属性类型，lpflOldProtect 内存原始属性类型保存地址。而 flAllocationType 部分值如下表。在 SMC 中常用的是 0x40。

#### VirtualProtect dump 出的程序无法执行，可能是 32 位。64 位问题。

https://mp.weixin.qq.com/s/lGPtsd8hPJnltZ8OJqOCiw
loader 题目

010 editor 可修改 32 位，64 位。

```
struct IMAGE_FILE_HEADER FileHeader
 -- enum IMAGE_MACHINE Machine  : I386 (14Ch)  改 amd64
struct IMAGE_OPTIONAL_HEADER32 OptionalHeader
 -- enum OPTIONAL_MAGIC Magic   : PE32 (10Bh) 改 PE64
```

## CPP/STL

- [STL 容器逆向与实战](https://mp.weixin.qq.com/s/bfzeGbieYWaPS3_iB-gSeg)

## MFC

https://blog.csdn.net/Sanky0u/article/details/81568483
https://gift1a.github.io/2022/04/23/DASCTF-FATE-Reverse/#more

## objective-c

https://blog.trackonyou.top/2021/06/26/a1aab78dc414/

## vm 虚拟机系统

go:VNCTF2022 CM 狗 main\_\_ptr_MzVm_init

## Javascript/js

js -- decodeObfuscator

### uniapp

## 混淆

[movfuscator 混淆了解一下 CTF](https://blog.csdn.net/qq_33438733/article/details/79860304)

## PE/壳

[脱壳学习（一）- 计算机底层基础](https://mp.weixin.qq.com/s/98xIIROLQPjsxQ1rAiSDkg)
[脱壳学习（二）- 反“反调试”篇](https://mp.weixin.qq.com/s/pSaTZSd0ouacZ3A4RxeWfg)
[逆向脱壳（三） - 完结篇](https://mp.weixin.qq.com/s/svh_jfph_PiSpN3enGtYXQ)
[常见的壳与脱壳方式](https://mp.weixin.qq.com/s/4uZxbSFPnkRFR_3hqsQvKg)
[android | 脱壳实战-Frida-Apk-Unpack](https://mp.weixin.qq.com/s/gvWaSaBiD-bQCgtH7-agQA)

### UPX/ESP 定律

- [UPX防脱壳机脱壳、去除特征码、添加花指令小探](https://www.52pojie.cn/thread-326995-1-1.html)
- [完美 UPX 脱壳------之投怀送抱篇（适合所有变形）](https://www.52pojie.cn/thread-1673206-1-1.html)

  1.检查是 UPX，但无法脱壳。

  1)段头部(Section Header) 错误。如 2022 网鼎杯青龙-fakeshell, 010 搜索 FUK 替换为 UPX。

- Functions 向右拉也看得到 Segments 不对
- 可用 die 查看 全部节, 找到 FUK 节, 双击 × 只读 可修改值

UPX 标识修改

```sh
UPX0       00001000  0000F000   00000400  00000000   E0000080                   # 第1处
UPX1       00010000  00009000   00000400  00008400   E0000040                   # 第2处
000003D0   00 00 00 00 00 00 00 00  00 00 00 33 2E 39 31 00              3.91   #
000003E0   55 50 58 21 0D 09 02 08  5A 34 28 27 60 95 D0 97   UPX!    `         # 第3处
```

2.脱壳方式
修复头后, 搜 popad, 运行跳后走几步到 push ebp dump

3.检查overlay_offset位置有没有写数据, 把overlay_offset的位置 补上去p_info字段的偏移 就可以用upx -d了


### VMP

https://bbs.pediy.com/thread-271546-1.htm
[某驱动脱壳 vmp](https://wbglil.github.io/2021/04/05/%E6%9F%90%E9%A9%B1%E5%8A%A8%E8%84%B1%E5%A3%B3%20vmp/)

### Themida/WinLicense

[unlicense 脱](https://www.52pojie.cn/forum.php?mod=viewthread&tid=1647083)
[Download](https://github.com/ergrelet/unlicense/releases)

## frida

### x86

mkdir /data/local/tmp
adb push frida-server-15.1.17-android-x86 /data/local/tmp
adb shell
cd /data/local/tmp
chmod +x frida-server-15.1.17-android-x86
./frida-server-15.1.17-android-x86

### arm64

```shell
adb push frida-server-15.1.17-android-arm64 /data/local/tmp
adb shell
mkdir /data/local/tmp
cd /data/local/tmp
chmod +x frida-server-15.1.17-android-arm64
./frida-server-15.1.17-android-arm64

/data/local/tmp/frida-server-15.1.17-android-arm64
```

新窗口

```
# 手机和电脑通过adb 通信
adb forward tcp:27042 tcp:27042
# 测试
frida-ps -U
frida-dexdump -p <pid> -U
```

### frida-commands

```
frida-ls-devices
frida-ps -D 458f4aa5 -a
```

### 追踪 app

```
adb devices -l
frida-ps -Ua
frida-trace -U -i open rock_paper_scissors
```

## apk/壳

https://bbs.pediy.com/thread-271372.htm

脱壳 https://github.com/CodingGay/BlackDex

示例
https://gift1a.github.io/2022/02/13/hgame2022-week3-re/
https://gift1a.github.io/2022/04/23/DASCTF-FATE-Reverse/#0x01-FakePica

# Book

逆向工程核心原理

# 逆向分类

## CEF Chromium Embedded Framework

- [将 js 代码注入到第三方 CEF 应用程序的一点浅见 ](https://bbs.pediy.com/thread-268570.htm)

# Article

- [Debugging Tips](https://blog.wjhwjhn.com/archives/838/)
  > Advanced
- [堆栈溢出保护机制 | 逆向工程](https://mp.weixin.qq.com/s/_15IO0tIY-ci305AEIwDGQ)

---

- [精品连载丨安卓 App 逆向课程之五 frida 注入 Okhttp 抓包下](https://cloud.tencent.com/developer/article/1669631?from=article.detail.1758879)篇
- [精品连载丨安卓 App 逆向课程之三 frida 注入 Okhttp 抓包上篇](https://mp.weixin.qq.com/s/_nSs3yGCll0_B6OZBTU5Bg)
- [精品连载丨安卓 App 逆向课程之四 frida 注入 Okhttp 抓包中篇](https://mp.weixin.qq.com/s/7-HRRV2i2lX9-t62jYI0ig)
- [[原创]Frida 实现 okhttp3.Interceptor ](https://bbs.pediy.com/thread-252129.htm)
- [[原创] 如何实现 Https 拦截进行 非常规“抓包”（20.9.13-代码更新） ](https://bbs.pediy.com/thread-252100.htm)

---

- [6.frida 全自动 HOOK 解密](https://www.bilibili.com/video/BV1kg411N7Zj)
- [【安卓逆向 hook 第四节课 安卓逆向 Hook 分析 frida Hook 神器 过 Root 检测-哔哩哔哩】](https://www.bilibili.com/video/BV1qS4y1X75V)
- [frida 真机 HOOK 解密\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1sR4y147SP)
- [巧用 Frida 与 Unidbg 快速在 CTF 中解题](https://mp.weixin.qq.com/s/LB37_0wBms9UrtiYJ3MpaQ)
- [【技术分享】FRIDA-API 使用篇：rpc、Process、Module、Memory 使用方法及示例](https://mp.weixin.qq.com/s/-LN2wCj7Vdx65gzeqpjgQw)
- [原生安卓开发 app 的框架 frida 自吐算法开发](https://mp.weixin.qq.com/s/CWTN7FJTGouAtX45B6Io-Q)

---

- [易语言 | 程序分析笔记](https://mp.weixin.qq.com/s/vAApQE_Yg9xo-4An7Sw0_A)
- [免杀 | CobaltStrike | Execute-Assembly 攻守之道](https://mp.weixin.qq.com/s/IlOAShBMrOUTixhxqGvncQ)

## 基础学习

- [『杂项』SMC 加密技术（二）](https://mp.weixin.qq.com/s/fJW9qUxedFStTHm7r1AADg)
- [ELF](https://stevens.netmeister.org/631/elf.html)

### Video

- [0x02 Delphi 逆向游乐园第二关](https://www.bilibili.com/video/BV1dk4y1j7ei)
- [0x03 Delphi 逆向游乐园第三关](https://www.bilibili.com/video/BV1224y1K7ip/)

## 高级学习/调试/反调试

[无限硬件中断的代码实现](https://mp.weixin.qq.com/s/8mrJFA8Xvf_qfzX2dwpIEQ)

## Windows/dll 注入

- [Dll 注入入门](https://blog.csdn.net/weixin_43360152/article/details/109066011)
- [DLL 注入与 HOOK](https://secondbc.github.io/SecondBC/2022/12/12/DLL注入与HOOK/)
- [无线程注入-DLL通知注入](https://www.bilibili.com/video/BV1Cp4y1P7rt/) 

## Windows/hook

- [Hook | Window 向之全局 Hook 实现进程隐藏](https://mp.weixin.qq.com/s/WEaWowL2r5OcGBLFaqYSCQ)
- [syscall 的检测与绕过](https://mp.weixin.qq.com/s/wWddKGu-W9WZsMyM3XemOg)
- [SYSENTER HOOK](https://mp.weixin.qq.com/s/x12Y6rH37PkV24fALX4Oow)
- [逆向原理 | SetWindowsHookEx 原理探究与实验](https://www.bilibili.com/read/cv21270420)
- [Window | 【原理到实践】如何在电脑上置顶一个窗口\_哔哩哔哩\_bilibili](https://www.bilibili.com/video/BV1BT41117fe/)
- [DLL 注入与 HOOK](https://secondbc.github.io/SecondBC/2022/12/12/DLL注入与HOOK/)
- [拦截 Windows 关机消息](https://mp.weixin.qq.com/s/cyqmBwumjmTXIZruCC2jVQ)
- [关于几种 hook 的探究](https://mp.weixin.qq.com/s/psAu9mnS1nyQKs_Nj8HzAw)
- [使用 Frida 编写 HOOK 实现内存注入 (26 秒前 )](https://www.cnblogs.com/wgf4242/p/17311264.html)
- [使用 Frida 实现内存注入主动调用函数 (1 分钟前 )](https://www.cnblogs.com/wgf4242/p/17311259.html)
- [使用 OllyDbg 逆向查找 HOOK 地址和寄存器使用 (2 分钟前 )](https://www.cnblogs.com/wgf4242/p/17311256.html)
- [FindWindow 函数行为分析](https://mp.weixin.qq.com/s/VDlU1iHDaTo7W6n9SGRO3Q)
- [HOOK 的原理分析与 easy_hook 逆向题分析](https://mp.weixin.qq.com/s/5Bq5oncZ3gvnU3sDGaKfZw)
- [Windows 编程相关](file:///D:/wgf/My%20Documents/GitHub/cprojects/c_cpp_tutorial/Windows.md#%E5%AE%89%E5%85%A8%E7%BC%96%E7%A8%8B)

### DLL 注入

- [初探 DLL 注入](https://mp.weixin.qq.com/s/fhUAqM1hIC-xm5Pl8-qt6w)

### x64dbg/ollydbg

[x64dbg 插件编写基础](https://mp.weixin.qq.com/s/nATav0shkwytSURp1yMyiQ)

### other

[虚拟机检测技术整理](https://mp.weixin.qq.com/s/tKqePIDTf8UE-_l3Er5QZQ)

## AI 助手 ChatGPT

https://github.com/acheong08/ChatGPT

## PE

- [详解二进制 PE 文件 | 导入表技术](https://mp.weixin.qq.com/s/eu14EHuNup0Y504qY3rsDg)
- [手动展开 PE 文件 | 二进制安全](https://mp.weixin.qq.com/s/VcKtwTn4fh8nyPVhYxkrmQ)

## 模拟运行

- [IoT | Qiling 框架模拟运行固件配合 IDA 动态调试](https://mp.weixin.qq.com/s/PsWTcazrgj0Lv-6ZNNkx3g)
- [IoT | Qiling 框架分析实战：从 QilingLab 详解到 Qiling 源码分析](https://mp.weixin.qq.com/s/v9KRkhjnZ-f-PY9xjQjj5g)

## 地址计算

so 中 Java_com_example_createso_MainActivity_baby_1xor 地址 为 800.实际地址 -800 为 base
看 ida 中 exports 计算其他地址 addr, target_addr = base.add(addr)

## vm

- [记一次对 vm 保护的算法的快速定位](https://mp.weixin.qq.com/s/egggMm8hhcJ_kXVOwF5raQ)

## 驱动

[驱动 | 腾讯游戏赛 [原创]2023 南极动物厂高校决赛之决赛附加题 ](https://bbs.kanxue.com/thread-276892.htm)

## fuzz/模糊测试

- [Windows 平台用户层二进制漏洞模糊测试入门](https://mp.weixin.qq.com/s/nHuo1i21mI-TyqYL21l0RQ)
- [ALF | 基于覆盖率的 Fuzzer 和 AFL](https://mp.weixin.qq.com/s/Xe8GL3pG7Bjmk5Hv8esLMw)

## 实践与练习

- [[原创]EXP 编写学习 之 栈溢出（一）](https://bbs.kanxue.com/thread-272505.htm)
- [[原创]EXP 编写学习 之 SEH 利用 （二）](https://bbs.kanxue.com/thread-272555.htm)
- [[原创]EXP 编写学习 之 网络上的 EXP（三）](https://bbs.kanxue.com/thread-272583.htm)
- [[原创]EXP 编写学习 之 绕过 GS（四）](https://bbs.kanxue.com/thread-272598.htm)
- [[原创]EXP 编写学习 之 绕过 SafeSEH（五）](https://bbs.kanxue.com/thread-272603.htm)

### 实战分析

- [Cobalt Strike 的 DLL Stager 分析](https://mp.weixin.qq.com/s/Tl9r7op-a7GVpw5k-lfYSw)
- [Cobaltstrike4.5 stageless beacon 通信分析](https://mp.weixin.qq.com/s/xhRvAEFftmNEW97uW5BNOQ)
- [Cobalt Strike4.0 远控木马分析 ](https://bbs.kanxue.com/thread-264470.htm)
- [Cobalt Strike 010.exe 病毒分析](https://blog.csdn.net/weixin_48650826/article/details/109991600)
- [透视 CobaltStrike（一）——PE 类 Beacon 分析](https://www.anquanke.com/post/id/228123)
- [CobaltStrike 木马 artifact.exe 规避火绒，360，node32 沙盒的方法分析](https://blog.csdn.net/u012998306/article/details/102830991)
- [CobaltStrike 分析-beacon 解析](https://mp.weixin.qq.com/s/NZkVwRC2VB9_3-Om9rVVCg)

## 解题技巧

- patch 程序， 输出匹配的密文数量到 exitcode。 2023 安洵杯 SYCTF ez_cpp

```sh
.text:00413CFA                 jmp     short loc_413D19
.text:00413CFA ; ---------------------------------------------------------------------------
.text:00413D19 loc_413D19:                             ; CODE XREF: .text:00413CFA↑j
.text:00413D19                 push    ecx
.text:00413D1A                 nop
.text:00413D1B                 call    ds:__imp_exit
```

## 工具

LIEF | 对 ELF 添加 section, segment

- [awesome-ida-x64-olly-plugin](https://github.com/fr0gger/awesome-ida-x64-olly-plugin)
