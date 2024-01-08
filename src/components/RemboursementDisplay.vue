<template>
  <div class="col-md-5">
    <div class="card h-75">
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
          <div class="col simple-text">
            {{ remboursement.total.toFixed(2) }}
          </div>
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
import { defineProps, onMounted, ref, inject } from "vue";
const ipAd = inject("ip");
const remboursements = ref([]);
const membres = ref([]);
const balances = ref({});
const depenses = ref([]);
const props = defineProps({
  idGroup: Number,
});

const getRemboursements = async () => {
  try {
    const response = await fetch(
      `http://${ipAd}:3000/remboursement/detail/${props.idGroup}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching groups:", error);
  }
};

const getMembres = async () => {
  try {
    const response = await fetch(`http://${ipAd}:3000/membre/${props.idGroup}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching membres:", error);
  }
};
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
    throw error; // Re-throw the error to propagate it further if needed
  }
};

const computeBalances = () => {
  var balancesMap = new Map();
  var amount;
  // for (var membre in membres.value) {
  //   balancesMap.set(membre.utilisateur, 0);
  // }
  membres.value.forEach(function (membre) {
    balancesMap.set(membre.utilisateur, 0);
  });
  remboursements.value.forEach(function (remboursement) {
    amount = balancesMap.get(remboursement.emprunteur);
    balancesMap.set(remboursement.emprunteur, (amount += remboursement.total));
  });
  console.log(balancesMap);
  amount = 0;
  depenses.value.forEach(function (depense) {
    amount = balancesMap.get(depense.utilisateur);
    balancesMap.set(depense.utilisateur, (amount += -depense.montant));
  });
  console.log(balancesMap);
  return balancesMap;
};
onMounted(async () => {
  try {
    remboursements.value = await getRemboursements();
    membres.value = await getMembres();
    depenses.value = await getDepenses();
    balances.value = computeBalances();
    console.log(balances.value);
  } catch (error) {
    console.error("Error setting groups:", error);
  }
});
</script>
