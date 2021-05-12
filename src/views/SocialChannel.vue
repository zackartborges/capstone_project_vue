<template>
  <div class="contruction">
    <hr />
    <img src="../assets/under_construction.jpeg" alt="" />
    <hr />
    <category-v-for></category-v-for>
  </div>
</template>

<style></style>

<script>
import CategoryVFor from "../components/CategoryVFor.vue";
// import axios from "axios";

export default {
  components: { CategoryVFor },
  data: function () {
    return {};
  },
};
</script>
