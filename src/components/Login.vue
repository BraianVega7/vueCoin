<template>
  <div class="login-container">
    <form @submit.prevent="validateUser" class="login-form">
      <h3>Inicia Sesión</h3>
      <input type="text" placeholder="Nombre de usuario" v-model="username" />
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
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.login-form {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  padding: 20px;
  width: 300px; 
  text-align: center;
}

.login-form input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.login-form button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.login-form button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  margin-top: 10px;
}
</style>
