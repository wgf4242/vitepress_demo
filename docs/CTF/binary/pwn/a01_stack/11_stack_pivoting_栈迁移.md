https://www.cnblogs.com/max1z/p/15299000.html
https://bbs.kanxue.com/thread-258030-1.htm

方式1 修改rbp, ret到 write, 然后泄露libc, one_gaget
方式2 00覆盖泄露地址。然后计算偏移得到目的地址。

1. 第一次泄露ebp地址,计算迁移地址
2. 第二次输入将构造好的payload读入buf.利用 leave retn 进行栈支持,劫持到一开始buf读入的地址.这个地址可以通过动态调试计算其偏移.