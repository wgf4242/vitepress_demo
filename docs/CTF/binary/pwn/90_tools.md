# 缺少 so/缺少依赖/更新 glibc/指定运行程序所需要的.so 文件路径的四种方式

https://blog.csdn.net/huashuolin001/article/details/103028422

```
# 方式1 有时不太行
export LD_LIBRARY_PATH=`pwd`
export LD_LIBRARY_PATH=`具体路径`
strings /lib64/libc.so.6 |grep GLIBC
查询是否存在glibc-2.28版本
```

方式 2 - patchelf 替换

# patchelf

```sh
ldd file
# 通常用这两个
patchelf --set-interpreter ld路径 文件名
patchelf --replace-needed libc.so.6 libc路径 文件名



# 其他
patchelf --print-soname iscc_reverse



patchelf --set-interpreter /usr/local/glibc-2.34/build/elf/ld.so iscc_reverse
patchelf --replace-needed libc.so.6 /usr/local/glibc-2.34/build/libc.so iscc_reverse
patchelf --replace-needed libgcc_s.so.1 /usr/local/glibc-2.34/build/libgcc_s.so.1 iscc_reverse
patchelf --replace-needed libm.so.6 /usr/local/glibc-2.34/build/math/libm.so.6 iscc_reverse

## 方式2.1 rpath
patchelf --set-interpreter /usr/local/glibc-2.34/build/elf/ld.so iscc_reverse
patchelf --set-rpath '/usr/local/glibc-2.34/build/:/usr/local/glibc-2.34/build/math/' iscc_reverse
## 2.2 oneline
patchelf --set-interpreter /glibc-2.36/build/libc.so.6 --set-rpath /glibc-2.36/build ./sa
```

| commands          | example                                              |
| ----------------- | ---------------------------------------------------- |
| --set-interpreter | --set-interpreter /var/ld-2.23.so ./note2            |
| --add-needed      |
| --remove-needed   |
| --replace-needed  | --replace-needed libc.so.6 /var/libc-2.23.so ./note2 |

或切换系统, 使用系统 so

| ver           | os           |
| ------------- | ------------ |
| 2.23          | Ubuntu 16.04 |
| 2.27          | Ubuntu 18.04 |
| 2.31          | Ubuntu 20.04 |
| 2.35-0ubuntu3 |              |
