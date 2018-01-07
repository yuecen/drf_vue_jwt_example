import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './mutation-types'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

const API_URL = 'http://localhost:8000/'
const LOGIN_URL = API_URL + 'api-token-auth/'

Vue.use(Vuex)

const state = {
  user: {},
  token: null
}

const mutations = {
  [types.LOGIN]: (state, payload) => {
    state.token = payload.token
    state.user = payload.user

    if (payload.redirect) {
      payload.router.push(payload.redirect)
    }
  },
  [types.LOGOUT]: (state, payload) => {
    state.token = null
    state.user = {}

    if (payload.redirect) {
      payload.router.push(payload.redirect)
    }
  },
  [types.TITLE]: (state, data) => {
    state.title = data
  }
}

const actions = {
  [types.LOGIN]: ({ commit }, payload) => {
    axios.post(LOGIN_URL, payload.credential)
    .then(response => {
      if (response.data.token) {
        var mutationPayload = {}
        mutationPayload.token = response.data.token
        mutationPayload.user = JSON.parse(atob(response.data.token.split('.')[1]))
        mutationPayload.user.authenticated = true

        console.log('mutationPayload', mutationPayload)
        console.log('exp: ', new Date(mutationPayload.user.exp * 1000))
        console.log('exp: ', new Date(mutationPayload.user.orig_iat * 1000))
        mutationPayload.redirect = payload.redirect
        mutationPayload.router = payload.router
        commit(types.LOGIN, mutationPayload)
      }
    })
    .catch(e => {
      console.log(e)
    })
  }
}

const store = new Vuex.Store({
  state,
  mutations,
  actions,
  plugins: [
    createPersistedState()
  ]
})

export default store
