<template>
  <div>
    <table id="electronics">
      <thead>
        <!-- <tr>
            <th>Item Category</th>
            <th>Item Name</th>
            <th>Item Description</th>
            <th>Item Weight</th>
            <th>Item Quantity</th>
          </tr> -->
      </thead>
      <tbody>
        <tr v-for="gear in filterBy(gears, 'Electronics', 'item_category')" v-bind:key="gear.id">
          <!-- <td>{{ gear.item_category[0].name }}</td> -->
          <td>{{ gear.item_name }}</td>
          <td>{{ gear.item_description }}</td>
          <td>{{ gear.item_weight }} oz.</td>
          <td>{{ gear.item_quantity }}</td>
          <td><button type="button" class="btn btn-info" v-on:click="showGear(gear)">Edit!</button></td>
          <span class="edit-gear">
            <dialog id="gear-details">
              <form method="dialog">
                <h2>Gear Info</h2>
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
                <!-- <p>
                    Url:
                    <input type="text" v-model="currentGear.item_url" />
                  </p> -->
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
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from "axios";
import Vue from "vue";
// import ApexCharts from "apexcharts";
import Vue2Filters from "vue2-filters";
// import CategoryVFor from "../components/CategoryVFor.vue";
// import CategoryVFor from "../components/CategoryVFor.vue";
Vue.use(Vue2Filters);
// import dropdown from "vue-dropdowns";

