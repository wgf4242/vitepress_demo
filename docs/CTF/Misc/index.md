[Wireshark](./wireshark.md)

[tshark](./tshark.md)

[[toc]]

## 解题思路
* 1.不要路径有空格, 不要中文路径
* grep -r "flag"
* strings ./file | grep flag
* 文件名 hxcode 汉信码
* 32位长度 AES的秘钥
* Base64 解出来看不懂
  * To Hex, 16位可能是md5, 如果是2层md5, flag可能是一层md5
  * 尝试rot13, 尝试 base32
* 多组颜色(8组), 7进制加分隔符, -- 2022长城杯办公室爱情
* 2种数据/2进制
  * 分成8个一组，尝试前后补0, 以及 python int(011, 2)
  * 转二维码
* unknown数据
  * 查md5
  * To Hex, 16位可能是md5, 如果是2层md5, flag可能是一层md5
  * 外文, 使用Cyberchef Text Encoding Brute Force 选Decode
  * 每行字符的第一个/最后一个 组合提取密码
  * 观察文件尾 文件头 50 4b 03 04 正序反序
  * 拆成2段base64 例 enlyZ2h3eXlmeHc0ezhpMAMX1tMzk3amNpNXZqdDRrZg==== 
  * Fence Code
  
* 不明数字+字母
  * Caesar 后过滤 16进制。
* 不明16进制/字符串
  * 1.fromhex - to binary - reverse - from binary - reverse
  * 2.to binary, 去掉前面的1，再from binary, - iscc 隐秘的信息

* 多文件
  * 涉及顺序, 不用rglob(1 10 2 顺序有问题), 多用range
  * 多个不同文件： 数量/8是否能整除, 时间戳隐写, 某值之上为1之下为0 iscc2022擂台-弱雪
  * 多个相同文件: 比较二进制 差值转ascii, 如时间差 巅峰极客2022\Misc\Lost
* 不明文件/扩展名
  * 修改后面的ino例 pptx https://m33.wiki/extension/ino.html 
  * 按pk头异或尝试
  * 二进制数据 大端|小端 都要看
  * 魔改文件头 对比搜索文件头前1-2Bytes，中3-4Bytes，有无对应文件头
  * veracrypt
* 隐写
  * key | OurSecret隐写 - 提示:我们的秘密

* 爆破密码 考虑 
  * root+数字
  * admin+数字
  * KEY+大写字母
  * 1-8 数字
  * 1-8 大写
  * 1-8 小写
* DTMF http://dialabc.com/sound/detect/index.html


波形图 高为 1 低为 0 转二进制
BMP/PDF 隐写 - wbStego Steganography Tool (bailer.at)

k 数字 超大数, tupper 自指 https://article.itxueyuan.com/7DyrkD 4. virustotal 扫程序和 IP。 分析出程序有连接 IP。扫 IP。 见 网刃杯 2022 FindMe 5. a3ed97e25583291767054a6a6b533a1c hash 解密

.klr.enc1 - Kaspersky Rescue disk file, 异或 0xef
## RCE绕过类题目
* unicode绕过
* py绕过类
```py
__import__('os').system('cat /fl*')
```
* bash
```sh
arr[$(cat /flag)]
[[ "( homo++ * (114*514*1919*810) + yarimasune - 514 )" -gt 0 ]]
见docs/20.13. If, Elif and Else Statements
```

## unknown
10 进制数中有16进制 可能有问题
16 行文字 --> 16 进制 0-0xf
异或 xor。或及使用 xortools `xor file`, `xortool -l 13 -c 00 file` , 13 是显示最大可能数
* xortools: `xortool -o file` 输出全部异或

### 密码类

3替换z  yihr{Pfit3bf_Q3_NQM}  中 quipquip不支持数字 3改成z  -- yihr{Pfitzbf_Qz_NQM}，用quipquip解得 flag{Welcome_To_RTS} => flag{Welcome_To_CTF}

