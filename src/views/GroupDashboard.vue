<template>
  <div class="col">
    <p class="container mt-2 medium-text">
      {{ $route.params.name }} {{ $route.params.id }}
    </p>
    <div class="row">
      <DepenseDisplay :depenses="depenses" />

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
const depenses = ref([]);
const remboursement = ref([]);
const getDepense = async () => {
  try {
    const response = await fetch(`http://localhost:3000/depense/${groupeId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching expense:", error);
    throw error; // Re-throw the error to propagate it further if needed
  }
};

const getRemboursement = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/remboursement/${groupeId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching expense:", error);
    throw error; // Re-throw the error to propagate it further if needed
  }
};
onMounted(async () => {
  try {
    depenses.value = await getDepense();
    remboursement.value = await getRemboursement();
  } catch (error) {
    console.error("Error setting groups:", error);
  }
});
</script>
