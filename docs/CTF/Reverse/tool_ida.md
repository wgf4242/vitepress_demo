[在IDA pro下调试DLL的方法](http://www.360doc.com/content/15/0524/14/12129652_472898279.shtml)

## 环境配置
1.显示中文 https://blog.csdn.net/fuchaosz/article/details/104827280

## 入门 
### 第一个示例
1.jadx打开apk，右击函数 `复制为frida片段`
2.新建foo.js粘贴
```js
Java.perform(function(){
  // 这里粘贴
}
```
3.frida -UF -l foo.js

在手机上点击对应按钮即可

## 快捷键 

Ctrl+N  调试中 set ip, 设置下一步走到哪个位置。
Alt+D  修改变量类型
## Debug

### gdb server

```shell
gdbserver *:23946 ./elf
gdbserver 0.0.0.0:23946 ./elf
```

## Plugins
diaphora,可以将函数名、注释、结构体等的先前版本移植到新版本
BinDiff（程序本体需手动安装） 和 ret-sync 插件
BinCAT 插件，需要手动导入脚本安装
## keypatch//assemble
16进制keypatch 要用0x33, 不能33h


## FAQ
### 1. graph is too big , more than 1000 nodes
options - general - graph 
将1000改为10000

### 1. upx脱壳时：提示：无法读取被调试进程 XXXXXXX 的内存。

```   
方法1.去除随机地址。
方法2.请使用 52pojie WinXP虚拟机2.0。或者去掉随机地址ASLR
```
### Decompilation failure: 83A: too big function
[ACTF新生赛2020]SoulLike
解决办法是将ida /ctg目录下的hexrays.cfg文件中的MAX_FUNCSIZE=64 改为 MAX_FUNCSIZE=1024。

### View XMM registers
https://reverseengineering.stackexchange.com/questions/20035/view-xmm-registers-in-ida-pro-while-debugging

Debugger -> Debugger Windows -> XMM Registers子窗口
### ida python 调试
https://github.com/ioncodes/idacode
