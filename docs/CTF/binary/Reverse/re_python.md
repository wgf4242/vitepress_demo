
## 加密保护

__m1. pyc加密__ 

```sh
python -m compileall <src> 然后删除 <src> 目录下所有 .py 文件就可以打包发布了：
$ find <src> -name '*.py' -type f -print -exec rm {} \;
```

# Article

* [如何保护你的 Python 代码 （一）—— 现有加密方案](https://zhuanlan.zhihu.com/p/54296517)
* [Python代码加密 - 4种方案](https://blog.csdn.net/SeafyLiang/article/details/111573911)
* [python逆向总结-离线也有](https://mp.weixin.qq.com/s/qnT-H-T74Mj8jzG0Xqzq4Q)
* [Python代码保护技术及其破解](https://mp.weixin.qq.com/s/y1atfJ-vf0wZBtMooeSw4A)