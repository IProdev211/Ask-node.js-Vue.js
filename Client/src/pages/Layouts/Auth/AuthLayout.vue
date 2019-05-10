<template>
  <div>
    <base-nav
      v-model="showMenu"
      type="white"
      :transparent="true"
      menu-classes="justify-content-start"
      class="auth-navbar fixed-top"
    >
      <router-link to="/">
        <img src="/img/askarya-logo.png" width="110" alt="Ask Arya Logo">
      </router-link>

      <ul class="navbar-nav">
        <router-link class="nav-item" tag="li" to="/home">
          <a class="nav-link">{{ 'خانه' }}</a>
        </router-link>
        <router-link class="nav-item" tag="li" to="/ourcourses">
          <a class="nav-link">{{ 'دوره های ما' }}</a>
        </router-link>
        <router-link class="nav-item" tag="li" to="/privateclasses">
          <a class="nav-link">{{ 'کلاس های خصوصی' }}</a>
        </router-link>
        <router-link class="nav-item" tag="li" to="/meetups">
          <a class="nav-link">{{ 'میت آپ' }}</a>
        </router-link>
        <router-link class="nav-item" tag="li" to="/contact">
          <a class="nav-link">{{ 'تماس با ما' }}</a>
        </router-link>

        <!-- 
        <router-link class="nav-item" tag="li" to="/lock">
          <a class="nav-link">
            <i class="tim-icons icon-lock-circle"></i> Lock
          </a>
        </router-link>-->
      </ul>
      <ul class="navbar-nav mr-auto">
        <router-link class="nav-item pl-3" tag="li" to="/dashboard">
          <a class="nav-link text-primary">
            <i class="far fa-user pl-3"></i> پنل کاربری
            <i class="tim-icons icon-minimal-left"></i>
          </a>
        </router-link>
      </ul>
    </base-nav>
    <!-- 
    <div class="Message container text-center">
      <h1 class="display-1 text-danger">صفحه مورد نظر پیدا نشد</h1>
      <h3 class="display-2">خطای ۴۰۴</h3>
      <div class="pt-3 px-2">
        <router-link to="/">
          <base-button
            native-type="submit"
            type="success"
            class="btn btn-simple"
          >{{ 'مشاهده صفحه اصلی' }}</base-button>
        </router-link>
      </div>
    </div>-->
    <div class="wrapper wrapper-full-page">
      <div class="full-page" :class="pageClass">
        <div class="content">
          <zoom-center-transition :duration="pageTransitionDuration" mode="out-in">
            <router-view></router-view>
          </zoom-center-transition>
        </div>
        <footer class="footer">
          <div class="container-fluid">
            <div class="copyright">
              &copy; طراحی و تولید شده توسط
              <a href="https://askarya.ir" target="_blank">اسک آریا</a>، با افتخار در ایران
              <i class="tim-icons icon-heart-2"></i>
              سال ١٣٩٧
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
<style lang="scss">
.nav-item {
  font-size: 1.2rem;
}
// .Message {
//   padding-top: 30vh;
// }
.navbar.auth-navbar {
  top: 0;
}

@media (max-width: 768px) {
  .nav-item {
    font-size: 1rem;
  }
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
