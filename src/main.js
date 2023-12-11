import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";

createApp(App).use(router).mount("#app");
