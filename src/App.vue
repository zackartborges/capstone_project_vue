<template>
  <div id="app">
    <head>
      <link
        href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/css/bootstrap.min.css"
        rel="stylesheet"
        integrity="sha384-eOJMYsd53ii+scO/bJGFsiCZc+5NDVN2yr8+0RDqr0Ql0h+rP48ckxlpbzKgwra6"
        crossorigin="anonymous"
      />
    </head>
    <div id="nav">
      <router-link to="/">Home</router-link>
      <span v-if="isLoggedIn()">
        |
        <router-link to="/logout">Logout</router-link>
        |
        <router-link to="/example">Example</router-link>
        |
        <router-link v-bind:to="`/my-pack/${getUserId()}`">Your Pack</router-link>
      </span>
      <span v-else>
        |
        <router-link to="/login">Login</router-link>
        |
        <router-link to="/signup">Signup</router-link>
      </span>
    </div>
    <router-view />
  </div>
</template>
<script
  src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta3/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-JEW9xMcG8R+pH31jmWH6WWP0WintQrMb4s7ZOdauHnUtxwoG2vI5DkLtS3qm9Ekf"
  crossorigin="anonymous"
></script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
<script>
export default {
  data: function () {
    return {
      errors: [],
    };
  },
  created: function () {},
  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
  },
};
</script>
