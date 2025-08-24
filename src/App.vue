<script setup>
import { ref } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
  </nav>
  <RouterView />
</template>

<style scoped></style>
