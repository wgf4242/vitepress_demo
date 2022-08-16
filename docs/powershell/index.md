---
sidebar: false
---
[[toc]]
https://www.itsvse.com/thread-3650-1-1.html

https://www.cnblogs.com/lsgxeva/p/9309217.html

升级 https://github.com/PowerShell/PowerShell/releases/tag/v7.2.6

## whatif
模拟操作 提示运行会产生什么影响

```ps1
Get-ChildItem "D:\" -Recurse | Remove-Item -WhatIf
Get-ChildItem "D:\" -Recurse | Remove-Item -Confirm
```


## Environment Varaiables

```
$PSVersionTable
gci env:* | sort-object name
echo $env:Appdata
```

### 替代  Out-File [path]


### 常用命令

删除空行
```powershell
(gc file.txt) | ? {$_.trim() -ne "" } | sc file.txt
(gc file.txt) | ? { -not $_.IsNullOrWhiteSpace() } | sc file.txt

# gc Get-Content
# sc Set-Content
```


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
## Help/FAQ

```
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


## Symbols
`&` is the call operator which allows you to execute a command, a script, or a function.
For more details:
```
Syntax
      & "[path] command" [arguments]

$LocalComputerName = & $ENV:windir\System32\HostName.exe

https://stackoverflow.com/questions/22074507/what-does-the-symbol-in-powershell-mean
```

`?`:

```ts
$_表示循环变量
?: `? {}` 问号(?)其实就是Where-Object的符号别名 在 alias中也可看到
```

## 文件操作

写入文件 Out-File
```ts
Get-Process | Out-File -FilePath .\Process.txt
```

## FAQ
###  Linux < 如何在windows下做同样的效果
```sh
python3 <(curl -sSL https://wmctf.wm-team.cn/pow.py) solve s.ACxJ.AABi17sGZ2TxvXrsHd/D9y0O

# oss: Out-String -Stream  https://bbs.et8.net/bbs/showthread.php?t=1404895
curl.exe -sSL  https://wmctf.wm-team.cn/pow.py | oss | python - solve s.ACxJ.AABi17sGZ2TxvXrsHd/D9y0O
curl.exe -sSL  https://wmctf.wm-team.cn/pow.py | python - solve s.ACxJ.AABi17sGZ2TxvXrsHd/D9y0O
```

* remove blank lines
```powershell
(gc file.txt) | ? {$_.trim() -ne "" } | set-content file.txt
(gc file.txt) | ? { -not [String]::IsNullOrWhiteSpace($_) } | set-content file.txt
(gc file.txt) | ? { -not [System.String]::IsNullOrWhiteSpace($_) } | set-content file.txt
```
