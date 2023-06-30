# 2023安卓逆向CTF系列视频（一）
[doc](https://github.com/xyxdaily/lessons/blob/main/2023%E5%AE%89%E5%8D%93%E9%80%86%E5%90%91CTF%E7%B3%BB%E5%88%97%E8%A7%86%E9%A2%91/2023%E5%AE%89%E5%8D%93%E9%80%86%E5%90%91CTF%E7%B3%BB%E5%88%97%E8%A7%86%E9%A2%91%EF%BC%88%E4%B8%80%EF%BC%89/%E8%AE%B2%E4%B9%89/2023%E5%AE%89%E5%8D%93%E9%80%86%E5%90%91CTF%E7%B3%BB%E5%88%97%E8%A7%86%E9%A2%91%EF%BC%88%E4%B8%80%EF%BC%89.md)
[Video](https://www.bilibili.com/video/BV1nv4y1C7AP/?spm_id_from=333.999.0.0) 

* AndroidStudio C代码调用 JNI&NDK 见视频25:42

[讲义](https://github.com/xyxdaily/lessons)

[吾爱红包挑战【2021春节】解题领红包活动开始喽](https://www.52pojie.cn/thread-1369661-1-1.html) [题目下载](https://down.52pojie.cn/Challenge/Happy_New_Year_2021_Challenge.rar)

[CTF挑战网站](https://github.com/xtiankisutsa/)

[示例APK1](https://github.com/xyxdaily/lessons/raw/main/2023%E5%AE%89%E5%8D%93%E9%80%86%E5%90%91CTF%E7%B3%BB%E5%88%97%E8%A7%86%E9%A2%91/2023%E5%AE%89%E5%8D%93%E9%80%86%E5%90%91CTF%E7%B3%BB%E5%88%97%E8%A7%86%E9%A2%91%EF%BC%88%E4%B8%80%EF%BC%89/%E8%AE%B2%E4%B9%89/Crakeme01.apk)

[Android中JNI&NDK入门(三) 之 动态注册Native函数](https://blog.csdn.net/lyz_zyx/article/details/88690930)

[frida_hook_register_native](https://github.com/lasting-yang/frida_hook_libart)

[xrefs](http://androidxref.com/8.1.0_r33/xref/art/runtime/art_method.cc#393) Android11以前都是用 art_method.cc#393 ArtMethod::RegisterNative 注册的

## 查看包名
1. dumpsys activity top | grep TASK
2. adbshell_su$ am monitor
3. AndroidManifest.xml

```sh
frida -U -f com.wolf.ndktest -l hook_RegisterNativeMethod.js --no-pause -o out.log
frida -U -f com.wolf.ndktest -l hook_RegisterNativeMethod.js.-o out.log # android 16

var arg3_c = Java.vm.getEnv().getStringUtfChars(arg3);
console.log("arg3=" + hexdump(arg3_c));
console.log("arg3=" + arg3_c.readCString()); // 确定是字符串后可用这个读取
# 修改传入值 retval.replace(0x1)
```

Native 层如果调用了Toast, 直接搜索后交叉引用查找

C调用android log [31:50](https://www.bilibili.com/video/BV1nv4y1C7AP/?spm_id_from=333.999.0.0) 

## ida的一些操作
1. g 跳转地址

2. operator new[]  ==> malloc

```c
char* __fastcall  HextToByte(...)
result = (char*)malloc(...)

// native.c
jbytes *__fastcall jstringTostring(JNIEnv *a1, jstring a2)
//JNI_OnLoad
(jniEnv)->RegisterNatives(clazz, gJniNativeMethods, nMethods) < 0

```
## 在线加解密工具
https://gchq.github.io/CyberChef/

## rc4
https://github.com/bozhu/RC4-Python/blob/master/rc4.py

## so代码的运行顺序

.init init_array [JNI_OnLoad](https://blog.csdn.net/lyz_zyx/article/details/88690930#t4)

对照文章看JNI_OnLoad各参数