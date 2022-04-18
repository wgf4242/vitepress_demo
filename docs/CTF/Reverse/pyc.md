

## bytecode disassembly

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
