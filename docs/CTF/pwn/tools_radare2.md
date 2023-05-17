## radare2 使用

r2 ./bof

aa 分析

afl 看函数 analysis function list

跳到 main
s main
s 0x1234 地址
V 看内存
VV 进入 virtual mode，能看图

s sym.hidden
VV
看绿色 call sym.imp.system 参数是 bin/sh
s sym.main(转到 main)

执行
./bof1

光标处按:提示:> 修改，
:> afvn 改名字
local_10h 改为 input
:> afvn input local_10h

aa 分析
aaa 分析 一般用这个够了
aaaa 分析
