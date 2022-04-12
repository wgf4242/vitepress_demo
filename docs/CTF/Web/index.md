
# Web

## RCE 命令绕过

包含 www.baidu.com 通过 http://user:pass@host 格式绕过16进制/8进制

`www.baidu.com@127.0.0.2`

绕过 127.0.0.1 , 2-127都可以, 8进制
```txt
127.0.0.2
...
127.0.0.127

curl 127.0.0.0x02
ping 0x7F.0x00.0x00.0x01
ping 0x7F000001
ping 0177.0000.0000.0001
```

## SSRF

1. 不存在路径绕过

`url=/http/../flag`

2. 通过127.0.0.2 ... 127


## curl 使用
curl -i -L
```txt
-i, --include       Incluude protocol response headers in the output
-L, --location      Follow redirects
```