<template>
  <div>
    <base-nav
      v-model="showMenu"
      type="dark"
      :transparent="true"
      menu-classes
      class="auth-navbar fixed-top"
    >
      <div slot="brand" class="navbar-wrapper">
        <router-link to="/">
          <img src="/img/askarya-logo.png" width="110" alt="Ask Arya Logo">
        </router-link>
      </div>
      <ul class="navbar-nav">
        <router-link class="nav-item" tag="li" to="/">
          <a :class="getNavClass('home')">{{ 'خانه' }}</a>
        </router-link>
        <router-link class="nav-item" tag="li" to="/ourcourses">
          <a :class="getNavClass('ourcourses')">{{ 'دوره های ما' }}</a>
        </router-link>
        <router-link class="nav-item" tag="li" to="/privateclasses">
          <a :class="getNavClass('privateclasses')">{{ 'کلاس های حضوری' }}</a>
        </router-link>
        <router-link class="nav-item" tag="li" to="/meetups">
          <a :class="getNavClass('meetups')">{{ 'میت آپ' }}</a>
        </router-link>
        <router-link class="nav-item" tag="li" to="/contact">
          <a :class="getNavClass('contact')">{{ 'تماس با ما' }}</a>
        </router-link>
      </ul>
      <ul class="navbar-nav mr-auto">
        <div class="row">
          <div v-if="this.$root.$data.user !== undefined">
            <div class="row">
              <div class="pl-3">
                <p class="pt-2 usertitle">خوش آمدید {{this.$root.$data.user.name}}</p>
              </div>
              <router-link to="/dashboard">
                <base-button
                  native-type="submit"
                  type="danger"
                  class="btn-simple btn"
                >ورود به پنل کاربری</base-button>
              </router-link>
            </div>
          </div>

          <div class="row" v-else>
            <div class="pr-3">
              <router-link to="register">
                <base-button native-type="submit" type="success" class="btn-simple btn">عضویت</base-button>
              </router-link>
            </div>
            <div class="pr-3">
              <router-link to="login">
                <base-button native-type="submit" type="danger" class="btn-simple btn">ورود</base-button>
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
              &copy; طراحی و تولید شده توسط
              <a
                class="font-weight-bold"
                href="/terms"
                target="_blank"
              >اسک آریا</a>، با افتخار در ایران
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
    },
    getNavClass(nav) {
      let classes = 'nav-link';
      let isActive = false;
      switch (nav) {
        case 'home':
          isActive = this.$route.name == 'Home';
          break;
        case 'ourcourses':
          isActive = this.$route.name == 'OurCourses';
          break;
        case 'privateclasses':
          isActive = this.$route.name == 'PrivateClasses';
          break;
        case 'privateclasses':
          isActive = this.$route.name == 'PrivateClasses';
          break;
        case 'meetups':
          isActive = this.$route.name == 'Meetups';
          break;
        case 'contact':
          isActive = this.$route.name == 'Contact';
          break;
      }
      if (isActive) {
        classes += ' text-primary';
      }
      return classes;
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
.usertitle {
  color: #2ae490;
  font-size: 1.1rem;
  font-weight: 600;
}
.navbar.navbar-transparent {
  background: #32325d !important;
  // background: linear-gradient(to right, #6411b8, #a200ff) !important;
}

.navbar-nav li {
  font-size: 1.1rem;
  padding: 0 12px;
  color: white;
}

@media (max-width: 768px) {
  .navbar-nav {
    font-size: 1rem;
    color: white;
    padding: 22px 0;
  }
  .navbar-nav li {
    padding: 10px 0 !important;
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
