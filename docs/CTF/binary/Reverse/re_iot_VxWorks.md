vxhunter

[VxWorks环境搭建与学习 ](https://www.cnblogs.com/yokan/p/16482063.html) [Link](https://pan.baidu.com/s/1sUF2I_DBHs-86IUJ4Ykn2Q#t7sj)
[适用于QEMU(IA)的VxWorks 7 SDK](https://www.vxworks7.com/post/bsp/qemu-ia-vxworks-7-sdk.html)
[VxWorks技术资料免费下载](https://www.vxworks7.com/post/vxworks/free-vxworks-technical-resouce.html)

# 安装 VxWorks
```sh
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Class\{4d36e972-e325-11ce-bfc1-08002be10318}\
1. 找到 VMNet1, 比如 license 里 mac 地址为 000D619E6C32
reg add HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Control\Class\{4d36e972-e325-11ce-bfc1-08002be10318}\0005 /v NetworkAddress  /t reg_sz /d 000D619E6C32
netsh interface set interface "VMware Network Adapter VMnet1" disabled
netsh interface set interface "VMware Network Adapter VMnet1" enabled
2. 禁用 VMNet1, 再启用 VMNet1
```