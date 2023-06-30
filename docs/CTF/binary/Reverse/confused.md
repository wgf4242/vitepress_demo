
绿城杯 easy_re

```
.text:00401056                 xor     eax, eax                         ;置0
.text:00401058                 jz      short near ptr loc_40105C+1      ;因为置0了肯定jmp
.text:0040105A                 adc     [edx], esp                       
```
.text:00401056   修改为 jmp loc_40105C

去花后，如果有指错误
- 1.找到末尾 Delete Function
- 2.Edit - Function - Set FunctionEnd来指定结束位置
6:55  https://www.bilibili.com/video/BV1br4y127eM/?spm_id_from=333.788


## 垃圾代码

GKCTF2021 SoMuchCode
https://blog.csdn.net/m0_51911432/article/details/123120168
https://tianyu.xin/index.php/rev/Somuchcode.html


# Ollvm

[deflat](https://github.com/cq674350529/deflat)

