<template>
  <BalancesDisplay :balances="balances" />
  <ReimburseOrder />
</template>

<script setup>
import ReimburseOrder from "./ReimburseOrder.vue";
import BalancesDisplay from "./BalancesDisplay.vue";

import { defineProps, onMounted, ref, inject } from "vue";
const ipAd = inject("ip");
const remboursements = ref([]);
const membres = ref([]);
const balances = ref({});
const depenses = ref([]);
const reimburseOrders = ref({});
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
    throw error;
  }
};

const computeBalances = () => {
  var balancesMap = new Map();
  var amount;
  membres.value.forEach(function (membre) {
    balancesMap.set(membre.utilisateur, 0);
  });
  remboursements.value.forEach(function (remboursement) {
    amount = balancesMap.get(remboursement.emprunteur);
    balancesMap.set(remboursement.emprunteur, (amount += remboursement.total));
  });

  amount = 0;
  depenses.value.forEach(function (depense) {
    amount = balancesMap.get(depense.utilisateur);
    balancesMap.set(depense.utilisateur, (amount += -depense.montant));
  });

  return balancesMap;
};
const computeReimbursements = () => {
  var payingMap = new Map();
  var gettingMap = new Map();
  membres.value.forEach(function (membre) {
    var amount = balances.value.get(membre.utilisateur);
    if (amount < 0) {
      payingMap.set(membre.utilisateur, -amount);
    } else {
      gettingMap.set(membre.utilisateur, amount);
    }
  });

  payingMap = new Map([...payingMap.entries()].sort());
  gettingMap = new Map([...gettingMap.entries()].sort());
  console.log(payingMap);
  console.log(gettingMap);
};
onMounted(async () => {
  try {
    remboursements.value = await getRemboursements();
    membres.value = await getMembres();
    depenses.value = await getDepenses();
    balances.value = computeBalances();
    reimburseOrders.value = computeReimbursements();
  } catch (error) {
    console.error("Error setting groups:", error);
  }
});
</script>
