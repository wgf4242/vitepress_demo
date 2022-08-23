
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
