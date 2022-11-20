# Industrial Control System
工具准备
* wireshark 安装 s7comm-plus
* AutoThink
* wincc

解题思路
* 科来网络分析系统 查一下包
* common
  * 1.筛选协议 
  * 2.看长度 
  * 3.宽字节和普通字节都搜索
  * 4.TCP追踪字节流
  * 5.提示异常：1.找异常 2.用科来
  * 6.提示2次: 看length, 2次相同长度
  * 6.停机： 找停止功能码为 0x29
  * 7.数据可能是浮点数, 可能是整数, 比如2000.0

* 多观察底部数据 可读字符
* 特殊协议过滤  协议分级后过滤, 如 iec60870_104  查看Info列
* modbus 协议 https://mp.weixin.qq.com/s/FP13NWwUUjPqF8WHlmEGiw
* goose 协议
* s7comm plus , 1.安装插件 2. s7comm-plus.data.function == createobject && s7comm-plus.data.opcode == 0x31
* mms 协议 Wireshark配置 Edit->preferences->protocol->PRES ，添加一项：context: 3,  OID: 1.0.9506.2.3，

| 扩展名         | 软件                                                     |
| -------------- | -------------------------------------------------------- |
| .gvi .hpf .iec | AutoThink                                                |
| .S7S .s7p      | Simens step7                                             |
| .ap16          | TIA Portal V16 打开                                      |
| .mwp .smart    | STEP 7-MicroWIN SMART                                    |
| .pcz           | 力控ForceControl,                                        |
|                | 恢复 - 开发 - 忽略, 可解压看图片(恢复后找工程路径也可以) |
| .cmp           | 组太王                                                   |

## pcap 包 Trailer导出

看一下异常信息的包序号，去查看完整信息。

tshark -r 04.pcap -T fields -e eth.trailer | sed -e "/^\s*$/d" -e "s/://g" >aa

## AutoThink使用
工控编程题:
IW: Word
IB: BYTE
ID: DWORD

计算时从上向下，从左向右算。 右侧值不能改。

双击IW2值修改。再点空白处。

### 运行仿真
在线 - 仿真， 在线 - 运行。(可点图标)
## s7comm
Ethernet - Trailer 字段,要注意有时有信息
## Wincc
怎样搜索？ 全选 - 右键链接 - 文本

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
I_B取整
INV_B取反字节 60=>-60

四则运算符(加ADD、减SUB、乘MUL、除DIV)之后加“_I”，就是对整数进行运算；加“_DI”，就是对双整数进行算；加“_R”，就是对浮点数进行运算。
```


# Article
[modbus doc](https://openplcproject.com/docs/2-5-modbus-addressing/)
[[渗透测试]工控安全MMS协议——wp](https://mp.weixin.qq.com/s/XJTdhfWI-gN8518G-Nktzw)
[工控协议 : S7COMM协议分析(下)](https://mp.weixin.qq.com/s/O9PGN4XXijgSa8u4YSpSsQ)
[工控协议 : S7COMM协议分析(上)](https://mp.weixin.qq.com/s/mXKBGiq8mjfOivcRrI4-CQ)
[Modbus | 『工控』某工控比赛 Modbus 题目复盘](https://mp.weixin.qq.com/s/sOHJDV7wDb9FQbSxjQkTBw)