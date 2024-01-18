## hashcat 爆破 rar 密码

windows 用 6.2.3

https://www.cnblogs.com/chk141/p/12220288.html

不支持 rar4 文件。

### john hash 处理

```sh
1help.zip/1help:$zip2$*0*3*0*07aa3a0e1c77224a9311*$/zip2$:1help:1help.zip:1help.zip
# 删除两侧$外的文件名及内容
zip2$*0*3*0*07aa3a0e1c77224a9311*$/zip2$
```

### 常用参数

```sh
hashcat -m 13600 test.hash -O wordlist.txt
hashcat -m 17200 test.hash -O rockyou.txt  # zip
hashcat -m 13600 test.hash -O -a 3  --increment --increment-min 1 --increment-max 8 ?d?d?d?d?d?d?d?d
hashcat -m 13600 test.hash -O -a 3  --increment --increment-min 5 --increment-max 8 root?d?d?d?d?d?d?d?d
hashcat -m 13600 test.hash -O -a 3  --increment --increment-min 5 --increment-max 9 admin?d?d?d?d?d?d?d?d
hashcat -m 13600 test.hash -O -a 3  --increment --increment-min 8 --increment-max 12 P@ssw0rd?d?d?d?d
hashcat -m 13600 test.hash -O -a 3  --increment --increment-min 3 --increment-max 8 KEY?u?u?u?u?u?u?u?u
hashcat -m 13600 test.hash -O -a 3  --increment --increment-min 1 --increment-max 6 ?l?l?l?l?l?l?l?l
hashcat -m 13600 test.hash -O -a 3 -1 ?l?u?d?s  --increment --increment-min 1 --increment-max 4 ?1?1?1?1?1?1
## NTLM 3字母+@+4数字
hashcat -O -m 1000 5bf4cb79033c48ce90a613a2c04aa6d3 -a 3 ?l?l?l?a?d?d?d?d --force
## NTLM 4字母(首字母大写)+@+3数字
hashcat -O -m 1000 8443248e2eb382500141a033f4ad5534 -a 3 -1 ?l?u ?1?l?l?l?a?d?d?d --force


hashcat --stdout -a 3 testtest?l?l?lTESTTEST | head  # 输出掩码字典
hashcat --stdout -a 3 hash.txt mask_file.hcmask | head # hcmask 内可为多行俺码

hashcat -O -m 0 da974531914a7c2c56df745574a5bd3a -a 3 rockyou.txt
hashcat -O -m 0 da974531914a7c2c56df745574a5bd3a -a 3 mask_file.hcmask
```

### 参数

```
-a  指定要使用的破解模式，其值参考后面对参数。"-a 0"字典攻击，"-a 1" 组合攻击；"-a 3"掩码攻击。
-a 3 https://hashcat.net/wiki/doku.php?id=mask_attack
-m  指定要破解的hash类型，如果不指定类型，则默认是MD5
-o  指定破解成功后的hash及所对应的明文密码的存放位置,可以用它把破解成功的hash写到指定的文件中
--force 忽略破解过程中的警告信息,跑单条hash可能需要加上此选项
--show  显示已经破解的hash及该hash所对应的明文
--increment  启用增量破解模式,你可以利用此模式让hashcat在指定的密码长度范围内执行破解过程
--increment-min  密码最小长度,后面直接等于一个整数即可,配置increment模式一起使用
--increment-max  密码最大长度,同上
--outfile-format 指定破解结果的输出格式id,默认是3
--username   忽略hash文件中的指定的用户名,在破解linux系统用户密码hash可能会用到
--remove     删除已被破解成功的hash
-r       使用自定义破解规则
```

### 攻击模式

hashcat --help 查看所有模式

| #   | Mode                                    |
| --- | --------------------------------------- |
| 0   | Straight（字段破解）                    |
| 1   | Combination（组合破解）                 |
| 3   | Brute-force（掩码暴力破解）             |
| 6   | Hybrid Wordlist + Mask（字典+掩码破解） |
| 7   | Hybrid Mask + Wordlist（掩码+字典破解） |

### HashId/HashMode

https://hashcat.net/wiki/doku.php?id=example_hashes

```
12500    RAR3-hp    $RAR3$*0*45109af8ab5f297a*adbf6c5385d7a40373e8f77d7b89d317
13000    RAR5       $rar5$16$74575567518807622265582327032280$15$f8b4064de34ac02ecabfe
100      SHA1
17220 | PKZIP (Compressed Multi-File)                       | Archives
17200 | PKZIP (Compressed)                                  | Archives

```

