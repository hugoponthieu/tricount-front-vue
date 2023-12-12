<template>
  <div class="col">
    <p class="container mt-2 medium-text">
      {{ $route.params.name }} {{ $route.params.id }}
    </p>
    <div class="row">
      <div class="col-md-5">
        <div class="card">
          <div class="card-header simple-text">Liste des dépenses</div>
          <div class="card-body">hey</div>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-md-5">
          <div class="card">
            <div class="card-header simple-text">Liste des dépenses</div>
            <div class="card-body">hey</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const groupeId = route.params.id;
const depense = ref([]);
const getDepense = async () => {
  try {
    console.log("heyyyyyyy");
    const response = await fetch(`http://localhost:3000/depense/${groupeId}`);
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
    const data = await getDepense();
    depense.value = data;
    console.log(depense);
  } catch (error) {
    console.error("Error setting groups:", error);
  }
});
</script>
