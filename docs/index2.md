[[toc]]
# Index.md

## h2

[Home](/) <!-- sends the user to the root index.md -->

[foo](/foo/) <!-- sends the user to index.html of directory foo -->

[foo heading](./#heading) <!-- anchors user to a heading in the foo index file -->

[bar - three](./bar/three) <!-- you can omit extention -->

[bar - three](./bar/three.md) <!-- you can append .md -->

[bar - four](./bar/four.html) <!-- or you can append .html -->

## h2-1

### h3
---
title: Blogging Like a Hacker
lang: en-US
---

## GitHub-Style Tables

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |


## Emoji

:tada: :100:

[All Emoji](https://github.com/markdown-it/markdown-it-emoji/blob/master/lib/data/full.json)

## Custom Containers

::: tip
This is a tip
:::

::: info
This is an info box
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

::: details
This is a details block, which does not work in Internet Explorer or old versions of Edge.
:::

## Custom Title

::: danger STOP
Danger zone, do not proceed
:::

::: details Click me to view the code

```js
console.log('Hello, VitePress!')
```

:::

```js{1,4,6-7}
export default { // Highlighted
  data () {
    return {
      msg: `Highlighted!
      This line isn't highlighted,
      but this and the next 2 are.`,
      motd: 'VitePress is awesome',
      lorem: 'ipsum',
    }
  }
}
```

### Import code form file

<<< @/snippets/foo.js

<<< @/snippets/foo.js{2}

<<< @/snippets/snippet-with-region.js#snippet{1}