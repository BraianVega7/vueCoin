<template>
  <div>
    <navbar/>
    <router-view/>
  </div>
  
</template>

<script>
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import navbar from '@/components/navbar.vue'

export default {
  components: {
    navbar,
  },
}
</script>
<style scoped>
@import '~bootstrap/dist/css/bootstrap.min.css';
</style>
