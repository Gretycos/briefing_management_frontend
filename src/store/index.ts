import Vue from 'vue'
import Vuex from 'vuex'
import { requestLogin } from '@/api/api'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: localStorage.getItem('user') || ''
  },
  mutations: {
    SET_USER: (state, data) => {
      state.user = data
      localStorage.setItem('user', data)
    },
    REMOVE_TOKEN: (state) => {
      state.user = ''
      localStorage.removeItem('user')
    }
  },
  actions: {
  },
  modules: {
  }
})
