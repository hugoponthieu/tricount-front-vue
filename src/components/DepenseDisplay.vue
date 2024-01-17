<template>
  <div class="col-md-5">
    <div class="card mh-100">
      <div class="d-flex card-header simple-text justify-content-between">
        Liste des dépenses
        <AddExpense :idGroup="Number(idGroup)" @posted="fetchAddedData" />
      </div>
      <div class="card-body overflow-auto">
        <div
          class="container d-flex border-bottom justify-content-between pt-2"
          v-for="depense in depenses"
          :key="depense.id"
        >
          <div
            class="modal fade"
            :id="depense + String(depense.id)"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div
              class="modal-dialog modal-dialog-centered modal-dialog-scrollabl8 modal-lg"
            >
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    Edition d'une dépense
                  </h1>
                  <button
                    type="button"
                    @click="console.log('hey')"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">...</div>

                <div class="modal-footer">
                  <button
                    type="button"
                    @click="console.log('hey')"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Fermer
                  </button>
                  <button
                    type="button"
                    class="btn btn-primary"
                    data-bs-dismiss="modal"
                    v-on:click="postGroup()"
                  >
                    Créer
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div class="row flex align-content-center">
            <div class="col">
              <button
                type="button"
                @click="console.log('hey')"
                class="btn-close"
                data-bs-toggle="modal"
                :data-bs-target="dep"
              ></button>
            </div>
            <div class="col">
              <p class="simple-text">{{ depense.description }}</p>
              {{ depense.utilisateur }}
            </div>
          </div>

          <p class="little-text">{{ depense.montant }} €</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref, inject, defineEmits } from "vue";
import AddExpense from "./AddExpense.vue";
const ipAd = inject("ip");
const depenses = ref([]);
const props = defineProps({
  idGroup: Number,
});
const emit = defineEmits(["rendering"]);

async function fetchAddedData() {
  emit("rendering");
  try {
    depenses.value = await getDepenses();
  } catch (error) {
    console.error("Error setting groups:", error);
  }
}

const getDepenses = async () => {
  try {
    const response = await fetch(
      `http://${ipAd}:3000/depense/${props.idGroup}`,
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
    console.log(depenses.value);
  } catch (error) {
    console.error("Error setting groups:", error);
  }
});
</script>
