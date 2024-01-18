import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap";

let app = createApp(App);
const initApp = async () => {
  app.provide("ip", process.env.ADRESS);
};
await initApp();
app.use(router);

app.mount("#app");
