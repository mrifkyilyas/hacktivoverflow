import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLogin: !!localStorage.getItem('access_token'),
    idLogin:  localStorage.getItem('id'),
    nameLogin :localStorage.getItem('name')

  },
  mutations: {
    isLoggin(state, payloadLogin) {
      state.isLogin = payloadLogin;
      state.nameLogin = localStorage.getItem('name')
      state.idLogin = localStorage.getItem('id')
    },
    loginout(state, payloadLogout) {
      state.isLogin = payloadLogout;
    },

  },
  actions: {

  }
})
