[[toc]]
2022-04-13-RE-上午.mp4

[hulda | frida加强版](https://github.com/hzzheyang/strongR-frida-android/releases)
[练习](https://github.com/DERE-ad2001/Frida-Labs)


## 环境

安装 x64 的 python

1.**雷电模拟器环境**

> 1.软件设置 - 其他设置 - root 权限 <br> 2.软件设置 - 其他设置 - Adb 调试 - 开启本地连接

2.下载 [sdktools](https://developer.android.com/studio/releases/platform-tools) 3.解压添加到环境变量 Path

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

5.下载 python <br>

```
pip3 install -U objection
```

6.安装 hello-app (随便一个 apk)

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

1.jadx 打开 apk，右击函数 `复制为frida片段` 2.新建 foo.js 粘贴

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

- frida-ls-devices

- frida-trace

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

- frida-kill

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

Attach 程序启动

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
2. Frida CLI 中 `%load [script]`
3. Python 代码加载 ts/js 脚本

```bash
frida.exe -l .\guess_function.js --no-pause .\Newbie_calculations.exe
```

## 远程通信 Linux

linux 中启动程序 ./testAdd

linux 中启动调试 ./frida-server-15.1.17-linux-x86_64

frida -H 127.0.0.1 -R testAdd

linux 中监听其它端口

```bash
./frida-server-15.1.17-linux-x86_64 -l 0.0.0.0:23333
frida -H 127.0.0.1:23333 -R testAdd
```

## frida-trace

## Function API

### NativeFunction

new NativeFunction(address, returnType, argTypes[, abi])

可以通过地址创建一个与 Native 函数对应的 JS 的函数对象，然后可以在 JS 里面直接进行调用。可用的数
据类型和前面 NativeCallback 提到的一样。

如果函数没有使用系统默认的调用约定，可通过 api 手动指定

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
  onComplete: function () {}
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

Chrome 中 F12, 点击绿色 nodejs, 选中端口, 进入可下断点了。
Webstorm 新建调试即可

// Thread.sleep(3)

## api

https://www.anquanke.com/post/id/195869
https://www.zhangkunzhi.com/index.php/archives/191/
https://www.jianshu.com/p/a36f49ed666b
Frida 常用方法汇总 https://www.996station.com/1030
https://www.anquanke.com/post/id/195215

# Article

[frida-snippets](https://github.com/iddoeldor/frida-snippets)
[Frida 学习笔记](https://zyzling.gitee.io/2020/05/12/Frida学习笔记/)
[实用 FRIDA 进阶：内存漫游、hook anywhere、抓包/objection](https://www.anquanke.com/post/id/197657)
[之前大家私信我 frida 的一些问题，这篇文章以一些例子给大家讲一讲吧 ](https://bbs.pediy.com/thread-275104.htm)

[\_[原创]初识 Frida--Android 逆向之 Java 层 hook (一) ](https://bbs.pediy.com/thread-227232.htm)
[初识 Frida--Android 逆向之 Java 层 hook (二)](https://bbs.pediy.com/thread-227233.htm)
[【实战篇】Frida-objection 基础使用获取 FLAG ](https://bbs.pediy.com/thread-273733.htm)
[某汽车社区 App 签名和加解密分析 (二) : Frida Dump so](https://blog.51cto.com/u_15527932/5205322)
[ART 环境下 dex 加载流程分析及 frida dump dex 方案](https://mp.weixin.qq.com/s/WI3WYR_ABxorBoNACpju3A)
[android 脱壳实战-Frida-Apk-Unpack](https://mp.weixin.qq.com/s/gvWaSaBiD-bQCgtH7-agQA)

[安卓协议逆向之 frida hook 百例](https://www.52pojie.cn/thread-1711668-1-1.html)
[安卓协议逆向之 frida hook 百例二](https://www.52pojie.cn/thread-1712752-1-1.html)
[Done | Hook入门与抓包](https://mp.weixin.qq.com/s/dIKGsYlQQtuWBU-7trLBCA)
[『工具使用』Frida 工程师备忘录](https://mp.weixin.qq.com/s/UqJSwsxkV8iTRTbUsS58Kg)
[Frida 开启 PC 端小程序调试模式](https://mp.weixin.qq.com/s/8p1_s1QoTGdiZ8ocKC-tDA)
[Android 逆向技术 53——frida stalker 追踪 jni 函数调用](https://mp.weixin.qq.com/s/dd2QJxo4uvKCcPSSjtQVgw)
[Frida01 - 开发和调试环境搭建](http://mp.weixin.qq.com/s?__biz=MzU2NTkxMTU1NA==&mid=2247484506&idx=1&sn=617131b546a1f620660ed56075f7152c)
[Frida02 - 内存漫游，hook 使用](http://mp.weixin.qq.com/s?__biz=MzU2NTkxMTU1NA==&mid=2247484540&idx=1&sn=4cf98d3713b80bfd1d7231debf5c2f79)
[Frida04 - 基本 API 用法](http://mp.weixin.qq.com/s?__biz=MzU2NTkxMTU1NA==&mid=2247484558&idx=1&sn=b54b5f896ab2e829db67bba65d57bd49)
[Frida05 - 高级 API 用法](http://mp.weixin.qq.com/s?__biz=MzU2NTkxMTU1NA==&mid=2247484569&idx=1&sn=0ff71bfee96bebebc7aa79a356d56ee7)
[Frida06 - 一个简单的综合案例](http://mp.weixin.qq.com/s?__biz=MzU2NTkxMTU1NA==&mid=2247484585&idx=1&sn=bf1cee37d60309dbf89e2dc51eb95cba)
[魔法打败魔法：Frida 过 Frida 检测](https://mp.weixin.qq.com/s/UI0L_tOyv78kNkbAYsObdQ)
[FD_01.三种方案实现 Frida 脚本持久化研究](https://mp.weixin.qq.com/s/dIv7QZWk5S74emYC6JZZSQ)
[九维团队-绿队（改进）| APP 安全-Frida 联动 BurpSuite 实现自动加解密](https://mp.weixin.qq.com/s/jdeEmwz8fsySUkszFbZwpA)

- 反调试
  [移动安全之【魔改 frida 自编译去特征】超详细全过程](https://mp.weixin.qq.com/s/4MOTfYm-GMpZQFsLKOOHwQ)

- Windows
  [使用 Frida 在 Windows 中拦截 C++函数](https://mp.weixin.qq.com/s/g2p6jGtsTC2GhoyoUYwwhA)

[Frida + IDA 开启小程序 devtools](https://mp.weixin.qq.com/s/hAvFEgYrejYAfFGk9gY50Q)

## Brida

[[原创]Frida 配合 BurpSuite 的 Brida 插件自动解密取证 ](https://bbs.pediy.com/thread-263484.htm)
[Android 渗透测试 frida——Brida 插件加解密实战演示](https://xz.aliyun.com/t/7562?page=34)

## Video

[使用 Frida 和 Unidbg 获取 so 在内存中的基址](https://www.bilibili.com/video/BV1aG4y1E73x/)
[拔出萝卜带出泥！最新 Fulao2 破了 frida 检测后，再用 frida-dexdump 来把壳脱下来~全套代码都在 dex 中，毫无秘密可言！](https://www.bilibili.com/video/BV1NR4y1k7J3/)
[Frida 基操之三种日志级别的使用](https://www.bilibili.com/video/BV1MD4y1Y7yA/)
[使用 pyenv 安装最新的 Frida16](https://www.bilibili.com/video/BV1714y1E7Rq/)

[2023 安卓逆向 CTF 系列视频（二(2)idaattach 分析）](https://www.bilibili.com/video/BV1Gx4y1g7EQ/)
[2023 安卓逆向 CTF 系列视频（一）（下）](https://www.bilibili.com/video/BV1nv4y1C7AP/)
[2023 安卓逆向 CTF 系列视频（二(1)fridainlinehook）](https://www.bilibili.com/video/BV1QY411Q7u2/)
[2023 安卓逆向 CTF 系列视频（二概述）](https://www.bilibili.com/video/BV1rx4y1u7sN/)
[2023 安卓逆向 CTF 系列视频（一）（上）](https://www.bilibili.com/video/BV1zK411r79R/)
[2023 安卓 Hook 框架源码入门（零-首次介绍）](https://www.bilibili.com/video/BV1D84y1h7jj/)
[2023 安卓逆向 CTF 系列视频（零-首次介绍）](https://www.bilibili.com/video/BV1v84y1h7Wr/)
[（视频）反调试入门第六课 lsposed 编译与简单魔改（上）](https://www.bilibili.com/video/BV15g411x71c/)
[（视频）反调试入门第六课 lsposed 编译与简单魔改（下）](https://www.bilibili.com/video/BV1FW4y157z8/)
[反调试入门第一课第一节上](https://www.bilibili.com/video/BV1oG4y1m7if/)
[反调试入门第一课第一节下](https://www.bilibili.com/video/BV1Ee4y1V7yL/)
[番外篇之 java 混淆函数的 hook 处理](https://www.bilibili.com/video/BV1Y84y1Y7Nc/)
[目前遇到的最辣鸡的锁机 app](https://www.bilibili.com/video/BV1NN4y1K7yW/)
[Frida 高频问题：双进程保护该怎么突破：Frida 布道师亲授-哔哩哔哩](https://www.bilibili.com/video/BV1h24y1s7vf)

## FAQ

1. app Failed to spawn: unexpectedly timed out while waiting for app to launch

```
https://blog.csdn.net/Androidbye/article/details/113609679
https://bbs.pediy.com/thread-268240.htm

su
setprop persist.device_config.runtime_native.usap_pool_enabled true
```

2. adb 连接手机启动 frida server，手机会自动重启是什么原因

ro.debuggable

root 一下挂 system 分区然后就可以改了我记得

https://www.baidu.com/s?wd=ro.debuggable
