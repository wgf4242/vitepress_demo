- 有 pom.xml 文件，复制内容到 idea. maven 更新，会有些 vuln 提示

# Java jar 文件调试

```sh
java -jar -Xdebug -Xrunjdwp:transport=dt_socket,server=y,suspend=n,address=5005 <jarfile>
```

解压出 jar 文件。classes 下的内容放到 src 下面。在 idea 中看 比如 `com\ctf\badjava\BadjavaApplication.class` 放到 `src\com\ctf\badjava\BadjavaApplication.class`

- idea 中打开会显示源码，保存一份复制为 BadjavaApplication.java
- 去掉前几行的注释

`Edit Configuration - remote`, 默认参数即可。

- 下断点可正常调试了
