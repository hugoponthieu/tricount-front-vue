<template>
  <div
    class="modal fade"
    id="depense"
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
            Voulez vous vraiment supprimer la dépense ?
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row d-flex justify-content-around">
            <div class="col">
              <p class="simple-text">{{ selectedDepenseObj.description }}</p>
              {{ selectedDepenseObj.utilisateur }}
            </div>
            <div class="little-text col d-flex justify-content-end">
              {{ selectedDepenseObj.montant }} €
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
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            v-on:click="deleteDepenses()"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  </div>
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
          <div class="row flex align-content-center">
            <div class="col">
              <button
                type="button"
                @click="selectDepenseID(depense.id)"
                class="btn-close"
                data-bs-toggle="modal"
                data-bs-target="#depense"
              ></button>
            </div>
            <div class="col">
              <p class="simple-text">{{ depense.description }}</p>
              {{ depense.utilisateur }}
            </div>
          </div>

          <p class="little-text">{{ depense.montant.toFixed(2) }} €</p>
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
const selectedDepenseID = ref(0);
const selectedDepenseObj = ref({});
const selectDepenseID = async (depID) => {
  selectedDepenseID.value = await depID;
  for (let depense of depenses.value) {
    if (depense.id == depID) {
      selectedDepenseObj.value = depense;
      console.log(selectedDepenseObj.value);
      return;
    }
  }
};

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

const deleteDepenses = async () => {
  try {
    await fetch(`http://${ipAd}:3000/depense/${selectedDepenseID.value}`, {
      method: "DELETE",
      credentials: "include",
    });
    emit("rendering");
  } catch (error) {
    console.error("Error fetching expense:", error);
    throw error;
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
