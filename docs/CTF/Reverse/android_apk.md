

# 执行流程

.so文件 

https://blog.csdn.net/AMDS123/article/details/86595903
Shift+F7 - Segments 看 .init_array ,  init_array是我们程序代码可以控制的最早的时机了, 其次才加载Jni_onload

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

