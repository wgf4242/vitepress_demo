
## 加密保护

__m1. pyc加密__ 

```sh
python -m compileall <src> 然后删除 <src> 目录下所有 .py 文件就可以打包发布了：
$ find <src> -name '*.py' -type f -print -exec rm {} \;
```

# Article

* [如何保护你的 Python 代码 （一）—— 现有加密方案](https://zhuanlan.zhihu.com/p/54296517)
* [Python代码加密 - 4种方案](https://blog.csdn.net/SeafyLiang/article/details/111573911)
