<template>
  <div class="col-md-5">
    <div class="card">
      <div class="card-header simple-text">Remboursements</div>
      <div class="card-body">
        <div
          class="container d-flex border-bottom justify-content-between pt-2"
          v-for="remboursement in remboursements"
          :key="remboursement.id"
        >
          <div class="col little-text">
            {{ remboursement.emprunteur.split("@")[0] }}
          </div>
          <div class="col little-text">doit</div>
          <div class="col simple-text">{{ remboursement.total }}</div>
          <div class="col little-text">à</div>
          <div class="col little-text">
            {{ remboursement.utilisateur.split("@")[0] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from "vue";
const remboursements = ref([]);
const props = defineProps({
  idGroup: Number,
});

const getRemboursements = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/remboursement/detail/${props.idGroup}`
    );
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
