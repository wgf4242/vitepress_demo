# 栈结构

[Link](https://blog.csdn.net/m0_43405474/article/details/126546838)

ret2shellcode 示例

<table border='1'> <tbody> <tr> <td>Data</td> <td>Stack</td> <td>每格8字节</td> </tr> <tr> <td></td> <td>aaaaaaaa</td> <td>&lt;- buf_addr</td> </tr> <tr> <td></td> <td>aaaaaaaa</td> <td></td> </tr> <tr> <td>rbp</td> <td>aaaaaaaa</td> <td></td> </tr> <tr> <td>ret</td> <td>buf_addr+32</td> <td>返回地址</td> </tr> <tr> <td></td> <td rowspan="5">shellcode</td> <td>&lt;- buf_addr+32</td> </tr> <tr> <td></td> <td></td> </tr> <tr> <td></td> <td></td> </tr> <tr> <td></td> <td></td> </tr> <tr> <td></td> <td></td> </tr> </tbody> </table> </div>


