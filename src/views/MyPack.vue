<template>
  <div id="my-pack">
    <!-- Need to create current user = to only display pack of who is logged in -->
    <!-- form for input for new gear -->
    <!-- @submit.prevent="submitForm" not 100% sure how to figure validation out, commented out-->

    <form>
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
    <!-- for loop -->
    <div class="example">
      <div v-for="gear in gears" v-bind:key="gear.id">
        <p>{{ gear.id }}</p>
        Name:
        <p>{{ gear.item_name }}</p>
        Description:
        <p>{{ gear.item_description }}</p>
        Weight:
        <p>{{ gear.item_weight }} oz.</p>
        Quantity:
        <p>{{ gear.item_quantity }}</p>
        <button v-on:click="showGear(gear)">Edit!</button>
        <span class="edit">
          <dialog id="gear-details">
            <form method="dialog">
              <h1>Gear Info</h1>
              <p>
                Name:
                <input type="text" v-model="currentGear.item_name" />
              </p>
              <p>
                Description:
                <input type="text" v-model="currentGear.item_description" />
              </p>
              <p>
                Weight:
                <input type="text" v-model="currentGear.item_weight" />
              </p>
              <p>
                Quantity:
                <input type="text" v-model="currentGear.item_quantity" />
              </p>
              <p>
                Url:
                <input type="text" v-model="currentGear.item_url" />
              </p>
              <button v-on:click="updateGear(currentGear)">Update</button>
              <button v-on:click="destroyGear(currentGear)">Destroy</button>
              <button>Close</button>
            </form>
          </dialog>
        </span>
        <hr />
        <!-- <p>{{ pack.gear.description }}</p>
      <p>{{ pack.gear.weight }}</p> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function () {
    return {
      message: "Create your pack here.",
      gears: [],
      user: "",
      // gear: {},
      newGearName: "",
      newGearDescription: "",
      newGearWeight: "",
      newGearQuantity: "",
      newGearUrl: "",
      currentGear: {},
    };
  },
  created: function () {
    this.indexGears();
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
    indexGears: function () {
      axios.get("/api/gears").then((response) => {
        this.gears = response.data;
        console.log("all gears:", this.gears);
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
    showGear: function (gear) {
      console.log(gear);
      this.currentGear = gear;
      document.querySelector("#gear-details").showModal();
    },
    updateGear: function (gear) {
      var params = {
        item_name: gear.item_name,
        item_description: gear.item_description,
        item_weight: gear.item_weight,
        item_quantity: gear.item_quantity,
        item_url: gear.item_url,
      };
      axios.patch("/api/gears/" + gear.id, params).then((response) => {
        console.log("Success", response.data);
      });
    },
  },
};
</script>
