<template>
  <div class="d-flex min-vh-100 justify-content-md-start">
    <div class="card container-fluid">
      <div class="col">
        <p class="logo">YourCount</p>
        <nav>
          <router-link class="simple-text" to="/">Home</router-link> |
          <router-link class="simple-text" to="/about">About</router-link>
        </nav>

        <router-link
          :v-for="groupe in goupes"
          :key="groupe.id"
          :to="{ name: 'groupe.show' }"
        >
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {},
  computed: {},
};
</script>
