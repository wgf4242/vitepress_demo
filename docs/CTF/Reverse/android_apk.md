[练习 | UnCrackable Mobile Apps](https://github.com/OWASP/owasp-mastg/tree/master/Crackmes)
[Android NDK开发](https://gift1a.github.io/2022/09/06/Android-Learning/#Android-NDK%E5%BC%80%E5%8F%91)


# 执行流程
1.dex脱壳 - blackdex
.so文件 

https://blog.csdn.net/AMDS123/article/details/86595903
Shift+F7 - Segments 看 .init_array ,  init_array是我们程序代码可以控制的最早的时机了, 其次才加载Jni_onload

* jadx/jeb 查看
* smali中可能有匿名类, 注意查看是否有用

## ida native 函数处理
a1改类型为JNIEnv *
a2 - jobject/jclass
```c
// a3 没用, a2可能是MainActivity
Java_com_ctf_cfe_MainActivity_validate(JNIEnv *a1, jobject a2, void *a3)
```
## Patch: 修改 smali 代码
1.修改smali代码 : 1.解包 2.修改smali 3.打包 4.签名
2.frida hook修改检测函数 见Level1  https://github.com/OWASP/owasp-mastg/blob/master/Crackmes

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

## jeb调试操作
<!-- adb forward tcp:8700 jdwp:2288 -->
map类型不显示变量值，是jeb的bug，安卓9/10的调试协议有问题，只有p开头的虚拟寄存器才能被正确读取

Ctrl+B, smali代码下断点

1.类型不正确，怎样修改？
> 直接int改String, 其他改object.

![](https://s2.loli.net/2022/09/07/hVu6cdH2oClzFBA.jpg)

## APKlab
https://github.com/APKLab/APKLab


# Article

[Android渗透07：安卓CTF系列-案例1](https://mp.weixin.qq.com/s/oY_W5Nt3SrY9OGuK1KGb_g)
[Android渗透07：安卓CTF系列-案例2](https://mp.weixin.qq.com/s/RdvphrCCEVjPbUqmgcPMaQ)
[Android渗透07：安卓CTF系列-案例3](https://mp.weixin.qq.com/s/DxYlML5gx8BpJt07P8EMww)
[Android渗透07：安卓CTF系列-案例4](https://mp.weixin.qq.com/s/JxcJX4H73Xqur5br45ad4g)
[Android渗透11：AS与Jeb动态调试Apk](https://mp.weixin.qq.com/s/SOPjvPkuCB2zFZiJ5L7tew)
[Android渗透12：安卓逆向-IDA动态调试so](https://mp.weixin.qq.com/s/eJVicCY7Y4VEAg8U2dS4hg)
[【APP 逆向百例】Frida 初体验，root 检测与加密字符串定位](https://mp.weixin.qq.com/s/WfvTA9MJh-NS86LYDVTBzg)


[Android逆向之smali语法宝典](https://www.jianshu.com/p/ba9b374346dd) 
[吾爱破解安卓逆向入门教程--导航帖（2018-06）](https://www.52pojie.cn/thread-408645-1-1.html) 



## ab 文件
abe.jar https://github.com/nelenkov/android-backup-extractor/releases

恢复
```bat
java -jar abe.jar unpack 1.ab 1.tar
```
