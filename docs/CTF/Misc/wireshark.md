[[toc]]
## 环境配置
视图 - 着色规则
## Wireshark - 浏量数据分析
1.改成zip解压
1.foremost filename
2。文件-导出对象-HTTP-save all
2.telnet协议 右击追踪tcp流
3.右击，显示分组字节流，开始，结束，可以调整去掉字符 。解码为压缩。base64

方法 1. 统计 - 协议分级统计·

方法 2. 文件-导出对象-HTTP

方法 3. 搜索Flag

Kali中 strings easy.pcap | grep flag

方法 4. snmp 网管协议 过滤后 右击follow - udp stream。

搜索字符串 Ctrl+F, 输入字符串， 最左侧选 packet byte. 即可搜索所有字符

过滤协议  Ctrl+/ , 输入协议名回车常见有 tcp udp icmp(ping扫描等) 等

方法 5. 过滤并追踪TCP流和HTTP流。 TCP要每个流都看, HTTP要注意POST请求

技巧
* 添加列: 右击字段 - 应用为列
* TCP 显示html (Ctrl+Shift+O): 右击 TCP segment data - 显示分组字节 - 显示为HTML

### FAQ
#### Wireshark打开后不显示彩色流量，或者不显示HTTP2
删除  %AppData%\Roaming\Wireshark 重启wireshark好了
### Documents

