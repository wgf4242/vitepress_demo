## RC4
```
256 交换 key 2轮 1.初始化 2.str 加密
```
## TEA 系列
https://qianfei11.github.io/2019/08/22/Python%E5%AE%9E%E7%8E%B0TEA%E3%80%81XTEA%E3%80%81XXTEA%E5%8A%A0%E5%AF%86%E8%A7%A3%E5%AF%86%E7%AE%97%E6%B3%95/

### 1-TEA

```
32轮 0x9e3779b9 0xC6EF3720 <<4 >>5
```

### xxtea
delta 可能  0x33445566
## 国密SM

```
32轮 4Bytes Key,  轮密钥

  v5[0] = _byteswap_ulong(*a2);
  v5[1] = _byteswap_ulong(a2[1]);
  v5[2] = _byteswap_ulong(a2[2]);
  v5[3] = _byteswap_ulong(a2[3]);
```

## AES

https://www.bilibili.com/video/BV1i341187fK