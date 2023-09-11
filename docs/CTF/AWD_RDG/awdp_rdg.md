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

打防御包时, 不要用windows. 用linux或wsl, 打包完用 winrar 打开

* 看路径是 `.\xxx` 就可能失败

```bash
# update.sh
cp -rf default /etc/nginx/sites-enabled/

# create archive, 经测试 windows 也可以
tar zcvf fix.tar.gz *
```

# Web

- 替换删除 `<?`
- 上传类题目: 方式 1.把上传文件字节都修改掉.
- 注入上 waf
- 打包 jar
  - jar cf jar-file input-file(s)
- mvn/jar ReCaf 进行字节码 patch 20230710_Web.mp4
  - `mvn package`命令打包 要有 pom 文件.
- 准备一个高版本 1.xx 2.xx fastjson 的 jar 文件.

## java 题目

1. jar 改为 zip 解压。找到 lib。放到 src 下。
2. IDEA 中找到 lib，右击 Add As Library
3. 修复错误。
4. 编译运行。
5. 替换 class, 看下源 class 文件的包名

```sh
mkdir -p BOOT-INF/classes.com/forge/controller
cp PetController.class BOOT-INF/classes.com/forge/controller
jar uf forge-0.0.1-SNAPSHOT.jar BOOT-INF/classes.com/forge/controller/PetController.class
```

## py 类题目:

2.py 查看装饰器顺序,和返回值...整理一下相关代码.. main.py

返回值

```py
    @classmethod
    def sanitizer_add_res(cls, func):
        cls.sanitizer_list_res.append(func)
        return func
```

装饰器, 验证要放在路由后面

```py
@app.route('/admin/console')
@login_required
def admin():
    file_content = None

    if 'file' in request.args:
        file_name = request.args.get('file')
```

# Pwn

- IDA 插件 VulFi, Search - VulFi
- 有符号数越界, 将 jle 改成 jbe ，即无符号比较，
- functions 找 read 函数 ,view - open subviews - function calls 找出所有调用。
- 格式化字符串漏洞
  - printf 修复: 改为 puts。 改为 call .plt \_puts 地址。直接输入\_puts 不行。
    - printf 没有换行符, puts 会有换行符. 产生多余的换行可能 check 失败.
  - gets 函数 ret2text 通过 syscall 改 read

# 中间件防御检查

## tomcat

[readonly](../Web/exp/apache/tomcat-CVE-2017-12615-readonly-false.md) 
2. tomcat-users.xml 修改密码
