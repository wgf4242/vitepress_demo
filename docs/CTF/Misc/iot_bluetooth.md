# 蓝牙设备攻防
```sh
# 查看蓝牙设备信息
hciconfig
# 开启 后显示为RUNNING
hciconfig hci1 up
service bluetooth start
# 扫描
hcitool scan
```

控制台
bluetoothctl

```sh
scan on
pair A8:9C:ED:96:1D:6D
connect <MAC>
quit

devices
remove A8:9C:ED:96:1D:6D
```

伪造蓝牙 spooftooph

```sh
spooftooph -a d1:a5:d1:69:35:2e -n dk_device_b3105 -i hci1

bluetoothctl
[bluetoothctl]$ show
```
