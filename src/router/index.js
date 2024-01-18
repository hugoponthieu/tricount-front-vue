/* eslint-disable no-unused-vars */
import { createRouter, createWebHistory } from "vue-router";
import { inject } from "vue";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    component: () => import("@/views/SignUpView.vue"),
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
  const ipAd = inject("ip");
  try {
    const response = await fetch(`http://${ipAd}/user/auth`, {
      method: "GET",
      credentials: "include",
    });
    const isAuth = (await response.status) == 200;
    return isAuth;
  } catch (error) {
    console.error("Error getting auth:", error);
    return false;
  }
}

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
