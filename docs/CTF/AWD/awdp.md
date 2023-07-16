[恒星实验室竞赛经验分享（二）](https://www.bilibili.com/video/BV1N94y1D75B/)

Q: 打比赛修复 jar 怎么做
A: 直接 javac 编译的一个 class 文件，然后替换进去

- patch 防御技巧.pdf

# Web

- 替换删除 `<?`
- 注入上 waf

# Pwn

- 有符号数越界, 将 jle 改成 jbe ，即无符号比较，
- 格式化字符串漏洞
  - printf 修复: 改为 puts。 改为 call .plt \_puts 地址。直接输入\_puts 不行。
  - gets 函数 ret2text 通过 syscall 改 read
- Functions 进入 read 函数, view - open subviews - function calls 找出所有调用。