## 图片题
* https://www.aperisolve.com/
* 看文件末尾、文件头
* Stegsolve
  * File Format - 1.从下向上翻全看, 如palette隐写 2.复制到word再到txt, 过滤{看
  * 每个解码看, 看数据有没可能是反过来的
  * 切换 __仔细看__ 边缘有没有小点, 有则是lsb
  * lsb -- cloacked-pixel
* png
  * 丢失宽高crc32, 修改为.data文件gimp打开
  * 10000+个IDAT块，可能IDAT LENGTH隐写
  * CRC隐写 - tweakpng查看 -- 2022春秋杯 Capture Radiate Chart
* gif
  * ScreenToGif 查看时间帧, 以及差
* 有图像, Google/baidu搜图 可能是提示
* zsteg -a x.png
* 关键字:猫/猫脸变换/arnold 置乱
* 做fourier变换。
* pixel 像素题
  * 1.r,g,b中b一直是255，有时不是255，非255输出chr尝试
  * https://sekao.net/pixeljihad/   https://github.com/oakes/PixelJihad
  * 1.r,g,b数字可能是字符串，加起来转ascii
* BMP文件
  * 010 修改位深 WORD biBitCount 16 为 24 再看
* 多图片问题
  * stegsove - image combiner
* poi/qoi
  * https://www.aconvert.com/image/qoi-to-png/
  * https://floooh.github.io/qoiview/qoiview.html

![](https://s2.loli.net/2022/05/18/f7heVPs4BwJN6ET.jpg)

JPG 
* 隐写 一般国外喜欢用 steghide, 而国内喜欢用 jphs05 , jphs05 打开图片后 seek - 填 2 次相同密码
* 有key: outguess  -- outguess -k 'abc' -r mmm.jpg -t 1.txt 
* SilentEye
BMP
* SilentEye

Stegsolve - Analyse - Sterogram Sovler , "眼神得好"
* bmp图片
  * 注意文件格式, 对比其他图 06h 08h 必须为0 否则有信息
### 二维码
[QR Research 支持反色、残缺](https://mp.weixin.qq.com/s/uyCSZzMd2scAgsALKOIM-Q)
https://cli.im/deqr/   有可能零宽隐写
## PDF文件
1.删除图片
1.顺序重排 -- 2022春秋杯 Capture Radiate Chart  https://mp.weixin.qq.com/s/uT42XKAvNOjEOzlBUbZoUQ
```ts
1.010 Editor打开后, struct PDFXref sPDFXref 展开，
2.按struct PDFXrefItem展开
3.看BYTE OFFSET 按大小重排序 标出 新index 
4.修改struct PDFObj sPDFObj[x]中的index为 新index

-- 或者用苹果设备打开pdf
```

![图片](https://mmbiz.qpic.cn/mmbiz_png/ohCVuC2ZHGfCgbIWhDia5W79oALfBctKQpUXxLJa8EwiaVs9wk9g11e02oAibf9dmoes7gb1RZq5gFspC79nzN5aQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)



## 流量取证题
* 追踪流注意单个 66 6c 61 67 -> flag
* 科来网络分析系统 - 查一下包
* 过滤关键协议如websocket，整体导出为csv, countif过滤length, 找少的比如只有2个的数据。定位查看。
* http
  * url查看有没 file=
  * Sql 数据库最终获取的结果
  * redis.conf
    * 有没 requirepass

* modbus.data 过滤 : tshark -r a.pcapng -T fields -Y "modbus.data > 0" -e frame.number -e modbus.data | sed "/^\s\*$/d" > data.txt 网刃杯 2022 喜欢移动的黑客

* s7comm 1. 追踪流, 2.看数据 tshark -r .\设备药剂间数据采集.pcap -T fields -e s7comm.resp.data -Y s7comm > pic.txt
-------3. 尝试 Ctrl+/过滤 cotp && cotp.type == 0x0f && s7comm.header.rosctr == 1 && s7comm.param.func == 0x05

* 通过VT 行为分析 | 找IP直接丢进去看 BEHAVIOR
* 注意字符串 U2FsdGVkX

rtpbreak -r mus1c6s.pcapng 可以分析并还原RTP流量中的语音内容 
### SMP/蓝牙
crackle -i ble.pcapng -o decode.pcapng #解密流量包再看
### wifi 密码破解 aircrack, airdecap-ng
> kali下
aircrack-ng -w ./dict.txt ./01.cap   # 可看到ssid

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
* 1.故障分析/PLC故障,  科来网络分析系统（技术交流版）
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

参见  网鼎杯2020白虎组 密码柜
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

## pyc 文件

stegosaurus 隐写 python3 stegosaurus.py -x QAQ.pyc -- 3.6 及以下版本

## 压缩包/zip/rar/gzip

使用unzip或者winrar打开 逐个解压，因为包里可能有不需要密码的。

```
-- 解压密码 空格 转 _
-- 伪加密   
            -- zip ZipCenOp.jar r filename
            -- zip 010 -> Ctrl+G -> 6, 奇数加密，偶数未加密。改为偶数尝试
            -- rar  直接拖出来/或解压, 提示密码点确定
               -- 修复 Ctrl+G, 22回车, 7A改为74
                  -- 也可能是  第24位的84改成80
               -- F9 81 74 85 改成 F9 81 74 80
               -- rar4 24 90 -> 20 90 , 用010看  FileHeadFlags HEAD_FLAGS - PASSWORD_ENCRYPTED。
-- 伪解密, 文件报错, 是加密位去掉了, 用101手动恢复多处
   -- 010查看有 dataDescr, 有加密?
   -- 1.Ctrl+G, 6的全局加密位
   -- 2.每个文件有, 单个文件的加密位

-- file gzip, 有comment用010看一下comment
-- 1.7z解压, 2. winrar修复解压: - 工具 - 修复压缩文件
-- 查看注释, 有右侧就是有注释
-- 7z查看文件列表中的文件注释
-- 报错/文件头串改 核对rar和zip文件头
        -- rar 52 61 72 21 1A 07 00 CF 90 73 00 00 0D 00 00 00 00 00 00 00 XX XX 74 A0 90 2C
        -- 修复 winrar - 工具 - 修复压缩文件
-- 密码，先看题目提示，图片文件用010 editor搜索设置 Unicode型, 搜pass, 4位试下。不行再看总结。
-- 修补文件头 文件头顺序被打乱,添加文件头504B并 按504B0304...504B0102....504B0506的顺序调整，  BMZCTF2022 游戏秘籍
-- 爆破
  -- 可见字符1-6位, 仅数字 开始字符0
  -- 文件小,1-8数字
  -- 可见字符1-4位, 大小写+数字
  -- 可见字符1-4位, 全部字符
  -- 可见字符6-6位, 小字母加数字
  -- 给了password 爆破
  -- 时间戳时间可能靠近 用掩码爆破,  1558012728.00|1558052728.99|155???????.??      -- [GUET-CTF2019]zips
  -- zip Advanced Archive Password Recovery 
  -- rar hashcat + rar2john 
  -- zip 掩码爆破 NCTF2018-havefun, 用ARCH, 开始wcy00000 结束wcy00000, 长度8, 暴力

-- 明文攻击, 里面文件有可能是网上有的。搜一下下载个进行明文攻击。
  -- arch 尝试 winrar/7z/bandizip 压缩尝试明文攻击
  -- https://blog.csdn.net/q851579181q/article/details/109767425
  -- 压缩为ZipCrypto 的压缩才能明文攻击
  -- AES256-Deflate/AES256-Store加密的文件不适用于明文攻击。
  -- zip同名txt接用文件名作为明文攻击。 #见@list.md 第四届2021美团网络安全高校挑战赛


  压缩工具要相同，如果产生CRC32不同。换工具试， 算法也要相同
  1.压缩方式要选 1存储 2zip
  pkcrack.exe -C 1.zip -c hhh.jpg -P 2.zip -p hhh.jpg -d decrypt_file.zip -a
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
## android backup
java -jar abe.jar unpack androidbackup  androidbackup.tar
abe.jar 或者用 https://github.com/lclevy/ab_decrypt
## 加密编码/古典密码

| enc                                                 | algorithm                                                    | plain                               |
| --------------------------------------------------- | ------------------------------------------------------------ | ----------------------------------- |
| SSQ8SSR000                                          | rot13                                                        | FFD8FFE00                           |
| 58s4vb6rt4pt5r32yd6ht5u656555r6796524vi69r2yd5om6w0 | [TwinHex](https://www.calcresult.com/misc/cyphers/twin-hex.html) | `flag{I_am_Guwanneme_servant_Gulf}` |
| Q5R2Ln3nLqUnQaIV                                    | base64(itoa)                                                 | pwD_1s_h3re!                        |

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
| rar     | 52617221                     |                          |
| gif     | 47494638                     |                          |
| tif     | 49492A00                     |                          |
| bmp     | 424D                         |                          |
| dwg     | 41433130                     |                          |
| psd     | 38425053                     |                          |
| rtf     | 7B5C727466                   |                          |
| xml     | 3C3F786D6C                   |                          |
| html    | 68746D6C3E                   |                          |
| eml     | 44656C69766572792D646174653A |                          |
| dbx     | CFAD12FEC5FD746F             |                          |
| pst     | 2142444E                     |                          |
| xls/doc | D0CF11E0                     |                          |
| mdb     | 5374616E64617264204A         |                          |
| wpd     | FF575043                     |                          |
| pdf     | 255044462D312E               |                          |
| qdf     | AC9EBD8F                     |                          |
| pwl     | E3828596                     |                          |
| wav     | 57415645                     |                          |
| avi     | 41564920                     |                          |
| ram     | 2E7261FD                     |                          |
| rm      | 2E524D46                     |                          |
| mpg     | 000001BA                     |                          |
| mpg     | 000001B3                     |                          |
| mov     | 6D6F6F76                     |                          |
| asf     | 3026B2758E66CF11             |                          |
| mid     | 4D546864                     |                          |
| dll     | 4D5A90000300000004           |                          |
| 7z      | 377ABCAF271C                 |                          |
| heic    | ftypheic
[hex | Intel hex](https://blog.csdn.net/unsv29/article/details/47828821)

| ext     |  ascii     | Desc
| ------- | ---------  | ---
| mrb     |  RITEXXXX  | mruby 字节码       

## 网络识图/位置

国外 https://lens.google/

## 音频题目

多个相同音频, 通过导入后反相识图。链接如下。
https://mp.weixin.qq.com/s/LXQb_fUW0-3By8xibke-EA

11. wav/音频隐写 https://www.sqlsec.com/2018/01/ctfwav.html https://blog.csdn.net/qq_51652400/article/details/123504708
    -- 1.Audition/Audacity 看 多是摩斯码,
    -- 2.看频谱 spectrogram(视图-频谱)/ audacity 轨道左侧文件名箭头-频谱
    ---------- 频谱完整视图, 右击 - Zoom to fit
    -- DB 波谱: 右击 左侧刻度 -> db
    -- 3.听歌
    -- 4. misc_dtmf / http://dialabc.com/sound/detect/index.html
    -- 本地 dtmf 有时会有重复值
    -- 效果-反向 听声音。
    -- 删除多余文件头，可能有 2 段 riff
    -- SilentEye
       -- 1.参数调整 low,normal,high
       -- 2.参数调整 去掉Compressed data: low,normal,high
    -- Deepsound , deepsound2john.py 可爆破
    -- MP3Stego: decode.exe -X target.mp3
              -- decode.exe -P password -X target.mp3
              -- decode.exe -P pass -X target.mp3
              -- decode.exe -P 主办单位 -X target.mp3
    -- 摩斯码音频 自动解码：
              -- 1.Audition 禁用 其他声道, 将目标声道提高
              -- 2.右击声道，提取为单声道， 导出 mp3
              -- 3. https://morsecode.world/international/decoder/audio-decoder-adaptive.html 上传解码 play
    -- SSTV 扫描
       -- 1.频谱图比较平均 dididi 的声音 见 ### sstv
       -- 2.长度36秒 Robot36
    -- PT2242 信号： 用短的一段表示是 0，长的一段表示是 1 前面 4bit 表示同步码，中间的 20bit 表示地址码，后面的 4bit 表示功能码，最后一位是停止码。
              -- 也就是 0。。。01110100101010100110。0010。0 -- flag 为中间 20bit
              -- PT226X 见 [HDCTF2019]信号分析 https://www.shawroot.cc/1047.html

LSB隐写 用 uint8 读取 wav 然后提取每一个帧的 LSB
### 音频隐写 sstv
长度36秒 Robot36

https://www.cnblogs.com/LEOGG321/p/13731156.html
ctfshow 未知信号

方式1.
1. 安装 [Virtual Audio Cable](https://vac.muzychenko.net/en/download.htm) 或 [Voicemeeter](https://download.vb-audio.com/Download_CABLE/VoicemeeterSetup.exe)
2. windows声音 - 录制 - Line1 设置为默认
3. 安装 [mmsstv](https://hamsoft.ca/pages/mmsstv.php)
4. 用播放器播放音频文件
<!-- [rxsstv](https://www.qsl.net/on6mu/download/Setup_RXSSTV.exe) 设置如下: 3. in设置启动 Audio Repeater 将 wave out 设置 扬声器 2.将 rxsstv 切换到 Robot36 模式下播放音频 -->

方式2. Linux 下用 sudo apt install qsstv
-- 1.Options->Configuration->Sound 勾选 From file, 2.点击播放按钮

方式3.
安卓 Droidsstv

# Article
[数位板流量分析探索](https://www.cnblogs.com/zysgmzb/p/16667154.html)
## 协议
[Bluetooth 蓝牙协议栈技术初探](https://mp.weixin.qq.com/s/1pG6jnvt3aqPrz5Vl6FIqg)

## zip
[CTF之Misc-zip压缩包分析](https://mp.weixin.qq.com/s/QfSzm_6bwbOjP97fu7pLZQ)

## eth
[区块链--合约题入门操作 区块链题型简介 水龙头的对比 remixIDE的基本使用 1——NewStarCTF ](https://www.bilibili.com/video/BV1Xe4y1e7sQ/)

## Steganography/隐写
[各种类型的图片格式隐写术总结](https://mp.weixin.qq.com/s/9KZZDSpw1Xc_um0vNN4kpg)
## 图像相关
[傅里叶图像压缩](https://www.bilibili.com/video/BV1CY411R7bA?t=1329.5)
