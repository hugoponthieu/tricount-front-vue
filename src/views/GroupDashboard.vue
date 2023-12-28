<template>
  <div class="col">
    <p class="container mt-2 medium-text">
      {{ $route.params.name }} {{ $route.params.id }}
    </p>
    <div class="row">
      <DepenseDisplay :idGroup="$route.params.id" />
      <div class="col-md-5"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import DepenseDisplay from "@/components/DepenseDisplay.vue";

const route = useRoute();
const groupeId = route.params.id;

const membres = ref([]);
const getMembres = async () => {
  try {
    const response = await fetch(`http://localhost:3000/membre/${groupeId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching members:", error);
    throw error;
  }
};

onMounted(async () => {
  try {
    membres.value = await getMembres();
  } catch (error) {
    console.error("Error setting groups:", error);
  }
});
</script>
