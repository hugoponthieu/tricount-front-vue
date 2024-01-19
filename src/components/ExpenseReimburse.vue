<template>
  <BalancesDisplay :balances="balances" />
  <ReimburseOrder :reimburseOrders="reimburseOrders" @posted="emit('fetch')" />
</template>

<script setup>
import ReimburseOrder from "./ReimburseOrder.vue";
import BalancesDisplay from "./BalancesDisplay.vue";

import { defineProps, onMounted, ref, inject, defineEmits } from "vue";
const ipAd = inject("ip");
const remboursements = ref([]);
const membres = ref([]);
const balances = ref({});
const depenses = ref([]);
const reimburseOrders = ref([]);
const emit = defineEmits(["fetch"]);
const props = defineProps({
  idGroup: Number,
});

const getRemboursements = async () => {
  try {
    const response = await fetch(
      `https://${ipAd}/remboursement/detail/${props.idGroup}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching groups:", error);
  }
};

const getMembres = async () => {
  try {
    const response = await fetch(`https://${ipAd}/membre/${props.idGroup}`, {
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
const getDepenses = async () => {
  try {
    const response = await fetch(`https://${ipAd}/depense/${props.idGroup}`, {
      method: "GET",
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching expense:", error);
    throw error;
  }
};

const computeBalances = () => {
  let balancesMap = new Map();
  let amount;
  membres.value.forEach(function (membre) {
    balancesMap.set(membre.utilisateur, 0);
  });
  remboursements.value.forEach(function (remboursement) {
    amount = -balancesMap.get(remboursement.emprunteur);
    balancesMap.set(remboursement.emprunteur, -(amount += remboursement.total));
  });

  amount = 0;
  depenses.value.forEach(function (depense) {
    amount = balancesMap.get(depense.utilisateur);
    balancesMap.set(depense.utilisateur, (amount += depense.montant));
  });

  return balancesMap;
};
const computeReimbursements = () => {
  let payingMap = new Map();
  let gettingMap = new Map();
  const remboursementOrder = new Array();
  membres.value.forEach(function (membre) {
    let amount = balances.value.get(membre.utilisateur);
    if (amount < 0) {
      payingMap.set(membre.utilisateur, amount);
    } else {
      gettingMap.set(membre.utilisateur, amount);
    }
  });
  gettingMap = new Map([...gettingMap.entries()].sort((a, b) => b[1] - a[1]));

  for (let getRem of gettingMap.entries()) {
    let moneyToGet = getRem[1];
    let it = payingMap.entries();
    let rem = null;
    const ntm = () => {
      const temp = it.next();
      rem = temp.value;
      return !temp.done;
    };
    while (ntm() && moneyToGet > 0.001) {
      if (moneyToGet + rem[1] >= 0) {
        moneyToGet = moneyToGet + rem[1];
        remboursementOrder.push({
          paying: getRem[0],
          getting: rem[0],
          amount: -rem[1],
        });
        payingMap.delete(rem[0]);
      } else {
        payingMap.set(rem[0], moneyToGet + rem[1]);
        remboursementOrder.push({
          paying: getRem[0],
          getting: rem[0],
          amount: moneyToGet,
        });
        moneyToGet = 0;
      }
    }
  }
  return remboursementOrder;
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
