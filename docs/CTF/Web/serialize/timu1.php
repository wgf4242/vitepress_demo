<!-- 
CVE-2016-7124(绕过__wakeup)复现
漏洞影响版本：
PHP5 < 5.6.25
PHP7 < 7.0.10
-->

<?php 
//听说flag在flag.php里面？？？？？？
header("Content-Type: text/html; charset=utf-8"); 
    error_reporting(0); 
    class sercet{ 
        private $file='index.php'; 
         // __construc  每次创建新对象时调用，所以__construct非常适合做初始化
        public function __construct($file){ 
            echo "_construct执行<br>";
            $this->file=$file; 
        } 
          //析构函数会在对某个对象所有引用都被删除或者被显式销毁时执行
        function __destruct(){ 
            echo " __destruct执行<br>";
          //  echo show_source($this->file,true); 
            echo @highlight_file($this->file, true); 
        } 
         
          //unserialize()先检查__wakeup是否存在，则会先调用__wakeup
        function __wakeup(){ 
            echo "__wakeup执行<br>";
            $this->file='index.php'; 
        } 
    } 
  
 unserialize($_GET['val']);

highlight_file(__FILE__);