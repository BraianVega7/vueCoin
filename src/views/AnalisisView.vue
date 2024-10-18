<template>
  <div class="container">
    <div v-if="Object.keys(filterW).length === 0">
      <h1>No hay transacciones para analizar</h1>
    </div>
    <div v-else>
      <table>
      <thead>
        <tr>
          <th>Criptomoneda</th>
          <th>Cantidad</th>
          <th>Dinero</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(amount, criptoCode) in filterW" :key="criptoCode">
          <td>{{ criptoCode.toUpperCase() }}</td>
          <td>{{ amount.toFixed(8) }}</td>
          <td>{{ calcularValor(criptoCode, amount).toLocaleString('es-AR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }) }}</td>
        </tr>
      </tbody>
    </table>
    <div class="total-container">
      <h4>Dinero Total: {{ total.toLocaleString('es-AR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          }) }} </h4>
    </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {

  computed: {
    ...mapGetters('transaccion', ['getWallet']),
    ...mapGetters('cripto', ['getCriptoPrice']),

    wallet() {
      return this.getWallet;
    },
    filterW() {
      return Object.keys(this.wallet).reduce((filtro, criptoCode) => {
        const amount = this.wallet[criptoCode];
        if (amount > 0) {
          filtro[criptoCode] = amount;
        }
        return filtro;
      }, {});
    },

    total() {
      let sumTotal = 0;
      for (const criptoCode in this.filterW) {
        const amount = this.filterW[criptoCode];
        sumTotal += this.calcularValor(criptoCode, amount);
      }
      return sumTotal;
    },
  },
  methods: {
    calcularValor(criptoCode, amount) {
      const priceData = this.getCriptoPrice(criptoCode);
      if (priceData.totalAsk) {
        return priceData.totalAsk * amount;
      }
    }
  },
  mounted() {
    this.$store.dispatch('cripto/fetchCryptosPrices');
  }
}

</script>

<style scoped>
.container {
  background-color: rgba(54, 60, 52, 0.625);
}

table {
  width: 80%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  border: 1px solid #ccc;
  text-align: center;
}

.total-container {
  margin-top: 20px;
  font-weight: bold;
  font-size: 1.2em;
  text-align: center;
}
</style>
