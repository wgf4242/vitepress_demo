
## x64dbg快捷键
```
g 图表
h 点击变量，可以高亮。
bp InternetOpenUrlA # 只有加载后才能用函数名下断点
bph esp 硬件断点
bphc 删除硬件断点
```
## IDA地址转OD地址
查看并计算ida偏移。
用OD基地加偏移跳转。


## Patch
x32dbg/x64dbg 右击补丁 - 补丁文件 - 保存为x.exe

# x64dbg


Trace: --> trace record -> word 查看实际执行路线。

Graph模式
1.运行到call处, 右键 - Sync with origin (S).进入call.
2.SS : going back into the stepped in call.


## 设置

设置 - 事件 - ×TLS回调
设置 - Exception: 范围 00000000 - ffffffff


---
x64dbg的默认设置: 系统断点 入口断点 用户TLS回调函数

* 看不到进程
1. 选项: Engine 选项卡 - Enable Debug Privilege
2. 管理员身份运行 x64dbg。


## 快捷键
G Graph,查看图流程 
Ctrl+Backspace 还原选择
Ctrl+P Patch
Ctrl+F9 执行到返回
Ctrl+9 Nop
