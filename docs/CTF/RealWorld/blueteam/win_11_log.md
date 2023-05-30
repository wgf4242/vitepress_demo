# Log Parser

下载地址：https://www.microsoft.com/en-us/download/details.aspx?id=24659

[Example](https://mlichtenberg.wordpress.com/2011/02/03/log-parser-rocks-more-than-50-examples/)

```sh
path "C:\Program Files (x86)\Log Parser 2.2";%path%
$env:path="C:\Program Files (x86)\Log Parser 2.2";$path
LogParser.exe -i:EVT -o:DATAGRID -q:ON "SELECT TOP 50 * FROM Security.evtx where (EventID=4624 OR EventID=4625 or EventID=4634) ORDER BY TimeGenerated DESC"
LogParser.exe -i:EVT -o:DATAGRID "SELECT * FROM E:\Security.evtx where EventID=4624"
LogParser.exe -i:EVT -o:DATAGRID "SELECT * FROM F:\Security.evtx WHERE EventID=4624 ORDER BY TimeGenerated DESC"
LogParser.exe -i:EVT -o:DATAGRID "SELECT * FROM F:\Security.evtx WHERE EventID=4624 OR EventID=4625 ORDER BY TimeGenerated DESC"
LogParser.exe -i:EVT -o:DATAGRID "SELECT * FROM Security.evtx where (EventID=4624 OR EventID=4625) AND Message LIKE '%源网络地址%'  ORDER BY TimeGenerated DESC"
LogParser.exe -i:EVT -o:DATAGRID "SELECT * FROM Security.evtx where (EventID=4624 OR EventID=4625 or EventID=4634) AND Message LIKE '%源网络地址%'  ORDER BY TimeGenerated DESC"

logparser file:XXXXX.sql 
logparser "SELECT * into OUTPUT.CSV FROM Security.evtx"
```

| id   | desc                   |
| ---- | ---------------------- |
| 4624 | 帐户已成功登录         |
| 4625 | 帐户登录失败           |
| 4648 | 试图使用明确的凭证登录 |
