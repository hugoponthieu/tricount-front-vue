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
const reimburseOrders = ref([]);
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
    amount = -balancesMap.get(depense.utilisateur);
    balancesMap.set(depense.utilisateur, (amount += depense.montant));
  });

  return balancesMap;
};
const computeReimbursements = () => {
  var payingMap = new Map();
  var gettingMap = new Map();
  const remboursementOrder = new Array();
  membres.value.forEach(function (membre) {
    var amount = balances.value.get(membre.utilisateur);
    if (amount < 0) {
      payingMap.set(membre.utilisateur, amount);
    } else {
      gettingMap.set(membre.utilisateur, amount);
    }
  });
  gettingMap = new Map([...gettingMap.entries()].sort((a, b) => b[1] - a[1]));
  // console.log(gettingMap);
  // console.log(payingMap);
  // var splittedRem = 0;
  // var splittedRemUser = "";
  // for (let getRem of gettingMap.entries()) {
  //   let moneyToGet = getRem[1];
  //   do {
  //     // console.logbreak;(payingMap);
  //     for (let rem of payingMap.entries()) {
  //       console.log(rem[0], moneyToGet, rem[1], getRem[0]);
  //       if (moneyToGet + rem[1] >= 0) {
  //         moneyToGet = moneyToGet + rem[1];
  //         remboursementOrder.push({
  //           paying: rem[0],
  //           getting: getRem[0],
  //           amount: -rem[1],
  //         });
  //         // console.log(remboursementOrder);
  //         payingMap.delete(rem[0]);
  //       } else {
  //         payingMap.set(rem[0], moneyToGet + rem[1]);
  //         remboursementOrder.push({
  //           paying: rem[0],
  //           getting: getRem[0],
  //           amount: moneyToGet,
  //         });
  //         break;
  //       }
  //     }
  //     console.log(moneyToGet > 0.001);
  //     console.log(moneyToGet);
  //     break;
  //   } while (moneyToGet > 0.001);
  // }
  for (let getRem of gettingMap.entries()) {
    let moneyToGet = getRem[1];

    // console.logbreak;(payingMap);
    // for (let rem of payingMap.entries())
    let it = payingMap.entries();
    let rem = null;
    const ntm = () => {
      const temp = it.next();
      rem = temp.value;
      return !temp.done;
    };
    while (ntm() && moneyToGet > 0.001) {
      console.log(moneyToGet, rem);
      if (moneyToGet + rem[1] >= 0) {
        moneyToGet = moneyToGet + rem[1];
        remboursementOrder.push({
          paying: rem[0],
          getting: getRem[0],
          amount: -rem[1],
        });
        // console.log(remboursementOrder);
        payingMap.delete(rem[0]);
      } else {
        payingMap.set(rem[0], moneyToGet + rem[1]);
        remboursementOrder.push({
          paying: rem[0],
          getting: getRem[0],
          amount: moneyToGet,
        });
        moneyToGet = 0;
      }
    }
  }
  console.log(remboursementOrder);
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
