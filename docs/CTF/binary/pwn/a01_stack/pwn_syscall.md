[ret2syscall](https://syscalls.w3challs.com/?arch=x86)
[ret2syscall_x64](https://syscalls.w3challs.com/?arch=x86_64)

```sh
int 0x80; 32bit
syscall ; 64bit
```

```bash
# 64位
# sigreturn 代表可以触发sigreturn调用的地址
# 其gadgets如下，只要使rax = 0xf，然后进行系统调用
"""
0x001 mov rax, 0Fh
0x002 syscall
0x003 ret
"""

# sigreturn
syscall: 0x0f 0x05  # print(disasm(asm('syscall')))
```

| syscall      | x64         | x86 |
| ------------ | ----------- | --- |
| rt_sigreturn | mov rax,0Fh |     |
| execve()     | rax=59      |     |

## 示例见 hook_lief_patch1
