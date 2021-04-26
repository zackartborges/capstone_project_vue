<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div class="testimonial">
      <p>
        For hikers and travelers, a website where your gear is organized and displayed in front of you. (whether you are
        backpacking or hiking)
      </p>
    </div>
    <!-- <div class="buttons">
      <router-link to="/signup" tag="button">Signup!</router-link>
      <br />
      <br />
      <router-link to="/login" tag="button">Click me for login</router-link>
    </div> -->
    <p></p>
  </div>
</template>

<style></style>

<script>
// import axios from "axios";
export default {
  data: function () {
    return {
      message: "Welcome to OurPack",
      email: "",
      password: "",
      errors: [],
      modalShow: false,
    };
  },
  created: function () {},
  methods: {},
};
</script>
