<template>
  <div class="example">
    <div v-for="gear in user.gears" :key="gear.id">
      <p>{{ gear.id }}</p>
      Name:
      <p>{{ gear.item_name }}</p>
      Description:
      <p>{{ gear.item_description }}</p>
      Weight:
      <p>{{ gear.item_weight }} oz.</p>
      Quantity:
      <p>{{ gear.item_quantity }}</p>
      Category:
      <p>{{ gear.item_category[0] }}</p>
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
    this.showUser();
  },
  methods: {
    indexPacks: function () {
      axios.get("/api/gears/").then((response) => {
        this.gears = response.data;
        console.log("all gear:", this.gears);
      });
    },
    showUser: function () {
      axios.get(`/api/users/5`).then((response) => {
        this.user = response.data;
        console.log("user:", this.user);
      });
    },
  },
};
</script>
