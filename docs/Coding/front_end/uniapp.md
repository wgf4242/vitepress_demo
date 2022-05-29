# docs

[uniui-doc](https://uniapp.dcloud.io/component/)
https://hellouniapp.dcloud.net.cn/pages/component/view/view
[uniui-demo-ext](https://hellouniapp.dcloud.net.cn/pages/extUI/badge/badge)

[doc](https://uniapp.dcloud.io/component/picker-view.html)

[push](https://uniapp.dcloud.io/unipush.html)
https://www.bilibili.com/video/BV1k5411t71d
https://www.bilibili.com/video/BV1kE411J7Bo

[通知消息](https://www.html5plus.org/doc/zh_cn/push.html)


# FAQ

## 回到上一页并刷新

```js
uni.navigateBack({
  delta: 1, //返回层数，2则上上页
})

  onLoad(options) {
    uni.$on('refresh', () => this.update())
  },

  uni.$emit('refresh')
```