export default {
  // components: { CategoryVFor },

  mixins: [Vue2Filters.mixin],
  data: function () {
    return {
      // gears: [],
      user: {},
      // gear: {},
      currentUser: this.user,
      arrayOfCategories: [],
      newGearName: "",
      newGearDescription: "",
      newGearWeight: "",
      newGearQuantity: "",
      newGearUrl: "",
      newGearCategory: "",
      currentGear: {},
      totalSum: this.totalSum,
      gears: [],
      clothing: [],
      bigThree: [],
      cookware: [],
      electronics: [],
      misc: [],
      repair: [],
      shelter: [],
      shoes: [],
      toiletries: [],
      clothingSum: "",
      cookwareSum: "",
      electronicsSum: "",
      miscSum: "",
      repairSum: "",
      shelterSum: "",
      shoesSum: "",
      toiletriesSum: "",
      loaded: false,
      graph: "",
      options: {
        chart: {
          id: "vuechart-example",
        },
        xaxis: {
          categories: [
            "Big 3 + Shelter",
            "Clothing",
            "Cookware",
            "Electronics",
            "Misc.",
            "Repair + Med Kit",
            "Shoes",
            "Toiletries",
          ],
        },
      },
      series: [
        {
          name: "series-1",
          data: [
            107.8,
            23.9,
            13.7,
            24,
            49,
            25,
            27.6,
            10,
            // this.shelterSum,
            // this.clothingSum,
            // this.cookwareSum,
            // this.electronicsSum,
            // this.miscSum,
            // this.repairSum,
            // this.shoesSum,
            // this.toiletriesSum,
          ],
        },
      ],
      // chartOptions: {
      //   chart: {
      //     width: 380,
      //     type: "donut",
      //   },
      //   dataLabels: false,
      // },
      // responsive: [
      //   {
      //     breakpoint: 480,
      //     options: {
      //       chart: {
      //         width: 200,
      //       },
      //       legend: {
      //         position: "bottom",
      //       },
      //     },
      //   },
      // ],
    };
  },
  created: function () {
    this.showUser();
    this.categorySum();
  },
  // mounted: function () {},
  // computed: {
  //   PackAndShelter: function () {
  //     return user.gears.pickBy(this.user.gears, function(u) {
  //       return u.
  //     })
  //   },
  // },
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
    // loadGraph: function () {

    // };
    showUser: function () {
      axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
        this.user = response.data;
        console.log(response.data);
        this.gears = this.user.gears;
        console.log("user:", this.gears);
        this.totalSum = this.user.gears.reduce(function (tot, arr) {
          return tot + arr.item_weight;
        }, 0);
        this.ozToLbs = this.totalSum / 16;
        console.log(this.ozToLbs);
        console.log(this.totalSum.toFixed(2));
      });

      // item_weight.reduce(function (a, b) {
      //   return a + b;
      // }, 0);
    },
    loadGraph: function () {
      var graph = <apexchart width="500" height="500" type="bar" options="options" series="series"></apexchart>;
      console.log(graph);
    },
    categorySum: function () {
      axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
        this.user = response.data;
        this.gears = this.user.gears;
        console.log("user:", this.gears);
        this.shelter = this.user.gears.filter((gear) => gear.category_id == 29);
        console.log(this.shelter);
        this.clothing = this.user.gears.filter((gear) => gear.category_id == 21);
        console.log(this.clothing);
        this.cookware = this.user.gears.filter((gear) => gear.category_id == 22);
        console.log(this.cookware);
        this.electronics = this.user.gears.filter((gear) => gear.category_id == 23);
        console.log(this.electronics);
        this.misc = this.user.gears.filter((gear) => gear.category_id == 27);
        console.log(this.misc);
        this.repair = this.user.gears.filter((gear) => gear.category_id == 25);
        console.log(this.repair);
        this.shelter = this.user.gears.filter((gear) => gear.category_id == 29);
        console.log(this.shelter);
        this.shoes = this.user.gears.filter((gear) => gear.category_id == 26);
        console.log(this.shoes);
        this.toiletries = this.user.gears.filter((gear) => gear.category_id == 24);
        console.log(this.toiletries);

        this.shelterSum = this.shelter.reduce(function (tot, arr) {
          return tot + arr.item_weight;
        }, 0);
        console.log(this.shelterSum);

        this.clothingSum = this.clothing.reduce(function (tot, arr) {
          return tot + arr.item_weight;
        }, 0);
        console.log(this.clothingSum);

        this.cookwareSum = this.cookware.reduce(function (tot, arr) {
          return tot + arr.item_weight;
        }, 0);
        console.log(this.cookwareSum);

        this.electronicsSum = this.electronics.reduce(function (tot, arr) {
          return tot + arr.item_weight;
        }, 0);
        console.log(this.electronicsSum);

        this.miscSum = this.misc.reduce(function (tot, arr) {
          return tot + arr.item_weight;
        }, 0);
        console.log(this.miscSum);

        this.repairSum = this.repair.reduce(function (tot, arr) {
          return tot + arr.item_weight;
        }, 0);
        console.log(this.repairSum);

        this.shoesSum = this.shoes.reduce(function (tot, arr) {
          return tot + arr.item_weight;
        }, 0);
        console.log(this.shoesSum);

        this.toiletriesSum = this.toiletries.reduce(function (tot, arr) {
          return tot + arr.item_weight;
        }, 0);
        console.log(this.toiletriesSum);
        this.loaded = true;
      });
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
        category_id: this.newGearCategory,
      };
      axios
        .post("/api/gears", params)
        .then((response) => {
          this.user.gear.push(response.data);
          console.log(response.data);
          this.$router.push(`"/my-pack/${this.$route.params.id}"`);
        })
        .catch((error) => {
          console.log(error.response.data.errors);
          this.errors = error.response.data.errors;
        });
      // params = "";
    },
    createGearCategoryJoin: function () {
      console.log("creating category join..");
      var params = {
        gear_id: this.gear.id,
        category_id: this.value,
      };
      axios
        .post("/api/category_join", params)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => console.log(error.response));
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
    // sortTable: function sortTable(col) {
    //   this.rows.sort(function (a, b) {
    //     if (a[col] > b[col]) {
    //       return 1;
    //     } else if (a[col] < b[col]) {
    //       return -1;
    //     }
    //     return 0;
    //   });
    // },
  },
};
</script>
