<script setup>
</script>

<template>
  <footer class="globalF">
    <p class="globalF__text">ScamNews INC.</p>
    <p class="globalF__text">All rights reserved</p>
    <p class="globalF__text">Copyright 2025</p>
  </footer>
</template>

<style scoped lang="scss">
  .globalF {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
    margin: 2rem auto;
    border-top: 1px solid #ccc;
    padding-block: 1rem;
    background-color: #222;
    color: #ccc;
    position: relative;
    bottom: 0;
    &__text {
      &:first-child {
        margin-inline-start: 1.2rem;
      }
      &:last-child {
        margin-inline-end: 1.2rem;
      }
      text-align: center;
      font-size: 1rem;
      text-shadow: 1px 1px 1px #ccc;
    }
  }
</style>