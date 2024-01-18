<template>
  <div class="row min-vh-100">
    <div class="col-3"><TheRightSideNav /></div>
    <div class="col-9"><router-view :key="route.path" /></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import TheRightSideNav from "@/components/TheRightSideNav.vue";
import { useRoute, useRouter } from "vue-router";
const route = useRoute();
const router = useRouter();
onMounted(() => {
  router.push({ name: "home" });
});
</script>
