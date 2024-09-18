<template>
   <div class="page-container">
    <div class="menu-container">
      <router-link class="menu-item" to="/Purchase">Comprar Crypto</router-link>
      <router-link class="menu-item" to="/Sale">Vender Crypto</router-link>
      <router-link class="menu-item" to="/History">Historial de movimientos</router-link>
      <div class="menu-item">Pantalla análisis del estado actual</div>
      <div class="menu-item">Pantalla análisis de inversiones</div>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
.page-container {
  background-color: #333; 
  height: 100vh; 
}

.menu-container {
  padding: 20px; 
  border-radius: 5px; 
  width: 300px; 
  margin: 0 auto; 
  color: white; 
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.menu-item {
  padding: 10px 0;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.menu-item:hover {
  background-color: #555;
}

.router-link-active {
  font-weight: bold;
}
</style>