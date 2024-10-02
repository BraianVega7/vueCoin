<template>
  <div>
    <h2>Comprar Criptomoneda</h2>
    <form @submit.prevent="guardarCompra">
      <label for="cryptoCode">Criptomoneda:</label>
      <select v-model="cryptoCode">
        <option value="btc">Bitcoin (BTC)</option>
        <option value="eth">Ethereum (ETH)</option>
        <option value="usdt">Tether (USDT)</option>
      </select>

      <div>
        <p>Precio actual de mercado: $ {{ formattedCriptoPrice }} </p>
      </div>
      <div>
        <label for="money">Monto en pesos (ARS):</label>
        <input type="number" v-model="money" min="0" placeholder="Introducir Importe" />
      </div>
      <div>
        <p>Cantidad que recibirás: {{ calculatedAmount }} - {{ cryptoCode.toUpperCase() }}</p>
      </div>
      <div>
        <button type="submit">Comprar</button>
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
        price = criptoPrice.bid 
      }

      if (price > 0) {
        return (this.money / price).toFixed(8);
      } else {
        return 0;
      }
    }
  },
  methods: {
    ...mapActions('transaccion',['dataTransaction']),

    guardarCompra() {
      if (this.money > 0 && this.calculatedAmount > 0) {
        this.savePurchase = {
          user_id: this.username,
          action: 'purchase',
          crypto_code: this.cryptoCode,
          crypto_amount: this.calculatedAmount,
          money: this.money,
          datetime: new Date(),
        }
        console.log(this.savePurchase)
        this.newDataTransaction()
      }
    },

    async newDataTransaction (){
      try{
        await this.dataTransaction(this.savePurchase),
        this.money=0;
      }catch(error){
        console.log('Error al realizar la transaccion', error)
      }
    },
    
  },
  watch: {
    cryptoCode() {
      this.money = 0;
    },
  },
}
</script>

<style scoped></style>
