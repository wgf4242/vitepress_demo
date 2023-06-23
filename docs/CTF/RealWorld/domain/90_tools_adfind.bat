@echo off
del ad.md 2>nul

for /f "tokens=1,2,3 delims=." %%a in ('Adfind.exe -sc dclist') do ( set dc=%%a&& set DN=%%b&& set ORG=%%c)
echo # dclist >>ad.md
Adfind.exe -sc dclist >>ad.md
for /f "tokens=2 delims=[]" %%a in ('ping %dc%.%DN%.%ORG% -n 1 ^| findstr /r "\[[0-9]*\.[0-9]*\.[0-9]*\.[0-9]*\]"') do set ip=%%a
echo %ip% >>ad.md

echo # dc system >>ad.md
AdFind.exe -schema -s base objectversion >>ad.md
echo # computer >>ad.md
Adfind.exe -b dc=%DN%,dc=org -f "objectcategory=computer" -dn >>ad.md
echo # user >>ad.md
Adfind.exe -f "(&(objectcategory=person)(objectclass=user))" -dn  >>ad.md
echo # computer1 online >>ad.md
net view /domain:%DN%  >>ad.md
echo # computer2 lite >>ad.md
Adfind.exe -f "objectcategory=computer" -dn >>ad.md
echo # computer3 system >>ad.md
AdFind.exe -f "objectcategory=computer" name operatingSystem >>ad.md
echo # computer4 full >>ad.md
Adfind.exe -f "objectcategory=computer" >>ad.md
echo # adminisable >>ad.md
AdFind.exe -default -f "(&(|(&(objectCategory=person)(objectClass=user))(objectCategory=group))(adminCount=1))" -dn >>ad.md
echo # 非约束委派主机 >>ad.md
AdFind.exe -b "DC=%DN%,DC=org" -f "(&(samAccountType=805306369)(userAccountControl:1.2.840.113556.1.4.803:=524288))" cn >>ad.md
echo # 非约束委派用户 >>ad.md
AdFind.exe -b "DC=%DN%,DC=org" -f "(&(samAccountType=805306368)(userAccountControl:1.2.840.113556.1.4.803:=524288))" cn distinguishedName >>ad.md

echo # current user group -- check dsync >>ad.md
net user %username% /domain  >>ad.md
