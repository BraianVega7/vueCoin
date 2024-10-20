<template>
  <div class="app-container">
    <navbar />
    <router-view />
  </div>
</template>

<script>
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import navbar from '@/components/navbar.vue';

export default {
  components: {
    navbar,
  },
}
</script>

<style>
@import '~bootstrap/dist/css/bootstrap.min.css';

.app-container {
  background-color: rgb(91, 103, 91);
  min-height: 100vh;
}
</style>
