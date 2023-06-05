# 符号恢复/恢复符号

```sh
strings filex | grep GCC
$ python lscan.py -S i386/sig -f pwn
$ python lscan.py -S i386/sig -f i386/bin/bin-libc-2.23
$ python lscan.py -s i386/sig/libpthread-2.23.sig -f i386/bin/bin-libpthread-2.23 -v
$ python lscan.py -f i386/win32/bin/bin-libcmt.exe -s i386/win32/sig/msvcmrt.sig
```

- 比如找到 `GCC: (Ubuntu 7.5.0-3ubuntu1~18.04) 7.5.0`
- 将 `sig-database-master\ubuntu\libc6\18.04 (bionic)\i386` 下的文件放入 `IDA_Pro_7.7\sig\pc`
- ida 中加载 pwn 文件后, Shift+F5, 导入对应的 libc sig 文件。

# Article

[分析静态编译加剥离的 ELF 文件的一些方法](https://bbs.kanxue.com/thread-217790.htm)
[IDA 中识别库函数](https://www.weisblog.club/2020/12/07/IDA%E4%B8%AD%E8%AF%86%E5%88%AB%E5%BA%93%E5%87%BD%E6%95%B0/#%E5%88%9B%E5%BB%BAsig%E6%96%87%E4%BB%B6)
[IDA 二进制逆向函数识别与符号表还原的方法](https://xeldax.top/article/IDA_BINARY_SYMBOL_DIFF)
