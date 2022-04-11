// 所有的资源文件，都存放在 docs/public
// /favicon.ico 指向 docs/public/favicon.ico
// const anchor = require('markdown-it-anchor')

/**
 * @type {import('vitepress').UserConfig}
 */
const config = {
  // ...
  title: "HiTitle",
  description: "Just playing around.",
  markdown: {
    // options for markdown-it-anchor

    lineNumbers: true,
    // toc: { includeLevel: [1, 2] },
    dest: "./dist",
    head: [["link", { rel: "icon", href: "/favicon.ico" }]],

    // https://github.com/valeriangalliat/markdown-it-anchor#permalinks
    // anchor: { permalink: anchor.permalink.headerLink() },

    // options for markdown-it-table-of-contents

    // config: (md) => {
    // use more markdown-it plugins!
    // md.use(require('markdown-it-xxx'))
    // }
  },
  // 主题配置
  themeConfig: {
    nav: [
      { text: "我的个人网站", link: "" },
      { text: "掘金", link: "" },
      { text: "Github", link: "https://github.com/wgf4242" },
    ],
    sidebar: {
      "/": getSidebar(),
    },
    // editLinks: true, // 得有repo等信息才有用
    // editLinkText: "在 GitHub 上编辑此页 ！",
  },
}

function getSidebar() {
  return [
    {
      text: "foo",
      link: "/foo/",
      children: [
        { text: "one", link: "/foo/one" },
        { text: "two", link: "/foo/two" },
      ],
      sidebarDepth: 0,
    },
    {
      text: "bar",
      link: "/bar/",
      children: [
        { text: "基础", link: "/bar/three" },
        { text: "进阶", link: "/bar/four" },
      ],
    },
  ]
}
export default config

import { defineConfig } from "vitepress"

// export default defineConfig({
//   // ...

// })
