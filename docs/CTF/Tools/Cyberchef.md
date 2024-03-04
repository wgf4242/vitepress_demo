## Cyberchef

https://github.com/mattnotmax/cyberchef-recipes
[你真的会用 CyberChef 吗？](https://mp.weixin.qq.com/s/GBi9vtiuhEOqoGlOpb2uNg)

复制时使用 Output 按钮, Copy raw output to the clipboard -- 不要手动复制

### 怎样对每一位字符操作

1. From hex, 或者其他 => 变成二进制
2. ADD/SUB -> 这都是对每一位字符操作的

### Caesar

用 rot13

### 循环

5 次 base64

https://gchq.github.io/CyberChef/#recipe=Label('loop')From_Base64('A-Za-z0-9%2B/%3D',true,false)Jump('loop',5)&input=Vm0xNFUxRXlSWGhYV0d4VlYwZDRWVmxVU205VlZsVjNWbFJHVkUxV1dqQlVWbHBQVkcxS1NHUkVWbFZXYkVwVVdWVmtVMDVyTVVWaGVqQTk

### Magic 支持递归解码

- [Decode a Base64-encoded string](<https://gchq.github.io/CyberChef/#recipe=From_Base64('A-Za-z0-9%2B/%3D',true)&input=VTI4Z2JHOXVaeUJoYm1RZ2RHaGhibXR6SUdadmNpQmhiR3dnZEdobElHWnBjMmd1>)
- [Convert a date and time to a different time zone](https://gchq.github.io/CyberChef/#recipe=Translate_DateTime_Format('Standard date and time','DD/MM/YYYY HH:mm:ss','UTC','dddd Do MMMM YYYY HH:mm:ss Z z','Australia/Queensland')&input=MTUvMDYvMjAxNSAyMDo0NTowMA)
- [Parse a Teredo IPv6 address](<https://gchq.github.io/CyberChef/#recipe=Parse_IPv6_address()&input=MjAwMTowMDAwOjQxMzY6ZTM3ODo4MDAwOjYzYmY6M2ZmZjpmZGQy>)
- [Convert data from a hexdump, then decompress](<https://gchq.github.io/CyberChef/#recipe=From_Hexdump()Gunzip()&input=MDAwMDAwMDAgIDFmIDhiIDA4IDAwIDEyIGJjIGYzIDU3IDAwIGZmIDBkIGM3IGMxIDA5IDAwIDIwICB8Li4uLi6881cu/y7HwS4uIHwKMDAwMDAwMTAgIDA4IDA1IGQwIDU1IGZlIDA0IDJkIGQzIDA0IDFmIGNhIDhjIDQ0IDIxIDViIGZmICB8Li7QVf4uLdMuLsouRCFb/3wKMDAwMDAwMjAgIDYwIGM3IGQ3IDAzIDE2IGJlIDQwIDFmIDc4IDRhIDNmIDA5IDg5IDBiIDlhIDdkICB8YMfXLi6%2BQC54Sj8uLi4ufXwKMDAwMDAwMzAgIDRlIGM4IDRlIDZkIDA1IDFlIDAxIDhiIDRjIDI0IDAwIDAwIDAwICAgICAgICAgICB8TshObS4uLi5MJC4uLnw>)
- [Decrypt and disassemble shellcode](https://gchq.github.io/CyberChef/#recipe=RC4({'option':'UTF8','string':'secret'},'Hex','Hex')Disassemble_x86('64','Full x86 architecture',16,0,true,true)&input=MjFkZGQyNTQwMTYwZWU2NWZlMDc3NzEwM2YyYTM5ZmJlNWJjYjZhYTBhYWJkNDE0ZjkwYzZjYWY1MzEyNzU0YWY3NzRiNzZiM2JiY2QxOTNjYjNkZGZkYmM1YTI2NTMzYTY4NmI1OWI4ZmVkNGQzODBkNDc0NDIwMWFlYzIwNDA1MDcxMzhlMmZlMmIzOTUwNDQ2ZGIzMWQyYmM2MjliZTRkM2YyZWIwMDQzYzI5M2Q3YTVkMjk2MmMwMGZlNmRhMzAwNzJkOGM1YTZiNGZlN2Q4NTlhMDQwZWVhZjI5OTczMzYzMDJmNWEwZWMxOQ)
- <a href="https://gchq.github.io/CyberChef/#recipe=Fork('\\n','\\n',false)From_UNIX_Timestamp('Seconds (s)')&input=OTc4MzQ2ODAwCjEwMTI2NTEyMDAKMTA0NjY5NjQwMAoxMDgxMDg3MjAwCjExMTUzMDUyMDAKMTE0OTYwOTYwMA">Array | Display multiple timestamps as full dates</a>
- [Condition | Carry out different operations on data of different types](<https://gchq.github.io/CyberChef/#recipe=Fork('\n','\n',false)Conditional_Jump('1',false,'base64',10)To_Hex('Space')Return()Label('base64')To_Base64('A-Za-z0-9%2B/%3D')&input=U29tZSBkYXRhIHdpdGggYSAxIGluIGl0ClNvbWUgZGF0YSB3aXRoIGEgMiBpbiBpdA>)
- <a href="https://gchq.github.io/CyberChef/#recipe=Register('key%3D([\\da-f]*)',true,false)Find_/_Replace({'option':'Regex','string':'.*data%3D(.*)'},'$1',true,false,true)RC4({'option':'Hex','string':'$R0'},'Hex','Latin1')&input=aHR0cDovL21hbHdhcmV6LmJpei9iZWFjb24ucGhwP2tleT0wZTkzMmE1YyZkYXRhPThkYjdkNWViZTM4NjYzYTU0ZWNiYjMzNGUzZGIxMQ">Register | Use parts of the input as arguments to operations</a>
- <a href="https://gchq.github.io/CyberChef/#recipe=Register('(.{32})',true,false)Drop_bytes(0,32,false)AES_Decrypt({'option':'Hex','string':'1748e7179bd56570d51fa4ba287cc3e5'},{'option':'Hex','string':'$R0'},'CTR','Hex','Raw',{'option':'Hex','string':''})&input=NTFlMjAxZDQ2MzY5OGVmNWY3MTdmNzFmNWI0NzEyYWYyMGJlNjc0YjNiZmY1M2QzODU0NjM5NmVlNjFkYWFjNDkwOGUzMTljYTNmY2Y3MDg5YmZiNmIzOGVhOTllNzgxZDI2ZTU3N2JhOWRkNmYzMTFhMzk0MjBiODk3OGU5MzAxNGIwNDJkNDQ3MjZjYWVkZjU0MzZlYWY2NTI0MjljMGRmOTRiNTIxNjc2YzdjMmNlODEyMDk3YzI3NzI3M2M3YzcyY2Q4OWFlYzhkOWZiNGEyNzU4NmNjZjZhYTBhZWUyMjRjMzRiYTNiZmRmN2FlYjFkZGQ0Nzc2MjJiOTFlNzJjOWU3MDlhYjYwZjhkYWY3MzFlYzBjYzg1Y2UwZjc0NmZmMTU1NGE1YTNlYzI5MWNhNDBmOWU2MjlhODcyNTkyZDk4OGZkZDgzNDUzNGFiYTc5YzFhZDE2NzY3NjlhN2MwMTBiZjA0NzM5ZWNkYjY1ZDk1MzAyMzcxZDYyOWQ5ZTM3ZTdiNGEzNjFkYTQ2OGYxZWQ1MzU4OTIyZDJlYTc1MmRkMTFjMzY2ZjMwMTdiMTRhYTAxMWQyYWYwM2M0NGY5NTU3OTA5OGExNWUzY2Y5YjQ0ODZmOGZmZTljMjM5ZjM0ZGU3MTUxZjZjYTY1MDBmZTRiODUwYzNmMWMwMmU4MDFjYWYzYTI0NDY0NjE0ZTQyODAxNjE1YjhmZmFhMDdhYzgyNTE0OTNmZmRhN2RlNWRkZjMzNjg4ODBjMmI5NWIwMzBmNDFmOGYxNTA2NmFkZDA3MWE2NmNmNjBlNWY0NmYzYTIzMGQzOTdiNjUyOTYzYTIxYTUzZg">Perform AES decryption, extracting the IV from the beginning of the cipher stream</a>
- [Automagically detect several layers of nested encoding](<https://gchq.github.io/CyberChef/#recipe=Magic(3,false,false)&input=V1VhZ3dzaWFlNm1QOGdOdENDTFVGcENwQ0IyNlJtQkRvREQ4UGFjZEFtekF6QlZqa0syUXN0RlhhS2hwQzZpVVM3UkhxWHJKdEZpc29SU2dvSjR3aGptMWFybTg2NHFhTnE0UmNmVW1MSHJjc0FhWmM1VFhDWWlmTmRnUzgzZ0RlZWpHWDQ2Z2FpTXl1QlY2RXNrSHQxc2NnSjg4eDJ0TlNvdFFEd2JHWTFtbUNvYjJBUkdGdkNLWU5xaU45aXBNcTFaVTFtZ2tkYk51R2NiNzZhUnRZV2hDR1VjOGc5M1VKdWRoYjhodHNoZVpud1RwZ3FoeDgzU1ZKU1pYTVhVakpUMnptcEM3dVhXdHVtcW9rYmRTaTg4WXRrV0RBYzFUb291aDJvSDRENGRkbU5LSldVRHBNd21uZ1VtSzE0eHdtb21jY1BRRTloTTE3MkFQblNxd3hkS1ExNzJSa2NBc3lzbm1qNWdHdFJtVk5OaDJzMzU5d3I2bVMyUVJQ>)

Base 数字转换

- 10 => 16 -- Base from 16

FlowControl:
Register 保存数据
Conditional Jump - 单行控制: 正则匹配 + flow + return(这是非匹配行)
-- 正则匹配(label:key) + flow + return(这是非匹配行)
-- label key + flow (匹配行)
Util:
Drop 删除字符
Take 保留字符
每行单独执行

1.  fork
2.  添加执行码

rc4 解码 file:///F:/downloads/@CTF/CyberChef*v9.21.0/CyberChef_v9.21.0.html#recipe=RC4(%7B'option':'UTF8','string':'12345678abcdefghijklmnopqrspxyz'%7D,'Hex','Latin1')&input=YmNjNTEyN2Q4NTIzODQ3MTdiMzkyODAyZDM1MWYzMmM4OTJiYTYyY2FmMDk
hex array to char file:///F:/downloads/@CTF/CyberChef_v9.21.0/CyberChef_v9.21.0.html#recipe=Regular_expression('User%20defined','%5C%5Cd%2B',true,true,false,false,false,false,'List%20matches')From_Charcode('Line%20feed',16)&input=MzEgMzIgMzM
每行+3 用 subtract `-3` https://gchq.github.io/CyberChef/#recipe=Fork('\\n','\\n',false)Find*/\_Replace({'option':'Regex','string':'$'},' -3',true,false,true,false)Subtract('Space')&input=MTIKMTU

```
* 1
find: $
replace: {space}-3
*2
subtract: delimiter space,  , substract -3就= -(-3) = +3
```

hex 转数字 - base16, 计算还是用 subtract 配合使用
求余

```
input: c8
1.From Hex转二进制
2.用and 127 对byte取余

From_Hex('Auto')
AND({'option':'Decimal','string':'127'})

#recipe=From_Hex('Auto')AND(%7B'option':'Decimal','string':'127'%7D)&input=Yzg

```

### subsection

捕获组，后期替换都会在 subsection 的捕获组里进行处理。
