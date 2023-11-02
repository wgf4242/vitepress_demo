
# 修改段信息、可执行权限、地址随机化

- 段改为可执行
CFF explorer: 
Section Header: 右击 .data - Change Section Flags - 勾Isexecutable
- 地址随机化: dll不建议关闭随机基址，否则多个dll可能会冲突
Option header - Dll Characteristics, can move 去掉。

- 010方式关闭地址随机化: 
    strcut IMAGE_NT_HEADERS NtHeader
    - struct IMAGE_OPTIONAL_HEADER32 OptionalHeader
        - struct DLL_CHARACTERISTICS DllCharacteristics
            - WORD IMAGE_DLLCHARACTERISTICS_DYNAMIC_BASE: 1 改成0