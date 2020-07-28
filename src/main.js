// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import App from "./App";
import router from "./router";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);

axios.defaults.withCredentials = true;
/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});

router.beforeEach((to, from, next) => {
  console.log(to, from);
  if (to.meta.requiresAuth) {
    const api = "https://vue-course-api.herokuapp.com/api/user/check";
    console.log(process.env.APIPATH, process.env.CUSTOMPATH);

    axios.post(api).then(response => {
      console.log("===" + response.data);
      if (response.data.success) {
        console.log("api check valid");
        next();
      } else {
        next({ path: "/login" });
      }
    });
  } else {
    next();
  }
});
