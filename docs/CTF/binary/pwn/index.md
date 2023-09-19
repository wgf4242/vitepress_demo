# 解题思路

- 指针不置 0, uaf

# 环境配置

[gdb 调试 | pwndbg+pwndbg 联合使用](https://blog.csdn.net/weixin_43092232/article/details/105648769)

# 常用函数 API

system

```sh
system, ret_addr, bin_sh

system("$0")  == system('bin/sh') # 可以再来一行 exec 1>&2
```

# Article

[里面找链接](https://faradaysec.com/reverse-engineering-and-game-hacking-resources-2/)

[从新生赛入门 PWN](https://mp.weixin.qq.com/s/kAgrcDO-Dt15eZKo0w0pEw)
[Pwn 堆利用学习](https://mp.weixin.qq.com/s/R1LcyFnb9tCDVLP-1ryKYw)
[【ACTF2022】从 Fuzz 到 XCTF 赛题 | 堆题目](https://mp.weixin.qq.com/s/80jizJsqmrq9dPFE77uzew)

[2022 网鼎杯朱雀组 pwn Bit | write(2020_bbctf) | 『CTF』从两道题目学习 exit_hook](https://mp.weixin.qq.com/s/N6ct4pgBxivDP0MtNsK7UQ)

[一条新的 glibc IO_FILE 利用链：\_IO_obstack_jumps 利用分析](https://mp.weixin.qq.com/s/U2ZsWV27FkKfXwLYDYgSRg)
[『CTF』alarm 函数的妙用](https://mp.weixin.qq.com/s/CZgZmWE23LR9Zti8tcgL_Q)
[【星盟安全】PWN 系列教程](https://www.bilibili.com/video/BV1Uv411j7fr)
[heap | Use After Free - CTF Wiki](https://ctf-wiki.org/pwn/linux/user-mode/heap/ptmalloc2/use-after-free/)
[heap | 新人 PWN 堆 Heap 总结](https://mp.weixin.qq.com/s/Dk11gRLVsh4-KstotEGb7g)
[tcache bin 利用总结](https://mp.weixin.qq.com/s/7kytfB0oFy2xcccwy3cxMA)

[linux kernel ROP 下的保护机制绕过](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247497175&idx=1&sn=4ea7737c33bf2d6f5c627e5a3bde840f)
[linux kernel 结构体利用 — tty,seq](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247497382&idx=1&sn=3af9f1d3e1410968f4e79f8c7d4cb7af)
[Linux 内核 pwn 之基础 rop 提权](https://mp.weixin.qq.com/s/VNlTOgRaQF3KqxKMEJDuBw)
[Glibc 高版本堆利用方法总结](https://mp.weixin.qq.com/s/NE0ujoNZUjlY_MALM1nObw)
[『CTF』异构 Pwn 之 Mips32](https://mp.weixin.qq.com/s/vmreCm_a4rL6HhsxwWpmMA)

[pwn -- 沙盒机制详解](https://blog.csdn.net/A951860555/article/details/116738676)
[VMPwn 学习](https://www.anquanke.com/post/id/208450)
[VMpwn 总结](https://mp.weixin.qq.com/s/ONZHWfg3UBIvPVsYeszN_Q) 
[针对 top chunk 的一些特殊攻击手法](https://mp.weixin.qq.com/s/foraOTokROtCBsElgL2Y1Q)

## Tutorial

[HITCON-Training](https://github.com/scwuaptx/HITCON-Training/tree/master/LAB)
[【星盟安全】PWN 系列教程 第 18 节 堆 chunk 介绍以及源码剖析](https://www.bilibili.com/video/BV1NU4y187te)
[【星盟安全】PWN 系列教程 第 19 节 UAF](https://www.bilibili.com/video/BV1Ud4y1j7Nw)
[【星盟安全】PWN 系列教程 第 22 节 Fastbin](https://www.bilibili.com/video/BV1Xf4y1a7VK)
[Heap | 高级二进制安全 | Binary Exploitation - Advanced （中文教学）](https://www.bilibili.com/video/BV1Z24y1W7QP)

## Examples

- [jarvisoj_fm](https://mp.weixin.qq.com/s/7rI3I0M6BcM6UGR119cAbQ)
- [CTFHUB | 栈溢出 | ret2VDSO](https://bbs.kanxue.com/thread-276433.htm)
- [CTFHUB | 栈溢出 | ret2dl_resolve](https://bbs.kanxue.com/thread-276450.htm)
- [ret2resolve练习](https://mp.weixin.qq.com/s/4oTctnawJ3dgzACC1HKzVg)

---

- [CTFHUB | 堆溢出 | FastBin Attack](https://bbs.kanxue.com/thread-276456.htm) -- [WP2](https://blog.csdn.net/KaliLinux_V/article/details/128787055) --[FastBin Attack：House of spirit attack](https://bbs.kanxue.com/thread-277106.htm)
- [CTFHUB | 堆溢出 | UnsortedBin Attack](https://bbs.kanxue.com/thread-276457.htm)
- [CTFHUB | 堆溢出 | LargeBin Attack|House of Storm](https://bbs.kanxue.com/thread-276516.htm)

---

- [CTFHUB | 堆溢出 | Largebin Attack(House of storm)](https://blog.csdn.net/KaliLinux_V/article/details/128915137)
- [CTFHUB | 堆溢出 | off by one](https://blog.csdn.net/KaliLinux_V/article/details/128797268)
- [CTFHUB | 堆溢出 | off by null](https://blog.csdn.net/KaliLinux_V/article/details/128877232)
- [CTFHUB | 堆溢出 | Chunk Extend](https://blog.csdn.net/KaliLinux_V/article/details/128917658)
- [CTFHUB | 堆溢出 | tcache Attack](https://blog.csdn.net/KaliLinux_V/article/details/128857374)
- [CTFHUB | 堆溢出 | House of Einherjar](https://blog.csdn.net/KaliLinux_V/article/details/128933128)
- [CTFHUB | 堆溢出 | House of spirit](https://blog.csdn.net/KaliLinux_V/article/details/128944591) [FastBin Attack：House of spirit attack](https://bbs.kanxue.com/thread-277106.htm)
- [CTFHUB | 堆溢出 | House of roman](https://blog.csdn.net/KaliLinux_V/article/details/128951462)
- [CTFHUB | 堆溢出 | House of orange](https://blog.csdn.net/KaliLinux_V/article/details/128966835)
- [CTFHUB | 堆溢出 | House of Lore](https://blog.csdn.net/KaliLinux_V/article/details/128969408)

---

- [Kerndel | kernel-pwn 之 ret2dir 利用技巧](https://mp.weixin.qq.com/s/PT__YBPRW0odcyzOxn7g8Q)

- video
[「Pwn教学」有趣的Pwn博主的Tcache Bin Attack堆攻击教学](https://www.bilibili.com/video/BV1Jy4y1d7oz/)
[「Pwn教学」有趣的Pwn博主的Unsorted Bin Attack堆攻击教学](https://www.bilibili.com/video/BV1X3411Z7Ba/)
[「Pwn教学」有趣的Pwn博主的Unlink堆攻击教学](https://www.bilibili.com/video/BV1kP4y1k7RD/)

- 整理
[CTF竞赛 -- Shellcode学习](https://mp.weixin.qq.com/s/HmLp_yBKcm_aoLJH4kQuZg)
[CTF竞赛 -- 关于整数溢出](https://mp.weixin.qq.com/s/ZxqP1DOB4g2OTuwPggAIFg)
[CTF竞赛：从格式化输出函数到完全控制](https://mp.weixin.qq.com/s/1eXd6cBxNVwqjgu-A-KbCw)
[CTF竞赛 -- SROP详解](https://mp.weixin.qq.com/s/Z0r1v-a0l30sEm6rqvny_A)
[CTF竞赛 -- 堆漏洞利用](https://mp.weixin.qq.com/s/Qo1ltzI0jh7Zz76bQ22zmA)
[Tcache | House of Botcake](https://mp.weixin.qq.com/s/ottZtwI2kRoSBek9IPxnJw)
## Video

https://www.youtube.com/playlist?list=PLhixgUqwRTjxglIswKp9mpkfPNfHkzyeN
[ret2shellcode](https://www.bilibili.com/video/BV1Ws4y137xa/)