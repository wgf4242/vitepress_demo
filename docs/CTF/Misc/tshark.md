[[toc]]

## Wireshark/tshark 使用
https://mymanfile.com/?p=1973
docs https://www.wireshark.org/docs/dfref/

-r readfile

列名导出
1.右击 - 复制 - 字段名称
2.用 `_ws.col.[name]` 例 `_ws.col.info` https://www.wireshark.org/docs/man-pages/tshark.html
导出info某部分，右击信息，过滤字段参考
### tshark 常用
tshark怎样确定协议字段?
1.看状态栏

![tshark_data](imgs/tshark_data.jpg)
2.右击字段 - Wiki 协议页面

参数
```
-R 过滤器 相当于 Ctrl+/
```

#### 导出http文件
```
path D:\Program Files\Wireshark;%path%
tshark -r ctf.pcapng --export-objects "http,F:/Fshare/"
```
#### 导出http uri
tshark -r x.pcap -T fields -e http.request.full_uri | sed "/^\s*$/d" > usbdata.txt
#### 导出 tcp stream

```bash
tshark -r ctf.pcap -Y "tcp.stream" -T fields -e tcp.payload |  sed -e "/^\s*$/d" -e "s/://g" > tcp
xdd -r -ps tcp tcp.raw
```

#### 导出request body
```
tshark -r ctf.pcapng -Y "http.request" -T fields -e http.file_data
-Y "http.request" - filters for packets which are http requests
-T fields -e http.file_data - sets the output fields to just the request body
```

tshark -r x.pcap -T fields -e http.file_data http.response_number eq 1 and tcp.stream eq 4

#### 导出icmp data 
```sh
tshark -r out.pcap -T fields -e data > data.txt
tshark -r out.pcap -T fields -Y "ip.proto == \"ICMP\"" -e data > data.txt
```
#### 提取多个fields, 例 form key,value

```
tshark -r ctf.pcap -T fields -e urlencoded-form.key  -e urlencoded-form.value|sed "/^\s*$/d" > usbdata.txt
```

#### 导出前两列, ip地址和端口
tcpdump -n -r triffic.pcap  | awk '{print $2","$3}' | sort -u | grep 1.12 > su.txt

#### 导出dns的info字段

tshark -r "dump.pcapng" -R "dns and ip.src==172.27.221.13" -2 -T fields -e _ws.col.Info>1.txt命令提取所有的info字段。然后进行处理

### 过滤
查看所有过滤: 分析 - Display filter expression

1.过滤端口为5001的tcp包，将时间输出

tshark -r h1.pcap -Y "tcp.port==5001" -T fields -e frame.time

时间格式如   “Jan 1,2016 20:27:30.355595000 CST”

2.调整时间格式

```
tshark -r h1.pcap -Y "tcp.port==5001" -o column.format:"packet,%m,Time,%t,Info,%i"
%t输出格式为 10.710926
%Yt输出格式为 2016-01-01 20:27:30.355595
wireshark - How do I format tshark time to ISO format (yyyy-dd-mm)? - Stack Overflow
tshark\ -\ The\ Wireshark\ Network\ Analyzer\ 2.0.0
```
3.查看所有包数目

tshark -r test.cap | wc -l

c - Getting the number of packets in a pcap capture file? - Stack Overflow

4.输出特定字段

```
tshark -nr input.pcap -Y "display filter" -T fields -e frame.number -e tcp.seq -e tcp.options.timestamp.tsval
https://osqa-ask.wireshark.org/questions/38418/plotting-tcp-sequence-number-against-timestamp-option-value/
```


### 提取 usb 信息
#### 介绍
https://blog.csdn.net/qq_43625917/article/details/107723635
https://www.usb.org/sites/default/files/documents/hut1_12v2.pdf

Leftover Capture Data: 00 00 06 00 00 00 00

* 8字节键盘 `00:00:06:00:00:00:00`

第三字节: 按键 去pdf或脚本找按键表

```
Leftover Capture Data: 00 00 06 00
```
* 4字节鼠标  `00:00:02:00`

第一个字节：按键 
          0x00 未按键
          0x01 左键
          0x02 右键
第二个字节 可以看成是一个signed byte类型，其最高位为符号位，当这个值为正时，代表鼠标水平右移多少像素，为负时，代表水平左移多少像素。
第三个字节 上下移动的偏移。

#### 实战
```bash
tshark -r flag.pcap -T fields -e usb.capdata > usbdata.txt 
tshark -r flag.pcap -T fields -e usb.capdata|sed /^$/d > usbdata.txt 

# 有多个时分别过滤提取
tshark -r "ez_usb.pcapng" -Y "usb.src==\"2.8.1\" && usb.dst==host" -T fields -e usbhid.data > keyboarda.txt
tshark -r "ez_usb.pcapng" -Y "usb.src==\"2.10.1\" && usb.dst==host" -T fields -e usbhid.data > keyboardb.txt
```

键盘数据包的数据长度为8个字节，击键信息集中在第3个字节以后

BYTE1

|        Bit         |    Description     |     Value       |
| ------------------ | ------------------ | --------------- |
|         0          |    Left Control    | 是否按下，按下为1  |
|         1          |     Left Shift     | 是否按下，按下为1  |
|         2          |      Left Alt      | 是否按下，按下为1  |
|         3          |      Left GUI      | 是否按下，按下为1  |
|         4          |   Right Control    | 是否按下，按下为1  |
|         5          |    Right Shift     | 是否按下，按下为1  |
|         6          |     Right Alt      | 是否按下，按下为1  |
|         7          |     Right GUI      | 是否按下，按下为1  |


BYTE2 – 暂不清楚，有的地方说是保留位
BYTE3–BYTE8 – 这六个为普通按键

键盘发送 `02 00 0e 00 00 00 00 00`

表示同时按下了Left Shift + k，即大写K。
https://www.usb.org/sites/default/files/documents/hut1_12v2.pdf 第53页

