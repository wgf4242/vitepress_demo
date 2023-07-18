- [函数搜索](http://androidxref.com/)
- [练习 | UnCrackable Mobile Apps](https://github.com/OWASP/owasp-mastg/tree/master/Crackmes)
- [Android NDK 开发](https://gift1a.github.io/2022/09/06/Android-Learning/#Android-NDK%E5%BC%80%E5%8F%91)
- [Android loadLibrary 动态库加载过程分析](https://mp.weixin.qq.com/s/zj5isP6dGu-mTNpJN1W3BQ)
- [Android Studio 调试 Smali | 给大家分享一下这几年学习 Android 逆向遇到的环境问题吧，希望大家不要在这上面浪费时间](https://bbs.pediy.com/thread-275251.htm)

# APK

1.PKID 查壳、BlackDex 脱壳、jadx 打开(报用 gda) 2.看资源文件 看 dex
2.adb pull /storage/emulated/0/Android/data/top.niunaijun.blackdexa32/dump
2-2

```
frida-ps -Ua
frida-dexdump -p 27815 -U
```

## 资源

https://github.com/MiDuoKi/AndroidSafeStudy

- [移动安全分析平台 -- 南明离火](https://mp.weixin.qq.com/s/hp8NuaW0ioQX2bdIYvSHLg)

## APK 壳

https://blog.csdn.net/m0_64604636/article/details/121885541
https://blog.csdn.net/weixin_44032232/article/details/109676945
https://blog.51cto.com/yeshaochen/2496524

# 执行流程

1.dex 脱壳 - blackdex
.so 文件

https://blog.csdn.net/AMDS123/article/details/86595903
Shift+F7 - Segments 看 .init_array , init_array 是我们程序代码可以控制的最早的时机了, 其次才加载 Jni_onload

- jadx/jeb 查看
- smali 中可能有匿名类, 注意查看是否有用

## ida native 函数处理

a1 改类型为 JNIEnv \*
a2 - jobject/jclass

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

# Article

- [Android 逆向环境搭建](https://mp.weixin.qq.com/s/3Zd4PBMxXpj21BuOu7tBiQ)

## 课程

[Awesome-Android-Reverse-Engineering](https://github.com/user1342/Awesome-Android-Reverse-Engineering)

## 抓包

- [安全攻防 | APP 抓包大全](https://mp.weixin.qq.com/s/SoyZBDoPCX2crBmgM6uKfg)
- [Android 渗透测试 HTTPS 证书校验绕过](https://mp.weixin.qq.com/s/X6efaPMF0Zb3ENsEy-H3gQ)
[安卓高版本安装系统证书 HTTPS 抓包 - 终极解决方案](https://blog.51cto.com/u_15527932/6107429)

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
- [移动应用安全与风控——应用的签名](https://mp.weixin.qq.com/s/Y-UoTIkX0Rid8tBImNsU-g)

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
- [【APP 逆向百例】Frida 初体验，root 检测与加密字符串定位](https://mp.weixin.qq.com/s/WfvTA9MJh-NS86LYDVTBzg)
- [[分享]之前大家私信我 frida 的一些问题，这篇文章以一些例子给大家讲一讲吧 ](https://bbs.pediy.com/thread-275104.htm)
- [对某app的加密定位与hook](https://mp.weixin.qq.com/s/7Wh5U8eyfL0GEWzqZx6uqA)

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

---

- [脱壳成长之路之二代壳进阶：绕过反调试、函数体回填并修复 onCreate](https://mp.weixin.qq.com/s/8tawKAps_4Qu0Pf-PJRn0w)
- [快捷操作 | intent, top 移动端漏洞分析](https://mp.weixin.qq.com/s/rtQD14v-7tsA8feABffPNg)

---

- [2023 安卓 Hook 框架源码入门（零-首次介绍）](https://www.bilibili.com/video/BV1D84y1h7jj/)
- [2023 安卓 Hook 框架源码入门（一 YAHFA 框架）（4ArtMethod 执行流）](https://www.bilibili.com/video/BV1N84y177nF/)
- [2023 安卓 Hook 框架源码入门（一 YAHFA 框架）（3ArtMethod）](https://www.bilibili.com/video/BV17T411y7AE/)
- [2023 安卓 Hook 框架源码入门（一 YAHFA 框架）（2 使用）](https://www.bilibili.com/video/BV1Dx4y1M76f/)
- [2023 安卓 Hook 框架源码入门（一 YAHFA 框架）（1 概述）](https://www.bilibili.com/video/BV1TY4y1f7rw/)

### bypass

[『杂项』root 绕过的几种方式](https://mp.weixin.qq.com/s/7RZRXjP3zXRX8gvZSkDxqg)

### 抓包

[安卓应用层抓包突破](https://mp.weixin.qq.com/s/gSTrnJO8e6rXwLOYr3eN2Q)

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
- [协议分析 | 对一个apk协议的继续分析—libsgmain反混淆与逆向](https://mp.weixin.qq.com/s/s06dvT056fqkENIYoEHZ3w)
- [协议分析 | 【app渗透】破解apk app协议 测试接口等安全](https://mp.weixin.qq.com/s/jAzwLDjrIWhGSSYcA1PyYw)
- [协议分析 | APP协议分析心得](https://mp.weixin.qq.com/s/5XAbGzR1se9pLmx_d8-KNQ)

## 混淆加密

- [开箱即用的 SO 代码混淆器来啦！r0env2022 里的 as 集成 ollvm 混淆](https://www.bilibili.com/video/BV1z8411G79H/)
- [Dex 控制流混淆-AS 插件版](https://www.bilibili.com/video/BV1MG4y1574m/)

## 底层研究

- [loadLibrary 动态库加载过程分析](https://mp.weixin.qq.com/s/L4LmF1M4gN21r8uYL0BDJg)
- [Android 使用 ASM 修改函数](https://mp.weixin.qq.com/s/883DG-SRoJgy58je2R1Ibg)

## 小程序

- [【微信&反汇编&x64dbg】小程序加密反汇编分析算法](https://www.bilibili.com/video/BV1iR4y127r6/)
- [【微信&反汇编&x64dbg】小程序加密反汇编分析算法 AES 密钥分析](https://www.bilibili.com/video/BV1Sd4y157q3/)
- [【微信&反汇编&x64dbg】小程序加密反汇编分析算法 XOR 解密](https://www.bilibili.com/video/BV1Lv4y1i7hJ/)
- [​微信小程序逆向分析](https://mp.weixin.qq.com/s/r9VVeXnT_PFX7C8mq7ej_w)
- [VX小程序逆向分析](https://mp.weixin.qq.com/s/7yZzf4V-2fcn-jRwm4uO-w)

## 普通文章

[安卓 app 四大组件的攻击面分析](https://mp.weixin.qq.com/s/MQ7gNnIkzGBkaJLtAsSORQ)
[eBPF 公开课-安卓 eBPF 开发环境搭建方案](https://mp.weixin.qq.com/s/cQvv7WhCPGNuRhF7DiX_-g)

## 安卓/木马

[简单的安卓木马制作（实现外网控制）](https://mp.weixin.qq.com/s/7vbzKsxbOXLz99t0O7NLfw)

## 关注列表

[和沐阳学逆向](https://space.bilibili.com/439348342)
