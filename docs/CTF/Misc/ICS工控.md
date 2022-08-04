Industrial Control System

特殊协议过滤
协议分级后过滤, 如 iec60870_104  查看Info列

## pcap 包 Trailer导出

看一下异常信息的包序号，去查看完整信息。

tshark -r 04.pcap -T fields -e eth.trailer | sed -e "/^\s*$/d" -e "s/://g" >aa


## AutoThink使用
### 运行仿真
在线 - 仿真， 在线 - 运行。
## s7comm
Ethernet - Trailer 字段,要注意有时有信息
