各种取证工具 https://github.com/ffffffff0x/1earn/blob/master/1earn/Security/BlueTeam/%E5%8F%96%E8%AF%81.md

## 取证题
取证大师链接：https://pan.baidu.com/s/1y04W_ocVYEXpiTL1JSGKgA#psgt 

1. Magnet AXIOM/FTK/DiskGenius 打开 vmdk
2. 看桌面 
   - 2.0 Filter: Desktop\
   - 2.1 Magnet AXIOM 收集信息
   - 3.Firefox key3.db 恢复密码
   - 3.Firefox浏览器记录 places.sqlite
   - 4.浏览历史
   - 4.进程信息
   - 5.dump内存 如dump下notepad进程的内存再foremost可能得压缩包
4. [profile找不到详下 ](#profile找不到)
5. 打印相关信息 Software\Microsoft\Print\Components, Windows\System32\spool\printers\ , SPL查看器

### windows
powershell 最后一条命令 或 运行powershell向上翻
appData\Roaming\Microsoft\Windows\PowerShell\PSReadline\ConsoleHost_history.txt

wsl相关
appdata/local/Packages/xxxxUbuntu/LocalState/rootfs/etc/mysql/debian.cnf

### linux
https://blog.csdn.net/NFMSR?type=blog
https://github.com/volatilityfoundation/volatility

history
搜 gdm-password 可能找到 用户密码

```sh
python vol.py -f ../1.mem --profile=LinuxUbuntu_5_4_0-84-generic_profilex64 linux_banner
python vol.py -f ../1.mem --profile=LinuxUbuntu_5_4_0-84-generic_profilex64 linux_bash >02_bash
python vol.py -f ../1.mem --profile=LinuxUbuntu_5_4_0-84-generic_profilex64 linux_enumerate_files >01files
grep -R '/Desktop' 01files >01_files_Desktop
python vol.py -f ../1.mem --profile=LinuxUbuntu_5_4_0-84-generic_profilex64 linux_find_file -F "/home/bob/Desktop/app.py"
python vol.py -f ../1.mem --profile=LinuxUbuntu_5_4_0-84-generic_profilex64 linux_find_file -i 0xffff97ce37a94568 -O secret.zip
volatility -f 1.mem --profile=LinuxUbuntu180484x64 linux_recover_filesystem -D filesystem # 导出全部缓存文件
```
### 数据库sql
mysql 记录
/data/mysql/db/xxx.log

```
删除 delete
修改 update
login_time
```
### 浏览器取证  Firefox
https://github.com/lclevy/firepwd
各种取证工具 https://github.com/ffffffff0x/1earn/blob/master/1earn/Security/BlueTeam/%E5%8F%96%E8%AF%81.md

恢复 Firefox\Profiles\xx.default-release 下的key4.db和logins.json
python firepwd.py -d ..\Profiles

```
places.sqlite  # 浏览记录
```
###  模拟器取证 .npbk

2.[雷电APP智能分析](https://www.forensix.cn/products/info.aspx?itemid=1127&lcid=5)

[2023西湖论剑-机你太美](https://mp.weixin.qq.com/s/vSI5nTZVcwm5qwh2iwomcg)

__夜神模拟器去除锁屏密码__
```sh
adb devices
adb shell
su
settings put secure lockscreen.disabled 1
rm /data/system/locksettings.db
rm /data/system/locksettings.db-shm
rm /data/system/locksettings.db-wal
reboot
# 重启之后就进去了。
```
### sqlmap 
.db  .db-wal 都导出，然后用工具打开
.db-wal 会定期写入到.db


# Article
[PC端微信个人信息与聊天记录取证](https://mp.weixin.qq.com/s/FPcIrouEAM_2RNZhfSRgoQ)
[Android | 半自动微信数据库脱密及解析，生成词云和条状图 ](https://www.52pojie.cn/thread-1724737-1-1.html) 

[浏览器数据导出解密工具 -- HackBrowserData](https://github.com/moonD4rk/HackBrowserData)
[安全运维 | RDP登录日志取证和清除](https://mp.weixin.qq.com/s/7504YsCEEfiM8uXQVCGRqA)