import * as types from '../store/mutation-types'
import axios from 'axios'
import store from '../store'
import router from '../router'

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

export function base () {
  return 'http://' + window.location.hostname + ':8000/'
}

export function UserProfile (userID) {
  return axios.get(base() + 'users/' + userID + '/')
}
