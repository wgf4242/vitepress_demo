[[toc]]

## Wireshark/tshark 使用
https://mymanfile.com/?p=1973
docs https://www.wireshark.org/docs/dfref/
https://mymanfile.com/?p=1973

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
```sh
-R 过滤器 相当于 Ctrl+/
-Y "http.request.method == ""POST"""
-Y "Something_UDP.field1 or Something_UDP.field2"
-Y "modbus && ip.dst==192.168.111.138"
-w a.pcapng # 过滤后保存为新的 pcapng 
```
过滤协议
tshark -Y http
tshark -Y modbus -r 3.pcapng

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

## tshark 抓包

mkdir tmp
chmod o+w tmp # 文件夹需要root权限
cd tmp
sudo tshrak -w out.pcapng