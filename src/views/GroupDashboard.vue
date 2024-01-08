<template>
  <div class="container flex-column h-100">
    <div class="row mb-5 mh-50 pt-5">
      <div class="col-5">
        <div class="logo pb-3">{{ route.params.name }}</div>
        <TotalDepenseUser />
      </div>
      <DepenseDisplay
        :idGroup="Number(route.params.id)"
        @rendering="forceRerender"
        :key="componentKey"
      />
    </div>
    <div class="row mh-50">
      <ExpenseReimburse
        :idGroup="Number(route.params.id)"
        :key="componentKey"
      />
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import DepenseDisplay from "@/components/DepenseDisplay.vue";
import ExpenseReimburse from "@/components/ExpenseReimburse.vue";
import TotalDepenseUser from "@/components/TotalDepenseUser.vue";
const route = useRoute();
const componentKey = ref(0);
const forceRerender = () => {
  componentKey.value += 1;
  console.log(componentKey.value);
};
</script>
