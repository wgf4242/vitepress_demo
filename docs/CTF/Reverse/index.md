[[toc]]

[Frida](./frida)

[相关加密](./recrypto.md)
## TODO
https://www.52pojie.cn/thread-1623713-1-1.html  finger符号还原
## 解题思路
1.smc
2.搜索++ 当作索引 找关键信息
3.两串密文先猜异或
4.key/enc 看交叉引用前面有没有修改，有修改用动调拿到修改后的
5.迷宫题多观察迷宫
* 1.可能暴露起点和终点位置
* 2.直接找到上下左右字母。DFS解题

## 程序头修改
1. 55 48 89 E5
```
push rbp
mov rbp,rsp
```

2.
机器码 55 56 53 48 49 E5

```asm
push rbp
push rsi
push ebx
mov rbp, rsp
```

## angr

[angr题库](https://github.com/jakespringer/angr_ctf)

[参照文章](https://www.anquanke.com/post/id/212816)

## 提问
ida 调试时  watch view 怎样计算地址值比如 *(Map+1100+1)
idapython怎样通过变量名获取变量地址


## objective-c
https://blog.trackonyou.top/2021/06/26/a1aab78dc414/

## Book
逆向工程核心原理