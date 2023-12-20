### Canary
[canary的各种姿势----pwn题解版  ](https://www.52pojie.cn/thread-932096-1-1.html)
[PWN之Canary学习](https://www.jianshu.com/p/85d0f7ae822e)

* 最后一位是 \x00
* 格式化字符串绕过
* scanf 用 + 绕过

通过格式化字符串读取 canary的值

* Canary爆破（针对有fork函数的程序）

fork作用相当于自我复制，每一次复制岀来的程序，内存布局都是一样的，当
样。那我们就可以逐位爆破，如果程序崩溃了就说明这一位不对，如果程序
接着跑下—位，直到跑出正确的 canary

* Stack smashing（故意触发 canary_ ssp leak）
* 劫持__stack_chk_fail

修改got表中 stack chk faile函数的地址，在栈溢出后执行该函数，但由于该函数地址被修改，所以程序会跳转到我们想要执行的地址

canary 最后一位是\x00防止连带输出,修改时要改最后一位
### PIE
[关闭地址地址](../../Reverse/re_001_PE_ELF.md#%E5%85%B3%E9%97%AD%E9%9A%8F%E6%9C%BA%E5%8C%96pie)

PIE技术是一个针对代码段（text）、数据段（data）、未初始化全局变量段（bss）
等固定地址的—个防护技术，如果程序开启了PIE保护的话，在每次加载程序时都变
换加载地址，从而不能通过 ROPgadget等一些工具来帮助解题

[PIE调试](https://www.bilibili.com/video/BV1Uv411j7fr?p=8)

* 绕过方法

pie后，地址最后三个数是已知的，
程序的加载地址一般都是以内存页为单位的，所以程序的基地址
最后三个数字一定是0，静态地址最后三个数就是实际地址的最后三个数。
知道最后三个数，利用栈上已有的地址，只修改他们最后两个字节（最后四个数）即可。

所以对于绕过PE保护的核心思想就是 partial writing（部分写地址）

`b *$rebase(0x933)`
