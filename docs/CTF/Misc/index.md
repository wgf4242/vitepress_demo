[Wireshark](./wireshark.md)

[tshark](./tshark.md)

[[toc]]

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