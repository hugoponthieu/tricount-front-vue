<template>
  <div
    class="modal fade"
    id="groupeModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div
      class="modal-dialog modal-dialog-centered modal-dialog-scrollabl8 modal-lg"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">
            Ajouter un groupe
          </h1>
          <button
            type="button"
            @click="console.log('hey')"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body d-flex align-item-center">
          <div class="col w-75">
            <div class="input-group mb-3 overflow-auto">
              <span class="input-group-text" id="inputGroup-sizing-default"
                >Nom du groupe</span
              >
              <input
                type="text"
                v-model="groupName"
                inputmode="numeric"
                class="form-control"
                pattern="[0-9]"
              />
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="button"
            @click="console.log('hey')"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Fermer
          </button>
          <button
            type="button"
            class="btn btn-primary"
            data-bs-dismiss="modal"
            v-on:click="postGroup()"
          >
            Créer
          </button>
        </div>
      </div>
    </div>
  </div>

  <button
    class="btn text-white bg-black"
    data-bs-toggle="modal"
    data-bs-target="#groupeModal"
  >
    Ajouter
  </button>
</template>

<script setup>
import { ref, inject } from "vue";
const ipAd = inject("ip");
const groupName = ref("");
async function postGroup() {
  try {
    await fetch(`http://${ipAd}:3000/groupe/${groupName.value}`, {
      method: "POST",
    });
  } catch (error) {
    console.error("Error fetching membres:", error);
  }
}
</script>
