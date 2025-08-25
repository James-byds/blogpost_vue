<script setup>
import { computed, onMounted, ref } from 'vue'
import {useRoute} from 'vue-router'
import { useArticlesStore } from '@/stores/articles';
import { useUsersStore } from '@/stores/users';

//components
import GlobalFooter from '@/components/GlobalFooter.vue'
import GlobalHeader from '@/components/GlobalHeader.vue'

//route and stores
const route = useRoute()
const articleStore = useArticlesStore()
const userStore = useUsersStore()

//article data
const articleId = computed(() => Number(route.params.id))
const article = computed(() => articleStore.articleById(articleId.value))
//author data
const author = userStore.getAuthor(article.value.authorId)
//comment data
const comment = ref(null)

//methods
const handleComment = () => {
  console.log(comment.value)
  const commentor = userStore.session ? userStore.currentUser.pseudo : 'Anonymous'
  const newComment = {
    id: article.value.comments.length + 1,
    author: commentor,
    date: new Date().toLocaleDateString('fr'),
    content: comment.value
  }
  article.value.comments.push(newComment)
}
</script>

<template>
  <GlobalHeader />
  <article class="card">
    <header class ="card__header">
      <section class="card__header__title">
        <h2>{{ article.title }}</h2>
        <p>{{ author.lastname }} {{ author.firstname }}</p>
      </section>
      <section class="card__header__data">
        <p>{{ article.abstract }}</p>
      </section>
    </header>
    <p>{{ article.date }}</p>
    <img :src="article.banner" />
    <p>{{ article.content }}</p>
  </article>
  <section class="card__comments">
    <p>Comments</p>
    <span v-for="comment in article.comments" :key="comment.id">
      <p>{{ comment.author }} on {{ comment.date }} </p>
       <p>{{ comment.content }} </p>
    </span>
    <form action="" @submit.prevent="handleComment">
      <label for="comment">Comment</label>
      <input type="text" name="comment" v-model.lazy.trim="comment" />
      <button type="submit">Submit</button>
    </form>
  </section>
  <GlobalFooter />
</template>

<style lang="scss" scoped>
.card { 
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin: 2rem auto;
  border: 1px solid #ccc;
  padding: 2rem;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 2rem;
    &__title {
      display: flex;
      gap: 1rem;
    }
    &__data {
      display: flex;
      justify-self: flex-end;
      gap: 1rem;
    }
  }
}
</style>