[Wireshark](./wireshark.md)

[tshark](./tshark.md)

[[toc]]

## 解题思路

波形图 高为 1 低为 0 转二进制
BMP/PDF 隐写 - wbStego Steganography Tool (bailer.at)

k 数字 超大数, tupper 自指 https://article.itxueyuan.com/7DyrkD 4. virustotal 扫程序和 IP。 分析出程序有连接 IP。扫 IP。 见 网刃杯 2022 FindMe 5. a3ed97e25583291767054a6a6b533a1c hash 解密

## unknown

10 进制数中有16进制 可能有问题
16 行文字 --> 16 进制 0-0xf
异或 xor。或及使用 xortools `xor file`, `xortool -l 13 -c 00 file` , 13 是显示最大可能数
### 密码类
3替换z  yihr{Pfit3bf_Q3_NQM}  中 quipquip不支持数字 3改成z  -- yihr{Pfitzbf_Qz_NQM}，用quipquip解得 flag{Welcome_To_RTS} => flag{Welcome_To_CTF}

## 流量题

1.搜索 flag

追踪流注意单个 66 6c 61 67 -> flag

modbus.data 过滤 : tshark -r a.pcapng -T fields -Y "modbus.data > 0" -e frame.number -e modbus.data | sed "/^\s\*$/d" > data.txt 网刃杯 2022 喜欢移动的黑客

s7comm 1. 追踪流, 2.看数据 tshark -r .\设备药剂间数据采集.pcap -T fields -e s7comm.resp.data -Y s7comm > pic.txt
-------3. 尝试 Ctrl+/过滤 cotp && cotp.type == 0x0f && s7comm.header.rosctr == 1 && s7comm.param.func == 0x05

注意字符串 U2FsdGVkX

rtpbreak -r mus1c6s.pcapng 可以分析并还原RTP流量中的语音内容 

## 取证题

1. Magnet AXIOM/FTK/DiskGenius 打开 vmdk
2. 看桌面
   2.1 Magnet AXIOM 收集信息
   3。 Firefox key3.db 恢复密码
   3. Firefox浏览器记录 places.sqlite
   4 浏览历史
