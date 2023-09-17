[几道rust逆向](https://www.cnblogs.com/Here-is-SG/p/17216822.html) 
[一道Rust逆向Writeup](https://blog.fullstackpentest.com/a-rust-reverse-writeup.html) 
[Rust 逆向——00.Hello,World](https://pxiaoer.blog/2021/12/26/rust-reverse-00/)
[Rust逆向——01.变量](https://pxiaoer.blog/2021/12/27/rust-reverse-01/)
[Rust逆向——02.函数](https://pxiaoer.blog/2021/12/29/rust-reverse-02/)
[Rust静态分析工具](https://pxiaoer.blog/2021/12/29/rust%e9%9d%99%e6%80%81%e5%88%86%e6%9e%90%e5%b7%a5%e5%85%b7/)

moectf2023 RUST:
hint:Rust编译出的函数会包含一些语言中的元信息，导致加载出的符号包含一些看起来不可读的符号与随机字符串。如果想要修复这样的函数名，让我们能够查阅这些函数作用，可以使用这个ida插件https://github.com/timetravelthree/IDARustDemangler 。请阅读其安装指南，它需要 rs-dml 作为前置，而 rs-dml 需要通过cargo安装
