<template>
  <main class="main">
    <navbar/>
    <RouterView/>

  </main>

</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import navbar from './components/navbar.vue';

</script>

<style scoped>

  .main{
    width:100vw;
    height:100vh;
    background-color: #212f43;
  }
  
</style>
