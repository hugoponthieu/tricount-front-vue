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
            placeholder="email"
          />
          <label class="sr-only text-regular" for="inlineFormInput"
            >password</label
          >
          <input
            type="password"
            class="form-control"
            id="passwordInput"
            placeholder="password"
          />
        </div>
      </div>
      <div class="card-footer">
        <div class="d-flex justify-content-around">
          <button
            type="button"
            class="btn bg-black text-white"
            style="font-family: 'Gustavo'"
          >
            Connexion
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
