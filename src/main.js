import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
// import ApexCharts from "apexcharts";
import "@/plugins/apexcharts";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
// import { template } from "lodash";

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
// Data table for vue with vanilla HTML structure

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";
// axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://ourpack.herokuapp.com" : "/";

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}

Vue.config.productionTip = false;
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
