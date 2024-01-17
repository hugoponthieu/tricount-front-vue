<template>
  <div
    class="modal fade"
    id="userModal"
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
            Ajouter un utilisateur
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <div class="col w-75">
            <div class="input-group mb-3 overflow-auto">
              <span class="input-group-text" id="inputGroup-sizing-default"
                >email</span
              >
              <input
                type="text"
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
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary">Ajouter</button>
        </div>
      </div>
    </div>
  </div>
  <button
    class="btn bg-black text-white"
    data-bs-toggle="modal"
    data-bs-target="#userModal"
  >
    Ajouter un utilisateur
  </button>
</template>

<script setup></script>
