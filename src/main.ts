import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) { // 需要认证
    if (store.state.user) { // 有user
      next()
    } else { // 没有user，转去登录
      next({ path: 'login' })
    }
  } else { // 不需要认证
    next()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
