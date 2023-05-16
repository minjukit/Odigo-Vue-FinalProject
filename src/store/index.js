import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import Constant from '@/common/Constant'
import empRestAPI from '@/util/http-common.js'

export default new Vuex.Store({
  state: {
    items: [],
    data: []
  },
  getters: {
    items(state) {
      return state.items;
    },
    data(state) {
      return state.data;
    }
  },
  mutations: {
    [Constant.SET_ROUTES](state, payload) {
      console.log(payload)
      state.items = payload
      console.log(state.items)
    },
    [Constant.SET_ALLROUTES](state, payload) {
      state.data= payload
    },
  },
  actions: {
    [Constant.GET_ROUTES]({commit,state}, keyWord) {
        return empRestAPI
          .get(`/trip/map/${keyWord}`)
          .then(({ data }) => {
            console.log(`Constant.GET_ROUTES start ${state.items}`)
            commit(Constant.SET_ROUTES, data.documents)
            commit(Constant.SET_ALLROUTES, data)   
            console.log(`Constant.GET_ROUTES end ${state.items}`)
            // console.log(data)
          });
    }
  },
  modules: {
  }
})
