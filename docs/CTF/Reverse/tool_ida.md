## 环境配置
1.显示中文 https://blog.csdn.net/fuchaosz/article/details/104827280
## 快捷键 

Ctrl+N  调试中 set ip, 设置下一步走到哪个位置。
Alt+D  修改变量类型


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

