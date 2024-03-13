# 解题思路

0. checksec, seccomp-tools 检测, 缩减为 `c <file>`
1. 指针不置 0, uaf
2. ROPgadget --ropchain --binary ./file
3. ret2bss : 1.gets 栈溢出, 2.有 plt.system 3.有 bss 可以直接 ret2bss 手动写入 getshell _Ubuntu18 以上 bss 段不能覆盖 stdin, stdout, 可覆盖 stderr_
4. gets 直接打 orw
5. ret2syscall: 存在 int 0x80, 可控栈溢出, pop eax, ebx,ecx,edx
6. pie : 目标地址接近，栈溢出覆盖最低位地址即可 pie_02_partial_overwrite.py
7. strncmp/strlen , 首字符输入为 \x00 可以绕过, 因为 strlen 遇到 \x00 会停止 见[截断字符](#截断字符)
8. read(0, name, 0x20uLL); 一写要输到 0x20 看有没泄露 见[截断字符](#截断字符)
9. shellcode: 限制字符串 [Video](https://www.bilibili.com/video/BV1Z14y1B7ji/) ,NewstarCTF2023 shellcode revenge
   1. ret2 sys_read, 在 read 中不会限制。然后在 read 中输入 shellcode
1. syscall/syswrite 遇到 00 不断截断，会输出指定字节数, 看汇编有时没 rbp 直接ret
1. system("$0")  == system('bin/sh') # 记得用

# 环境配置

[gdb 调试 | pwndbg+pwndbg 联合使用](https://blog.csdn.net/weixin_43092232/article/details/105648769)
[glibc download](https://mirror.tuna.tsinghua.edu.cn/ubuntu/pool/main/g/glibc/libc6_2.23-0ubuntu10_i386.deb)

# 常用函数 API

system

```sh
system, ret_addr, bin_sh

system("$0")  == system('bin/sh') # 修改输入输出流: exec 1>&2
```

# FAQ

Q1. 本地打通远程打不通

- 1. U18 以上 栈对齐

1. _Ubuntu18 以上 bss 段不能覆盖 stdin, stdout, 可覆盖 stderr_
   [Link](https://blog.csdn.net/weixin_42016744/article/details/122422452)

```bash
得知glibc2.27以后引入xmm寄存器, 记录程序状态, 会执行movaps指令, 要求rsp是按16字节对齐的, 所以如果payload这样写
payload = cyclic(0x20 + 8) + p64(pop_rdi_addr) + p64(binsh_addr) + p64(system_addr)
弹出的数据是奇数个, 本地就会报错
但是改成偶数个pop
payload = cyclic(0x20 + 8) + p64(pop_rdi_addr) + p64(binsh_addr) + p64(ret_addr) + p64(system_addr)
就能打通本地了
原因: xmm寄存器的问题，当glibc版本大于2.27的时候，系统调用system("/bin/sh")之前有个xmm寄存器使用。要确保rsp是与16对齐的，也就是末尾必须是0.

* 1.找ret加入
* 2.找奇数个pop指令就能对齐了, pop 加入
0x0000000000001321 : pop rsi ; pop r15 ; ret
# 对齐1, bin_sh后
payload1 = flat('a' * (0x58), pop_rdi, bin_sh, pop_rsi_r15, 0, 0, system, 0)

* 用rop函数更容易
rop.call(system, [bin_sh, 0])  # 加个0用来栈对齐的
```

- Q2. `rop.call(puts_plt, [puts_got])` 无法输出地址, 可能是 00 截断了,

A2. 使用其他地址比如 read_got, setvbuf_got, \_\_libc_start_main
或者你 got 地址加一, 把最后一个字节跳过 ( 未验证 )

## 截断字符

[Link](https://www.cnblogs.com/ZIKH26/articles/15845766.html)

0xGame2023 字符串和随机数 f

```sh
read(0, name, 0x20uLL);

# 这里 name 0x20, 输入0x20长度后可以泄露下面的 seed
.bss:404140 name db 20h dup(?)
.bss:404160 ; unsigned int seed
.bss:404160 seed dd ?
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

[pwn -- 沙盒机制详解](https://blog.csdn.net/A951860555/article/details/116738676)
[VMPwn 学习](https://www.anquanke.com/post/id/208450)
[VMpwn 总结](https://mp.weixin.qq.com/s/ONZHWfg3UBIvPVsYeszN_Q)
[VMPWN 的入门系列-1](https://mp.weixin.qq.com/s/lpDpFOk4VaXiG8odgb9KEQ)
[VMPWN 的入门系列-2](https://mp.weixin.qq.com/s/Q7bgUWVn8UKWwa-Vv0_SEA)
[针对 top chunk 的一些特殊攻击手法](https://mp.weixin.qq.com/s/foraOTokROtCBsElgL2Y1Q)

## kernel pwn

[【kernel-pwn】从 CISCN-babydriver 入门题带你学习 tty_struct、seq_file、msg_msg、pt_regs 结构体的利用](https://www.bilibili.com/video/BV1E94y1Y7FR/)
[【kernel-pwn】西湖论剑 2021-easykernel](https://www.bilibili.com/video/BV1nN411J72U/)
[linux kernel ROP 下的保护机制绕过](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247497175&idx=1&sn=4ea7737c33bf2d6f5c627e5a3bde840f)
[linux kernel 结构体利用 — tty,seq](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247497382&idx=1&sn=3af9f1d3e1410968f4e79f8c7d4cb7af)
[Linux 内核 pwn 之基础 rop 提权](https://mp.weixin.qq.com/s/VNlTOgRaQF3KqxKMEJDuBw)
[Glibc 高版本堆利用方法总结](https://mp.weixin.qq.com/s/NE0ujoNZUjlY_MALM1nObw)
[『CTF』异构 Pwn 之 Mips32](https://mp.weixin.qq.com/s/vmreCm_a4rL6HhsxwWpmMA)
[Kernel Heap - Cross Cache Overflow](https://mp.weixin.qq.com/s/N9LVwbRxTKo4oVdQ0bF-rQ)

```sh
pwn.college 有一些
https://sysprog21.github.io/lkmpg/
https://blog.kylebot.net/2022/01/10/VULNCON-2021-IPS/
https://blog.dbouman.nl/
https://www.willsroot.io/
https://github.com/sefcom/KHeaps
https://bbs.kanxue.com/homepage-thread-876323-1.htm
https://googleprojectzero.blogspot.com/2022/12/exploiting-CVE-2022-42703-bringing-back-the-stack-attack.html
https://syst3mfailure.io/
```

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
- [ret2resolve 练习](https://mp.weixin.qq.com/s/4oTctnawJ3dgzACC1HKzVg)

---

- [Video  | CTFHUB | 只适合纯萌新的 pwn堆基础 - 1](https://www.bilibili.com/video/BV1Bt421t7UV/?spm_id_from=333.788&vd_source=7631821c3a79f04a4fb0ef78db2c0814)
- [Video  | CTFHUB | pwn堆溢出之off-by-nullの低版本和高版本例题讲解利用](https://www.bilibili.com/video/BV1BF4m157T7/)
- [CTFHUB | 堆溢出 | FastBin Attack](https://bbs.kanxue.com/thread-276456.htm) -- [WP2](https://blog.csdn.net/KaliLinux_V/article/details/128787055) --[FastBin Attack：House of spirit attack](https://bbs.kanxue.com/thread-277106.htm)
- [CTFHUB | 堆溢出 | UnsortedBin Attack](https://bbs.kanxue.com/thread-276457.htm)
- [CTFHUB | 堆溢出 | LargeBin Attack|House of Storm](https://bbs.kanxue.com/thread-276516.htm)

---

- [CTFHUB | 堆溢出 | Largebin Attack(House of storm)](https://blog.csdn.net/KaliLinux_V/article/details/128915137)
- [CTFHUB | 堆溢出 | off by one](https://blog.csdn.net/KaliLinux_V/article/details/128797268)
- [CTFHUB | 堆溢出 | off by null](https://blog.csdn.net/KaliLinux_V/article/details/128877232)
- [CTFHUB | 堆溢出 | Chunk Extend](https://blog.csdn.net/KaliLinux_V/article/details/128917658)
- [CTFHUB | 堆溢出 | tcache Attack](https://blog.csdn.net/KaliLinux_V/article/details/128857374)
- [CTFHUB | 堆溢出 | House of Einherjar](https://blog.csdn.net/KaliLinux_V/article/details/128933128) [堆利用学习：the house of einherjar](https://mp.weixin.qq.com/s/JWpshLO9C2fyHKNSINC-NQ)
- [CTFHUB | 堆溢出 | House of spirit](https://blog.csdn.net/KaliLinux_V/article/details/128944591) [FastBin Attack：House of spirit attack](https://bbs.kanxue.com/thread-277106.htm)
- [CTFHUB | 堆溢出 | House of roman](https://blog.csdn.net/KaliLinux_V/article/details/128951462)
- [CTFHUB | 堆溢出 | House of orange](https://blog.csdn.net/KaliLinux_V/article/details/128966835) [house of orange](https://mp.weixin.qq.com/s/PDCceypsuVmgv1Cv8KyluA)
- [CTFHUB | 堆溢出 | House of Lore](https://blog.csdn.net/KaliLinux_V/article/details/128969408)

--- 堆喷
[堆喷 | 从 2023 蓝帽杯 0 解题 heapSpary 入门堆喷](https://mp.weixin.qq.com/s/ZEpkRkXtqfKFJS59vduM4g)

---

- [Kernel | kernel-pwn 之 ret2dir 利用技巧](https://mp.weixin.qq.com/s/PT__YBPRW0odcyzOxn7g8Q)
- [kernel pwn 入门](https://mp.weixin.qq.com/s/lDyJERTkUJ9cyMR_mrvpGA)

---

- [glibc2.35-通过 tls_dtor_list 劫持 exit 执行流程](https://mp.weixin.qq.com/s/jdpR_Ago_SK3qRRw3ghZ4A)
- [Glibc-2.35下对tls_dtor_list的利用详解](https://mp.weixin.qq.com/s/K5ix399X9sd0-nMAJS9KZA)

- video
- [「Pwn 教学」有趣的 Pwn 博主的 Tcache Bin Attack 堆攻击教学](https://www.bilibili.com/video/BV1Jy4y1d7oz/)
- [「Pwn 教学」有趣的 Pwn 博主的 Unsorted Bin Attack 堆攻击教学](https://www.bilibili.com/video/BV1X3411Z7Ba/)
- [「Pwn 教学」有趣的 Pwn 博主的 Unlink 堆攻击教学](https://www.bilibili.com/video/BV1kP4y1k7RD/)

- 整理
- [CTF 竞赛 -- Shellcode 学习](https://mp.weixin.qq.com/s/HmLp_yBKcm_aoLJH4kQuZg)
- [CTF 竞赛 -- 关于整数溢出](https://mp.weixin.qq.com/s/ZxqP1DOB4g2OTuwPggAIFg)
- [CTF 竞赛：从格式化输出函数到完全控制](https://mp.weixin.qq.com/s/1eXd6cBxNVwqjgu-A-KbCw)
- [CTF 竞赛 -- SROP 详解](https://mp.weixin.qq.com/s/Z0r1v-a0l30sEm6rqvny_A)
- [CTF 竞赛 -- 堆漏洞利用](https://mp.weixin.qq.com/s/Qo1ltzI0jh7Zz76bQ22zmA)
- [Tcache | House of Botcake](https://mp.weixin.qq.com/s/ottZtwI2kRoSBek9IPxnJw)
- [house of rabbit](https://mp.weixin.qq.com/s/-PYkGQbiKdqSo1lqu2aO0g)
- [house of roman](https://mp.weixin.qq.com/s/nF2yu4hN9MLxqbqzDwRbAA)
- [house of storm](https://mp.weixin.qq.com/s/Li63L0Dqf7y8EsVdVve7qA)

### ctfshow
[ctfshow-pwn入门-pwn37-48](https://mp.weixin.qq.com/s/p6_ZHNiy6uikfEf12KnL-A)
[ctfshow-pwn入门-pwn49](https://mp.weixin.qq.com/s/6ZhMDMTOQHE2ZeQcfSnJFg)
[ctfshow-pwn入门-pwn50](https://mp.weixin.qq.com/s/hoU0OUPNiIrmNNO8PUZMoQ)
[ctfshow-pwn入门-pwn51](https://mp.weixin.qq.com/s/hNV5V3yDzfr14ycpuOQJvQ)

## Untitled

- [好好说话之 ret2shellcode](https://blog.csdn.net/qq_41202237/article/details/105913330)
- [好好说话之格式化字符串漏洞利用](https://blog.csdn.net/qq_41202237/article/details/107662273)
- [好好说话之 64 位格式化字符串漏洞](https://blog.csdn.net/qq_41202237/article/details/107833668)
- [好好说话之整数溢出](https://blog.csdn.net/qq_41202237/article/details/107972712)
- [好好说话之 hijack GOT](https://blog.csdn.net/qq_41202237/article/details/107837452)
- [好好说话之 hijack retaddr](https://blog.csdn.net/qq_41202237/article/details/107911677)
- [好好说话之 ret2text](https://blog.csdn.net/qq_41202237/article/details/105913166)
- [好好说话之 ret2syscall](https://blog.csdn.net/qq_41202237/article/details/105913384)
- [好好说话之 ret2libc1](https://blog.csdn.net/qq_41202237/article/details/105913479)
- [好好说话之 ret2libc2](https://blog.csdn.net/qq_41202237/article/details/105913529)
- [好好说话之 ret2libc3](https://blog.csdn.net/qq_41202237/article/details/105913563)
- [好好说话之 ret2csu](https://blog.csdn.net/qq_41202237/article/details/105913597)
- [好好说话之 ret2_dl_runtime_resolve](https://blog.csdn.net/qq_41202237/article/details/107378159)
- [好好说话之 Fastbin Attack（1）：Fastbin Double Free](https://blog.csdn.net/qq_41202237/article/details/109199077)
- [好好说话之 Fastbin Attack（2）：House Of Spirit](https://blog.csdn.net/qq_41202237/article/details/109284167)
- [好好说话之 Fastbin Attack（3）：Alloc to Stack](https://blog.csdn.net/qq_41202237/article/details/111300546)
- [好好说话之 Fastbin Attack（4）：Arbitrary Alloc](https://blog.csdn.net/qq_41202237/article/details/112320919)
- [好好说话之 Use After Free](https://blog.csdn.net/qq_41202237/article/details/108797478)
- [好好说话之 off-by-one](https://blog.csdn.net/qq_41202237/article/details/108116618)
- [好好说话之 unlink](https://blog.csdn.net/qq_41202237/article/details/108481889)
- [好好说话之 Chunk Extend/Overlapping](https://blog.csdn.net/qq_41202237/article/details/108320408)
- [好好说话之 IO_FILE 利用（1）：利用\_IO_2_1_stdout 泄露 libc](https://blog.csdn.net/qq_41202237/article/details/113845320)
- [好好说话之 House Of Einherjar](https://blog.csdn.net/qq_41202237/article/details/117112930)
- [好好说话之 SROP](https://blog.csdn.net/qq_41202237/article/details/107512670)
- [好好说话之 Large Bin Attack](https://blog.csdn.net/qq_41202237/article/details/112825556)
- [好好说话之 Unsorted Bin Attack](https://blog.csdn.net/qq_41202237/article/details/112589899)
- [好好说话之 Stack smash](https://blog.csdn.net/qq_41202237/article/details/107628831)
- [好好说话之 re2reg](https://blog.csdn.net/qq_41202237/article/details/105913705)
- [好好说话之 Tcache Attack（1）：tcache 基础与 tcache poisoning](https://blog.csdn.net/qq_41202237/article/details/113400567)
- [好好说话之 Tcache Attack（2）：tcache dup 与 tcache house of spirit](https://blog.csdn.net/qq_41202237/article/details/113527665)
- [好好说话之 Tcache Attack（3）：tcache stashing unlink attack](https://blog.csdn.net/qq_41202237/article/details/113604261)
- [PWN学习之LLVM入门](https://mp.weixin.qq.com/s/s7dQyS5DuKmtTZGq4J78iA)


## Video

https://www.youtube.com/playlist?list=PLhixgUqwRTjxglIswKp9mpkfPNfHkzyeN
[ret2shellcode](https://www.bilibili.com/video/BV1Ws4y137xa/)
