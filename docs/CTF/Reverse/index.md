[[toc]]

[Frida](./frida)

[相关加密](./recrypto.md)
## TODO
https://www.52pojie.cn/thread-1623713-1-1.html  finger符号还原
## 解题思路
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

1. mrb文件 - ruby字节码 16进制显示 RITE0300
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
## MFC
https://blog.csdn.net/Sanky0u/article/details/81568483
https://gift1a.github.io/2022/04/23/DASCTF-FATE-Reverse/#more


## objective-c
https://blog.trackonyou.top/2021/06/26/a1aab78dc414/

## Go语言
入口 main_main
os_stdout, fmt_Fprint fmt_Fprintln fmt_Fscanf
## vm 虚拟机系统

go:VNCTF2022 CM狗   main__ptr_MzVm_init
## 反调试

https://ctf-wiki.org/reverse/windows/anti-debug/zwsetinformationthread/
ZwSetInformationThread 第 2 个参数为 ThreadHideFromDebugger，若为 0x11 修改为其他值

## 花指令

[RE - Anti IDA 反反编译与反反反编译](http://note.youdao%2ecom/noteshare?id=3eb748f7bc67698d08107f963af77ab4&sub=6DC9E91DB3B24EC98DFA09E3AC3D6857)


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

## adb commands
adb -s "emulator-5554" install attachment-16.apk
## frida 模拟器配置
pc端直接
手机端 root后
```
adb shell
su
setenforce 0
```

```
#adb connect 127.0.0.1:7555 # 雷电不用

# x86
mkdir /data/local/tmp
adb push frida-server-15.1.17-android-x86 /data/local/tmp
adb shell
cd /data/local/tmp
chmod +x frida-server-15.1.17-android-x86
./frida-server-15.1.17-android-x86


# arm64
adb push frida-server-15.1.17-android-arm64 /data/local/tmp
adb shell
mkdir /data/local/tmp
cd /data/local/tmp
chmod +x frida-server-15.1.17-android-arm64
./frida-server-15.1.17-android-arm64

/data/local/tmp/frida-server-15.1.17-android-arm64


新窗口
adb forward tcp:27043 tcp:27043
adb forward tcp:27042 tcp:27042
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
