[强网杯2019 | 一步步学习Webassembly逆向分析方法](https://www.anquanke.com/post/id/179556)
[强网杯2019 | lebel:WASM](https://blog.csdn.net/q1uTruth/article/details/99409403)
[wasm 在前端安全测试应用中的逆向实战](https://juejin.cn/post/7025562527681478663)
[长安杯2021 从一道ctf题目浅析WebAssembly逆向](https://www.anquanke.com/post/id/254427)
NSSCTF ROUND 4 wasm
[DEF CON CTF 2019 Quals | 一种Wasm逆向静态分析方法](https://www.52pojie.cn/thread-962068-1-1.html)

kali
```sh
sudo apt install wabt
wasm-decompile wasm.wasm -o 1
```
[动态调试](https://nodejs.org/zh-cn/docs/guides/debugging-getting-started/)
```
node --inspect-brk index.js
```
在chrome中查看关键函数, 例为index.js中的check

在反编译的1中, 查看 `assembly_<file_name>_<function_name>` => `assembly_index_check`

##  转成 c => a.out
```sh
path E:\Software\CTF\wabt-1.0.30\bin;%path%
wasm2c crypt.wasm -o wasm.c
# 只链接不编译，不报错
gcc -c wasm.c -o w
```