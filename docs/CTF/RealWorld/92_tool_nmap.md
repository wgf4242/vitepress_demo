## Nmap
[最新Nmap入门技术](https://mp.weixin.qq.com/s/nWZlBIzi8vaMxlKOhnJz9w)

主机探测(一)

```shell
# 常用
proxychains4 nmap -Pn -sT -T4 -p21,22,135,445,80,53,3389,8080,1433,8080 192.168.183.129
proxychains4 nmap -Pn -sS -T4 -p21,22,135,445,80,53,3389,8080,1433,8080 192.168.183.129
nmap -sV -Pn -n --proxies socks4://127.0.0.1:9050 scanme.nmap.org
nmap -Pn --script vuln -p8080 192.168.1.1
```

- 检测指定端口服务
- nmap -p 80 192.168.91.129 -Pn -sV
- nmap -sT -sV -O -sC -p1337,3306 192.168.203.118
- 扫描单个主机
- nmap 192.168.1.2
- 扫描整个子网,命令如下:
- nmap 192.168.1.1/24
- 扫描多个目标,命令如下:
- nmap 192.168.1.2 192.168.1.5
- 扫描一个范围内的目标,如下:
- nmap 192.168.1.1-100 (扫描 IP 地址为 192.168.1.1-192.168.1.100 内的所有主机)果你有的所有里税济个保存为一个 txt 文件,和 nmap 在同一目录下,扫描
- nmap -iL target.txt

主机探测(二)

- 如果你想看到你扫描的所有主机的列表,用以下命令:
- nmap -sL 192.168.1.1/24
- 扫描除过某一个 ip 外的所有子网主机,命令:
- nmap 192.168.1.1/24 -exclude 192.168.1.1
- 扫描除过某一个文件中的 ip 外的子网主机命令
- nmap 192.168.1.1/24 -excludefile xxx．txt(xxx．txt 中的文件将
  会从扫描的主机中排除)

| 扫描选项 | 扫描时间 | 是否需要 root/sudo |                            |
| -------- | -------- | ------------------ | -------------------------- |
| -p       |          |                    | 端口范围                   |
|          |          |
| -sS      | 16.82    | 是                 | SYN,比 sT 快               |
| -sT      | 16.72    | 否                 | 默认,TCP 扫描,要 3 次握手  |
| -sU      | 1091.03  | 是                 | UDP 扫描                   |
| -sN      | 17.94    | 是                 | TCP NULL 探测              |
| -sV      | 28.87    | 否                 | 服务探测                   |
| -A       | 42.95    | 否                 |                            |
| -Pn      |          |                    | 禁用 PING 检测             |
| -T4      |          |                    | 有 T0-T5，貌似 T4 比较折中 |
| -iL      |          |                    | 载入 ip 文件，批量扫       |
| -n       |          |                    | 不解析域名，加快扫描速度   |
| -v       |          |                    | 显示详细信息               |
| -sA      |          |                    | ACK                        |
| -sR      |          |                    | RPC                        |
| -sP      |          |                    | ICMP                       |

TCP 扫描 (-sT)

- 这是一种最为普通的扫描方法,这种扫描方法的特点是
- 扫描的速度快,准确性高,对操作者没有权限上的要求,
- 但是容易被防火墙和 IDS(防入侵系统) 发现
- 运行的原理:通过建立 TCP 的三次握手连接来进行信息的传递

①Client 端发送 SYN;
②Server 端返回 SYN/ACK, 表明端口开放;
③Client 端返回 ACK, 表明连接已建立;
Client 端主动断开连接.

端口扫描

```sh
# 快速扫描
nmap -T4 -F 192.168.93.20
sudo nmap -sS -Pn -p 445 -n --open --min-hostgroup 1024 --min-parallelism 10 --host-timeout 30 -T4 -v -oG results-all.txt 192.168.52.0/24
sudo nmap -sS -Pn -p 445 -n --open --min-hostgroup 1024 --min-parallelism 10 --host-timeout 30 -T4 -v -oG results-all.txt -iL ip.txt
nmap -PU 192.168.1.0/24                                  # UDP ping探测主机:
nmap -sV 192.168.1.1                                     # -sV: 扫描运行服务/软件版本
nmap -P0 192.168.1.131                                   # 无Ping扫描，可以躲避某些防火墙的防护
nmap -sP 192.168.0.0/24                                  # ping扫描
nmap -Pn -sV --script unusual-port 192.168.1.1
nmap -Pn -sV --script unusual-port 192.168.1.1 -p 9527
nmap -T4 -A -v 192.168.1.1                               # 快速扫描主机全部信息
nmap -PS80,8080,21-30 192.168.1.131                      #TCP SYN Ping扫描,可以躲避防火墙
nmap -PA80,8080,21-30 192.168.1.131                      #TCP ACK Ping扫描,可以躲避防火墙
nmap -R 192.168.1.131/24                                 #反响域名解析,扫描一个C段，可以知道那个ip上存在网站
nmap --traceroute 192.168.1.131                          #路由追踪，查看本地计算机到目标之间所经过的网络节点
nmap -PY -v 192.168.1.131                                #SCTP INIT Ping扫描，通过向目标发送INIT包，根据目标主机的相应判断目标主机是否存活

dirb http://192.168.1.1        # Web扫描
nikto -host http://192.168.1.1 # Web扫描
ZAP                            # kali 菜单栏: Web工具: ZAP # OWASP ZAP 漏洞检测
```

常见扫描方式
disable port scan:-sn

- nmap -sn -PR 192.168.0.0/24 arp 扫描

探测目标主机的操作系统

- nmap -O 192.168.1.19
- nmap -A 192.168.1.19
- -oN 导出扫描结果
- -oX 导出扫描结果 xml 格式

nmap 信息脚本收集

| 脚本                                | 解释                              |
| ----------------------------------- | --------------------------------- |
| hostmap-ip2hosts i                  | IP 反查                           |
| dns-brute                           | DNS 信息搜集                      |
| membase-nttp-info                   | 检索系统信息                      |
| smb-security-mode.nse               | 后台打印机服务漏洞                |
| smb-check-vuins.nse                 | 系统漏洞扫描                      |
| http-stored-xss.nse                 | 扫描 web 漏洞                     |
| snmp-win32-services                 | 通过 Snmp 列举 Windosws 服务/账户 |
| dns-brute                           | 枚举 DNS 服务器的主机名           |
| http-headers/http-sitemap-generator | HTTP 信息搜集                     |
| ssl-enum-ciphers                    | 枚举 SSL 密钥                     |
| ssh-hostkey                         | SSH 服务密钥信息探测              |

- 对目标进行 IP 反查
- nmap -sn --script hostmap-ip2hosts www.hao123.com
- 对目标 DNS 信息的收集
- nmap --script dns-brute www.test.com
- nmap --script dns-brute dns-brute.threads=10 www.test.com
- 了解目标系统的详细信息
- nmap -p 445 192.168.23.1 --script membase-http-info

- 检查打印服务漏洞
- nmap --script smb-security-mode.nse -p 445 192.168.21.3
- 扫描目标的 xss 漏洞
- nmap -p80--script http-stored-xss.nse www.test.com
- 扫描目标的 SQL 注入漏洞
- nmap -p8001--script http-sql-injection.nse 192.168.0.200

漏洞探测

- 扫描系统漏洞
- nmap -Pn --script vuln 192.168.1.1
- nmap --script=vuln www.xxxxxx.com -Pn
- nmap -A 192.168.0.2 -Pn
- IIS 短文件泄露
- nmap -p 8080--script http-iis-short-name-brute 192.168.1.1
- 拒绝服务
- nmap --max-parallelism 800--script http-slowloris www.cracer.com
- 验证 http 中开启了 put 方法
- nmap --script http-put--script-args http-put.url=/uploads/testput.txt,http-
  put.file=/root/put.txt 218.19.141.16
- 验证 MySQL 匿名访问
- nmap --script mysql-empty-password 203.195.139.153

防火墙躲避

- -f 分片绕过
- -D 使用诱饵隐蔽扫描
- NMAP -D1.1.1.1,222.222.222.222www.cracer.com
- --source-port 源端口欺骗
