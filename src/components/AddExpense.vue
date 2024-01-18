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
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Créer une dépense
          </h1>
          <button
            type="button"
            @click="resetValues"
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
            <div class="input-group mb-3 overflow-auto">
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
            @click="resetValues"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Fermer
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
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
import { onMounted, ref, inject, defineProps, defineEmits } from "vue";
const ipAd = inject("ip");
const membres = ref(Array);
const payingUser = ref("");
const montant = ref(0.0);
const titre = ref("");
const checkedNames = ref([]);
const resetValues = () => {
  checkedNames.value.values = membres.value.map((membre) => membre.utilisateur);
  titre.value = "";
  montant.value = 0.0;
};
const getMembres = async () => {
  try {
    const response = await fetch(`http://${ipAd}/membre/${props.idGroup}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching membres:", error);
  }
};
const emit = defineEmits(["posted"]);

async function postExpenses(payingUser, reimbursingUsers, montant, titre) {
  var iddepense = Number;
  try {
    const response = await fetch(`http://${ipAd}/depense`, {
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
    iddepense = await response.json();
  } catch (error) {
    console.error("Error posting expense:", error);
    throw error;
  }
  const part = 1 / checkedNames.value.length;
  checkedNames.value.forEach(async (rUser) => {
    try {
      await fetch(`http://${ipAd}/remboursement`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          iddepense: iddepense.id,
          idgroupe: props.idGroup,
          utilisateur: rUser,
          part: part,
        }),
      });
    } catch (error) {
      console.error("Error posting reimbusement:", error);
      throw error;
    }
  });
  emit("posted");
  resetValues();
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
