## GDB 安装

找新版本

```
sudo apt remove gdb gdbserver
sudo apt-get install texinfo

whereis gdb
# rm all

cd ~/Downloads
curl -O http://ftp.gnu.org/gnu/gdb/gdb-9.2.tar.gz
curl -x http://192.168.50.161:1081 -O http://ftp.gnu.org/gnu/gdb/gdb-9.2.tar.gz

tar zxvf gdb-9.2.tar.gz
cd gdb-9.2
mkdir build && cd build
# `pwd`/../configure
`pwd`/../configure --with-python=/usr/bin/python3.8
`pwd`/../configure --with-python='/usr/bin/python3.8'
make
sudo make install
```

## 常用命令

调试 shellcode 使用 si, 而且由于 execve 会 fork 进程, 所以可能要删除其他断点按 c 继续.
[Link](https://blog.csdn.net/qq_39563369/article/details/103950922)

|             | cmd                                                      | desc                                                                    |
| ----------- | -------------------------------------------------------- | ----------------------------------------------------------------------- |
|             | set args <args>                                          | set args Hello World <br>run                                            |
|             | entry                                                    | Set a breakpoint at the first instruction executed in the target binary |
|             | ctx                                                      | 默认的 context 信息                                                     |
|             | b \_\_libc_start_main                                    | 条件断点 `break *0x56556228 if argc==1`                                 |
|             | b \*main                                                 | 禁用启用断点 `dis(able) Num` 和 `enable Num`                            |
|             | b 21                                                     | 有源代码时断在 21 行 <br>需编译时: `gcc -g main.c`                      |
|             | fmtargs 0x7fffe2d9                                       | 查看 printf 计算参数位置                                                |
|             | distance 0x90 0x86                                       | 计算距离                                                                |
|             | disass `Input` <br>disassemble 0x40123d                  | `disass(emble)` 查看 函数/地址 汇编                                     |
|             | !disasm eb01                                             | 将机器码 eb01 转汇编                                                    |
|             | p $esp <br>p stdout                                      | 输出 esp, p/x 32 -- 0x20 <br>输出 stdout 函数地址                       |
|             | `p (char**)environ`                                      | 输出 environ 指针                                                       |
|             | `p (char**)&environ`                                     | 输出 libc 中的 environ                                                  |
|             | `p/x &__bss_start`                                       | bss 段起始位置, ida 中能看到起始有这个标签                              |
|             | `x/16bx $fs_base + 0x28`                                 | fs 寄存器                                                               |
|             | `auxv`                                                   | 系统地址 , at_random 末尾改为 00 就是 canary                            |
|             | xuntil target                                            | Continue execution until an address or function                         |
|             | piebase                                                  |
|             | dumpargs                                                 | 显示 rdi rsi 等参数信息                                                 |
|             | ptype stdout                                             | 输出 stdout 结构体                                                      |
|             | tel <addr>                                               | 查看地址值                                                              |
|             | libc                                                     | 查看 libc 地址                                                          |
|             | got                                                      | 查看 got 表                                                             |
|             | search "AAAA"                                            | 直接搜索 "AAAA" 的地址, 查找栈/内存位置                                 |
|             | search -t dword 0x12a4b081                               | 搜索指定数值                                                            |
|             | search -t bytes "/bin/ls"                                | 搜索 bytes                                                              |
|             | search -x 4138                                           | 搜索 0x41, 0x38                                                         |
|             | k/backtrace                                              | 查看调用栈, `frame` 切换调用栈                                          |
|             | f                                                        | frame 可以看到当前在哪个模块哪个 c 文件中                               |
|             | `source <file>`                                          | 执行文件中的命令                                                        |
|             | `!ls <arg>`                                              | 执行命令 如 ls,                                                         |
|             | until <br>until location                                 | 跳过循环体 <br> 运行到指定位置                                          |
|             | list                                                     | 显示源代码, 需要编译时 -g                                               |
|             | info proc mappings                                       | 显示 进程内存段                                                         |
|             | [commands](#commands)                                    | 到达断点时自动执行多个命令,                                             |
|             | shell clear                                              | 清空屏幕 cls                                                            |
| -- debug -- |                                                          |
|             | list                                                     | 显示源码 , 见下面                                                       |
|             | set disassembly-flavor intel                             | 设置 intel 风格汇编, 也可以 bash 中设置再进 gdb                         |
|             | alsr off                                                 | 关闭 alsr                                                               |
|             | `set *0x4007e48=0x7c6c`<br>`set $eax=*(int*)($rsp+0x50)` | 修改值                                                                  |
| -- heap --  |                                                          | 查看堆,配合 x/addr 看位置                                               |
|             | heap                                                     |
|             | bins                                                     | 查看 bins                                                               |
|             | heapinfo                                                 |                                                                         |
|             | parseheap                                                |
|             | chunkinfo <addr>                                         | 查看 chunk                                                              |
|             | hex 0x8e1000 2300                                        | 查看 hex                                                                |
|             | p &\_\_malloc_hook                                       |
|             | magic                                                    | 查看 malloc_hook system 等地址                                          |
|             | fakefast <mallochook 地址>                               |
|             | tel \*(0x7ffff588+0x30 + 4) = 0 赋值                     |

## x/examine/查看

x/countFormatSize addr

| count | size | type | desc         | type | desc      |
| ----- | ---- | ---- | ------------ | ---- | --------- |
| b     | 1    | o    | 八进制       | f    | 浮点数    |
| h     | 2    | d    | 十进制       | a    | 地址      |
| w     | 4    | x    | 十六进制     | i    | 指令/汇编 |
| g     | 8    | u    | 无符号十进制 | c    | 字符      |
|       |      | t    | 二进制       | s    | 字符串    |

格式: x /nfu <addr>

n 表示要显示的内存单元的个数

f 表示显示方式, 可取如下值

| 1   | 2                            |
| --- | ---------------------------- |
| x   | 按十六进制格式显示变量。     |
| d   | 按十进制格式显示变量。       |
| u   | 按十进制格式显示无符号整型。 |
| o   | 按八进制格式显示变量。       |
| t   | 按二进制格式显示变量。       |
| a   | 按十六进制格式显示变量。     |
| i   | 指令地址格式                 |
| c   | 按字符格式显示变量。         |
| f   | 按浮点数格式显示变量。       |

u 表示一个地址单元的长度

| 1   | 2            |
| --- | ------------ |
| b   | 表示单字节， |
| h   | 表示双字节， |
| w   | 表示四字节， |
| g   | 表示八字节   |

```sh
x/32gx 0x602010-0x10 命令查看堆块情况
x/i 0x601060 // 查看汇编 1行
x/20i 0x601060 // 查看汇编 20行

x/16wx $esp // 查看栈情况

x/5s $eax  // 看5个 s字符串
x/5sw $eax // 看5个 s字符串 w--dword 双字
x/5w $eax // 看eax的 5个4字节
x/5gx $rsp-8 //5个8字节 可计算

x/3uh 0x54320 //内存地址0x54320读取内容 3u 3w个字节
x/3us 0x601080 //读取地址字符串
```

### p 打印出函数地址/计算

```
p __free_hook // 打印 freehook地址信息
p shell // 打印 shell
p $esp - 1
p /x value 16进制输出
```

find 命令查找"/bin/sh" 字符串

## commands

```sh
b *0x00007FFFF7F97E9B
commands 1 # 1号断点时自动执行下面的命令
set $eax=*(int*)($rsp+0x50)
continue
end
```

## breakpoint

| cmd                          | Desc                                                                                                       |
| ---------------------------- | ---------------------------------------------------------------------------------------------------------- |
| i b                          | info breakpoint                                                                                            |
| b \*main                     | 在 main 函数的 prolog 代码处设置断点（prolog、epilog，分别表示编译器在每个函数的开头和结尾自行插入的代码） |
| b \*0x400100                 | 在 0x400100 处断点                                                                                         |
| b \*$rebase(0x 相对基址偏移) | pwndbg 带的                                                                                                |
| d                            | Delete all breakpoint                                                                                      |
| d 1                          | Delete index 1 point                                                                                       |
| dis(able)                    | 禁用断点                                                                                                   |
| condition bnum expression    | 为 bnum 进行条件断点,例 condition 2 $rdx==11                                                               |

## GDB 调试

set follow-fork-mode parent|child 当发生 fork 时指示调试器跟踪父进程还是子进程
handler SIGALRM ignore 忽视信息 SIGALRM，调试器接收到的 SIGALRM 信号不会发送给被调试程序
target remote ip:port 连接远程调试

### gdb 带源码调试

比如调试 malloc.c 中的 free 下载对应的 glibc 版本 https://mirrors.ustc.edu.cn/gnu/glibc/ 解压 malloc.c 到当前目录。这时 si 就能进入对应函数源码了。

### 调试技巧

修改下一步运行地址

    disas main # 查看想跳到0x4007e
    set $rip=0x4007e # 就能跳过去了

    set *0x4007e48=0x7c6c  # 修改值

### gdb 调试常用命令

| cmd                   | desc                                    |
| --------------------- | --------------------------------------- |
| file gdb-sample       | 载入程序                                |
| Enter                 | 重复上一条命令                          |
| start                 | 启动程序停在开辟完主函数栈帧的地方      |
| r                     | run                                     |
| p n                   | print n                                 |
| c                     | Continue                                |
| display /i $pc        | 显示汇编指令                            |
| ni/si                 | step next/over 同 sn 针对汇编代码走一步 |
| s/n                   | 针对 C 代码                             |
| n 5                   | 走 5 步                                 |
| fin                   | 执行到返回 ret                          |
| q                     | 退出                                    |
| at                    | attach                                  |
| tel 0x400100          | telescope 打印栈？还是地址？            |
| tel &\_\_free_hook 1  |                                         |
| tel cr_unpackData 100 |                                         |
| tel "$esp - 40"       |
| stack                 | 多次回车查看多个                        |
| stack 40              | 查看 40 个栈数据                        |

- info

| cmd                   | desc                                                  |
| --------------------- | ----------------------------------------------------- |
| i r                   | 命令显示寄存器中的当前值———i r 即 Infomation Register |
| i r                   | info register                                         |
| i r eax               |
| i b                   | 查看断点                                              |
| i functions           |
| info file             | // 查看当前文件的信息，例如程序入口点                 |
| info symbol 0x4555088 | 显示这是哪个函数                                      |

```
list <linenum>
• list <function>
• list 显示当前行后面的源码
• list -显示当前行前面的源码
 search <regexp>
• forward-search 向前搜索
• reverse-search 全部搜索

```

- 运行参数

```
1、set args 10 20 30
• 2、run 10 20 30
• 3、gdb test -args 10 20 30
• show args
• 运行时输入数据:
• run < payload.txt

watch <expr>
– 一旦表达式（变量）值有所变化，程序立马停住
rwatch <expr>
– 当expr被读时
• awatch <expr>
– 当expr被读或写时
• info watchpoints
• 清除停止点（break、watch、catch）
– delete、clear、disable、enable
```

### 修改变量值 修改寄存器

```
set $reg=value
set *(type*)(address) = value
```

```
print x=4
set x=4
set var width=10
set *(char*)0x08048e3a = 0x74 修改汇编值
set $rsp=$rsp+1 # rsp+1
```

- 跳转执行

```
jump
jump <linespec>
jump <address>
同样，也可以直接改变跳转执行的地址:
set $pc=0x08041234
```

### 查看地址对应的函数 symbol of function

```
info symbol 0x400225
info line *0xfde09edc
disassemble /m 0xfde09edc
```

### 调试 PIE 程序

方式 1
sudo vi v/proc/sys/kernel/randomize_va_space 本地调试修改为 0 就不会随机变化地址了

```
gdb file
r
Ctrl+c
info proc mappings
0x555555554000     0x555555556000     0x2000        0x0 /home/kali/vmware/test/pwn/pwn1_music/music
base = 0x555555554000 # 这时第一行就是基址，可以通过加偏移来计算
gdb.attach(p, "b *{b}".format(b = hex(base + 0x0CDD)))
```

方式 2 rebase
0x933 是偏移地址

b \*$rebase(0x933)

## vm, vmmap 查看内存映射

如何查找函数三种方式

```sh
shell$ objdump -d test
shell$ objdump -M intel -d test | less
shell$ objdump -T ./libc.so.6 | grep 'read'
shell$ objdump -T ./libc.so.6 | grep '__libc_start_main'     这个在startmain前就会被call过
gdb-peda$ p shell
r2$ afl~shell
```

### objdump

```sh
# 只显示汇编, 不显示地址
objdump -d --no-show-raw-insn stack_pivotingx86 | perl -p -e 's/^\s+(\S+):\t//;'
objdump -d --no-show-raw-insn stack_pivotingx86 | grep "^ " | cut -f2,3
```

## peda

```
disass + main //反汇编main
disassemble + func // 对指定的函数进行反汇编
b main  // 断下main
b *0x400100 // 在 0x400100 处下断点
c(contunue)  // 继续执行
x /4xg $ebp: 查看ebp开始的4个8字节内容（b: 单字节，h: 双字节，w: 四字节，g: 八字节；x: 十六进制，s: 字符串输出，i: 反汇编，c: 单字符）
x / (n , f ,u) // n,f,u是其三个可选参数
  n是一个正整数，表示需要显示的内存单元的个数，也就是说从当前地址向后显示几个内存单元的内容，一个内存单元的大小由后面的u定义。
  f 表示显示的格式，参见下面。如果地址所指的是字符串，那么格式可以是s，如果地址是指令地址，那么格式可以是i。
  u 表示从当前地址往后请求的字节数，如果不指定的话，GDB默认是4个bytes。u参数可以用下面的字符来代替，b表示单字节，h表示双字节，w表示四字节，g表示八字节。当我们指定了字节长度后，GDB会从指内存定的内存地址开始，读写指定字节，并把其当作一个值取出来。
layout // 用于分割窗口，可以一边查看代码，一边测试。
主要有下面几种用法:
layout src // 显示源代码窗口
layout asm // 显示汇编窗口
layout regs // 显示源代码/汇编和寄存器窗口
layout split // 显示源代码和汇编窗口
layout next // 显示下一个layout
layout prev // 显示上一个layout
Ctrl + L // 刷新窗口
Ctrl + x  再按1 // 单窗口模式，显示一个窗口
Ctrl + x  再按2 // 双窗口模式，显示两个窗口
Ctrl + x  再按a // 回到传统模式，即退出layout，回到执行layout之前的调试窗口。
delete [number]: 删除断点
tb一次性断点
watch *(int *)0x08044530: 在内存0x0804453处的数据改变时stop
p $eax: 输出eax的内容
set $eax=4: 修改变量值
fini: 运行至函数刚结束处
return expression: 将函数返回值指定为expression
bt: 查看当前栈帧
info f: 查看当前栈帧
context: 查看运行上下文
stack: 查看当前堆栈
call func: 强制函数调用
ropgagdet: 找common rop
  ROPgadget --binary stack2 --string 'sh' 查找sh字符
  ROPgadget --binary 文件名 --only "pop|ret"
vm, vmmap: 查看虚拟地址分布
shellcode: 搜索，生成shellcode
ptype struct link_map: 查看link_map定义
p &((struct link_map*)0)->l_info: 查看l_info成员偏移
```

## gdb attach, process 后 gdb script 有问题时，选默认终端为 qterminal。

    gcc gdb-sample.c -o gdb-sample -g

## pwngdb 使用

在 gdb.attach(io)之后，先输入 r 运行程序。再继续其他操作

## gdb 执行命令

```sh
PYVER=$(gdb -batch -q --nx -ex 'pi import platform; print(".".join(platform.python_version_tuple()[:2]))')
PYTHON+=$(gdb -batch -q --nx -ex 'pi import sys; print(sys.executable)')
```

## gdb log/help 保存调试信息

示例 保存 help all 到文本

```sh
set logging file a.txt
set logging enabled on
help all
set logging enabled off
```

```sh
set logging enabled on
           Enable logging.
set logging enabled off
           Disable logging.
set logging file file
           Change the name of the current logfile. The default logfile is gdb.txt.
set logging overwrite [on|off]
           By default, gdb will append to the logfile. Set overwrite if you want set logging on to overwrite the logfile instead.
set logging redirect [on|off]
           By default, gdb output will go to both the terminal and the logfile. Set redirect if you want output to go only to the log file.
show logging
          Show the current values of the logging settin
```

## gdb/python

```sh
pwndbg$ python print ("123")
pwndbg$ python gdb.execute('p 123')
pwndbg$ py gdb.execute('heap')
pwndbg$ py txt = gdb.execute('p/x $ecx', to_string=True); r = txt.split(' = ')[1]; print(gdb.execute(f'fmtarg {r}', to_string=True))

pi # 进入 interpreter, 可输入多行命令

# 执行脚本文件
python exec(open('myscript.py').read())
```

## Article

[玩转 C++调试之 Python 的 GDB 库增强](https://mp.weixin.qq.com/s/B8YLq-YSNw08u6yKoBcblg)
[Linux 多线程调试没那么难，可别再用 printf 了](https://mp.weixin.qq.com/s/qJTnEDT3xO9T7koDk5kVdQ)
