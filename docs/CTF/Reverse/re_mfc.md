
1. xspy查看
2. ressource hacker查看
3. 隐藏窗口 
4. 断点 用OD打开，bp MessageBoxW，运行，栈回溯调用源


示例 https://zhuanlan.zhihu.com/p/30718467
## FAQ

### 调用隐藏窗口
https://blog.csdn.net/yhfgs/article/details/121364441
https://blog.csdn.net/qq_51600802/article/details/121453612
```c
#include <stdio.h>
#include <stdlib.h>
#include <Windows.h>
​
int main()
{
    HWND h = ::FindWindowA(NULL, "Flag就在控件里");
    if (h)
    {
        SendMessage(h, 0x464, NULL, NULL);
    }
    else{
        printf("false");
    }
​
    system("pause");
    return 0;
```