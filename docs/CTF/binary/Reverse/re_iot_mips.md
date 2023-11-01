## mips

[QEMU+IDA 远程调试 mips 可执行文件](https://zhuanlan.zhihu.com/p/44550180)

mips 是大端程序, mipsel 是小端程序

调试环境

```sh
qemu-mips -g 1234 ./re  # gdb/ida 可连接到1234端口
```

# Foundation/mips

| REGISTER | NAME      | USAGE                                                        |
| :------- | :-------- | :----------------------------------------------------------- |
| $0       | $zero     | 常量 0(constant value 0)                                     |
| $1       | $at       | 保留给汇编器(Reserved for assembler)                         |
| $2-$3    | $v0 - $v1 | 函数调用返回值(values for results and expression evaluation) |
| $4-$7    | $a0-$a3   | 函数调用参数(arguments)                                      |
| $8-$15   | $t0-$t7   | 暂时的(或随便用的)                                           |
| $16-$23  | $s0-$s7   | 保存的(或如果用，需要 SAVE/RESTORE 的)(saved)                |
| $24-$25  | $t8-$t9   | 暂时的(或随便用的)                                           |
| $28      | $gp       | 全局指针(Global Pointer)                                     |
| $29      | $sp       | 堆栈指针(Stack Pointer)                                      |
| $30      | $fp       | 帧指针(Frame Pointer)                                        |

汇编
https://blog.csdn.net/weixin_38669561/article/details/104445763

返回值通常放在 $v0  , rt就是register

| 1           | 2                    |                                                            |
| ----------- | -------------------- | ---------------------------------------------------------- | --- | ------ |
| sw ra,0(s8) | # memory[s8 +0] ← v0 | 把寄存器 ra 里的 32 位数写出到内存地址为 s8+0              |
| lb          | lb $v1, 0($v0)       | 8 位加载, 0($v0) 取 v0 的第一个字节给 v1                   |
| SEB         | SEB rd, rt           | 字节符号扩展                                               |
| LUI         | lui $v0,0x4a         | v0=004A0000 取立即数到高位 GPR[rt] ← sign_extend(immediate |     | 0 16 ) |
| SB/SW/SD    | SB rt, offset(base)  | Save Byte/Word/DWORD 存字节                                |
| LW          | LW rt, offset(base)  | 加载字                                                     |

# Artcile

- [mips wiki](https://ctf-wiki.org/assembly/mips/readme/)
- [RCTF2020 逆向 cipher](https://bbs.pediy.com/thread-259892.htm)
- [CTF mips 总结](https://blog.csdn.net/qq_33438733/article/details/80233448)
- [DDCTF 2018 writeup(二) 逆向篇](https://www.anquanke.com/post/id/145553)
- [路由器初探之 mips 基础及 mips 栈溢出](https://mp.weixin.qq.com/s/fxQjS4KqNAjsPy-RX5gLVw)
