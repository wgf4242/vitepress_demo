# USB 协议/提取 usb 信息

设备的信息都在 GET DESCRIPTOR Response DEVICE, 看 IdProduct

过滤 usb.idProduct 看 IdProduct 值为设备名

- 键盘流量中 39 对应的是大写锁定
- 02 开头代表按键时同时按下了 shift
- usbhid.data 导出不了 用 usb.capdata

## 介绍

https://blog.csdn.net/qq_43625917/article/details/107723635
https://www.usb.org/sites/default/files/documents/hut1_12v2.pdf

Leftover Capture Data: 00 00 06 00 00 00 00

- 8 字节键盘 `00:00:06:00:00:00:00`

第三字节: 按键 去 pdf 或脚本找按键表

```
Leftover Capture Data: 00 00 06 00
```

- 4 字节鼠标 `00:00:02:00`

第一个字节：按键
0x00 未按键
0x01 左键
0x02 右键
第二个字节 可以看成是一个 signed byte 类型，其最高位为符号位，当这个值为正时，代表鼠标水平右移多少像素，为负时，代表水平左移多少像素。
第三个字节 上下移动的偏移。

## /dev/input/event

```bash
/dev/input/event1 # 键盘
/dev/input/event2 # 鼠标,  cat /dev/input/event2 动鼠标测试
cat /dev/input/event2 | xxd -p # 16进制
```

event2
每 24 字节一组, 前 16 字节为时间戳, 后 8 字节为键盘数据

```c
struct input_event { // https://www.kernel.org/doc/Documentation/input/input.txt
  struct timeval time; // 16字节
  __u16 type; // 2字节
  __u16 code; // 2字节
  __s32 value;
};
```

- [input.h](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/tree/include/uapi/linux/input.h)
- [event-code.h](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/tree/include/uapi/linux/input-event-codes.h)

```c
// input-event-codes.h, type=1表示按键, type=3表示移动
#define EV_SYN			0x00
#define EV_KEY			0x01
#define EV_REL			0x02
#define EV_ABS			0x03

0001 0110 0001 // 表示左键点击
0003 0000 2c2c // 0000 表示 x 的绝对坐标， 0001 表示y的绝对坐标, 当前x值为2c2c
```

## 实战

```bash
tshark -r flag.pcap -T fields -e usb.capdata > usbdata.txt
tshark -r flag.pcap -T fields -e usb.capdata|sed /^$/d > usbdata.txt

# 有多个时分别过滤提取
tshark -r "ez_usb.pcapng" -Y "usb.src==\"2.8.1\" && usb.dst==host" -T fields -e usbhid.data > keyboarda.txt
tshark -r "ez_usb.pcapng" -Y "usb.src==\"2.10.1\" && usb.dst==host" -T fields -e usbhid.data > keyboardb.txt

# 提取为json
tshark -r hard_web.pcap -Y "http.request.method == ""POST""" -T json -e urlencoded-form.key -e urlencoded-form.value -x > 12.json

# 过滤POST另存，但是会丢失前面数据无法解析
tshark -r hard_web.pcap -Y "http.request.method == ""POST""" -w bbb.pcapng
```

键盘数据包的数据长度为 8 个字节，击键信息集中在第 3 个字节以后

BYTE1

| Bit | Description   | Value              |
| --- | ------------- | ------------------ |
| 0   | Left Control  | 是否按下，按下为 1 |
| 1   | Left Shift    | 是否按下，按下为 1 |
| 2   | Left Alt      | 是否按下，按下为 1 |
| 3   | Left GUI      | 是否按下，按下为 1 |
| 4   | Right Control | 是否按下，按下为 1 |
| 5   | Right Shift   | 是否按下，按下为 1 |
| 6   | Right Alt     | 是否按下，按下为 1 |
| 7   | Right GUI     | 是否按下，按下为 1 |

BYTE2 – 暂不清楚，有的地方说是保留位
BYTE3–BYTE8 – 这六个为普通按键

键盘发送 `02 00 0e 00 00 00 00 00`

表示同时按下了 Left Shift + k，即大写 K。
https://www.usb.org/sites/default/files/documents/hut1_12v2.pdf 第 53 页
