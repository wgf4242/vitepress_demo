# nps

1 启动
2 访问 http://192.168.1.105:8080, admin/123 登录
3 登录后创建客户端，并复制命令a, 记下id 比如2
4 sock代理处添加 客户端id为2
5 用命令a启动客户端
npc.exe -server=192.168.158.134:8024 -vkey=352fdkdp4571w0tg -type=tcp

通过代理连接nps 对于配置文件方式启动,设置

我的默认: socks5://ip:1080

```
[common]
proxy_url=socks5://111:222@127.0.0.1:1080
```

对于无配置文件模式,加上参数

```
-proxy=socks5://111:222@127.0.0.1:8024
# 支持 socks5和http
即socks5://username:password@ip:port
或http://username:password@ip:port
```

## frp:

```sh
#我的默认代理
socks5://abc_WSX:abc_WSX@ip:1080

#frpc前置代理配置
http_proxy	string	连接服务端使用的代理地址			格式为 {protocol}://user:passwd@192.168.1.128:8080 protocol 目前支持 http、socks5、ntlm
```

## ew

```shell
#正向 SOCKS v5 服务器
./ew -s ssocksd -l 1080
#反弹 SOCKS v5 服务器, 
# a) 先在一台具有公网 ip 的主机A上运行以下命令：
./ew -s rcsocks -l 1080 -e 8888
# b) 在目标主机B上启动 SOCKS v5 服务 并反弹到公网主机的 8888端口
./ew -s rssocks -d 1.1.1.1 -e 8888

#多级级联 工具中自带的三条端口转发指令， 它们的参数格式分别为：
./ew -s lcx_listen -l  1080   -e 8888  
./ew -s lcx_tran   -l  1080   -f 2.2.2.3 -g 9999  
./ew -s lcx_slave  -d 1.1.1.1 -e 8888    -f 2.2.2.3  -g  9999
# 通过这些端口转发指令可以将处于网络深层的基于TCP的服务转发至根前,比如 SOCKS v5。首先提供两个“二级级联”本地SOCKS测试样例：
# a) lcx_tran 的用法
./ew -s ssocksd  -l 9999
./ew -s lcx_tran -l 1080 -f 127.0.0.1 -g 9999
# b) lcx_listen、lcx_slave 的用法
./ew -s lcx_listen -l 1080 -e 8888
./ew -s ssocksd    -l 9999
./ew -s lcx_slave  -d 127.0.0.1 -e 8888 -f 127.0.0.1 -g 9999
#再提供一个“三级级联”的本地SOCKS测试用例以供参考
./ew -s rcsocks -l 1080 -e 8888 
./ew -s lcx_slave -d 127.0.0.1 -e 8888 -f 127.0.0.1 -g 9999  
./ew -s lcx_listen -l 9999 -e 7777  
./ew -s rssocks -d 127.0.0.1 -e 7777
#数据流向: SOCKS v5 -> 1080 -> 8888 -> 9999 -> 7777 -> rssocks
```

## UPnProxyChain：

通过多个主机代理：
```shell
# start proxy
./upnproxychain.py <IP1> <IP2> <IP3> <IP4> <IP5>
# use the proxy to curl example.com
curl socks5h://localhost:1080 http://example.com
```

检查主机是否存在漏洞：
```shell
./upnproxychain.py -v -c <IP>
```
