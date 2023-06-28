
## Bypass_disable_function
ls 回显不对, 查看 Phpinfo是不是开启了 Bypass_disable_function, 

1.使用蚁剑 插件, 选择模式 - 例如: PHP7_Backtrace_UAF  即可

## echo 输出类函数

```php
$arr = array("apple", "banana", "cherry");
echo
print "Hello, World!";
var_dump($arr);
print_r($arr);
printf("There are %d monkeys in the %s.", 1, 2);
echo sprintf("There are %d monkeys in the %s.", 5, 'tree');
die("123");
exit("123")
$values = array(5, "tree");
vprintf("There are %d monkeys in the %s.", $values);
```