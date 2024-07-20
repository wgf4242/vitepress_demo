-*- coding: utf-8 -*-

[Wireshark](./wireshark.md)

[tshark](./tshark.md)

[[toc]]

## 解题思路
- 1.binwalk foremost
- [文本处理/文字隐写](#文本隐写空白隐写)
- Misc*password*密码字典\_dictionary_wordlists_fuzzing_SecLists-2023.2_5.zip
- [加密与解密 密码](../Crypto/index.md#%解题思路)
- 1.不要路径有空格, 不要中文路径
- 所有文件 尤其 txt， 用 sublime 打开全选查看。 有没\t, space, 可能是莫斯。
- grep -ri "flag"
- strings ./file | grep flag
- 010 1.全局搜索 2. Unicode 型搜索
- 丢云沙箱检查相关信息
- 文件名 hxcode 汉信码
- 搜索 文件名 + encryption
- 32 位长度 AES 的秘钥
- swp 文件 vim -r index.php.swp
- Base64 解出来看不懂
  - To Hex, 16 位可能是 md5, 如果是 2 层 md5, flag 可能是一层 md5
  - 尝试 rot13, 尝试 base32
- 多组颜色(8 组), 7 进制加分隔符, -- 2022 长城杯办公室爱情
- 2 种数据/2 进制/2 种颜色
  - 分成 8 个一组，尝试前后补 0, 以及 python int(011, 2)
  - 转二维码
  - 2 种颜色 - 转二进制
- 时间 转字母 00:01-A, 00:02-B, 00:03-C , 也可能是 00:00 是 A。根据情况试着移位吧
- 得到密码
  - 可能转小写 `Watermark_is_fun -> watermark_is_fun`
- 得到 flag{pNg_and_Md5_SO_GreaT} 同时给出 32 位 md5 可能是提示大小写换一下爆破。Png_AnD_md5_so_GReAt
- unknown 数据
  - 题目相关 `来自星尘的问候` 搜 `星尘字体`
  - 多用 sublime 看可能有零宽
  - ciphey
  - 邮件 | `Dear E-Commerce professional` https://spammimic.com/decode.cgi
  - 每 2 个字符换位置
  - 1.CTF.xmind 2. CTF.xmind.md 3.解密总结
  - `”Kh†”Kh†”Kh†”Kh†”Kh†”K`  Python pickle反序列化, 文件头80 04，ascii码是 €
  - 字频统计
  - base64 换表
  - 像 base64 但=号位置不对 `bYeNQXYZXbXZQfW31FGzzD0m0FHQ9RR85FFQYMB9M=lmo2ku11z0uiz=` Caesar Box Cipher 14 后 base64 解
  - 2个数据时, 一个是字节内容, 一个是顺序号
  - 符合 16 进制 data, base64.encode(data)
  - 逆序试一下
  - 提示逆向，可能是指加密
  - 有空格和 tab 可能是摩斯码或二进制
  - 补全文件头 和 文件尾部
  - 查 md5
  - 像 base64, 解 b64 看不懂。 直接 ^ flag 试试。 或者不解 b64 异或 ZmxhZw
  - To Hex, 16 位可能是 md5, 如果是 2 层 md5, flag 可能是一层 md5
  - 看不懂/外文, 使用 Cyberchef Text Encoding Brute Force 选 Decode
  - 每行字符的第一个/最后一个 组合提取密码
  - 观察文件尾 文件头 50 4b 03 04 正序反序
  - 不明的 2 段 , 其中一段是不重复的 -- base64 换表
  - 拆成 2 段 base64 例 enlyZ2h3eXlmeHc0ezhpMAMX1tMzk3amNpNXZqdDRrZg====
  - Fence Code
  - 画图, 比如 01 多行，把 1 画出来。连上看看效果。
  - 大文件: 1.混乱字节且 2.大小整数 20mb 倍数 测 veracrypt（或 truecrypt）
  - 小白说：zo23n，小黑说：f5s7e `zero(0)one(1)23nine(9) four(4)five(5)six(7)eight(8)`
- 数字
  - 1 个数据 比较长 tupper
- 不明数字+字母
  - Caesar 后过滤 16 进制。
- 不明 16 进制/字符串
  - 1 位调换 Cyberchef: 1713 => 7131: reverse - from hex
  - 2 位调换 Cyberchef: 71 31=> 31 71
  - 1.fromhex - to binary - reverse - from binary - reverse
  - 2.to binary, 去掉前面的 1，再 from binary, - iscc 隐秘的信息
- 终端 terminal 类题目

  - 1.向上翻阅 历史记录， 如果默认进入了其他程序, Ctrl+C, Ctrl+D 退出回到 shell
  - 2.history 相关查阅

- 多文件
  - 涉及顺序, 不用 rglob(1 10 2 顺序有问题), 多用 range
  - 多个不同文件： 数量/8 是否能整除, 时间戳隐写, 某值之上为 1 之下为 0 iscc2022 擂台-弱雪
  - 多个相同文件: 比较二进制 差值转 ascii, 如时间差 巅峰极客 2022\Misc\Lost
- 不明文件/扩展名
  - 修改后面的 ino 例 pptx https://m33.wiki/extension/ino.html
  - 按 pk 头异或尝试
  - 二进制数据 大端|小端 都要看
  - 魔改文件头 对比搜索文件头前 1-2Bytes，中 3-4Bytes，有无对应文件头
  - veracrypt
- PPT
  - 1.看每页备注, 2.pptx 解压 notesSlide1.xml `<a:t>`标签
- 隐写

  - key | OurSecret 隐写 - 提示:我们的秘密

- 爆破密码 考虑
  - 主办方名字, 如 dasctf
  - root+数字
  - admin+数字
  - KEY+大写字母
  - 1-8 数字
  - 1-8 大写
  - 1-8 小写
  - seclist 压缩包里找找
- DTMF http://dialabc.com/sound/detect/index.html
- vmdk/虚拟机/磁盘镜像
  - 挂载到虚拟机, 比如 qnx 硬盘 mount -t qnx6 /dev/sdc1 /mnt
  - [获取虚拟机的 shell](https://mp.weixin.qq.com/s/GT0k-rPwahlzqz7Ru2XnUg)

波形图 高为 1 低为 0 转二进制
BMP/PDF 隐写 - wbStego Steganography Tool (bailer.at)

k 数字 超大数, tupper 自指 https://article.itxueyuan.com/7DyrkD 4. virustotal 扫程序和 IP。 分析出程序有连接 IP。扫 IP。 见 网刃杯 2022 FindMe 5. a3ed97e25583291767054a6a6b533a1c hash 解密

.klr.enc1 - Kaspersky Rescue disk file, 异或 0xef

- ascii chart ， 010 editor 默认用 Droid Sans Mono 看，MS Gothic，楷体，Akelpad都可以试

- [.img 文件](forensics.md#取证题)
- [拼图 gaps](#拼图-gaps)

## [流量分析](./misc_pcapng_流量分析.md)

## RCE 绕过类题目

- unicode 绕过
- py 绕过类

```py
__import__('os').system('cat /fl*')
```

- bash

```sh
arr[$(cat /flag)]
[[ "( homo++ * (114*514*1919*810) + yarimasune - 514 )" -gt 0 ]]
见docs/20.13. If, Elif and Else Statements
```

## unknown

10 进制数中有 16 进制 可能有问题
16 行文字 --> 16 进制 0-0xf
异或 xor。或及使用 xortools `xor file`, `xortool -l 13 -c 00 file` , 13 是显示最大可能数

- xortools: `xortool -o file` 输出全部异或

### 密码类

3 替换 z yihr{Pfit3bf_Q3_NQM} 中 quipquip 不支持数字 3 改成 z -- yihr{Pfitzbf_Qz_NQM}，用 quipquip 解得 flag{Welcome_To_RTS} => flag{Welcome_To_CTF}

## 图片题/wav

- key 可能
  - 题目名/文件名的拼音或英文/图片中的数字。
  - 比如 `ez签到` key: `qiandao`
  - SQL 注入的 key: `sql`
  - 图片有数字 key: `图片中的数字`

| format          | 支 key | 无 key | 工具                                                                       | 使用                                                                                                                                                                                                             |
| --------------- | ------ | ------ | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| png             |        |        | Misc_steg_lsb_extract.py                                                   |
| png             |        |        | 2.查看所有 idat 头是否连续最大值                                           |
| png             | √      |        | 提示:aes/lsb, cloacked-pixel                                               | py2 lsb.py extract mmm.png out.txt lovekfc                                                                                                                                                                       |
| png             |        |        | steg-solve/cloacked-pixel                                                  | 低位有 lsb 但提取 rgb0 没信息，可能为 cloacked-pixel                                                                                                                                                             |
| png             | √      | √      | stegpy                                                                     | stegpy <file> -p                                                                                                                                                                                                 |
| png             |        | √      | zsteg                                                                      | zsteg -a x.png                                                                                                                                                                                                   |
| png             |        |        | Misc_png_width2.py                                                         | 爆破宽度                                                                                                                                                                                                         |
| png             |        |        |                                                                            | 有明显剪裁效果,或者多个 iend, cve-2023-28303 Acropalypse-Multi-Tool, win 下运行要 注释`from gif_lib`                                                                                                             |
| png             |        |        | stegsolve                                                                  | 检查 IDAT 块是否正常排列, 正常填充满 65524 才会写下一块, 010 中选择该块的 ubtye_data, 复制                                                                                                                       |
| png             |        |        | puzzlesolver                                                               | fft 变换，多选项, 都试一下                                                                                                                                                                                       |
| png 多图        |        |        | beyond compare                                                             | 打开 2 张图, 1. 点击容差，修改容差大小 2. stegsolve xor 两张图                                                                                                                                                   |
| png 多图        |        |        | stegsolve                                                                  | xor, 蓝色的线盲水印, 非蓝色 排除盲水印                                                                                                                                                                           |
| png 单图        |        |        | 盲水印 misc_blindWaterMark 盲水印\_all.zip                                 | misc_BlindWatermark.bat 都试                                                                                                                                                                                     |
| png 多图        |        |        | 盲水印                                                                     | misc_BlindWatermark.bat 都试                                                                                                                                                                                     |
| 多图            |        |        |                                                                            | 相减, 不同的像素点可能是 flag, 统计个数可能是 flag                                                                                                                                                               |
| 多图            |        |        |                                                                            | 1.修改日期排序, 看区别 <br>2.创建时间排序, 看区别                                                                                                                                                                |
| 多图 (像素一致) |        |        | Hgame2024 Week2 ezWord - StegSolve 原版 Image Combiner                     |
| 图片            |        |        |                                                                            | 看看每行的颜色和个数 `Misc_picture_other_count_num.py`                                                                                                                                                           |
| jpg             |        |        | stegdetect                                                                 | stegdetect -tjopi -s 10.0 ./a.jpg                                                                                                                                                                                |
|                 |        |        | stegdetect                                                                 | ./stegdetect -tF test.jpg                                                                                                                                                                                        |
|                 |        |        | steghide                                                                   | steghide extract -sf test.jpg -p 123456                                                                                                                                                                          |
|                 |        |        | stegseek 爆破 steghide                                                     | stegseek cvr.jpg wordlist.txt                                                                                                                                                                                    |
|                 | √      |        | [jphs05/Jphswin/jpseek](ftp://ftp.gwdg.de/pub/linux/misc/ppdd/jphs_05.zip) |
| jpg             | √      |        | outguess                                                                   | outguess -k 'abc' -r mmm.jpg -t 1.txt                                                                                                                                                                            |
| jpg             | √      |        | SilentEye                                                                  |                                                                                                                                                                                                                  |
| jpg             | √      |        | F5-steganography-master<br>comment 有`JPEG Encoder Copyright 1998`         | java Extract 生成图.jpg -p '密码'                                                                                                                                                                                |
| wav             | √      |        | SilentEye                                                                  |
| bmp             | √      |        | SilentEye                                                                  |                                                                                                                                                                                                                  |
| bmp             | √      |        | jphs05/Jphswin                                                             | jphs05                                                                                                                                                                                                           |
| gif             |        |        | identify                                                                   | 时间轴信息隐藏 `identify -format "%T\n" 100.gif` , 010 中可看 `GRAPHICCONTROLEXTENSION >ushort DelayTime` <br> 分离文件 `convert a.gif flag.png` <br> 拼图变透明色 `convert a.gif -transparent white result.gif` |
| `<all>`         |        |        | stegsolve                                                                  | Analyse - Stereogram Solver, 看 offset                                                                                                                                                                           |
| `<all>`1        | √      |        | 010 查看头信息中的编辑器                                                   | 用对应编辑器打开, 可能有隐藏图层                                                                                                                                                                                 |
| `<all>`2        | √      |        | oursecret                                                                  | oursecret                                                                                                                                                                                                        |
| `<all>`3        | √      |        | 傅利叶变换                                                                 | misc_blindWaterMark_02_fourier.py                                                                                                                                                                                |

- https://www.aperisolve.com/
- 看文件末尾、文件头
- Stegsolve
  - File Format - 1.从下向上翻全看, 如 palette 隐写 2.复制到 word 再到 txt, 过滤{看
  - 每个解码看, 看数据有没可能是反过来的
  - 切换 **仔细看** 边缘有没有小点, 有则是 lsb
  - lsb -- cloacked-pixel
- png
  - 丢失宽高 crc32, 修改为.data 文件 gimp 打开
  - 10000+个 IDAT 块，可能 IDAT LENGTH 隐写
  - IDAT有问题时, 
    - 1. 将其他IDAT块都删除并保存
    - 2. zlib解压
  - CRC 隐写 - tweakpng 查看 -- 2022 春秋杯 Capture Radiate Chart
- gif
  - ScreenToGif 查看时间帧, 以及差
- 有图像, Google/baidu 搜图 可能是提示
- 关键字:猫/猫脸变换/arnold 置乱  [一文带你了解Arnold猫脸变换](https://1cepeak.cn/post/arnold/)
- 做 fourier 变换。
- pixel 像素题
  - r,g,b 中 b 一直是 255，有时不是 255，非 255 输出 chr 尝试
  - https://sekao.net/pixeljihad/ https://github.com/oakes/PixelJihad
  - r,g,b 数字可能是字符串，加起来转 ascii
  - alpha 有信息时, 测试 255 时 输出 1,否则为 0
- BMP 文件
  - 010 修改位深 WORD biBitCount 16 为 24 再看
- 多图片问题
  - stegsove - image combiner
- poi/qoi
  - https://www.aconvert.com/image/qoi-to-png/
  - https://floooh.github.io/qoiview/qoiview.html
- dcm 文件 microdicom 导出见 红明谷 2023 X 光的秘密
  ![](https://s2.loli.net/2022/05/18/f7heVPs4BwJN6ET.jpg)

工具使用

- steghide 爆破

Stegsolve - Analyse - Sterogram Sovler , "眼神得好"

- bmp 图片

  - 注意文件格式, 对比其他图 06h 08h 必须为 0 否则有信息

- convert

```sh
sudo apt-get install imagemagick
convert a.gif qr.jpg
## png多图转透明背景合并
ls *.png | while read filename; do convert $filename -transparent white $filename; done;
ls *.png | while read filename;  do convert $filename 00.png --gravity center -composite(组合) 00.png ; done
```

### 文本隐写/空白隐写

| cmd                          | param                                                                                                                 | Description                                                                       |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| 词频分析/统计                | 一堆字母的时候                                                                                                        |
| 去重复                       |
| 二进制                       | 只有 2 种字符<br>比如 8 空格 4 空格组成 <br>每 8 位<br>可能是二维码, 复制到 Excel 转黑白, 选中后条件格式突出显示      |
| snow/Tab/空格                | `snow -C flag.txt`<br>`snow -C -p [pwd] snow.txt`                                                                     | Google:space tab steg, baidu: 空格 制表符 隐写 , http://www.darkside.com.au/snow/ |
| nfs 流                       | misc_ntfs_stream_pyads.py<br>notepad 1.txt:flag.txt<br>NtfsStreamsEditor                                              |                                                                                   |
| TTL 隐写                     | `127\|63\|255\|191` 2 进制前 2 位变化 `[SWPU2019]Network` ,63/127/191/255                                             |
| sublime 查看                 | 是否有 0 宽隐写                                                                                                       |                                                                                   |
| stegosaurus 剑龙             | python stegosaurus.py -x O_O.pyc                                                                                      |
| base64 隐写                  | 多行 base64                                                                                                           |
| 单词拼写错误的字母可能是 key | [google-10000-english.txt](https://github.com/first20hours/google-10000-english/blob/master/google-10000-english.txt) |

### 拼图 gaps

kali 图形界面终端执行完成

\[MRCTF2020\]不眠之夜 [Link2](https://www.cnblogs.com/wrnan/p/12912705.html) [Link3](https://blog.csdn.net/mochu7777777/article/details/109649446)

[使用自动拼图工具gaps进行自动拼图](https://mp.weixin.qq.com/s/QlrpOEdFH8YwZlnosXznrQ)
```sh
montage *.png -tile 图片摆放格式 -geometry 输出图片分辨率 flag.png  , +0+0 -- 设置图片无间隙, 设置分辨率会不清晰
# tile后是从左往右张数x从上往下张数（宽的图片数x长的图片数）, 要拼的图为120张，长有10张，宽有12张，所以是10x12, 每块大小是200x100 或 400x200 即放大为2倍

## -1-
montage -tile 10x12 -geometry 200x100+0+0 *jpg flag.jpg
montage -tile 3x3 -geometry +0+0 *.png flag.png
montage *.jpg -tile 66x100 -geometry +0+0 ../flag02.png
# gaps乱序的图像还原拼图 “–generations” 最好就等于原始图片的数量，即piece的数量
# - –generations 遗传算法的代的数量(个体数量 tile的大小) –population 个体数量
# size为小拼图的像素宽度
gaps --image=flag.jpg --generations=40 --population=120 --size=100

## -2-
montage *.jpg -tile 10x12 -geometry +0+0 out.jpg
gaps --image=out.jpg --size=200 --save
# （--size是小图的宽）
```

### 二维码

- 旋转 180 度然后 填充 version1. -- ezQR 2023 贝格通杯 MISC
- [QRazyBox](https://merricx.github.io/qrazybox/) - Tool - Brute-force Format Info Pattern, 爆破，然后 Decode
- [QR Research 支持反色、残缺](https://mp.weixin.qq.com/s/uyCSZzMd2scAgsALKOIM-Q)
- https://cli.im/deqr/ 有可能零宽隐写
- [如何手算二维码](https://www.bilibili.com/video/BV18s411P7to)
- [如何笔算解码二维码？](https://www.zhihu.com/question/65253283) \* L3HCTF2021 cropped，NEEPU Sec 2023 二维码修复计划
- [二维码之 QR 码生成原理与损坏修复 ](https://www.cnblogs.com/luogi/p/15469106.html)
- [ez-qrcode](https://yous.be/2014/12/07/seccon-ctf-2014-qr-easy-write-up/)
- [CTFSHOW-36D 杯: ez-qrcode](https://byxs20.github.io/posts/15890.html#4-%E6%95%B0%E6%8D%AE%E8%A7%A3%E7%A0%81)

[二维码 QRCode 标准阅读](https://note.tonycrane.cc/ctf/misc/qrcode/)
[二维码 QRCode 标准阅读 - En](https://gcore.jsdelivr.net/gh/tonycrane/tonycrane.github.io/p/409d352d/ISO_IEC18004-2015.pdf)

## PDF 文件

1.删除图片 1.顺序重排 -- 2022 春秋杯 Capture Radiate Chart https://mp.weixin.qq.com/s/uT42XKAvNOjEOzlBUbZoUQ

```ts
1.010 Editor打开后, struct PDFXref sPDFXref 展开，
2.按struct PDFXrefItem展开
3.看BYTE OFFSET 按大小重排序 标出 新index
4.修改struct PDFObj sPDFObj[x]中的index为 新index

-- 或者用苹果设备打开pdf
```

![图片](https://mmbiz.qpic.cn/mmbiz_png/ohCVuC2ZHGfCgbIWhDia5W79oALfBctKQpUXxLJa8EwiaVs9wk9g11e02oAibf9dmoes7gb1RZq5gFspC79nzN5aQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)

## pyc 文件

stegosaurus 隐写 python3 stegosaurus.py -x QAQ.pyc -- 3.6 及以下版本

## 压缩包

### 压缩包/zip

[Format](https://users.cs.jmu.edu/buchhofp/forensics/formats/pkzip.html)

1. rockyou.txt 破解

2. 伪加密

- ZipCenOp.jar r filename
- 010 -> Ctrl+G -> 6, 奇数加密，偶数未加密。改为偶数尝试, 010 editor 看 - ushort flags
- 和正常压的 zip 对比一下标志位
- CRC32 校验 ### zip CRC32 检验

- 伪解密, 文件报错, 是加密位去掉了, 用 101 手动恢复多处, 见下面
- 压缩包套压缩包有密码, 已知文件名 - 明文攻击

### 压缩包/rar/gzip

使用 unzip 或者 winrar 打开 逐个解压，因为包里可能有不需要密码的。

```
-- 解压不了用 7z/360zip/好压/试试
-- 解压密码 空格 转 _
-- 伪加密 , [VNCTF 2021]冰冰好像藏着秘密.rar  , 伪加密时010识别的位置不对。
  -- rar  直接拖出来/或解压, 提示密码点确定
      -- 修复 Ctrl+G, 22回车, 7A改为74
        -- 也可能是  第0x17(24)位的84改成80,  主要就是4改0
      -- F9 81 74 85 改成 F9 81 74 80
      -- rar4 24 90 -> 20 90 , 用010看  struct RarBlock block[0] > struct FileHeadFlags > HEAD_FLAGS - PASSWORD_ENCRYPTED

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
```

### 明文攻击

- 里面文件有可能是网上有的。搜一下下载个进行明文攻击。
- arch 尝试 winrar/7z/bandizip/360 压缩尝试明文攻击
    - arch 显示找回口令时已经获取了密钥
- https://blog.csdn.net/q851579181q/article/details/109767425
- 压缩为 ZipCrypto 的压缩才能明文攻击
- AES256-Deflate/AES256-Store 加密的文件不适用于明文攻击。
- zip 同名 txt 接用文件名作为明文攻击。 #见@list.md 第四届 2021 美团网络安全高校挑战赛

ZipCrypto Deflate

ZipCrypto Store

AES-256 Deflate

AES-256 Store

ZipCrypto 算是传统的 zip 加密方式。只有使用 ZipCrypto Deflate /Store 才可以使用 ZIP 已知明文攻击进行破解。

Winrar（v5.80）、7zip（v19.00）默认是 AES256 算法，直接排除。
360 压缩（v4.0.0.1220）、好压（v6.2）使用的是 ZipCrypto，不固定使用 Store 或 Deflate（如果要固定使用 ZipCrypto Store 算法加密，可以在压缩的时候指定压缩方式为“存储”

压缩工具要相同，如果产生 CRC32 不同。换工具试， 算法也要相同 1.压缩方式要选 1 存储 2zip , 下面工具使用 --help 查看帮助

bkcrack, 明文只需要满足 8 字节连续，一共 12 字节已知即可

| Cmds                                                                        | Desc                                                                                                                                              |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `bkcrack -C flag.zip -c hint.txt -P hint.zip -p hint.txt`                   | 压缩方式不同,有时要用 -P xxx.zip
| `bkcrack -C flag.zip -c flag/SYCTF{aditziczrh} -P flag1.zip -p flag/SYCTF{aditziczrh}` | 
| `bkcrack -C out.zip -c flag.zip -x 0 504B0304 -x 150 504B050600000000`      | 针对压缩包 a 里有压缩包 b 的情况, 知道 b 中是 flag.txt , 为啥是 150: zip 大小-22, 打开 a 查看 b 大小为 172 则 172-22=150, `f18d1f04aa82_4266.zip` |
| `bkcrack -C out.zip -c flag.zip -x 0 504B0304 -x 30 666C61672E747874`       | 针对压缩包 a 里有压缩包 b 的情况, 知道 b 中是 flag.txt                                                                                            |
| `bkcrack -C 1.zip -c 1.png -x 0 89504E470D0A1A0A0000000D49484452`           | 解 PNG 明文                                                                                                                                       |
| `bkcrack -C Easy_VMDK.zip -c flag.vmdk -x 0 4B444D5601000000030000`         | -x `[offset] [16进制]` , offset 默认 10 进制可用 `0xD0`                                                                                           |
| `bkcrack -C Easy_VMDK.zip -c flag.vmdk -p keys.txt`                         | 把`4B444D5601000000030000` 16 进制写入 keys.txt 也可以                                                                                            |
| `bkcrack -C flag.zip -k a923d145 ecc0362d 296a6ff5 -U 123.zip 123 `         | 修改密码为 123, 保存到 123zip                                                                                                                     |
| `bkcrack -C png4.zip -c flag.txt -k e0be8d5d 70bb3140 7e983fff -d flag.txt` |                                                                                                                                                   |
| `bkcrack -C test5.zip -c 2.png -k b21e5df4 ab9a9430 8c336475  -d 2.png`     | # 解密非破解文件, 用 inflate.py 2 次处理                                                                                                          |
| `python3 inflate.py < 2.png > 2_out.png`                                    |                                                                                                                                                   |

| bkcrack-param          |     |
| ---------------------- | --- |
| -p plainfile           |     |
| -P plainzip            |     |
| `-x [offset] [16进制]` |     |

rbkcrack

````
  只需要知道加密压缩包内容的连续12个字节， .exe -C 1.zip -c hhh.jpg -P 2.zip -p hhh.jpg -d re.zip -a
  -- 文件开头有可能存在\r\n+10个连续空格，可以进行尝试
  -- rbkcrack.exe -C flag.zip -c hint.txt -p hint.txt -P hint.zip
  -- rbkcrack.exe -C ecryptedzip.zip -c LICENSE -p LICENCE.txt
  -- zip文件名攻击
    -- rbkcrack.exe -C ecryptedzip.zip -c flagornot.zip -p plain.txt -o 30 # plain.txt内容为 flagornot.txt
    ```
    ecryptedzip.zip
    |--flagornot.zip # 这里面是plain.txt
    ```
  -- 3组key解密 rbkcrack.exe -C ecryptedzip.zip -c README.md -k 32cc3495 7f955ff5 58291af3 -d README.md
    -- 所以解密后注意得到的out.png是deflate的数据流，用rbkcrack/tools里 python inflate.py < out.png > out1.png
  github搜索文件, advance search - Code options 处可搜索文件名, 文件大小。

  pkcrack -c flag.zip -p hint.txt -P hint.zip # 用bkcrack快一些
  pkcrack.exe -C 1.zip -c hhh.jpg -P 2.zip -p hhh.jpg -d decrypt_file.zip -a
  Advanced Archive Password Recovery 比上面慢。提示尝试找回口令的时候---停止。然后用3个密钥解密。


-- 小文件爆破 (原始)大小 <=6 可以考虑CRC32爆破攻击
  压缩包里是4b 就是4个字母, 3b就是3个字母。
    python crc32.py reverse 0x1b2e6194
````

### zip CRC32 检验

[Link](https://blog.csdn.net/harryhare/article/details/55176832)

```sh
cat test.txt
abcd

```

压成 zip 看 crc 为 `11 CD 82 ED` 小端

```py
print(hex(binascii.crc32(b'abcd')))
0xed82cd11
```

校验为纯数据的 CRC 校验

### 爆破 crunch/hashcat

## android backup

java -jar abe.jar unpack androidbackup androidbackup.tar
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

## 文件头/文件格式解析

[wav 文件格式解析](https://blog.csdn.net/chen06130/article/details/118881999)

字符串 PK 是 zip 的开头, 5d480506xxxxx 为尾部

| ext     | header                                                            | end                      |
| ------- | ----------------------------------------------------------------- | ------------------------ |
| jpg     | FFD8                                                              | FFD9                     |
| png     | 89504E47                                                          | 0000000049454E44AE426082 |
| zlib    | 789C                                                              |                          |
| zip     | 504B0304                                                          | 00000000                 |
| rar     | 52617221                                                          |                          |
| gif     | 47494638                                                          |                          |
| tif     | 49492A00                                                          |                          |
| bmp     | 424D                                                              |                          |
| dwg     | 41433130                                                          |                          |
| psd     | 38425053                                                          |                          |
| rtf     | 7B5C727466                                                        |                          |
| xml     | 3C3F786D6C                                                        |                          |
| html    | 68746D6C3E                                                        |                          |
| eml     | 44656C69766572792D646174653A                                      |                          |
| dbx     | CFAD12FEC5FD746F                                                  |                          |
| pst     | 2142444E                                                          |                          |
| xls/doc | D0CF11E0                                                          |                          |
| mdb     | 5374616E64617264204A                                              |                          |
| wpd     | FF575043                                                          |                          |
| pdf     | 255044462D312E                                                    |                          |
| qdf     | AC9EBD8F                                                          |                          |
| pwl     | E3828596                                                          |                          |
| wav     | 57415645                                                          |                          |
| avi     | 41564920                                                          |                          |
| ram     | 2E7261FD                                                          |                          |
| rm      | 2E524D46                                                          |                          |
| mpg     | 000001BA                                                          |                          |
| mpg     | 000001B3                                                          |                          |
| mov     | 6D6F6F76                                                          |                          |
| asf     | 3026B2758E66CF11                                                  |                          |
| mid     | 4D546864                                                          |                          |
| dll     | 4D5A90000300000004                                                |                          |
| 7z      | 377ABCAF271C                                                      |                          |
| heic    | ftypheic                                                          |
| [hex    | Intel hex](https://blog.csdn.net/unsv29/article/details/47828821) |

| ext | ascii    | Desc         |
| --- | -------- | ------------ |
| mrb | RITEXXXX | mruby 字节码 |

## 网络识图/位置

国外 https://lens.google/

## 视频/音频题目

“安洵杯”全国精英赛 SYCTF2023 cancellation `misc_video_audio_sstv.py`

1. mediainfo 查看
2. 音频提取 sstv 处理

## 音频题目/wav/mp3

[关于音频隐写的一些总结](https://mp.weixin.qq.com/s/8U_UGZh9NujVKxJ-_tku8w)
多个相同音频, 通过导入后反相识图。链接如下。
https://mp.weixin.qq.com/s/LXQb_fUW0-3By8xibke-EA

11. wav/音频隐写 https://www.sqlsec.com/2018/01/ctfwav.html https://blog.csdn.net/qq_51652400/article/details/123504708
    - 1.Audition/Audacity 看 多是摩斯码,
    - 2.看频谱 spectrogram(视图-频谱)/ audacity 轨道左侧文件名箭头-频谱
      --------- 频谱完整视图, 右击 - Zoom to fit
    - DB 波谱: 右击 左侧刻度 -> db
    - 3.听歌
    - 4. misc_dtmf / http://dialabc.com/sound/detect/index.html
    - 本地 dtmf 有时会有重复值 [DTMF](https://gitcode.net/mirrors/ribt/dtmf-decoder?utm_source=csdn_github_accelerator)
    - 效果-反向 听声音。
    - 删除多余文件头，可能有 2 段 riff
    - SilentEye
    - 1.参数调整 low,normal,high
    - 2.参数调整 去掉 Compressed data: low,normal,high
    - Deepsound , deepsound2john.py 可爆破
    - MP3Stego: decode.exe -X target.mp3
    - decode.exe -P password -X target.mp3
    - decode.exe -P pass -X target.mp3
    - decode.exe -P 主办单位 -X target.mp3
    - 摩斯码音频 自动解码：
    - 1.Audition 禁用 其他声道, 将目标声道提高
    - 2.右击声道，提取为单声道， 导出 mp3
    - 3. https://morsecode.world/international/decoder/audio-decoder-adaptive.html 上传解码 play
    - [SSTV](#音频隐写-sstv)
    - 1.频谱图比较平均 dididi 的声音 见 ### sstv
    - 2.长度 36 秒 Robot36
    - MIDI 隐写，见本章链接。
    - PT2242 信号： 用短的一段表示是 0，长的一段表示是 1 前面 4bit 表示同步码，中间的 20bit 表示地址码，后面的 4bit 表示功能码，最后一位是停止码。
    - 也就是 0。。。01110100101010100110。0010。0 -- flag 为中间 20bit
    - PT226X 见 `[HDCTF2019]信号分析` https://www.shawroot.cc/1047.html

LSB 隐写 用 uint8 读取 wav 然后提取每一个帧的 LSB

### 音频隐写 sstv

扫描 `sstv -d 'flag.wav' -o 1.png`

长度 36 秒 Robot36

https://www.cnblogs.com/LEOGG321/p/13731156.html
ctfshow 未知信号

方式 1.

1. 安装 [Virtual Audio Cable](https://vac.muzychenko.net/en/download.htm) 或 [Voicemeeter](https://download.vb-audio.com/Download_CABLE/VoicemeeterSetup.exe)
2. windows 声音 - 录制 - Line1 设置为默认
3. 安装 [mmsstv](https://hamsoft.ca/pages/mmsstv.php)
4. 用播放器播放音频文件
<!-- [rxsstv](https://www.qsl.net/on6mu/download/Setup_RXSSTV.exe) 设置如下: 3. in设置启动 Audio Repeater 将 wave out 设置 扬声器 2.将 rxsstv 切换到 Robot36 模式下播放音频 -->

方式 2. Linux 下用 sudo apt install qsstv
-- 1.Options->Configuration->Sound 勾选 From file, 2.点击播放按钮

方式 3.
安卓 Droidsstv

# Article

[数位板流量分析探索](https://www.cnblogs.com/zysgmzb/p/16667154.html)
[USB 接口流量分析与 CTF 解题技巧](https://mp.weixin.qq.com/s/4DmPlmuJ4rMKyByEvrkPxw)

## 压缩包/zip

[各类常见压缩包类型隐写术总结](https://mp.weixin.qq.com/s/VbFp_up_nAar6XTzjPmKZA)
[CTF 之 Misc-zip 压缩包分析](https://mp.weixin.qq.com/s/QfSzm_6bwbOjP97fu7pLZQ)

## eth

[区块链--合约题入门操作 区块链题型简介 水龙头的对比 remixIDE 的基本使用 1——NewStarCTF ](https://www.bilibili.com/video/BV1Xe4y1e7sQ/)

## Steganography/隐写

[各种类型的图片格式隐写术总结](https://mp.weixin.qq.com/s/9KZZDSpw1Xc_um0vNN4kpg)
[隐写术之音频隐写解题技巧](https://mp.weixin.qq.com/s/stVrGrsSUUAmwRNBxART-A)

## 图像相关

[傅里叶图像压缩](https://www.bilibili.com/video/BV1CY411R7bA?t=1329.5)

## Android

[实战攻击手机 PIN 和图案密码](https://byxs20.github.io/posts/38185.html)
