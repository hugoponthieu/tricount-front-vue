<template>
  <div class="d-flex min-vh-100 justify-content-md-start">
    <div class="card container-fluid justify-content-center">
      <p class="logo">YourCount</p>
      <AddGroupe @posted="forceRerender" />
      <div
        class="col d-flex justify-content-center"
        @posted="fetchAddedData"
        :key="componentKey"
      >
        <nav>
          <router-link
            v-for="groupe in groups"
            :key="groupe.id"
            v-bind:to="{
              name: 'group',
              params: { id: groupe.id, name: groupe.nom },
            }"
          >
            <div class="card text-center medium-text mt-2">
              {{ groupe.nom }}
            </div>
          </router-link>
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from "vue";
import AddGroupe from "./AddGroupe.vue";
const ipAd = inject("ip");
const groups = ref([]);
const componentKey = ref(0);

const forceRerender = async () => {
  componentKey.value += 1;
  groups.value = await getGroups();
};

const getGroups = async () => {
  try {
    const response = await fetch(`http://${ipAd}/groupe`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching groups:", error);
  }
};

onMounted(async () => {
  try {
    groups.value = await getGroups();
  } catch (error) {
    console.error("Error setting groups:", error);
  }
});
</script>
