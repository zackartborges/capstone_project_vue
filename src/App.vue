<template>
  <div id="app">
    <div id="wrapper">
      <!-- Sidebar -->
      <ul class="navbar-nav bg-dark sidebar sidebar-dark accordion" id="accordionSidebar">
        <!-- Sidebar - Brand -->
        <a class="sidebar-brand d-flex align-items-center justify-content-center" href="index.html">
          <div class="sidebar-brand-icon rotate-n-15">
            <i class="fas fa-map-signs"></i>
          </div>
          <div class="sidebar-brand-text mx-3">
            <span v-if="isLoggedIn()">
              {{ user.name }}
            </span>
            <span v-else>Welcome!</span>
          </div>
        </a>

        <!-- Divider -->
        <hr class="sidebar-divider my-0" />

        <!-- Nav Item - Dashboard -->
        <li class="nav-item">
          <a class="nav-link" href="/">
            <i class="fas fa-fw fa-campground"></i>
            <span>Home</span>
          </a>
        </li>

        <!-- Divider -->
        <hr class="sidebar-divider" />

        <!-- Heading -->
        <!-- <div class="sidebar-heading">Interface</div> -->
        <!-- if logged in show this >> -->
        <span v-if="isLoggedIn()">
          <!-- Nav Item - Pages Collapse Menu -->
          <li class="nav-item">
            <a class="nav-link" v-bind:href="`/my-pack/${getUserId()}`">
              <i class="fas fa-fw fa-hiking"></i>

              <span>Your Pack</span>
            </a>
          </li>
          <!-- <hr class="sidebar-divider" /> -->
          <!-- Nav Item - Pages Collapse Menu -->
          <!-- <li class="nav-item">
            <a class="nav-link collapsed" href="/example">
              <i class="fas fa-fw fa-compass"></i>
              <span>What is Backpacking?</span>
            </a>
          </li> -->
          <!-- feed link -->
          <!-- <hr class="sidebar-divider" /> -->
          <!-- Nav Item - Pages Collapse Menu -->
          <!-- <li class="nav-item">
            <a class="nav-link collapsed" href="/social_channel">
              <i class="fas fa-fw fa-user-friends"></i>
              <span>Social Channel</span>
            </a>
          </li> -->

          <!-- Divider -->
          <hr class="sidebar-divider" />

          <!-- Heading -->
          <!-- <div class="sidebar-heading">Addons</div> -->

          <!-- Nav Item - Pages Collapse Menu -->
          <li class="nav-item">
            <a class="nav-link collapsed" href="/logout">
              <i class="fab fa-angellist"></i>
              <span>Logout</span>
            </a>
          </li>
        </span>
        <!-- if not logged in show this -->
        <span v-else>
          <li class="nav-item">
            <a class="nav-link collapsed" href="/login">
              <i class="fas fa-door-open"></i>
              <span>Login</span>
            </a>
          </li>

          <hr class="sidebar-divider" />

          <li class="nav-item">
            <a class="nav-link collapsed" href="/signup">
              <i class="fas fa-user-edit"></i>
              <span>Signup</span>
            </a>
          </li>
        </span>

        <!-- Divider -->
        <hr class="sidebar-divider d-none d-md-block" />

        <!-- Sidebar Toggler (Sidebar) -->
        <div class="text-center d-none d-md-inline">
          <button class="rounded-circle border-0" id="sidebarToggle"></button>
        </div>

        <!-- Sidebar Message -->
        <!-- <div class="sidebar-card">
          <img class="sidebar-card-illustration mb-2" src="img/undraw_rocket.svg" alt="" />
          <p class="text-center mb-2">
            <strong>SB Admin Pro</strong>
            is packed with premium features, components, and more!
          </p>
          <a class="btn btn-success btn-sm" href="https://startbootstrap.com/theme/sb-admin-pro">Upgrade to Pro!</a>
        </div> -->
      </ul>
      <!-- End of Sidebar -->

      <!-- Content Wrapper -->
      <div id="content-wrapper" class="d-flex flex-column">
        <!-- Main Content -->

        <div id="content">
          <!-- Topbar -->
          <nav class="navbar navbar-expand navbar-light bg-light topbar mb-4 static-top shadow">
            <h1>OurPack</h1>
          </nav>
          <!-- End of Topbar -->

          <!-- Begin Page Content -->
          <div class="container-fluid">
            <router-view />

            <!-- Content Row -->
            <div class="row">
              <!-- Content Column -->
              <div class="col-lg-6 mb-4">
                <!-- </div> -->
              </div>
            </div>
          </div>
          <!-- /.container-fluid -->
        </div>
        <!-- End of Main Content -->

        <!-- Footer -->
        <footer class="sticky-footer bg-white">
          <div class="container my-auto">
            <div class="copyright text-center my-auto">
              <span>Copyright &copy; OurPack 2029</span>
            </div>
          </div>
        </footer>
        <!-- End of Footer -->
      </div>
      <!-- End of Content Wrapper -->
    </div>
    <!-- End of Page Wrapper -->

    <!-- Scroll to Top Button -->
    <a class="scroll-to-top rounded" href="#page-top">
      <i class="fas fa-angle-up"></i>
    </a>

    <!-- Logout Modal-->
    <div
      class="modal fade"
      id="logoutModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">Ready to Leave?</h5>
            <button class="close" type="button" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div class="modal-body">Select "Logout" below if you are ready to end your current session.</div>
          <div class="modal-footer">
            <button class="btn btn-secondary" type="button" data-dismiss="modal">Cancel</button>
            <a class="btn btn-primary" href="login.html">Logout</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Roboto+Mono&display=swap");
h2 {
  font-family: "Roboto Condensed", sans-serif;
}
td {
  font-family: "Roboto Mono", monospace;
}
</style>
<script>
import axios from "axios";
export default {
  data: function () {
    return {
      errors: [],
      user: {},
      currentUser: this.user,
    };
  },
  created: function () {
    this.showUser();
  },
  methods: {
    isLoggedIn: function () {
      return localStorage.getItem("jwt");
    },
    getUserId: function () {
      return localStorage.getItem("user_id");
    },
    showUser: function () {
      axios.get(`/api/users/${this.$route.params.id}`).then((response) => {
        this.user = response.data;
        console.log("user:", this.user);
        this.totalSum = this.user.gears.reduce(function (tot, arr) {
          return tot + arr.item_weight;
        }, 0);
        console.log(this.totalSum.toFixed(2));
      });
    },
  },
};
</script>
