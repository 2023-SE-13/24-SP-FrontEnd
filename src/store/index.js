import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    searchButtonClicked: false
  },
  getters: {
    searchButtonClicked: state => state.searchButtonClicked
  },
  mutations: {
    setButtonClicked(state, value) {
      state.searchButtonClicked = value
    }
  },
  actions: {
    updateButtonClicked({ commit }, value) {
      commit('setButtonClicked', value);
    }
  },
  modules: {
  }
})
