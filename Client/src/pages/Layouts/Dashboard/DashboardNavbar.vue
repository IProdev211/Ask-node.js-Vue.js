<template>
  <base-nav v-model="showMenu" class="navbar-absolute top-navbar" type="custom" :transparent="true">
    <div slot="brand" class="navbar-wrapper">
      <!-- <div class="d-none d-md-block">
        <div class="navbar-minimize d-inline">
          <sidebar-toggle-button/>
        </div>
        <div class="navbar-toggle d-inline" :class="{ toggled: $sidebar.showSidebar }">
          <button type="button" class="navbar-toggler" @click="toggleSidebar">
            <span class="navbar-toggler-bar bar1"></span>
            <span class="navbar-toggler-bar bar2"></span>
            <span class="navbar-toggler-bar bar3"></span>
          </button>
        </div>
      </div>-->
      <!-- <a class="navbar-brand" href="/">اسک آریا</a> -->
    </div>

    <ul class="navbar-nav text-right" :class="$rtl.isRTL ? 'mr-auto' : 'ml-auto'">
      <base-dropdown
        tag="li"
        :menu-on-right="!$rtl.isRTL"
        title-tag="a"
        class="nav-item"
        menu-classes="dropdown-navbar"
      >
        <a
          slot="title"
          href="#"
          class="dropdown-toggle nav-link"
          data-toggle="dropdown"
          aria-expanded="true"
        >
          <div class="row d-flex align-items-center d-lg-none">
            <!-- <i class="fas fa-home pl-2"></i> -->
            <li class="nav-link">
              <router-link to="/home" class="nav-item dropdown-item">خانه</router-link>
            </li>
            <div class="w-100"></div>

            <!-- DASHBOARD MENU ITEMS -->

            <!-- <i class="fas fa-id-badge pl-2"></i> -->
            <li class="nav-link">
              <router-link to="/dashboard" class="nav-item dropdown-item">پنل کاربری</router-link>
            </li>
            <div class="w-100"></div>

            <!-- <i class="fas fa-university pl-2"></i> -->
            <li class="nav-link">
              <router-link to="/courses" class="nav-item dropdown-item">دوره های آموزشی</router-link>
            </li>
            <div class="w-100"></div>

            <!-- <i class="i-custom fas fa-graduation-cap pl-2"></i> -->
            <li class="nav-link">
              <router-link to="/mycourses" class="nav-item dropdown-item">در حال یادگیری</router-link>
            </li>
            <div class="w-100"></div>

            <!-- <i class="far fa-check-square pl-2"></i> -->
            <li class="nav-link">
              <router-link to="/quizzes" class="nav-item dropdown-item">امتحان ها</router-link>
            </li>
            <div class="w-100"></div>

            <li class="nav-link">
              <router-link to="/tickets" class="nav-item dropdown-item">پشتیبانی</router-link>
            </li>
            <div class="w-100"></div>

            <!-- <i class="fas fa-tools pl-2"></i> -->
            <li class="nav-link">
              <router-link to="/managementpage" class="nav-item dropdown-item">پنل مدیریت</router-link>
            </li>
            <div class="w-100"></div>

            <!-- LOGOUT BUTTON -->
            <div class="logout-button">
              <router-link class="nav-item dropdown-item" to="#" @click.native="logoutListener">خروج</router-link>
            </div>
          </div>
          <!-- <b class="caret d-none d-lg-block d-xl-block"></b> -->
          <!-- <p class="d-lg-none">پنل کاربری</p> -->
        </a>
      </base-dropdown>
    </ul>
  </base-nav>
</template>
<script>
import { CollapseTransition } from 'vue2-transitions';
import { BaseNav, Modal } from '@/components';
// import SidebarToggleButton from './SidebarToggleButton';
import { ZoomCenterTransition } from 'vue2-transitions';

export default {
  components: {
    // SidebarToggleButton,
    CollapseTransition,
    ZoomCenterTransition,
    BaseNav,
    Modal
  },
  computed: {
    routeName() {
      const { name } = this.$route;
      return this.capitalizeFirstLetter(name);
    },
    isRTL() {
      return this.$rtl.isRTL;
    }
  },
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchModalVisible: false,
      searchQuery: ''
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    toggleNotificationDropDown() {
      this.activeNotifications = !this.activeNotifications;
    },
    closeDropDown() {
      this.activeNotifications = false;
    },
    // toggleSidebar() {
    //   this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    // },
    // hideSidebar() {
    //   this.$sidebar.displaySidebar(false);
    // },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    closeMenu() {
      document.body.classList.remove('nav-open');
      this.showMenu = false;
    },
    logoutListener(e) {
      e.preventDefault();
      backend.get('logout').then(response => {
        if (response.data.status !== 'success') {
          return this.$notify({
            type: 'danger',
            message: 'درخواست شما توسط سرور رد شد'
          });
        }
        window.location.href = '/';
      });
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
    }
  },
  computed: {
    isAdmin() {
      console.log(
        'isAdmin = ',
        this.$root.$data.user && this.$root.$data.user.admin
      );
      return this.$root.$data.user && this.$root.$data.user.admin;
    }
  }
};
</script>
<style lang="scss" scoped>
.logout-button {
  font-family: IranSansBold;
}
.navbar .navbar-brand {
  color: #000000;
  font-family: IranSansBold;
}

@media (max-width: 991.98px) {
  .navbar .navbar-nav a.nav-link i {
    opacity: 1;
    margin-left: 4px;
    margin-right: 9px !important;
  }

  .navbar-nav li {
    border-bottom: 1px solid #c7c7c765 !important;
  }
}

.dropdown-item.active {
  color: rgb(255, 0, 98);
  font-family: IranSansBold;
  text-decoration: none;
  background-color: transparent;
}
.navbar-collapse .navbar-nav .nav-link {
  color: rgb(29, 29, 29);
}

.navbar-nav li a {
  font-size: 1em;
  color: #000000;
  padding: 0 15px 0 0 !important;
  font-size: 1.05em;
  text-align: right;
}

.navbar.bg-white .navbar-brand {
  color: #222a42;
  font-family: IranSansBold;
}

.navbar-nav li i {
  color: rgb(0, 0, 0);
  font-size: 1.2em;
  margin-right: 10px;
  margin-left: 4px;
  align-content: right;
}

.i-chevron {
  margin-right: 3px !important;
}

.navbar-collapse .navbar-nav .nav-link {
  margin: 0;
  padding: 0;
}

.navbar-nav li a {
  padding: 15px 0 !important;
}

.white-content .navbar.navbar-transparent .navbar-brand {
  color: #1d253b;
  font-family: IranSansBold;
}

.rtl .dropdown-toggle:after {
  margin-right: 0.255em;
  margin-left: 0;
  display: none;
}

.dropdown-item:hover,
.dropdown-item:focus {
  color: red;
  text-decoration: none;
  background-color: transparent;
}

///////////////////////////

.top-navbar {
  top: 0px;
}
.dropdown-menu {
  &.dropdown-navbar {
    &::before {
      left: 29px;
      right: auto;
    }
    .dropdown-item {
      color: #9a9a9a;
      background-color: transparent;
    }
  }
}
</style>
