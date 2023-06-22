各种取证工具 https://github.com/ffffffff0x/1earn/blob/master/1earn/Security/BlueTeam/%E5%8F%96%E8%AF%81.md

## 取证题
取证大师链接：https://pan.baidu.com/s/1y04W_ocVYEXpiTL1JSGKgA#psgt 

1. 直接010, strings
1. Magnet AXIOM/FTK/DiskGenius 打开 vmdk
1. systeminfo - 安装时间
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


### profile找不到

kali 中 autopsy 可以取证一部分

1. https://blog.bi0s.in/2021/08/20/Forensics/InCTFi21-TheBigScore/
2. 团队赛决赛 Xiaoming
3. [Linux新版内核下内存取证分析附CTF题](http://tttang.com/archive/1762/) https://mp.weixin.qq.com/s/dbHGBzjcMoF8aPqIkCN_Fg
4. [『CTF』制作新内核版本的 Volatility Profile](https://mp.weixin.qq.com/s/RWZ_MzPakLT63yYsO8mZ2w)

```sh
uname -r # 查看当前内核
方式1.strings the_big_score.lime | grep 'Linux version'
找到version和kernel 为 Ubuntu 18.04，linux 内核版本为 5.4.0-42-generic
方式2 vol3
python3 vol.py -f 1.mem banners.Banners
```

2.下载对应镜像安装 自己制作 volatility 的 profile

```bash
sudo apt install -y linux-headers-5.4.0-84-generic linux-image-5.4.0-84-generic dwarfdump build-essential git zip

git clone https://github.com/volatilityfoundation/volatility
cd volatility/tools/linux
make
sudo zip $(lsb_release -i -s)_$(uname -r)_profile.zip module.dwarf /boot/System.map-$(uname -r)
```

多出的 zip 文件就是 profile，把它放在 volatility/volatility/plugins/overlays/linux/ 目录下即可
/usr/lib/python2.7/dist-packages/volatility/plugins/overlays/linux/
/usr/local/lib/python2.7/dist-packages/volatility-2.6.1-py2.7.egg/volatility/plugins/overlays/linux/

```sh
python vol.py --info | grep Linux  # 查看是否已经制作了目标系统的profile
python vol.py -f the_big_score.lime --profile=LinuxUbuntu1804x64 linux_bash
```

ubuntu如何更换 kernel启动, 下面文件修改
vi /boot/grub/grub.cfg

4.volatility.exe 添加自定义profile的使用

```
1.将profile文件放到 plugins\overlays\linux\Ubuntu_5.4.0-84-generic_profile.zip
2.volatility.exe --plugins=plugins --info
```

# Article
[PC端微信个人信息与聊天记录取证](https://mp.weixin.qq.com/s/FPcIrouEAM_2RNZhfSRgoQ)
[PC微信 | 钓鱼场景下微信聊天记录回传](https://mp.weixin.qq.com/s/ROCTBw8hM8mDEuIq5Vyhsg)
[PC微信 | 免登录读取别人的WX聊天记录](https://mp.weixin.qq.com/s/ub1eQespid6BeODGM7kh8w)
[Android | 半自动微信数据库脱密及解析，生成词云和条状图 ](https://www.52pojie.cn/thread-1724737-1-1.html) 

[浏览器数据导出解密工具 -- HackBrowserData](https://github.com/moonD4rk/HackBrowserData)
[安全运维 | RDP登录日志取证和清除](https://mp.weixin.qq.com/s/7504YsCEEfiM8uXQVCGRqA)
