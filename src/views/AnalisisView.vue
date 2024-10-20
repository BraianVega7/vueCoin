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
            <td>{{ formatCurrency(calcularValor(criptoCode, amount))}}</td>
          </tr>
        </tbody>
      </table>
      <div class="total-container">
        <h4>Dinero Total: {{ formatCurrency(total)}} </h4>
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
    formatCurrency(value) {
      return value.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    },

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
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  max-width: 600px;
  margin: 40px auto;
}

h1 {
  text-align: center;
  color: #333;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

th,
td {
  padding: 12px;
  border: 1px solid #ddd;
  text-align: center;
  font-size: 1.1rem;
}

th {
  background-color: #f4f4f4;
  color: #555;
}

tbody tr:hover {
  background-color: #f1f1f1;
}

.total-container {
  margin-top: 20px;
  font-weight: bold;
  font-size: 1.2em;
  text-align: center;
}
</style>
