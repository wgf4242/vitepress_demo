export function getSidebar() {
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
      text: "bar1",
      link: "/bar/",
      children: [
        { text: "基础", link: "/bar/three" },
        { text: "进阶", link: "/bar/four" },
      ],
    },
    {
      text: "CTF",
      children: [
        {
          text: "Web",
          link: "/CTF/Web/",
          children: [{ text: "xxe", link: "/CTF/Web/xxe" }],
        },
        {
          text: "Misc",
          link: "/CTF/Misc/",
        },
        { text: "进阶", link: "/bar/four" },
      ],
    },
  ]
}
