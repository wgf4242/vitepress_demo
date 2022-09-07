## 常用命令

```
entry -- Set a breakpoint at the first instruction executed in the target binary
b __libc_start_main
b *main
```

## x/查看

x/countFormatSize addr

| count | size | type | desc         | type | desc   |
| ---- | ---- | ---- | ------------ | ---- | ------ |
| b    | 1    | o    | 八进制       | f    | 浮点数 |
| h    | 2    | d    | 十进制       | a    | 地址   |
| w    | 4    | x    | 十六进制     | i    | 指令   |
| g    | 8    | u    | 无符号十进制 | c    | 字符   |
|      |      | t    | 二进制       | s    | 字符串 |


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

## breakpoint

```sh
b *main # 在 main 函数的 prolog 代码处设置断点（prolog、epilog，分别表示编译器在每个函数的开头和结尾自行插入的代码）
b *0x400100 # 在 0x400100处断点
b *$rebase(0x相对基址偏移)  # pwndbg带的
d  # Delete breakpoint）
d * // 删除全部
dis(able) # // 禁用端点
```