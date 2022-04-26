[[toc]]

[Frida](./frida)

[相关加密](./recrypto.md)
## TODO
https://www.52pojie.cn/thread-1623713-1-1.html  finger符号还原
## 解题思路
1.搜到关键字如 0x33445566, 先google/baidu ctf 0x33445566
4.没去符号 函数调用少 C代码复制出来改一改爆破更快的
5.或者  asm 改成 call puts
6.调试时
- 1. scanf如果没变量 断点动调 可能不一样
- 2. 在 flag 查交叉引用
- 3. 经常看图, 看汇编, encflag通常在分叉前一点
1.smc
2.搜索++ 当作索引 找关键信息
3.两串密文先猜异或
4.key/enc 看交叉引用前面有没有修改，有修改用动调拿到修改后的
5.迷宫题多观察迷宫
* 1.可能暴露起点和终点位置
* 2.直接找到上下左右字母。DFS解题
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

## 反调试

https://ctf-wiki.org/reverse/windows/anti-debug/zwsetinformationthread/
ZwSetInformationThread 第 2 个参数为 ThreadHideFromDebugger，若为 0x11 修改为其他值
## Book
逆向工程核心原理