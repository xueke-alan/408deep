import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import router from "./router";

import store from "./store";

Vue.config.productionTip = false;

Vue.use(VueRouter);


const vm = new Vue({
  el: "#app",
  render: (h) => h(App),
  store,
  beforeCreate() {
    // 安装全局事件总线
    Vue.prototype.$bus = this;
  },
  router: router,
});
console.log(vm);
