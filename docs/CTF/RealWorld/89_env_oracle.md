# Oracle
[Navicat 11.2](https://download.navicat.com.cn/download/navicat112_premium_cs_x86.exe)
[Navicat 11.2](https://download.navicat.com.cn/download/navicat112_premium_en_x86.exe)

plsql
instant client 下载
1. 注意x64和x86。  navicat和plsql 对应的x86和x64要一致。
instant client 下载

plsql: help - support info 
查看 tnsfile

instant client解压到 D:\instantclient_11_2
## 配置环境变量
1.
TNS_ADMIN=D:\instantclient_11_2
2.
PATH添加 %D:\instantclient_11_2%
```
setx TNS_ADMIN "D:\instantclient_11_2" /m
```
D:\instantclient_11_2创建tnsnames.ora



```sql
-- 查看SID
select instance_name from V$instance;
-- 查看 Service name
SELECT value FROM v$parameter WHERE name='service_names';
```

配置示例1
```js
NORMAL_127.0.0.1 =
  (DESCRIPTION =
    (ADDRESS_LIST =
      (ADDRESS = (PROTOCOL = TCP)(HOST = 127.0.0.1)(PORT = 1521))
      (ADDRESS = (PROTOCOL = TCP)(HOST = 10.63.81.127)(PORT = 1521))
    )
    (CONNECT_DATA =
      (SID = Normal)
      (SERVER = DEDICATED)
    )
  )
```
示例2
```js
sit_cc =
  (DESCRIPTION =
    (ADDRESS_LIST =
    (ADDRESS = (PROTOCOL = TCP)(HOST = 192.168.154.1)(PORT = 1521))
  )
  (CONNECT_DATA =
    (SERVER = DEDICATED)
    (SERVICE_NAME = cc)
  )
)
```

### 重启 Oracle
比如修改了normal数据库, 重启服务,
```
OracleOraHome92TNSListener
OracleServiceNormal
```
### PL/SQL 登录
Database: 192.168.200.70:15121/scm


## navicat 配置
以上基础上。直接将D:\instantclient_11_2整个文件夹复制到navicat进行覆盖。

网络服务名 根据配置 可能为 TNS

Navicat 11 - Oracle 9i
