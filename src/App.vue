<template>
  <router-view :key="login" v-if="!isAuth" />
  <div class="row min-vh-100" v-if="isAuth">
    <div class="col-3 bg-black"><TheRightSideNav /></div>
    <div class="col-9"><router-view :key="route.path" /></div>
  </div>
</template>

<script setup>
import TheRightSideNav from "@/components/TheRightSideNav.vue";
import { useRoute } from "vue-router";
import { store } from "./store";
let isAuth = store;
const route = useRoute();
</script>
