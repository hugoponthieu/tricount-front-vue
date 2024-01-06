<template>
  <div class="row min-vh-100">
    <div class="col-3"><TheRightSideNav /></div>
    <div class="col-9"><router-view :key="route.path" /></div>
  </div>
</template>

<script setup>
import TheRightSideNav from "@/components/TheRightSideNav.vue";
import { useRoute } from "vue-router";
const route = useRoute();
</script>
