<template>
  <div class="container vh-100">
    <div class="row h-50">
      <div class="col-5">
        <div class="logo">{{ route.params.name }}</div>
        <TotalDepenseUser :key="componentKey" />
        <AddUser @posted="forceRerender" />
      </div>
      <DepenseDisplay
        :idGroup="Number(route.params.id)"
        @rendering="forceRerender"
        :key="componentKey"
      />
    </div>
    <div class="row h-50">
      <ExpenseReimburse
        :idGroup="Number(route.params.id)"
        :key="componentKey"
        @fetch="forceRerender"
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
import AddUser from "@/components/AddUser.vue";
const route = useRoute();
const componentKey = ref(0);
const forceRerender = () => {
  componentKey.value += 1;
  console.log(componentKey.value);
};
</script>
