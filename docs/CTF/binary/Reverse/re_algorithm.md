[[toc]]

## 特征值识别

| 算法                                   | 特征值                                                                  | 备注         |
| ---------------------------------      | -----------------------------------------------------------             | ------------ |
| TEA系列                                | 9e3779b9                                                                | Delta值      |
| AES                                    | 63 7c 77 7b f2 6b 6f c5 ..                                              | S盒          |
| 52 09 6a d5 30 36 a5 38.               | 逆S盒                                                                   |              |
| DES                                    | 3a 32 2a 22 1a 12 0a 02 ..                                              | 置换表       |
| 39 31 29 21 19 11 09 01..              | 密钥变换数组PC-1                                                        |              |
| 0e 11 0b 18 01 05 03 1c..              | 密钥变换数组PC-2                                                        |              |
| 0e 04 0d 01 02 0f 0b 08 .              | S函数表格1                                                              |              |
| BlowFish                               | 243f6a88 85a308d3 13198a2e 03707344                                     | P数组        |
| MD5                                    | 67452301 efcdab89 98badcfe 10325476                                     | 寄存器初始值 |
|                                     | d76aa478 e8c7b756 242070db clbdceee..                                 | Ti数组常量   |
| SHA1                                   | 67452301 efcdab89 98badcfe 10325476 c3d2e1f0                            | 寄存器初始值 |
| CRC32                                  | 000000000 77073096 ee0e612c 990951bal                                   | CRC表        |
| Base64                                 | 字符串"ABCDEFGHUKLMN0P0RSTUVWXYZ<br>abcdefahiiklmn0parstuwxyz0123456789+/"  | 字符集       |

## 特征运算识别

| 算法                                            | 特征运算(伪代码)                                             | 说明                    |
| ----------------------------------------------- | ------------------------------------------------------------ | ----------------------- |
| RC4                                             | i=(i+ 1)%256<br>j =(j+s[i])%256 <br>swap(s[i],s[j]);<br> t=(s[i]+ s[j])%256 | 流密钥生成 |
| RC4                                             | j=(j+s[i]+k[i])%256;<br> swap(st[j],s[jl);<br> 循环256次 | S盒变换
| Base64                                          | b1=c1>>2:<br> b2 =((c1& 0x3)<<4) \| (c2>>4);<br> b3=((c2 & 0xF)<<2)\|(c3>> 6);<br> b4=c3&0x3F | 8位变6位                |
| TEA系列                                         | ((x<<4) + kx) ^(y + sum) ^((y >> 5) + ky)                    | 轮函数                  |
| MD5                                             | (X&Y)\|((-X)&Z1<br> (X&Z)\|(Y&(~Z))<br> X^Y^Z<br> Y(X\|(~Z))                | F函数<br> G函数<br> H函数<br> I函数<br> |
| AES                                             | x[j]=s[j][(j+i) %4]<br> 循环4次<br> s[i][j]=x[j]<br> 循环4次<br> 整体循环4次 | 行移位                  |
| DES                                             | L=R<br>R=F(R, K) ^L                                             | Feistel结构             |
| XXTEA  | v71 = encode[a1 - 1];<br>v133 = v71 >> 5;<br>v180 = (v71 >> 5) ^ (4 * v123);<br>v71 = encode[w300];<br>v347 = (v301 >> 3) ^ (16 * v71) + ((v71 >> 5) ^ (4 * v301));<br>v347 = (v301 >> 3) ^ (16 * v71) + ((v71 >> 5) ^ (4 * v301));<br>v377 = dword140007038[w367] ^ r71;<br>v71 = encode[a1 - 1];  | * 16 == << 4<br> * 2 == << 2
## 混淆
### 指令替换

```asm
call addr
```
替换为
```
push addr
retn
```
retn可替换为
```
push ecx           ; 破坏了ecx 确保它没被程序使用
mov ecx, [esp+4]
add esp, 8
jmp ecx
```
## Base
[Video](https://www.bilibili.com/video/BV1MV4y1N7EQ/)
## RC4
[Video](https://www.bilibili.com/video/BV1ky4y1R7S3/)
```
256 交换 key 2轮 1.初始化 2.str 加密
```
## TEA 系列
https://qianfei11.github.io/2019/08/22/Python%E5%AE%9E%E7%8E%B0TEA%E3%80%81XTEA%E3%80%81XXTEA%E5%8A%A0%E5%AF%86%E8%A7%A3%E5%AF%86%E7%AE%97%E6%B3%95/

### 1-TEA
![](https://s2.loli.net/2022/05/18/Mn5XdAHLhVa73fk.png)
```
32轮 0x9e3779b9 0xC6EF3720 <<4 >>5
```
### 2-XTEA
![](https://s2.loli.net/2022/05/18/kr2463VPDwdSQWu.png)
### 3-XXTEA
![](https://s2.loli.net/2022/05/18/gIBKAtZMHhWOGNF.png)

delta 可能  0x33445566
## 国密SM4

```
32轮 4Bytes Key,  轮密钥

  v5[0] = _byteswap_ulong(*a2);
  v5[1] = _byteswap_ulong(a2[1]);
  v5[2] = _byteswap_ulong(a2[2]);
  v5[3] = _byteswap_ulong(a2[3]);
```

## AES
https://www.bilibili.com/video/BV1i341187fK

## DES
https://www.bilibili.com/video/BV1KQ4y127AT/
左右分组。
输入 64bit -> 8bytes
L0 - 32bit , R0 - 32bit

![](https://s2.loli.net/2022/11/18/oGqPkNsQp6DUVCM.jpg)

# Article
[【星盟安全】Re系列教程 第1节 maze问题（1）](https://www.bilibili.com/video/BV1bR4y197nE/)
[【星盟安全】Re系列教程 第2节 maze问题（2）](https://www.bilibili.com/video/BV18R4y1o7PU/)
[【星盟安全】Re系列教程 第3节 base算法](https://www.bilibili.com/video/BV1MV4y1N7EQ/)
[【星盟安全】Re系列教程 第4节 RC4算法-哔哩哔哩](https://www.bilibili.com/video/BV1ky4y1R7S3)