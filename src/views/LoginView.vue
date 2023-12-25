<template>
  <div
    class="container min-vh-100 d-flex justify-content-center align-items-center"
  >
    <div class="card">
      <div class="card-header d-flex justify-content-center">
        <p class="text-title">YourCount</p>
      </div>
      <div class="card-body">
        <div class="col-auto">
          <label class="sr-only text-regular" for="inlineFormInput"
            >email</label
          >
          <input
            type="email"
            class="form-control mb-2"
            id="emailInput"
            v-model="email"
          />
          <label class="sr-only text-regular" for="inlineFormInput"
            >password</label
          >
          <input
            type="password"
            class="form-control"
            id="passwordInput"
            v-model="password"
          />
        </div>
      </div>
      <div class="card-footer">
        <div class="d-flex justify-content-around">
          <button
            type="button"
            class="btn bg-black text-white"
            style="font-family: 'Gustavo'"
            v-on:click="getAuth"
          >
            Connexion
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const email = ref("");
const password = ref("");
const getAuth = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/user/login/${email.value}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ pwd: password.value }),
      }
    );
    console.log(response.status);
    const data = await response.status;
    return data;
  } catch (error) {
    console.error("Error fetching groups:", error);
    throw error;
  }
};
</script>
