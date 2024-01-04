<template>
  <div
    class="modal fade"
    id="expenseModal"
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
        <div class="modal-body row">
          <div class="col-6"></div>
          <div class="col-6">
            <div
              class="container d-flex border-bottom justify-content-between pt-2"
              v-for:="membre in membres"
              :key="membre.utilisateur"
            >
              {{ membre.utilisateur }}
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Fermer
          </button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>
  <button
    class="col-3 btn"
    data-bs-toggle="modal"
    data-bs-target="#expenseModal"
  >
    Ajouter
  </button>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";
const ipAd = inject("ip");
const membres = ref([]);
const groupeID = 1;
const getMembres = async () => {
  try {
    const response = await fetch(`http://${ipAd}:3000/membre/${groupeID}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching membres:", error);
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
