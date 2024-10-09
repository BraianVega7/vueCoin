<template>
  <div class="container">
    <Sale></Sale>
  </div>
</template>

<script>
import Sale from '@/components/Sale.vue';

export default{
  name: 'SaleView',
  components:{
    Sale,
  }
}

</script>

<style scoped>
.container{
  background-color: rgb(91, 103, 91);
}
</style>