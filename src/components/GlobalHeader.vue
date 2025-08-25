<script setup>
import { ref } from 'vue'
import { RouterLink } from 'vue-router';

//stores 
import { useUsersStore } from '@/stores/users'
const userStore = useUsersStore()

//refs
const user = ref(null)
const wrongLogin = ref(false);

//methods 
const handleLogin = () => {
  console.log("logging in", login.value, password.value)
  user.value = userStore.loginUser(login.value, password.value)
  if (user.value === undefined) {
    console.log("wrong login or password")
    wrongLogin.value = true
    return
  }
  else {
    userStore.currentUser = user.value
    userStore.session = true
    console.log("user logged in", userStore.currentUser)
  }
  console.log(user.value.pseudo)
}

const handleLogout = () => {
  userStore.currentUser = null
  userStore.session = false
}
</script>

<template>
  <header class="globalH">
    <p class="globalH__slogan">Your weekly source of dissapointment</p>
    <RouterLink to="/" class="globalH__title">
      <h3>The occasional truth</h3>
    </RouterLink>
    <form class="globalH__login" v-if="!userStore.session" @submit.prevent="handleLogin">
      <fieldset class="globalH__login__fieldset">
        <legend>Log in</legend>
        <input class="globalH__login__input" type="text" placeholder="Test" name="login" id="login" />
        <input class="globalH__login__input" type="password" placeholder="test" name="password" id="password" />
        <p v-if="wrongLogin" class="error">Wrong login or password</p>
      </fieldset>
      <button type="submit" class="globalH__login__button">Log in</button>
    </form>
    <p v-else>
      Logged in as {{ userStore.currentUser.pseudo }}
      <button @click="handleLogout" class="globalH__login__button">Log out</button>
    </p>
  </header>
</template>

<style scoped lang="scss">
  .globalH {
    display: flex;
    gap: 2rem;
    margin-block-end: 2rem;
    border-block-end: 2px solid #222;
    padding-block: 1rem;
    justify-content: space-between;
    background-color: #ddd;
    &__title {
      display: flex; 
      justify-content: center;
      align-items: center;
      text-align: center;
      font-size: 2rem;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.5rem;
      text-shadow: 2px 2px 2px #ccc;
      flex: 3;
      text-decoration: underline;
      color: #222;
      transition: all 0.3s ease-in-out;
      &:hover {
        color: #02b;
      }
    }
    &__slogan {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      letter-spacing: 0.5rem;
      text-shadow: 2px 2px 2px #ccc;
      border-inline-end: 1px solid #222;
    }
    &__login {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
      margin-inline: .5rem;
      &__fieldset {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        margin-block: 0.5rem;
        padding: .5rem;
      }
      &__input {
        border: 1px solid #ccc;
        padding: 0.5rem;
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
  .error {
    color: red;
    text-align: center;
  }
</style>