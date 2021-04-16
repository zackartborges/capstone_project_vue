<template>
  <div class="home">
    <form @submit.prevent="submitForm">
      <div>
        Name
        <input type="text" v-model="newGearName" />
        Description:
        <input type="text" v-model="newGearDescription" />
        Weight:
        <input type="text" v-model="newGearWeight" />
        Quantity
        <input type="text" v-model="newGearQuantity" />
        <!-- <p vif:="!plotIsValid" class="error-message">The Plot is too long.</p>
        Director: -->
        <!-- <input type="text" v-model="newMovieDirector" /> -->

        <button v-on:click="createGear">Add a new Item</button>
      </div>
      <!-- <div v-for="pack in packs" v-bind:key="pack">
        <h1>{{ movie.title }}</h1>
        <button v-on:click="showMovie(movie)">More info!</button>
      </div> -->
    </form>
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
      newGearName: "",
      newGearDescription: "",
      newGearWeight: "",
      newGearQuantity: "",
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
    // need to make sure that when gear is added while someone is logged in, the gear will be added to the db, but it will automatically be addedd to their "pack" as well
    createGear: function () {
      console.log("adding gear..");
      var params = {
        title: this.newGearName,
        year: this.newGearDescription,
        plot: this.newGearWeight,
        director: this.newGearQuantity,
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
