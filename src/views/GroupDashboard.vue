<template>
  <div class="container flex-column">
    <p class="container mt-2 medium-text">
      {{ $route.params.name }} {{ $route.params.id }}
    </p>
    <div class="row mb-5"><TotalDepenseUser /></div>
    <div class="row h-100">
      <ExpenseReimburse />
      <div class="col-md-5"></div>
    </div>
  </div>
</template>

<script setup>
import { onUpdated } from "vue";
import ExpenseReimburse from "@/components/ExpenseReimburse.vue";
import TotalDepenseUser from "@/components/TotalDepenseUser.vue";

onUpdated(() => {
  console.log("Updated");
});
</script>
