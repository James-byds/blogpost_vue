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
    <p>Header</p>
    <form class="globalH__login" v-if="!userStore.session" @submit.prevent="handleLogin">
      <input type="text" placeholder="Test" name="login" id="login" />
      <input type="password" placeholder="test" name="password" id="password" />
      <button type="submit">Log in</button>
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
    &__login {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2rem;
    }
  }
  .error {
    color: red;
  }
</style>