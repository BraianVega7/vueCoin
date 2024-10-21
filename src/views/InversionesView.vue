<template>
  <div class="container">
    <h1>Inversiones</h1>
    <div v-if="Object.keys(walletData).length === 0">
      <h3>No hay inversiones.</h3>
    </div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>Criptomoneda</th>
            <th>Resultado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(res, cripto) in walletData" :key="cripto">
            <td><strong>{{ cripto.toUpperCase() }}</strong></td>
            <td :class="{'positivo': res.resultado > 0, 'negativo': res.resultado < 0}">
              {{ res.resultado > 0 ? '+' : res.resultado < 0 ? '-' : '' }}
              {{ formatCurrency(Math.abs(res.resultado)) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      walletData: {},
    };
  },

  computed: {
    ...mapGetters('transaccion', ['userHistory']),
    ...mapGetters('cripto', ['getCriptoPrice']),
    ...mapGetters(['username']),
  },

  methods: {
    ...mapActions('transaccion', ['dataHistory']),

    async calculateInvestmentResults() {
      await this.dataHistory(this.username);
      const userHistory = this.userHistory;

      const wallet = {};
      
      userHistory.forEach(transaction => {
        const { crypto_code, crypto_amount, action, money } = transaction;
        const amount = parseFloat(crypto_amount);
        if (!wallet[crypto_code]) {
          wallet[crypto_code] = { amount: 0, perdida: 0, ganado: 0 };
        }

        if (action === 'purchase') {
          wallet[crypto_code].amount += amount;
          wallet[crypto_code].perdida += parseFloat(money);
        } else if (action === 'sale') {
          wallet[crypto_code].amount -= amount;
          wallet[crypto_code].ganado += parseFloat(money);
        }
      });

      for (const crypto_code in wallet) {
        if (wallet[crypto_code].ganado === 0) {
          const currentPrice = this.getCriptoPrice(crypto_code)?.totalAsk || 0;
          const valorActual = wallet[crypto_code].amount * currentPrice;
          const totalPerdida = wallet[crypto_code].perdida;
          wallet[crypto_code].resultado = valorActual - totalPerdida;
        } else {
          wallet[crypto_code].resultado = wallet[crypto_code].ganado - wallet[crypto_code].perdida;
        }
      }
      this.walletData = wallet;
    },

    formatCurrency(value) {
      return value.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    },
  },

  mounted() {
    this.calculateInvestmentResults();
  },
}
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
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

.positivo {
  color: green;
  font-weight: bold;
}

.negativo {
  color: red;
  font-weight: bold;
}

tbody tr:hover {
  background-color: #f1f1f1;
}
</style>
