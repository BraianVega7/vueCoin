import axios from 'axios'

const state = {
  criptos: {
    btc: null,
    eth: null,
    usdt: null,
  },
};

const getters = {
  getCriptoPrice: (state) => (criptoCode) => state.criptos[criptoCode],
};

const mutations = {
  setCripto(state,{criptoCode,data}){
    state.criptos[criptoCode]=data;
  },
};

const API_BASE_URL = 'https://criptoya.com/api';

const actions = {
  async fetchCryptosPrices({ commit, state }) {
    try {
      for (const criptoCode in state.criptos) {
        const criptoResponse = await axios.get(`${API_BASE_URL}/satoshitango/${criptoCode}/ars/1`);
        //console.log(criptoResponse.data)
        commit('setCripto', { criptoCode, data: criptoResponse.data });
      }
    } catch (error) {
      console.log('Error al recuperar los precios de las criptomonedas:', error);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
