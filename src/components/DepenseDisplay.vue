<template>
  <div class="col-md-5">
    <div class="card">
      <div class="card-header simple-text">Liste des dépenses</div>
      <div class="card-body">
        <div
          class="container d-flex border-bottom justify-content-between pt-2"
          v-for="depense in depenses"
          :key="depense.id"
        >
          <div class="row row-cols-1">
            <div class="col simple-text">
              {{ depense.description }}
            </div>
            <div class="col">{{ depense.utilisateur }}</div>
          </div>

          <p class="little-text">{{ depense.montant }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from "vue";
const depenses = ref([]);
const props = defineProps({
  idGroup: Number,
});
const getDepenses = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/depense/${props.idGroup}`,
      {
        method: "GET",
        credentials: "include",
      }
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
    depenses.value = await getDepenses();
  } catch (error) {
    console.error("Error setting groups:", error);
  }
});
</script>
