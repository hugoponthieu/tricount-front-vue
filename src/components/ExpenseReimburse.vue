<template>
  <DepenseDisplay
    :idGroup="Number(route.params.id)"
    @rendering="forceRerender"
    :key="componentKey"
  />
  <RemboursementDisplay
    :idGroup="Number($route.params.id)"
    :key="componentKey"
  />
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import DepenseDisplay from "@/components/DepenseDisplay.vue";
import RemboursementDisplay from "@/components/RemboursementDisplay.vue";
const route = useRoute();
const componentKey = ref(0);
const forceRerender = () => {
  componentKey.value += 1;
  console.log(componentKey.value);
};
</script>
