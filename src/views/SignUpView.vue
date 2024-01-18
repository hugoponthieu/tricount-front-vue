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
          <label class="sr-only text-regular" for="inlineFormInput">nom</label>
          <input class="form-control" v-model="nom" />
          <label class="sr-only text-regular" for="inlineFormInput"
            >prenom</label
          >
          <input class="form-control" v-model="prenom" />
          <label class="sr-only text-regular" for="inlineFormInput"
            >pseudo</label
          >
          <input class="form-control" v-model="pseudonyme" />
        </div>
      </div>
      <div class="card-footer">
        <div class="d-flex justify-content-around">
          <button
            type="button"
            class="btn bg-black text-white"
            style="font-family: 'Gustavo'"
            v-on:click="signUp()"
          >
            SignUp
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject } from "vue";
import { useRouter } from "vue-router";
const email = ref("");
const password = ref("");
const nom = ref("");
const prenom = ref("");
const pseudonyme = ref("");
const router = useRouter();
const ipAd = inject("ip");
const goToLogin = async () => {
  router.push({ name: "login" });
};

const signUp = async () => {
  try {
    await fetch(`http://${ipAd}/access/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        email: email.value,
        nom: nom.value,
        prenom: prenom.value,
        pseudonyme: pseudonyme.value,
        pwd: password.value,
      }),
    });
  } catch (error) {
    console.error("Error fetching groups:", error);
  }
  goToLogin();
};
</script>
