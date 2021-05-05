<template>
  <div id="my-pack">
    <form>
      Hello {{ user.name }}! The total weight of your pack is {{ totalSum.toFixed(2) }}.

      <!-- </div> -->
      <div class="gears-new">
        <form>
          <!-- text boxes for newGear -->
          Name:
          <input type="text" class="form-control" v-model="newGearName" />
          Description:
          <input type="text" class="form-control" v-model="newGearDescription" />
          Weight:
          <input type="text" class="form-control" v-model="newGearWeight" />
          Quantity:
          <input type="text" class="form-control" v-model="newGearQuantity" />
          Gear URL:
          <input type="text" class="form-control" v-model="newGearUrl" />
          Category:
          <!-- dropdown menu for categories -->
          <select class="form-select" id="category-select" v-model="newGearCategory">
            <option disabled selected value>-- select an option --</option>
            <option>Sleep System</option>
            <option>Water System</option>
            <option>Cookware</option>
            <option>Toiletries</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Consumables</option>
            <option>Uncategorized</option>
          </select>
          <button v-on:click.prevent="createGear()">Add a new Item</button>
        </form>
      </div>
      <!-- <div v-for="pack in packs" v-bind:key="pack">
        <h2>{{ movie.title }}</h2>
        <button v-on:click="showMovie(movie)">More info!</button>
      </div> -->
    </form>
    <hr />
    <!-- for loop -->
    <div class="my-pack">
      <tr>
        <th>Item Category</th>
        <br />
        <th>Item Name</th>
        <br />
        <th>Item Description</th>
        <th>Item Weight</th>
        <th>Item Quantity</th>
      </tr>
      <h2>Big 3 + Sleeping Pad</h2>
      <table id="big-3">
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
          <!-- user.gears.categories[0].name -->
          <tr v-for="gear in orderBy(gears, 'Big 3', 'item_category')" v-bind:key="gear.id">
            <td>{{ gear.item_category[0].name }}</td>
            <td>{{ gear.item_name }}</td>
            <td>{{ gear.item_description }}</td>
            <td>{{ gear.item_weight }} oz.</td>
            <td>{{ gear.item_quantity }}</td>
            <td><button v-on:click="showGear(gear)">Edit!</button></td>
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
          </tr>
        </tbody>
      </table>

      <h2>Clothing</h2>
      <table id="clothing">
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
          <tr v-for="gear in filterBy(gears, 'Clothing', 'item_category')" v-bind:key="gear.id">
            <td>{{ gear.item_category[0].name }}</td>
            <td>{{ gear.item_name }}</td>
            <td>{{ gear.item_description }}</td>
            <td>{{ gear.item_weight }} oz.</td>
            <td>{{ gear.item_quantity }}</td>
            <td><button v-on:click="showGear(gear)">Edit!</button></td>
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
          </tr>
        </tbody>
      </table>

      <h2>Cookware and Filtration</h2>
      <table id="cookware-filtration">
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
          <tr v-for="gear in filterBy(gears, 'Cookware', 'item_category')" v-bind:key="gear.id">
            <td>{{ gear.item_category[0].name }}</td>
            <td>{{ gear.item_name }}</td>
            <td>{{ gear.item_description }}</td>
            <td>{{ gear.item_weight }} oz.</td>
            <td>{{ gear.item_quantity }}</td>
            <td><button v-on:click="showGear(gear)">Edit!</button></td>
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
                  <p>
                    Url:
                    <input type="text" v-model="currentGear.item_url" />
                  </p>
                  <p>
                    Category:
                    <input type="text" v-model="currentGear.item_category" />
                  </p>
                  <!-- add in a line to display the catagory total weight -->
                  <button v-on:click.prevent="updateGear(currentGear)" data-dismiss="modal">Update</button>
                  <button v-on:click.prevent="destroyGear(currentGear)">Destroy</button>
                  <button>Close</button>
                </form>
              </dialog>
            </span>
          </tr>
        </tbody>
      </table>
      <h2>Electronics</h2>
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
            <td>{{ gear.item_category[0].name }}</td>
            <td>{{ gear.item_name }}</td>
            <td>{{ gear.item_description }}</td>
            <td>{{ gear.item_weight }} oz.</td>
            <td>{{ gear.item_quantity }}</td>
            <td><button v-on:click="showGear(gear)">Edit!</button></td>
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
          </tr>
        </tbody>
      </table>

      <table id="repair-medkit">
        <h2>Repair and Med-Kit</h2>
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
          <tr v-for="gear in filterBy(gears, 'Repair', 'item_category')" v-bind:key="gear.id">
            <td>{{ gear.item_category[0].name }}</td>
            <td>{{ gear.item_name }}</td>
            <td>{{ gear.item_description }}</td>
            <td>{{ gear.item_weight }} oz.</td>
            <td>{{ gear.item_quantity }}</td>
            <td><button v-on:click="showGear(gear)">Edit!</button></td>
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
          </tr>
        </tbody>
      </table>
      <h2>Shoes</h2>
      <table id="shoes">
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
          <tr v-for="gear in filterBy(gears, 'Shoes', 'item_category')" v-bind:key="gear.id">
            <td>{{ gear.item_category[0].name }}</td>
            <td>{{ gear.item_name }}</td>
            <td>{{ gear.item_description }}</td>
            <td>{{ gear.item_weight }} oz.</td>
            <td>{{ gear.item_quantity }}</td>
            <td><button v-on:click="showGear(gear)">Edit!</button></td>
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
          </tr>
        </tbody>
      </table>

      <table id="toiletries">
        <h2>Toiletries</h2>
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
          <tr v-for="gear in filterBy(gears, 'Toiletries', 'item_category')" v-bind:key="gear.id">
            <!-- <div v-if="gears"> -->
            <td>{{ gear.item_category[0].name }}</td>
            <td>{{ gear.item_name }}</td>
            <td>{{ gear.item_description }}</td>
            <td>{{ gear.item_weight }} oz.</td>
            <td>{{ gear.item_quantity }}</td>
            <td><button v-on:click="showGear(gear)">Edit!</button></td>
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
            <!-- </div> -->
          </tr>
          <!-- <div v:else>There are no toiletries.</div> -->
        </tbody>
      </table>
      <!-- </span> -->
      <h2>Misc.</h2>
      <table id="misc">
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
          <tr v-for="gear in filterBy(gears, 'Misc.', 'item_category')" v-bind:key="gear.id">
            <td>{{ gear.item_category[0].name }}</td>
            <td>{{ gear.item_name }}</td>
            <td>{{ gear.item_description }}</td>
            <td>{{ gear.item_weight }} oz.</td>
            <td>{{ gear.item_quantity }}</td>
            <td><button v-on:click="showGear(gear)">Edit!</button></td>
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
          </tr>
        </tbody>
      </table>

      <!-- attempt at sorting the table -->
      <!-- <table id="thirdTable">
        <thead>
          <tr>
            <th v-for="col in columns" v-bind:key="col.id" v-on:click="sortTable(col)">{{ col }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="gear in user.gears" v-bind:key="gear.id">
            <td v-for="col in columns" v-bind:key="col.id">{{ row[col] }}</td>
          </tr>
        </tbody>
      </table> -->

      <!--- <div v-for="gear in user.gears" v-bind:key="gear.id">
        Name:
        <p>{{ gear.item_name }}</p>
        Description:
        <p>{{ gear.item_description }}</p>
        Weight:
        <p>{{ gear.item_weight }} oz. oz.</p>
        Quantity:
        <p>{{ gear.item_quantity }}</p>
        Category:
        <p>{{ gear.item_category[0].name }}</p>
        <button v-on:click="showGear(gear)">Edit!</button>
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
      </div> -->
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
<style>
.my-pack {
  border-collapse: collapse;
}

td {
  border-bottom: 1px solid #ddd;
  /* border: ridge; */
  padding: 5px;
  /* width: 100%; */
}
</style>

<script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
;
<script>
import axios from "axios";
import Vue from "vue";
import Vue2Filters from "vue2-filters";

Vue.use(Vue2Filters);
// import dropdown from "vue-dropdowns";

export default {
  components: {
    // apexchart: VueApexCharts,
  },
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
      clothingSum: this.clothingSum,
      cookwareSum: this.cookwareSum,
      electronicsSum: this.electronicsSum,
      miscSum: this.miscSum,
      repairSum: this.repairSum,
      shelterSum: this.shelterSum,
      shoesSum: this.shoesSum,
      toiletriesSum: this.toiletriesSum,
      chartOptions: {
        chart: {
          width: 380,
          type: "donut",
        },
        dataLabels: false,
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    };
  },
  created: function () {
    this.showUser();
    this.categorySum();
  },
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
    showUser: function () {
      axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
        this.user = response.data;
        console.log(response.data);
        this.gears = this.user.gears;
        console.log("user:", this.gears);
        this.totalSum = this.user.gears.reduce(function (tot, arr) {
          return tot + arr.item_weight;
        }, 0);
        console.log(this.totalSum.toFixed(2));
      });

      // item_weight.reduce(function (a, b) {
      //   return a + b;
      // }, 0);
    },
    categorySum: function () {
      axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
        this.user = response.data;
        this.gears = this.user.gears;
        // console.log("user:", this.gears);
        this.bigThree = this.user.gears.filter((gear) => gear.category_id == 29);
        console.log(this.bigThree);
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
        this.shelter = this.user.gears.filter((gear) => gear.category_id == 28);
        console.log(this.shelter);
        this.shoes = this.user.gears.filter((gear) => gear.category_id == 26);
        console.log(this.shoes);
        this.toiletries = this.user.gears.filter((gear) => gear.category_id == 24);
        console.log(this.toiletries);

        this.bigThreeSum = this.bigThree.reduce(function (tot, arr) {
          return tot + arr.item_weight;
        }, 0);
        console.log(this.bigThreeSum);

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

        this.shelterSum = this.shelter.reduce(function (tot, arr) {
          return tot + arr.item_weight;
        }, 0);
        console.log(this.shelterSum);

        this.shoesSum = this.shoes.reduce(function (tot, arr) {
          return tot + arr.item_weight;
        }, 0);
        console.log(this.shoesSum);

        this.toiletriesSum = this.toiletries.reduce(function (tot, arr) {
          return tot + arr.item_weight;
        }, 0);
        console.log(this.toiletriesSum);
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
