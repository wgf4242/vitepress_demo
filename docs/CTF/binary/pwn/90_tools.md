# 修改 so/缺少 so/缺少依赖/更新 glibc/指定运行程序所需要的.so 文件路径的四种方式

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

patchelf --set-interpreter /home/kali/archive/glibc-all-in-one-master/libs/2.27-3ubuntu1_amd64/ld-linux-x86-64.so.2 ./ACTF_2019_message
patchelf --replace-needed libc.so.6 ./libc-2.27.so ./ACTF_2019_messages

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

| ver             | os           |
| --------------- | ------------ |
| 2.23            | Ubuntu 16.04 |
| 2.27            | Ubuntu 18.04 |
| 2.31            | Ubuntu 20.04 |
| 2.35-0ubuntu3.1 | Ubuntu 22.04 |

## GLIBC Download
[Download](https://ubuntu.repo.cure.edu.uy/mirror/pool/main/g/glibc/)


直接改后面目录就能进到源码下载, 好像版本都有的
[手动编译](https://launchpad.net/ubuntu/+source/glibc/2.31-0ubuntu9.9)

已编译

| Link                                                                                                                              | Size    | Date             |
| --------------------------------------------------------------------------------------------------------------------------------- | ------- | ---------------- |
| [libc6_2.23-0ubuntu11.3_amd64.deb](https://mirror.tuna.tsinghua.edu.cn/ubuntu/pool/main/g/glibc/libc6_2.23-0ubuntu11.3_amd64.deb) | 2.5 MiB | 2021/5/14 02:58  |
| [libc6_2.23-0ubuntu3_amd64.deb](https://mirror.tuna.tsinghua.edu.cn/ubuntu/pool/main/g/glibc/libc6_2.23-0ubuntu3_amd64.deb)       | 2.5 MiB | 2016/4/15 06:39  |
| [libc6_2.23-0ubuntu3_i386.deb](https://mirror.tuna.tsinghua.edu.cn/ubuntu/pool/main/g/glibc/libc6_2.23-0ubuntu3_i386.deb)         | 2.2 MiB | 2016/4/15 07:25  |
| [libc6_2.27-3ubuntu1_amd64.deb](https://mirror.tuna.tsinghua.edu.cn/ubuntu/pool/main/g/glibc/libc6_2.27-3ubuntu1_amd64.deb)       | 2.7 MiB | 2018/4/17 11:18  |
| [libc6_2.27-3ubuntu1_i386.deb](https://mirror.tuna.tsinghua.edu.cn/ubuntu/pool/main/g/glibc/libc6_2.27-3ubuntu1_i386.deb)         | 2.4 MiB | 2018/4/17 11:18  |
| [libc6_2.31-0ubuntu9_amd64.deb](https://mirror.tuna.tsinghua.edu.cn/ubuntu/pool/main/g/glibc/libc6_2.31-0ubuntu9_amd64.deb)       | 2.6 MiB | 2020/4/16 15:04  |
| [libc6_2.31-0ubuntu9_i386.deb](https://mirror.tuna.tsinghua.edu.cn/ubuntu/pool/main/g/glibc/libc6_2.31-0ubuntu9_i386.deb)         | 2.5 MiB | 2020/4/16 15:04  |
| [libc6_2.23-0ubuntu11.3_i386.deb](https://mirror.tuna.tsinghua.edu.cn/ubuntu/pool/main/g/glibc/libc6_2.23-0ubuntu11.3_i386.deb)   | 2.2 MiB | 2021/5/14 02:58  |
| [libc6_2.27-3ubuntu1.5_amd64.deb](https://mirror.tuna.tsinghua.edu.cn/ubuntu/pool/main/g/glibc/libc6_2.27-3ubuntu1.5_amd64.deb)   | 2.7 MiB | 2022/3/1 23:23   |
| [libc6_2.27-3ubuntu1.5_i386.deb](https://mirror.tuna.tsinghua.edu.cn/ubuntu/pool/main/g/glibc/libc6_2.27-3ubuntu1.5_i386.deb)     | 2.4 MiB | 2022/3/1 23:23   |
| [libc6_2.31-0ubuntu9.7_amd64.deb](https://mirror.tuna.tsinghua.edu.cn/ubuntu/pool/main/g/glibc/libc6_2.31-0ubuntu9.7_amd64.deb)   | 2.6 MiB | 2022/3/1 23:24   |
| [libc6_2.31-0ubuntu9.7_i386.deb](https://mirror.tuna.tsinghua.edu.cn/ubuntu/pool/main/g/glibc/libc6_2.31-0ubuntu9.7_i386.deb)     | 2.5 MiB | 2022/3/1 23:24   |
| [libc6_2.35-0ubuntu3_i386.deb](https://mirror.tuna.tsinghua.edu.cn/ubuntu/pool/main/g/glibc/libc6_2.35-0ubuntu3_i386.deb)         | 2.9 MiB | 2022/3/4 11:49   |
| [libc6_2.35-0ubuntu3_amd64.deb](https://mirror.tuna.tsinghua.edu.cn/ubuntu/pool/main/g/glibc/libc6_2.35-0ubuntu3_amd64.deb)       | 3.1 MiB | 2022/3/4 12:28   |
| [libc6_2.27-3ubuntu1.6_amd64.deb](https://mirror.tuna.tsinghua.edu.cn/ubuntu/pool/main/g/glibc/libc6_2.27-3ubuntu1.6_amd64.deb)   | 2.7 MiB | 2022/5/12 00:14  |
| [libc6_2.27-3ubuntu1.6_i386.deb](https://mirror.tuna.tsinghua.edu.cn/ubuntu/pool/main/g/glibc/libc6_2.27-3ubuntu1.6_i386.deb)     | 2.4 MiB | 2022/5/12 00:14  |
| [libc6_2.37-0ubuntu2_i386.deb](https://mirror.tuna.tsinghua.edu.cn/ubuntu/pool/main/g/glibc/libc6_2.37-0ubuntu2_i386.deb)         | 2.8 MiB | 2023/3/16 19:09  |
| [libc6_2.37-0ubuntu2_amd64.deb](https://mirror.tuna.tsinghua.edu.cn/ubuntu/pool/main/g/glibc/libc6_2.37-0ubuntu2_amd64.deb)       | 3.0 MiB | 2023/3/16 20:09  |
| [libc6_2.31-0ubuntu9.12_amd64.deb](https://mirror.tuna.tsinghua.edu.cn/ubuntu/pool/main/g/glibc/libc6_2.31-0ubuntu9.12_amd64.deb) | 2.6 MiB | 2023/7/29 04:19  |
| [libc6_2.31-0ubuntu9.12_i386.deb](https://mirror.tuna.tsinghua.edu.cn/ubuntu/pool/main/g/glibc/libc6_2.31-0ubuntu9.12_i386.deb)   | 2.5 MiB | 2023/7/29 04:19  |
| [libc6_2.38-1ubuntu5_amd64.deb](https://mirror.tuna.tsinghua.edu.cn/ubuntu/pool/main/g/glibc/libc6_2.38-1ubuntu5_amd64.deb)       | 3.1 MiB | 2023/9/28 00:54  |
| [libc6_2.38-1ubuntu5_i386.deb](https://mirror.tuna.tsinghua.edu.cn/ubuntu/pool/main/g/glibc/libc6_2.38-1ubuntu5_i386.deb)         | 2.9 MiB | 2023/9/28 00:54  |
| [libc6_2.35-0ubuntu3.4_amd64.deb](https://mirror.tuna.tsinghua.edu.cn/ubuntu/pool/main/g/glibc/libc6_2.35-0ubuntu3.4_amd64.deb)   | 3.1 MiB | 2023/10/4 02:18  |
| [libc6_2.35-0ubuntu3.4_i386.deb](https://mirror.tuna.tsinghua.edu.cn/ubuntu/pool/main/g/glibc/libc6_2.35-0ubuntu3.4_i386.deb)     | 2.9 MiB | 2023/10/4 02:18  |
| [libc6_2.37-0ubuntu2.1_amd64.deb](https://mirror.tuna.tsinghua.edu.cn/ubuntu/pool/main/g/glibc/libc6_2.37-0ubuntu2.1_amd64.deb)   | 3.0 MiB | 2023/10/4 02:18  |
| [libc6_2.37-0ubuntu2.1_i386.deb](https://mirror.tuna.tsinghua.edu.cn/ubuntu/pool/main/g/glibc/libc6_2.37-0ubuntu2.1_i386.deb)     | 2.8 MiB | 2023/10/4 02:18  |
| [libc6_2.38-1ubuntu6_amd64.deb](https://mirror.tuna.tsinghua.edu.cn/ubuntu/pool/main/g/glibc/libc6_2.38-1ubuntu6_amd64.deb)       | 3.1 MiB | 2023/10/4 03:58  |
| [libc6_2.38-1ubuntu6_i386.deb](https://mirror.tuna.tsinghua.edu.cn/ubuntu/pool/main/g/glibc/libc6_2.38-1ubuntu6_i386.deb)         | 4.0 MiB | 2023-10-04 03:58 |
