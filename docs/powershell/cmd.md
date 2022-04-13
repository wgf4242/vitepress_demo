# cmd/bat

## mshta

它支持命令行参数，可以接收JS和VBS的方法。看示例（在命令行下测试）：

JS:
> mshta vbscript:window.execScript("alert('hello world!');","javascript")
VBS:
> mshta javascript:window.execScript("msgBox('hello world!'):window.close","vbs")

