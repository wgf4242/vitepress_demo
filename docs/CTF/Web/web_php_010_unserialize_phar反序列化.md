[几种反序列化漏洞](https://mp.weixin.qq.com/s/PoM_1wmPH8T2EkwOKGrCLA)
[PHP 反序列化从 0 到 1](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247496642&idx=1&sn=d1c120b862c75f586492ee9daf011f95)
[详解 PHP 反序列化字符逃匿](http://mp.weixin.qq.com/s?__biz=MzUzMDUxNTE1Mw==&mid=2247495677&idx=1&sn=8b5d7efcb290219f1af7029078d81012)

- 条件: PHP <= 7.4，7.4 是最后一个支持使用 phar 进行序列化的 PHP 版本

## call_user_func
[用call_user_func()来调用一个类里面的方法](https://www.php.net/manual/zh/function.call-user-func)
```php
<?php

class myclass {
    static function say_hello()
    {
        echo "Hello!\n";
    }
}

$classname = "myclass";

call_user_func(array($classname, 'say_hello'));
call_user_func($classname .'::say_hello');

$myobject = new myclass();
call_user_func(array($myobject, 'say_hello'));

?>
```


## bypass

`/[oc]:\d+:/i`  加一个加号即可
```ps1
 O:7:"Student":1:{s:1:"a";i:123;}  # =>
O:+7:"Student":1:{s:1:"a";i:123;}
```