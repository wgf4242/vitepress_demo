---
sidebar: false
---
[[toc]]
https://www.itsvse.com/thread-3650-1-1.html

https://www.cnblogs.com/lsgxeva/p/9309217.html

## For
问题：每天我吃2.2个苹果，17天我吃多少个苹果？

```powershell
for ($i = 1;$i -lt 18;$i++)
{
        $苹果 = 2.2 + $苹果
        write-host $i,$苹果
}
```

```powershell
for ($i=(get-date '2020-01-20');$i -lt (get-date '2020-06-20');$i=$i.adddays(1))
{
        $苹果 = 2.2 + $苹果
        write-host $i,$苹果
}
```

## Date

```powershell
$天数 = ((get-date '2020-06-20') - (get-date '2020-01-20')).days     #值152
```

## Types
System.Text.StringBuilder        内存中的，经常改变的，大字符串

-----【数值型】-----
```
system.int32，system.int64，system.decimal，system.double，System.Numerics.BigInteger无限大整数。
常用的是int32，decimal。

1/3*3 等于1还是0.9999 就是靠数据类型控制。
```
-----【数组】-----
```
system.array                        数组
system.arraylist        数组经常变化，如总在改写，追加，删除，就要用这个。速度比较快。
System.Collections.Generic.HashSet        去重数组。和python的set对象一样。
```
-----【表格】-----
```
1命令输出。如dir，get-process。
```
## 网络
```powershell
$默认网关 = (get-netroute -DestinationPrefix 0.0.0.0/0).NextHop
& ping.exe $默认网关
```

## Environment Varaiables

```
$PSVersionTable
```
## Help

```
get-module -ListAvailable
问：不知道模块，如何查找？
答：get-module -ListAvailable


问：只知道命令的一部分，如何查找命令？
答：get-command  *service*

：知道命令，但不知道命令中都有啥参数，如何列出参数？
答：
get-help write-host -Parameter *
show-command write-host


问：知道参数，但不知道哪个命令有此参数，如何查找命令？
答：get-command -ParameterName encoding



问：如何从命令行获取某命令帮助？
答：get-help get-date

-Examples                命令例子
-online                        在线手册

问：不知道命令（不知道对象）的属性方法，如何查找？
答：
"abc"  | get-member
get-date | get-member



问：中文的.net类的手册在哪？
答：
msdn。最基本的字符串的属性和方法，的手册在。
https://msdn.microsoft.com/zh-cn/library/system.string.aspx
```
