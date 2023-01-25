[[toc]]

[Frida](./frida)

[相关加密](./recrypto.md)
## TODO
https://www.52pojie.cn/thread-1623713-1-1.html  finger符号还原
## 解题思路
前置准备
1. 二进制搜索
2. 找ip端口 上传微步
1. 放die看EntryPoint 位置。
2. 放die看编译器, 如果是gcc, IDA: Option - Compiler - GNU C++
2. 看FindCrypt
3. bindiff, 恢复符号
2. 见 ## 程序执行顺序, 有没SEH
3. ida打不开/ghidra/cutter
4. apk: jadx, jeb都打开 jeb能解些 brainfucks
4. 输入fuzz
   - L1. 输入 1 ascii: 49, -> out1
   - L1. 输入 b ascii: 98, -> out2
   - L1. 对比结果 out2/out1 看看是怎么变换的
   - L2. 输入 32个a, 看输出是不是等量 线性变换。能否输入全部字符直接换表
5. 输入输出变换了大端小端


1.简单题目 patch调试 set EIP到后面执行一下
2.多用调试直接过逻辑看结果。
1.搜到关键字如 0x33445566, 先google/baidu ctf 0x33445566
4.没去符号 函数调用少 C代码复制出来改一改爆破更快的
5.或者  asm 改成 call puts
6.已知算法未成功执行，检查有符号 还是无符号，可能有改变。
6.调试时
- 1. 通过%s搜scanf scanf如果没变量 断点动调, 切汇编再F5 可能不一样
- 3.考虑给内存地址打硬件断点
- 2. 在 flag 查交叉引用
- 3. 经常看图, 看汇编, encflag通常在分叉前一点
1.smc
2.搜索++ 当作索引 找关键信息
3.两串密文先猜异或
4.key/enc 看交叉引用前面有没有修改，有修改用动调拿到修改后的
5.迷宫题多观察迷宫
* 1.可能暴露起点和终点位置
* 2.直接找到上下左右字母。DFS解题
7.变量混淆执行流程
- ida D810 选examples_anel。去除 变量混淆控制流。

1. mrb文件 - ruby字节码 16进制显示 RITE0300  , CISCN2022 babycode   https://docs.qq.com/doc/DRmhseWVMV1dJbUR1
2. swift ast https://docs.qq.com/doc/DRmhseWVMV1dJbUR1 CISCN2022 babytree
## 程序执行顺序

   1. Shift+F4, Name: ___CTOR_LIST__ 有没有对应函数地址. function: __do_global_ctors() : constructor
   2. init_array
   3. main
   4. fini_array . function: __do_global_dtors, Name: __DTOR_LIST__	

```c
  sub_401800(v14, v13, v15); // main前这里也可能是 init
  _initenv = envp;
  result = main(argc, (const char **)argv, (const char **)envp);
```

## C/IDA相关

```
plugins\hexrays_sdk\include\defs.h  包含各种类型
```

## 程序头修改
1. 55 48 89 E5
```
push rbp
mov rbp,rsp
```

2.
机器码 55 56 53 48 49 E5

```asm
push rbp
push rsi
push ebx
mov rbp, rsp
```

## angr

