
[Link](https://blog.csdn.net/m0_46161993/article/details/105163075)
## env

sage -pip install tqdm
## command

$$
gamma(x+1) = factorial(x)
$$

```python
# 阶乘
factorial(5)
gamma(2^27+1) == 2^27!

# 求行、列值
mt.nrows() #将返回矩阵行数
mt.ncols() #将返回矩阵列数

# 求行列式的值
mt.determinant()

# 求是否为可逆矩阵
是可逆矩阵则输出TRUE，否则输出FALSE

mt.is_invertible()

# 求逆
mt.inverse()
mt = mt^(-1)
```

## 序列查询 OEIS

或者计算一下 $2^0!,2^1!,2^2!,2^3!$  直接去查序列也能查到

1, 2, 6, 9, 63 - OEIS (https://oeis.org/search?q=1%2C+2%2C+6%2C+9%2C+63&go=Search) 