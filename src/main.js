// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import axios from "axios";
import VueAxios from "vue-axios";
import "bootstrap";
// Import component
import Loading from "vue-loading-overlay";
// Import stylesheet
import "vue-loading-overlay/dist/vue-loading.css";
import currencyFilter from "./filters/currency";
import VeeValidate from "vee-validate";
import VueI18n from "vue-i18n";

import App from "./App";
import router from "./router";
import "./bus";

Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component("Loading", Loading);
Vue.filter("currency", currencyFilter);
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "zhTW"
});
Vue.use(VeeValidate, {
  i18n,
  dictionary: {}
});

axios.defaults.withCredentials = true;
/* eslint-disable no-new */
new Vue({
  i18n,
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
        console.log("api check invalid");
        next({ path: "/login" });
      }
    });
  } else {
    console.log("no need to check");
    next();
  }
});
