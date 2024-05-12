```sh
# 最佳压缩
upx --lzma -9 main.exe
```

## PE/壳

[脱壳学习（一）- 计算机底层基础](https://mp.weixin.qq.com/s/98xIIROLQPjsxQ1rAiSDkg)
[脱壳学习（二）- 反“反调试”篇](https://mp.weixin.qq.com/s/pSaTZSd0ouacZ3A4RxeWfg)
[逆向脱壳（三） - 完结篇](https://mp.weixin.qq.com/s/svh_jfph_PiSpN3enGtYXQ)
[常见的壳与脱壳方式](https://mp.weixin.qq.com/s/4uZxbSFPnkRFR_3hqsQvKg)
[android | 脱壳实战-Frida-Apk-Unpack](https://mp.weixin.qq.com/s/gvWaSaBiD-bQCgtH7-agQA)
[脱壳 ASProtect v1.31 (手动修复 IAT 乱序)](https://mp.weixin.qq.com/s/Vlto5aGq5KzugIF4447eSg)
[脱壳 SLVcodeProtector v1.12 （全保护）](https://mp.weixin.qq.com/s/sHKugQPjfaKU9h6CdhzqbA)
[手脱 TMD 壳](https://mp.weixin.qq.com/s/r7oQe6xUVkNzEscGgkmjIA)
[逆向日记 p4-脱壳系列 （后顾总结，elf 文件格式，dex 文件格式，blackdex 原理简单介绍，fart）fart 没说完 下期继续](https://www.bilibili.com/video/BV1rJ4m1H7wv/)

### UPX/ESP 定律

- [UPX 防脱壳机脱壳、去除特征码、添加花指令小探](https://www.52pojie.cn/thread-326995-1-1.html)
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

3.检查 overlay_offset 位置有没有写数据, 把 overlay_offset 的位置 补上去 p_info 字段的偏移 就可以用 upx -d 了

### VMP

https://bbs.pediy.com/thread-271546-1.htm
[某驱动脱壳 vmp](https://wbglil.github.io/2021/04/05/%E6%9F%90%E9%A9%B1%E5%8A%A8%E8%84%B1%E5%A3%B3%20vmp/)

### Themida/WinLicense

[unlicense 脱](https://www.52pojie.cn/forum.php?mod=viewthread&tid=1647083)
[Download](https://github.com/ergrelet/unlicense/releases)
