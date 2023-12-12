<template>
  <div>
    <router-link
      v-for="groupe in groups"
      :script="console.log(groupe)"
      :key="groupe.id"
      :to="{ name: 'groupe.show', params: { id: groupe.id } }"
    >
      {{ groupe.nom }}
    </router-link>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";

const groups = ref([]);

const getGroups = async () => {
  try {
    console.log("promise");
    const response = await fetch("http://localhost:3000/groupe");
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw error; // Re-throw the error to propagate it further if needed
  }
};

onMounted(async () => {
  try {
    const data = await getGroups();
    groups.value = data;
  } catch (error) {
    console.error("Error setting groups:", error);
  }
});
</script>
