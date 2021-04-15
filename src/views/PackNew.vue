<template>
  <div class="home">
    <div class="example">
      <div v-for="pack in packs" :key="pack.id">
        <p>{{ pack.id }}</p>
        Name:
        <p>{{ pack.gear_name }}</p>
        Description:
        <p>{{ pack.gear_description }}</p>
        Weight:
        <p>{{ pack.gear_weight }} oz.</p>
        Quantity:
        <p>{{ pack.gear_quantity }}</p>
        <hr />
        <!-- <p>{{ pack.gear.description }}</p>
      <p>{{ pack.gear.weight }}</p> -->
      </div>
    </div>
  </div>
</template>

<style></style>

<script>
import axios from "axios";
export default {
  data: function () {
    return {
      message: "Create your pack here.",
      packs: [],
      user: "",
    };
  },
  created: function () {
    this.indexPacks();
  },
  methods: {
    indexPacks: function () {
      axios.get("/api/packs").then((response) => {
        this.packs = response.data;
        console.log("all packs:", this.packs);
      });
    },
    createGear: function () {
      console.log("adding gear..");
      var params = {
        title: this.newgearTitle,
        year: this.newgearYear,
        plot: this.newgearPlot,
        director: this.newgearDirector,
      };
      axios
        .post("/api/gears", params)
        .then((response) => {
          console.log("Successfully added gear!", response.data);
          this.gears.push(response.data);
        })
        .catch((error) => {
          this.errors = error.response.data.errors;
        });
    },
  },
};
</script>
