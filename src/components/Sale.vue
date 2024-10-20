<template>
  <div class="sell-container">
    <h1>Vender Criptomonedas</h1>
    <div v-if="getWallet && availableCryptos().length === 0">
      <h5>No hay Criptomonedas para vender.</h5>
    </div>
    <div v-else>
      <form @submit.prevent="createSellTransaction" class="sell-form">
        <label for="cryptoCode">Criptomoneda disponible:</label>
        <select v-model="cryptoCode" class="crypto-select">
          <option v-for="crypto in availableCryptos()" :key="crypto" :value="crypto">
            {{ crypto }}
          </option>
        </select>
        <div class="available-amount">
          <p>Cantidad disponible: <span class="amount">{{ availableAmount.toFixed(6) }}</span></p>
        </div>
        <div class="price-info">
          <p>Precio actual de mercado venta: <span class="price">${{ formattedCriptoPrice }}</span></p>
        </div>
        <div>
          <label for="amountToSell">Monto en Cripto:</label>
          <input type="number" v-model.number="amountToSell" min="0" step="0.000001" :max="availableAmount"
            placeholder="Ingresa cantidad" class="amount-input">
        </div>
        <div class="calculated-amount">
          <p>Recibirás en ARS: <span class="ars-amount">${{ calculatedAmountInARS.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) }}</span></p>
        </div>
        <div>
          <button type="submit" class="submit-button">Vender</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      cryptoCode: '',
      amountToSell: 0,
      savePurchase: null,
    };
  },

  computed: {
    ...mapGetters(['username']),
    ...mapGetters('transaccion', ['getWallet']),
    ...mapGetters('cripto', ['getCriptoPrice']),

    availableAmount() {
      return this.getWallet[this.cryptoCode] || 0;
    },

    formattedCriptoPrice() {
      const criptoPrice = this.getCriptoPrice(this.cryptoCode);
      const price = criptoPrice && criptoPrice.totalAsk ? criptoPrice.totalAsk : 0;
      return price.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    },

    calculatedAmountInARS() {
      const criptoPrice = this.getCriptoPrice(this.cryptoCode);
      let price = 0;

      if (criptoPrice && criptoPrice.totalAsk) {
        price = criptoPrice.totalAsk;
      }

      return (this.amountToSell * price);
    },
  },

  methods: {
    ...mapActions('transaccion', ['dataHistory', 'dataTransaction']),
    ...mapActions('cripto', ['fetchCryptosPrices']),

    availableCryptos() {
      const wallet = this.getWallet;
      return Object.keys(wallet).filter(crypto => wallet[crypto] > 0);
    },

    createSellTransaction() {
      this.savePurchase = {
        user_id: this.username,
        action: 'sale',
        crypto_code: this.cryptoCode,
        crypto_amount: parseFloat(this.amountToSell),
        money: this.calculatedAmountInARS.toFixed(2),
        datetime: new Date(),
      };

      console.log(`Transacción a enviar: `, this.savePurchase);

      this.newDataTransaction();
      this.amountToSell = 0;
    },

    async newDataTransaction() {
      try {
        await this.dataTransaction(this.savePurchase);
      } catch (error) {
        console.log('Error al realizar la transacción', error);
      }
    },

    async loadUserHistory() {
      try {
        await this.dataHistory(this.username);
      } catch (error) {
        console.error('Error al cargar el historial de usuario:', error);
      }
    },
  },

  created() {
    this.fetchCryptosPrices();
    this.loadUserHistory();
  },
};
</script>

<style scoped>
.sell-container {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  padding: 20px;
  max-width: 400px;
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  color: rgb(91, 103, 91);
}

.sell-form {
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 10px;
  color: rgb(91, 103, 91);
}

.crypto-select, .amount-input {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-top: 5px;
}

.available-amount, .price-info, .calculated-amount {
  margin-top: 15px;
}

.amount {
  font-weight: bold;
  color: rgb(91, 103, 91);
}

.price {
  font-weight: bold;
  color: rgb(91, 103, 91);
}

.ars-amount {
  font-weight: bold;
  color: green;
}

.submit-button {
  margin-top: 20px;
  padding: 10px;
  background-color: rgb(91, 103, 91);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.submit-button:hover {
  background-color: #5a7a5a;
}
</style>
