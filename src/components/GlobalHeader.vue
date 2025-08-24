<script setup>
import { ref } from 'vue'

//stores 
import { useUsersStore } from '@/stores/users'
const userStore = useUsersStore()

//refs
const user = ref(null)
const session = ref(false);
const wrongLogin = ref(false);

//methods 
const handleLogin = () => {
  console.log(login.value, password.value)
  user.value = userStore.loginUser(login.value, password.value)
  if (user.value === undefined) {
    session.value = false
    wrongLogin.value = true
    return
  }
  else {
    session.value = true
  }
  console.log(user.value.name)
}

const handleLogout = () => {
  session.value = false
  user.value = null
}
</script>

<template>
  <header class="globalH">
    <p>Header</p>
    <form class="globalH__login" v-if="!session" @submit.prevent="handleLogin">
      <input type="text" placeholder="Username" name="login" id="login" />
      <input type="password" placeholder="Password" name="password" id="password" />
      <button type="submit">Log in</button>
      <p v-if="wrongLogin" class="error">Wrong login or password</p>
    </form>
    <p v-else>
      Logged in as {{ user.name }}
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