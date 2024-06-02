注意显示为

```sh
movzx eax,byte ptr ss:[ebp+edx-3C]
自己修改指令时要修改为
movzx eax,byte ptr ss:[ebp+edx-0x3C]
```

## 常见视图

左下角转储视图, 右击 - 地址

## x64dbg 快捷键

| cmd                 | Desc                                                 |                                                          |
| ------------------- | ---------------------------------------------------- | -------------------------------------------------------- |
| \*                  | Go to EIP                                            |                                                          |
| F                   | 二进制填充                                           |                                                          |
| g                   | 图表                                                 |                                                          |
| h                   | 点击变量，可以高亮。                                 |                                                          |
| bp InternetOpenUrlA | 加载后才能用函数名下断点                             |                                                          |
| bph esp             | 硬件断点 `bph addr,[rwx],[1/2/4/8]` <br> `bph rsp,r` |                                                          |
| bphc                | 删除硬件断点 `bphc <addr>`不指定时删除全部           |                                                          |
| d <addr>            | 跳转                                                 |                                                          |
| d <function_name>   | d <fn+5> 跳转到 fn+5 处                              |                                                          |
| Ctrl + 9            | Nop                                                  |                                                          |
| Ctrl+space          | 恢复修改                                             |                                                          |
| Alt+;               | 标记地址                                             | mov rax, ds:[0x00007FF708FEC450] => mov rax, ds:[callHp] |
| +/-                 | 前进/后退                                            |                                                          |
| Ctrl+Enter          | 执行命令/Focus Command                               |                                                          |

### Ollydbg 快捷键

```
hr esp ;  esp下硬件断点
```

## IDA 地址转 OD 地址

查看并计算 ida 偏移。
用 OD 基地加偏移跳转。

## Patch

x32dbg/x64dbg 右击补丁 - 补丁文件 - 保存为 x.exe

## 断点

- [Doc](https://help.x64dbg.com/en/latest/introduction/Expression-functions.html?highlight=streq#strings)
- [条件断点](https://bbs.kanxue.com/thread-251385.htm)
- [Link2](https://www.cnblogs.com/SunsetR/p/14248852.html)

```sh
# 所有数字均为16进制 不用0x 也是16进制
[rax] == 0x202
(esi==73) && (eax=64)         # 73 64都是16进制数
streq(utf8(5ffde4), "123456") # 0x5ffde4地址值为123456时断下
streq(utf8(rax),    "123456") # rax     地址值为123456时断下

# 条件记录断点 Log Text
## condition为0，Log text设置需要记录的数据，同时将silent项选上。 Log窗口看到记录的数据。
esi: {esi}; eax: {eax}
```

# x64dbg

Trace: --> trace record -> word 查看实际执行路线。

Graph 模式 1.运行到 call 处, 右键 - Sync with origin (S).进入 call.
2.SS : going back into the stepped in call.

## 设置

设置 - 事件 - ×TLS 回调
设置 - Exception: 范围 00000000 - ffffffff

---

x64dbg 的默认设置: 系统断点 入口断点 用户 TLS 回调函数

## 快捷键

G Graph,查看图流程
Ctrl+Backspace 还原选择
Ctrl+P Patch
Ctrl+F9 执行到返回
Ctrl+9 Nop

# API

wininet.dll.InternetOpenUrlA
wininet.dll.InternetConnectA

# Article

[通过 x64dbg 脚本功能修复 IAT 表](https://mp.weixin.qq.com/s/ZjxRNJr22H2val27mCeoUg)
[OD 定位消息-事件](https://mp.weixin.qq.com/s/d57aOp_fN6eqLx6MAl01nQ)
[让 x64dbg 支持 python 脚本](https://mp.weixin.qq.com/s/5o6BtdAlCxaHb-SK1WMhYQ)