### 掩码设置

| letter | char                                | description                    |
| ------ | ----------------------------------- | ------------------------------ |
| l      | abcdefghijklmnopqrstuvwxyz          | 纯小写字母                     |
| u      | ABCDEFGHIJKLMNOPQRSTUVWXYZ          | 纯大写字母                     |
| d      | 0123456789                          | 纯数字                         |
| h      | 0123456789abcdef                    | 常见小写子目录和数字           |
| H      | 0123456789ABCDEF                    | 常见大写字母和数字             |
| s      | !"#$%&'()\*+,-./:;<=>?@[\]^\_`{\|}~ | 特殊字符                       |
| a      | ?l?u?d?s                            | 键盘上所有可见的字符           |
| b      | 0x00 - 0xff                         | 可能是用来匹配像空格这种密码的 |

八位数字密码: ?d?d?d?d?d?d?d?d
八位未知密码: ?a?a?a?a?a?a?a?a
前四位为大写字母，后面四位为数字: ?u?u?u?u?d?d?d?d
前四位为数字或者是小写字母，后四位为大写字母或者数字: ?h?h?h?h?H?H?H?H
前三个字符未知，中间为 admin，后三位未知: ?a?a?aadmin?a?a?a
6-8 位数字密码: --increment --increment-min 6 --increment-max 8 ?l?l?l?l?l?l?l?l
6-8 位数字+小写字母密码: --increment --increment-min 6 --increment-max 8 ?h?h?h?h?h?h?h?h

--custom-charset1 abcd123456!@-+。然后我们就可以用"?1"去表示这个字符集了
--custom-charset2 ?l?d，这里和?2 就等价于?h

最多支持 4 组
--custom-charset1 [chars]等价于 -1
--custom-charset2 [chars]等价于 -2
--custom-charset3 [chars]等价于 -3
--custom-charset4 [chars]等价于 -4
在掩码中用?1、?2、?3、?4 来表示。
--custom-charset1 abcd123456!@-+。然后我们就可以用"?1"去表示这个字符集了
--custom-charset2 ?l?d，这里和?2 就等价于?h
--custom-charset3 ?h!@-+

#### 掩码 .hcmask

.hcmask file contains some valid example lines which show how to use this feature:

```sh
?d?l,test?1?1?1
abcdef,0123,ABC,789,?3?3?3?1?1?1?1?2?2?4?4?4?4
company?d?d?d?d?d
?l?l?l?l?d?d?d?d?d?d
?u?l,?s?d,?1?a?a?a?a?2
```

## 爆破实例

-O 速度快
测试 rockyou.txt 字典
爆破多尝试 admin/root + 数字 3.大写字母 +数字 4.小写字母 +数字
用户名:身份证号 密码:后 6 位
wifi 最多爆到 root12222

### MD5

```sh
md5 dict.txt
hashcat.exe -a 0 -m 0 --force 5a690d842935c51f26f473e025c1b97a  rockyou.txt

#多字典模式 https://hashcat.net/wiki/doku.php?id=frequently_asked_questions#how_to_use_multiple_dictionaries
hashcat.bin -m 0 -a 0 hash.txt dict1.txt dict2.txt dict3.txt
hashcat.bin -m 0 -a 0 hash.txt ../my_files/*.dict
## 指定文件夹
hashcat.bin -m 0 -a 0 hash.txt wordlists

7位数字破解
hashcat.exe -a 3 -O -m 0 --force 25c3e88f81b4853f2a8faacad4c871b6 ?d?d?d?d?d?d?d

7位掩码破解
hashcat.exe -a 3 -O -m 0 --force 6f73684294324280a40c053404133bec  flag{?d?d?d?d?d?d?d}       # powershell {}要转义加`

7位小写字母破解:
hashcat.exe -a 3 -O -m 0 --force 7a47c6db227df60a6d67245d7d8063f3

1-8位数字破解:
hashcat.exe -a 3 -O -m 0 --force 4488cec2aea535179e085367d8a17d75 --increment --increment-min 1 --increment-max 8 ?d?d?d?d?d?d?d?d

