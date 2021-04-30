<template>
  <div id="my-pack">
    <!-- Need to create current user = to only display pack of who is logged in -->
    <!-- form for input for new gear -->
    <!-- @submit.prevent="submitForm" not 100% sure how to figure validation out, commented out -->

    <form>
      The total {{ user.name }} , {{ totalSum.toFixed(2) }}
      <!-- Pie Chart -->
      <div class="col-xl-4 col-lg-5">
        <div class="card shadow mb-4">
          <!-- Card Header - Dropdown -->
          <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
            <h6 class="m-0 font-weight-bold text-primary">Pack Weight Distribution</h6>
            <div class="dropdown no-arrow">
              <a
                class="dropdown-toggle"
                href="#"
                role="button"
                id="dropdownMenuLink"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <i class="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
              </a>
              <div
                class="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                aria-labelledby="dropdownMenuLink"
              >
                <div class="dropdown-header">Dropdown Header:</div>
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Something else here</a>
              </div>
            </div>
          </div>
          <!-- Card Body -->
          <div class="card-body">
            <div class="chart-pie pt-4 pb-2">
              <canvas id="myPieChart"></canvas>
            </div>
            <div class="mt-4 text-center small">
              <span class="mr-2">
                <i class="fas fa-circle text-primary"></i>
                Direct
              </span>
              <span class="mr-2">
                <i class="fas fa-circle text-success"></i>
                Social
              </span>
              <span class="mr-2">
                <i class="fas fa-circle text-info"></i>
                Referral
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- </div> -->
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
          <!-- <dropdown :options="arrayOfObjects" :selected="object" v-on:updateOption="methodToRunOnSelect"></dropdown> -->

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
      <div v-for="gear in user.gears" v-bind:key="gear.id">
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
    <!-- Project Card Example -->
    <!-- <div class="card shadow mb-4">
      <div class="card-header py-3">
        <h6 class="m-0 font-weight-bold text-primary">Projects</h6>
      </div>
      <div class="card-body">
        <h4 class="small font-weight-bold">
          Server Migration
          <span class="float-right">20%</span>
        </h4>
        <div class="progress mb-4">
          <div
            class="progress-bar bg-danger"
            role="progressbar"
            style="width: 20%"
            aria-valuenow="20"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <h4 class="small font-weight-bold">
          Sales Tracking
          <span class="float-right">40%</span>
        </h4>
        <div class="progress mb-4">
          <div
            class="progress-bar bg-warning"
            role="progressbar"
            style="width: 40%"
            aria-valuenow="40"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <h4 class="small font-weight-bold">
          Customer Database
          <span class="float-right">60%</span>
        </h4>
        <div class="progress mb-4">
          <div
            class="progress-bar"
            role="progressbar"
            style="width: 60%"
            aria-valuenow="60"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <h4 class="small font-weight-bold">
          Payout Details
          <span class="float-right">80%</span>
        </h4>
        <div class="progress mb-4">
          <div
            class="progress-bar bg-info"
            role="progressbar"
            style="width: 80%"
            aria-valuenow="80"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
        <h4 class="small font-weight-bold">
          Account Setup
          <span class="float-right">Complete!</span>
        </h4>
        <div class="progress">
          <div
            class="progress-bar bg-success"
            role="progressbar"
            style="width: 100%"
            aria-valuenow="100"
            aria-valuemin="0"
            aria-valuemax="100"
          ></div>
        </div>
      </div>
    </div> -->
  </div>
</template>

<script>
import axios from "axios";
// import dropdown from "vue-dropdowns";

export default {
  data: function () {
    return {
      // gears: [],
      user: {},
      // gear: {},
      currentUser: this.user,
      arrayOfCategories: [],
      categories: {},
      newGearName: "",
      newGearDescription: "",
      newGearWeight: "",
      newGearQuantity: "",
      newGearUrl: "",
      newGearCategory: "",
      currentGear: {},
      totalSum: this.totalSum,
      // need to fix. why does user.name break everything
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
        this.totalSum = this.user.gears.reduce(function (tot, arr) {
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
