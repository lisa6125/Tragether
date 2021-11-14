import Vue from "vue";
import Vuex from "vuex";
// import moment from "moment";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);
export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  plugins: [createPersistedState()]
});
