<template>
  <div
    class="modal fade"
    id="reimburseModal"
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
            Effectuer le remboursement ?
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-3 simple-text">{{ selectedROrder.getting }}</div>
            <div class="col-2 simple-text">doit à</div>
            <div class="col-3 simple-text">{{ selectedROrder.paying }}</div>
            <div class="col-3 simple-text">{{ selectedROrder.amount }}</div>
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
            @click="
              postReim(crudROrder.getting, crudROrder.paying, crudROrder.amount)
            "
          >
            Rembourser
          </button>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-5">
    <div class="card h-75">
      <div class="d-flex card-header simple-text justify-content-between">
        Détails des remboursements
      </div>
      <div class="card-body overflow-scroll">
        <div
          class="row justify-content-around align-content-center pt-2 border-bottom"
          v-for="rOrder in props.reimburseOrders"
          :key="rOrder.paying"
        >
          <div class="col-6">
            <div class="row simple-text">
              {{ rOrder.getting.split("@")[0] }}
            </div>
            <div class="row pt-1">doit à</div>
            <div class="row simple-text pb-1">
              {{ rOrder.paying.split("@")[0] }}
            </div>
          </div>

          <div
            class="col-5 d-flex little-text justify-content-end align-items-center"
          >
            {{ rOrder.amount.toFixed(2) }}
          </div>
          <footer class="bg-body-secondary d-flex justify-content-center">
            <button
              class="btn flex w-100"
              data-bs-toggle="modal"
              data-bs-target="#reimburseModal"
              @click="selectROrder(rOrder)"
            >
              Rembourser
            </button>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, ref, inject, defineEmits } from "vue";
import { useRoute } from "vue-router";
const ipAd = inject("ip");
const emit = defineEmits(["posted"]);
const route = useRoute();
const props = defineProps(["reimburseOrders"]);
const selectedROrder = ref([]);
const crudROrder = ref([]);
const selectROrder = (rOrder) => {
  crudROrder.value = rOrder;
  const getting = rOrder.getting.split("@")[0];
  const paying = rOrder.paying.split("@")[0];
  selectedROrder.value.getting = getting;
  selectedROrder.value.paying = paying;
  selectedROrder.value.amount = rOrder.amount.toFixed(2);
};

async function postReim(payingUser, reimbursingUsers, montant) {
  let iddepense;
  const titre = "Remboursement";
  try {
    const response = await fetch(`https://${ipAd}/depense`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        description: titre,
        montant: montant,
        utilisateur: payingUser,
        idgroupe: route.params.id,
      }),
    });
    iddepense = await response.json();
  } catch (error) {
    console.error("Error posting expense:", error);
    throw error;
  }
  const part = 1;

  try {
    await fetch(`https://${ipAd}/remboursement`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        iddepense: iddepense.id,
        idgroupe: route.params.id,
        utilisateur: reimbursingUsers,
        part: part,
      }),
    });
  } catch (error) {
    console.error("Error posting reimbusement:", error);
    throw error;
  }
  emit("posted");
}
</script>
