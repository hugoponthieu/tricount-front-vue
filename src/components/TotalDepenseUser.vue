<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollabl8 modal-lg"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel"></h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">hey.</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
  <div class="col">
    <div class="row">
      <div class="container medium-text">Your total</div>
      <div class="d-flex justify-content-center logo">
        {{ total }} €
        <!-- <button
          class="col-3 btn"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Voir le detail
        </button> -->
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
    const response = await fetch(
      `http://${ipAd}:3000/depense/${route.params.id}`,
      {
        method: "GET",
        credentials: "include",
      }
    );
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
      total.value += depense.montant;
    });
  } catch (error) {
    console.error("Error setting:", error);
  }
});
</script>
