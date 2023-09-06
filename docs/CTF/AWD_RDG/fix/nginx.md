

查看 /etc/nginx/sites-available/ 目录下的站点配置信息

1.目录遍历
autoindex on 这一行属于经典的不安全配置，该项会使得访问无Index文件的路由时列出该目录下的所有文件。

2.目录穿越漏洞
Nginx在配置别名（Alias）的时候，如果忘记加/，将造成一个目录穿越漏洞。
location /file { 
alias /home/file/;
}

location /file 的/file后边没有/，而 alias /home/file/ 的目录最后有/，这样会导致可以通
过访问/file../的方式列出上一级目录来，并且可以/file../xxxx来读取上一级目录的文件.

3.危险HTTP方法
dav_methods PUT DELETE MKCOL COPY MOVE;
