

memcmp
int memcmp(const void *buf1, const void *buf2, unsigned int count);
```
当buf1<buf2时，返回值<0
当buf1=buf2时，返回值=0
当buf1>buf2时，返回值>0
```