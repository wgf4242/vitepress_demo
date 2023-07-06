2022 第五空间鸿蒙
方式 1.
安装 jefferson # https://blog.csdn.net/u013071014/article/details/122426769
sudo apt-get install liblzo2-dev liblzma-dev
pip3 install git+https://github.com/sviehb/jefferson.git
binwalk -Me rootfs.img
方式 2.取证大师

# IOT

IOT 车联网问题。启动不了找问题 patch 掉。可能是没有某些设备
ida 定位字符串。都 patch
qemu-arm -L ./tbox_app.bin

## 题目

[openwrt | AntCTF x D³CTF 2023 d3op 复盘笔记](https://mp.weixin.qq.com/s/97TfeJgZeG-lLzWc95teBw)

## stm32

[按这个配置](https://www.bilibili.com/video/BV1LX4y157TP/)
[IOT 安全——stm32 从做题到复现](https://www.anquanke.com/post/id/229321)
[[原创]STM32 固件逆向 ](https://bbs.kanxue.com/thread-272811.htm)
[stm32 芯片程序有 xtea 加密算法](https://bbs.kanxue.com/thread-272872.htm)
[一个简单的 STM32 固件分析](https://mp.weixin.qq.com/s/2XeF67Rz8Tz5jPVevSHhpg)
afx hex bin 文件 stm32 练习

## ardruino hex

https://stackoverflow.com/questions/17919704/arduino-disassemble-sketch-from-flash

[基于纯软件环境的 AVR 逆向分析](https://www.anquanke.com/post/id/202256)
[PolishDuck HCTF 2018](https://www.secpulse.com/archives/82690.html#PolishDuck)
[虎符 2020 密码机器(Misc)](https://0xffff.one/d/584/6)
Tool https://www.avrfreaks.net/projects/reavr?skey=ReAVR

```sh
avr-objdump -j .sec1 -d -m avr5 light.ino.hex
avr-objdump -Dx -m avr5 light.ino.hex
# 转bin, 用010也行自动的
avr-objcopy -I ihex -O binary light.ino.hex c9.bin
```

# Articles

- [安全竞赛中的 IoT 类题目环境部署方法研究](https://mp.weixin.qq.com/s/DRYEbNNUvXh4ECWgehmzbQ)
- [山石安研院 2022 年度安全研究精华汇](https://mp.weixin.qq.com/s/ubqxSpW3XxM4bcSj9_EHXA)
- [虚拟化安全｜从一道 CTF 题目学习 KVM](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247494743&idx=1&sn=2f3bede3835ac1874f4fc556df1603f4)
- [车联网安全入门之从 CAN 模拟环境搭建到重放攻击](https://mp.weixin.qq.com/s/LzrqCOq6BjPC6s3SjNvXcw)
- [物联网固件逆向工程基础](https://xz.aliyun.com/t/12320)
- [西湖论剑 IoT 复现（一）](https://mp.weixin.qq.com/s/xfkm4zwZ9e8OtQq--MH8fA)
- [2022 西湖论剑 IoT-AWD 赛题官方 WriteUp （上篇）：一号固件&二号固件](https://mp.weixin.qq.com/s/tRmWsRfF2yRszwSeXws5xg)
- [2022 西湖论剑 IoT-AWD 赛题官方 WriteUp （下篇）：三号固件](https://mp.weixin.qq.com/s/_1uLWXSPEiCFST6dsi0YBA)
- [解密固件实践及 firmwalker 脚本利用](https://www.bilibili.com/video/BV1Fs4y1K76J/)
- [分析固件解密流程](https://www.bilibili.com/video/BV1YL411m7nx/)
- [qemu 模拟路由器环境 TP-Link sr20 远程命令执行漏洞](https://www.bilibili.com/video/BV1jM411L7e6/)
- [例会分享之 iot 从提桶到跑路（1）](https://www.bilibili.com/video/BV1ok4y157Hw/)
- [记一次全设备通杀未授权 RCE 的挖掘经历](https://mp.weixin.qq.com/s/62WZmT3fWQjerjeqqRiTdw)
- [yichen 的信安知识库 物联网安全](https://www.yuque.com/hxfqg9/iot)
- [手把手玩转路由器漏洞挖掘系列 - 基础入门](https://mp.weixin.qq.com/s/-yUPKhjTpYEbzlVNRBo9XQ)
- [模拟运行](./index#模拟运行)

## 渗透/SRC

- [嵌入式设备漏洞挖掘实战](https://mp.weixin.qq.com/s/AxkvdKdfBB_CPS0BadbcmA)
- [如何快速挖掘设备逻辑洞](https://mp.weixin.qq.com/s/jZd5BpAmwFZOZuNjc4-oqA)
- [如何进行物联网渗透测试？](https://mp.weixin.qq.com/s/-p9-9ia_4aqXwL9ELW-BYg)
- [路由器漏洞挖掘系列之未授权访问漏洞及常见绕过技巧](https://mp.weixin.qq.com/s/dQ9GL2wIME35uxAes3LzEg)

## Coding

[随身 WiFi 硬改计划](https://mp.weixin.qq.com/s/sw4R-GOM8jwGdEvsLJL6pw)
