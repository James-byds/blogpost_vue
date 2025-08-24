<script setup>
import { ref } from 'vue'
const props = defineProps({
  article: Object
})

</script>

<template>
  <article v-for="(article, key) in props"  
    :key="key"
    class="card"
    >
    <header class ="card__header">
      <section class="card__header__title">
        <h2>{{ article.title }}</h2>
        <p>{{ article.abstract }}</p>
      </section>
      <section class="card__header__data">
        <p>{{ article.author }}</p>
        <p>{{ article.date }}</p>
      </section>
    </header>
    <img :src="article.img" />
    <p>{{ article.content }}</p>
  </article>
</template>

<style scoped lang="scss">
  .card {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 1rem;
    margin: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    &__header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 1rem;
      &__title {
        flex: 2;
        margin-right: 1rem;
      }
      &__data {
        flex: 1;
        text-align: right;
      }
    }
  }
</style>
