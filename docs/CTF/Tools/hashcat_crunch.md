# crunch 生成字典

不指定字符集默认是26个小写字母

```bash
crunch 5 5 0123456789 -o password.txt # 0-9选5位

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

crunch 7 7 -t p@ss,%^ -l a@aaaaa
#生成7位密码，格式为"字符p@ss"+大写字母+数字+符号     比如  p@ssZ9>  ......\\
#  -l 指定t中哪些字符为普通字符, 一一对应

crunch 5 5 -d 2@ -t @@@%%                                #5位密码，三个字母+两个数字，并限制每个密码最少出现2种字母
crunch 10 10 -t @@@^%%%%^^ -d 2@ -d 3% -b 20mb -o START  #生成10位密码，格式为三个小写字母+一个符号+四个数字+两个符号，限制每个密码至少2种字母和至少3种数字

crunch 4 4 -f unicode_test.lst the-greeks -t @@%% -l @xdd
#调用密码库unicode_test.lst中的the-greeks项目字符，生成4位密码，其中格式为两小写字母+两数字
```


| Param     |  E.g    | Desc     |
| ---- | ---- | ---- |
| -d numbersymbol    |   -d 2@   | 小写只能出现2次  |

```bash
crunch 10 10 -t @@@^%%%%^^ -d 2@ -d 3% -b 20mb -o START
# crunch will generate 10 character strings starting with aab!0001!! and ending at zzy 9998    The output will be written to 20mb files.
crunch 8 8 -d 2@
# crunch will generate 8 characters that limit the same number of lower case characters to 2.  Crunch will start at aabaabaa and end at zzyzzyzz.
```

## -t 占位符

| @    | lower case characters |
| ---- | --------------------- |
| ,    | upper case characters |
| %    | numbers               |
| ^    | symbols               |
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
-p参数 和 -q 参数效果一样，不过-q是从文件读入字符集

-p字符集组合 min,max随便填
```
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


-r参数 生成字典过程中异常中断，-r可以从上次中断的位置继续生成字典 -- 必须和-o一起用
crunch 0 6 0123456789 -o pwd.txt
crunch 0 6 0123456789 -o pwd.txt -r
```

```
hashcat -m 13400 keepass.txt -a 0 password.txt --force
```
