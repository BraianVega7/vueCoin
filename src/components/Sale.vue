<template>
  <div class="container">
    <h1>Vender Criptomonedas</h1>
    <div v-if=" getWallet && availableCryptos().length===0">
      <h5>No hay Criptomonedas para vender.</h5>
    </div>
    <div v-else>
      <form @submit.prevent="createSellTransaction">
        <label for="cryptoCode">Criptomoneda disponible:</label>
        <select v-model="cryptoCode">
          <option v-for="crypto in availableCryptos()" :key="crypto" :value="crypto">
            {{ crypto }}
          </option>
        </select>
        <div>
          <p>Cantidad disponible:  {{ availableAmount.toFixed(6) }}</p>
        </div>
        <div>
          <p>Precio actual de mercado venta: $ {{ formattedCriptoPrice }}</p>
        </div>
        <div>
          <label for="amountToSell">Monto en Cripto:</label>
          <input type="number" v-model.number="amountToSell"  min="0" step="0.000001" :max="availableAmount" placeholder="Ingresa cantidad">
        </div>
        <div>
          <p>Recibirás en ARS: $ {{ calculatedAmountInARS.toLocaleString('es-AR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2 }) }}</p>
        </div>
        <div>
          <button type="submit">Vender</button>
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
    ...mapActions('transaccion', ['dataTransaction']),
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
        console.log('Transacción guardada correctamente');
      } catch (error) {
        console.log('Error al realizar la transacción', error);
      }
    },
  },

  created() {
    this.fetchCryptosPrices();
  },
};
</script>

<style scoped>
.container {
  background-color: rgb(91, 103, 91);
}
</style>