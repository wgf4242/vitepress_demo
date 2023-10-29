* [C 函数调用过程分析](https://mp.weixin.qq.com/s/6vjw6K97btDpucEUo9Q4cg)
[PWN入门之二进制基础](https://mp.weixin.qq.com/s/BE0bKukPLi2ndcSV9UcAeg)
[Linux ELF二进制文件解析及实战](https://mp.weixin.qq.com/s/Q4xrm8xraTwYMd6DMRGROA)


# 调用约定


[Windows下x64反汇编参数传递约定](https://blog.csdn.net/a2831942318/article/details/127774181)
一句话，调用顺序为从左到右,  `Function( rcx, rdx, r8,r9, [rsp+0x20], [rsp+0x28], [rsp+0x30], [rsp+0x38], [rsp+0x40], [rsp+0x48], [rsp+0x50], [rsp+0x58], [rsp+0x60] ...)`

Linux x64调用 `RDI,RSI, RDX, RCX, R8, R9 ,剩下的参数压栈保存.`
