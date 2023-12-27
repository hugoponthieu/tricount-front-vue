<template>
  <div class="d-flex min-vh-100 justify-content-md-start">
    <div class="card container-fluid">
      <div class="col">
        <p class="logo">YourCount</p>
        <nav>
          <div class="row">
            <router-link v-bind:to="{ name: 'home' }">home</router-link>
            <router-link
              v-for="groupe in groups"
              :key="groupe.id"
              v-bind:to="{
                name: 'group',
                params: { id: groupe.id, name: groupe.nom },
              }"
            >
              <p class="medium-text card">{{ groupe.nom }}</p>
            </router-link>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const groups = ref([]);

const getGroups = async () => {
  try {
    const response = await fetch("http://localhost:3000/groupe");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching groups:", error);
  }
};

onMounted(async () => {
  try {
    groups.value = await getGroups();
  } catch (error) {
    console.error("Error setting groups:", error);
  }
});
</script>
