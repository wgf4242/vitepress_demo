Unity3D/Ue4/Ue5： 通常包含.assets、Managed 等目录，以及相应的游戏引擎文件。

# il2cpp
检查 GameAssembly.dll 查壳, 然后脱壳再用 Il2CppDumper

```sh
# Android
Il2CppDumper.exe libil2cpp.so global-metadata.dat .\out
# PC
Il2CppDumper.exe GameAssembly.dll global-metadata.dat ..\output
```

方式一. ida对GameAssmely.dll文件进行符号还原
使用script file 导入文件，依次选择ida py3和script.json

方式二.
启动后 x64dbg Attach: baby unity, x64dbg查看符号 FC0000 gameassembly.dll, 如果函数的RVA值为 0x27C1F0, 直接 FC0000 + 0x27C1F0 下断

## Article

[XYCTF | baby unity](https://blog.csdn.net/2203_75549399/article/details/138284581)

[libil2cpp | andorid | [原创]2023 腾讯游戏安全竞赛初赛题解(安卓) ](https://bbs.kanxue.com/thread-276949.htm)

[Android | [原创]Unity Il2cpp 应用逆向分析 ](https://bbs.kanxue.com/thread-271191.htm)
[Android | 【游戏开发进阶】教你使用 IL2CppDumper 从 Unity il2cpp 的二进制文件中获取类型、方法、字段等（反编译）](https://blog.csdn.net/linxinfa/article/details/116572369)
[Android | Il2cpp 逆向:global-metadata 解密 | AshenOne](https://ashenone66.cn/2022/04/22/il2cpp-ni-xiang-global-metadata-jie-mi)

[Android | Il2cpp | 通过修改类"属性"达到修改数据效果](https://www.bilibili.com/video/BV1Dt421G7cG/)
[Android | Il2cpp | [il2cpp]通过类型获取字段和方法](https://www.bilibili.com/video/BV1nw41127tw/)
[Android | Il2cpp | 简单回应私信问题\_Il2cpp 类型问题](https://www.bilibili.com/video/BV1Bv421k7PS/)
[Android | Il2cpp | [Arm]gg 调用 Il2cpp_Object_new 函数分配一个类实例](https://www.bilibili.com/video/BV1F1421U72G/)