[angr题库](https://github.com/jakespringer/angr_ctf)

[参照文章](https://www.anquanke.com/post/id/212816)

## 提问
ida 调试时  watch view 怎样计算地址值比如 *(Map+1100+1)
idapython怎样通过变量名获取变量地址

## WinAPI
https://docs.microsoft.com/en-us/windows/win32/api/wincrypt/nf-wincrypt-cryptcreatehash
ALG_ID https://docs.microsoft.com/en-us/windows/win32/seccrypto/alg-id

|   Identifier   | Value  |   Description   |
| -------------- | ------ | --------------- |
| CALG_MD5       | 0x8003 | MD5             |
| CALG_SHA       | 0x8004 | SHA1            |
| CALG_AES       | 0x660E | AES128          |

CryptCreateHash(phProv, Algid, 0, 0, &phHash);  定义加密类型 创建一个空哈希对象
CryptGetHashParam(phHash, 2u, v6, (DWORD *)v8, 0); 将值输出到v6的地址
CryptDeriveKey从一个密码中派生一个密钥

CryptEncrypt 和CryptDecrypt 要求在被调用前指定一个密钥。
CryptEncrypt使用指定加密密钥来加密一段明文
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

在 Windows 程序中使用了VirtualProtect()函数来改变虚拟内存区域的属性。

```c
#include <Memoryapi.h>
BOOL VirtualProtect(
  LPVOID lpAddress,
  SIZE_T dwSize,
  DWORD  flNewProtect,
  PDWORD lpflOldProtect
);
```

VirtualProtect()函数有4个参数，lpAddress是要改变属性的内存起始地址，dwSize是要改变属性的内存区域大小，flAllocationType是内存新的属性类型，lpflOldProtect内存原始属性类型保存地址。而flAllocationType部分值如下表。在 SMC 中常用的是 0x40。

#### VirtualProtect  dump出的程序无法执行，可能是32位。64位问题。

https://mp.weixin.qq.com/s/lGPtsd8hPJnltZ8OJqOCiw
loader题目 

010 editor 可修改32位，64位。
```
struct IMAGE_FILE_HEADER FileHeader
 -- enum IMAGE_MACHINE Machine  : I386 (14Ch)  改 amd64
struct IMAGE_OPTIONAL_HEADER32 OptionalHeader
 -- enum OPTIONAL_MAGIC Magic   : PE32 (10Bh) 改 PE64
```

## MFC
https://blog.csdn.net/Sanky0u/article/details/81568483
https://gift1a.github.io/2022/04/23/DASCTF-FATE-Reverse/#more


## objective-c
https://blog.trackonyou.top/2021/06/26/a1aab78dc414/

## vm 虚拟机系统

go:VNCTF2022 CM狗   main__ptr_MzVm_init

## Javascript/js

js -- decodeObfuscator

### uniapp

# IOT
IOT 车联网问题。启动不了找问题patch掉。可能是没有某些设备
ida 定位字符串。都patch
qemu-arm -L ./tbox_app.bin

# APK
1.PKID查壳、BlackDex脱壳、jadx打开(报用gda)
2.看资源文件  看dex
2.adb pull /storage/emulated/0/Android/data/top.niunaijun.blackdexa32/dump
2-2 
```
frida-ps -Ua
frida-dexdump -p 27815 -U
```
## 资源
https://github.com/MiDuoKi/AndroidSafeStudy
[移动安全分析平台 -- 南明离火](https://mp.weixin.qq.com/s/hp8NuaW0ioQX2bdIYvSHLg)
## APK壳
https://blog.csdn.net/m0_64604636/article/details/121885541
https://blog.csdn.net/weixin_44032232/article/details/109676945
https://blog.51cto.com/yeshaochen/2496524


## adb commands
adb -s "emulator-5554" install attachment-16.apk

## PE/壳

### UPX/ESP定律
https://www.52pojie.cn/thread-326995-1-1.html
[完美UPX脱壳------之投怀送抱篇（适合所有变形）](https://www.52pojie.cn/thread-1673206-1-1.html) 

1.检查是UPX，但无法脱壳。

1)段头部(Section Header) 错误。如 2022网鼎杯青龙-fakeshell, 010搜索 FUK替换为UPX。
* Functions 向右拉也看得到 Segments不对
* 可用die查看 全部节, 找到FUK节, 双击 ×只读 可修改值

UPX标识修改

```sh
UPX0       00001000  0000F000   00000400  00000000   E0000080                   # 第1处
UPX1       00010000  00009000   00000400  00008400   E0000040                   # 第2处
000003D0   00 00 00 00 00 00 00 00  00 00 00 33 2E 39 31 00              3.91   # 
000003E0   55 50 58 21 0D 09 02 08  5A 34 28 27 60 95 D0 97   UPX!    `         # 第3处
```

2.脱壳方式
修复头后, 搜popad, 运行跳后走几步到push ebp dump
### VMP
https://bbs.pediy.com/thread-271546-1.htm

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

### 追踪app
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

[将js代码注入到第三方CEF应用程序的一点浅见 ](https://bbs.pediy.com/thread-268570.htm)



# Article
[Debugging Tips](https://blog.wjhwjhn.com/archives/838/)

[精品连载丨安卓 App 逆向课程之五 frida 注入 Okhttp 抓包下](https://cloud.tencent.com/developer/article/1669631?from=article.detail.1758879)篇
[**精品连载丨安卓 App 逆向课程之三 frida 注入 Okhttp 抓包上篇**](https://mp.weixin.qq.com/s/_nSs3yGCll0_B6OZBTU5Bg)
 [**精品连载丨安卓 App 逆向课程之四 frida 注入 Okhttp 抓包中篇**](https://mp.weixin.qq.com/s/7-HRRV2i2lX9-t62jYI0ig)
[[原创]Frida实现okhttp3.Interceptor ](https://bbs.pediy.com/thread-252129.htm) 
[[原创] 如何实现 Https拦截进行 非常规“抓包”（20.9.13-代码更新） ](https://bbs.pediy.com/thread-252100.htm) 

[6.frida全自动HOOK解密](https://www.bilibili.com/video/BV1kg411N7Zj)
[【安卓逆向hook第四节课 安卓逆向Hook分析  frida  Hook神器   过Root检测-哔哩哔哩】](https://www.bilibili.com/video/BV1qS4y1X75V)
[frida真机HOOK解密_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1sR4y147SP)
[巧用Frida与Unidbg快速在CTF中解题](https://mp.weixin.qq.com/s/LB37_0wBms9UrtiYJ3MpaQ)
[【技术分享】FRIDA-API使用篇：rpc、Process、Module、Memory使用方法及示例](https://mp.weixin.qq.com/s/-LN2wCj7Vdx65gzeqpjgQw)
[原生安卓开发app的框架frida自吐算法开发](https://mp.weixin.qq.com/s/CWTN7FJTGouAtX45B6Io-Q)

[易语言 | 程序分析笔记](https://mp.weixin.qq.com/s/vAApQE_Yg9xo-4An7Sw0_A)

## Windows/hook
[Hook | Window向之全局Hook实现进程隐藏](https://mp.weixin.qq.com/s/WEaWowL2r5OcGBLFaqYSCQ)
[syscall的检测与绕过](https://mp.weixin.qq.com/s/wWddKGu-W9WZsMyM3XemOg)
[SYSENTER HOOK](https://mp.weixin.qq.com/s/x12Y6rH37PkV24fALX4Oow)
[逆向原理 | SetWindowsHookEx 原理探究与实验](https://www.bilibili.com/read/cv21270420)
[Window | 【原理到实践】如何在电脑上置顶一个窗口_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1BT41117fe/)


## AI助手ChatGPT
https://github.com/acheong08/ChatGPT

## PE
[详解二进制PE文件 | 导入表技术](https://mp.weixin.qq.com/s/eu14EHuNup0Y504qY3rsDg)
[手动展开PE文件 | 二进制安全](https://mp.weixin.qq.com/s/VcKtwTn4fh8nyPVhYxkrmQ)

## 模拟运行
[Qiling框架模拟运行固件配合IDA动态调试](https://mp.weixin.qq.com/s/PsWTcazrgj0Lv-6ZNNkx3g)
## 地址计算
so 中  Java_com_example_createso_MainActivity_baby_1xor 地址 为 800.实际地址 -800为base
看 ida中exports 计算其他地址addr,  target_addr = base.add(addr)
## vm
[记一次对vm保护的算法的快速定位](https://mp.weixin.qq.com/s/egggMm8hhcJ_kXVOwF5raQ)
## Game | 游戏安全

[【逆向安全】快速搜索FPS游戏相机矩阵_矩阵特性1-哔哩哔哩](https://www.bilibili.com/video/BV1s3411D7JU)
[Hacking Electron Games 1 | Vampire Survivors](https://www.youtube.com/watch?v=6u0V1svtj3A)
[Hacking Electron Games 2 | Vampire Survivors](https://www.youtube.com/watch?v=kKun6MrHCxI)

## 工具
LIEF | 对ELF添加 section, segment
[awesome-ida-x64-olly-plugin](https://github.com/fr0gger/awesome-ida-x64-olly-plugin)