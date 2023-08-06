# 社会工程学

xx 石化 xxsh + 4 位[小写/数字]

# crunch 生成字典

不指定字符集默认是 26 个小写字母

```bash
crunch 5 5 0123456789 -o password.txt # 0-9选5位
crunch 5 5 0123456789 -o password.txt -z 7z # 0-9选5位

crunch 3 3 1234567890 -c 10           # 只生成10行字典后面的不要
crunch 1 5 -o START -c 6000 -z bzip2  # 6000个密码/每文件

crunch 3 3 0123456789 -o pwd.txt
crunch 3 3 0123456789 > pwd.txt

crunch 4 4 -t abc%                    # abc[0-9]

#-b 20mib 指的是单个文件的大小，支持kb,mb,gb,kib,mib,gib，
#前三种之间的进制是1000，后三种进制是1024
crunch 1 10 -b 20mib -o START                  # 不填默认是 a-z 生成
crunch 1 10 1234567890 -b 10mb -o START        # 10mb 1个文件

crunch 3 3 0123456789 -s 666 > pwd.txt         # 666-999 -s:start -e: end
crunch 3 3 0123456789 -s 666 -e 888 > pwd.txt  # 666-888

crunch 3 3 abc + 123 @#! -t @%^
#3位密码，1为 [abc]；2为 [123]；3为 [!@#]。比如1a！2a# 3b@   ......

crunch 1 6 abc\
#1-6位 由abc和空格为元素的所有组合（\代表空格）

crunch 7 7 –t ddd^,@% -p a b c
#生成7个元素组成的密码，其中前三个为 a b c任意组合， 第四位为符号，第五位为大写字母，第六位为小写字母，第七位为数字 。比如abc!Aa1   bac!Aa1      ......
#  d 是从 -p 里面的字符串随机组合，1个d就代表1位。

crunch 7 7 -t p@ss,%^ -l a@aaaaa -o pass_dict.txt    # cmd下^需要转义 用powershell执行吧
crunch 11 11 -t "@@@@Mes@2.0" -l "aaaaaaa@aaa" -o 1.txt  # 4个小写 + Mes@2.0结尾
crunch 11 11 -t "@@@@Mes@2.0" -f charset.lst mixalpha -l "aaaaaaa@aaa" -o 1.txt
#生成7位密码，格式为"字符p@ss"+大写字母+数字+符号     比如  p@ssZ9>  ......\\
#  -l 指定t中哪些字符为普通字符, 一一对应
```

| index | src | desc      |
| ----- | --- | --------- |
| a     | p   | 按 p 输出 |
| @     | @   | 按@输出   |
| a     | s   | 按 s 输出 |
| a     | s   | 按 s 输出 |
| a     | ,   | 大写      |
| a     | %   | 数字      |
| a     | ^   | 符号      |

```sh
crunch 5 5 -d 2@ -t @@@%%                                #5位密码，三个字母+两个数字，并限制每个密码最少出现2种字母
crunch 10 10 -t @@@^%%%%^^ -d 2@ -d 3% -b 20mb -o START  #生成10位密码，格式为三个小写字母+一个符号+四个数字+两个符号，限制每个密码至少2种字母和至少3种数字

crunch 4 4 -f unicode_test.lst the-greeks -t @@%% -l @xdd
#调用密码库unicode_test.lst中的the-greeks项目字符，生成4位密码，其中格式为两小写字母+两数字
```

`crunch <min-len> <max-len> [<charset string>] [options]`

| Param                              | E.g                       | Desc                                                      |
| ---------------------------------- | ------------------------- | --------------------------------------------------------- |
| -d numbersymbol                    | -d 2@                     | 小写只能出现 2 次                                         |
| -s startblock                      | -s 03god22fs              | Specifies a starting string,                              |
| -e string                          |                           | Specifies when crunch should stop early                   |
| -c number                          |                           | 生成密码数量                                              |
| -t                                 |                           | 自定义占位符见下面 min,max 必须相等                       |
| -f /usr/charset.lst <charset-name> |                           | Specifies a character set from the charset.lst            |
|                                    | mixalpha                  | 大小写                                                    |
|                                    | mixalpha-numeric          | 大小写数字                                                |
|                                    | mixalpha-numeric-symbol14 | 大小写/数字/字符                                          |
| +                                  |                           | 占位符-指定字符集, +为默认[@%^]的原字符集, 可以指定字符集 |

