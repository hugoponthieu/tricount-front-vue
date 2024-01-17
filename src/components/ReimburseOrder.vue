<template>
  <div class="col-md-5 h-75">
    <div class="card">
      <div class="d-flex card-header simple-text justify-content-between">
        Détails des remboursements
      </div>
      <div class="card-body overflow-auto">
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
            <AddExpense :idGroup="Number(route.params.id)" />
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";
import { useRoute } from "vue-router";
import AddExpense from "@/components/AddExpense.vue";
const props = defineProps(["reimburseOrders"]);
const route = useRoute();
</script>
