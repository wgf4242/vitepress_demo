
## 加密保护

__m1. pyc加密__ 

```sh
python -m compileall <src> 然后删除 <src> 目录下所有 .py 文件就可以打包发布了：
$ find <src> -name '*.py' -type f -print -exec rm {} \;
```

## Python/pyd

https://www.bilibili.com/video/ magic
先import magic, 然后dir(magic)看有哪些奇怪的调用一下。

## Python/pyc/pyinstaller
[Python逆向全版本MagicNumber表](https://blog.csdn.net/OrientalGlass/article/details/134612786)

视频 https://www.bilibili.com/video/BV1JL4y1p7Tt

http://81.70.81.64/dasctf%E5%85%AB%E6%9C%88%E6%8C%91%E6%88%98%E8%B5%9Bwriteup/#toc-head-3
https://www.cnblogs.com/pluie/p/13621823.html
https://blog.csdn.net/weixin_35967330/article/details/114390031

pyc可以直接python x.pyc运行

1. `python pyinstxtractor.py 1py.exe` 看是什么版本, 
2. 有pyz/pyd文件加密时需要对应的python版本解密, 见下面
2. 可能要补或改magic code为显示的版本。
         可以看struct文件的第一行

查看 pyc 对应的python版本 Linux: `file filename.pyc`

python源码的 Python-3.x.x/Lib/importlib/_bootstrap_external.py
https://github.com/google/pytype/blob/master/pytype/pyc/magic.py

https://blog.csdn.net/weixin_46263782/article/details/120939260

[格式详解](https://kdr2.com/tech/main/1012-pyc-format.html)
[格式详解](https://www.cnblogs.com/blili/p/11799483.html)
[py2示例](http://www.xumenger.com/01-python-pyc-20180521/)

看Magic Code可知是py2还是py3
```
42 0D 0D 0A 00 00 00 00 00 47 79 61 33 00 00 00
Maigc Code |           |33617947时间戳| TYPE_CODE字段，见marshal.c
E3 00 00 00 00 00 00 00 00 00 00 00 00 03 00 00
00 40 00 00 00 73 1E 00 00 00 65 00 64 00 64 01
83 02 5A 01 65 01 A0 02 A1 00 5A 03 65 04 65 03
83 01 01 00 64 02 53 00 29 03 7A 05 78 78 2E 70
```

PyCodeObject对象----code block:
```
1个字节0x73为TYPE_CODE字段， 表示该字段为string格式；
4个字节0x1E00 0000表示code block段的数据部分占用0x1E个字节，即长度为30；
接下来30个字节65006400 ...... 5300 为该TYPE_CODE字段（数据类型string）部分，也就是pyc文件中包含的字节码指令
再往下的逐个TYPE_CODE字段都是重复结构的，用来表示PyCodeObject对象中的一些其他参数
```

见 `## pyc | DASCTF Oct X 吉林工师 欢迎来到魔法世界～ 魔法叠加`
### pyc/asm/print mashal code

```python
def print_code(filename):
    import marshal
    f = open(filename, 'rb')
    code = marshal.loads(f.read())
    print(code)
```
编译Pyc

```py
python -m py_compile main.py
```

pydisasm.exe a.pyc

#### pyc/去花指令
[Python3 字节码混淆 ](https://blog.csdn.net/weixin_46263782/article/details/120939260)

1.先输出bytecode, 再到opcode.h中查找对应的码。
2.删除相关码
3.修改长度。 `len(co_code) - n`
方式2 pycdc

[VNCTF2022 BabyMaze](https://www.bilibili.com/video/BV1ka411k7td)
https://www.cnblogs.com/wgf4242/p/15921454.html
https://ppppz.net/2022/02/08/BabyMaze/
1 -
```py
import marshal,dis
f = open('BabyMaze.pyc', 'rb').read()
code = marshal.loads(f[16:]) # py3长度16， py2是长度8
code
dis.dis(code)
print(len(code.co_code)) # 2030
```
2
```
  1           0 JUMP_ABSOLUTE            4     花
        >>    2 JUMP_ABSOLUTE            6     花
        >>    4 JUMP_ABSOLUTE            2     花
        >>    6 LOAD_CONST               0 (1)
        >>    
```
3 python38\include\opcode.h
```
#define JUMP_ABSOLUTE           113 # 71
去掉 71 04 71 06 71 02 , 长度为6
```
4.去掉花的同时也要改co_code，这个是记录字节码的长度，所以我们减去6个这个也要减6 -- 2030 - 6 = 2024，
将 ee 07改为e8 07
5. uncompyle6 -o x.py BabyMaze.pyc

#### 编译为pyc
```sh
python -m compileall .
python -m compileall main.py
python -m py_compile main.py
```
### pyz/pyd 文件
用相同版本反编译会出pyz
https://www.jianshu.com/p/b5404e65416d
https://miaotony.xyz/2021/10/25/CTF_2021bailu/#toc-heading-5
原理  https://bbs.pediy.com/thread-271253.htm

1.安装pyinstaller, 找到 pyimod02_archive.py复制到程序根目录， 在文件最后面写入内容，执行解密文件变成pyc。
```python
inf = open(r'PYZ-00.pyz_extracted\baby_python\baby_core.pyc.encrypted', 'rb')
c = Cipher()

buf = c.decrypt(inf.read())
buf = zlib.decompress(buf)

out = open(r'PYZ-00.pyz_extracted\baby_python\baby_core.pyc', 'wb')
out.write(buf)
print('written down %d bytes' % len(buf))

inf.close()
out.close()
```
2.添加文件头
3.uncompyle6解密Pyc文件

### pyd文件
PYD是 Cpython实现的文件。看起来和dll一样
[浅谈pyd文件逆向](https://tttang.com/archive/1641/)

1.直接搜字符串
2.通过爆破。




# Article

* [如何保护你的 Python 代码 （一）—— 现有加密方案](https://zhuanlan.zhihu.com/p/54296517)
* [Python代码加密 - 4种方案](https://blog.csdn.net/SeafyLiang/article/details/111573911)
* [python逆向总结-离线也有](https://mp.weixin.qq.com/s/qnT-H-T74Mj8jzG0Xqzq4Q)
* [Python代码保护技术及其破解](https://mp.weixin.qq.com/s/y1atfJ-vf0wZBtMooeSw4A)
* [Cython逆向-语言特性分析](https://mp.weixin.qq.com/s/GM7cSDUUMJiUlcAVZEvErg)