```bash
crunch 1 3 -f charset.lst mixalpha -o lower_upper.txt            # 1-3位大小写
crunch 3 3 123 + + + -t ^%@>11                                   # 倒序, [@][%][1-3] 使用+为默认字符集
crunch 3 3 -t @@@ -f charset.lst mixalpha -o lower_upper.txt     # 3位大小写字典
crunch 6 6 0123456789abcdef -o 6chars.txt                        # 用给定字符生成6位密码
crunch 4 4 abcd + 1234 "@#!*" -t ^^%@ -o out.txt                 # 4位密码，"2字符+1数字+字母" 且字符范围是 @#!*, 数字范围是 1234, 字母范围是 abcd; 倒序 最后1位是 [abcd], 倒数2位是 1234 倒数3位是 @#!*
crunch 3 3 123 + !@# abc -t ^%@                                  # 倒过来 [abc][!@#][123] 组合
crunch 4 4 "xyz" "PQRST"  -t "@,@1" -o password.txt              # [xyz][PQRST][xyz]1
crunch 10 10 -t @@@^%%%%^^ -d 2@ -d 3% -b 20mb -o START
# crunch will generate 10 character strings starting with aab!0001!! and ending at zzy 9998    The output will be written to 20mb files.
crunch 8 8 -d 2@
# crunch will generate 8 characters that limit the same number of lower case characters to 2.  Crunch will start at aabaabaa and end at zzyzzyzz.
```

## -p 参数

min, max 失效

```sh
crunch 4 5 -p dog cat # 单词组合 catdog dogcat
crunch 4 5 -p dog     # 字母组合 dgo dog gdo god odg ogd
```

## -t 占位符

| symbol | desc                  |
| ------ | --------------------- |
| @      | lower case characters |
| ,      | upper case characters |
| %      | numbers               |
| ^      | symbols               |

```sh
crunch 4 4 -t @,%^ -o pwd.txt

# -l 指定t中哪些字符为普通字符t 长度要一致
crunch 3 3 -t 6%%        -o pwd.txt #生成600到699的字典 共100行
crunch 3 3 -t 6%% -l 6%1 -o pwd.txt #生成6%0到6%9的字典 共10行
```

## 使用已有的字符集

```
#可以看下/usr/share/crunch/charset.lst里面都是有什么字符集
crunch 4 4 -f /usr/share/crunch/charset.lst numeric
```

## 限定出现的次数

```
#crunch 4 4 会生成从aaaa到zzzz的字典
#加参数后同一个小写字母不会出现连续两次以上 -- 不出现aaa,aaaa
#需要使用占位符 @ ， %  ^ 来表示限定
crunch 4 4 -d 2@ -o pwd.txt

#逆向输出结果
#原来是abc变成cba
crunch 3 3 -i

#以压缩包的形式保存字典,支持的格式gzip, bzip2, lzma, 7z
#必须用-o 用 > 不会生成压缩包
crunch 3 3 0123456789 -o START -z gzip

```

## -p,-q 连接字符

-p 参数 和 -q 参数效果一样，不过-q 是从文件读入字符集

-p 字符集组合 min,max 随便填

```sh
crunch 0 0 -p a b c
crunch 0 0 -p abc

# 社工 - 小明生日
crunch 0 0 -p xiaoming 0101 .
# .0101xiaoming
# .xiaoming0101
# 0101.xiaoming
# 0101xiaoming.
# xiaoming.0101
# xiaoming0101.



sandrex198526        # ..社工 账号加生日
Xjiabao@             # 拼音加任意字符
xcj$19680308         # 拼音缩写+特殊字符+生日
Xbj+13359839551      # 拼音缩写+特殊字符+电话
WANGXUEping123       # 全拼大小写+数字
Wanggui2@2022        # 首字母大写+特殊字符+年
Wanggui123456@       # 首字母大写+123456+特殊字符
LZ/LZSH              # 企业名或企业名前2位字母+其他字符


-r参数 生成字典过程中异常中断，-r可以从上次中断的位置继续生成字典 -- 必须和-o一起用
crunch 0 6 0123456789 -o pwd.txt
crunch 0 6 0123456789 -o pwd.txt -r
```
社工密码字典在线生成：
[link1](https://api.xiaobaibk.com/lab/guess/)

[link2](https://www.bugku.com/mima/)
