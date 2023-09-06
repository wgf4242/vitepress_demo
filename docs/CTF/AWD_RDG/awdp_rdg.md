[恒星实验室竞赛经验分享（二）](https://www.bilibili.com/video/BV1N94y1D75B/)

Q: 打比赛修复 jar 怎么做
A: 直接 javac 编译的一个 class 文件，然后替换进去

- patch 防御技巧.pdf

# 服务器操作

```bash
ps -aux
# 下载文件
sz filename
# 上传文件
rz

# 中间件
cd /etc/nginx/sites-enabled && ls
```

打防御包时

```bash
# update.sh
cp -rf default /etc/nginx/sites-enabled/

# create archive
tar zcvf fix.tar.gz *
```

# Web

- 替换删除 `<?`
- 注入上 waf
- 打包 jar
  - jar cf jar-file input-file(s)
- mvn/jar ReCaf 进行字节码 patch 20230710_Web.mp4
  - `mvn package`命令打包 要有 pom 文件.
- 准备一个高版本 1.xx 2.xx fastjson 的 jar 文件.

# Pwn

- IDA 插件 VulFi, Search - VulFi
- 有符号数越界, 将 jle 改成 jbe ，即无符号比较，
- functions 找 read 函数 ,view - open subviews - function calls 找出所有调用。
- 格式化字符串漏洞
  - printf 修复: 改为 puts。 改为 call .plt \_puts 地址。直接输入\_puts 不行。
  - gets 函数 ret2text 通过 syscall 改 read

# 中间件防御检查
