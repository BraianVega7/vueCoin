import { createStore } from 'vuex';
import VuexPersistence from 'vuex-persist';

export default createStore({
  state: {
    username: null,
    isLoggedIn: false,
  },
  getters: {
    username: state => state.username,
    isLoggedIn: state => state.isLoggedIn,
  },
  mutations: {
    login (state, username) {
      state.username = username;
      state.isLoggedIn = true;
    },
    logout (state){
      state.username= '';
      state.isLoggedIn = false;
    }
  },
  actions: {
    async login ({commit}, username) {
      try{
        commit('login', username)
        console.log(username)
      }
      catch(error){
        console.error ('Error al iniciar sesion', error)
      }
    },
    async logout ({commit}){
      try {
        commit ('logout');
      }
      catch {
        console.error('Error al salir de la sesion', error)
      }
    }
  },
  plugins: [
    new VuexPersistence({
      storage: window.localStorage
    }).plugin
  ]
})
