
万能 gadget 特征 pop r12;pop r13 等等, 可以控制 rdx

```sh
.text:000000000040072B 5D                            pop     rbp
.text:000000000040072C 41 5C                         pop     r12
.text:000000000040072E 41 5D                         pop     r13
.text:0000000000400730 41 5E                         pop     r14
.text:0000000000400732 41 5F                         pop     r15
.text:0000000000400734 C3                            retn
也可能是 mov  rbx, [rsp+38h+var_30]

5F C3 => pop rdi; retn
5E xxxx C3 => pop rsi; xxxx; retn
5D => pop rbp
5C => pop rsp
```

# execve pop链

```sh
libc.address + 0x23b63 = pop r12;pop r13;pop r14;pop r15;ret # 传 0,0,0,0进去再执行下面
libc.address + 0xe3afe = mov rdx, r12;mov rsi, r15;lea rdi, lea rdi, aBinSh;call execve <execve>; # execve("/bin/sh", r12, r15);
```