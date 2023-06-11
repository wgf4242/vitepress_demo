- Fastbin Double Free
- Hosue of Spirit
- Arbitary Alloc
  其中，前两种主要漏洞侧重于利用 free 函数释放真的 chunk 或伪造的 chunk，然后再次电请 chunk 进行攻击，后一侧重于故意修改 fd 指针，直接利用 malloc 申请指定位置 chunk 进行攻击。

fastbin attack 存在的原因在于 fastbin 是使用单链表来维护释放的堆块的,并且由 fastbin
管理的 chunk 即使被释放,其 next_chunk 的 prev_inuse 位也不会被清空.

其 prev_inuse 位不会被清空也就意味着一般情况下 fastbin 不会进行 unlink 合并.

# Double Free

Fastbin Double Free 是指 fastbin 的 chunk 可以被多次释放,因此可以在 fastbin 链表中存在多次.这样导致的后果是多次分配可以从 fastbin 链表中取出同一个堆块,相当于多个指针指向同一个堆块,导致可能可以控制已 free 的堆块.

Fastbin Double Free 能够成功利用主要有两部分的原因

- fastbin 的堆块被释放后 next_chunk 的 pre_inuse 位不会被清空
- fastbin 在执行 free 的时候仅验证了 main_arena 直接指向的块,即链表指针头部的块.对于链表后面的块,并没有进行验证.

如果我们连续 free 两次 chunk1 的话,就会触发该处报错,抛出一个错误

但如果我们在 chunk1 释放后,再释放 chunk:2,这样 main_arena 就指向 chunk:2 而不
是 chunk1 了,此时我们再去释放 chunk1 就不再会被检测到.

```
                                            ┌──────────────────────────┐
                                            │                          │
                                            │                          │
┌────────────┐      ┌──────────┐      ┌─────▼────┐    ┌──────────┐     │
│main_arena  ├──────►  chunk1  ├──────► chunk2   ├────► cchun1   ├─────┘
└────────────┘      └──────────┘      └──────────┘    └──────────┘
```

此时分配 chunk1 后,对其进行 fd 进行修改就可以造成任意位置分配 chunk,造成这样一条链

main_arena->chunk2->chunk1->target_address

# House of Spirit

该技术的核心在于在目标位置处伪造 fastbin chunk,并将其释放,从而达到分配指定地址的 chunk 的目的.

要想构造 fastbin fake chunk,并且将其释放时,可以将其放入到对应的 fastbin 链表中, 需要绕过一些必要的检测,即

- fake chunk 的 ISMMAP 位不能为 1,因为 free 时,如果是 mmap 的 chunk,会单独处理.
- fake chunk 的 size 大小需要满足对应的 fastbin 的需求.
- fake chunk 的 next chunk 的大小应该合法.

想要使用该技术分配 chunk 到指定地址,其实并不需要修改指定地址的任何内容,关键是要能够修改指定地址的前后的内容使其可以绕过对应的检测.

这个方法一般配合 chunk extend 共同使用构造出 overlap.

# Arbitrary Alloc

事实上只要满足目标地址存在合法的 size 域 (这个 Size 域是构造的,还是自然存在的都无妨),我们可以把 chunk 分配到任意的可写内存中,比如 bss、heap、data、stack 等等.

```c
if (victim != 0) {
    if (__builtin_expect(fastbin_index(chunksize(victim)) != idx, 0)) {
        errstr = "malloc (): memory corruption (fast)";
        errout:
        malloc_printerr(check_action, errstr, chunk2mem(victim), av);
        return NULL;
    }
    // ...
}
```

主要要求分配位置的大小与申请的 chunk 大小一致,否则会报错.

一般针对 Arbitrary Alloc,我们使用字节错位来实现直接分配 fastbin 到\_malloc hook 的位置,相当于覆盖 \_malloc_hook 来控制程序流程.

malloc_hook 附近会存在一个通过错位造成合法的 fake_chunk,可以使用此 chunk 来修改 malloc_hook 为 one_gadget 来 getshell

此处的的 fake_chunk 的 size 是 0x7f,需要分配 0x60 的大小才可以
