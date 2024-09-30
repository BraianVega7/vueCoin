import axios from 'axios'

const API_BASE_URL = 'https://labor3-d60e.restdb.io/rest/transactions';
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: { 'x-apikey': '64a2e9bc86d8c525a3ed8f63' },
});

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
};

const actions = {
  async dataTransaction({ commit }, savePurchase) {
    try {
      console.log('Datos enviados:', savePurchase);
      const response = await apiClient.post('', savePurchase);
      console.log('Respuesta de la API:', response.data);
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

  //hacer el metodo para editar y otro para borrar.
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}