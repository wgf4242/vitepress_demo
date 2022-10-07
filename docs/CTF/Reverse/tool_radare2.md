

r2 -A libfoo.so

parameter 
```
-d 启动调试器
-A 进行分析
r2 -A libfoo.so
```
```
$ afl # list all function
$ s sym.Java_sg_vantagepoint_uncrackable2_CodeCheck_bar
$ pdg # 显示CodeCheck_bar伪代码
```

帮助 
```
pdg 查看decompiler的代码

/?
```



4.2 寻找main函数然后打印出来

```
s main
pdf
```

视图模式

```
# v 进入视图模式
# p\P 返回 p返回反汇编视图
# q 退出
# ? 帮助
# enter 隐藏或显示其他界面

# :command  与vim类似的指令模式
# ;<comment> 写注释
# VV 进入函数框架模式，类似IDA开始的界面
# R 代码块设置为随机颜色
# g 跳转

# 视图模式下每个函数有数字编号，按该数字进入该函数
# :> ? 0x88 可以列出0x88的数据转换十进制，16禁制，浮点数等信息
```

* 变量命名
```s
# 跳转到main 显示寄存器和变量
[0x08048360]> s main
[0x08048414]> afv
var char * s2 @ esp+0x4
var char * s1 @ ebp-0x18
[0x08048414]> pdf

# 查看一个scanf 的第一个参数
[0x08048414]> ps @ 0x804858c
%s

# 重命名变量
[0x08048414]> afvn passwd s2
[0x08048414]> afvn input s1
[0x08048414]> pdf
            ; DATA XREF from entry0 @ 0x8048377
┌ 127: int main (int argc, char **argv, char **envp);
│           ; var char *input @ ebp-0x18
│           ; var char *passwd @ esp+0x4

# 移除变量名
[0x08048414]> afv-s1

# 按v 进入视图模式 再按c 选中行 ; 写注释
```


* Article
教学 https://blog.csdn.net/qq_31507523/article/details/117200476
https://enovella.github.io/android/reverse/2017/05/20/android-owasp-crackmes-level-2.html

manual https://book.rada.re/analysis/variables.html