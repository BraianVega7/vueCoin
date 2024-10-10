<template>
  <div class="container">
    <div>
      <h1>hola</h1>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
export default {

  computed: {
    ...mapGetters('transaccion', ['userHistory']),
  },

  methods: {
    
  },
}
</script>

<style scoped>
.container {
  background-color: rgba(54, 60, 52, 0.625);
}
</style>