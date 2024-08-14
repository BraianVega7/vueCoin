<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link to="/Menu" class="navbar-brand">vCoin</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <router-link class="nav-link active" aria-current="page" to="/Menu">Inicio</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Purchase">Compra</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/Sale">Venta</router-link>
          </li>
        </ul>
        <div v-if="isLoggedIn" class="user-info">
          <p>Bienvenido/a! <span class="username-bienvenida">{{ username }}</span></p>
          <button @click="toLogOut">Desconectar</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapGetters} from 'vuex';
import { mapActions} from 'vuex';
export default {
  computed: {
    ...mapGetters(['username', 'isLoggedIn'])
  },
  methods: {
    ...mapActions(['logout']),

    async toLogOut(){
      await this.logout();
      this.$router.push('/');
    }
  },
}
</script>


<style scoped>
.user-info {
  display: flex;
  align-items: center;
  margin-left: auto; 
  color: white;
}

.user-info p {
  margin-right: 10px;
}

.user-info button {
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
}
.username-bienvenida {
  color:rgb(70, 135, 132);
}
</style>