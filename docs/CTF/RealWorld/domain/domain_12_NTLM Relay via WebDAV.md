- 春秋云境 Spoofing

* https://www.cnblogs.com/yokan/p/16102699.html
* https://daiker.gitbook.io/windows-protocol/ntlm-pian
* https://cloud.tencent.com/developer/article/2267322

  NTLM Relay 大体是什么意思呢，其实就是域中的中间人攻击，通过一些方法触发客户端进行认证，将 Net-NTLM Hash 传给我们，我们再带着这个信息去访问 DC，从而实现 Relay。而 NTLM 只是一个底层的认证协议，需要上层协议的支持，比如 smb 也能作为其上层协议，这里是对于 WebDAV(HTTP) 协议进行攻击。需要注意的是不同的协议，其需要的签名状态不同，比如：

relay 到 smb 服务要求被攻击机器不能开启 SMB 签名，普通域内机器默认不是开启的，但是域控是默认开启的。
relay 到 ldap 也要求被攻击机器不开启 ldap 签名，而默认情况下是协商签名，即如果客户端是 smb 协议的话，则默认要求签名，如果是 webadv 或 http 协议，是不要求签名的。

```sh
# 检测内网启动了 WebClient 服务的机器：
python cme smb 172.22.11.0/24 -u yangmei -p xrihGHgoNZQ -d xiaorang.lab -M Webdav
# 以及 check PetitPotam 是否能够进行强制触发，这里有对于强制触发的总结。
python cme smb 172.22.11.0/24 -u yangmei -p xrihGHgoNZQ -d xiaorang.lab -M PetitPotam
```
