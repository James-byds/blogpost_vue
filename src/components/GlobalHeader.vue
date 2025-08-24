<script setup>
</script>

<template>
  <header class="globalH">
    <p>Header</p>
    <form class="globalH__login">
      <input type="text" placeholder="Username" />
      <input type="password" placeholder="Password" />
      <button type="submit">Log in</button>
    </form>
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
</style>