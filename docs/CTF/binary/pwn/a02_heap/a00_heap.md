## chunk

[Link](https://asteri5m.icu/archives/pwn%E5%85%A5%E9%97%A8%E5%88%B0%E5%85%A5%E5%9C%9F1-%E5%A0%86%E6%A6%82%E8%BF%B0.html)

chunk 是 glibc 管理内存的基本单位，整个堆在初始化后会被当成一个 free chunk，称为 top chunk，每次用户请求内存时，如果 bins 中没有合适的 chunk，malloc 就会从 top chunk 中进行划分，如果 top chunk 的大小不够，就调用 brk 函数扩展堆的大小，然后从新生成的 top chunk 中进行划分。用户释放内存时，glibc 会先根据情况将释放的 chunk 与其他相邻的 free chunk 合并，然后加入合适的 bin 中。

```c
struct malloc_chunk{
    INTERNAL_SIZE_T mchunk_prev_size; 记录被释放的相邻chunk的大小。
    INTERNAL_SIZE_T mchunk_size;      记录当前chunk的大小，chunk的大小都是8字节对齐
    struct malloc_chunk *fd;     /* double links -- used only if free. */
    struct malloc_chunk *bk;     // 只在small bin 产生

    // Only in large bin
    struct malloc_chunk *fd_nextsize; /* double links -- used only if free. */
    struct malloc_chunk *bk_nextsize;
}
```

- 最小的 chunk 为 0x20（x86 下为 0x10）。
- x64，一个地址的内存大小为 0x8，一个最小的 chunk，用 pre size 记录上一个 chunk 大小，用 size 记录自己的大小，size 下面是一个 fd，再下面是 data，所以如果要最小的话，一共是 4 个 0x8，那么就是 0x20 的大小。
- x86，一个地址的内存大小为 0x4，所以就是上述的一半，既最小的堆在 x86 是 0x10

## chunk 分类

| 按状态   | 按大小 | 按特定功能           |
| -------- | ------ | -------------------- |
| malloced | fast   | top chunk            |
| free     | small  | last remainder chunk |
|          | targe  |                      |
|          | tcache |                      |

### 内存块结构

[link](http://www.taodudu.cc/news/show-3444949.html)

**free chunk**

<table border="1">
    <tbody>
      <tr>
        <td>chunk-&gt;</td>
        <td colspan="4">prev_size (x64 8B)</td>
      </tr>
      <tr>
        <td></td>
        <td>size</td>
        <td>N</td>
        <td>M</td>
        <td>P</td>
      </tr>
      <tr>
        <td rowspan="3">PREV_INUSE(P)<br>IS_MMAPPED(M)<br>NON_MAIN_ARENA(N)</td>
        <td colspan="4">fd</td>
      </tr>
      <tr>
        <td colspan="4">bk</td>
      </tr>
      <tr class="h80">
        <td colspan="4">unused</td>
      </tr>
      <tr>
        <td>next chunk-&gt;</td>
        <td colspan="4">prev_size (next_chunk)</td>
      </tr>
    </tbody>
  </table>
  
第二个 8B 的最后三位用来标记 PMN

**allocated chunk**

<table border="1">
  <tr>
    <td>chunk-></td>
    <td colspan="4">prev_size</td>
    <td rowspan="3">chunk<br> size </td>
  </tr>
  <tr>
    <td></td>
    <td>size</td>
    <td>N</td>
    <td>M</td>
    <td>P</td>
  </tr>
  <tr class="h80">
    <td>ptr-><br>(指针是指向data区的)<br>mem-></td>
    <td colspan="4">data</td>
    <td rowspan="4">usable<br> size </td>
</tr>
  <tr>
    <td></td>
    <td colspan="4">data(prev_size)</td>
  </tr>
</table>

<style> .h80 { height: 80px; } </style>

- 第三个字段开始到最后 (包括下一个 chunk prev_size) 都是用户数据。
- prev_size: 仅当前一个 chunk 是 free 的时候才有意义，如果前一个 chunk 是已经分配的，堆管理器并不放心。
- 对一个 chunk 来说，用户可用大小从偏移+8（为何+8，是加上下一个 chunk 的 prev_size 的 8 个字节）开始，一直到下一个 chunk 的 prev_size 字段。
- x64,chunk 大小为 0x10B 的整数倍。malloc 返回的指针位图中 mem 指向的位置，即数据开头
  - 64 位下最小 chunk: 8B(prev_size) + 8B(size) & 0x1(P 值置 1) + 0x10( 要求为 0x10 的整数倍) = 8+(8|1)+0x10 = 21
- x86,chunk 大小为 8B 的整数倍
- 返回的 chunk 只要保证其中可用数据大小大于等于用户申请
- PREV_INUSE 看 free 部分

## top chunk

- 不属于任何 bin
- 在 arena 中处于最高地址
- 当没有其他空闲块时，top chunk 就会被用于分配
- 分裂时：
  - 一块是请求大小的 chunk
  - 另一块余下 chunk 将成为新的 top chunk

# bin

管理 arena 中空闲 chunk 的结构，保管用户暂时不需要的内存空间，当用户申请内存时，如果回收站中有正好满足你需求的空间，直接分配.

## fastbins （单向链表）

| desc            | 请求条件                                              |
| --------------- | ----------------------------------------------------- |
| x86 size_sz==4B | <64B                                                  |
| x64 size_sz==8B | <128B                                                 |
| x64 chunck_size | 32~128 : 0x20~0x80 , 以 0x10 为单位存储在 fastbinY 中 |

一个新被加入的 Fast Bin 的 chunk，其 fd 指针指向上一次加入的 Fast Bin 的 chunk 的 pre size。

fastbinsY 拥有 10 个(上图为 7 个)元素的数组，用于存放每个 fast chunk 链表头指针，所以 fast bins 最多包含 10 个 fast chunk 的单链表

相邻空闲 fast bin chunk 不会被合并
当 chunk 被 free 时，不会清理 PREV_INUSE 标志

**fastbin attack**

- 空闲 Fast chunk 如果发生溢出被覆盖，则链表指针 fd 可以被修改
- 可以通过修改链表指针 fd，在 Fast bin 链表中引入伪造的空闲 Fast chunk
- 下次分配时分配出伪造的 Fast chunk
- 伪造的 Fast chunk 可以在.bss 全局变量处，也可以在栈上·

## small bin（双向链表）

| field       | desc            |
| ----------- | --------------- |
| chunck_size | 32~1024 : 0x400 |

- 当有空闲块相邻时，chunk 会被合并成一个更大的 chunk
- bins[2]bins[3]…bins[125]共 62 组 smallbin，大小范围`[0x20,0x3f0](64位)`

## Large bin（双向链表）

| field       | desc  |
| ----------- | ----- |
| chunck_size | >1024 |

- 相同大小的 Large Bin 使用 fd 和 bk 指针连接
- 不同大小的 Large bin 通过 fd_nextsize 和 bk_nextsize 按大小排序连接。

## unsorted bin（双向链表）

| field           | desc  |
| --------------- | ----- |
| x64 chunck_size | >128B |

unsorted bin 可以看作是 small bins 和 large bins 的 cache，只有一个 unsorted bin，以双链表管理空闲 chunk，空闲 chunk 不排序

申请非 Fast Bin 大小内存会先从 Unsorted Bin 中查找,如果找到符合该申请的 chunk(等于或者大于)，则直接分配或者分割该 chunk。

## bins

bins 用于存储 unstored bin,small bins, 和 large bins 的 chunk 链表头，所有的 chunk 在回收时都要放到 unsorted bin 中，分配时，如果在 unsorted bin 中没有合适的 chunk，就会把 unsorted bin 中的所有 chunk 分别加入到所属的 bin 中，然后再在 bin 中分配合适的 chunk

# malloc

- malloc 返回内存块的指针
- malloc(0) 返回系统允许的堆最小内存块
- malloc(-1) size_t 通常是无符号数，负数会申请很大的内存空间，通常失败，因为系统没有那么多的内存可以分配。

\_int_malloc 是内存分配的核心函数，其核心思路有如下

- 根据申请的内存块大小, 依次实现了不同的分配方法。
- 它由小到大依次检查不同的 bin 中是否有相应的空闲块可以满足用户请求的内存。
- 当所有的空闲 chunk 都无法满足时，它会考虑 top chunk。
- 当 top chunk 也无法满足时，堆分配器才会进行内存块申请。

1. fast bin
   如果 chunk_size <= fastbin(0x80) , 从 fastbin 的头结点开始取 chunk。

2. large bin

- chunk_size > 0x400 考虑是不是 large chunk
- 将可合并的 chunk 合并后放到 unsorted bin 中,不能够合并的就直接放到 unsorted bin 中

3. unsorted bin

- 按照 FIFO 的方式逐个将 unsorted bin 中的 chunk 取出来
  - 如果是 small request，则考虑是不是恰好满足，是的话，直接返回。
  - 如果不是的话，放到对应的 bin 中。
- 尝试从 large bin 中分配用户所需的内存

4. top chunk

- 如果所有的 bin 中都不满足.使用 top chunk.

## 0x06 free

free 释放 p 指向的内存块。 [Link](https://www.freebuf.com/articles/others-articles/257998.html)

1. 如果`size<max_fast(128B?)`，放入 fast bin，结束
2. 如果前一个 chunk 是 free 的
   - a. unlink 前面的 chunk
   - b. 合并两个 chunk，并放入 unsorted bin
3. 如果后一个 chunk 是 top chunk，则将当前 chunk 并入 top chunk
4. 如果后一个 chunk 时 free 的
   - a.unlink 后面的 chunk
   - b.合并两个 chunk，并放入 unsorted bin
5. 前后 chunk 都不是 free 的，放入 unsorted bin

- 当 p 为空指针时，函数不执行任何操作。
- 当 p 已经被释放之后，再次释放会出现乱七八糟的效果，这其实就是 double free。
- 除了被禁用 (mallopt) 的情况下，当释放很大的内存空间时，程序会将这些内存空间还给系统，以便于减小程序所使用的内存空间。
- free –> \_\_libc_free –> \_int_free

- 当 previnuse 置 0，表示前块未使用，就会 unlink 前块然后合并两个 chunk
  - 如果前块实际上不存在，prevsize==0，那你就会取到一个错误的前块地址，这个地址实际就是你要 free 的这个块的地址
  - 然后你就发现，你这个 chunk 还没进链表就要 unlink 了
  - 所以第一个 chunk 的 previnuse 置 1，防止发生这种事情

```
_int_free()

检查 ----》是否fastbin ----》是fastbin，放至fastbin链表表头
                      +---》是否mmap分配 ----》 是，munmap_chunk()
                                        +---》 否，合并chunk ----》 向低地址合并 ----》想高地址合并 ----》 下一个是否是top chunk ----》 是，合并到top chunk
```

# arena

- 程序向 OS 申请了小的内存，但 OS 会把大的内存分给程序。这样的话避免了多次内核态与用户态的切换，提高了效率。我们称这一连续的内存为 arena。
- 由主线程申请的为 main_arena 通过 sbrk 创建。后续的申请内存会从这个 arena 中获取，直到空间不足。
- 其他线程 arena 通过 mmap 创建
- 当 arena 大小不足时，可通过增加 brk 的方式增加 arena 的空间。类似的，arena 可通过减少 brk 缩小它的空间。

# 调试实例

## 实验 17

new 3 次后看 heap,

```sh
pwndbg> heap
Allocated chunk | PREV_INUSE
Addr: 0x1515000
Size: 0x91

Allocated chunk | PREV_INUSE
Addr: 0x1515090
Size: 0x21

Allocated chunk | PREV_INUSE
Addr: 0x15150b0  # -- @@a
Size: 0x91

Top chunk | PREV_INUSE
Addr: 0x1515140
Size: 0x20ec1

pwndbg> tel 0x1515000
00:0000│  0x1515000 ◂— 0x0
01:0008│  0x1515008 ◂— 0x91
02:0010│  0x1515010 ◂— 0x0 # tel @@b
03:0018│  0x1515018 ◂— 0xa0
04:0020│  0x1515020 —▸ 0x602108 ◂— 0x0
05:0028│  0x1515028 —▸ 0x602110 ◂— 0x0
06:0030│  0x1515030 ◂— 0x0
07:0038│  0x1515038 ◂— 0x0
pwndbg> tel 0x1515010+0xa0  # tel @@b
00:0000│  0x15150b0 ◂— 0x0 # 检查对齐 @@a处
01:0008│  0x15150b8 ◂— 0x91
02:0010│  0x15150c0 ◂— 0x31 /* '1' */
03:0018│  0x15150c8 ◂— 0x0
... ↓     4 skipped

```

# Article

[slides](https://github.com/bash-c/slides/blob/master/pwn_heap/)

[菜鸟 PWN 手进阶之堆基础](http://www.taodudu.cc/news/show-3444949.html?action=onClick)
[好好说话之 unlink](https://blog.csdn.net/qq_41202237/article/details/108481889)
