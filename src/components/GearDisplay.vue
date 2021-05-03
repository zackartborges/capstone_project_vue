Vue.component("GearDisplay",{ template:
<div class="my-pack">
      <table id="firstTable">
        <thead>
          <tr>
            <th>Item Category</th>
            <th>Item Name</th>
            <th>Item Description</th>
            <th>Item Weight</th>
            <th>Item Quantity</th>
          </tr>
        </thead>
        <tbody>
          <h1>Pack & Shelter</h1>
          <tr v-for="gear in user.gears" v-bind:key="gear.id">
            <td>{{ gear.item_category[0].name }}</td>
            <td>{{ gear.item_name }}</td>
            <td>{{ gear.item_description }}</td>
            <td>{{ gear.item_weight }}</td>
            <td>{{ gear.item_quantity }}</td>
            <td><button v-on:click="showGear(gear)">Edit!</button></td>
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
          </tr>
        </tbody>
      </table>
      </div>
})
