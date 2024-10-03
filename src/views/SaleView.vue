<template>
  <div class="container">
    <div>
      <h2>Vender Criptomoneda</h2>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default{
  computed:{
    /*...mapGetters('transaccion', ['userHistory']),
    ...mapGetters(['username']),*/
  },
  methods:{
    //...mapActions('transaccion', ['dataHistory']),
  },
}

</script>

<style scoped>
.container{
  background-color: rgb(91, 103, 91);
}
</style>