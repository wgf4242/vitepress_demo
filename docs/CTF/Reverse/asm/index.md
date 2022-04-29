
## adc
adc是带进位加法指令，它利用了CF位上记录的进位值。

::: tip
指令格式：adc 操作对象1, 操作对象2

功能：操作对象1 = 操作对象1 + 操作对象2 + CF
:::
# visual studio asm
https://stackoverflow.com/questions/20078021/how-to-enable-assembly-language-support-in-visual-studio-2013

# nasm 编译 asm文件

demo.asm

```asm
section	.text
	global _start       ;must be declared for using gcc
_start:                     ;tell linker entry point
	mov	edx, len    ;message length
	mov	ecx, msg    ;message to write
	mov	ebx, 1	    ;file descriptor (stdout)
	mov	eax, 4	    ;system call number (sys_write)
	int	0x80        ;call kernel
	mov	eax, 1	    ;system call number (sys_exit)
	int	0x80        ;call kernel

section	.data

msg	db	'Hello, world!',0xa	;our dear string
len	equ	$ - msg			;length of our dear string
```

```bash
$nasm -f elf *.asm; ld -m elf_i386 -s -o demo *.o
$nasm -f win64 *.asm; ld -m elf_i386 -s -o demo *.o
win64
$demo
Hello, world!
```


## 指令解读

var_18 通常是 stack-18
```asm
.text:0000000000295837 mov     [rsp+18h+var_18], r8d           ; push
.text:000000000029583B mov     [rsp+18h+var_14], esi           ; push,arg2
```
