<template>
  <div class="login-container">
    <Login/>
  </div>
</template>

<script>
import Login from '@/components/Login.vue';

export default {
  name: 'LoginView',
  components: {
    Login,
  },
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
