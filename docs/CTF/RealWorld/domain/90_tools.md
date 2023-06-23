# ADfind

[Link](http://www.nooemotion.com/2023/02/20/%e5%9f%9f%e6%b8%97%e9%80%8f%e7%ac%94%e8%ae%b0-%e5%b7%a5%e5%85%b7%e4%bd%bf%e7%94%a8-adfind/)

```sh
# 域为 tide1.org 未使用域账户运行需要手动填写
Adfind.exe -h 192.168.161.177:389 -u test\zhangsan -up qwer1234! -sc dclist

# 域控
Adfind.exe -sc dclist
# 2.-b basedn  该选项指定查询的根节点
Adfind.exe -b dc=tide1,dc=org -f "objectcategory=computer" -dn
Adfind.exe -f "(&(objectcategory=person)(objectclass=user))" -dn
Adfind.exe -f "objectcategory=computer"

# -号 查询结果不换行。
Adfind.exe -f "objectcategory=computer" -dn
# 域控名称
AdFind.exe -sc dclist

# 查看域控版本：

AdFind.exe -schema -s base objectversion

不同域控版本对应的数宇如下:
Windows 2000 Server operating system: 13;
Windows Server 2003 operating system: 30;
Windows Server 2003 R2 operating system: 31;
Windows Server 2008 operating system (AD DS): 44;
Windows Server 2008 R2 operating system (AD DS): 47;
Windows Server 2012 operating system (AD DS): 56;
Windows Server 2012 R2 operating system (AD DS): 69;
Windows Server 2016 operating system (AD DS): 87;
Windows Server v1709 operating system (AD DS): 87;
Windows Server v1803 operating system (AD DS): 88;
Windows Server v1809 operating system (AD DS): 88;
Windows Server 2019 operating system (AD DS): 88;
Active Directory Application Mode (ADAM): 30;
Windows Server 2008 (AD LDS): 30;
Windows Server 2008 R2 (AD LDS): 31;
Windows Server 2012 (AD LDS): 31;
Windows Server 2012 R2 (AD LDS): 31;
Windows Server 2016 (AD LDS): 31;
Windo ws Server 2019 (AD LDS): 31o
Windows Server v1809 (AD LDS):31;
Windows Server v1803 (AD LDS): 31;
Windows Server v1709 (AD LDS): 31;


# 查询当前域中所有计算机（只显示名称和操作系统）：
AdFind.exe -f "objectcategory=computer" name operatingSystem

# 查看域管账户：
AdFind.exe -default -f "(&(|(&(objectCategory=person)(objectClass=user))(objectCategory=group))(adminCount=1))" -dn

# 查看指定域（test.com）内非约束委派主机：
AdFind.exe -b "DC=tide1,DC=org" -f "(&(samAccountType=805306369)(userAccountControl:1.2.840.113556.1.4.803:=524288))" cn

# 查询指定域（test.com）内的非约束委派用户：
AdFind.exe -b "DC=tide1,DC=org" -f "(&(samAccountType=805306368)(userAccountControl:1.2.840.113556.1.4.803:=524288))" cn distinguishedName

```
