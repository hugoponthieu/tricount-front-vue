<template>
  <div class="container flex-column">
    <p class="container mt-2 medium-text">
      {{ $route.params.name }} {{ $route.params.id }}
    </p>
    <div class="row mb-5"><TotalDepenseUser /></div>
    <div class="row">
      <DepenseDisplay :idGroup="Number(route.params.id)" />
      <RemboursementDisplay :idGroup="Number($route.params.id)" />
      <div class="col-md-5"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";
import { useRoute } from "vue-router";
import DepenseDisplay from "@/components/DepenseDisplay.vue";
import RemboursementDisplay from "@/components/RemboursementDisplay.vue";
import TotalDepenseUser from "@/components/TotalDepenseUser.vue";
const ipAd = inject("ip");

const route = useRoute();
const groupeId = route.params.id;

const membres = ref([]);
const getMembres = async () => {
  try {
    const response = await fetch(`http://${ipAd}:3000/membre/${groupeId}`);
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
