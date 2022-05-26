mkfifo命令首先创建了一个管道·cat将管道里面的内容输出传递给/bin/sh·sh会执行管道里的命令并将标准输出和标准错误输出结果通対nc传到该管道·由此形成了一个回路.

[mkfifo](http://cnblogs.com/old-path-white-cloud/p/11685558.html)

[Linux文件类型详解](https://www.cnblogs.com/surpassme/p/9344738.html)

| 在Linux常见的文件类型有7种，分别如下所示： |                                                              |
| ------------------------------------------ | ------------------------------------------------------------ |
| 文件属性                                   | 文件类型                                                     |
| -                                          | 常规文件，即file                                             |
| b                                          | block device 即块设备文件，如硬盘;支持以block为单位进行随机访问 |
| c                                          | character device 即字符设备文件，如键盘支持以character为单位进行线性访问 |
| l                                          | symbolic link 即符号链接文件，又称软链接文件                 |
| p                                          | pipe 即命名管道文件                                          |
| s                                          | socket 即套接字文件，用于实现两个进程进行通信                |


| 文件描述符 | 缩写   | 描述         | 默认设备       |
| ---------- | ------ | ------------ | -------------- |
| 0          | STDIN  | 标准输入     | 默认设备键盘   |
| 1          | STDOUT | 标准输出     | 默认设备显示器 |
| 2          | STDERR | 标准错误输出 | 默认设备显示器 |

```
~ read user
adfadfatg
~ echo $user
```

把当前标准输出重定向到test文件中:
```
~ echo'lst' 1>test
~ cat test
1st
```
把当前标准输入重定向到test文件中:
```
~read user 0< test
~echo $user
1st
```
标准错误输出和标准输出的区别是,它在命令出错情况下的输出.
### 分配自己的文件描述符
```
~ exec 5> test
~ echo 'are you ok?' 1>&5
~ cat test
are you ok?
```
### /dev/null
特殊文件,写入的任何东西都会被清空.

1．把标准错误输出重定向到 `/dev/null`,从而丢掉不想保存的错误信息

```bash
whoami 2>/dev/null
```

2．快速移除文件中的数据而不用删除文件
```bash
cat/dev/null > test
```

