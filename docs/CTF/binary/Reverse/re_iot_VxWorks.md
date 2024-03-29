vxhunter

PowerPC 架构

# 安装 VxWorks

```sh
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Class\{4d36e972-e325-11ce-bfc1-08002be10318}\
1. 找到 VMNet1, 比如 license 里 mac 地址为 000D619E6C32
reg add HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Class\{4d36e972-e325-11ce-bfc1-08002be10318}\0005 /v NetworkAddress  /t reg_sz /d 000D619E6C32
netsh interface set interface "VMware Network Adapter VMnet1" disabled
netsh interface set interface "VMware Network Adapter VMnet1" enabled
2. 禁用 VMNet1, 再启用 VMNet1
```

# Article
[与风河专家深入探讨系列视频](https://www.eefocus.com/course/1073684.html)
[VxWorks 环境搭建与学习 ](https://www.cnblogs.com/yokan/p/16482063.html) [Link](https://pan.baidu.com/s/1sUF2I_DBHs-86IUJ4Ykn2Q#t7sj)
[适用于 QEMU(IA)的 VxWorks 7 SDK](https://www.vxworks7.com/post/bsp/qemu-ia-vxworks-7-sdk.html)
[VxWorks 技术资料免费下载](https://www.vxworks7.com/post/vxworks/free-vxworks-technical-resouce.html)

# Video

[逆向工具 Ghidra 介绍及应用](https://live.freebuf.com/live/719e1138a016a5bffbfe0daeb4533b4f/s_710)
