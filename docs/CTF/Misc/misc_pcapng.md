## 流量取证题
* strings 整个数据包，定位到关键数据 如flag，查看上下文命令, 之后可在 wireshark搜索。
* 追踪流注意单个 66 6c 61 67 -> flag
* 删除的字符串可能是key
* 科来网络分析系统 - 查一下包
* key.log - TLS解密: 编辑 - 首选项 - Protocols - TLS - Master - Secret log filename
* 过滤关键协议如websocket，整体导出为csv, countif过滤length, 找少的比如只有2个的数据。定位查看。
* http
    * url查看有没 file=
    * Sql 数据库最终获取的结果
    * redis.conf
        * 有没 requirepass

* modbus.data 过滤 : tshark -r a.pcapng -T fields -Y "modbus.data > 0" -e frame.number -e modbus.data | sed "/^\s\*$/d" >
  data.txt 网刃杯 2022 喜欢移动的黑客

* s7comm 1. 追踪流, 2.看数据 tshark -r .\设备药剂间数据采集.pcap -T fields -e s7comm.resp.data -Y s7comm > pic.txt
  -------3. 尝试 Ctrl+/过滤 cotp && cotp.type == 0x0f && s7comm.header.rosctr == 1 && s7comm.param.func == 0x05

* 通过VT 行为分析 | 找IP直接丢进去看 BEHAVIOR
* 注意字符串 U2FsdGVkX

rtpbreak -r mus1c6s.pcapng 可以分析并还原RTP流量中的语音内容

### hid
[Manual](http://www.usb.org/developers/hidpage/Hut1_12v2.pdf)

### SMP/蓝牙

crackle -i ble.pcapng -o decode.pcapng #解密流量包再看

### wifi 密码破解 aircrack, airdecap-ng

> kali下
> aircrack-ng -w ./dict.txt ./01.cap # 可看到ssid

kali下 转hashcat爆破
aircrack-ng 01.cap -j hashcat

解密流量包
airdecap-ng shipin.cap -e 0719(前面的essid) -p 88888888

### MQTT

https://mp.weixin.qq.com/s/32LxbV7jUpYTVKePBu1pWw

### misc_live/RTMP/RTSP/MPEG-DASH

题目: 石油杯 第二届网络安全攻防赛团体赛预赛 - Misc - Live

涉及协议 直播流协议：RTMP、RTSP、MPEG-DASH

[手撕 rtmp 协议专项](https://mp.weixin.qq.com/mp/homepage?__biz=MzAwODM5OTM2Ng==&hid=7&sn=0192ad4506003b7b13d5efde0ff15312)

工具

1.[rtmp2flv 流量包转换为 flv 视频](https://github.com/quo/rtmp2flv)

2.[rtptools](https://github.com/irtlab/rtptools)

解题流程:

tcpflow -T %T\_%A%C%c.rtmp -r Live.pcapng -o out

./rtmp2flv.py 最大的文件.rtmp

RTMP 协议中 可以还原出一段音频 一个画面 分别为 flag1 flag2

RTSP 协议过滤出来之后 会找到比较特殊的包 RTSP/SDP 协议的

把 SDP 协议提取出来 导出魔改 SDP 之后可以拿到 flag3 flag4

MPEG-DASH 协议 导出文件归类 然后写个脚本 开个服务器 可以得到 flag5 flag6

### 工控类ICS

* 1.故障分析/PLC故障, 科来网络分析系统（技术交流版）
* 2.Trailer导出, 根据序号，wireshark完整信息。

> tshark -r 04.pcap -T fields -e frame.number -e eth.trailer | sed -e "/^[0-9]*\s*$/d" -e "s/://g" >ac

* 3.过滤modbus , 查看 Write Single Register 的流量数据包并找到传输的数据data
* 4.11

### veracrypt

挂载后, winhex 工具 - 打开磁盘。提取隐藏文件。

passware kit 爆破或 https://security.stackexchange.com/questions/202946/bruteforce-veracrypt

### bitlocker, vmem, vhdx

bitlocker加密的起止时间会被存储在注册表中 ROOT\ControlSet001\Control\FVEStats里的OsvEncryptInit和OsvEncryptComplete,
用Windows Registry Recovery查看注册表备份，例: 鹏城杯2022 babybit
如果用 Registry Explorer 看注意时间默认是UTC+0 ，要转成UTC+8加8小时

参见 网鼎杯2020白虎组 密码柜
windows挂载后, 有密钥情况下。
manage-bde -unlock G: -RecoveryPassword 294173-189123-573023-455081-459382-434610-344091-286275


### scap

sysdig文件
sudo sysdig -r sysdig-trace-file.scap
sudo sysdig -r test.scap -c spy_users
[doc ByteCTF2022 ](https://bytedance.feishu.cn/docx/doxcnWmtkIItrGokckfo1puBtCh)

### NTLM


通过数据包拼接出NTLM hash:username::domain:challenge:HMAC-MD5:blob
- username:User name
- challenge:为NTLM Server Challenge
- domian:Host name(IP或者机器名)
- HMAC-MD5:NTProofstr的值 
- blob:NTLMv2 Response去掉NTProofstr后的值( NTProofstr Response: aabbccdd000001, NTProofstr的值为aabbccdd, 则blob用000001)

hashcat -m 5600 test.hash rockyou.txt
hashcat -m 5600 a::192.168.62.139:c0b5429111f9c5f4:a5f1c47844e5b3b9c6f67736a2e1916d:0101000000000000669dae86ba8bd301a9134eee81ca25de0000000002001e00570049004e002d003100550041004200430047004200470049005500330001001e00570049004e002d003100550041004200430047004200470049005500330004001e00570049004e002d003100550041004200430047004200470049005500330003001e00570049004e002d003100550041004200430047004200470049005500330007000800669dae86ba8bd30106000400020000000800300030000000000000000000000000300000e9d9e613613097d1e2f47c1fd97fa099f65dfd78075d8bdb5ca162492ea5d2990a001000000000000000000000000000000000000900260063006900660073002f003100390032002e003100360038002e00360032002e00310033003900000000000000000000000000 /tmp/password.list -o found.txt --force

过滤 ntlmssp找其他信息
过滤 ntlmssp.ntlmserverchallenge 找到 NTLM Server Challenge

# Article
[流量分析之常见协议解题技巧](https://mp.weixin.qq.com/s/NwoHi8AMqZrE9HvPJo6ABw)

[中国蚁剑rsa、aes流量](https://www.bilibili.com/video/BV19P411T7kw/)
[冰蝎流量解密](https://github.com/melody27/behinder_decrypt#readme)
[冰蝎2.0流量](https://www.bilibili.com/video/BV1hB4y1q7Xa/)
[冰蝎3.0流量解密工具2.0](https://www.bilibili.com/video/BV1uT411J7zD/)
[冰蝎2.0-3.0流量(python批量解码)](https://www.bilibili.com/video/BV1Sd4y1s7vY/)
[哥斯拉4.0流量解密(python批量解码)](https://www.bilibili.com/video/BV1u14y1J7Sj/)
[菜刀、冰蝎、蚁剑、哥斯拉webshell管理工具分享及特征分析](https://mp.weixin.qq.com/s/4KGUNeC1l_X9pbqerkk4zQ)
