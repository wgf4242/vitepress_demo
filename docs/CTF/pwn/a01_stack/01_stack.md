# 栈结构

[Link](https://blog.csdn.net/m0_43405474/article/details/126546838)

ret2shellcode 示例

<table border='1'> <tbody> <tr> <td>Data</td> <td>Stack</td> <td>每格8字节</td> </tr> <tr> <td></td> <td>aaaaaaaa</td> <td>&lt;- buf_addr</td> </tr> <tr> <td></td> <td>aaaaaaaa</td> <td></td> </tr> <tr> <td>rbp</td> <td>aaaaaaaa</td> <td></td> </tr> <tr> <td>ret</td> <td>buf_addr+32</td> <td>返回地址</td> </tr> <tr> <td></td> <td rowspan="5">shellcode</td> <td>&lt;- buf_addr+32</td> </tr> <tr> <td></td> <td></td> </tr> <tr> <td></td> <td></td> </tr> <tr> <td></td> <td></td> </tr> <tr> <td></td> <td></td> </tr> </tbody> </table> </div>

示例1 , rbp下面是ret
```sh
-0000000C Canary dd ?  -- dd 4字节
-00000008 db ? ; undefined
-00000007 db ? ; undefined
-00000006 db ? ; undefined
-00000005 db ? ; undefined
-00000004 var_4 dd ?
+00000000  s db 4 dup(?)
+00000004  r db 4 dup(?)    -- rbp

Canary + 'a' * 0x8 + 'a' * 0x4 + <get_shell_ret>
-- 上面所有全覆盖了才到返回值
```

示例2
```sh
-0000000000000070 var_70 db 112 dup(?)
+0000000000000000  s db 8 dup(?)
+0000000000000008  r db 8 dup(?)  -- rbp

'a' * (0x70 + 8) + <get_shell_ret>
```