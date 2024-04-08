<template>
  <div class="container">
    <Login/>
    <!--aca viene la parte de las monedas con sus valores e imagenes-->
    <!--tambien aca se podria hacer un footer-->
  </div>
</template>

<script>
import Login from '../components/Login.vue'

export default{
  name: 'HomeView',
  components:{
    Login,
  }
}
</script>

<style scoped>
.container{
  display: flex;
  justify-items: center;
}
</style>