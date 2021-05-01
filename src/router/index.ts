import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    redirect: '/news',
    meta: {
      requireAuth: true
    },
    component: Home,
    children: [
      {
        path: 'news',
        name: '新闻管理',
        meta: {
          requireAuth: true
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/News.vue')
      },
      {
        path: 'summary',
        name: '简报管理',
        meta: {
          requireAuth: true
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/Summary.vue')
      },
      {
        path: 'gather',
        name: '汇总管理',
        meta: {
          requireAuth: true
        },
        component: () => import(/* webpackChunkName: "about" */ '../views/Gather.vue')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
