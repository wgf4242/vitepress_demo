https://404bugs.com/details/1101856895458398208

**canary** 位置

<table border='1'><tbody><tr><td>低地址</td><td rowspan="4">buf</td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td></tr><tr><td></td><td>canary \x00结束</td></tr><tr><td>rbp - 0x8</td><td>rbp</td></tr><tr><td>高地址</td><td>ret_addr</td></tr></tbody></table>

- sendline 时有 canary 时 \n 会占一个字符可能手动输入时有影响, 这时使用 send

# 方法一:覆盖 00 方式

buf 的大小在 100 字节，但是在 canary 保护下当输入的数据超过 100 字节后就会触发 canary，不过当我们正好输入 100 个字符时，末尾自动添加的换行符\x0a 便会将 canary 末尾的\x00 覆盖，
这样的话，程序代码中的 printf(buf)就直接能将 canary 的内容读取出来了，之后再减去\x0a，拿 canary 的值填充至栈中，即可绕过 canary 保护完成栈溢出。

# 方法二:爆破 Canary:

虽然每次进程重启后的 Canary 不同(相比 GS，GS 重启后是相同的),但是同一个进程中的不同线程的 Canary 是相同的并目通过 fork 函数创建的子进程的 Canary 也是相同的因为 fork 函数会直接拷贝父进程的内存我们可以利用这样的特点，彻底逐个字节将 Canary 爆破出来

- 缺点:多进程程序,32 位程序需要爆破 3 字节,64 位程序需要爆破 7 字节,需要爆破较多

# 其他方法:

- 1.联合其他漏洞修改劫持 stack chk fail 函数
- 2.覆盖 TL 中储存的 Canary 值:
  已知 Canary 储存在 TLS 中，在函数返回前会使用这个值进行对比。当溢出尺寸较大时，可以同时覆盖栈上储存的 Canary 和 TLS 储存的 Canary 实现绕过
