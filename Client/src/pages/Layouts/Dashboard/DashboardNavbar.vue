<template>
  <base-nav v-model="showMenu" class="navbar-absolute top-navbar" type="custom" :transparent="true">
    <ul class="navbar-nav">
      <!-- <a class="navbar-brand d-none d-md-block" href="/">اسک آریا</a> -->
      <base-dropdown tag="li" title-tag="a" class="nav-item" menu-classes="dropdown-navbar">
        <a
          slot="title"
          href="#"
          class="dropdown-toggle nav-link"
          data-toggle="dropdown"
          aria-expanded="true"
        >
          <div class="row d-flex align-items-center d-lg-none">
            <li class="nav-link border-bottom">
              <router-link to="/home" class="nav-item dropdown-item">خانه</router-link>
            </li>

            <li class="nav-link border-bottom">
              <router-link to="/dashboard" class="nav-item dropdown-item">پنل کاربری</router-link>
            </li>

            <li class="nav-link border-bottom">
              <router-link to="/courses" class="nav-item dropdown-item">دوره های آموزشی</router-link>
            </li>

            <li class="nav-link border-bottom">
              <router-link to="/mycourses" class="nav-item dropdown-item">در حال یادگیری</router-link>
            </li>

            <!-- <li class="nav-link border-bottom">
              <router-link to="/quizzes" class="nav-item dropdown-item">امتحان ها</router-link>
            </li>-->

            <li class="nav-link border-bottom">
              <router-link to="/tickets" class="nav-item dropdown-item">پشتیبانی</router-link>
            </li>

            <li v-if="isAdmin" class="nav-link border-bottom">
              <router-link to="/managementpage" class="nav-item dropdown-item">پنل مدیریت</router-link>
            </li>

            <!-- LOGOUT BUTTON -->
            <li class="logout-button text-right">
              <router-link to="#" @click.native="logoutListener">خروج</router-link>
            </li>
          </div>
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
import backend from '../../../backend';


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
      // console.log(
      //   'isAdmin = ',
      //   this.$root.$data.user && this.$root.$data.user.admin
      // );
      return this.$root.$data.user && this.$root.$data.user.admin;
    }
  }
};
</script>
<style lang="scss" scoped>
.navbar-nav li a {
  font-size: 1em;
  color: #000000;
  font-size: 1.15em;
  text-align: right;
}

.navbar-collapse .navbar-nav .nav-link a {
  padding: 0.9em 0 !important;
}

.navbar-nav li {
  color: rgb(29, 29, 29);
  width: 100%;
}

.border-bottom {
  border-bottom: 1px solid #c7c7c765 !important;
}

.logout-button {
  padding-top: 1em;
  padding-bottom: 1em;
  font-family: IranSansBold;
}

.navbar .navbar-brand {
  color: #000000;
  font-family: IranSansBold;
}

.dropdown-item.active {
  color: rgb(255, 0, 98);
  font-family: IranSansBold;
  text-decoration: none;
  background-color: transparent !important;
}

.dropdown-item:hover,
.dropdown-item:focus {
  background-color: transparent !important;
}

.rtl .dropdown-toggle:after {
  margin-right: 0.255em;
  margin-left: 0;
  display: none;
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
