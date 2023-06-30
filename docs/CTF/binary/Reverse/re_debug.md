# 多线程

CreateThread( lpThreadAttributes, dwStackSize, lpStartAddress, lpParameter, dwCreationFlags, lpThreadID);

lpThreadAttrivutes：指向SECURITY_ATTRIBUTES的指针，用于定义新线程的安全属性，一般设置成NULL；
dwStackSize：分配以字节数表示的线程堆栈的大小，默认值是0；
lpStartAddress：指向线程函数地址。
lpParameter：传递给线程函数的参数；
dwCreationFlags：表示创建线程的运行状态，其中CREATE_SUSPEND表示挂起当前创建的线程，而0表示立即执行当前创建的进程；
lpThreadID：返回新创建的线程的ID编号；
如果函数调用成功，则返回新线程的句柄，调用WaitForSingleObject函数等待所创建线程的运行结束。函数的格式如下：

WaitForSingleObject函数为挂起运行的该线程，使等待对象的对象变为有信号状态。

## Article
[WaitForSingleObject](https://blog.csdn.net/LL596214569/article/details/81088862)
[IDA调试Android native ](https://www.52pojie.cn/thread-554068-1-1.html) 
[[原创]-------------IDA调试 android so文件的10个技巧 ](https://bbs.pediy.com/thread-221876.htm) 
[[原创]样本分析中解决 ollydbg 多线程调试 ](https://bbs.pediy.com/thread-254194.htm)
[OD之多线程调试](https://segmentfault.com/a/1190000024541805)
[buuctf一道比较经典的多线程题目](https://blog.csdn.net/weixin_43990313/article/details/108822396)
[BUUCTF-Youngter-drive 双线程的思考](https://www.cnblogs.com/Cat-opdog/p/15704458.html)
F:\downloads\@toHDD_toCTFsoft\@article\多线程\