4. [profile找不到详下 ](#profile找不到)


### bitlocker
bitlocker加密的起止时间会被存储在注册表中 ROOT\ControlSet001\Control\FVEStats里的OsvEncryptInit和OsvEncryptComplete, 
用Windows Registry Recovery查看注册表备份，例: 鹏城杯2022 babybit

### profile找不到
1. https://blog.bi0s.in/2021/08/20/Forensics/InCTFi21-TheBigScore/
2. 团队赛决赛 Xiaoming

1.strings the_big_score.lime | grep 'Linux version'
找到version和kernel 为 Ubuntu 18.04，linux 内核版本为 5.4.0-42-generic

2.官网下载对应镜像安装 自己制作 volatility 的 profile

3.安装依赖
```bash
sudo apt install linux-image-4.4.0-72-lowlatency linux-headers-4.4.0-72-lowlatency
sudo apt install build-essential dwarfdump git
```
4.安装 volatility

git clone https://github.com/volatilityfoundation/volatility

5.制作 profile
```
cd volatility/tools/linux
make
sudo zip $(lsb_release -i -s)_$(uname -r)_profile.zip module.dwarf /boot/System.map-$(uname -r)
```
多出的 zip 文件就是 profile，把它放在 volatility/volatility/plugins/overlays/linux/ 目录下即可

### scap
sysdig文件
sudo sysdig -r sysdig-trace-file.scap

## 图片题
有图像, Google/baidu搜图 可能是提示
zsteg -a x.png
关键字:猫/猫脸变换/arnold 置乱
做fourier变换。

![](https://s2.loli.net/2022/05/18/f7heVPs4BwJN6ET.jpg)
jpg 隐写 一般国外喜欢用 steghide，而国内喜欢用 jphs05 , jphs05 打开图片后 seek - 填 2 次相同密码

Stegsolve - Analyse - Sterogram Sovler , "眼神得好"

### 二维码
https://cli.im/deqr/   有可能零宽隐写
## pyc 文件

stegosaurus 隐写 python3 stegosaurus.py -x QAQ.pyc -- 3.6 及以下版本
## 压缩包/zip/rar
使用unzip或者winrar打开 逐个解压，因为包里可能有不需要密码的。
```
    -- 7z解压, 不要光用winrar
    -- 查看注释, 有右侧就是有注释
    -- 伪加密  -- zip  ZipCenOp.jar r filename
                       或手动修改所有0900伪0000
               -- rar  F9 81 74 85 改成 F9 81 74 80
    -- 报错/文件头串改 核对rar和zip文件头
            -- rar 52 61 72 21 1A 07 00 CF 90 73 00 00 0D 00 00 00 00 00 00 00 XX XX 74 A0 90 2C
    -- 密码，先看题目提示，图片文件用010 editor搜索设置 Unicode型, 搜pass, 4位试下。不行再看总结。


    -- 修补文件头 文件头顺序被打乱,添加文件头504B并 按504B0304...504B0102....504B0506的顺序调整，  BMZCTF2022 游戏秘籍
    -- 爆破
            -- 可见字符1-4位, 全部字符
            -- 可见字符1-6位, 开始字符0
            -- 可见字符6-6位, 小字母加数字
            -- 给了password 爆破
            -- 时间戳时间可能靠近 用掩码爆破,  1558012728.00|1558052728.99|155???????.??      -- [GUET-CTF2019]zips
            -- zip Advanced Archive Password Recovery 
            -- rar hashcat + rar2john 
            -- zip 掩码爆破 NCTF2018-havefun, 用ARCH, 开始wcy00000 结束wcy00000, 长度8, 暴力
    -- 明文攻击, 里面文件有可能是网上有的。搜一下下载个进行明文攻击。
           https://blog.csdn.net/q851579181q/article/details/109767425
           AES256-Deflate/AES256-Store加密的文件不适用于明文攻击。
           zip同名txt接用文件名作为明文攻击。 #见@list.md 第四届2021美团网络安全高校挑战赛


           压缩工具要相同，如果产生CRC32不同。换工具试， 算法也要相同
           1.压缩方式要选 1存储 2zip
           pkcrack.exe -C 1.zip -c hhh.jpg -P 2.zip -p hhh.jpg -d re.zip -a
           Advanced Archive Password Recovery 比上面慢。提示尝试找回口令的时候---停止。然后用3个密钥解密。
           
           bkcrack
           -- bkcrack -C png4.zip -c flag.txt -k e0be8d5d 70bb3140 7e983fff -d flag.txt
           -- bkcrack -C test5.zip -c 2.png -k b21e5df4 ab9a9430 8c336475  -d 2.png # 解密非破解文件, 用inflate.py 2次处理
           -- python3 inflate.py < 2.png > 2_out.png 
           
           rbkcrack只需要知道加密压缩包内容的连续12个字节， .exe -C 1.zip -c hhh.jpg -P 2.zip -p hhh.jpg -d re.zip -a
           -- 文件开头有可能存在\r\n+10个连续空格，可以进行尝试
           -- rbkcrack.exe -C ecryptedzip.zip -c LICENSE -p LICENCE.txt
           -- zip文件名攻击
              -- rbkcrack.exe -C ecryptedzip.zip -c flagornot.zip -p plain.txt -o 30 # plain.txt内容为 flagornot.txt
           -- 3组key解密 rbkcrack.exe -C ecryptedzip.zip -c README.md -k 32cc3495 7f955ff5 58291af3 -d README.md
              -- 所以解密后注意得到的out.png是deflate的数据流，用rbkcrack/tools里 python inflate.py < out.png > out1.png
           github搜索文件, advance search - Code options 处可搜索文件名, 文件大小。

    -- 小文件爆破 (原始)大小 <=6 可以考虑CRC32爆破攻击
           压缩包里是4b 就是4个字母, 3b就是3个字母。
                      python crc32.py reverse 0x1b2e6194
```
### 爆破 crunch/hashcat

crunch 生成字典
```bash
crunch 5 5 0123456789 -o password.txt
hashcat -m 13400 keepass.txt -a 0 password.txt --force
```
## android backup
java -jar abe.jar unpack androidbackup  androidbackup.tar
abe.jar 或者用 https://github.com/lclevy/ab_decrypt
## 加密编码/古典密码

| enc                                                 | algorithm                                                        | plain                               |
| --------------------------------------------------- | ---------------------------------------------------------------- | ----------------------------------- |
| SSQ8SSR000                                          | rot13                                                            | FFD8FFE00                           |
| 58s4vb6rt4pt5r32yd6ht5u656555r6796524vi69r2yd5om6w0 | [TwinHex](https://www.calcresult.com/misc/cyphers/twin-hex.html) | `flag{I_am_Guwanneme_servant_Gulf}` |
| Q5R2Ln3nLqUnQaIV                                    | base64(itoa)                                                     | pwD_1s_h3re!                        |

### Caesar

套路总结

1. 逐位对比 ascii 值, 对比 flag/ctf/**主办方**名字 ascii 值
2. %128
3. 每个 - n 再对比, 构成等差数列 对比 flag/ctf/**主办方**名字 ascii 值 参考 NISACTF2022 funnycaeser， key 为 5

## 文件头

字符串 PK 是 zip 的开头, 5d480506xxxxx 为尾部

| ext     | header                       | end                      |
| ------- | ---------------------------- | ------------------------ |
| jpg     | FFD8                         | FFD9                     |
| png     | 89504E47                     | 0000000049454E44AE426082 |
| zlib    | 789C                         |                          |
| zip     | 504B0304                     | 00000000                 |
| rar     | 52617221                     |
| gif     | 47494638                     |
| tif     | 49492A00                     |
| bmp     | 424D                         |
| dwg     | 41433130                     |
| psd     | 38425053                     |
| rtf     | 7B5C727466                   |
| xml     | 3C3F786D6C                   |
| html    | 68746D6C3E                   |
| eml     | 44656C69766572792D646174653A |
| dbx     | CFAD12FEC5FD746F             |
| pst     | 2142444E                     |
| xls/doc | D0CF11E0                     |
| mdb     | 5374616E64617264204A         |
| wpd     | FF575043                     |
| pdf     | 255044462D312E               |
| qdf     | AC9EBD8F                     |
| pwl     | E3828596                     |
| wav     | 57415645                     |
| avi     | 41564920                     |
| ram     | 2E7261FD                     |
| rm      | 2E524D46                     |
| mpg     | 000001BA                     |
| mpg     | 000001B3                     |
| mov     | 6D6F6F76                     |
| asf     | 3026B2758E66CF11             |
| mid     | 4D546864                     |

## 流量取证

### misc_live/RTMP/RTSP/MPEG-DASH

题目: 2021 中石油集团公司第二届网络安全攻防赛团体赛预赛 - Misc - Live

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

## 网络识图/位置

国外 https://lens.google/

## 音频题目

多个相同音频, 通过导入后反相识图。链接如下。
https://mp.weixin.qq.com/s/LXQb_fUW0-3By8xibke-EA

11. wav/音频隐写 https://www.sqlsec.com/2018/01/ctfwav.html
    -- 1.Audition/Audacity 看 多是摩斯码,
    -- 2.看频谱 spectrogram(视图-频谱)/ audacity 轨道左侧文件名箭头-频谱
    -- DB 波谱: 右击 左侧刻度 -> db
    -- 3.听歌
    -- 4. misc_dtmf / http://dialabc.com/sound/detect/index.html
    -- 本地 dtmf 有时会有重复值
    -- 效果-反向 听声音。
    -- 删除多余文件头，可能有 2 段 riff
    -- SilentEye
    -- MP3Stego: decode.exe -X target.mp3
    -- decode.exe -P password -X target.mp3
    -- decode.exe -P pass -X target.mp3
    -- decode.exe -P 主办单位 -X target.mp3
    -- 摩斯码音频 自动解码：
    -- 1.Audition 禁用 其他声道, 将目标声道提高
    -- 2.右击声道，提取为单声道， 导出 mp3
    -- 3. https://morsecode.world/international/decoder/audio-decoder-adaptive.html 上传解码 play
    -- SSTV 扫描, 频谱图比较平均 dididi 的声音 见 ### sstv
    -- PT2242 信号： 用短的一段表示是 0，长的一段表示是 1 前面 4bit 表示同步码，中间的 20bit 表示地址码，后面的 4bit 表示功能码，最后一位是停止码。
    -- 也就是 0。。。01110100101010100110。0010。0 -- flag 为中间 20bit
    -- PT226X 见 [HDCTF2019]信号分析 https://www.shawroot.cc/1047.html

LSB隐写 用 uint8 读取 wav 然后提取每一个帧的 LSB
### 音频隐写 sstv

https://www.cnblogs.com/LEOGG321/p/13731156.html
ctfshow 未知信号

工具下载
https://software.muzychenko.net/trials/vac460.zip
https://www.qsl.net/on6mu/download/Setup_RXSSTV.exe 1.先安装 Virtual Audio Cable, 启动 Audio Repeater 将 wave out 设置 扬声器 2.将 rxsstv 切换到 Robot36 模式下播放音频
或者 Linux 下用 sudo apt install qsstv
-- Options->Configuration->Sound 勾选 From file, 再点击播放按钮
