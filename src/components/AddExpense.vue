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
          <div class="col-6">
            <div class="input-group mb-3">
              <span class="input-group-text" id="inputGroup-sizing-default"
                >Titre</span
              >
              <input type="text" class="form-control" v-model="titre" />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="inputGroup-sizing-default"
                >Montant</span
              >
              <input
                type="text"
                inputmode="numeric"
                class="form-control"
                v-model="montant"
                pattern="[0-9]"
              />
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text" id="payingUser">Payé par</span>
              <select class="form-select" id="payingUser" v-model="payingUser">
                <option
                  v-for:="membre in membres"
                  :key="membre.utilisateur"
                  :value="membre.utilisateur"
                >
                  {{ membre.utilisateur.split("@")[0] }}
                </option>
              </select>
            </div>
          </div>
          <div class="col-6">
            <div
              class="container d-flex border-bottom justify-content-between pt-2"
              v-for:="membre in membres"
              :key="membre.utilisateur"
            >
              <label for="membre.utilisateur">{{
                membre.utilisateur.split("@")[0]
              }}</label>
              <input
                type="checkbox"
                :id="membre.utilisateur"
                :value="membre.utilisateur"
                v-model="checkedNames"
              />
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
            @click="postExpenses(payingUser, checkedNames, montant, titre)"
          >
            Save changes
          </button>
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
import { onMounted, ref, inject, defineProps } from "vue";
const ipAd = inject("ip");
const membres = ref(Array);
const payingUser = ref("");
const montant = ref(0.0);
const titre = ref("");
const checkedNames = ref([]);

const getMembres = async () => {
  try {
    const response = await fetch(`http://${ipAd}:3000/membre/${props.idGroup}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching membres:", error);
  }
};

async function postExpenses(payingUser, reimbursingUsers, montant, titre) {
  try {
    await fetch(`http://${ipAd}:3000/depense`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        description: titre,
        montant: montant,
        utilisateur: payingUser,
        idgroupe: props.idGroup,
      }),
    });
  } catch (error) {
    console.error("Error login:", error);
    throw error;
  }
}

const props = defineProps({
  idGroup: Number,
});

onMounted(async () => {
  try {
    membres.value = await getMembres();
    checkedNames.value = membres.value.map((membre) => membre.utilisateur);
  } catch (error) {
    console.error("Error setting groups:", error);
  }
});
</script>
