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
    accessToken: "",
    refreshToken: "",
    isLogin: false,
    nickName: "",
    startDate: null,
    endDate: null,
    modifyList : [],
    plan : null,
    onModify : false,
    preModify : false,
  },
  getters: {
    preModify(state) {
      return state.preModify;
    },
    onModify(state) {
      return state.onModify;
    },

    plan(state) {
      return state.plan;
    },

    modifyList(state) {
      return state.modifyList;
    },

    nickName(state) {
      return state.nickName;
    },

    items(state) {
      return state.items;
    },

    data(state) {
      return state.data;
    },

    planList(state) {
      console.log("come here?")
      console.log(state.planList);
      return state.planList;
    },

    accessToken(state) {
      return state.accessToken;
    },

    refreshToken(state) {
      return state.refreshToken;
    },

    isLogin(state) {
      return state.isLogin;
    },

    startDate(state) {
      console.log(typeof(state.startDate))
      return state.startDate
    },

    endDate(state) {
      console.log(typeof(state.endDate))
      return state.endDate
    }

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
      let bool = true;
      for (let i = 0; i < state.planList.length; i++) {
        if (state.planList[i].id == payload.id) {
          bool = false;
        }
      }
      
      console.log(bool)
      if (bool) {
        payload.content = "";
        payload.cost = "";
        console.log(payload);
        state.planList.push(payload);
      }
    },
    [Constant.INIT_PLANS](state) {
      state.planList = [];
      state.startDate = null;
      state.endDate = null;
      state.onModify = false;
      state.plan = null;
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

    [Constant.SET_PLAN_MUTATION](state, payload) {
      let checkBool = true;

      for (let i = 0; i < state.planList.length; i++) {
        if (payload.id == state.planList[i].id) {
          checkBool = false;
        }
      }

      console.log(state.planList);
      console.log(payload);
      console.log(checkBool);

      if (checkBool) {
        payload.content = "";
        payload.cost = "";
        console.log(payload);
        state.planList.push(payload);
      } else {
        alert("이미 추가된 장소 입니다.");
      }
    },

    [Constant.SET_ALLTOKENS_MUTATION](state, payload) {
      state.accessToken = payload.access_TOKEN;
      state.refreshToken = payload.refresh_TOKEN;
      state.nickName = payload.nickName;
      console.log(state.nickName);
      state.isLogin = true;
    },

    [Constant.SET_ACCESSTOKENS_MUTATION](state, payload) {
      state.accessToken = payload.access_TOKEN;
      state.isLogin = true;
    },

    [Constant.SET_REFRESHTOKENS_MUTATION](state, payload) {
      state.refreshToken = payload.refresh_TOKEN;
      state.isLogin = true;
    },

    [Constant.GET_CERT_MUTATION](state) {

      empRestAPI.post("/user/issue").then((response) => {
        console.log("cert mutation")
        console.log(response)
          this.commit(Constant.SET_ACCESSTOKENS_MUTATION, response.data);
          state.isLogin = true;
        });
        // .catch((data) => {
        //   console.log(data.response)
        //   if(data.response.status == 403) {
        //     this.commit(Constant.CHECK_REFRESH_TOKEN_MUTATION)
        //   }
				// });

    },

    [Constant.CHECK_REFRESH_TOKEN_MUTATION](state) {
      empRestAPI
        .post("/user/issue", null, {
          headers: {
            ACCESS_TOKEN: "noneToken",
            REFRESH_TOKEN: state.refreshToken,
          },
        })
        .then((response) => {
          console.log(response.data);
          this.commit(Constant.SET_ALLTOKENS_MUTATION, response.data);
          state.isLogin = true;
        })
        .catch(() => {
          this.commit(Constant.REMOVE_TOKENS);
        });
    },

    [Constant.REMOVE_TOKENS](state) {
      state.accessToken = "";
      state.refreshToken = "";
      state.nickName = "";
      state.isLogin = false;
      state.onModify = false;
    },

    [Constant.FORCE_PLANLIST_MUTATION](state, payload) {
      state.planList = payload
    },

    [Constant.SET_STARTDATE_MUTATION](state, payload) {
      state.startDate = payload
      console.log(state.startDate)
    },

    [Constant.SET_ENDDATE_MUTATION](state, payload) {
      state.endDate = payload
      console.log(state.endDate)
    },

    [Constant.SET_MODIFYLIST_MUTAION](state, payload) {
      state.modifyList = payload;
      console.log(state.modifyList)
    },
    [Constant.SET_MODIFY_PLAN_MUTION](state, payload) {
      state.plan = payload;
    },

    [Constant.REPLACE_PLANLIST_MUTATION](state, payload) {
      state.planList = payload
      state.startDate = state.plan.startDate
      state.endDate = state.plan.endDate
      state.onModify = true;
      state.preModify = true;
    },

    [Constant.FALSE_PREMODIFY_MUTAION](state) {
      state.preModify = false;
    }

  },

  actions: {
    [Constant.GET_ROUTES]({ commit, state }, keyWord) {
      return empRestAPI
        .get(`/map/${keyWord}`, {
          headers: {
            ACCESS_TOKEN: state.accessToken,
            // REFRESH_TOKEN : state.refreshToken
          },
        })
        .then(({ data }) => {
          commit(Constant.SET_ROUTES, data.documents);
          commit(Constant.SET_ALLROUTES, data);
        })
        .catch((data) => {
          if (data.response.status == 403) {
            this.commit(Constant.CHECK_REFRESH_TOKEN_MUTATION);
            console.log("checkRefresh");
            throw new Error();
          }
        });
    },

    [Constant.GET_ROUTE]({ commit, state }, keyWord) {
      commit;
      console.log(keyWord);
      return empRestAPI
        .get(`/map/${keyWord}`, {
          headers: {
            ACCESS_TOKEN: state.accessToken,
            // REFRESH_TOKEN : state.refreshToken
          },
        })
        .catch((data) => {
          if (data.response.status == 403) {
            this.commit(Constant.CHECK_REFRESH_TOKEN_MUTATION);
            console.log("checkRefresh");
            throw new Error();
          }
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

    [Constant.SET_PLAN]({ commit }, plan) {
      commit(Constant.SET_PLAN_MUTATION, plan);
    },

    [Constant.SET_TOKENS]({ commit }, tokens) {
      commit(Constant.SET_ALLTOKENS_MUTATION, tokens);
    },
    [Constant.GET_CERT]({commit, state}) {
      if (state.isLogin == true) {
        commit(Constant.GET_CERT_MUTATION)

      }
    },

    [Constant.LOGOUT]({ commit }) {
      commit(Constant.REMOVE_TOKENS);
    },
    [Constant.FORCE_PLANLIST]({commit}, payload) {
      commit(Constant.FORCE_PLANLIST_MUTATION,payload)
    },

    [Constant.SET_STARTDATE]({commit}, payload) {
      commit(Constant.SET_STARTDATE_MUTATION, payload);
    },

    [Constant.SET_ENDDATE]({commit}, payload) {
      commit(Constant.SET_ENDDATE_MUTATION, payload);
    },

    [Constant.CHECK_REFRESH]({commit}) {
      commit(Constant.CHECK_REFRESH_TOKEN_MUTATION);
    },

    [Constant.SET_MODIFYLIST]({commit}, modifyList) {
      console.log("modify")
      console.log(modifyList)
      commit(Constant.SET_MODIFYLIST_MUTAION, modifyList);
    },
    [Constant.SET_MODIFY_PLAN]({commit}, plan) {
      commit(Constant.SET_MODIFY_PLAN_MUTION, plan)
    },

    [Constant.REPLACE_PLANLIST]({commit}, planlist) {
      commit(Constant.REPLACE_PLANLIST_MUTATION, planlist)
    },

    [Constant.FALSE_PREMODIFY]({commit}) {
      commit(Constant.FALSE_PREMODIFY_MUTAION)
    }
  },
  modules: {},
  plugins: [createPersistedState()],
});
