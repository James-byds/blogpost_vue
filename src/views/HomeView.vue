<script setup>
import { ref } from 'vue'

//stores
import { useArticlesStore } from '@/stores/articles'
const articleStore = useArticlesStore()

//components
import ArticleDisplay from '@/components/ArticleDisplay.vue'
import GlobalFooter from '@/components/GlobalFooter.vue'
import GlobalHeader from '@/components/GlobalHeader.vue'

</script>

<template>
  <GlobalHeader />
  <main class="container">
    <ArticleDisplay v-for="article in articleStore.allArticles"
   :key="article.id" :article="article" />
  </main>
  <GlobalFooter />
</template>

<style scoped lang="scss">
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2rem;
    margin: 2rem auto;
  }
</style>
