<script setup>
import { ref } from 'vue'

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
    <h3 class="globalH__title">The occasional truth</h3>
    <form class="globalH__login" v-if="!userStore.session" @submit.prevent="handleLogin">
      <input class="globalH__login__input" type="text" placeholder="Test" name="login" id="login" />
      <input class="globalH__login__input" type="password" placeholder="test" name="password" id="password" />
      <button type="submit" class="globalH__login__button">Log in</button>
      <p v-if="wrongLogin" class="error">Wrong login or password</p>
    </form>
    <p v-else>
      Logged in as {{ userStore.currentUser.pseudo }}
      <button @click="handleLogout">Log out</button>
    </p>
  </header>
</template>

<style scoped lang="scss">
  .globalH {
    display: flex;
    gap: 2rem;
    margin: 2rem auto;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
    &__title {
      text-align: center;
      font-size: 2rem;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.5rem;
      text-shadow: 2px 2px 2px #ccc;
      flex: 3;
      text-decoration: underline;
    }
    &__slogan {
      flex: 1;
      text-align: center;
      letter-spacing: 0.5rem;
      text-shadow: 2px 2px 2px #ccc;
    }
    &__login {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
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
  }
</style>