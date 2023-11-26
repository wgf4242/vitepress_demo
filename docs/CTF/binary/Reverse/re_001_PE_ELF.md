# PE
## 修改段信息、可执行权限、地址随机化

- 段改为可执行
CFF explorer: 
Section Header: 右击 .data - Change Section Flags - 勾Isexecutable
- 地址随机化: dll不建议关闭随机基址，否则多个dll可能会冲突 
    - 0x15E 的位置从 0x60 改为 0x20
Option header - Dll Characteristics, can move 去掉。

- 010方式关闭地址随机化: 
    strcut IMAGE_NT_HEADERS NtHeader
    - struct IMAGE_OPTIONAL_HEADER32 OptionalHeader
        - struct DLL_CHARACTERISTICS DllCharacteristics
            - WORD IMAGE_DLLCHARACTERISTICS_DYNAMIC_BASE: 1 改成0


# ELF
查看随机化

```sh
$ cat /proc/sys/kernel/randomize_va_space   # 2
$ sysctl -a --pattern randomize             # kernel.randomize_va_space = 2
# 0 = 关闭
# 1 = 半随机。共享库、栈、mmap() 以及 VDSO 将被随机化。（留坑，PIE会影响heap的随机化。。）
# 2 = 全随机。除了1中所述，还有heap。

ldd /bin/bash  # 开启时每次地址结果不同, 关闭时结果相同
```

关闭随机化

```sh
echo 0 > /proc/sys/kernel/randomize_va_space # m1. root权限执行
sysctl -w kernel.randomize_va_space=0        # m2. 临时改变
setarch `uname -m` -R ./your_program         # m3 .临时改变

gdb$ set disable-randomization on            # m4. gdb 查看用 show disable-randomization
```