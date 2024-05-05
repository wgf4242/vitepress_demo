[minil2022 risc-v](https://hzlg.github.io/2022/05/04/game/minil2022/risc-v/)

# 安装环境

```sh
sudo apt install qemu-user-static qemu-system-mips
# mips
sudo apt install -y gcc-mips-linux-gnu
# riscv
sudo apt install -y libc6-riscv64-cross
## lib在 /usr/riscv64-linux-gnu
## 运行 qemu-riscv64-static ./TCPL
sudo ln -s /usr/riscv64-linux-gnu/lib/ld-linux-riscv64-lp64d.so.1 /lib/ld-linux-riscv64-lp64d.so.1
```

运行

```sh
qemu-riscv64-static ./TCPL
```

# Article

- [【-使用 QEMU 模拟运行 Ubuntu 系统-哔哩哔哩】](https://www.bilibili.com/video/BV1R14y1r7oa/)
- [掌握 QEMU 虚拟化技术：搭建 ARM64+Linux 调试环境实战指南](https://mp.weixin.qq.com/s/1ak-L3TIWg7hr3gUpwX_Rg)
