<template>
  <div class="home">
    <!-- form for input for new gear -->
    <form>
      <!-- @submit.prevent="submitForm" not 100% sure how to figure validation out, commented out-->
      <div>
        Name:
        <input type="text" v-model="newGearName" />
        Description:
        <input type="text" v-model="newGearDescription" />
        Weight:
        <input type="text" v-model="newGearWeight" />
        Quantity:
        <input type="text" v-model="newGearQuantity" />
        Gear URL:
        <input type="text" v-model="newGearUrl" />
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
      newGearUrl: "",
    };
  },
  created: function () {
    this.indexPacks();
  },
  methods: {
    // submitForm() {
    //   var plotIsValid = this.form.newMoviePlot.length < 20;
    //   if (plotIsValid) {
    //     console.log("form submitted");
    //   } else {
    //     console.log("invalid form");
    //   }
    // },
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
        item_name: this.newGearName,
        item_description: this.newGearDescription,
        item_weight: this.newGearWeight,
        item_quantity: this.newGearQuantity,
        item_url: this.newGearUrl,
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
