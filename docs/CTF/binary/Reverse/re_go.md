## Go语言
使用 ida8.3 free 或 ida77 加载后 Alt+F7 go_parser.py

入口 main_main
os_stdout, fmt_Fprint fmt_Fprintln fmt_Fscanf

```bash
go version xx.exe
go version -m xxx.exe
# 去符号
go build -o hello -ldflags '-s -w' hello.go
-s
	Omit the symbol table and debug information.
-w
	Omit the DWARF symbol table.
# 所有标志位含义: https://pkg.go.dev/cmd/link  ,可以通过一些脚本恢复回来 https://www.cnblogs.com/-rvy-/p/16837987.html
```
## 代码示例

```sh
lea     rbx, aFlagfnofform   ; "flagfnofform"
mov     ecx, 4               ; 长度4, 即flag

lea     rbx, a200c2c3ef00f31 ; "200c2c3ef00f31999df93d6919aa33e42dde307"...
mov     ecx, 60h             ; 表示长度 96
```
## IDAGOHelper
File - Load Script, 加载文件

## Exercise
moectf MoeCTF2022_gogogo

# Article

[2022年春秋杯冬季赛_Godeep Go函数ida还原](https://mp.weixin.qq.com/s/tQzJWaAyUT119lNIp_Az7g)
[高版本go语言符号还原](https://mp.weixin.qq.com/s/-0bwLPIAPzABAnjMGbN-6Q)