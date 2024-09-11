import axios from 'axios'

const API_BASE_URL = 'https://labor3-d60e.restdb.io/rest/transactions';
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {'x-apikey': '64a2e9bc86d8c525a3ed8f63'},
});

const state = {
  
};

const getters = {

};

const mutations = {

};

const actions = {
  async dataTransaction({commit},savePurchase) {
    console.log('entra aca???????')
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
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
}