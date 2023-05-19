import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

import Constant from "@/common/Constant";
import empRestAPI from "@/util/http-common.js";
import createPersistedState from "vuex-persistedstate";

export default new Vuex.Store({
  state: {
    items: [],
    data: [],
    planList: [],
  },
  getters: {
    items(state) {
      return state.items;
    },
    data(state) {
      return state.data;
    },
    planList(state) {
      console.log(state.planList);
      return state.planList;
    },
  },
  mutations: {
    [Constant.SET_ROUTES](state, payload) {
      state.items = payload;
    },
    [Constant.SET_ALLROUTES](state, payload) {
      state.data = payload;
    },
    [Constant.SET_INIT_ROUTE](state) {
      state.data = [];
      state.items = [];
    },
    [Constant.SET_PLANS](state, payload) {
      console.log(payload);
      if (!state.planList.includes(payload)) {
        payload.content = "";
        payload.cost = "";
        console.log(payload);
        state.planList.push(payload);
      }
    },
    [Constant.INIT_PLANS](state) {
      state.planList = [];
    },
    [Constant.REMOVE_PLAN_MUTAION](state, payload) {
      for (let i = 0; i < state.planList.length; i++) {
        if (state.planList[i].id == payload) {
          state.planList.splice(i, 1);
        }
      }
    },
    [Constant.MOVE_UP_MUTATION](state, payload) {
      let findIdx = 0;
      for (let i = 0; i < state.planList.length; i++) {
        if (state.planList[i].id == payload) {
          findIdx = i;
        }
      }
      if (findIdx > 0) {
        let to = findIdx - 1;
        let item = state.planList.splice(findIdx, 1);
        state.planList.splice(to, 0, item[0]);
      }
    },

    [Constant.MOVE_DOWN_MUTATION](state, payload) {
      let findIdx = 0;
      for (let i = 0; i < state.planList.length; i++) {
        if (state.planList[i].id == payload) {
          findIdx = i;
        }
      }
      if (findIdx < state.planList.length - 1) {
        let to = findIdx + 1;
        let item = state.planList.splice(findIdx, 1);
        state.planList.splice(to, 0, item[0]);
      }
    },
    [Constant.REPLACE_ROUTE_MUTATATION](state, payload) {
      for (let i = 0; i < state.planList.length; i++) {
        if (payload.id == state.planList[i].id) {
          state.planList.splice(i, 1, payload);
        }
      }
    },
  },
  actions: {
    [Constant.GET_ROUTES]({ commit }, keyWord) {
      return empRestAPI.get(`/map/${keyWord}`).then(({ data }) => {
        commit(Constant.SET_ROUTES, data.documents);
        commit(Constant.SET_ALLROUTES, data);
      });
    },
    [Constant.INITIATE_ROUTE]({ commit }) {
      commit(Constant.SET_INIT_ROUTE);
    },
    [Constant.GET_PLANS]({ commit }, plan) {
      commit(Constant.SET_PLANS, plan);
    },
    [Constant.INITIATE_PLANS]({ commit }) {
      commit(Constant.INIT_PLANS);
    },
    [Constant.REMOVE_PLAN]({ commit }, id) {
      commit(Constant.REMOVE_PLAN_MUTAION, id);
    },
    [Constant.MOVE_UP]({ commit }, id) {
      console.log(id);
      commit(Constant.MOVE_UP_MUTATION, id);
    },
    [Constant.MOVE_DOWN]({ commit }, id) {
      console.log(id);
      commit(Constant.MOVE_DOWN_MUTATION, id);
    },
    [Constant.REPRACE_ROUTE]({ commit }, id) {
      commit(Constant.REPLACE_ROUTE_MUTATATION, id);
    },
  },
  modules: {},
  plugins: [createPersistedState()],
});
