[Wireshark](./wireshark.md)

[tshark](./tshark.md)

[[toc]]

## 解题思路
波形图 高为1 低为0 转二进制
k 数字 超大数, tupper自指 https://article.itxueyuan.com/7DyrkD
4. virustotal扫程序和IP。  分析出程序有连接IP。扫IP。  见 网刃杯2022 FindMe 
5. a3ed97e25583291767054a6a6b533a1c  hash解密
## 流量题

追踪流注意单个 66 6c 61 67 -> flag

modbus.data 过滤 : tshark -r a.pcapng -T fields -Y "modbus.data > 0" -e frame.number -e modbus.data  | sed "/^\s*$/d" > data.txt     网刃杯2022 喜欢移动的黑客

s7comm 1. 追踪流,  2.看数据  tshark -r .\设备药剂间数据采集.pcap -T fields -e s7comm.resp.data -Y s7comm > pic.txt

注意字符串 U2FsdGVkX

## 取证题 

1. Magnet AXIOM/FTK/DiskGenius打开 vmdk
2. 看桌面
2.1 Magnet AXIOM收集信息
3。 Firefox key3.db恢复密码
4 浏览历史
##  图片题 

关键字:猫/猫脸变换/arnold置乱

![](https://gitee.com/wgf4242/imgs/raw/master/imgs/Snipaste_2022-04-25_00-10-31.jpg)

jpg 隐写 一般国外喜欢用steghide，而国内喜欢用jphs05 , jphs05 打开图片后 seek - 填2次相同密码
## pyc 文件
stegosaurus 隐写  python3 stegosaurus.py -x QAQ.pyc   -- 3.6及以下版本
## 加密编码/古典密码

### 看不出来

16行文字 --> 16进制 0-0xf
异或xor。或及使用 xortools   `xor file`, `xortool -l 13 -c 00 file` , 13是显示最大可能数


|                enc                 |             algorithm              |               plain                |
| ---------------------------------- | ---------------------------------- | ---------------------------------- |
|             SSQ8SSR000             |               rot13                |             FFD8FFE00              |
|58s4vb6rt4pt5r32yd6ht5u656555r6796524vi69r2yd5om6w0|[TwinHex](https://www.calcresult.com/misc/cyphers/twin-hex.html)| `flag{I_am_Guwanneme_servant_Gulf}`  |
|          Q5R2Ln3nLqUnQaIV          |            base64(itoa)            |            pwD_1s_h3re!            |


### Caesar

套路总结

1. 逐位对比ascii值, 对比flag/ctf/**主办方**名字 ascii值
2. %128
3. 每个 - n 再对比, 构成等差数列 对比flag/ctf/**主办方**名字 ascii值 参考 NISACTF2022 funnycaeser， key为5


## 文件头
字符串 PK是 zip的开头,  5d480506xxxxx 为尾部

|                ext                 |               header               |                end                 |
| ---------------------------------- | ---------------------------------- | ---------------------------------- |
|                jpg                 |              FFD8                  |              FFD9                  |
|                png                 |              89504E47              |      0000000049454E44AE426082      |
|                zlib                |              789C                  |                                    |
|                zip                 |              504B0304              |              00000000              |
|                rar                 |              52617221              |
|                gif                 |              47494638              |
|                tif                 |              49492A00              |
|                bmp                 |                424D                |
|                dwg                 |              41433130              |
|                psd                 |              38425053              |
|                rtf                 |             7B5C727466             |
|                xml                 |             3C3F786D6C             |
|                html                |             68746D6C3E             |
|                eml                 |    44656C69766572792D646174653A    |
|                dbx                 |          CFAD12FEC5FD746F          |
|                pst                 |              2142444E              |
|              xls/doc               |              D0CF11E0              |
|                mdb                 |        5374616E64617264204A        |
|                wpd                 |              FF575043              |
|                pdf                 |           255044462D312E           |
|                qdf                 |              AC9EBD8F              |
|                pwl                 |              E3828596              |
|                wav                 |              57415645              |
|                avi                 |              41564920              |
|                ram                 |              2E7261FD              |
|                 rm                 |              2E524D46              |
|                mpg                 |              000001BA              |
|                mpg                 |              000001B3              |
|                mov                 |              6D6F6F76              |
|                asf                 |          3026B2758E66CF11          |
|                mid                 |              4D546864              |



## 流量取证

### misc_live/RTMP/RTSP/MPEG-DASH

题目: 2021中石油集团公司第二届网络安全攻防赛团体赛预赛 - Misc - Live

涉及协议 直播流协议：RTMP、RTSP、MPEG-DASH

[手撕rtmp协议专项](https://mp.weixin.qq.com/mp/homepage?__biz=MzAwODM5OTM2Ng==&hid=7&sn=0192ad4506003b7b13d5efde0ff15312)

工具

1.[rtmp2flv 流量包转换为 flv 视频](https://github.com/quo/rtmp2flv)

2.[rtptools](https://github.com/irtlab/rtptools)

解题流程:

tcpflow -T %T_%A%C%c.rtmp -r Live.pcapng -o out

./rtmp2flv.py 最大的文件.rtmp

RTMP协议中 可以还原出一段音频 一个画面  分别为flag1  flag2  

RTSP协议过滤出来之后 会找到比较特殊的包  RTSP/SDP协议的  

把SDP协议提取出来  导出魔改SDP之后可以拿到 flag3  flag4 

MPEG-DASH 协议 导出文件归类  然后写个脚本  开个服务器  可以得到flag5 flag6

## 网络识图/位置

国外 https://lens.google/

## 音频题目

多个相同音频, 通过导入后反相识图。链接如下。
https://mp.weixin.qq.com/s/LXQb_fUW0-3By8xibke-EA

11. wav/音频隐写 https://www.sqlsec.com/2018/01/ctfwav.html
    -- 1.Audition/Audacity看 多是摩斯码, 
    -- 2.看频谱spectrogram(视图-频谱)/ audacity 轨道左侧文件名箭头-频谱 
       -- DB波谱: 右击 左侧刻度 -> db 
    -- 3.听歌
    -- 4. misc_dtmf / http://dialabc.com/sound/detect/index.html
          -- 本地dtmf有时会有重复值
    -- 效果-反向 听声音。
    -- 删除多余文件头，可能有2段riff
    -- SilentEye
    -- MP3Stego: decode.exe -X target.mp3
    --           decode.exe -P password -X target.mp3
    --           decode.exe -P pass -X target.mp3
    --           decode.exe -P 主办单位 -X target.mp3
    -- 摩斯码音频 自动解码： 
    --         1.Audition禁用 其他声道, 将目标声道提高 
    --         2.右击声道，提取为单声道， 导出mp3
    --         3. https://morsecode.world/international/decoder/audio-decoder-adaptive.html 上传解码 play
    -- SSTV扫描, 频谱图比较平均 dididi的声音 见 ### sstv
    -- PT2242信号： 用短的一段表示是0，长的一段表示是1   前面4bit表示同步码，中间的20bit表示地址码，后面的4bit表示功能码，最后一位是停止码。
               -- 也就是 0。。。01110100101010100110。0010。0  -- flag为中间20bit
               -- PT226X 见 [HDCTF2019]信号分析 https://www.shawroot.cc/1047.html

### 音频隐写sstv
https://www.cnblogs.com/LEOGG321/p/13731156.html
ctfshow未知信号

工具下载
https://software.muzychenko.net/trials/vac460.zip
https://www.qsl.net/on6mu/download/Setup_RXSSTV.exe
1.先安装 Virtual Audio Cable, 启动Audio Repeater 将 wave out 设置 扬声器
2.将rxsstv切换到 Robot36模式下播放音频
或者Linux下用 sudo apt install qsstv
-- Options->Configuration->Sound勾选From file, 再点击播放按钮
