<template>
  <div class="container">
    <Login/>
  </div>
</template>

<script>
import Login from '../components/Login.vue'

export default {
  name: 'HomeView',
  components: {
    Login,
  }
}
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>