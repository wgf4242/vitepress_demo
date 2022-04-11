<!--.vitepress/theme/MyLayout.vue-->
<script setup>
import DefaultTheme from 'vitepress/theme'
const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #sidebar-top>My custom sidebar top content</template>
    <template #navbar-search>SearchBox</template>
  </Layout>
</template>