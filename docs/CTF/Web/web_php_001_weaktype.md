# Toc

- [md5 弱比较 `md5(a) == md5(b)`](#md5amd5b)
- [md5 弱比较 `$a == md5($a)`](#md5md5md5)
- [md5 强比较 `md5($a) === md5($b)`](#md5amd5b-1)

| Expression                                         | Description              |
| -------------------------------------------------- | ------------------------ |
| assert(('admin' == 0) === true);                   | 弱类型字符串直接会转数字 |
| assert(("1admin" == 1) === true);                  |                          |
| assert(("admin1" == 0) === true);                  |                          |
| assert(("404a" == 404) === true);                  | 数字忽略字符串           |
| assert((1e3 == 1000) === true);                    |
| assert((true == 大于 0 的数) === true);            |                          |
| $check = 1 and 0;assert(boolval($check) === true); |                          |

## md5(a)==md5(b)

md5 后 0e 开头弱类型就能过

```sh
QNKCDZO
240610708
byGcY
sonZ7y
aabg7XSs
aabC9RqS
s878926199a
s155964671a
s214587387a
s1091221200a
```

## `$md5==md5($md5)`

| a             | b                                |
| ------------- | -------------------------------- |
| 0e215962017   | 0e291242476940776845150308577824 |
| 0e00275209979 | 0e551387587965716321018342879905 |
| 0e00506035745 | 0e224441551631909369101555335043 |
| 0e00540451811 | 0e057099852684304412663796608095 |
| 0e00678205148 | 0e934049274119262631743072394111 |
| 0e00741250258 | 0e899567782965109269932883593603 |
| 0e00928251504 | 0e148856674729228041723861799600 |
| 0e01350016114 | 0e769018222125751782256460324867 |
| 0e01352028862 | 0e388419153010508575572061606161 |
| 0e01392313004 | 0e793314107039222217518920037885 |
| 0e01875552079 | 0e780449305367629893512581736357 |
| 0e01975903983 | 0e317084484960342086618161584202 |
| 0e02042356163 | 0e335912055437180460060141819624 |
| 0e02218562930 | 0e151492820470888772364059321579 |
| 0e02451355147 | 0e866503534356013079241759641492 |
| 0e02739970294 | 0e894318228115677783240047043017 |
| 0e02760920150 | 0e413159393756646578537635311046 |
| 0e02784726287 | 0e433955189140949269100965859496 |
| 0e03298616350 | 0e851613188370453906408258609284 |
| 0e03393034171 | 0e077847024281996293485700020358 |

## md5(a)===md5(b)

1.数组绕过

```php
var_dump(md5($_GET['a']) == md5($_GET['b']))
绕过 md5($id) === md5($gg), 通过传入数组会返回NULL
v1[]=aaa&v2[]=bbb&v3=[]=1
```

2.md5 强类型绕过

2019 安洵杯 Web easy_web

```php
if((string)$_POST['a'] !== (string)$_POST['b'] && md5($_POST['a']) === md5($_POST['b']))
a=%4d%c9%68%ff%0e%e3%5c%20%95%72%d4%77%7b%72%15%87%d3%6f%a7%b2%1b%dc%56%b7%4a%3d%c0%78%3e%7b%95%18%af%bf%a2%00%a8%28%4b%f3%6e%8e%4b%55%b3%5f%42%75%93%d8%49%67%6d%a0%d1%55%5d%83%60%fb%5f%07%fe%a2
&b=%4d%c9%68%ff%0e%e3%5c%20%95%72%d4%77%7b%72%15%87%d3%6f%a7%b2%1b%dc%56%b7%4a%3d%c0%78%3e%7b%95%18%af%bf%a2%02%a8%28%4b%f3%6e%8e%4b%55%b3%5f%42%75%93%d8%49%67%6d%a0%d1%d5%5d%83%60%fb%5f%07%fe%a2

其他两组
$Param1="\x4d\xc9\x68\xff\x0e\xe3\x5c\x20\x95\x72\xd4\x77\x7b\x72\x15\x87\xd3\x6f\xa7\xb2\x1b\xdc\x56\xb7\x4a\x3d\xc0\x78\x3e\x7b\x95\x18\xaf\xbf\xa2\x00\xa8\x28\x4b\xf3\x6e\x8e\x4b\x55\xb3\x5f\x42\x75\x93\xd8\x49\x67\x6d\xa0\xd1\x55\x5d\x83\x60\xfb\x5f\x07\xfe\xa2";
$Param2="\x4d\xc9\x68\xff\x0e\xe3\x5c\x20\x95\x72\xd4\x77\x7b\x72\x15\x87\xd3\x6f\xa7\xb2\x1b\xdc\x56\xb7\x4a\x3d\xc0\x78\x3e\x7b\x95\x18\xaf\xbf\xa2\x02\xa8\x28\x4b\xf3\x6e\x8e\x4b\x55\xb3\x5f\x42\x75\x93\xd8\x49\x67\x6d\xa0\xd1\xd5\x5d\x83\x60\xfb\x5f\x07\xfe\xa2";

$data1="\xd1\x31\xdd\x02\xc5\xe6\xee\xc4\x69\x3d\x9a\x06\x98\xaf\xf9\x5c\x2f\xca\xb5\x07\x12\x46\x7e\xab\x40\x04\x58\x3e\xb8\xfb\x7f\x89\x55\xad\x34\x06\x09\xf4\xb3\x02\x83\xe4\x88\x83\x25\xf1\x41\x5a\x08\x51\x25\xe8\xf7\xcd\xc9\x9f\xd9\x1d\xbd\x72\x80\x37\x3c\x5b\xd8\x82\x3e\x31\x56\x34\x8f\x5b\xae\x6d\xac\xd4\x36\xc9\x19\xc6\xdd\x53\xe2\x34\x87\xda\x03\xfd\x02\x39\x63\x06\xd2\x48\xcd\xa0\xe9\x9f\x33\x42\x0f\x57\x7e\xe8\xce\x54\xb6\x70\x80\x28\x0d\x1e\xc6\x98\x21\xbc\xb6\xa8\x83\x93\x96\xf9\x65\xab\x6f\xf7\x2a\x70";
$data2="\xd1\x31\xdd\x02\xc5\xe6\xee\xc4\x69\x3d\x9a\x06\x98\xaf\xf9\x5c\x2f\xca\xb5\x87\x12\x46\x7e\xab\x40\x04\x58\x3e\xb8\xfb\x7f\x89\x55\xad\x34\x06\x09\xf4\xb3\x02\x83\xe4\x88\x83\x25\x71\x41\x5a\x08\x51\x25\xe8\xf7\xcd\xc9\x9f\xd9\x1d\xbd\xf2\x80\x37\x3c\x5b\xd8\x82\x3e\x31\x56\x34\x8f\x5b\xae\x6d\xac\xd4\x36\xc9\x19\xc6\xdd\x53\xe2\xb4\x87\xda\x03\xfd\x02\x39\x63\x06\xd2\x48\xcd\xa0\xe9\x9f\x33\x42\x0f\x57\x7e\xe8\xce\x54\xb6\x70\x80\xa8\x0d\x1e\xc6\x98\x21\xbc\xb6\xa8\x83\x93\x96\xf9\x65\x2b\x6f\xf7\x2a\x70";
```

[[极客大挑战 2020]Greatphp](https://blog.csdn.net/fmyyy1/article/details/117162062)

3. md5 强类型绕过 2 - Error 类绕过 md5 和 sha1

```php
$c = new Error($shell,1);$d = new Error($shell,2);
echo md5($c) === md5($d);
```
