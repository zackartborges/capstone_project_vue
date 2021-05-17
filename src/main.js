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

// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue);
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin);
// Data table for vue with vanilla HTML structure

axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.baseURL = process.env.NODE_ENV === "development" ? "http://localhost:3000" : "/";

var jwt = localStorage.getItem("jwt");
if (jwt) {
  axios.defaults.headers.common["Authorization"] = "Bearer " + jwt;
}
// my chart variables
// var stars = [135850, 52122, 148825, 16939, 9763];
// var frameworks = ["React", "Angular", "Vue", "Hyperapp", "Omi"];
// var ctx = document.getElementById("myChart");
// var myChart = new Chart(ctx, {
//   type: "pie",
//   data: {    labels: frameworks,
//     datasets: [{
//        label: "POPULAR JS FRAMES",
//        data: stars
//     }]
// },
// });

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
