[几种反序列化漏洞](https://mp.weixin.qq.com/s/PoM_1wmPH8T2EkwOKGrCLA)

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