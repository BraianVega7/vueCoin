<template>
  <div class="container">
    <h3>Historial de transacciones</h3>
    <div v-if="userHistory.length ===0">
      <p>No existen transacciones.</p>
    </div>

    <div v-else="userHistory && userHistory.length">
      <ul>
        <li v-for="transaction in userHistory" :key="transaction._id">
          <p><strong>Id transaccion: </strong> {{ transaction._id }}</p>
          <p><strong>Accion: </strong>{{ transaction.action }}</p>
          <p><strong>Criptomoneda: </strong>{{ transaction.crypto_code }}</p>
          <p><strong>Cantidad cripto: </strong>{{ transaction.crypto_amount }} </p>
          <p><strong>Nombre Usuario: </strong>{{ transaction.user_id }}</p>
          <p><strong>Pesos ARS: </strong>{{ transaction.money }}</p>
          <p><strong>Fecha: </strong>{{ transaction.datetime }}</p>
          <button class="btn btn-warning" @click="editarTransaccion(transaction)">Editar</button>
          <button class="btn btn-danger" @click="borrarTransacccion(transaction)">Borrar</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(['username']),
    ...mapGetters('transaccion', ['userHistory']),
  },
  methods: {
    ...mapActions('transaccion', ['dataHistory']),

    async fetchUserHistory() {
      if (this.username) {
        await this.dataHistory(this.username);
      } else {
        console.log('Error al buscar el historial');
      }
    },

    editarTransaccion(transaction){
      console.log(transaction)
    },

    borrarTransacccion(transaccion){
      console.log(transaccion)
    }

  },
  mounted() {
    this.fetchUserHistory();
  },
};
</script>

<style scoped>
.container{
  background-color: rgb(80, 96, 97);
}

ul {
  list-style: none; 
  padding: 0;
}

li {
  margin-bottom: 15px;
  padding: 10px; 
  background-color: #e5ddddc7;
  border-radius: 5px;
}

li:last-child {
  margin-bottom: 0;
}

p {
  margin: 5px 0;
}

button {
  margin-right: 10px;
}
</style>