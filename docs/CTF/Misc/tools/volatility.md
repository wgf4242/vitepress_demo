[Volatility工具使用详解](https://mp.weixin.qq.com/s/25XFSKLrpJvIElKv-xW-zg)
[内存取证_Browser 转载](https://blog.51cto.com/u_15072914/4350312 )

## volatility 内存取证
收费的取证大师，火眼数据分析和Arsenal。
vsadmin - 只能分析卷影、
[010手动提取](../forensics.md#取证题)

[Documentation](https://volatilityfoundation.github.io/volatility/d9/d2d/classvolatility_1_1plugins_1_1linux_1_1recover__filesystem_1_1linux__recover__filesystem.html)

cheat sheet https://blog.onfvp.com/post/volatility-cheatsheet/
https://book.hacktricks.xyz/forensics/basic-forensic-methodology/memory-dump-analysis/volatility-examples

https://bnessy.com/archives/%E7%94%B5%E5%AD%90%E6%95%B0%E6%8D%AE%E5%8F%96%E8%AF%81-volatility

1.题目相关内容搜索 比如 Sakura
2.raw 全局全文搜索文件
3.Dumpit.exe默认生成文件是 {hash}.raw, 默认保存路径是dumpit.exe所在的路径,把生成的文件dump下来
3.1 Dumpit 在运行中, 把dumpit.exe的内存镜像dump下来, foremost分离

mimikatz.py 放到 plugins 目录下即可 /usr/lib/python2.7/dist-packages/volatility/plugins
pip2 install construct==2.9.51

https://blog.csdn.net/qq_42880719/article/details/117304586
https://wiki.wgpsec.org/knowledge/ctf/Volatility.html

## Add profile
vol2: 
profiles https://github.com/volatilityfoundation/profiles/tree/master/Linux/Ubuntu/x64
-- 放在 /usr/lib/python2.7/dist-packages/volatility/plugins/overlays/linux/

vol3: add symbols
https://book.hacktricks.xyz/forensics/basic-forensic-methodology/memory-dump-analysis/volatility-examples
https://downloads.volatilityfoundation.org/volatility3/symbols/windows.zip
https://downloads.volatilityfoundation.org/volatility3/symbols/mac.zip
https://downloads.volatilityfoundation.org/volatility3/symbols/linux.zip
copy to 
/home/kali/.local/lib/python3.9/site-packages/volatility3/symbols

## Command

`volatility -f <文件名> --profile=<配置文件> <插件> [插件参数]`

```sh
volatility -f raw.raw imageinfo                      # 镜像信息
volatility -f raw.raw --profile=Win7SP1x64 pslist
volatility -f raw.raw --profile=Win7SP1x64 pstree
volatility -f raw.raw --profile=Win7SP1x64 iehistory  # 查看搜索历史
volatility -f raw.raw --profile=Win7SP1x64 cmdscan  # 命令行的记录  搜索XP/2003/Vista/2008和conhost.exe上搜索csrss.exe的内存，对于win7是搜索cmd.exe。是搜索命令行的输入历史记录
volatility -f raw.raw --profile=Win7SP1x64 lsadump  #lsadump 查看最后登录的用户
volatility -f raw.raw --profile=Win7SP1x64 consoles # CONSOLE_INFORMATION，比cmdscan详细 能查看到输入的指令以及缓冲区的输出(即键入和键出)
volatility -f raw.raw --profile=Win7SP1x64 cmdline

python vol.py -f $file --profile=$profile linux_recover_filesystem -D ./filesystem # 恢复系统
```

恢复删除的文件
```
mkdir mftoutput
volatility -f raw.raw --profile=Win7SP1x64 mftparser  –output-file=mftverbose.txt -D mftoutput
```

除此之外，简单讲一些不常见的指令

```
privs:显示进程权限
envars：显示进程环境变量
verinfo：显示PE文件中嵌入的版本信息
enumfunc：列出进程，dll和内核驱动程序导入和导出
```

filescan 扫描文件指令,一般呢会根据正在进行的进程来定向扫描，也常常会扫描桌面文件。

```
volatility -f raw.raw --profile=Win7SP1x64 filescan
volatility -f raw.raw --profile=Win7SP1x64 filescan | grep "flag"
volatility -f raw.raw --profile=Win7SP1x64 filescan | grep "Desktop"（有的可能是中文把Desktop改成桌面即可）
volatility -f raw.raw --profile=Win7SP1x64 filescan | grep -E "png"（查找png后缀文件）
```

dumpfiles dump出指定PID的文件，一般只要是做内存题都会用到的指令。

```
volatility -f raw.raw --profile=Win7SP1x64 dumpfiles -Q [PID] -D ./
volatility -f raw.raw --profile=WinXPSP2x86 memdump -p [PID] -D [dump 出的文件保存的目录]     # 内存中提取
volatility -f raw.raw --profile=WinXPSP2x86 procdump -p [PID] -D [dump 出的文件保存的目录]    # 进程中提取
```
将PID的文件保存在当前目录

memdump 可以将内存中的某个进程保存出来

volatility -f win7.vmem --profile=Win7SP1x64 memdump -p [PID] -D ./

editbox/notepad
显示出有关编辑控件的信息
在XP中，正在运行的notepad程序，使用notepad指令就可以看到notepad.exe的内容，而在win7中，将不支持notepad，只能使用editbox，这里举例editbox

volatility -f raw.raw --profile=Win7SP1x64 editbox

netscan
查看网络连接的连接情况

volatility -f raw.raw --profile=Win7SP1x64 netscan

svcscan
扫描windows服务列表

volatility -f raw.raw --profile=Win7SP1x64 svcscan

screenshot
显示GDI样式的截屏

volatility -f raw.raw --profile=Win7SP1x64 screenshot -D ./

userassist
查看运行的进程和次数

volatility -f raw.raw --profile=Win7SP1x64 userassist

clipboard
剪贴板数据，加参数-v可以导出

volatility -f raw.raw --profile=Win7SP1x64 clipboard
volatility -f raw.raw --profile=Win7SP1x64 clipboard -v >clip.txt


hivelist
列出注册表

volatility -f raw.raw --profile=Win7SP1x64 hivelist
加参数-o virtual地址可以导出，如volatility -f raw.raw --profile=Win7SP1x64 hivelist -o 0xfffff8a003696010

iehistory
获取浏览器的浏览历史，这个指令也经常用到。

volatility -f raw.raw --profile=Win7SP1x64 iehistory


dlldump
将指定PID的进程的所有DLL导出

volatility -f raw.raw --profile=Win7SP1x64 dlldump -p [PID] -D ./


printkey
常常是用来列举用户及密码、查看获取最后登陆系统的用户。

获取用户：volatility -f raw.raw --profile=Win7SP1x64 printkey -K "SAM\Domains\Account\Users\Names"

获取最后登陆系统的用户：volatility -f raw.raw --profile=Win7SP1x64 printkey -K “SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon”


获取密码哈希：
1.获取system 的 virtual 地址，SAM 的 virtual 地址：
volatility -f raw.raw --profile=Win7SP1x64 hivelist

获取内存中的系统密码，我们可以使用 hashdump 将它提取出来 。

    volatility -f mem.vmem –profile=WinXPSP2x86 hashdump -y 0xe1035b60 -s 0xe16aab60 

2.hashdump:
volatility -f raw.raw --profile=Win7SP1x64 hashdump -y 0xfffff8a000024010 -s 0xfffff8a001390010
volatility -f raw.raw --profile=Win7SP1x64 hashdump -y （注册表 system 的 virtual 地址 ）-s （SAM 的 virtual 地址）


>3.碰运气解hash(一般题都是能用cmd5、somd5解出来的)

配合Gimp
dump出正在运行的内存，然后配合Gimp

1.dump出正在运行的程序，随便dump都行
volatility -f raw.raw --profile=Win7SP1x64 memdump -p [PID] -D ./
2.将dump出来的文件(如1234.dmp)重命名为.data拓展名(即1234.data)
3.使用Gimp打开(ubuntu)

>4.这里请放大，进行如下操作
(1).将图像类型RGB修改为RGB Alpha
(2).调整高度(建议调稍微高一点)、确定一个看着合适的宽度、调整位移，可以使用鼠标滑轮和键盘来快速调整，也可以拖动调整


查找txt文件
```
volatility -f 1.raw --profile=WinXPSP2x86 filescan|grep "txt"
```

获取–profile的参数 

    volatility -f mem.vmem –profile=WinXPSP2x86 volshell

shell的命令： 

    dt("内核关键数据结构名称")
    如
    dt("_PEB")

剪贴板
    
    volatility -f memeories.vmem --profile=Win10x86_14393 clipboard

列举进程：

    volatility -f mem.vmem –profile=WinXPSP2x86 pslist

列举缓存在内存的注册表 ：

    volatility -f mem.vmem –profile=WinXPSP2x86 hivelist

hivedump 打印出注册表中的数据 ：

    volatility -f mem.vmem –profile=WinXPSP2x86 hivedump -o 注册表的 virtual 地址

获取SAM表中的用户 ：

    volatility -f mem.vmem –profile=WinXPSP2x86 printkey -K "SAM\Domains\Account\Users\Names" 

可以看到有4个用户

获取最后登录系统的账户 ：

    volatility -f mem.vmem –profile=WinXPSP2x86 printkey -K "SOFTWARE\Microsoft\Windows NT\CurrentVersion\Winlogon" 

提取出内存中记录的 当时正在运行的程序有哪些，运行过多少次，最后一次运行的时间等信息 

    volatility -f mem.vmem –profile=WinXPSP2x86 userassist

将内存中的某个进程数据以 dmp 的格式保存出来 。

    volatility -f mem.vmem –profile=WinXPSP2x86 -p [PID] -D [dump 出的文件保存的目录]

二进制编辑器 hexeditor 将以上保存的 dmp 文件打开，并进行调查取证的工作 。

    hexeditor 1736.dmp

二进制.png

你还可以使用 strings 这个工具将它的字符串打印出来。 

    例：

    strings 1736.dmp > 1736.txt 

    strings 1608.dmp > 1736.txt | grep shellcode 

提取内存中保留的 cmd 命令使用情况 。

    volatility -f mem.vmem –profile=WinXPSP2x86 cmdscan

获取到当时的网络连接情况 。

    volatility -f mem.vmem –profile=WinXPSP2x86 netscan

获取 IE 浏览器的使用情况。 

    volatility -f mem.vmem –profile=WinXPSP2x86 iehistory 


最大程度上将内存中的信息提取出来，那么你可以使用 timeliner 这个插件。它会从多个位置来收集系统的活动信息 

    volatility -f mem.vmem –profile=WinXPSP2x86 timeliner


打开kali，使用volatility 查看进程，可以发现一个TrueCrypy.exe的进程。 

    volatility -f mem.vmem –profile=WinXPSP2x86 pslist

TrueCrypy.exe是一款加密程序，而我们可以推出，suspicion为加密的结果。 

我们需要从内存dump出key来。 

    volatility -f mem.vmem –profile=WinXPSP2x86 memdump -p 1464 -D ctf/ 

dump出来的文件为1464.dmp 。

Elcomsoft Forensic Disk Decryptor 的使用。

我们需要借助Elcomsoft Forensic Disk Decryptor（Elcomsoft硬盘取证解密器，简称为EFDD）软件来获取key和破解文件  。
### 提取密码 /mimikatz使用
1.vol.exe -f Yusa-PC.raw --profile=Win7SP1x64 hashdump

2.用mimikatz或者 使用Passware Kit 13来破解Yusa用户的密码

打开软件，点击Memory Analysis功能，再选择Windows User功能

```
# 管理员身份运行
$  mimikatz
mimikatz # privilege::debug
mimikatz # sekurlsa::minidump lsass.dmp
mimikatz # sekurlsa::logonPasswords full
```
### volatility3
2,3命令表
https://blog.onfvp.com/post/volatility-cheatsheet/
https://book.hacktricks.xyz/forensics/basic-forensic-methodology/memory-dump-analysis/volatility-examples
https://volatility3.readthedocs.io/en/latest/basics.html
[Doc](https://volatility3.readthedocs.io/en/latest/getting-started-windows-tutorial.html#listing-plugins)

vol3 不用指定profile,特定的操作系统有特定的插件。

python3 vol.py [plugin] -f [image]

python3 vol.py -f ../raw.raw windows.info

```sh
# python3 vol.py --help | grep windows
# python3 vol.py --help | grep linux
banners.Banners                              # Attempts to identify potential linux banners in an
linux.bash.Bash                              # Recovers bash command history from memory.
linux.check_afinfo.Check_afinfo
linux.check_creds.Check_creds
linux.check_idt.Check_idt
linux.check_modules.Check_modules
linux.check_syscall.Check_syscall
linux.elfs.Elfs                              # Lists all memory mapped ELF files for all processes.
linux.keyboard_notifiers.Keyboard_notifiers
linux.kmsg.Kmsg                              # Kernel log buffer reader
linux.lsmod.Lsmod                            # Lists loaded kernel modules.
linux.lsof.Lsof                              # Lists all memory maps for all processes.
linux.malfind.Malfind
linux.mountinfo.MountInfo
linux.proc.Maps                              # Lists all memory maps for all processes.
linux.psaux.PsAux                            # Lists processes with their command line arguments
linux.pslist.PsList                          # Lists the processes present in a particular linux
linux.pstree.PsTree
linux.tty_check.tty_check

layerwriter                     # 列出内存镜像platform信息
linux.bash                      # 从内存中恢复bash命令历史记录
linux.check_afinfo              # 验证网络协议的操作功能指针
linux.check_syscall             # 检查系统调用表中的挂钩
linux.elfs                      # 列出所有进程的所有内存映射ELF文件
linux.lsmod                     # 列出加载的内核模块
linux.lsof                      # 列出所有进程的所有内存映射
linux.malfind                   # 列出可能包含注入代码的进程内存范围
linux.proc                      # 列出所有进程的所有内存映射
linux.pslist                    # 列出linux内存映像中存在的进程
linux.pstree                    # 列出进程树
mac.bash                        # 从内存中恢复bash命令历史记录
mac.check_syscall               # 检查系统调用表中的挂钩
mac.check_sysctl                # 检查sysctl处理程序的挂钩
mac.check_trap_table            # 检查trap表中的挂钩
mac.ifconfig                    # 列出网卡信息
mac.lsmod                       # 列出加载的内核模块
mac.lsof                        # 列出所有进程的所有内存映射
mac.malfind                     # 列出可能包含注入代码的进程内存范围
mac.netstat                     # 列出所有进程的所有网络连接
mac.psaux                       # 恢复程序命令行参数
mac.pslist                      # 列出linux内存映像中存在的进程
mac.pstree                      # 列出进程树
mac.tasks                       # 列出Mac内存映像中存在的进程
windows.info                    # 显示正在分析的内存样本的OS和内核详细信息
windows.callbacks               # 列出内核回调和通知例程
windows.cmdline                 # 列出进程命令行参数
windows.dlldump                 # 将进程内存范围DLL转储
windows.dlllist                 # 列出Windows内存映像中已加载的dll模块
windows.driverirp               # 在Windows内存映像中列出驱动程序的IRP
windows.driverscan              # 扫描Windows内存映像中存在的驱动程序
windows.filescan                # 扫描Windows内存映像中存在的文件对象
windows.handles                 # 列出进程打开的句柄
windows.malfind                 # 列出可能包含注入代码的进程内存范围
windows.moddump                 # 转储内核模块
windows.modscan                 # 扫描Windows内存映像中存在的模块
windows.mutantscan              # 扫描Windows内存映像中存在的互斥锁
windows.pslist                  # 列出Windows内存映像中存在的进程
windows.psscan                  # 扫描Windows内存映像中存在的进程
windows.pstree                  # 列出进程树
windows.procdump                # 转储处理可执行映像
windows.registry.certificates   # 列出注册表中存储的证书
windows.registry.hivelist       # 列出内存映像中存在的注册表配置单元
windows.registry.hivescan       # 扫描Windows内存映像中存在的注册表配置单元
windows.registry.printkey       # 在配置单元或特定键值下列出注册表项
windows.registry.userassist     # 打印用户助手注册表项和信息
windows.ssdt                    # 列出系统调用表
windows.strings                 # 读取字符串命令的输出，并指示每个字符串属于哪个进程
windows.svcscan                 # 扫描Windows服务
windows.symlinkscan             # 扫描Windows内存映像中存在的链接
windows.hashdump                # 提取密码
```

### 各种插件

```
Plugins
-------
amcache                    - Print AmCache information
apihooks                   - Detect API hooks in process and kernel memory
atoms                      - Print session and window station atom tables
atomscan                   - Pool scanner for atom tables
auditpol                   - Prints out the Audit Policies from HKLM\SECURITY\Policy\PolAdtEv
bigpools                   - Dump the big page pools using BigPagePoolScanner
bioskbd                    - Reads the keyboard buffer from Real Mode memory
cachedump                  - Dumps cached domain hashes from memory
callbacks                  - Print system-wide notification routines
clipboard                  - Extract the contents of the windows clipboard
cmdline                    - Display process command-line arguments
cmdscan                    - Extract command history by scanning for _COMMAND_HISTORY
connections                - Print list of open connections [Windows XP and 2003 Only]
connscan                   - Pool scanner for tcp connections
consoles                   - Extract command history by scanning for _CONSOLE_INFORMATION
crashinfo                  - Dump crash-dump information
deskscan                   - Poolscaner for tagDESKTOP (desktops)
devicetree                 - Show device tree
dlldump                    - Dump DLLs from a process address space
dlllist                    - Print list of loaded dlls for each process
driverirp                  - Driver IRP hook detection
drivermodule               - Associate driver objects to kernel modules
driverscan                 - Pool scanner for driver objects
dumpcerts                  - Dump RSA private and public SSL keys
dumpfiles                  - Extract memory mapped and cached files
dumpregistry               - Dumps registry files out to disk
editbox                    - Displays information about Edit controls. (Listbox experimental.)
envars                     - Display process environment variables
eventhooks                 - Print details on windows event hooks
evtlogs                    - Extract Windows Event Logs (XP/2003 only)
filescan                   - Pool scanner for file objects
gahti                      - Dump the USER handle type information
gditimers                  - Print installed GDI timers and callbacks
gdt                        - Display Global Descriptor Table
getservicesids             - Get the names of services in the Registry and return Calculated SID
getsids                    - Print the SIDs owning each process
handles                    - Print list of open handles for each process
hashdump                   - Dumps passwords hashes (LM/NTLM) from memory
hibinfo                    - Dump hibernation file information
hivedump                   - Prints out a hive
hivelist                   - Print list of registry hives.
hivescan                   - Pool scanner for registry hives
hpakextract                - Extract physical memory from an HPAK file
hpakinfo                   - Info on an HPAK file
idt                        - Display Interrupt Descriptor Table
iehistory                  - Reconstruct Internet Explorer cache / history
imagecopy                  - Copies a physical address space out as a raw DD image
imageinfo                  - Identify information for the image
impscan                    - Scan for calls to imported functions
joblinks                   - Print process job link information
kdbgscan                   - Search for and dump potential KDBG values
kpcrscan                   - Search for and dump potential KPCR values
ldrmodules                 - Detect unlinked DLLs
limeinfo                   - Dump Lime file format information
linux_apihooks             - Checks for userland apihooks
linux_arp                  - Print the ARP table
linux_aslr_shift           - Automatically detect the Linux ASLR shift
linux_banner               - Prints the Linux banner information
linux_bash                 - Recover bash history from bash process memory
linux_bash_env             - Recover a process' dynamic environment variables
linux_bash_hash            - Recover bash hash table from bash process memory
linux_check_afinfo         - Verifies the operation function pointers of network protocols
linux_check_creds          - Checks if any processes are sharing credential structures
linux_check_evt_arm        - Checks the Exception Vector Table to look for syscall table hooking
linux_check_fop            - Check file operation structures for rootkit modifications
linux_check_idt            - Checks if the IDT has been altered
linux_check_inline_kernel  - Check for inline kernel hooks
linux_check_modules        - Compares module list to sysfs info, if available
linux_check_syscall        - Checks if the system call table has been altered
linux_check_syscall_arm    - Checks if the system call table has been altered
linux_check_tty            - Checks tty devices for hooks
linux_cpuinfo              - Prints info about each active processor
linux_dentry_cache         - Gather files from the dentry cache
linux_dmesg                - Gather dmesg buffer
linux_dump_map             - Writes selected memory mappings to disk
linux_dynamic_env          - Recover a process' dynamic environment variables
linux_elfs                 - Find ELF binaries in process mappings
linux_enumerate_files      - Lists files referenced by the filesystem cache
linux_find_file            - Lists and recovers files from memory
linux_getcwd               - Lists current working directory of each process
linux_hidden_modules       - Carves memory to find hidden kernel modules
linux_ifconfig             - Gathers active interfaces
linux_info_regs            - It's like 'info registers' in GDB. It prints out all the
linux_iomem                - Provides output similar to /proc/iomem
linux_kernel_opened_files  - Lists files that are opened from within the kernel
linux_keyboard_notifiers   - Parses the keyboard notifier call chain
linux_ldrmodules           - Compares the output of proc maps with the list of libraries from libdl
linux_library_list         - Lists libraries loaded into a process
linux_librarydump          - Dumps shared libraries in process memory to disk
linux_list_raw             - List applications with promiscuous sockets
linux_lsmod                - Gather loaded kernel modules
linux_lsof                 - Lists file descriptors and their path
linux_malfind              - Looks for suspicious process mappings
linux_memmap               - Dumps the memory map for linux tasks
linux_moddump              - Extract loaded kernel modules
linux_mount                - Gather mounted fs/devices
linux_mount_cache          - Gather mounted fs/devices from kmem_cache
linux_netfilter            - Lists Netfilter hooks
linux_netscan              - Carves for network connection structures
linux_netstat              - Lists open sockets
linux_pidhashtable         - Enumerates processes through the PID hash table
linux_pkt_queues           - Writes per-process packet queues out to disk
linux_plthook              - Scan ELF binaries' PLT for hooks to non-NEEDED images
linux_proc_maps            - Gathers process memory maps
linux_proc_maps_rb         - Gathers process maps for linux through the mappings red-black tree
linux_procdump             - Dumps a process's executable image to disk
linux_process_hollow       - Checks for signs of process hollowing
linux_psaux                - Gathers processes along with full command line and start time
linux_psenv                - Gathers processes along with their static environment variables
linux_pslist               - Gather active tasks by walking the task_struct->task list
linux_pslist_cache         - Gather tasks from the kmem_cache
linux_psscan               - Scan physical memory for processes
linux_pstree               - Shows the parent/child relationship between processes
linux_psxview              - Find hidden processes with various process listings
linux_recover_filesystem   - Recovers the entire cached file system from memory
linux_route_cache          - Recovers the routing cache from memory
linux_sk_buff_cache        - Recovers packets from the sk_buff kmem_cache
linux_slabinfo             - Mimics /proc/slabinfo on a running machine
linux_strings              - Match physical offsets to virtual addresses (may take a while, VERY verbose)
linux_threads              - Prints threads of processes
linux_tmpfs                - Recovers tmpfs filesystems from memory
linux_truecrypt_passphrase - Recovers cached Truecrypt passphrases
linux_vma_cache            - Gather VMAs from the vm_area_struct cache
linux_volshell             - Shell in the memory image
linux_yarascan             - A shell in the Linux memory image
lsadump                    - Dump (decrypted) LSA secrets from the registry
mac_adium                  - Lists Adium messages
mac_apihooks               - Checks for API hooks in processes
mac_apihooks_kernel        - Checks to see if system call and kernel functions are hooked
mac_arp                    - Prints the arp table
mac_bash                   - Recover bash history from bash process memory
mac_bash_env               - Recover bash's environment variables
mac_bash_hash              - Recover bash hash table from bash process memory
mac_calendar               - Gets calendar events from Calendar.app
mac_check_fop              - Validate File Operation Pointers
mac_check_mig_table        - Lists entires in the kernel's MIG table
mac_check_syscall_shadow   - Looks for shadow system call tables
mac_check_syscalls         - Checks to see if system call table entries are hooked
mac_check_sysctl           - Checks for unknown sysctl handlers
mac_check_trap_table       - Checks to see if mach trap table entries are hooked
mac_compressed_swap        - Prints Mac OS X VM compressor stats and dumps all compressed pages
mac_contacts               - Gets contact names from Contacts.app
mac_dead_procs             - Prints terminated/de-allocated processes
mac_dead_sockets           - Prints terminated/de-allocated network sockets
mac_dead_vnodes            - Lists freed vnode structures
mac_devfs                  - Lists files in the file cache
mac_dmesg                  - Prints the kernel debug buffer
mac_dump_file              - Dumps a specified file
mac_dump_maps              - Dumps memory ranges of process(es), optionally including pages in compressed swap
mac_dyld_maps              - Gets memory maps of processes from dyld data structures
mac_find_aslr_shift        - Find the ASLR shift value for 10.8+ images
mac_get_profile            - Automatically detect Mac profiles
mac_ifconfig               - Lists network interface information for all devices
mac_interest_handlers      - Lists IOKit Interest Handlers
mac_ip_filters             - Reports any hooked IP filters
mac_kernel_classes         - Lists loaded c++ classes in the kernel
mac_kevents                - Show parent/child relationship of processes
mac_keychaindump           - Recovers possbile keychain keys. Use chainbreaker to open related keychain files
mac_ldrmodules             - Compares the output of proc maps with the list of libraries from libdl
mac_librarydump            - Dumps the executable of a process
mac_list_files             - Lists files in the file cache
mac_list_kauth_listeners   - Lists Kauth Scope listeners
mac_list_kauth_scopes      - Lists Kauth Scopes and their status
mac_list_raw               - List applications with promiscuous sockets
mac_list_sessions          - Enumerates sessions
mac_list_zones             - Prints active zones
mac_lsmod                  - Lists loaded kernel modules
mac_lsmod_iokit            - Lists loaded kernel modules through IOkit
mac_lsmod_kext_map         - Lists loaded kernel modules
mac_lsof                   - Lists per-process opened files
mac_machine_info           - Prints machine information about the sample
mac_malfind                - Looks for suspicious process mappings
mac_memdump                - Dump addressable memory pages to a file
mac_moddump                - Writes the specified kernel extension to disk
mac_mount                  - Prints mounted device information
mac_netstat                - Lists active per-process network connections
mac_network_conns          - Lists network connections from kernel network structures
mac_notesapp               - Finds contents of Notes messages
mac_notifiers              - Detects rootkits that add hooks into I/O Kit (e.g. LogKext)
mac_orphan_threads         - Lists threads that don't map back to known modules/processes
mac_pgrp_hash_table        - Walks the process group hash table
mac_pid_hash_table         - Walks the pid hash table
mac_print_boot_cmdline     - Prints kernel boot arguments
mac_proc_maps              - Gets memory maps of processes
mac_procdump               - Dumps the executable of a process
mac_psaux                  - Prints processes with arguments in user land (**argv)
mac_psenv                  - Prints processes with environment in user land (**envp)
mac_pslist                 - List Running Processes
mac_pstree                 - Show parent/child relationship of processes
mac_psxview                - Find hidden processes with various process listings
mac_recover_filesystem     - Recover the cached filesystem
mac_route                  - Prints the routing table
mac_socket_filters         - Reports socket filters
mac_strings                - Match physical offsets to virtual addresses (may take a while, VERY verbose)
mac_tasks                  - List Active Tasks
mac_threads                - List Process Threads
mac_threads_simple         - Lists threads along with their start time and priority
mac_timers                 - Reports timers set by kernel drivers
mac_trustedbsd             - Lists malicious trustedbsd policies
mac_version                - Prints the Mac version
mac_vfsevents              - Lists processes filtering file system events
mac_volshell               - Shell in the memory image
mac_yarascan               - Scan memory for yara signatures
machoinfo                  - Dump Mach-O file format information
malfind                    - Find hidden and injected code
mbrparser                  - Scans for and parses potential Master Boot Records (MBRs)
memdump                    - Dump the addressable memory for a process
memmap                     - Print the memory map
messagehooks               - List desktop and thread window message hooks
mftparser                  - Scans for and parses potential MFT entries
moddump                    - Dump a kernel driver to an executable file sample
modscan                    - Pool scanner for kernel modules
modules                    - Print list of loaded modules
multiscan                  - Scan for various objects at once
mutantscan                 - Pool scanner for mutex objects
netscan                    - Scan a Vista (or later) image for connections and sockets
notepad                    - List currently displayed notepad text
objtypescan                - Scan for Windows object type objects
patcher                    - Patches memory based on page scans
poolpeek                   - Configurable pool scanner plugin
pooltracker                - Show a summary of pool tag usage
printkey                   - Print a registry key, and its subkeys and values
privs                      - Display process privileges
procdump                   - Dump a process to an executable file sample
pslist                     - Print all running processes by following the EPROCESS lists
psscan                     - Pool scanner for process objects
pstree                     - Print process list as a tree
psxview                    - Find hidden processes with various process listings
qemuinfo                   - Dump Qemu information
raw2dmp                    - Converts a physical memory sample to a windbg crash dump
screenshot                 - Save a pseudo-screenshot based on GDI windows
servicediff                - List Windows services (ala Plugx)
sessions                   - List details on _MM_SESSION_SPACE (user logon sessions)
shellbags                  - Prints ShellBags info
shimcache                  - Parses the Application Compatibility Shim Cache registry key
shutdowntime               - Print ShutdownTime of machine from registry
sockets                    - Print list of open sockets
sockscan                   - Pool scanner for tcp socket objects
ssdt                       - Display SSDT entries
strings                    - Match physical offsets to virtual addresses (may take a while, VERY verbose)
svcscan                    - Scan for Windows services
symlinkscan                - Pool scanner for symlink objects
thrdscan                   - Pool scanner for thread objects
threads                    - Investigate _ETHREAD and _KTHREADs
timeliner                  - Creates a timeline from various artifacts in memory
timers                     - Print kernel timers and associated module DPCs
truecryptmaster            - Recover TrueCrypt 7.1a Master Keys
truecryptpassphrase        - TrueCrypt Cached Passphrase Finder
truecryptsummary           - TrueCrypt Summary
unloadedmodules            - Print list of unloaded modules
userassist                 - Print userassist registry keys and information
userhandles                - Dump the USER handle tables
vaddump                    - Dumps out the vad sections to a file
vadinfo                    - Dump the VAD info
vadtree                    - Walk the VAD tree and display in tree format
vadwalk                    - Walk the VAD tree
vboxinfo                   - Dump virtualbox information
verinfo                    - Prints out the version information from PE images
vmwareinfo                 - Dump VMware VMSS/VMSN information
volshell                   - Shell in the memory image
win10cookie                - Find the ObHeaderCookie value for Windows 10
windows                    - Print Desktop Windows (verbose details)
wintree                    - Print Z-Order Desktop Windows Tree
wndscan                    - Pool scanner for window stations
yarascan                   - Scan process or kernel memory with Yara signatures
```

## Linux Profile
[doc](https://github.com/volatilityfoundation/volatility/wiki/Linux-Command-Reference)
```sh
export file=../mem.vmem
export profile=LinuxUbuntu1804x64 linux_bash
python vol.py -f $file --profile=$profile linux_banner
python vol.py -f $file --profile=$profile linux_bash >02_bash
python vol.py -f $file --profile=$profile linux_enumerate_files >01files
python vol.py -f $file --profile=$profile linux_find_file -F "/home/bob/Desktop/app.py"
python vol.py -f $file --profile=$profile linux_find_file -i 0xffff97ce724a7038 -O log
python vol.py -f $file --profile=$profile linux_find_file -i 0xffff97ce55ca2328 -O app
python vol.py -f $file --profile=$profile linux_find_file -i 0xffff97ce3448dad0 -O sth
```
