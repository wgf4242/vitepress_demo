# docs

[uniui-doc](https://uniapp.dcloud.io/component/)
https://hellouniapp.dcloud.net.cn/pages/component/view/view
[uniui-demo-ext](https://hellouniapp.dcloud.net.cn/pages/extUI/badge/badge)

[doc](https://uniapp.dcloud.io/component/picker-view.html)

[push](https://uniapp.dcloud.io/unipush.html)
[unipush console ](https://dev.dcloud.net.cn/app/index?type=0)
https://www.bilibili.com/video/BV1k5411t71d
https://www.bilibili.com/video/BV1kE411J7Bo

[通知消息](https://www.html5plus.org/doc/zh_cn/push.html)

## Grade

```ts
# 查看sha1 https://www.csdn.net/tags/NtTacg0sMzk5MDktYmxvZwO0O0OO0O0O.html
keytool -list -v -keystore test.jks -storepass 123456 
```

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
## OAuth模块未打包

https://nativesupport.dcloud.net.cn/AppDocs/usemodule/androidModuleConfig/oauth?id=%e4%b8%80%e9%94%ae%e7%99%bb%e5%bd%95

dcloud_properties.xml文件在assets/data目录下 添加
```html
<feature name="OAuth" value="io.dcloud.feature.oauth.OAuthFeatureImpl"><module name="OAuth-IGETui" value="io.dcloud.feature.igetui.GeTuiOAuthService"/></feature>
```