1-8位小写字母+数字破解
hashcat.exe -a 3 -O -m 0 --force ab65d749cba1656ca11dfa1cc2383102 --increment --increment-min 1 --increment-max 8 ?h?h?h?h?h?h?h?h
hashcat.exe -a 3 -O -m 0 --force ab65d749cba1656ca11dfa1cc2383102  --increment --increment-min 1 --increment-max 8 --custom-charset1=?l?u?d ?1?1?1?1?1?1?1?1


特定字符集: 123456abcdf!@+-
hashcat.exe -a 3 -1 123456abcdf!@+- 8b78ba5089b11326290bc15cf0b9a07d ?1?1?1?1?1
```

### zip 攻击 7 位大小写+数字

```sh
hashcat -m 17220 -O -a 3 test.hash --increment --increment-min 1 --increment-max 8 --custom-charset1=?u?d ?1?1?1?1?1?1?1?1

hashcat -m 17210 -O -a 3 test.hash --increment --increment-min 1 --increment-max 8 --custom-charset1=?u?d ?1?1?1?1?1?1?1?1
hashcat -m 17210 -O -a 3 test.hash --increment --increment-min 1 --increment-max 8 --custom-charset1=?l?d ?1?1?1?1?1?1?1?1
hashcat -m 17210 -O -a 3 test.hash --increment --increment-min 1 --increment-max 8 --custom-charset1=?l?u?d ?1?1?1?1?1?1?1?1
hashcat -m 17210 -O -a 3 test.hash --custom-charset1=?l?u?d ?1?1?1?1?1?1?1?1
hashcat -m 17210 -O -a 3 test.hash --custom-charset1=?l?u?d ?1?1?1?1?1?1?1?1
hashcat -m 17210 -O -a 3 test.hash -1 ?l?u?d ?1?1?1?1?1?1?1?1  # 简写
hashcat -m 17210 -O -a 3 test.hash --custom-charset1=?l?u?d  --increment --increment-min 1 --increment-max 8  ?1?1?1?1?1?1?1?1
hashcat -m 17200 -O -a 3 test.hash --custom-charset1=?l?u?d  --increment --increment-min 1 --increment-max 8  ?1?1?1?1?1?1?1?1

# session, checkpoint and restore
#执行后 按下c保存 checkpoint, 再用 --restore 继续
hashcat -m 17220 -O -a 3 test.hash --increment --increment-min 1 --increment-max 8 --custom-charset1=?a ?1?1?1?1?1?1?1?1
hashcat --restore
# with session name
hashcat -m 17220 -O -a 3 test.hash --session session_name --increment --increment-min 1 --increment-max 8 --custom-charset1=?u?d ?1?1?1?1?1?1?1?1
hashcat --session session_name --restore
```

### zip 攻击/AES-256

```sh
zip2john.exe run.zip > hash.txt
# john 也可以爆破 慢一点
# john hash.txt -w=F:\downloads\@CTF\hashcat-6.2.3\rockyou.txt --format=zip