**xbox 360**
[XBox 360 Controller > Wired Controller Information](http://tattiebogle.net/index.php/ProjectRoot/Xbox360Controller/UsbInfo)
https://www.google.com/search?q=XBox+360+Controller+usb+info
http://euc.jp/periphs/xbox-controller.ja.html

### 流量分析 
#### 用Wireshark轻松解密TLS浏览器流量
http://bobao.360.cn/learning/detail/249.html

编辑-首选项-协议-TLS, Master-Secret log filename
选择keylog.txt

### 解码为base64
右击左侧中部，显示分组字节(Ctrl+Shift+O), 解码为 选择base64
### 怎样从流中追踪指定文件？
在分组列表，右击某文件行。点击追踪流-TCP流。例 6666.jpg

![](imgs/wireshark01.png)

这时流里会有多个文件。jpg文件 为FFD8开头FFD9结尾。 根据header和传输内容来确定。

点击流 右侧的上下箭头来切换流里的文件。直到找到它。

![](imgs/wireshark02.png)
### 怎样从http流导出文件
https://mp.weixin.qq.com/s/mjR9RoxbJBkTfaXB2ao2_A
强网杯2020 Upload

找到http流包, 找到下面的 mime multipart media Encapsulation, jpeg file interchange format,

右击，导出分组字节流。

![](imgs/wireshark05.jpg)

### 导出ftp文件
1.Filter:ftp-data
2.追踪tcp流
3.保存成raw(原始数据)
### 手动提取zip
已知有zip文件了，Ctrl+F，左侧选16进制值，搜索 504B0304，搜到1个结果。

1.1 在分组列表的 Line-based text data，点击就已经选中PK部分。右击-导出分组字节流 123.zip。

![](imgs/wireshark03.png)

1.2 或者右击分组列表， 追踪TCP流。 来到最下面看到PK了。 点击显示和保存数据为-原始存储。 选中最后蓝色部分，到winhex里粘贴为ascii-hex。从PK头截取存为zip。

![](imgs/wireshark04.png)

##  过滤规则 Filter
path %AppData%\Roaming\Wireshark\
语法 https://www.wireshark.org/docs/wsug_html_chunked/ChWorkBuildDisplayFilterSection.html
docs https://www.wireshark.org/docs/dfref/

contains 是指文本部分。
![](https://s2.loli.net/2022/05/18/Nd1OwpZXW2G5nDQ.png)

```
http contains "GET / foo.cgi?a=bar"
tcp contains "TP"
tcp and frame contains "secret"
!(ip.src == 192.168.43.103) && s7comm
!(ip.src == 192.0.0.0/8) && s7comm
tcp.port == 5000

http.host matches "acme\\.(org|com|net)"
```

实例1 检查出来有哪些端口是开放的 | `[V&N2020 公开赛]拉胯的三条命令`

方法1: wireshark过滤: `tcp`查看到ACK的。手动排序, 复制成csv再excel过滤。

```
tcp.flags.ack eq 1
tcp.ack_raw gt 0
```

方法2: 使用[tcpdump](https://www.cnblogs.com/lvdongjie/p/10911564.html)过滤, ack包

```
tcpdump -n -r nmapll.pcapng 'tcp[13] = 18' | awk '{print $3}' | sort -u
```


### 过滤 Filter 常用关键字

按 `Ctrl+/` 进入过滤

```
frame contains "flag"           // 过滤 Info/数据中包含flag
http.request.full_uri  contains skyflag_is_here2333
http.request && !http.request.uri contains "login"
http.file_data contains Hello
urlencoded-form.value contains "testd"     // 表单value包含test
//根据返回结果，text data包含Hello，看对应的request frame 编号
http.host contains weixin
http.response.code==302
//过滤http响应状态码为302的数据包
http.response==1
//过滤所有的http响应包
http.content_type == “text/html”
http.content_length == 279
http.content_length_header == “279″
//根据content_length的数值过滤

// http response
http.response

```

过滤从192.168.0.9发往192.168.0.99并且是icmp协议

    ip.dst==192.168.0.99 && icmp
    ip.addr==192.168.0.99 && icmp
    ip.addr==192.168.0.9 && ip.addr==192.168.0.99 and icmp
    ip.dst==192.168.0.99 && icmp && !(icmp >= "Destination unreachable")

（1）对源地址为192.168.0.1的包的过滤，即抓取源地址满足要求的包。

         表达式为：ip.src == 192.168.0.1

（2）对目的地址为192.168.0.1的包的过滤，即抓取目的地址满足要求的包。

         表达式为：ip.dst == 192.168.0.1

（4）要排除以上的数据包，我们只需要将其用括号囊括，然后使用 "!" 即可。

         表达式为：!(表达式)

二、针对协议的过滤
（1）仅仅需要捕获某种协议的数据包，表达式很简单仅仅需要把协议的名字输入即可。

                表达式为：http

（2）需要捕获多种协议的数据包，也只需对协议进行逻辑组合即可。

         表达式为：http or telnet （多种协议加上逻辑符号的组合即可）

（3）排除某种协议的数据包

         表达式为：not arp      !tcp

三、针对端口的过滤（视协议而定）

（1）捕获某一端口的数据包

         表达式为：tcp.port == 80

（2）捕获多端口的数据包，可以使用and来连接，下面是捕获高端口的表达式

         表达式为：udp.port >= 2048

四、针对长度和内容的过滤

（1）针对长度的过虑（这里的长度指定的是数据段的长度）

         表达式为：udp.length < 30   http.content_length <=20

（2）针对数据包内容的过滤

    表达式为：http.request.uri matches "vipscu"  （匹配http请求中含有vipscu字段的请求信息）

Show only SMTP (port 25) and ICMP traffic:

    tcp.port eq 25 or icmp
Show only traffic in the LAN (192.168.x.x), between workstations and servers -- no Internet:
    
    ip.src==192.168.0.0/16 and ip.dst==192.168.0.0/16

TCP buffer full -- Source is instructing Destination to stop sending data

    tcp.window_size == 0 && tcp.flags.reset != 1

Filter on Windows -- Filter out noise, while watching Windows Client - DC exchanges

    smb || nbns || dcerpc || nbss || dns


To match IP addresses ending in 255 in a block of subnets (172.16 to 172.31):

    string(ip.dst) matches "^172\.(1[6-9]|2[0-9]|3[0-1])\..{1,3}\.255"

#### icmp过滤返回包
icmp.type == 8
### 字段过滤

```sh
http contains "GET / foo.cgi?a=bar"
frame contains "GET / foo.cgi?a=bar" (if you don't care if the string is inside HTTP packets)
```
#### 逻辑运算 与或非

or
http.request.method in {"HEAD" "GET"}

### 过滤端口

```
tcp.port eq 80
tcp.dstport eq 80
tcp.srcport eq 80
tcp.port>=1 and tcp.port <= 80
```
### 过滤请求
```
http and http.request.method==POST         # POST请求
http.request.method in {"HEAD" "GET"}
```

### 过滤MAC地址

eth.dst == aa:00
eth.src eq aa:00

# 其他技巧
## 根据MAC查找厂家

Wireshark\manuf 文件
## 显示TCP报文绝对序号/排序
Edit-----preference------protocols----tcp---relative sequence numbers

