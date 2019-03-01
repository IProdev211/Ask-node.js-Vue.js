<template>
  <div>
    <base-nav
      v-model="showMenu"
      type="dark"
      :transparent="true"
      menu-classes="px-5"
      class="auth-navbar fixed-top"
    >
      <div slot="brand" class="navbar-wrapper">
        <router-link to="/">
          <img src="/img/askarya-logo.png" width="110" alt="Ask Arya Logo">
        </router-link>
      </div>
      <!-- <div slot="brand" class="navbar-wrapper">
        <a class="navbar-brand" href="/" v-if="title">{{ title }}</a>
      </div>-->
      <ul class="navbar-nav">
        <router-link class="nav-item" tag="li" to="/home">
          <a class="nav-link">Home</a>
        </router-link>
        <router-link class="nav-item" tag="li" to="/privateclasses">
          <a class="nav-link">Private Classes</a>
        </router-link>
        <router-link class="nav-item" tag="li" to="/meetups">
          <a class="nav-link">Meetups</a>
        </router-link>
        <router-link class="nav-item" tag="li" to="/contact">
          <a class="nav-link">Contact Us</a>
        </router-link>
      </ul>
      <ul class="navbar-nav ml-auto">
        <div class="row d-flex justify-content-end">
          <div v-if="this.$root.$data.user !== undefined">
            <div class="px-1">
              <router-link to="dashboard">
                <base-button native-type="submit" type="success" class="btn-simple btn btn-sm">Hey, {{this.$root.$data.user.name}}!</base-button>
              </router-link>
            </div>
          </div>

          <div class="row" v-else>
            <div class="px-1">
              <router-link to="login">
                <base-button native-type="submit" type="success" class="btn-simple btn btn-sm">Login</base-button>
              </router-link>
            </div>
            <div class="px-2">
              <router-link to="register">
                <base-button native-type="submit" type="danger" class="btn-simple btn btn-sm">Register</base-button>
              </router-link>
            </div>
          </div>
        </div>
      </ul>
    </base-nav>

    <div class="wrapper wrapper-full-page">
      <div class="full-page" :class="pageClass">
        <div class="content-custom">
          <zoom-center-transition :duration="pageTransitionDuration" mode="out-in">
            <router-view></router-view>
          </zoom-center-transition>
        </div>
        <footer class="footer">
          <div class="container-fluid">
            <div class="copyright">
              &copy; {{ year }}, made with
              <i class="tim-icons icon-heart-2"></i> by
              <a href="https://askarya.ir" target="_blank">Ask Arya</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
import { BaseNav } from 'src/components';
import { ZoomCenterTransition } from 'vue2-transitions';

export default {
  components: {
    BaseNav,
    ZoomCenterTransition
  },
  props: {
    backgroundColor: {
      type: String,
      default: 'black'
    }
  },
  data() {
    return {
      showMenu: false,
      menuTransitionDuration: 250,
      pageTransitionDuration: 200,
      year: new Date().getFullYear(),
      pageClass: 'login-page'
    };
  },
  computed: {
    title() {
      return `${this.$route.name} Page`;
    }
  },
  methods: {
    toggleNavbar() {
      document.body.classList.toggle('nav-open');
      this.showMenu = !this.showMenu;
    },
    closeMenu() {
      document.body.classList.remove('nav-open');
      this.showMenu = false;
    },
    setPageClass() {
      this.pageClass = `${this.$route.name}-page`.toLowerCase();
    }
  },
  beforeDestroy() {
    this.closeMenu();
  },
  beforeRouteUpdate(to, from, next) {
    // Close the mobile menu first then transition to next page
    if (this.showMenu) {
      this.closeMenu();
      setTimeout(() => {
        next();
      }, this.menuTransitionDuration);
    } else {
      next();
    }
  },
  mounted() {
    this.setPageClass();
  },
  watch: {
    $route() {
      this.setPageClass();
    }
  }
};
</script>
<style scoped lang="scss">
.navbar.navbar-transparent {
  background: #32325d !important;
  // background: linear-gradient(to right, #6411b8, #a200ff) !important;
}

.navbar-nav {
  font-size: 17px;
  color: white;
}

@media (max-width: 768px) {
  .navbar-nav {
    font-size: 20px;
    color: white;
    padding: 22px 0;
  }
  .navbar-nav li {
    padding: 10px 1px !important;
    border-bottom: 1px solid #3e3e70 !important;
  }
}

.navbar.auth-navbar {
  top: 0;
}

$scaleSize: 0.8;
@keyframes zoomIn8 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  100% {
    opacity: 1;
  }
}

.wrapper-full-page .zoomIn {
  animation-name: zoomIn8;
}

@keyframes zoomOut8 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}

.wrapper-full-page .zoomOut {
  animation-name: zoomOut8;
}
</style>
