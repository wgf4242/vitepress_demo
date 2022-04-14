# cmd/bat

## mshta

它支持命令行参数，可以接收JS和VBS的方法。看示例（在命令行下测试）：

JS:
> mshta vbscript:window.execScript("alert('hello world!');","javascript")
VBS:
> mshta javascript:window.execScript("msgBox('hello world!'):window.close","vbs")


## Windows Control


Reset Pin
```
icacls C:\Windows\ServiceProfiles\LocalService\AppData\Local\Microsoft\Ngc /T /Q /C /RESET
::set password
net user pcname P@ssw0rd1
```
