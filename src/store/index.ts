import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  // 全局
  // 响应式变量
  state: {
    user: localStorage.getItem('user') || ''
  },
  // 同步方法
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
  // 异步方法
  actions: {
  },
  modules: {
  }
})

export class store {
}
