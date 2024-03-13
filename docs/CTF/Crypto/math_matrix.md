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
sage: A = matrix(2, 2, [8,7,3,8])       # ad - bc = 8*8 - 7*3 = 43
sage: B = A.inverse()
sage: B
[ 8/43 -7/43]
[-3/43  8/43]
# 计算A的行列式43 mod 26 的逆元  = 23,  23[[8,-7], [-3,8]] mod 26
# 结果为 [2,21] [9,12]
```

$$
\begin{bmatrix}
\LARGE \frac d{ad-bc} & \LARGE \frac {-b}{ad-bc} \\
\LARGE \frac {-c}{ad-bc} & \LARGE \frac {a}{ad-bc} \\
\end{bmatrix}
$$

[计算视频](https://www.bilibili.com/video/BV1Do4y1f76U/)

$$
A = \begin{bmatrix}
5 & 6 \\
2 & 3 \\
\end{bmatrix} \\ 
\\
. \\ 
求伴随, 主 5,3 对调, 副变号 -6 -2 \\ 
. \\ 
A^{*} = \begin{bmatrix}
3 & -6 \\
-2 & 5 \\
\end{bmatrix} \\ 

求行列式 det(A) =  3 * 5 - (2 * 6) = 3 \\ 
求3mod26的逆元  = 9 \\
A^{-1}  = 9A^{*} = 9 \begin{bmatrix}
3 & -6 \\
-2 & 5 \\
\end{bmatrix} \ mod \ 26 \\ 
$$

## 图例

$$
|A| 行列式 \\
A^{*} 伴随矩阵 \\
矩阵求逆 A^{-1} = \frac{A^{*}}{|A|} \\
$$



# numpy

```py
# 行列式
print(np.linalg.det([[8, 7], [3, 8]]))
```
