# 矩阵
[行列式](https://mp.weixin.qq.com/s/h7dcAPRs55xcljAWDbOpgQ) determinant

确认可逆 行列式不为 0

$$
\begin{bmatrix}
6 & 24 & 1 \\
13 & 16 & 10 \\
20 & 17 & 15 \\
\end{bmatrix} \equiv  6(16 \cdot 15 - 10\cdot17) - 24(13\cdot15 - 10\cdot20) + 1(13\cdot17 - 16\cdot20) \equiv 441 \equiv 25 \ mod \ 26
$$

计算某点时(比如 6)，去掉 6 所在行和列

$$
\begin{bmatrix}
 16 & 10 \\
 17 & 15 \\
\end{bmatrix}
$$

计算 `6*(16*15 - 10*17)`

[矩阵逆运算](https://blog.csdn.net/charlotte0000/article/details/121184887)

```sage
sage: A = matrix(2, 2, [8,7,3,8])
sage: B = A.inverse()
sage: B
[ 8/43 -7/43]
[-3/43  8/43]
# 算出来应该是 [2,21] [9,12]
```

$$
\begin{bmatrix}
\LARGE \frac d{ad-bc} & \LARGE \frac {-b}{ad-bc} \\
\LARGE \frac {-c}{ad-bc} & \LARGE \frac {a}{ad-bc} \\
\end{bmatrix}
$$



# numpy

```py
# 行列式
print(np.linalg.det([[8, 7], [3, 8]]))
```
