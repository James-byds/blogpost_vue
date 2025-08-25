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
      <section class="card__header__intro">
        <span>
          By
          <p>{{ author.lastname }} {{ author.firstname }}</p>
        </span>
        <h2 class="card__header__intro__title">{{ article.title }}</h2>
      </section>
      <section class="card__header__data">
        <span>
          Published on
          <p>{{ article.date }}</p>
        </span>
      </section>
      <button class="card__header__button" v-if="userStore.session"
      @click="articleStore.deleteArticle(articleId)">Delete article</button>
    </header>
    <p>{{ article.abstract }}</p>
    <img :src="article.banner" />
    <p>{{ article.content }}</p>
  </article>
  <!-- comments -->
  <section class="comments">
    <p>Comments</p>
    <section class="comments__list">
      <span v-for="comment in article.comments" :key="comment.id"
      class="comments__list__item">
        <p class="comments__list__item__author">{{ comment.author }} </p>
        <p class="comments__list__item__date">on {{ comment.date }} </p>
        <p class="comments__list__item__content">{{ comment.content }} </p>
      </span>
    </section>
    <form action="" @submit.prevent="handleComment" class="comments__form">
      <fieldset class="comments__form__fieldset">
        <legend>Leave a comment</legend>
       <label for="comment">Share a comment: </label>
       <textarea name="comment" v-model.lazy.trim="comment" class="comments__form__fieldset__textarea"/>
       <button type="submit" class="comments__form__fieldset__button">Submit</button>
      </fieldset>
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
    border-bottom: 1px solid #ccc;
    flex-wrap: wrap;
    &__intro {
      display: flex;
      gap: 1rem;
      flex: 2;
      &__title {
        flex: 1;
        text-align: center;
      }
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
      width: 100%;
      padding-block: .3rem;
      margin-block: 1rem;
      &:hover {
        background-color: #ccc;
        color: #02b;
      }
    }
    &__data {
      display: flex;
      justify-self: flex-end;
      gap: 1rem;
    }
  }
}//end of card

.comments {
  display: flex;
  flex-direction: column;
  gap: .2rem;
  margin: 2rem auto;
  padding: 2rem;
  max-width: 80vw;
  min-width: 320px;
  &__list {
    display: flex;
    flex-direction: column;
    gap: .2rem;
    align-items: flex-start;
    &__item {
      margin-block-start: 1rem;
      border-left: 1px solid #ccc;
      padding: .5rem;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      width: 100%;
      &__author {
        width: 100%;
        text-align: left;
        margin: 0;
      }
      &__date {
        width: 100%;
        text-align: left;
        margin:0;
        margin-inline-start: 2rem;
        text-transform: lowercase;
        font-style: italic;
        color: #888;
      }
      &__content {
        border: 1px solid #ccc;
        padding: .5rem;
        border-radius: .5rem;
        background-color: #ddd;
        text-align: left;
        margin-block-start: .5rem;
        margin-inline-start: 2rem;
      }
    }
  }//end of comments__list
  &__form {
    display: flex;
    flex-direction: column;
    &__fieldset {
      display: flex;
      flex-direction: column;
      gap: .5rem;
      max-width: max-content;
      min-width: 320px;
      margin: 0 auto;
      padding: 1.2rem;
      &__textarea {
        border: 1px solid #ccc;
        padding: .5rem;
        border-radius: .5rem;
        background-color: #ddd;
        max-width:max-content;
        min-width: 320px;
        min-height: 100px;
        margin: 0 auto;
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
        align-self: flex-end;
        max-width: fit-content;
        &:hover {
          background-color: #ccc;
          color: #02b;
        }
      }
    }
  }//end of comments__form
}
</style>