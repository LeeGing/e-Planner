import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// these are the global states of our applications
// tells vue to use vuex, creating a vuex store
export default new Vuex.Store({
  // strict mode
  // we created the states necessary
  strict: true,
  state: {
  // in order for token to change, we have to invoke a mutation, which requires invoking an action
    token: null,
    user: null,
    isUserLoggedIn: false
  },
  // we created actions and mutations to change the states
  mutations: {
    // same name as action, but we take a state and a token
    setToken (state, token) {
    // to change the value of the token
      state.token = token
      if (token) {
        state.isUserLoggedIn = true
      } else {
        state.isUserLoggedIn = false
      }
    },
    setUser (state, user) {
    // to change the value of the token
      state.user = user
    }
  },
  actions: {
    // takes in a commit and a token
    // basically call the mutation called setToken and pass it the token object
    setToken ({commit}, token) {
      // we want to call our commit, or our async calls
      commit('setToken', token)
    },
    setUser ({commit}, user) {
      commit('setUser', user)
    }
  }
})

// vuex has actions, mutations, and states,
// actions are event names invoked from vue components
