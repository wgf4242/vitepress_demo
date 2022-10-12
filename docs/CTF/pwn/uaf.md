heap 一个UAF+数组上溢出 https://mp.weixin.qq.com/s/08d3RP3DXWRlis_CjMlPZA
这里可以输入负数，可以数组溢出就可以往上泄露地址，泄露出程序基地址后再相同手法修改free_hook就可以。