<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router';
import { useUsersStore } from '@/stores/users';

const props = defineProps({
  article: Object
})
const userStore = useUsersStore()

const author = userStore.getAuthor(props.article.authorId)

</script>

<template>
  <RouterLink :to="{name: 'article', params: {id: article.id}}"
  v-for="(article, key) in props"  
    :key="key"
    class="router-link card"
  > 
  <article>
    <header class ="card__header">
      <section class="card__header__title">
        <h2>{{ article.title }}</h2>
      </section>
      <section class="card__header__data">
        <p>{{ author.lastname }} {{ author.firstname }} </p>
        <p>{{ article.date }}</p>
      </section>
    </header>
    <img :src="article.thumbnail" class="card__thumbnail"/>
    <p>{{ article.abstract }}</p>
    <button class="card__link hoverable">Read more</button>
  </article>
  </RouterLink>
</template>

<style scoped lang="scss">
  .card {
    border: 1px solid #ccc;
    border-radius: 4px;
    margin: 1rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    flex: 1 1 300px;
    transition: all 0.3s ease-in-out;
    &__header {//article header
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-inline: 1rem;
      &__title {
        flex: 2;
        margin-right: 1rem;
        text-align: right;
      }
      &__data {
        flex: 1;
        flex-grow: 1;
        text-align: right;
        border-inline-start: #ccc 1px solid;
      }
    }
    &__thumbnail {
      width: 100%;
      height: 200px;
      object-fit: cover;
      margin-block-end: 1rem;
    }
    &__link {
      display: block;
      text-align: center;
      background-color: #ccc;
      color: #02b;
      padding: 0.5rem;
      margin: 1rem;
      border-radius: 0.5rem;
      text-decoration: none;
      transition: all 0.3s ease-in-out;
    }
    //end of normal
    //hover
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
      .hoverable {
        background-color: #02b;
        color: #ccc;
      }
    }
    //end of hover
  }
</style>
