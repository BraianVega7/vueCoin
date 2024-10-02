import axios from 'axios'

const API_BASE_URL = 'https://laboratorio-36cf.restdb.io/rest/transactions';
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'x-apikey': '64a5ccf686d8c5d256ed8fce' },
});
//https://labor3-d60e.restdb.io/rest/ - https://laboratorio3-5459.restdb.io/rest/
//64a2e9bc86d8c525a3ed8f63 - 64a57c2b86d8c50fe6ed8fa5
const state = {
  userHistory: [],
};

const getters = {
  userHistory: (state) => state.userHistory,
};

const mutations = {
  setDataHistory(state, history) {
    state.userHistory = history;
  },
  updateTransactionInHistory(state, updatedTransaction) {
    const index = state.userHistory.findIndex(t => t._id === updatedTransaction._id);
    if (index !== -1) {
      state.userHistory.splice(index, 1, updatedTransaction);
    }
  },
  removeTransactionFromHistory(state, idTransaction) {
    state.userHistory = state.userHistory.filter(transaction => transaction._id !== idTransaction);
  },
  addTransactionToHistory(state, newTransaction) {
    state.userHistory.push(newTransaction);
  }
};

const actions = {
  async dataTransaction({ commit }, savePurchase) {
    try {
      console.log('Datos enviados:', savePurchase);
      const response = await apiClient.post('', savePurchase);
      console.log('Respuesta de la API:', response.data);
      commit('addTransactionToHistory', response.data);
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
  async deleteTransaction({ commit }, idTransaction) {
    try {
      console.log('Eliminando transaccion' ,idTransaction)
      const response = await apiClient.delete(`${API_BASE_URL}/${idTransaction}`);
      commit('removeTransactionFromHistory', idTransaction);
      return response.data
    } catch (error) {
      console.error('Error al borrar el historial:', error.response?.data?.list || error.message);
    }
  },

  async updateTransaction({commit}, editTransaction) {
    try {
      console.log('Editando transaccion' ,editTransaction)
      const response = await apiClient.patch(`${API_BASE_URL}/${editTransaction._id}`,editTransaction);
      commit('updateTransactionInHistory', response.data);
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