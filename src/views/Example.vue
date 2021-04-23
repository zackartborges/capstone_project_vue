<template>
  <div class="example">
    <div v-for="gear in gears" :key="gear.id">
      <p>{{ gear.id }}</p>
      Name:
      <p>{{ gear.item_name }}</p>
      Description:
      <p>{{ gear.item_description }}</p>
      Weight:
      <p>{{ gear.item_weight }} oz.</p>
      Quantity:
      <p>{{ gear.item_quantity }}</p>
      <hr />
      <!-- <p>{{ pack.gear.description }}</p>
      <p>{{ pack.gear.weight }}</p> -->
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Example Page",
      gears: [],
      gear: "",
      user: "",
    };
  },
  created: function () {
    this.indexPacks();
  },
  methods: {
    indexPacks: function () {
      axios.get("/api/gears").then((response) => {
        this.gears = response.data;
        console.log("all gear:", this.gears);
      });
    },
  },
};
</script>
