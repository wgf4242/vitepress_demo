// 所有的资源文件，都存放在 docs/public
// /favicon.ico 指向 docs/public/favicon.ico
// const anchor = require('markdown-it-anchor')

/**
 * @type {import('vitepress').UserConfig}
 */
// const config = {
//   // ...
// }

// export default config

import { defineConfig } from "vitepress"
import { getSidebar } from "./getSidebar"

export default defineConfig({
  // ...

  title: "HiTitle",
  description: "Just playing around.",
  head: [["meta", { name: "referrer", content: "no-referrer" }]],
  markdown: {
    // options for markdown-it-anchor

    // lineNumbers: true,
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

    // only show region comments
    config: md => {
      const fenceRender = md.renderer.rules.fence
      md.renderer.rules.fence = (...args) => {
        return fenceRender(...args)
          .replace(/\/\/ ?#?((?:end)?region) ([\w*-]+)/g, "__REMOVED__")
          .split('<span class="token comment">__REMOVED__</span>')
          .join("__REMOVED__")
          .replace(/[ \t]*__REMOVED__\s*?\n/g, "")
      }
      md.use(require("markdown-it-katex"))
    },
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
})
