[Unidbg + Web = Unidbg-server 手把手教你搭个签名服务器](https://blog.51cto.com/u_15527932/5205378)
[代码还原的技术: Unidbg调试浮点数运算(一)](https://blog.51cto.com/u_15527932/5205368)
[Unidbg模拟执行某段子so实操教程(二) LoadSo对比](https://blog.51cto.com/u_15527932/5218089)
[代码还原的技术: Unidbg hook_add_new实现条件断点(二)](https://blog.51cto.com/u_15527932/5205379)
[一通操作猛如虎 合并Unidbg的更新，继续跑sign](https://blog.51cto.com/u_15527932/5218273)
[Unidbg模拟执行某段子so实操教程(一) 先把框架搭起来](https://blog.51cto.com/u_15527932/5218094)
[某车联网App 通讯协议加密分析(二) Unidbg手把手跑通](https://blog.51cto.com/u_15527932/5694265)
[某车联网App 通讯协议加密分析(三) Trace Block](https://blog.51cto.com/u_15527932/5694261)
[某车联网App 通讯协议加密分析(四) Trace Code](https://blog.51cto.com/u_15527932/5708870)
[利用unidbg进行一次电子取证](https://mp.weixin.qq.com/s/Yd0veyI9iNaQq7_0h3yMqw)
[unidbg调用sgmain的doCommandNative函数生成某酷encryptR_client参数 ](https://www.52pojie.cn/thread-1680816-1-1.html) 


---
__Video__
[使用Unidbg在so中任意一个位置下断点](https://www.bilibili.com/video/BV1z14y1g7dq/)
[Unidbg使用地址的方式去调用函数](https://www.bilibili.com/video/BV19M411h7BV/)
[Unidbg中一个不存在的Class也能被正常加载？](https://www.bilibili.com/video/BV1cM411y7vG/)
[使用Frida 和 Unidbg 获取 so 在内存中的基址](https://www.bilibili.com/video/BV1aG4y1E73x/)
[Unidbg如何加载多个so](https://www.bilibili.com/video/BV1kG4y127p7/)
[如何在Unidbg中找到某个符号的地址](https://www.bilibili.com/video/BV1zd4y187vx/)
[unidbg中如何调用so中的非静态方法](https://www.bilibili.com/video/BV1uV4y1w7CN/)
[unidbg中如何调用so中的静态方法](https://www.bilibili.com/video/BV1sM41117J6/)
[如何用Unidbg去模拟执行so中的函数](https://www.bilibili.com/video/BV1We4y1L7g8/)
[Unidbg可以模拟多线程了](https://www.bilibili.com/video/BV1T24y1Q7sS/)
[怎么写一个好的Unidbg检测](https://www.bilibili.com/video/BV1sD4y1h7sE/)
[使用基地址来检测unidbg](https://www.bilibili.com/video/BV1u84y147VE/)
[unidbg会设置一个rootfs，大家知道什么是 rootfs 吗？](https://www.bilibili.com/video/BV1T44y1U7nr/)
[使用unidbg的时候，你知道什么时候要设置rootfs吗？？？](https://www.bilibili.com/video/BV1GP4y1D7Mj/)
[unidbg5个  backend 该用哪个？](https://www.bilibili.com/video/BV1rP4y1Q7rz/)
[unidbgaddBackendFactory 说明](https://www.bilibili.com/video/BV1f24y1k7u6/)
[Unidbg位数与架构的选择](https://www.bilibili.com/video/BV1ND4y1e7Tz/)
[Unidbg进程名设置](https://www.bilibili.com/video/BV1f841157cT/)
[Unidbg的使用场景](https://www.bilibili.com/video/BV1GV4y1P7xh/)
[UnidbgIllegal JNI version 0xffffffff 问题溯源](https://www.bilibili.com/video/BV1DM411z7zf/)
[很多人不会配置unidbg的环境，r0env2022直接内置好unidbg，开箱即用，即开即食~免去繁琐的环境配置之苦](https://www.bilibili.com/video/BV1YY411d7MJ/)
[unidbg中子进程fork问题](https://www.bilibili.com/video/BV1RK411d7uf/)
[使用unidbg下断点查看寄存器中的参数值](https://www.bilibili.com/video/BV1RG4y1V7zF/)
[1.使用unidbg主动调用so中的算法_batch](https://www.bilibili.com/video/BV1aR4y1o7M4/)

## Trace 技巧
简单写几个分析trace的技巧：
* 控制变量法，trace两遍对比差异
* 跟踪输入数据在寄存器/堆、栈之间的传递
* 指令运行、函数调用的次数