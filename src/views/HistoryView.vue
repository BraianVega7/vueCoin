<template>
  <div class="container">
    <h3>Historial de transacciones</h3>
    <div v-if="userHistory.length === 0">
      <p>No existen transacciones.</p>
    </div>

    <div v-else="userHistory && userHistory.length">
      <ul>
        <li v-for="transaction in userHistory" :key="transaction._id">
          <p><strong>Id transaccion: </strong> {{ transaction._id }}</p>
          <p><strong>Acción: </strong>{{ transaction.action === 'sale' ? 'Venta' : 'Compra' }}</p>
          <p><strong>Criptomoneda: </strong>{{ transaction.crypto_code }}</p>
          <p><strong>Cantidad cripto: </strong>{{ formatCryptoAmount(transaction.crypto_amount) }} </p>
          <p><strong>Nombre Usuario: </strong>{{ transaction.user_id }}</p>
          <p><strong>Pesos ARS: </strong>{{ formatMoney(transaction.money) }}</p>
          <p><strong>Fecha: </strong>{{ transaction.datetime }}</p>
          <button class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#editModal"
            @click="editarTransaccion(transaction)">Editar</button>
          <button class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#confirmDelete"
            @click="setSelectedTransaction(transaction._id)">Borrar</button>
        </li>
      </ul>
    </div>

    <div class="modal" id="confirmDelete">
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <h5 class="modal-title">Eliminar transacción</h5>
            <button class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            <h6>Confirme que está seguro de eliminar esta transacción.</h6>
          </div>

          <div class="modal-footer">
            <button class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button @click="borrarTransaccion(selectedTransaction._id)" data-bs-dismiss="modal"
              class="btn btn-danger">Eliminar</button>
          </div>

        </div>
      </div>
    </div>

    <div class="modal fade" tabindex="-1" id="editModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Transacción - {{ selectedTransaction._id }}</h5>
          </div>
          <div class="modal-body">
            <p>Acción actual <strong>{{ selectedTransaction.action === 'sale' ? 'Venta' : 'Compra' }}</strong>
              modificar:
              <select v-model="action">
                <option value="purchase">Compra</option>
                <option value="sale">Venta</option>
              </select>
            </p>
            <p>Criptomoneda actual <strong>{{ selectedTransaction.crypto_code }}</strong> modificar:
              <select v-model="crypto_code">
                <option value="btc">Bitcoin (BTC)</option>
                <option value="eth">Ethereum (ETH)</option>
                <option value="usdt">Tether (USDT)</option>
              </select>
            </p>
            <p>Valor actual Criptomoneda <strong>{{ selectedTransaction.crypto_amount }}</strong> modificar:</p>
            <input type="number" v-model="crypto_amount" min="0" step="0.01" />
            <p>Pesos ARS actual <strong>${{ formatMoney(selectedTransaction.money) }}</strong> modificar:</p>
            <input type="number" v-model="money" min="0" step="0.01" />
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
            <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
              @click="guardarTransaccion">Guardar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data() {
    return {
      selectedTransaction: {},
      originalTransaction: {},
      action: '',
      crypto_code: '',
      crypto_amount: 0,
      money: 0,
    };
  },
  computed: {
    ...mapGetters(['username']),
    ...mapGetters('transaccion', ['userHistory']),
  },
  methods: {
    ...mapActions('transaccion', ['dataHistory', 'deleteTransaction', 'updateTransaction']),

    setSelectedTransaction(id) {
      this.selectedTransaction._id = id;
    },

    formatCryptoAmount(amount) {
      return parseFloat(amount).toFixed(6);
    },

    formatMoney(moneyAr) {
      return parseFloat(moneyAr).toLocaleString('es-AR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    },

    async fetchUserHistory() {
      if (this.username) {
        await this.dataHistory(this.username);
      } else {
        console.log('Error al buscar el historial');
      }
    },

    editarTransaccion(transaction) {
      this.selectedTransaction = { ...transaction };
      this.originalTransaction = { ...transaction };

      this.action = '';
      this.crypto_code = '';
      this.crypto_amount = null;
      this.money = null;
    },

    async guardarTransaccion() {
      const editTransaction = { ...this.selectedTransaction };

      if (this.action) {
        editTransaction.action = this.action;
      }
      if (this.crypto_code) {
        editTransaction.crypto_code = this.crypto_code;
      }
      if (this.crypto_amount > 0 || this.crypto_amount !== null) {
        editTransaction.crypto_amount = parseFloat(this.crypto_amount).toFixed(6);
        console.log(this.crypto_amount)
      }
      if (this.money > 0) {
        editTransaction.money = parseFloat(this.money).toFixed(2);
      }

      try {
        await this.updateTransaction(editTransaction);
        console.log('Datos antiguos:', this.originalTransaction);
        console.log('Datos nuevos:', editTransaction);
      } catch (error) {
        console.log('Error al pasar la transaccion editada', error)
      }
    },

    async borrarTransaccion(idTransaction) {
      if (!idTransaction) {
        console.error('ID de transacción no encontrado');
        return;
      }
      try {
        await this.deleteTransaction(idTransaction);
        console.log('Transacción con ID eliminada', idTransaction)
        await this.fetchUserHistory();
      } catch (error) {
        console.error('Error al borrar la transacción:', error);
      }
    },

  },
  mounted() {
    this.fetchUserHistory();
  },
};
</script>

<style scoped>
.container {
  background-color: rgb(80, 96, 97);
  padding: 20px;
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
  border: 1px solid #ccc;
}

li:last-child {
  margin-bottom: 0px;
}

p {
  margin: 10px 0;
}

button {
  margin-right: 10px;
}
</style>