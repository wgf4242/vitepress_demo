# Industrial Control System

工具准备

- wireshark 安装 s7comm-plus
- AutoThink
- wincc

解题思路

- strings 如果有假 flag 也搜一下，可能有原题
- 科来网络分析系统 查一下包
- common

  - 1.筛选协议
  - 2.看长度
  - 3.宽字节和普通字节都搜索
  - 4.TCP 追踪字节流
  - 5.提示异常：1.找异常 2.用科来
  - 6.提示 2 次: 看 length, 2 次相同长度
  - 6.停机： 找停止功能码为 0x29
  - 7.数据可能是浮点数, 可能是整数, 比如 2000.0

- 多观察底部数据 可读字符
- 特殊协议过滤 协议分级后过滤, 如 iec60870_104 查看 Info 列
- modbus 协议 https://mp.weixin.qq.com/s/FP13NWwUUjPqF8WHlmEGiw
- goose 协议
- s7comm plus , 1.安装插件 2. s7comm-plus.data.function == createobject && s7comm-plus.data.opcode == 0x31
- mms 协议 Wireshark 配置 Edit->preferences->protocol->PRES ，添加一项：context: 3, OID: 1.0.9506.2.3，

| 扩展名         | 软件                                                     |
| -------------- | -------------------------------------------------------- |
| .gvi .hpf .iec | AutoThink                                                |
| .S7S .s7p      | Simens step7                                             |
| .ap16          | TIA Portal V16 打开                                      |
| .mwp .smart    | STEP 7-MicroWIN SMART                                    |
| .pcz           | 力控 ForceControl,                                       |
|                | 恢复 - 开发 - 忽略, 可解压看图片(恢复后找工程路径也可以) |
| .cmp           | 组态王                                                   |
| .mcp           | [McgsPro ](https://mcgs.lanzoue.com/b01kua46h)           |

## Download

[组态王(KingView)全套下载链接](https://docs.qq.com/doc/DRFpwaXNhQmRrdFBx)

### pcap 包 Trailer 导出

看一下异常信息的包序号，去查看完整信息。

tshark -r 04.pcap -T fields -e eth.trailer | sed -e "/^\s\*$/d" -e "s/://g" >aa

### AutoThink 使用

工控编程题:
IW: Word
IB: BYTE
ID: DWORD

计算时从上向下，从左向右算。 右侧值不能改。

双击 IW2 值修改。再点空白处。

#### 运行仿真

在线 - 仿真， 在线 - 运行。(可点图标)

### s7comm

Ethernet - Trailer 字段,要注意有时有信息

## Wincc

怎样搜索？ 全选 - 右键链接 - 文本

### McgsPro

工具 - 模拟运行 - 工程下载 -启动运行。 看用户窗口。。。每个点一下。有没有出问题 的界面。
或者不模拟的情况下每个窗口看看有没有 奇怪字符。。

## Modbus
### Modbus poll
Modbus Poll ：Modbus主机仿真器，用于测试和调试Modbus从设备。该软件支持ModbusRTU、ASCII、TCP/IP。用来帮助开发人员测试Modbus从设备，或者其它Modbus协议的测试和仿真。它支持多文档接口，即，可以同时监视多个从设备/数据域。每个窗口简单地设定从设备ID，功能，地址，大小和轮询间隔。你可以从任意一个窗口读写寄存器和线圈。如果你想改变一个单独的寄存器，简单地双击这个值即可。或者你可以改变多个寄存器/线圈值。提供数据的多种格式方式，比如浮点、双精度、长整型（可以字节序列交换）。

[Download](https://pan.baidu.com/s/1Eyf9SG1tqklbUWkDlu7DZw?pwd=qjlg#qjlg)

## 常用 PLC 指令

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

[山石安研院 2022 年度安全研究精华汇](https://mp.weixin.qq.com/s/ubqxSpW3XxM4bcSj9_EHXA)
[modbus doc](https://openplcproject.com/docs/2-5-modbus-addressing/)
[[渗透测试]工控安全 MMS 协议——wp](https://mp.weixin.qq.com/s/XJTdhfWI-gN8518G-Nktzw)
[工控协议 : S7COMM 协议分析(下)](https://mp.weixin.qq.com/s/O9PGN4XXijgSa8u4YSpSsQ)
[工控协议 : S7COMM 协议分析(上)](https://mp.weixin.qq.com/s/mXKBGiq8mjfOivcRrI4-CQ)
[数控设备互联通讯协议 MTConnect 分析基础](https://mp.weixin.qq.com/s/5ZBno2uU0qOlGEHyNj4yCw)
[协议格式 | 音视频技术助力政府采购之音视频编码采集](https://mp.weixin.qq.com/s/Ux-U148Akl_zdY_VlyxPug)

[Modbus | 『工控』某工控比赛 Modbus 题目复盘](https://mp.weixin.qq.com/s/sOHJDV7wDb9FQbSxjQkTBw)

[Modbus Slave 缓冲区溢出漏洞 CVE-2022-1068 分析与复现](https://mp.weixin.qq.com/s/5InTTej26aDFzQgB8l6MHw)
[工控 CTF 中常见题型介绍](https://mp.weixin.qq.com/s/LW0jQAoD5VLygHyooyUXlw)
[工控安全竞赛之应用程序逆向分析技术](https://mp.weixin.qq.com/s/6sb6q0959Nb-Z1eTi5Uprg)
[工业控制靶场-虚拟化体验分享（一）](https://mp.weixin.qq.com/s/Q26EpfVOsPKXzVFVoIPbqQ)
[赛宁工控靶场场景实操：PROFIBUS-DP 通讯应用](https://mp.weixin.qq.com/s/RipAkH0-rHOljNpRkoDIsw)
[赛宁工控靶场场景实操：工控协议模糊测试 Modbus-TCP](https://mp.weixin.qq.com/s/rmkuNLk4HLS9sm9YHCVlBQ)
[工控 CTF | 44 期](https://mp.weixin.qq.com/s/h_ptEqT4NJYszJOoX8dqVA)
## pwn
[工业控制互联网组态王软件漏洞测试验证与利用](https://mp.weixin.qq.com/s/vYAl31hpbhZlvRJjJdQlnA)

## 使用

- [S7-1200 模拟量处理](https://mp.weixin.qq.com/s/9Y_SVgVdAQG6ffCCTIy4cQ)

## 漏洞平台

https://ics.cnvd.org.cn/index
