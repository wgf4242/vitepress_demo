协议
glob://


## 伪协议
php://filter/convert.base64-encode/resource=flag.php


## 环境配置

### xdebug调试超时
```ini
# 1.httpd.conf 配置
Timeout 3600
FcgidIOTimeout 3600

# 2.php.ini配置
xdebug.remote_cookie_expire_time = 3600
max_execution_time=3600
max_input_time=3600
default_socket_timeout = 3600
```