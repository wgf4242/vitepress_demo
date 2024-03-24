[从 CTF 入门 z3 solver](https://blog.shi1011.cn/learn/1789)

```py
from z3 import *
p = [1,2,3,4,...]
a = Array('a', BitVecSort(32), BitVecSort(32)) #  Return an array constant named `name` with the given domain and range sorts
for i in range(256):
    solver.add(a[i] == p[i])

t1 = LShR(t, 8) # Logic Shift Right

solver.add(t1 == 0x1100)
assert solver.check() == sat
ans = solver.model()
print(ans[t])
```
