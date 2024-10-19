<template>
  <div class="container">
    <h1>Inversiones</h1>
    <div>
      <table>
        <thead>
          <tr>
            <th>Criptomoneda</th>
            <th>Resultado</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(res, cripto) in walletData" :key="cripto">
            <td>{{ cripto }}</td>
            <td>{{ formatCurrency(res.resultado) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data(){
    return{
      walletData:{},
    }
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
        const { crypto_code,crypto_amount, action, money } = transaction;
        const amount = parseFloat(crypto_amount)
        if (!wallet[crypto_code]) {
          wallet[crypto_code] = {amount: 0, perdida: 0, ganado: 0 };
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
          const currentPrice = this.getCriptoPrice(crypto_code)?.totalBid || 0;
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
</style>
