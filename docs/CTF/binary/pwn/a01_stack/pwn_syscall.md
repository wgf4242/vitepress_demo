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

| syscall      | x64         | x86 | params                    |                                                                                                           |
| ------------ | ----------- | --- | ------------------------- | --------------------------------------------------------------------------------------------------------- |
| rt_sigreturn | mov rax,0Fh |     |                           |                                                                                                           |
| execve()     | rax=59      |     | `const char *const *argv` | 2 层指针, 比如 `4007BB: /bin/cat` 而 `0000601040: 0x4007BB`, 那么使用 `0x601040` , 用交叉引用向上引用一下 |
| sys_read     | 0           |     |                           |                                                                                                           |
| sys_write    | 1           |     |                           |                                                                                                           |

## 示例见 hook_lief_patch1
