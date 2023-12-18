各种取证工具 https://github.com/ffffffff0x/1earn/blob/master/1earn/Security/BlueTeam/%E5%8F%96%E8%AF%81.md
[CTF 成长之路丨 Windows 取证常用工具介绍](https://mp.weixin.qq.com/s/e1HzaeoKQLplGbmKN6cWYA)
[Linux C/C++ 从内存转储中恢复64位ELF可执行文件](https://mp.weixin.qq.com/s/0mxxy-UkPSnCki_axwx-KA)

## 取证题

取证大师链接：https://pan.baidu.com/s/1y04W_ocVYEXpiTL1JSGKgA#psgt

1. 直接 010, strings flag
   1. 010手动提取 rar: `Rar!\x1a\x07\x01\x00.{1,100}<文件名>`
   1. 010手动提取2: 搜索压缩包的文件名来定位, 比如`flag2.txt`
2. 010 搜索 /home/.... 找 username
   2. /home/$USER/Desktop/......  搜关键文件, 比如找到叫 /home/$USER/Desktop/have_your_fun
   1. 下面用Text View来搜索, 不要用 hex 显示来搜
   3. `have_your_fun` 去掉路径搜到关键文件 一个一个看过去。有没有关键内容。
   4. `"have_your_fun` 带双引号搜
   4. `'have_your_fun` 带单引号搜
1. Magnet AXIOM/FTK/DiskGenius 打开 vmdk
1. vhd: NTFS日志-> NTFS Log Tracker
1. systeminfo - 安装时间
1. 看桌面
   - 2.0 Filter: Desktop\
   - 2.1 Magnet AXIOM 收集信息
   - 3.Firefox key3.db 恢复密码
   - 3.Firefox 浏览器记录 places.sqlite
   - 4.浏览历史
   - 4.进程信息
   - 5.dump 内存 如 dump 下 notepad 进程的内存再 foremost 可能得压缩包
   - 6. dump 下 mspaint.exe 用gimp里调整查看图片
2. Passware Kit Forensic 查看开机密码
1. 浏览器历史取证
   - 带 paste 地址优先查看.
1. [profile 找不到详下 ](#profile-找不到)
1. 打印相关信息 Software\Microsoft\Print\Components, Windows\System32\spool\printers\ , SPL 查看器

| ext  | software |                        |
| ---- | -------- | ---------------------- |
| .img | winhex   | 查看每个块看有没有提示 |

### windows

powershell 最后一条命令 或 运行 powershell 向上翻
appData\Roaming\Microsoft\Windows\PowerShell\PSReadline\ConsoleHost_history.txt

wsl 相关
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

### 数据库 sql

mysql 记录
/data/mysql/db/xxx.log

```
删除 delete
修改 update
login_time
```

### 浏览器取证 Firefox

https://github.com/lclevy/firepwd
各种取证工具 https://github.com/ffffffff0x/1earn/blob/master/1earn/Security/BlueTeam/%E5%8F%96%E8%AF%81.md

恢复 Firefox\Profiles\xx.default-release 下的 key4.db 和 logins.json
python firepwd.py -d ..\Profiles

```
places.sqlite  # 浏览记录
```

### 模拟器取证 .npbk

2.[雷电 APP 智能分析](https://www.forensix.cn/products/info.aspx?itemid=1127&lcid=5)

[2023 西湖论剑-机你太美](https://mp.weixin.qq.com/s/vSI5nTZVcwm5qwh2iwomcg)

**夜神模拟器去除锁屏密码**

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

.db .db-wal 都导出，然后用工具打开
.db-wal 会定期写入到.db

### profile 找不到
[Link1](https://heisenberk.github.io/Profile-Memory-Dump/)

出题有时通过 LiME制作内存镜像文件, 

kali 中 autopsy 可以取证一部分

1. https://blog.bi0s.in/2021/08/20/Forensics/InCTFi21-TheBigScore/
2. 团队赛决赛 Xiaoming
3. [Linux 新版内核下内存取证分析附 CTF 题](http://tttang.com/archive/1762/) https://mp.weixin.qq.com/s/dbHGBzjcMoF8aPqIkCN_Fg
4. [『CTF』制作新内核版本的 Volatility Profile](https://mp.weixin.qq.com/s/RWZ_MzPakLT63yYsO8mZ2w)

```sh
uname -r # 查看当前内核
方式1.strings the_big_score.lime | grep 'Linux version'
找到version和kernel 为 Ubuntu 18.04，linux 内核版本为 5.4.0-42-generic
方式2 vol3
python3 vol.py -f 1.mem banners.Banners
python3 vol.py -f a.mem banners
```

2.下载对应镜像安装 自己制作 volatility 的 profile

[DownloadUrl](https://mirrors.ustc.edu.cn/ubuntu/pool/main/l/linux-hwe-5.4/)

```bash
sudo apt install -y linux-headers-5.4.0-84-generic linux-image-5.4.0-84-generic dwarfdump build-essential git zip
# 切换内核 https://blog.csdn.net/baidu_37503452/article/details/127606656  ,  GRUB_DEFAULT="第一级菜单>第二级菜单”
## 1.1 查看menu
cat /boot/grub/grub.cfg | grep menu | cut -c -80
## 1.2 修改 GRUB_DEFAULT, "一级>二级" 比如 "Advanced options for Ubuntu>Ubuntu, with Linux 5.4.0-42-generic"
vi /etc/default/grub
sudo update-grub

# 重启
uname -r # 检查

git clone https://github.com/volatilityfoundation/volatility
cd volatility/tools/linux
make
sudo zip $(lsb_release -i -s)_$(uname -r)_profile.zip module.dwarf /boot/System.map-$(uname -r)
```

多出的 zip 文件就是 profile，把它放在 volatility/volatility/plugins/overlays/linux/ 目录下即可
/usr/local/lib/python2.7/dist-packages/volatility-2.6.1-py2.7.egg/volatility/plugins/overlays/linux/
/usr/lib/python2.7/dist-packages/volatility/plugins/overlays/linux/

```sh
python vol.py --info | grep Linux  # 查看是否已经制作了目标系统的profile
python vol.py -f the_big_score.lime --profile=LinuxUbuntu1804x64 linux_bash
```

ubuntu 如何更换 kernel 启动, 下面文件修改
vi /boot/grub/grub.cfg

4.volatility.exe 添加自定义 profile 的使用

```
1.将profile文件放到 plugins\overlays\linux\Ubuntu_5.4.0-84-generic_profile.zip
2.volatility.exe --plugins=plugins --info
```

### profile vol3
[Windows Table](https://github.com/JPCERTCC/Windows-Symbol-Tables.git)
[Linux Table](https://github.com/leludo84/vol3-linux-profiles)
[Create symbol in windows](https://blogs.jpcert.or.jp/en/2021/09/volatility3_offline.html)


```sh
# wget https://dl.google.com/go/go1.14.4.linux-amd64.tar.gz
## 下载对应的dbgsyn, 可通过类似这种地址搜索 https://answers.launchpad.net/ubuntu/focal 搜 5.4.0-100-lowlatency-dbgsym
wget http://launchpadlibrarian.net/313821743/linux-image-4.4.0-72-lowlatency-dbgsym_4.4.0-72.93_amd64.ddeb
wget http://launchpadlibrarian.net/676611326/linux-image-unsigned-5.15.0-79-generic-dbgsym_5.15.0-79.86_amd64.ddeb
dpkg -i /volatility/linux-image-4.4.0-72-lowlatency-dbgsym_4.4.0-72.93_amd64.ddeb

git clone git@github.com:volatilityfoundation/dwarf2json
cd dwarf2json
go buid
./dwarf2json linux --elf /usr/lib/debug/boot/vmlinux-4.4.0-137-generic > output.json
# 生成的 output.json 名字要改成对应的内核安装包名做参考 linux-image-5.4.0-100-amd64-dbg_5.4.0-100.113_amd64.json.xz
# 名字 其实这样就可以了 linux-image-5.4.0-100-lowlatency-amd64.json.xz

python3 vol.py -vvv -f ../a.mem banner # 看到 symbols path 任选一个
cp linux-image-4.4.0-72-lowlatency-amd64.json <volatility3>/symbols/
volatility3 -f dump.raw linux.pstree.PsTree
```


### Firefox 取证

places.sqlite, 浏览历史 `moz_places`

# Article

[PC 端微信个人信息与聊天记录取证](https://mp.weixin.qq.com/s/FPcIrouEAM_2RNZhfSRgoQ)
[PC 微信 | 钓鱼场景下微信聊天记录回传](https://mp.weixin.qq.com/s/ROCTBw8hM8mDEuIq5Vyhsg)
[PC 微信 | 免登录读取别人的 WX 聊天记录](https://mp.weixin.qq.com/s/ub1eQespid6BeODGM7kh8w)
[PC 微信 | 攻防演练中解密微信聊天记录寻找密码的 Tips](https://mp.weixin.qq.com/s/kG7Wlp3XwOlQQqNPEXOmiQ)
[PC 微信 | 提取微信记录](https://github.com/LC044/WeChatMsg)
[Android | 半自动微信数据库脱密及解析，生成词云和条状图 ](https://www.52pojie.cn/thread-1724737-1-1.html)
[Android | 取证之微信 8.0.38 版本数据库解密分析](https://mp.weixin.qq.com/s/OAzhnQPd_sHT5J1oMrrKFw)
[【Android取证篇】Android设备USB调试打开方式(开发者模式)](https://mp.weixin.qq.com/s/9-AXZ35v_zRnTO70R4K5bg)

[浏览器数据导出解密工具 -- HackBrowserData](https://github.com/moonD4rk/HackBrowserData)
[安全运维 | RDP 登录日志取证和清除](https://mp.weixin.qq.com/s/7504YsCEEfiM8uXQVCGRqA)
[『CTF』常见的 Windows 硬盘取证](https://mp.weixin.qq.com/s/iIf44oW_dn5RRFSq5mMqlA)
