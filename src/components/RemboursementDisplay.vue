<template>
  <div class="col-md-5">
    <div class="card">
      <div class="card-header simple-text">Liste des dépenses</div>
      <div class="card-body">
        <div
          class="container d-flex border-bottom justify-content-between pt-2"
          v-for="depense in remboursements"
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
import { onMounted, ref } from "vue";

const remboursements = ref([]);

const getRemboursements = async () => {
  try {
    const response = await fetch("http://localhost:3000/detail/");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching groups:", error);
  }
};

onMounted(async () => {
  try {
    remboursements.value = await getRemboursements();
  } catch (error) {
    console.error("Error setting groups:", error);
  }
});
</script>