cut -d ':' -f 2 hash.txt > test.hash
hashcat -m 13600 test.hash -O rockyou.txt
hashcat -m 13600 test.hash -O -a 3  --increment --increment-min 1 --increment-max 8 ?d?d?d?d?d?d?d?d
```

### rar5 攻击

```sh
rar2john @list.rar | sed 's/^.*://g'>test.hash
$rar5$16$db3d60d27258f6210cc73f57c0f40e65$15$d8e6585d8f8d4843e21c3ca16160c6cb$8$6bba2cbd2b0120d8
hashcat -m 13000 -O -a 3 test.hash --increment --increment-min 1 --increment-max 8 ?d?d?d?d?d?d?d?d
hashcat -m 13000 -O -a 0 test.hash pwd.txt
```

### crc32

```sh
hashcat -m 11500 d2b184ff:00000000 -O -a 3  --increment --increment-min 1 --increment-max 4 ?a?a?a?a
hashcat -m 11500 -a 0 hash.txt passwordlist.txt
hashcat -m 11500 -a 3 crc32.txt ?b?b?b
hashcat -m 11500 crc32.txt -O -a 3 ?b?b?b --outfile-format=1,3
hashcat -m 11500 crc32.txt -O -a 3 ?b?b?b --outfile-format=1,3 --show -o result.txt
```

### deepsound

```s
deepsound2john.py file > 1.hash
john 1.hash
```

7z

```sh
7z2john 7zdecrypt.txt.7z > 7z.hash
hashcat.exe -m 11600 -a 3 $7z$2$19$0$$16$abc477f84f711f5530432e64418c8392$3167568243$16$12$40a31f0f88ac7b9a9acdc6cbb7d23f23$8$00
# 6位小写字母+数字破解
.\hashcat.exe -m 11600 -a 3 test.hash ?h?h?h?h?h?h
.\hashcat.exe -m 11600 -O -a 3 test.hash ?h?h?h?h?h?h
```

keepass

```
hashcat -m 13400 -a 3 test.hash --increment --increment-min 1 --increment-max 8 ?d?d?d?d?d?d?d?d
hashcat -m 13400 keepass.txt -a 0 password.txt --force  # 字典方式
```

sha1
hashcat -m 100 -a 3 test.hash ?d?d?d?d?d?d
6 位字符+@DBApp
hashcat -m 100 -O -a 3 test.hash ?d?d?d?d?d?d@DBApp
hashcat -m 100 -O -a 3 test.hash --increment --increment-min 1 --increment-max 8 ?d?d?d?d?d?d?d?d

sha256
avytGP+4 位字符
hashcat -m 1400 -O -a 3 26d601e47a170bf796f0c1568febbc6fd40ba7a894668c2829e31dfccd35e34f avytGP?1?1?1?1 --custom-charset1=?l?u?d

WPA/CAP/Wifi

```sh
# 转成 hashcat 格式
aircrack-ng 01.cap -j hashcat

hashcat -m 2500 test.hccap pass.txt
hashcat -a 0 -O -m 2500 hashcat.hccapx dic.txt
hashcat -O -a 3 -m 2500 hashcat.hccapx --increment --increment-min 1 --increment-max 9 root?d?d?d?d?d?d?d?d?d
hashcat -O -a 3 -m 2500 hashcat.hccapx --increment --increment-min 1 --increment-max 9 ?d?d?d?d?d?d?d?d?d
hashcat -O -a 3 -m 2500 hashcat.hccapx --increment --increment-min 1 --increment-max 8 ?1?1?1?1?1?1?1?1  --custom-charset1=?l?u?d
hashcat -O -a 3 -m 2500 hashcat.hccapx  ?1?1?1?1?1?1?1  --custom-charset1=?l?u?d
hashcat -O -a 3 -m 2500 hashcat.hccapx 1391040?d?d?d?d #跑4位数字密码
```

$pkzip2$ -m 17225
hashcat -a 3 -O -m 17225 111.hash --increment --increment-min 1 --increment-max=9 ?d?d?d?d?d?d?d?d?d
hashcat -a 3 -O -m 17225 111.hash --increment --increment-min 1 --increment-max 8 ?1?1?1?1?1?1?1?1 --custom-charset1=?l?u?d

keepass

```
keepass2john file # 去掉文件名保留这种 $keepass$*2*6000*222*15b6b685bae998f2f608c90,
hashcat -m 13400 -a 3 -w 1 hash.txt --increment --increment-min 1 --increment-max 8 ?h?h?h?h?h?h?h?h
hashcat -m 13400 -a 3 -w 1 hash.txt --custom-charset3 ?h!@-+ --increment --increment-min 1 --increment-max 8 ?3?3?3?3?3?3?3?3
```

shadow

```sh
cat hashes.txt # 下面可以直接在线破解
$1$Bg1H/4mz$X89TqH7tpi9dX1B9j5YsF.

hashcat -O -m 500 -a 0 hashes.txt rockyou.txt -o cracked.txt
hashcat -O -m 500 -a 0 -o cracked.txt hashes.txt /usr/share/wordlists/sqlmap.txt
hashcat -O -m 500 -a 3 -o cracked.txt shadow ?l?l?l?l
```

## JWT

```sh
hashcat -m 16500 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNTc0ODM1MzE0LCJleHAiOjE1Nzc0MjczMTR9.GXWX72f5PQi4unRvF3eh6oPziUUr_iVxMyUL5NFlulU rockyou.txt
```

## veracrypt

```sh
## 通常是29421-29423
hashcat -a 3 -m 29421 2.txt ?d?d?d?d?d?d
```

## domain

### NTLM

[流量包分析](../Misc/misc_pcapng.md#ntlm)

```sh
hashcat -O -m 1000 161cff084477fe596a5db81874498a24 dict.txt

