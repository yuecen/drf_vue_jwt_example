// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import * as types from './store/mutation-types'
import axios from 'axios'
import store from './store'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth) {
    if (store.state.token) {
      next()
    } else {
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    }
  } else {
    next()
  }
})

axios.interceptors.request.use(
  config => {
    if (store.state.token) {
      config.headers.Authorization = `JWT ${store.state.token}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

axios.interceptors.response.use(
  response => {
    console.log(store.state)
    return response
  },
  error => {
    console.log('[Response error!]', error.response)
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // Using logout instead of login for renew state
          store.commit(types.LOGOUT, {
            router: router,
            redirect: router.currentRoute.fullPath
          })
          break
        case 500:
          console.log(error.response.statusText)
          break
      }
    }
    return Promise.reject(error.response.data)
  })

Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
