<template>
  <div>
    <h3>Historial de Compras</h3>
    <ul>
      <li v-for="transaction in userHistory" :key="transaction._id">
        {{ transaction.crypto_code }} - {{ transaction.money }} ARS
      </li>
    </ul>
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
        console.log('No hay un nombre de usuario válido.');
      }
    },
  },
  mounted() {
    this.fetchUserHistory();
  },
};
</script>

<style scoped></style>