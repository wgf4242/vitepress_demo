
[DOS_BOS调试及使用](https://www.cnblogs.com/wgf4242/p/18118128)

DOSBOX
https://blog.csdn.net/lcy1619260/article/details/132471978

debug 1.exe
https://blog.csdn.net/m0_56208280/article/details/129001553
r 显示/修改寄存器 r ax
d 查看内存
d 100 ,
d 100:5 显示100偏移5前面的不显示
d 100:5 10 起始 终止地址
e 修改内存
e 起始地址 数据 数据…
t 下一步

mount c "C:\"
C:
debug 1.exe
DOS程序

mov     ah, 9           ; 输出
int     21h             ; DOS - PRINT STRING 执行

mov     ah, 0ah         ; 输入
int     21h             ; DOS - BUFFERED KEYBOARD INPUT 执行

seg001:000D                 lea     dx, unk_1002D ; 2D下一位即2E会存储 输入的字符长度.
seg001:0011                 mov     ah, 0Ah
seg001:0013                 int     21h             ; DOS - BUFFERED KEYBOARD INPUT
seg001:0015                 lea     dx, asc_10010   ; "\r\n$"
seg001:0019                 mov     ah, 9
seg001:001B                 int     21h             ; DOS - PRINT STRING
