<template>
  <div id="my-pack">
    <!-- Need to create current user = to only display pack of who is logged in -->
    <!-- form for input for new gear -->
    <!-- @submit.prevent="submitForm" not 100% sure how to figure validation out, commented out -->

    <form>
      {{ sumMessage }}
      {{ message }}
      <div class="gears-new">
        <form>
          <!-- text boxes for newGear -->
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
          Category:
          <input type="text" v-model="newGearCategory" />
          <button v-on:click.prevent="createGear()">Add a new Item</button>
        </form>
      </div>
      <!-- <div v-for="pack in packs" v-bind:key="pack">
        <h1>{{ movie.title }}</h1>
        <button v-on:click="showMovie(movie)">More info!</button>
      </div> -->
    </form>
    <!-- for loop -->
    <div class="my-pack">
      <!-- if no gear, say this: -->
      <!-- <div v-if="gears.length === 0">Put In some Gear!</div> -->
      <div v-for="gear in user.gear" v-bind:key="gear.id">
        Name:
        <p>{{ gear.item_name }}</p>
        Description:
        <p>{{ gear.item_description }}</p>
        Weight:
        <p>{{ gear.item_weight }} oz.</p>
        Quantity:
        <p>{{ gear.item_quantity }}</p>
        Category:
        <p>{{ gear.item_category }}</p>
        <button v-on:click="showGear(gear)">Edit!</button>
        <span class="edit-gear">
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
              <p>
                Category:
                <input type="text" v-model="currentGear.item_category" />
              </p>
              <button v-on:click.prevent="updateGear(currentGear)" data-dismiss="modal">Update</button>
              <button v-on:click.prevent="destroyGear(currentGear)">Destroy</button>
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
      // gears: [],
      user: {},
      // gear: {},
      newGearName: "",
      newGearDescription: "",
      newGearWeight: "",
      newGearQuantity: "",
      newGearUrl: "",
      newGearCategory: "",
      currentGear: {},
      totalSum: this.totalSum,
      sumMessage: `The total weight of your pack is ${this.totalSum}`,
      // need to fix. why does user.name break everything
      message: `Welcome! ${this.user}`,
    };
  },
  created: function () {
    this.showUser();
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
    // indexGears: function () {
    //   axios.get("/api/gears").then((response) => {
    //     this.gears = response.data;
    //     console.log("all gears:", this.gears);
    //   });
    // },
    showUser: function () {
      axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
        this.user = response.data;
        console.log("user:", this.user);
        this.totalSum = this.user.gear.reduce(function (tot, arr) {
          return tot + arr.item_weight;
        }, 0);
        console.log(this.totalSum.toFixed(2));
      });

      // item_weight.reduce(function (a, b) {
      //   return a + b;
      // }, 0);
    },
    // need to fix create gear id
    createGear: function () {
      console.log("adding gear..");
      var params = {
        // user_id: this.user.id,
        item_name: this.newGearName,
        item_description: this.newGearDescription,
        item_weight: this.newGearWeight,
        item_quantity: this.newGearQuantity,
        item_url: this.newGearUrl,
        item_category: this.newGearCategory,
      };
      axios
        .post("/api/gears", params)
        .then((response) => {
          console.log(response.data);
          this.user.gear.push(response.data);
        })
        .catch((error) => {
          console.log(error.response);
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
        item_category: gear.item_category,
      };
      axios.patch("/api/gears/" + gear.id, params).then((response) => {
        console.log("Success", response.data);
        this.gear.push(response.data);
      });
    },
    destroyGear: function (gear) {
      if (confirm("Are you sure you want to delete this item?")) {
        axios.delete("/api/gears/" + gear.id).then((response) => {
          console.log("Success!", response.data);
          var index = this.gears.indexOf(gear);
          this.gears.splice(index, 1);
        });
      }
    },
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
  },
};
</script>
