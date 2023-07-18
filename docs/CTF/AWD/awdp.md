[恒星实验室竞赛经验分享（二）](https://www.bilibili.com/video/BV1N94y1D75B/)

Q: 打比赛修复jar怎么做
A: 直接javac编译的一个class文件，然后替换进去

# Web
- 替换删除 `<?`
- 注入上waf
# Pwn
- IDA插件 VulFi, Search - VulFi
- 有符号数越界, 将 jle 改成 jbe ，即无符号比较，
- functions 找 read 函数 ,view - open subviews -  function calls 找出所有调用。