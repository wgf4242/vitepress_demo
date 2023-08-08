[ret2syscall](https://syscalls.w3challs.com/?arch=x86)
[ret2syscall_x64](https://syscalls.w3challs.com/?arch=x86_64)

```sh
int 0x80; 32bit
syscall ; 64bit
```

64位
```bash
syscall: 0x0f    0x05  # print(disasm(asm('syscall')))
```
## 示例见 hook_lief_patch1
