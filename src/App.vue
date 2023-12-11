<template>
  <div class="row min-vh-100">
    <div class="col-3 bg-black"><TheRightSideNav /></div>
    <div class="col-8"><router-view /></div>
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

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
