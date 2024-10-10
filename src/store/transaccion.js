import axios from 'axios'

const API_BASE_URL = 'https://labor3-d60e.restdb.io/rest/transactions';
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'x-apikey': '64a2e9bc86d8c525a3ed8f63' },
});
//https://labor3-d60e.restdb.io/rest/ - https://laboratorio3-5459.restdb.io/rest/ - https://laboratorio-36cf.restdb.io/rest/
//https://laboratorio3-f36a.restdb.io/rest/
//64a2e9bc86d8c525a3ed8f63 - 64a57c2b86d8c50fe6ed8fa5 - 64a5ccf686d8c5d256ed8fce
//64bdbb6f86d8c5e18ded91e3
const state = {
  wallet: {},
  userHistory: [],
};

const getters = {
  getWallet: (state) => state.wallet,
  userHistory: (state) => state.userHistory,
};

const mutations = {
  setDataHistory(state, history) {
    state.userHistory = history;
  },
  updateCriptoAmount(state, { criptoCode, amount, action }) {
    const amountNumber = parseFloat(amount);

    if (isNaN(amountNumber)) {
      console.error('El monto no es un número válido', amountNumber);
      return;
    }

    if (!state.wallet[criptoCode]) {
      state.wallet[criptoCode] = 0;
    }

    state.wallet[criptoCode] += (action === 'purchase') ? amountNumber : -amountNumber;

    if (state.wallet[criptoCode] < 0) {
      state.wallet[criptoCode] = 0;
    }

    console.log('wallet actualizada', state.wallet);
  },

//este esta de mas
  removeTransactionFromHistory(state, idTransaction) {
    state.userHistory = state.userHistory.filter(transaction => transaction._id !== idTransaction);
  },
};

const actions = {
  async dataTransaction({ commit }, savePurchase) {
    try {
      console.log('Datos enviados:', savePurchase);
      const response = await apiClient.post('', savePurchase);
      console.log('Respuesta de la API:', response.data);
      commit('updateCriptoAmount', {
        criptoCode: savePurchase.crypto_code,
        amount: savePurchase.crypto_amount,
        action: savePurchase.action,
      });
      return response.data;

    } catch (error) {
      console.error('Error al crear nueva transacción:', error.response?.data?.list || error.message);
      console.log('Detalles de los errores de validación:', error.response?.data?.list);
    }
  },

  async dataHistory({ commit }, username) {
    try {
      const response = await apiClient.get(`${API_BASE_URL}?q={"user_id":"${username}"}`);
      commit('setDataHistory', response.data);
    } catch (error) {
      console.error('Error al obtener historial:', error.response?.data?.list || error.message);
    }
  },
  //tengo que solucionar el problema de borrar desde
  async deleteTransaction({ commit }, idTransaction) {
    try {
      console.log('Eliminando transaccion', idTransaction)
      const response = await apiClient.delete(`${API_BASE_URL}/${idTransaction}`);
      const { crypto_code, crypto_amount, action } = response.data;
      commit('updateCriptoAmount', {
        cryptoCode: crypto_code,
        amount: crypto_amount,
        action: (action === 'purchase' ? 'sale' : 'purchase'),
      });
    } catch (error) {
      console.error('Error al borrar el historial:', error.response?.data?.list || error.message);
    }
  },

  async updateTransaction({ _ }, editTransaction) {
    try {
      console.log('Editando transaccion', editTransaction)
      const response = await apiClient.patch(`${API_BASE_URL}/${editTransaction._id}`, editTransaction);
      return response.data;
    } catch (error) {
      console.error('Error al editar el historial:', error.response?.data?.list || error.message);
    }
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}