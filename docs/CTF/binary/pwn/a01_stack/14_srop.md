[CTF竞赛 -- SROP详解](https://mp.weixin.qq.com/s/Z0r1v-a0l30sEm6rqvny_A)

使用前提 

- 存在溢出，能够控制返回地址。
- 能调用sigreturn，或利用read控制RAX
- 知道/bin/sh的地址，如果写的bss段，直接写地址就行，如果写到栈里，还需要想办法去泄露栈地址。
- 允许溢出的长度足够长
- 知道syscall指令的地址
