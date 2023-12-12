<template>
  <div class="row min-vh-100">
    <div class="col-3 bg-black"><TheRightSideNav /></div>
    <div class="col-9"><router-view /></div>
  </div>
</template>

<script>
import TheRightSideNav from "@/components/TheRightSideNav.vue";

export default {
  components: {
    TheRightSideNav,
  },
};
</script>
