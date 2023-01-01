## 流量取证题

* 追踪流注意单个 66 6c 61 67 -> flag
* 科来网络分析系统 - 查一下包
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

### profile找不到

kali 中 autopsy 可以取证一部分

1. https://blog.bi0s.in/2021/08/20/Forensics/InCTFi21-TheBigScore/
2. 团队赛决赛 Xiaoming
3. [Linux新版内核下内存取证分析附CTF题](http://tttang.com/archive/1762/) https://mp.weixin.qq.com/s/dbHGBzjcMoF8aPqIkCN_Fg

```sh
uname -r # 查看当前内核
方式1.strings the_big_score.lime | grep 'Linux version'
找到version和kernel 为 Ubuntu 18.04，linux 内核版本为 5.4.0-42-generic
方式2 vol3
python3 vol.py -f 1.mem banners.Banners
```

2.下载对应镜像安装 自己制作 volatility 的 profile

```bash
sudo apt install -y linux-headers-5.4.0-84-generic linux-image-5.4.0-84-generic dwarfdump build-essential git zip

git clone https://github.com/volatilityfoundation/volatility
cd volatility/tools/linux
make
sudo zip $(lsb_release -i -s)_$(uname -r)_profile.zip module.dwarf /boot/System.map-$(uname -r)
```

多出的 zip 文件就是 profile，把它放在 volatility/volatility/plugins/overlays/linux/ 目录下即可
/usr/lib/python2.7/dist-packages/volatility/plugins/overlays/linux/
/usr/local/lib/python2.7/dist-packages/volatility-2.6.1-py2.7.egg/volatility/plugins/overlays/linux/

```sh
python vol.py --info | grep Linux  # 查看是否已经制作了目标系统的profile
python vol.py -f the_big_score.lime --profile=LinuxUbuntu1804x64 linux_bash
```

ubuntu如何更换 kernel启动, 下面文件修改
vi /boot/grub/grub.cfg

4.volatility.exe 添加自定义profile的使用

```
1.将profile文件放到 plugins\overlays\linux\Ubuntu_5.4.0-84-generic_profile.zip
2.volatility.exe --plugins=plugins --info
```

### scap

sysdig文件
sudo sysdig -r sysdig-trace-file.scap
sudo sysdig -r test.scap -c spy_users
[doc ByteCTF2022 ](https://bytedance.feishu.cn/docx/doxcnWmtkIItrGokckfo1puBtCh)

# Article
[流量分析之常见协议解题技巧](https://mp.weixin.qq.com/s/NwoHi8AMqZrE9HvPJo6ABw)

[中国蚁剑rsa、aes流量](https://www.bilibili.com/video/BV19P411T7kw/)
[冰蝎流量解密](https://github.com/melody27/behinder_decrypt#readme)
[冰蝎2.0流量](https://www.bilibili.com/video/BV1hB4y1q7Xa/)
[冰蝎3.0流量解密工具2.0](https://www.bilibili.com/video/BV1uT411J7zD/)
[冰蝎2.0-3.0流量(python批量解码)](https://www.bilibili.com/video/BV1Sd4y1s7vY/)
[哥斯拉4.0流量解密(python批量解码)](https://www.bilibili.com/video/BV1u14y1J7Sj/)
[菜刀、冰蝎、蚁剑、哥斯拉webshell管理工具分享及特征分析](https://mp.weixin.qq.com/s/4KGUNeC1l_X9pbqerkk4zQ)
