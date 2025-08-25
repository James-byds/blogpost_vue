<script setup>
import { ref } from 'vue'
import { useArticlesStore } from '@/stores/articles';
import { useUsersStore } from '@/stores/users';

//stores
const articleStore = useArticlesStore()
const userStore = useUsersStore()

//refs
const id = ref(null)
const title = ref(null)
const abstract = ref(null)
const content = ref(null)
const today = new Date().toLocaleDateString('fr')

const handleSubmit = () => {
  const newArticle = {
    id: articleStore.lastId++,
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
  <section class="add-article">
    <p>add article</p>
    <form action="" @submit.prevent="handleSubmit" class="add-article__form">
      <label class="add-article__form__label" for="title">
        Article's title<input required type="text" name="title" v-model="title" />
      </label>
      <label class="add-article__form__label" for="abstract">
        Article's abstract<input required type="text" name="abstract" v-model="abstract" />
      </label>
      <label class="add-article__form__label" for="content">
        Article's content<textarea required name="content" v-model="content" cols="30" rows="10"></textarea>
      </label>
      <input type="submit" class="add-article__form__button">
    </form>
  </section>
</template>

<style scoped lang="scss">
.add-article {
  margin: 2rem 0;
  border: 1px solid #ccc;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  &__form {
    display: flex;
    flex-direction: column;
    gap: .5rem;
    &__label {
      display: flex;
      gap: .5rem;
    }
    &__button {
      border: 1px solid #ccc;
      padding-inline: 1.5rem;
      padding-block: 0.5rem;
      cursor: pointer;
      background-color: #02b;
      color: #ccc;
      border-radius: 0.5rem;
      transition: all 0.3s ease-in-out;
      &:hover {
        background-color: #ccc;
        color: #02b;
      }
    }
  }
}
</style>