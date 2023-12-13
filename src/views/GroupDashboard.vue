<template>
  <div class="col">
    <p class="container mt-2 medium-text">
      {{ $route.params.name }} {{ $route.params.id }}
    </p>
    <div class="row">
      <DepenseDisplay :depenses="depenses" />
      <div class="col-md-5"></div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import DepenseDisplay from "@/components/DepenseDisplay.vue";

const route = useRoute();
const groupeId = route.params.id;
const depenses = ref([]);
const remboursements = ref([]);
const membres = ref([]);
const getDepenses = async () => {
  try {
    const response = await fetch(`http://localhost:3000/depense/${groupeId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching expense:", error);
    throw error; // Re-throw the error to propagate it further if needed
  }
};

const getRemboursements = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/remboursement/ofgroupe/${groupeId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching reimbursement:", error);
    throw error;
  }
};

const getMembres = async () => {
  try {
    const response = await fetch(`http://localhost:3000/membre/${groupeId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching members:", error);
    throw error;
  }
};

// const computeUserReimburses = computed(() => {
//   let sommePart;
//   let listeRemboursment = [];
//   for (var d of depenses) {
//     for (var r of remboursements) {
//       if (r.iddepense == d.id) {
//         sommePart += r.part;
//       }
//     }
//     for (var re of remboursements) {
//       if (re.iddepense == d.id) {
//         listeRemboursment.push(
//           new Map([
//             ["userDepense", d.utilisateur],
//             ["userRembourse", re.utilisateur],
//             ["montant", d.montant * (re.par / sommePart)],
//           ])
//         );
//       }
//     }
//   }
//   let sommeTot = 0;
//   let factRemb = [];
//   for (var mb1 of membres) {
//     for (var mb2 of membres) {
//       for (var lr of listeRemboursment) {
//         if (
//           (mb1.utilisateur == lr.userDepense) &
//           (mb2.utilisateur == lr.userRembourse)
//         ) {
//           sommeTot += lr.montant;
//         }
//       }
//       factRemb.push(
//         new Map([
//           ["userDepense", mb1.utilisateur],
//           ["userRembourse", mb2.utilisateur],
//           ["montant", sommeTot],
//         ])
//       );
//     }
//   }
//   return factRemb;
// });

onMounted(async () => {
  try {
    membres.value = await getMembres();
    depenses.value = await getDepenses();
    remboursements.value = await getRemboursements();
  } catch (error) {
    console.error("Error setting groups:", error);
  }
});
</script>
