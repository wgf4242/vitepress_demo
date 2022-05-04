[[toc]]
2022-04-13-RE-上午.mp4

## 环境
安装 x64 的python

## Commands

frida-ps

frida-ps -h

```
frida -U -l [SCRIPT-NAME] --no-pause -f [APP-IDENTIFIER]
% resume
```

frida -U -l [SCRIPT-NAME] --no-pause -f [APP-IDENTIFIER]

## Quick Start

Attach程序启动

```bash
frida TestAdd.exe
Process.enumerateNodules()

frida process_name/pid
```

优先目标启动
```
frida .\TestAdd.exe
%resume
```

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
## Frida 调试
https://github.com/frida/frida-python/issues/134

```
frida -p 0 --runtime=v8 --debug
frida fib_print.exe --runtime=v8 --debug
%load <script>
```

Chrome中F12, 点击绿色nodejs, 选中端口, 进入可下断点了。

// Thread.sleep(3)



##  入门文章
[_[原创]初识Frida--Android逆向之Java层hook (一) ](https://bbs.pediy.com/thread-227232.htm)
[初识Frida--Android逆向之Java层hook (二)](https://bbs.pediy.com/thread-227233.htm)
## Brida
[[原创]Frida配合BurpSuite的Brida插件自动解密取证 ](https://bbs.pediy.com/thread-263484.htm)
[Android渗透测试frida——Brida插件加解密实战演示](https://xz.aliyun.com/t/7562?page=34)
