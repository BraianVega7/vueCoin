<template>
  <div class="login-container">
    <form @submit.prevent="validateUser" class="login-form">
      <h3>Inicia Sesión</h3>
      <input type="text" placeholder="Nombre de usuario" v-model="username">
      <button type="submit">Acceder</button>
      <h5 v-if="error" class="error-message"> Error al iniciar sesión</h5>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      username: '',
      error: false,
    }
  },
  methods: {
    ...mapActions(['login']),

    async validateUser() {
      const usernamePattern = /^[a-zA-Z0-9]{5,15}$/;

      if (this.username && usernamePattern.test(this.username)) {
        this.error = false;
        await this.login(this.username);
        this.$router.push('/Menu'); 
      }
      else {
        this.error = true;
        this.username = '';
      }
    }
  }
}

</script>

<style scoped>

</style>
