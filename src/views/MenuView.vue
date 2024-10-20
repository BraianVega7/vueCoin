<template>
   <div class="page-container">
    <div class="menu-container">
      <router-link class="menu-item" to="/purchase">Comprar Crypto</router-link>
      <router-link class="menu-item" to="/sale">Vender Crypto</router-link>
      <router-link class="menu-item" to="/history">Historial de movimientos</router-link>
      <router-link class="menu-item" to="/analisis">Análisis del estado actual</router-link>
      <router-link class="menu-item" to="/inversion">Análisis de inversiones</router-link>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
.page-container {
  background-color: #333;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-container {
  width: 100%;
  max-width: 400px;
  text-align: center;
  position: relative;
  top: -50px;
}

.menu-item {
  display: block;
  font-size: 1.5rem;
  color: white;
  padding: 15px 0;
  margin: 10px 0;
  border: 2px solid transparent;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.menu-item:hover {
  background-color: #555;
  border-color: #777;
}

.router-link-active {
  font-weight: bold;
  background-color: #444;
  border-color: #999;
}
</style>