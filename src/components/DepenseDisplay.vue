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
import { defineProps } from "vue";
defineProps({
  depenses: Array,
});
</script>
