<template>
  <div class="col-md-5 mh-75">
    <div class="card">
      <div class="card-header simple-text">Balance</div>
      <div class="card-body overflow-auto">
        <div
          class="container d-flex border-bottom justify-content-between pt-2"
          v-for="balance in props.balances"
          :key="balance.id"
        >
          <div class="col little-text">
            {{ balance[0].split("@")[0] }}
          </div>
          <div class="col little-text">
            {{ balance[1].toFixed(2) }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from "vue";

const props = defineProps(["balances"]);
</script>