hashcat -m 5600 test.hash rockyou.txt
hashcat -m 5600 a::192.168.62.139:c0b5429111f9c5f4:a5f1c47844e5b3b9c6f67736a2e1916d:0101000000000000669dae86ba8bd301a9134eee81ca25de0000000002001e00570049004e002d003100550041004200430047004200470049005500330001001e00570049004e002d003100550041004200430047004200470049005500330004001e00570049004e002d003100550041004200430047004200470049005500330003001e00570049004e002d003100550041004200430047004200470049005500330007000800669dae86ba8bd30106000400020000000800300030000000000000000000000000300000e9d9e613613097d1e2f47c1fd97fa099f65dfd78075d8bdb5ca162492ea5d2990a001000000000000000000000000000000000000900260063006900660073002f003100390032002e003100360038002e00360032002e00310033003900000000000000000000000000 /tmp/password.list -o found.txt --force
```

### Kerberos 5, AS-REP

```sh
hashcat -m 18200 --force -a 0 '$krb5asrep$23$lixiuying@xiaorang.lab@XIAORANG.LAB:e5b9df0a854b830ce5f6e5ffe2499d71$d9d9dc060842070cd86a8ecae9e214d3a0ca14b815dc3c39e39c02a33d8e905757ff35a61a31e6dae59482b894e391be7ac67d4f7f484c37cc1dd80c93be6c30ac3a3e8217380170959db080a27cf29adff473385a7c554fe06c8512039f90255f853ce5be6e456377d5aec2530e674ac79c79bae51343f0150105c46703f0a7f1ba694e72c5b4d24aea907e04c33579b7601bda211fa28e0704115de88b9c073ab8863108a2013e8ec447163ec837615ca4dce0798bfdc3424400bdb37a5f0c0497ba4d7b4da0b56c726aca69ef6234ce75776b5bed88c814ec1d0b75b64cb38e94ff66ef5ef3b0a4b4ac8b' ./rockyou.txt
```

### SPN ST, TGS-REP

13100 - Kerberos 5, etype 23, TGS-REP

```bash
hashcat -m 13100 output.txt rockyou.txt --force
```

# john

## shadow

```sh
unshadow passwd.txt shadow.txt > passwords.txt
john --wordlist=/usr/share/wordlists/sqlmap.txt passwords.txt
john shadow --format=NT # filename: shadow


john -1='02' -mask=091?1?d?d?d?d?d?d --stdout | head # ?1 表示使用占位符1 即 02


/etc/shadow中密码格式：
$id$salt$encrypted
$1$2eWq10AC$NaQqalCk3
# $1表示使用了基于MD5的加密算法。
# $2a$04$NZJWn7W2skvQRC5lW3H7q.ZTE8bz4xbC 2a表示Blowfish算法。

# 示例 root:$1$NAkZFH1u$byy9Vl8PSU3dJl5MicArx1:18446:0:99999:7:::
hashcat -m 500 -a 0 1 1NAkZFH1u$byy9Vl8PSU3dJl5MicArx1 wordlist.txt
# crack2.hash  $6$Cqi.....1R/
hashcat -m 1800 test.hash -a 3 --force  ?l?l?l?l
hashcat -m 1800 -a 0 -o found2.txt --remove crack2.hash 500_passwords.txt
hashcat -m 1800 -a 3 --force $6$mxuA5cdy$XZRk0CvnPFqOgVopqiPEFAFK72SogKVwwwp7gWaUOb7b6tVwfCpcSUsCEk64ktLLYmzyew/xd0O0hPG/yrm2X. ?l?l?l?l
```

| ID  | 算法     | -m   | Desc                                      |
| --- | -------- | ---- | ----------------------------------------- |
| 1   | MD5      | 0500 | md5crypt, MD5 (Unix), Cisco-IOS $1$ (MD5) |
| 2a  | Blowfish | 3200 | bcrypt $2*$, Blowfish (Unix)              |
| 5   | SHA-256  | 7400 | sha256crypt $5$, SHA256 (Unix)            |
| 6   | SHA-512  | 1800 | sha512crypt $6$, SHA512 (Unix)            |
|     |          | 122  | macOS v10.4, MacOS v10.5, MacOS v10.6     |
|     |          | 1722 | macOS v10.7                               |
|     |          | 7100 | macOS v10.8+ (PBKDF2-SHA512)              |
