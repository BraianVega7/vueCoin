<template>
  <div class="purchase-container">
    <h2>Comprar Criptomoneda</h2>
    <form @submit.prevent="guardarCompra" class="purchase-form">
      <label for="cryptoCode">Criptomoneda:</label>
      <select v-model="cryptoCode" class="crypto-select">
        <option value="btc">Bitcoin (BTC)</option>
        <option value="eth">Ethereum (ETH)</option>
        <option value="usdt">Tether (USDT)</option>
      </select>

      <div class="price-info">
        <p>Precio actual de mercado: <span class="price">${{ formattedCriptoPrice }}</span></p>
      </div>
      <div class="money-input">
        <label for="money">Monto en pesos (ARS):</label>
        <input type="number" v-model="money" min="0" step="0.01" placeholder="Introducir Importe" class="money-field" />
      </div>
      <div class="calculated-amount">
        <p>Cantidad que recibirás: <span class="amount">{{ calculatedAmount }}</span> - {{ cryptoCode.toUpperCase() }}</p>
      </div>
      <div>
        <button type="submit" class="submit-button">Comprar</button>
      </div>
    </form>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      cryptoCode: 'btc',
      money: 0,
      savePurchase: null,
    };  
  },
  computed: {
    ...mapGetters('cripto', ['getCriptoPrice']),
    ...mapGetters(['username']),

    formattedCriptoPrice() {
      const criptoPrice = this.getCriptoPrice(this.cryptoCode);
      const price = criptoPrice && criptoPrice.bid ? criptoPrice.bid : 0;
      return price.toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    },

    calculatedAmount() {
      const criptoPrice = this.getCriptoPrice(this.cryptoCode);
      let price = 0;

      if (criptoPrice && criptoPrice.bid) {
        price = criptoPrice.bid;
      }

      if (price > 0) {
        return (this.money / price).toFixed(6);
      } else {
        return 0;
      }
    }
  },
  methods: {
    ...mapActions('transaccion',['dataTransaction']),
    ...mapActions('cripto', ['fetchCryptosPrices']),
    guardarCompra() {
      if (this.money > 0 && this.calculatedAmount > 0) {
        this.savePurchase = {
          user_id: this.username,
          action: 'purchase',
          crypto_code: this.cryptoCode,
          crypto_amount: parseFloat(this.calculatedAmount),
          money: this.money,
          datetime: new Date(),
        }
        console.log(this.savePurchase)
        this.newDataTransaction()
      }
    },

    async newDataTransaction (){
      try {
        await this.dataTransaction(this.savePurchase),
        this.money = 0;
      } catch (error) {
        console.log('Error al realizar la transaccion', error)
      }
    },
    
  },
  watch: {
    cryptoCode() {
      this.money = 0;
    },
  },
  created() {
    this.fetchCryptosPrices();
  },
}
</script>

<style scoped>
.purchase-container {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 8px;
  padding: 20px;
  max-width: 400px;
  margin: 20px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
  color: rgb(91, 103, 91);
}

.purchase-form {
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 10px;
  color: rgb(91, 103, 91);
}

.crypto-select, .money-field {
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-top: 5px;
}

.price-info {
  margin-top: 15px;
}

.price {
  font-weight: bold;
  color: rgb(91, 103, 91);
}

.calculated-amount {
  margin-top: 15px;
}

.amount {
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
