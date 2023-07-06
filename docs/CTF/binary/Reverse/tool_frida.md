[[toc]]
2022-04-13-RE-上午.mp4

## 环境
安装 x64 的python

1.**雷电模拟器环境**

> 1.软件设置 - 其他设置 - root权限 <br>
> 2.软件设置 - 其他设置 - Adb调试 - 开启本地连接

2.下载 [sdktools](https://developer.android.com/studio/releases/platform-tools)
3.解压添加到环境变量Path

```
adb devices
adb -s emulator-5554 shell
```

4.[Download Frida](https://github.com/frida/frida/releases) <br>

```
adb push frida-server /data/local/tmp/
adb shell
su
setprop persist.device_config.runtime_native.usap_pool_enabled false

cd /data/local/tmp
chmod +x frida_server
./frida_server & 
```

5.下载python <br>
```
pip3 install -U objection
```

6.安装hello-app (随便一个apk)
```
frida-ps -Ua
frida-ps -Uai
#  2568  Hello App com.example.helloapp
# 启动app后
frida -U -n "Hello App"
exit

objection --gadget com.example.helloapp explore
# 可能要切到桌面再回来才进入交互
exit
```

### 第一个示例
1.jadx打开apk，右击函数 `复制为frida片段`
2.新建foo.js粘贴
```js
Java.perform(function(){
  // 这里粘贴
}
```
3.frida -UF -l foo.js

在手机上点击对应按钮即可

## Commands
```sh
frida-ps
frida-ps -h
frida-ps -Ua
frida-ps -Uai # 包括未运行的
# 当前应用包名
adb shell dumpsys window | grep -i mcurrentfocus

frida -U uncrackable1 -l hook.js  # attach 模式，APP 启动后注入 frida 代码；
# 前台 -F
frida -UF -l hook.js

# 只启动进程
frida -U -f owasp.mstg.uncrackable1 --no-pause # spawn 模式
# 加载脚本
frida -U -f owasp.mstg.uncrackable1 --no-pause -l del1.js

frida -U -l [SCRIPT-NAME] --no-pause -f [APP-IDENTIFIER]
# use app name to attach,use package name to spawn,try it.
% resume
%load my_script.js
```

* frida-ls-devices

* frida-trace
```sh
# https://www.bilibili.com/read/cv17470944
frida-ps -Ua
frida-trace -U createSo -a libcreateso.so!0x2000

# Trace Java methods with "certificate" in their signature, ignoring case (i) and only searching in user-defined classes(u)
frida-trace -U -f com.google.android.youtube --runtime=v8 -j '*!*certificate*/isu'
# Trace all JNI functions
frida-trace -U -i "Java_*" com.samsung.faceservice
frida-trace -U -f com.wodi.who -i dlopen             # trace dlopen
```


* frida-kill
```sh
frida-kill -D <DEVICE-ID> <PID>
```

### objection
```shell
pip install objection

# 例1 将objection注入应用
objection -g com.ss.android.auto explore
objection -g 5216 explore  # frida-ps -Ua
# Hook, jadx查看方法
android hooking watch class_method com.hfdcxy.android.by.test.a.a --dump-args --dump-backtrace --dump-return
android hooking watch class_method com.hfdcxy.android.by.test.a.a --dump-return
## remove: 通过 jobs kill [jobID]
# 提取内存
memory list modules
android heap serach instances com.hfdcxy.android.by.test.a
memory dump all from_base

# 修改返回值
android hooking set return_value com.example.test.rootUtils.isRooted false

# list methods, 列出有哪些方法
android hooking list class_method com.hfdcxy.android.by.test.a.a
# 查看调用了哪些函数
android hooking watch class com.hfdcxy.android.by.test.a.a
```

```shell
# 例2 xctf app3 https://bbs.pediy.com/thread-273733.htm

# hook 数据库拿密码
objection -g com.example.yaphetshan.tencentwelcome explore
android hooking watch class_method net.sqlcipher.database.SQLiteOpenHelper.getWritableDatabase --dump-args --dump-backtrace --dump-return
# 堆中查找实例
android heap search instances com.example.yaphetshan.tencentwelcome.MainActivity --dump-args --dump-backtrace --dump-return
# 0x60042a com.example.yaphetshan.tencentwelcome.MainActivity com.example.yaphetshan.tencentwelcome.MainActivity@734a4a2
# 调用a方法
android heap execute 0x60042a a


# 启动activity或者服务
android intent launch_activity com.droidlearn.activity_travel.FlagActivity


```

## Quick Start

Attach程序启动

```bash
frida TestAdd.exe
Process.enumerateNodules()

frida process_name/pid
```

优先目标启动
```shell
frida .\TestAdd.exe
%resume
```


frida-ls-devices

三种方式加载脚本
1. `frida [target] -l script.ts/js`
2. Frida CLI中 `%load [script]`
3. Python代码加载 ts/js 脚本

```bash
frida.exe -l .\guess_function.js --no-pause .\Newbie_calculations.exe
```
## 远程通信Linux
linux中启动程序 ./testAdd

linux中启动调试 ./frida-server-15.1.17-linux-x86_64

frida -H 127.0.0.1 -R testAdd

linux中监听其它端口
```bash
./frida-server-15.1.17-linux-x86_64 -l 0.0.0.0:23333
frida -H 127.0.0.1:23333 -R testAdd
```


## frida-trace

## Function API

### NativeFunction

new NativeFunction(address, returnType, argTypes[, abi])

可以通过地址创建一个与Native函数对应的JS的函数对象，然后可以在JS里面直接进行调用。可用的数
据类型和前面 NativeCallback 提到的一样。

如果函数没有使用系统默认的调用约定，可通过api手动指定
```
default
Windows 32-bit:
    sysv
    stdcall
    thiscall
    fastcall
    mscdecl
Windows 64-bit:
    win64
UNIX x86:内存操作
    sysv
    unix64
UNIX ARM:
    sysv
    vfp
```

NativeCallback() 可以用的数据类型有
```
void, pointer, int, uint, long, ulong, char, uchar, size_t, ssize_t, float,
double, int8, uint8, int16, uint16, int32, uint32, int64, uint64, bool
```
### List all class
```js
  Java.enumerateLoadedClasses({
    onMatch: function (className) {
      if (className.includes("com.example.mobilea")) {
        console.log(className)
      }
    },
    onComplete: function () {},
  })
```
## Frida - Debug/调试
https://github.com/frida/frida-python/issues/134

```
frida -p 0 --runtime=v8 --debug
frida fib_print.exe --runtime=v8 --debug
%load <script>

# android
frida -p 0 --runtime=v8 --debug -UF -l a.js
```

Chrome中F12, 点击绿色nodejs, 选中端口, 进入可下断点了。
Webstorm 新建调试即可


// Thread.sleep(3)

## api
https://www.anquanke.com/post/id/195869
https://www.zhangkunzhi.com/index.php/archives/191/
https://www.jianshu.com/p/a36f49ed666b
Frida常用方法汇总 https://www.996station.com/1030
https://www.anquanke.com/post/id/195215

# Article
[frida-snippets](https://github.com/iddoeldor/frida-snippets)
[Frida学习笔记](https://zyzling.gitee.io/2020/05/12/Frida学习笔记/)
[实用FRIDA进阶：内存漫游、hook anywhere、抓包/objection](https://www.anquanke.com/post/id/197657)
[之前大家私信我frida的一些问题，这篇文章以一些例子给大家讲一讲吧 ](https://bbs.pediy.com/thread-275104.htm) 

[_[原创]初识Frida--Android逆向之Java层hook (一) ](https://bbs.pediy.com/thread-227232.htm)
[初识Frida--Android逆向之Java层hook (二)](https://bbs.pediy.com/thread-227233.htm)
[【实战篇】Frida-objection 基础使用获取FLAG ](https://bbs.pediy.com/thread-273733.htm)
[某汽车社区App 签名和加解密分析 (二) : Frida Dump so](https://blog.51cto.com/u_15527932/5205322)
[ART环境下dex加载流程分析及frida dump dex方案](https://mp.weixin.qq.com/s/WI3WYR_ABxorBoNACpju3A)

[安卓协议逆向之frida hook百例](https://www.52pojie.cn/thread-1711668-1-1.html) 
[安卓协议逆向之frida hook百例二](https://www.52pojie.cn/thread-1712752-1-1.html) 
[『工具使用』Frida 工程师备忘录](https://mp.weixin.qq.com/s/UqJSwsxkV8iTRTbUsS58Kg)

## Brida
[[原创]Frida配合BurpSuite的Brida插件自动解密取证 ](https://bbs.pediy.com/thread-263484.htm)
[Android渗透测试frida——Brida插件加解密实战演示](https://xz.aliyun.com/t/7562?page=34)
## Video
[使用Frida 和 Unidbg 获取 so 在内存中的基址](https://www.bilibili.com/video/BV1aG4y1E73x/)
[拔出萝卜带出泥！最新Fulao2破了frida检测后，再用frida-dexdump来把壳脱下来~全套代码都在dex中，毫无秘密可言！](https://www.bilibili.com/video/BV1NR4y1k7J3/)
[Frida基操之三种日志级别的使用](https://www.bilibili.com/video/BV1MD4y1Y7yA/)
[使用pyenv安装最新的Frida16](https://www.bilibili.com/video/BV1714y1E7Rq/)

[2023安卓逆向CTF系列视频（二(2)idaattach分析）](https://www.bilibili.com/video/BV1Gx4y1g7EQ/)
[2023安卓逆向CTF系列视频（一）（下）](https://www.bilibili.com/video/BV1nv4y1C7AP/)
[2023安卓逆向CTF系列视频（二(1)fridainlinehook）](https://www.bilibili.com/video/BV1QY411Q7u2/)
[2023安卓逆向CTF系列视频（二概述）](https://www.bilibili.com/video/BV1rx4y1u7sN/)
[2023安卓逆向CTF系列视频（一）（上）](https://www.bilibili.com/video/BV1zK411r79R/)
[2023安卓Hook框架源码入门（零-首次介绍）](https://www.bilibili.com/video/BV1D84y1h7jj/)
[2023安卓逆向CTF系列视频（零-首次介绍）](https://www.bilibili.com/video/BV1v84y1h7Wr/)
[（视频）反调试入门第六课lsposed编译与简单魔改（上）](https://www.bilibili.com/video/BV15g411x71c/)
[（视频）反调试入门第六课lsposed编译与简单魔改（下）](https://www.bilibili.com/video/BV1FW4y157z8/)
[反调试入门第一课第一节上](https://www.bilibili.com/video/BV1oG4y1m7if/)
[反调试入门第一课第一节下](https://www.bilibili.com/video/BV1Ee4y1V7yL/)
[番外篇之java混淆函数的hook处理](https://www.bilibili.com/video/BV1Y84y1Y7Nc/)
[目前遇到的最辣鸡的锁机app](https://www.bilibili.com/video/BV1NN4y1K7yW/)
[Frida 高频问题：双进程保护该怎么突破：Frida 布道师亲授-哔哩哔哩](https://www.bilibili.com/video/BV1h24y1s7vf)

## FAQ

1. app Failed to spawn: unexpectedly timed out while waiting for app to launch

```
https://blog.csdn.net/Androidbye/article/details/113609679
https://bbs.pediy.com/thread-268240.htm

su
setprop persist.device_config.runtime_native.usap_pool_enabled true
```

2. adb连接手机启动frida server，手机会自动重启是什么原因

ro.debuggable 

root一下挂system分区然后就可以改了我记得

https://www.baidu.com/s?wd=ro.debuggable