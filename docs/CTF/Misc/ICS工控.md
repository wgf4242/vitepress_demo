Industrial Control System

特殊协议过滤
协议分级后过滤, 如 iec60870_104  查看Info列


AutoThink 打开 .gvi .hpf .iec 
STEP 7 MicroWIN SMART V2.5 打开 .smart

## pcap 包 Trailer导出

看一下异常信息的包序号，去查看完整信息。

tshark -r 04.pcap -T fields -e eth.trailer | sed -e "/^\s*$/d" -e "s/://g" >aa


## AutoThink使用
### 运行仿真
在线 - 仿真， 在线 - 运行。
## s7comm
Ethernet - Trailer 字段,要注意有时有信息


## 常用PLC指令
```ts
I_DI，整数(INT)转为双整数(DINT)
DI_R，双整数(DINT)转为浮点数(实数REAL)
DIV_R，浮点数(REAL)除法
CTCH，未找到这条指令；
MUL_R，浮点数(REAL)乘法
ROUND，浮点数(REAL)取整为双整数(DINT)
I，即INT，(单)整数；
DI，即DINT，双整数；
R，即REAL，浮点数；

四则运算符(加ADD、减SUB、乘MUL、除DIV)之后加“_I”，就是对整数进行运算；加“_DI”，就是对双整数进行算；加“_R”，就是对浮点数进行运算。
```