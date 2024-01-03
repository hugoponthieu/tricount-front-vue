import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import BootstrapVue from "bootstrap-vue";
import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap";

let app = createApp(App); //.use(router).use(BootstrapVue).mount("#app");
app.use(router);
// app.use(BootstrapVue);
app.mount("#app");
