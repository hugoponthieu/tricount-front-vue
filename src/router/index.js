/* eslint-disable no-unused-vars */
import { createRouter, createWebHistory, beforeEnter } from "vue-router";
import { store } from "@/store";
import { ref } from "vue";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/",
    name: "app",
    component: () => import("@/views/TricountView.vue"),
    async beforeEnter(to, from) {
      if (await isAuth()) {
        return true;
      } else {
        return "/login";
      }
    },
    children: [
      {
        path: "groupe/:id/:name",
        name: "group",
        component: () => import("@/views/GroupDashboard.vue"),
      },
      {
        path: "superHome",
        name: "home",
        component: HomeView,
      },
    ],
  },
];
async function isAuth() {
  try {
    const response = await fetch(`http://localhost:3000/user/auth`, {
      method: "GET",
      credentials: "include",
    });
    console.log(response.status);
    const isAuth = (await response.status) == 200;
    console.log(isAuth);
    return isAuth;
  } catch (error) {
    console.error("Error getting auth:", error);
    // Re-throw the error to propagate it further if needed
    return false;
  }
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
