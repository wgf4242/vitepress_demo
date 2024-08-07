fkpt脱壳ROM 找一下

- 抓包apk SocksDroid.apk，使用之前关闭手机系统代理
- [函数搜索](http://androidxref.com/)
- [调试 | 安卓逆向基础知识之动态调试及安卓逆向常规手段](https://mp.weixin.qq.com/s/P86mtJFgJMUyfGD87ncn6g)
- [练习 | UnCrackable Mobile Apps](https://github.com/OWASP/owasp-mastg/tree/master/Crackmes)
- [OWASP 实战分析 level 3](https://mp.weixin.qq.com/s/_dAnLlSM9eon5_SR0_0imw)
- [Android loadLibrary 动态库加载过程分析](https://mp.weixin.qq.com/s/zj5isP6dGu-mTNpJN1W3BQ)
- [Android Studio 调试 Smali | 给大家分享一下这几年学习 Android 逆向遇到的环境问题吧，希望大家不要在这上面浪费时间](https://bbs.pediy.com/thread-275251.htm)
- [移动应用安全与风控——汇编基础](https://mp.weixin.qq.com/s/tU-Aeh-IoVf_sIofD7-4dA)
# APK

1.PKID 查壳、BlackDex 脱壳、jadx 打开(报用 gda) 2.看资源文件 看 dex
2.adb pull /storage/emulated/0/Android/data/top.niunaijun.blackdexa32/dump
2-2

```sh
# XYCTF2024 Trustme 官方WP
adb shell pm list packages -3
adb shell dumpsys window | findstr mCurrentFocus # 然后去 /data/data/xxxxxx/app_payload_dex 里面找 apk

frida-ps -Ua
# 脱壳
frida-dexdump -U -f com.swdd.trustme
frida-dexdump -p 27815 -U
```
## JADX
查看 string对应的值: 资源文件 - resources.arsc - res - values - strings.xml

## 资源

https://github.com/MiDuoKi/AndroidSafeStudy

- [移动安全分析平台 -- 南明离火](https://mp.weixin.qq.com/s/hp8NuaW0ioQX2bdIYvSHLg)

## APK 壳

https://blog.csdn.net/m0_64604636/article/details/121885541
https://blog.csdn.net/weixin_44032232/article/details/109676945
https://blog.51cto.com/yeshaochen/2496524

- blackdex

- dex-dump

```sh
frida-dexdump -U -f com.ivi.remote
# 或者打开app后，用下面的命令
frida-dexdump -FU -d -o .
```

# 执行流程

1.dex 脱壳 - blackdex
.so 文件

https://blog.csdn.net/AMDS123/article/details/86595903
Shift+F7 - Segments 看 .init_array , init_array 是我们程序代码可以控制的最早的时机了, 其次才加载 Jni_onload

- jadx/jeb 查看
- smali 中可能有匿名类, 注意查看是否有用

## ida native 函数处理

- a1 改类型为 JNIEnv \*
- a2 - jobject/jclass

```c
// a3 没用, a2可能是MainActivity
Java_com_ctf_cfe_MainActivity_validate(JNIEnv *a1, jobject a2, void *a3)
```

## Patch: 修改 smali 代码

1.修改 smali 代码 : 1.解包 2.修改 smali 3.打包 4.签名
2.frida hook 修改检测函数 见 Level1 https://github.com/OWASP/owasp-mastg/blob/master/Crackmes

## 动态注册对抗/NativeRegister

https://blog.csdn.net/qq_37431937/article/details/122477501

0.查看 JNI_Load, RegisterNatives

```
public native String doublecheck(String str);  // 1.so 文件里没有这个函数
```

2.Shift+F12 搜索字符串, 交叉定位到 RegisterNatives

```
__int64 __fastcall RegisterNatives(JNIEnv *a1) // 改为JNIEnv*,


.data.rel.ro:00000000000C2E78                               ; JNINativeMethod stru_C2E78 // 3. 修改为 JNINativeMethod
.data.rel.ro:00000000000C2E78 1E E1 03 00 00 00 00 00 EF D4+stru_C2E78 JNINativeMethod <aDoublecheck, aLjavaLangStrin_0, qq>
.data.rel.ro:00000000000C2E78 03 00 00 00 00 00 E4 C0 05 00+
```

![](https://s2.loli.net/2022/09/28/qImO3XignjZTytp.jpg)

## 调试 apk

by mprop

```sh
adb push mprop /data/local/tmp/
adb shell

chmod +x /data/local/tmp/mprop
su

/data/local/tmp/mprop
# verbose mode ==> dump memory
# /data/local/tmp/mprop -v > myprop.txt

# restore
# /data/local/tmp/mprop -r

setprop ro.debuggable 1
```

by magisk

```bash
# 手机需要安装magisk并获取root权限
adb shell #adb进入命令行模式
su #切换至超级用户
magisk resetprop ro.debuggable 1
stop;start; #一定要通过这种方式重启手机
```

## jeb 调试 apk

最佳：

1. jeb_wincon.bat -c --makeapkdebug -- EXAMPLE.apk
2. java -jar signapk.jar testkey.x509.pem testkey.pk8 input.apk output.apk
3. adb install output.apk
4. adb shell am start -D -n 包名/.Activity
   等于下面的方法：

```
先用apk killer打开apk, AndroidManifest.xml
1.修改application标签添加android:debuggable="true"
2.Android标签 - 编译
3.adb shell am start -D -n 包名/入口activity名
apk killer更新里面的apktool到最新
如果提示有错误。按错误删除对应内容去掉错误。
```

两种方式写包名。
adb shell am start -D -n com.ctf.cfc/com.ctf.cfc.MainActivity
adb shell am start -D -n com.ctf.cfc/.MainActivity

## jeb 调试操作

<!-- adb forward tcp:8700 jdwp:2288 -->

map 类型不显示变量值，是 jeb 的 bug，安卓 9/10 的调试协议有问题，只有 p 开头的虚拟寄存器才能被正确读取

Ctrl+B, smali 代码下断点

1.类型不正确，怎样修改？

> 直接 int 改 String, 其他改 object.

![](https://s2.loli.net/2022/09/07/hVu6cdH2oClzFBA.jpg)

## load so file

java 调用 把 so 放在 app\src\main\jniLibs, 见 re_android_java_load_so_apk.rar
原文链接：https://blog.csdn.net/lin_dianwei/article/details/54946393

## gdb 远程调试 so, dump 内存,rebase so file

https://web.archive.org/web/20210124162744/http://sh3llc0d3r.com/owasp-uncrackable-android-level2/

```sh
# 手机中
ps | grep uncrackable
# u0_a142 32231 611 1517556 46252 SyS_epol_ 7f7c2511b4 S sg.vantagepoint.uncrackable2

gdbserver :8888 –attach <PID>
# 主机转发端口
adb forward tcp:8888 tcp:8888
./gdb
(gdb) target remote :8888

cat /proc/<PID>/maps

# 7f77d59000-7f77d5a000 r-xp 00000000 fd:00 327124  /data/app/sg.vantagepoint.uncrackable2-1/lib/arm64/libfoo.so
# 7f77d5a000-7f77d6a000 ---p 00000000 00:00 0
# 7f77d6a000-7f77d6b000 r--p 00001000 fd:00 327124 /data/qpp/sg,vantagepoint.uncrackable2-1/Lib/arm64/Libfoo.so
# 7f77d6b000-7f77d6c000 rw-p 00002000 fd:00 327124 /data/app/sg,vantagepoint,uncrackable2-1/lib/arm64/Libfoo.so
# 7f77d6c000-7f77da4000 r--s 0009b000 fd:00 327089 /data/app/sg.vantagepoint.uncrackable2-1/base.apk /data/app/sg.vantagepoint.uncrackable2-1/base.apk
# 7f77da4000-7f77dae000 r--s 000d2000 fd:00 327089 /data/app/sg,vantagepoint,uncrackable2-1/oat/arm64base.odex
# 7f77dae000-7f77eb1000 r--p 00000000 fd:00 327127
# 7f77eb1000-7f77fd2000 r-xp 00103000 fd:00 327127 /data/app/sg,vantagepoint,uncrackable2-1/oat/arm64base.odex
# 7f77fd2000-7f77fd3000 rw-p 00224000 fd:00 327127 /data/app/sg,vantagepoint.uncrackable2-1/oat/arm64base.odex
# 7f77fd3000-7f77fd5000 rw-p 00000000 00:04 744381 /dev/ashmem/dalvik-indirect ref table (deleted)
# 7f77fd5000-7f77fd6000----0 00000000 00:00 00
# 目标函数在ida中看为 c88 .strcmp, 加上7f77d59000为 7f77d59c88

(gdb) b *0x7f77d59c88
(gdb) c
# 断下后看register
```

## ab 文件

abe.jar https://github.com/nelenkov/android-backup-extractor/releases

恢复

```bat
java -jar abe.jar unpack 1.ab 1.tar
```

## APKlab

https://github.com/APKLab/APKLab

## Adb Command

[Link](file:///D:/wgf/My%20Documents/GitHub/pyprojects/django_learning/android_01/adb.md)

# Article

- [Android 逆向环境搭建](https://mp.weixin.qq.com/s/3Zd4PBMxXpj21BuOu7tBiQ)
- [APP 渗透测试环境搭建](https://mp.weixin.qq.com/s/CnP79CUGxx-2utrywHckxA)
- [Done | 入门 | 移动应用安全与风控——应用分析](https://mp.weixin.qq.com/s/LFl6dRodhBk6djYJGN6qAQ)
- [通过 USB 或网络控制安卓设备：无需 root 权限 | 开源日报 No.231](https://mp.weixin.qq.com/s/SgvCbYdV6z20FfyXc7V_oQ)


## 课程

[Awesome-Android-Reverse-Engineering](https://github.com/user1342/Awesome-Android-Reverse-Engineering)

## 环境

[使用 ADB 链接夜神的方式与吐槽](https://mp.weixin.qq.com/s/kWrfK19bOYUy1tXQs_JRKg)

## 抓包

工具: httpcanary(旧版) reqable(新版)

- [网络抓包02 - Android抓包攻与防](https://mp.weixin.qq.com/s/JmGqI2VRjlMvEWYIgEYkXg)
- [抓包 | 算法助手 | 记一次渗透过程中某APP的逆向分析过程](https://mp.weixin.qq.com/s/gnebio8BGCV6TtemPgK-Xw)
- [Android 渗透测试 HTTPS 证书校验绕过](https://mp.weixin.qq.com/s/X6efaPMF0Zb3ENsEy-H3gQ)
- [安卓高版本安装系统证书 HTTPS 抓包 - 终极解决方案](https://blog.51cto.com/u_15527932/6107429)
- [淘系 | 【安卓逆向】解决淘系某猫等 App 抓包问题](https://mp.weixin.qq.com/s/BFFEGWDhjTdDlfWITSme8Q)
- [淘系 | 【安卓逆向】某鱼 hook 抓包姿势](https://mp.weixin.qq.com/s/dpyYdg1xip1Rb-_-M77HAw)
- [抓不到包？不可能（上篇）](https://mp.weixin.qq.com/s/XqoLx0zjonCz_JcE13E1zA)
- [史上最强安卓抓包/逆向/HOOK & 云手机/自动化辅助框架](https://mp.weixin.qq.com/s/533On0ejZXF42GT1KrpfmQ)
- [【小记】Frida 绕过闲鱼 Spdy 协议进行抓包](https://mp.weixin.qq.com/s/FEIoSB2gWBb9NAAE7i0bXA)
- [r0capture！安卓应用层抓包通杀脚本](https://mp.weixin.qq.com/s/lCtr6ZZZaiHNodZxxnrLMQ)
- [当你写爬虫抓不到APP请求包的时候该怎么办？【中级篇】](https://mp.weixin.qq.com/s/ftp4Yv2Z4IMtsOkPli1qmQ)

## 综合

- [《安卓逆向这档事》一、模拟器环境搭建](https://www.52pojie.cn/thread-1695141-1-1.html)
- [《安卓逆向这档事》二、初识 APK 文件结构、双开、汉化、基础修改](https://www.52pojie.cn/thread-1695796-1-1.html)
- [《安卓逆向这档事》三、初识 smail，vip 终结者](https://www.52pojie.cn/thread-1701353-1-1.html)
- [《安卓逆向这档事》四、恭喜你获得广告&弹窗静默卡](https://www.52pojie.cn/thread-1706691-1-1.html)
- [《安卓逆向这档事》五、1000-7=？&动态调试&Log 插桩](https://mp.weixin.qq.com/s/aY_SZSFdWWZEG8ZL0BTtYw)
- [《安卓逆向这档事》六、校验的 N 次方-签名校验对抗、PM 理、IO 重定向](https://mp.weixin.qq.com/s/aY_SZSFdWWZEG8ZL0BTtYw)
- [《安卓逆向这档事》七、Sorry，会 Hook 真的可以为所欲为-Xposed 快速上手(上)模块](https://www.52pojie.cn/thread-1740944-1-1.html) [video](https://www.bilibili.com/video/BV1VT411C7Sr/)
- [《安卓逆向这档事》八、Sorry，会 Hook 真的可以为所欲为-xposed 快速上手(下)快速 hook](https://mp.weixin.qq.com/s/L1dpWfoFLCPKcLx_kriH-Q)
- [《安卓逆向这档事》九、密码学基础、算法自吐、非标准加密对抗](https://mp.weixin.qq.com/s/jIId9oEchhU4W7jplYcyJg)
- [《安卓逆向这档事》十、不是我说，有了 IDA 还要什么女朋友？](https://mp.weixin.qq.com/s/odbZ9F9u5nh9Bp2gK-YbxA) [video](https://www.bilibili.com/video/BV1ho4y1F7Vz/)
- [《安卓逆向这档事》十二、大佬帮我分析一下](https://www.bilibili.com/video/BV1u8411S7xZ/)
- [《安卓逆向这档事》十三、是时候学习一下 Frida 一把梭了(上)](https://mp.weixin.qq.com/s/T0K5RmTsDZ0RIc8Y-S325Q)
- [《安卓逆向这档事》十四、是时候学习一下 Frida 一把梭了(中)](https://mp.weixin.qq.com/s/HZfiX6VI3G6X6If_4IfFRg)
- [《安卓逆向这档事》十五、是时候学习一下 Frida 一把梭了(下)](https://mp.weixin.qq.com/s/97o3fX9AN_kl2GCLhHAfig)
- [《安卓逆向这档事》十六、是时候学习一下 Frida 一把梭了(终)](https://mp.weixin.qq.com/s/BqqDsxB4u7QyTmBozZjMnw)
- [《安卓逆向这档事》十七、你的 RPCvs 佬的 RPC](https://mp.weixin.qq.com/s/5TI4sPbrfdEyIGKqkbWGcQ) [Video](https://www.bilibili.com/video/BV1gA4m1G7vV/)
- [《安卓逆向这档事》十八、表哥，你也不想你的Frida被检测吧!(上)](https://www.52pojie.cn/thread-1921073-1-1.html) [video](https://www.bilibili.com/video/BV1tC411j7yL/)
- [《安卓逆向这档事》十九、表哥，你也不想你的Frida被检测吧!(下)](https://mp.weixin.qq.com/s/14TpGimgPQ4NJOXaTda7jQ)
- [《安卓逆向这档事》二十课、抓包学得好，牢饭吃得饱(上)](https://mp.weixin.qq.com/s/w4qiV_vuQqf8P2RwctsviA)

- [番外篇之安卓 CRC 检测（上）](https://www.bilibili.com/video/BV1Le411Y7Rx/)
- [番外篇之安卓 CRC 检测（下）](https://www.bilibili.com/video/BV1jN4y1H7FP/)

- [移动应用安全与风控——应用的签名](https://mp.weixin.qq.com/s/Y-UoTIkX0Rid8tBImNsU-g)
- [Android 逆向技术高阶大法](https://mp.weixin.qq.com/s/zMXOpxW6E5klbsjKVHZudg)

--- Hook番外篇
- [2023安卓Hook框架源码入门（番外篇之dlopen限制与反射限制）](https://www.bilibili.com/video/BV1NM411Y7V1/?spm_id_from=333.788&vd_source=7631821c3a79f04a4fb0ef78db2c0814)
- [2023安卓Hook框架源码入门（番外篇 so格式之一windows编译so的三种方式）](https://www.bilibili.com/video/BV18T411Q7LU/?spm_id_from=333.788&vd_source=7631821c3a79f04a4fb0ef78db2c0814)
- [番外篇之frida检测-利用java层调用栈检测frida（上）](https://www.bilibili.com/video/BV1uM4m1U78J/)

---

八、参考文档

- [吾爱破解安卓逆向入门教程（三）---深入 Smali 文件](https://www.52pojie.cn/thread-396966-1-1.html)
- [吾爱破解安卓逆向入门教程（四）---Smali 函数分析](https://www.52pojie.cn/thread-397858-1-1.html)
- [【原木文章】Android 改造者之路-02.初探 smali 功法](https://www.52pojie.cn/thread-1485681-1-1.html)

---

- [入门 | Android 逆向之 smali 语法宝典](https://www.jianshu.com/p/ba9b374346dd)
- [Android 逆向遇到的环境问题](https://bbs.pediy.com/thread-275251.htm)

---

- [Android 渗透 07：安卓 CTF 系列-案例 1](https://mp.weixin.qq.com/s/oY_W5Nt3SrY9OGuK1KGb_g)
- [Android 渗透 07：安卓 CTF 系列-案例 2](https://mp.weixin.qq.com/s/RdvphrCCEVjPbUqmgcPMaQ)
- [Android 渗透 07：安卓 CTF 系列-案例 3](https://mp.weixin.qq.com/s/DxYlML5gx8BpJt07P8EMww)
- [Android 渗透 07：安卓 CTF 系列-案例 4](https://mp.weixin.qq.com/s/JxcJX4H73Xqur5br45ad4g)
- [Android 渗透 11：AS 与 Jeb 动态调试 Apk](https://mp.weixin.qq.com/s/SOPjvPkuCB2zFZiJ5L7tew)
- [Android 渗透 12：安卓逆向-IDA 动态调试 so](https://mp.weixin.qq.com/s/eJVicCY7Y4VEAg8U2dS4hg)
- [【安卓】IDA 调试 so 与 JNI_OnLoad](http://www.qfrost.com/posts/android/%E5%AE%89%E5%8D%93ida%E8%B0%83%E8%AF%95so%E4%B8%8Ejni_load/)
- [【APP 逆向百例】Frida 初体验，root 检测与加密字符串定位](https://mp.weixin.qq.com/s/WfvTA9MJh-NS86LYDVTBzg)
- [[分享]之前大家私信我 frida 的一些问题，这篇文章以一些例子给大家讲一讲吧 ](https://bbs.pediy.com/thread-275104.htm)
- [对某 app 的加密定位与 hook](https://mp.weixin.qq.com/s/7Wh5U8eyfL0GEWzqZx6uqA)

---

- [吾爱破解安卓逆向入门教程--导航帖（2018-06）](https://www.52pojie.cn/thread-408645-1-1.html)
- [【Android 逆向】ART 函数抽取加壳 ② ( 禁用 dex2oat 简介 | TurboDex 中禁用 dex2oat 参考示例 )](https://blog.csdn.net/han1202012/article/details/127416953)
- [JNI 函数的 Hook 与快速定位](https://2298233831.github.io/2022/10/24/JNI%E5%87%BD%E6%95%B0%E7%9A%84Hook%E4%B8%8E%E5%BF%AB%E9%80%9F%E5%AE%9A%E4%BD%8D/)
- [Android 动态加载 so ！这一篇就够了！](https://mp.weixin.qq.com/s/oLg63d0DElahfERU3B_5nw)

---

- [移动安全（二）|APK 打包流程及签名安全机制初探](http://mp.weixin.qq.com/s?__biz=MzIwMDcyNzM0Mw==&mid=2247484330&idx=3&sn=ff6d5033c834535234aa9fb781c247d2)
- [移动安全（三）|一道 CTF 题的 apk 逆向实战](http://mp.weixin.qq.com/s?__biz=MzIwMDcyNzM0Mw==&mid=2247484348&idx=3&sn=284c3ea1d7149a56a8a2a51b778b0d73)
- [移动安全（四）|NDK 开发教程\_JavaToC](http://mp.weixin.qq.com/s?__biz=MzIwMDcyNzM0Mw==&mid=2247484350&idx=2&sn=62ca448940c604feb3ca04d7810cd35b)
- [移动安全（五）|NDK 开发教程\_普通和静态字段调用](http://mp.weixin.qq.com/s?__biz=MzIwMDcyNzM0Mw==&mid=2247484377&idx=3&sn=05491cc08171f41444a5593cd5f83e8f)
- [移动安全（七）|实战获取某 APP 登陆算法](http://mp.weixin.qq.com/s?__biz=MzIwMDcyNzM0Mw==&mid=2247484393&idx=2&sn=d88be8fbadc529d0ca8eb98749f55918)
- [移动安全（八）|实战获取某合伙人 APP 登陆算法](http://mp.weixin.qq.com/s?__biz=MzIwMDcyNzM0Mw==&mid=2247484396&idx=2&sn=e059bc752b8803859c2671b8978dd225)
- [移动安全（九）|TengXun 加固动态脱壳（上篇）](http://mp.weixin.qq.com/s?__biz=MzIwMDcyNzM0Mw==&mid=2247484399&idx=2&sn=c6abc2fc1f945d5f4c60fa6a92bb9106)
- [移动安全（十）|TengXun 加固动态脱壳（下篇）](http://mp.weixin.qq.com/s?__biz=MzIwMDcyNzM0Mw==&mid=2247484470&idx=3&sn=40d185a659934c45851273d88353199a)
- [Android 逆向之脱壳实战篇](https://mp.weixin.qq.com/s/zmCVxorHy_juPnV_I-8Inw)
- [安卓逆向系列学习(八)--简单制作脱壳](https://mp.weixin.qq.com/s/8ylAQdPPmUMEBhUErQkNWg)
- [脱壳\_Xposed+反射大师(360 壳)](https://www.bilibili.com/video/BV17K411h7QC/)

---

- [脱壳成长之路之二代壳进阶：绕过反调试、函数体回填并修复 onCreate](https://mp.weixin.qq.com/s/8tawKAps_4Qu0Pf-PJRn0w)
- [快捷操作 | intent, top 移动端漏洞分析](https://mp.weixin.qq.com/s/rtQD14v-7tsA8feABffPNg)

---

- [2023 安卓 Hook 框架源码入门（零-首次介绍）](https://www.bilibili.com/video/BV1D84y1h7jj/)
- [2023 安卓 Hook 框架源码入门（一 YAHFA 框架）（4ArtMethod 执行流）](https://www.bilibili.com/video/BV1N84y177nF/)
- [2023 安卓 Hook 框架源码入门（一 YAHFA 框架）（3ArtMethod）](https://www.bilibili.com/video/BV17T411y7AE/)
- [2023 安卓 Hook 框架源码入门（一 YAHFA 框架）（2 使用）](https://www.bilibili.com/video/BV1Dx4y1M76f/)
- [2023 安卓 Hook 框架源码入门（一 YAHFA 框架）（1 概述）](https://www.bilibili.com/video/BV1TY4y1f7rw/)

---

- [Android 对 so 进行简单 hook](https://mp.weixin.qq.com/s/3b_isZSTBlerYyy5ViLhdA)
- [Android 系统内核漏洞利用技术入门](https://mp.weixin.qq.com/s/a8A0g7-S0FiMuRa3YOg89Q)
- [Android 逆向 设备指纹 Settings 类对抗终极方案](https://www.bilibili.com/video/BV1hP411s7Js/)
- [Qual+Android 方案 Unlock 学习 以 Oneplus7Pro 为例](https://mp.weixin.qq.com/s/XFAYXV90y52bYTHYWSFJcA)
### Android NDK

- [Android NDK 开发](https://gift1a.github.io/2022/09/06/Android-Learning/#Android-NDK%E5%BC%80%E5%8F%91)
- [移动安全之 NDK 开发学习一](https://mp.weixin.qq.com/s/AGy-lyTYs-gt2wGk-ZNFVg)
- [Android逆向学习69——Android NDK with Rust ASM（By LittleQ）](https://mp.weixin.qq.com/s/sM2kZnpdrPAvdhAp6Q1pFw)

### 脱壳
[APP逆向系列(五)--制作fart脱壳机](https://mp.weixin.qq.com/s/gKCi_OdhynEYpTF70Xvz2w)
[Flutter逆向-有360壳案例二 （blutter使用 ）](https://www.bilibili.com/video/BV14S411w7HL/)
[【某企业版加固 Frida秒退 用Dobby Hook 定位算法-哔哩哔哩】](https://www.bilibili.com/video/BV1vf421q7XS/)


### bypass/反调试

[『杂项』root 绕过的几种方式](https://mp.weixin.qq.com/s/7RZRXjP3zXRX8gvZSkDxqg)
[bpf在android逆向中的辅助效果](https://mp.weixin.qq.com/s/Gdv6_ihpdgctgSUO5DHJ4w)

### 抓包

[安卓应用层抓包突破](https://mp.weixin.qq.com/s/gSTrnJO8e6rXwLOYr3eN2Q)
[更高更妙的抓包——从 Chrome 源码学习使用 Cronet 通讯组件的 app 的通用抓包方法](https://mp.weixin.qq.com/s/x2d3Q6aLipzIkHpK-R_Wyw)
[汇总抓包姿势](https://mp.weixin.qq.com/s/ciaNwGhVUDdzO-7w1TQueg)

### 实战案例

- [某游戏社区 App | So 层逆向分析](https://mp.weixin.qq.com/s/GOUoBboBzZSxWFWWDKGahw)
- [买车报价 APP sign 分析](https://mp.weixin.qq.com/s/lmUOwnLAH2lbvWB4uIN6pg)
- [某汽车社区 App 签名和加解密分析 (二) : Frida Dump so](https://blog.51cto.com/u_15527932/5205322)
- [典工宝/链工宝协议逆向-视频快进](https://www.52pojie.cn/thread-1715717-1-1.html)
- [奥维地图浏览器-vip 分析](https://mp.weixin.qq.com/s/fgHpsHFGohYpPLUlb76cCA)
- [某视频 VIP 播放 一个懒人的破解方式](https://www.52pojie.cn/thread-1747613-1-1.html)
- [APP 聊天协议逆向](https://mp.weixin.qq.com/s/EBXnEfeb3IgcfPTqlb3Etw)
- [APP 去广告技术分析](https://mp.weixin.qq.com/s/OxH3uoPecBYL_cZTTOpQBA)
- [App 逆向百例|16|某交友 App 花指令分析](https://mp.weixin.qq.com/s/PyKtsRV0WJaqm8APpJNOMw)
- [APP 反取证分析实战记录分享](https://mp.weixin.qq.com/s/SBY_CNcZIDugnFO6S6Yepg)
- [Android 逆向 | 某麦网 APP 抢票接口加密参数分析及抢票工具编写](https://mp.weixin.qq.com/s/fAGcyE13TTmkutuclKasmA)
- [某手医疗 app 的 sign](https://mp.weixin.qq.com/s/yC2KQpXHA_SuuAv4J2WzAQ)
- [app 逆向--美图秀秀 sig 参数](https://mp.weixin.qq.com/s/HWMqHIZ8tBSnRPiTy4ymXA)
- [安卓脱壳修复（腾讯御 xx）](https://mp.weixin.qq.com/s/_Q1vrztni5ODwSyaJ_Kz_Q)
- [实战 | 记一次渗透中遇见的 apk 逆向 sign 解码分析](https://mp.weixin.qq.com/s/LQJfpy-bQB6lFi51O_OwPA)
- [协议分析 | 对一个 apk 协议的继续分析—libsgmain 反混淆与逆向](https://mp.weixin.qq.com/s/s06dvT056fqkENIYoEHZ3w)
- [协议分析 | 【app 渗透】破解 apk app 协议 测试接口等安全](https://mp.weixin.qq.com/s/jAzwLDjrIWhGSSYcA1PyYw)
- [协议分析 | APP 协议分析心得](https://mp.weixin.qq.com/s/5XAbGzR1se9pLmx_d8-KNQ)
- [不寻常的手游反调试——反 hook 分析与绕过](https://mp.weixin.qq.com/s/zEJVBSV-BjrWr1Dl_pORXg)
- [App 接口参数还原调用](https://mp.weixin.qq.com/s/jnRHO9mUuwheW27B7iES-w)
- [APP 的登录协议分析](https://mp.weixin.qq.com/s/Z4hI_8FO_77dHLcjKMeXFw)
- [逆向工程技术在移动应用渗透测试的应用](https://mp.weixin.qq.com/s/AyvnUoDKtewiIvExk5Ih0w)
- [APP sign签名参数分析](https://mp.weixin.qq.com/s/grYRp34tUWytkRfhsm0eOQ)
- [App渗透 -人脸识别登录绕过](https://mp.weixin.qq.com/s/ELY7rS1yojMw2lO3Z8BGRg)
- https://space.bilibili.com/362235493

## 混淆加密

- [开箱即用的 SO 代码混淆器来啦！r0env2022 里的 as 集成 ollvm 混淆](https://www.bilibili.com/video/BV1z8411G79H/)
- [Dex 控制流混淆-AS 插件版](https://www.bilibili.com/video/BV1MG4y1574m/)

检测混淆类型 去混淆 gda deobfuscator threadtear, bytecodeviewer cfr

## 底层研究

- [loadLibrary 动态库加载过程分析](https://mp.weixin.qq.com/s/L4LmF1M4gN21r8uYL0BDJg)
- [Android 使用 ASM 修改函数](https://mp.weixin.qq.com/s/883DG-SRoJgy58je2R1Ibg)

## 普通文章

[『杂项』APP 权限调用查看方法](https://mp.weixin.qq.com/s/qB9_UuRrmrP18ARNX44lvA)
[安卓 app 四大组件的攻击面分析](https://mp.weixin.qq.com/s/MQ7gNnIkzGBkaJLtAsSORQ)
[strong-frida 过常见壳的 Frida 检测](https://www.bilibili.com/video/BV1gp4y1N7Cx/)
[frida | 对 APP 的检测以及参数计算分析](https://mp.weixin.qq.com/s/x59ZoVGclcjdElxb8Y0R7w)
[patch 某哩 frida 检测](https://mp.weixin.qq.com/s/cm5kHfE-z2HaBOc-mZUnsw)
[安卓RPC开发踩坑记录](https://mp.weixin.qq.com/s/yLRBIg7mx_FWksw-MgtQJw)

## eBPF

[eBPF 公开课-安卓 eBPF 开发环境搭建方案](https://mp.weixin.qq.com/s/cQvv7WhCPGNuRhF7DiX_-g)
[eBPF 秀肌肉过百分之 99.99 的 Frida 检测](https://www.bilibili.com/video/BV1v14y1C7Us/)

## 安卓/木马

[简单的安卓木马制作（实现外网控制）](https://mp.weixin.qq.com/s/7vbzKsxbOXLz99t0O7NLfw)
[《Cypher Rat 控制+安卓木马加固与免杀+渗透手机程序化》](https://www.bilibili.com/video/BV18p4y137mZ/)

## Game/游戏修改

[安卓真机无 root 环境下的单机游戏修改-IL2CPP](https://mp.weixin.qq.com/s/43V_rxkvyCjHkJuXbtAfqw)

## 关注列表/Video/视频

[和沐阳学逆向](https://space.bilibili.com/439348342)

# Tools

[hook xweb/webview](https://github.com/WankkoRee/WebViewPP)
