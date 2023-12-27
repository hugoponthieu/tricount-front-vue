<template>
  <router-link :to="{ name: 'app' }" class="btn">app</router-link>
  <router-link :to="{ name: 'login' }" class="btn"> login</router-link>
  <router-view />
</template>
