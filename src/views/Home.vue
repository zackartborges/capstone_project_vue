<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div class="login">
      <div>
        <!-- Using modifiers -->
        <b-button v-b-modal.my-modal>Show Modal</b-button>

        <!-- Using value -->
        <!-- <b-button v-b-modal="'my-modal'">Show Modal</b-button> -->

        <!-- The modal -->
        <b-modal id="my-modal">Hello From My Modal!</b-modal>
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
      message: "Welcome to OurPack",
      email: "",
      password: "",
      errors: [],
    };
  },
  created: function () {},
  methods: {
    login: function () {},
    submit: function () {
      var params = {
        email: this.email,
        password: this.password,
      };
      axios
        .post("/api/sessions", params)
        .then((response) => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error.response);
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    },
  },
};
</script>
