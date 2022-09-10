## Article
[利用unicron去除ollvm混淆](https://www.cnblogs.com/revercc/p/16339476.html)
[Unicorn反混淆：恢复被OLLVM保护的程序(一)](https://blog.51cto.com/u_15527932/5218378)
[[原创]你所需要的对抗ollvm的知识都在这里](https://bbs.pediy.com/thread-272414.htm) 
[Android OLLVM反混淆实战](https://blog.csdn.net/zhangmiaoping23/article/details/117220177)
[[原创]利用angr符号执行去除虚假控制流](https://bbs.pediy.com/thread-266005.htm) 
[利用符号执行去除控制流平坦化](https://security.tencent.com/index.php/blog/msg/112)
[利用angr还原ollvm指令流平坦化](https://github.com/pcy190/deflat)
[android逆向奇技淫巧十：OLLVM原理、常见破解思路和hook代码](https://www.cnblogs.com/theseventhson/p/14861940.html)
[[原创]ARM64 OLLVM反混淆 ](https://bbs.pediy.com/thread-252321.htm)

[字符串混淆 | 2020-06-05-Frida辅助分析OLLVM混淆的算法](https://huhu0706.github.io/2020/06/05/2020-06-05-Frida%E8%BE%85%E5%8A%A9%E5%88%86%E6%9E%90OLLVM%E6%B7%B7%E6%B7%86%E7%9A%84%E7%AE%97%E6%B3%95/)
[字符串混淆 | AndroidNativeEmu和unidbg对抗ollvm的字符串混淆](http://www.yxfzedu.com/rs_show/1211)
[字符串混淆 | 某右 so层ollvm字符串混淆 libnet_crypto.so](https://bbs.pediy.com/thread-266583.htm)
[字符串混淆 | [原创]使用unicorn对ollvm字符串进行解密 ](https://bbs.pediy.com/thread-268108.htm)
[字符串加密 | Unicorn实战（二）：去掉armariris的字符串加密](https://www.leadroyal.cn/p/968/)
[字符串加密 | 使用unicorn engin还原Armariris字符串混淆](https://www.anquanke.com/post/id/181051#h3-8)

[安卓 so文件在linux下能调用么](https://www.baidu.com/s?wd=%E5%AE%89%E5%8D%93+so%E6%96%87%E4%BB%B6%E5%9C%A8linux%E4%B8%8B%E8%83%BD%E8%B0%83%E7%94%A8%E4%B9%88)
## ollvm字符串加密
// 或者直接用修复后的内存so?
ida 加载
```c
int __fastcall JNI_OnLoad(JavaVM *a1)  // 按Y 下拉菜单改为JavaVM*
...
result = ((int (*)(void))(*a1) -> GetEnv)() // 右击GetEnv Force call type
...
((void (*)(void))(*v4)->FindClass()) // 右击 FindClass Force call type
((void (*)(void))(*v4)->RegisterNatives()) // 右击 RegisterNatives Force call type
```
1. String 查看字符串有无加密
2. 010 Editor打开。查看 struct section_header_table 的.data段。数据有无加密


解密办法. dump内存
```sh
adb shell
su
ps | grep cn.xiaohcuankeji.tieba # 得到pid

cat /proc/13598/maps | grep libnet
# u0_a67 13598 194 1057208 99148 fffffff 400446e0 S cn. xiaochuanke ji. tieba

cat /proc/13598/maps | grep libnet
40250000-40255000 r-xp 00000000 b3:15 38718 /system/lib/libnetutils.so
40255000-40256000 r--p 00004000 b3:15 38718 /system/1ib/libnetutils.so
40256000-40257000 rw-p 00005000 b3:15 38718 /system/lib/libnetutils.so
79abf000-79c2b000 r-xp 00000000 b3:17 325814 /data/app-lib/cn.xiaochuankeji.tieba-1/libnet_crypto.so
79c2b000-79c3c000 r--p 0016b000 b3:17 325814 /data/app-lib/cn.xiaochuankeji.tieba-1/libnet_crypto.so
79c3c000-79c3e000 rw-p 0017c000 b3:17 325814 /data/app-lib/cn.xiaochuankeji.tieba-1/libnet_crypto.so
.data 是存放于rw-p的 可读写区域的。

# 79c3c000 = 2042871808 , 8192 = 79c3e000 - 79c3c000
dd if=/proc/13598/mem of=/data/local/tmp/dump.so skip=2042871808 bs=1 count=8192

chmod 777 /data/local/tmp/dump.so
exit

adb pull /data/local/tmp/dump.so
```
原文件和dump出来的文件对比。

![](https://s2.loli.net/2022/09/09/REcOHixydSmvjFo.jpg)

用010 Editor把dump的字符串部分替换到libnet_crypto.so中 解决字符串加密问题。

## ollvm控制流程平坦化
## ollvm指令替换
## ollvm虚假控制流