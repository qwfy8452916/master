import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    authData: JSON.parse(localStorage.getItem('AuthData')),
  },

  mutations: {
    getAuthData (state, payload) {
      state.authData = payload;
    },
    getUserId(state,id){
      state.userId = id;
    }
  }
})