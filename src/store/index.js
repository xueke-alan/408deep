// 创建store
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

// 创建actions响应动作
const actions = {
  loadData(context, value) {
    context.commit("LOAD_DATA", value);
  },
};

// 创建mutilations操作数据
const mutations = {
  LOAD_DATA(state, value) {
    state.AllData = value;
  },
};
const getters = {
  subjects(state) {
    console.log(state.AllData);
    let s = [];
    for (let i = 0; i < state.AllData.length; i++) {
      s.push(state.AllData[i].name);
    }
    return s;
  },
  teachers(state) {
    try {
      let x = state.choose;
      let old = state.AllData[x[0]].teachers;
      let s = [];
      for (let i = 0; i < old.length; i++) s.push(old[i].name);
      return s;
    } catch {
      return [];
    }
  },
  lessons(state) {
    try {
      let x = state.choose;
      let old = state.AllData[x[0]].teachers[x[1]].courses;
      let s = [];
      for (let i = 0; i < old.length; i++) s.push(old[i].name);
      return s;
    } catch {
      return [];
    }
  },
  chapters(state) {
    try {
      let x = state.choose;
      let old = state.AllData[x[0]].teachers[x[1]].courses[x[2]].chapters;
      let s = [];
      for (let i = 0; i < old.length; i++) s.push(old[i].name);
      return s;
    } catch {
      return [];
    }
  },
};
// 创建state
const state = {
  choose: [],
  AllData:[]
};

export default new Vuex.Store({
  actions,
  mutations,
  getters,
  state,
});
