<template>
  <div class="col">
    <div class="row">
      <div class="container medium-text">Your total</div>
      <div class="col d-flex justify-content-center logo">
        {{ total.toFixed(2) }} €
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue";
import { useRoute } from "vue-router";
const depenses = ref([]);
const route = useRoute();
const ipAd = inject("ip");
const total = ref(0);
const getDepenses = async () => {
  try {
    const response = await fetch(`http://${ipAd}/depense/${route.params.id}`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching expense:", error);
    throw error;
  }
};
onMounted(async () => {
  try {
    depenses.value = await getDepenses();
    depenses.value.forEach((depense) => {
      if (depense.description != "Remboursment") {
        total.value += depense.montant;
      }
    });
  } catch (error) {
    console.error("Error setting:", error);
  }
});
</script>
