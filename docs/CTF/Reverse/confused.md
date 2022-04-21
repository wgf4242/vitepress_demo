
绿城杯 easy_re

```
.text:00401056                 xor     eax, eax                         ;置0
.text:00401058                 jz      short near ptr loc_40105C+1      ;因为置0了肯定jmp
.text:0040105A                 adc     [edx], esp                       
```
.text:00401056   修改为 jmp loc_40105C
