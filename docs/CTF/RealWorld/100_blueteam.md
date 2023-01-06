# 蓝队加固系统

__linux__

```shell
# d盾查杀
tar zxcf www.tar.gz /var/www/html
crontab -e
cat /etc/passwd
firewall
echo "toor:pass" | sudo chpasswd 
rm htaccess
#admin 变普通用户，其他 变管理员
```

__windows__

```shell
tar zxcf www.tar.gz /var/www/html
taskschd.msc
net user administrator S0me@pwd
# 135, 445 关闭

# Query Remote Sessions: qwinsta /server:[ServerIP/Hostname]
qwinsta /server:127.0.0.1
qwinsta /server:myServer.Contoso.com
#Kill a Remote Desktop Session
rwinsta /server:wowhvdev1 RemoteID

mstsc /console # 强行登录
mstsc /console /admin # 强行登录
```

__mysql__

```shell
root 密码
远程
端口
创建新用户给 web, 并配置 /var/www/html/Config.php 或 conn.php
local_infile = 0
```
## 边缘机器加固
见 ATT&CK实战系列-红队评估 （三）
1. 内网机器建立服务, 并且断掉网关。交机换中禁止其出网
2. 边缘机器 代理内网机器服务。# 即使被控无法直接弹shell

# Article
[干货|内存马检测排查手段 （附工具 ）](https://mp.weixin.qq.com/s/Hr8AEK1HVgc_6T6i1pUhWQ)