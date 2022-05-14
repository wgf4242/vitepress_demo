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


```
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

## navicat 配置 。
以上基础上。直接将D:\instantclient_11_2整个文件夹复制到navicat进行覆盖。
