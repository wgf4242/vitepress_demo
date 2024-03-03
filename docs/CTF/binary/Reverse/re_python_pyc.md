有时 uncompyle 和 pycdc 还原的效果不一致。需要手动还原
decompyle3 -- python3.8

https://docs.python.org/3/library/dis.html
[Python3 字节码详解](https://blog.csdn.net/weixin_46263782/article/details/120930191)
[Python 代码保护技术及其破解](https://mp.weixin.qq.com/s/y1atfJ-vf0wZBtMooeSw4A)
[从 TPCTF 2023 学习 Python 逆向](https://mp.weixin.qq.com/s/0nJHKJjDFrWHgspoVF23xA)

magic word 在 /Lib/importlib/\_bootstrap_external.py 路径下找到各版本对应的 16bits 整数。

| 1          | 2                            |
| ---------- | ---------------------------- | ---------------------- |
| uncompyle6 | uncompyle6 -o out.py app.pyc | python3.6 及以下       |
| decompyle3 | decompyle3 -o out.py app.pyc | python3.7、python3.8   |
| pycdc      |                              | 全版本, 单独弄个小目录 |
| pydumpck   | pydumpck hello.exe           | 自动反编译出 py        |

## bytecode disassembly

### STORE

STORE_FAST

```
0 LOAD_CONST               1 (10)
2 STORE_FAST               0 (a)
a = 10
```

STORE_ATTR

```
790     LOAD_FAST               2: sP
792     LOAD_FAST               0: self
794     STORE_ATTR              13: sP
1 --
self.sP = sP


2 --
class A():
    def foo():
        self.x = 1

Disassembly of foo:
  4           0 LOAD_CONST               1 (1)
              2 LOAD_GLOBAL              0 (self)
              4 STORE_ATTR               1 (x)
              6 LOAD_CONST               0 (None)
              8 RETURN_VALUE
```

```
nD = []
 51     >>  120 BUILD_LIST               0
            122 STORE_FAST               5 (nD)
```

### Method

```
82      LOAD_FAST               0: self
84      LOAD_METHOD             5: write
86      LOAD_FAST               3: eP
88      LOAD_CONST              1: 0
90      BINARY_SUBSCR
self.write(eP[0])
```

```
88         668 LOAD_FAST                0 (self)
           670 LOAD_METHOD              5 (write)
           672 LOAD_FAST                4 (cP)
           674 LOAD_CONST               1 (0)
           676 BINARY_SUBSCR
           678 LOAD_FAST                4 (cP)
           680 LOAD_CONST               2 (1)
           682 BINARY_SUBSCR
           684 LOAD_CONST               3 (2)
           686 LOAD_CONST               4 (3)
           688 CALL_METHOD              4
           690 POP_TOP                  # 退缩进
self.write(cP[0], cP[1], 2, 3)
```

### CALL_FUCTION

```
13  i = 0
14  c = '1234'
15  if i < len(c):
16      return 1
 13           0 LOAD_CONST               1 (0)
              2 STORE_FAST               0 (i)
 14           4 LOAD_CONST               2 ('1234')
              6 STORE_FAST               1 (c)
 15           8 LOAD_FAST                0 (i)
             10 LOAD_GLOBAL              0 (len)
             12 LOAD_FAST                1 (c)
             14 CALL_FUNCTION            1
             16 COMPARE_OP               0 (<)
             18 POP_JUMP_IF_FALSE       12 (to 24)
 16          20 LOAD_CONST               3 (1)
             22 RETURN_VALUE
 15     >>   24 LOAD_CONST               0 (None)
             26 RETURN_VALUE

```

### Tuple

```
89         692 LOAD_FAST                4 (cP)
           694 LOAD_CONST               1 (0)
           696 BINARY_SUBSCR
           698 LOAD_FAST                4 (cP)
           700 LOAD_CONST               2 (1)
           702 BINARY_SUBSCR
           704 LOAD_CONST               2 (1)
           706 BINARY_ADD
           708 BUILD_TUPLE              2
           710 STORE_FAST               4 (cP)
cP = (cP[0], cP[1] + 1)
```

### For loop

示例 1

```
19    c=2
20    for i in range(1,5,c+1):
21        pass
 19           0 LOAD_CONST               1 (2)
              2 STORE_FAST               0 (c)
 20           4 LOAD_GLOBAL              0 (range)
              6 LOAD_CONST               2 (1)
              8 LOAD_CONST               3 (5)
             10 LOAD_FAST                0 (c)
             12 LOAD_CONST               2 (1)
             14 BINARY_ADD                         # 前俩加 c+1
             16 CALL_FUNCTION            3
             18 GET_ITER
        >>   20 FOR_ITER                 2 (to 26)
             22 STORE_FAST               1 (i)
 21          24 JUMP_ABSOLUTE           10 (to 20)
 20     >>   26 LOAD_CONST               0 (None)
             28 RETURN_VALUE
```

示例 2

```
    for ii in lst:
        ii
    return 'done'

 20           0 LOAD_GLOBAL              0 (lst)
              2 GET_ITER
        >>    4 FOR_ITER                 4 (to 14)
              6 STORE_FAST               0 (ii)
 21           8 LOAD_FAST                0 (ii)
             10 POP_TOP
             12 JUMP_ABSOLUTE            2 (to 4)
```

### Slice

```
      c = '123'
      i = 2
15    c[i:i+4]

 15           8 LOAD_FAST                0 (c)
             10 LOAD_FAST                1 (i)
             12 LOAD_FAST                1 (i)
             14 LOAD_CONST               3 (4)
             16 BINARY_ADD
             18 BUILD_SLICE              2
             20 BINARY_SUBSCR
```

### try except

```
def try_test():
13    try:
14        a = 1
15    except Exception:
16        b = 2
17    finally:
18        c = 3

 13           0 SETUP_FINALLY           26 (to 54)
              2 SETUP_FINALLY            4 (to 12)

 14           4 LOAD_CONST               1 (1)
              6 STORE_FAST               0 (a)
              8 POP_BLOCK
             10 JUMP_FORWARD            11 (to 34)

 15     >>   12 DUP_TOP
             14 LOAD_GLOBAL              0 (Exception)
             16 JUMP_IF_NOT_EXC_MATCH    16 (to 32)
             18 POP_TOP
             20 POP_TOP
             22 POP_TOP

 16          24 LOAD_CONST               2 (2)
             26 STORE_FAST               1 (b)
             28 POP_EXCEPT
             30 JUMP_FORWARD             6 (to 44)

 15     >>   32 RERAISE                  0

 14     >>   34 POP_BLOCK

 18          36 LOAD_CONST               3 (3)
             38 STORE_FAST               2 (c)
             40 LOAD_CONST               0 (None)
             42 RETURN_VALUE

 16     >>   44 POP_BLOCK

 18          46 LOAD_CONST               3 (3)
             48 STORE_FAST               2 (c)
             50 LOAD_CONST               0 (None)
             52 RETURN_VALUE
        >>   54 LOAD_CONST               3 (3)
             56 STORE_FAST               2 (c)
             58 RERAISE                  0
```

### if/if and

if

```
12def try_test():
13    cp=[]
14    if cp[0]==0:
15        a = 1
16    b = 1
 13           0 BUILD_LIST               0
              2 STORE_FAST               0 (cp)

 14           4 LOAD_FAST                0 (cp)
              6 LOAD_CONST               1 (0)
              8 BINARY_SUBSCR
             10 LOAD_CONST               1 (0)
             12 COMPARE_OP               2 (==)
             14 POP_JUMP_IF_FALSE       10 (to 20)

 15          16 LOAD_CONST               2 (1)
             18 STORE_FAST               1 (a)

 16     >>   20 LOAD_CONST               2 (1)
             22 STORE_FAST               2 (b)
             24 LOAD_CONST               0 (None)
             26 RETURN_VALUE
```

if and

```
13def try_test():
14    a = 8
15    c = 9
16    if not a and c==9:
17        b = 1
18    d = 1
 13           0 LOAD_CONST               1 (8)
              2 STORE_FAST               0 (a)

 14           4 LOAD_CONST               2 (9)
              6 STORE_FAST               1 (c)

 15           8 LOAD_FAST                0 (a)      # if not a , goto 24
             10 POP_JUMP_IF_TRUE        12 (to 24)
             12 LOAD_FAST                1 (c)      # if not c==9, goto 24
             14 LOAD_CONST               2 (9)
             16 COMPARE_OP               2 (==)
             18 POP_JUMP_IF_FALSE       12 (to 24)

 16          20 LOAD_CONST               3 (1)
             22 STORE_FAST               2 (b)

 17     >>   24 LOAD_CONST               3 (1)
             26 STORE_FAST               3 (d)
             28 LOAD_CONST               0 (None)
             30 RETURN_VALUE
```

[extended_arg](https://docs.python.org/3/library/dis.html#opcode-EXTENDED_ARG)
EXTENDED_ARG(ext)
为任意带有大到无法放入默认的单字节的参数的操作码添加前缀。 ext 存放一个附加字节作为参数中的高比特位。 对于每个操作码，最多允许三个 EXTENDED_ARG 前缀，构成两字节到三字节的参数。
