<script setup>
import { ref } from 'vue'
import { useArticlesStore } from '@/stores/articles';
import { useUsersStore } from '@/stores/users';

//stores
const articleStore = useArticlesStore()
const userStore = useUsersStore()

//refs
const id= articleStore.getLastId()
const title = ref(null)
const abstract = ref(null)
const content = ref(null)
const today = new Date().toLocaleDateString('fr')

const handleSubmit = () => {
  const newArticle = {
    id: id.value + 1,
    title: title.value,
    abstract: abstract.value,
    content: content.value,
    date: today,
    thumbnail: 'http://unsplash.it/350/200?random',
    banner: 'http://unsplash.it/800/200?random',
    authorId: userStore.currentUser.id
  }
  console.log(newArticle)
  articleStore.addArticle(newArticle)
}
</script>

<template>
  <section class="card">
    <p>add article</p>
    <form action="" @submit.prevent="handleSubmit">
      <label for="title">Article's title<input required type="text" name="title" v-model="title" /></label>
      <label for="abstract">Article's abstract<input required type="text" name="abstract" v-model="abstract" /></label>
      <label for="content">Article's content<textarea required name="content" v-model="content" cols="30" rows="10"></textarea></label>
      <input type="submit"> Submit
    </form>
  </section>
</template>

<style scoped lang="scss">
</style>