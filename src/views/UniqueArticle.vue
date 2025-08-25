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
const edit=ref(false)
//author data
const author = userStore.getAuthor(article.value.authorId)
//comment data
const comment = ref(null)
const approvedComments = computed(() => articleStore.approvedComments(articleId.value))
const pendingComments = computed(() => articleStore.pendingComments(articleId.value))

//methods
const handleComment = () => {
  console.log(comment.value)
  const commentor = userStore.session ? userStore.currentUser.pseudo : 'Anonymous'
  const newComment = {
    id: article.value.comments.length + 1,
    author: commentor,
    date: new Date().toLocaleDateString('fr'),
    content: comment.value,
    state: 'pending'
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
        <h2 class="card__header__intro__title" v-show="!edit">{{ article.title }}</h2>
        <input v-show="edit" type="text" v-model="article.title" />
      </section>
      <section class="card__header__data">
        <span>
          Published on
          <p v-show="!edit">{{ article.date }}</p>
          <input v-show="edit" type="date" v-model="article.date" />
        </span>
      </section>
      <div class="card__header__controls" v-if="userStore.session">
        <button class="card__header__controls__button"
        @click="articleStore.deleteArticle(articleId)">Delete article</button>
        <button class="card__header__controls__button"
        @click.prevent="edit = !edit"
        v-show="!edit">Edit article</button>
        <!-- boutons de sauvegarde et annulation -->
        <button class="card__header__controls__button"
        @click.prevent="articleStore.updateArticle(article), edit = !edit"
        v-show="edit">Save article</button>
        <button class="card__header__controls__button"
        @click.prevent="edit = !edit"
        v-show="edit">Cancel</button>
      </div>
    </header>
    <!-- abstract and content -->
    <p v-show="!edit">{{ article.abstract }}</p>
    <input v-show="edit" type="text" v-model="article.abstract" />
    <img :src="article.banner" />
    <p v-show="!edit">{{ article.content }}</p>
    <input v-show="edit" type="text" v-model="article.content" />
  </article>
  <!-- comments -->
  <section class="comments">
    <p>Comments</p>
    <section class="comments__list">
      <span v-for="comment in approvedComments" :key="comment.id"
      class="comments__list__item" >
        <p class="comments__list__item__author">{{ comment.author }} </p>
        <p class="comments__list__item__date">on {{ comment.date }} </p>
        <p class="comments__list__item__content">{{ comment.content }} </p>
        <button class="comments__list__item__button" v-if="userStore.session"
        @click="articleStore.deleteComment(articleId, comment.id)">Delete</button>
      </span>
      <!--End of approved comments-->
      <span v-for="comment in pendingComments" :key="comment.id"
      class="comments__list__item" v-if="userStore.session">
        <p class="comments__list__item__author">{{ comment.author }} </p>
        <p class="comments__list__item__date">on {{ comment.date }} </p>
        <p class="comments__list__item__content">{{ comment.content }} </p>
        <span class="comments__list__item__controls" v-if="userStore.session && comment.state === 'pending'">
          <button class="comments__list__item__controls__button"
          @click="articleStore.approveComment(articleId, comment.id)">Approve</button>
          <button class="comments__list__item__controls__button"
          @click="articleStore.rejectComment(articleId, comment.id)">Reject</button>
        </span>
      </span>
    </section>
    <!-- form to add comments -->
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
    &__controls {
      width: 100%;
      margin-block: 1rem;
      gap: 2rem;
      display: flex;
      justify-content: flex-end;
      &__button {
        padding-block: .3rem;
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
        margin-block-start: .5rem;
        &:hover {
          background-color: #ccc;
          color: #02b;
        }
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