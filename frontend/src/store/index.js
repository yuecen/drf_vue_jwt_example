import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './mutation-types'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'
import router from '../router'

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
    // vuex store this.$router.push not defined
    // https://github.com/vuejs/vuex-router-sync/issues/21
    router.push(payload.redirect)
  },
  [types.LOGOUT]: (state, payload) => {
    state.token = null
    state.user = {}
    router.push(payload.redirect)
  },
  [types.TITLE]: (state, data) => {
    state.title = data
  }
}

const actions = {
  [types.LOGIN] ({ commit }, payload) {
    axios.post(LOGIN_URL, payload.credential)
    .then(response => {
      if (response.data.token) {
        var mutationPayload = {}
        mutationPayload.token = response.data.token
        mutationPayload.user = JSON.parse(atob(response.data.token.split('.')[1]))
        mutationPayload.user.authenticated = true
        console.log('mutationPayload', mutationPayload)
        mutationPayload.redirect = payload.redirect
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
