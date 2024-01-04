import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import BootstrapVue from "bootstrap-vue";
import "./assets/main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import "bootstrap";

let app = createApp(App); //.use(router).use(BootstrapVue).mount("#app");
// const getIPAddress = async () => {
//   try {
//     const response = await fetch("https://api64.ipify.org?format=json");
//     const data = await response.json();
//     return data.ip;
//   } catch (error) {
//     console.error("Erreur lors de la récupération de l'adresse IP :", error);
//     return "localhost"; // Utilisez une valeur par défaut en cas d'erreur
//   }
// };

// Utilisez une fonction asynchrone pour récupérer l'adresse IP avant de monter l'application
const initApp = async () => {
  // const ip = await getIPAddress();
  app.provide("ip", "localhost");
};
await initApp();
app.use(router);

app.mount("#app");
