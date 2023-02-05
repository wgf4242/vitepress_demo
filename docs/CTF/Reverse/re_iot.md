
2022第五空间鸿蒙
方式1.
安装 jefferson # https://blog.csdn.net/u013071014/article/details/122426769
sudo apt-get install liblzo2-dev liblzma-dev
pip3 install git+https://github.com/sviehb/jefferson.git
binwalk -Me rootfs.img
方式2.取证大师

## stm32
[一个简单的STM32固件分析](https://mp.weixin.qq.com/s/2XeF67Rz8Tz5jPVevSHhpg)

## ardruino hex
https://stackoverflow.com/questions/17919704/arduino-disassemble-sketch-from-flash

[基于纯软件环境的AVR逆向分析](https://www.anquanke.com/post/id/202256)
[PolishDuck HCTF 2018]( https://www.secpulse.com/archives/82690.html#PolishDuck)
[虎符2020 密码机器(Misc)](https://0xffff.one/d/584/6)
Tool https://www.avrfreaks.net/projects/reavr?skey=ReAVR

```sh
avr-objdump -j .sec1 -d -m avr5 light.ino.hex 
avr-objdump -Dx -m avr5 light.ino.hex 
# 转bin, 用010也行自动的
avr-objcopy -I ihex -O binary light.ino.hex c9.bin
```

# Articles
[安全竞赛中的IoT类题目环境部署方法研究](https://mp.weixin.qq.com/s/DRYEbNNUvXh4ECWgehmzbQ)
[山石安研院2022年度安全研究精华汇](https://mp.weixin.qq.com/s/ubqxSpW3XxM4bcSj9_EHXA)
[虚拟化安全｜从一道CTF题目学习KVM](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247494743&idx=1&sn=2f3bede3835ac1874f4fc556df1603f4)
## SRC 
[嵌入式设备漏洞挖掘实战](https://mp.weixin.qq.com/s/AxkvdKdfBB_CPS0BadbcmA)

## Coding
[随身WiFi硬改计划](https://mp.weixin.qq.com/s/sw4R-GOM8jwGdEvsLJL6pw)
