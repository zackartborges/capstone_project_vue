<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <div class="user-actions">
      <button>Sign Up!</button>
      <button>Sign In</button>
    </div>
  </div>
</template>

<style></style>

<script>
export default {
  data: function () {
    return {
      message: "Welcome to Vue.js!",
    };
  },
  created: function () {},
  methods: {},
};
</script>
