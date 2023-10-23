# fd

| fd  | description |     |
| --- | ----------- | --- |
| 0   | 标准输入    |     |
| 1   | 标准输出    |     |
| 2   | 标准错误    |     |

close（1）关闭了标准输出, 这时打开文件会从最小文件描述符(1)开始, 可重定向到0或2
close（2）关闭了标准错误


# IO_stderr/IO_stdout

看文件 [利用 _IO_2_1_stdout_ 泄露libc](https://www.jianshu.com/p/27152c14e2e7)
[IOFILE exploit入门](https://mp.weixin.qq.com/s/yrXGg_r-9p9m1qbNolI-5g)
[IO_file 利用总结](https://mp.weixin.qq.com/s/U4XNbjiaSogo9m91ZKaG3g)

1. FILE结构体

```c
pwndbg> p stdout 
$1 = (struct _IO_FILE *) 0x7ffff7dd0760 <_IO_2_1_stdout_>
pwndbg> ptype stdout
type = struct _IO_FILE {
    int _flags;
    char *_IO_read_ptr;
    char *_IO_read_end;
    char *_IO_read_base;
    char *_IO_write_base;  //  本质上是通过修改这个结构题泄露
    char *_IO_write_ptr;   //  这两个指针地址之间的内容
    char *_IO_write_end;
    char *_IO_buf_base;
    char *_IO_buf_end;
    char *_IO_save_base;
    char *_IO_backup_base;
    char *_IO_save_end;
    struct _IO_marker *_markers;
    struct _IO_FILE *_chain;
    int _fileno;
    int _flags2;
    __off_t _old_offset;
    unsigned short _cur_column;
    signed char _vtable_offset;
    char _shortbuf[1];
    _IO_lock_t *_lock;
    __off64_t _offset;
    struct _IO_codecvt *_codecvt;
    struct _IO_wide_data *_wide_data;
    struct _IO_FILE *_freeres_list;
    void *_freeres_buf;
    size_t __pad5;
    int _mode;
    char _unused2[20];
} *
```
