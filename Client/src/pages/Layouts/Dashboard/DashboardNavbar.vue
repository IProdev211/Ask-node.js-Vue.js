<template>
  <base-nav v-model="showMenu" class="navbar-absolute top-navbar" type="white" :transparent="true">
    <div slot="brand" class="navbar-wrapper">
      <!-- <div class="navbar-minimize d-inline">
        <sidebar-toggle-button/>
      </div>
      <div class="navbar-toggle d-inline" :class="{ toggled: $sidebar.showSidebar }">
        <button type="button" class="navbar-toggler" @click="toggleSidebar">
          <span class="navbar-toggler-bar bar1"></span>
          <span class="navbar-toggler-bar bar2"></span>
          <span class="navbar-toggler-bar bar3"></span>
        </button>
      </div>-->
      <a class="navbar-brand" href="/">اسک آریا</a>
    </div>

    <ul class="navbar-nav text-right" :class="$rtl.isRTL ? 'mr-auto' : 'ml-auto'">
      <a
        slot="title"
        href="#"
        class="dropdown-toggle nav-link"
        data-toggle="dropdown"
        aria-expanded="true"
      >
        <div class="d-none d-md-block row pl-3">
          <div class="photo">
            <img :src="userAvatar">
          </div>
          <div class="d-flex align-items-center pr-2 profile-link-text">
            <p class="px-2">پروفایل من</p>
            <i class="i-chevron fas fa-chevron-down"></i>
          </div>
        </div>
        <!-- <b class="caret d-none d-lg-block d-xl-block"></b> -->
        <!-- <p class="d-lg-none">پنل کاربری</p> -->

        <li class="nav-link">
          <router-link to="/dashboard" class="nav-item dropdown-item">
            <i class="far fa-user pl-2"></i>
            پنل کاربری
          </router-link>
        </li>

        <li class="nav-link">
          <router-link to="/courses" class="nav-item dropdown-item">
            <i class="fas fa-university pl-2"></i>
            دوره های آموزشی
          </router-link>
        </li>

        <li class="nav-link">
          <router-link to="/mycourses" class="nav-item dropdown-item">
            <i class="i-custom fas fa-graduation-cap pl-2"></i>
            در حال یادگیری
          </router-link>
        </li>

        <li class="nav-link">
          <router-link to="/quizzes" class="nav-item dropdown-item">
            <i class="far fa-check-square pl-2"></i>
            امتحان ها
          </router-link>
        </li>

        <li class="nav-link">
          <router-link to="/points" class="nav-item dropdown-item">
            <i class="i-custom fas fa-gem pl-2"></i>
            امتیاز
          </router-link>
        </li>

        <!-- <div class="dropdown-divider"></div> -->
        <li class="nav-link pr-3">
          <router-link class="nav-item dropdown-item" to="#" @click.native="logoutListener">خروج</router-link>
        </li>
      </a>
    </ul>
  </base-nav>
</template>
<script>
import { CollapseTransition } from 'vue2-transitions';
import { BaseNav, Modal } from '@/components';
import SidebarToggleButton from './SidebarToggleButton';
import backend from '../../../backend';

export default {
  components: {
    SidebarToggleButton,
    CollapseTransition,
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
    },
    userAvatar() {
      return (
        (this.$root.$data.user ? this.$root.$data.user.avatar : undefined) ||
        '/img/default-avatar.png'
      );
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
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
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
    }
  }
};
</script>
<style lang="scss">
.profile-link-text {
  p,
  .fas {
    font-size: 0.8em;
    color: rgb(20, 20, 20) !important;
  }
}
.navbar-nav li i {
  color: rgb(0, 0, 0) !important;
  font-size: 1.2em;
  margin-right: 10px;
  margin-left: 4px;
  align-content: right;
}
.i-custom {
  margin-right: 8px !important;
}

.i-chevron {
  margin-right: 3px !important;
}

.navbar-collapse .navbar-nav .nav-link {
  margin: 0;
  padding: 0;
}

.navbar-nav li a {
  padding: 9px 0 !important;
}

.dropdown-item,
.dropdown-item:active,
.navbar-nav li a {
  color: black;
  text-decoration: none;
  background-color: transparent;
}

.dropdown-item.active,
navbar-nav li a:active {
  color: rgb(2, 21, 107);
  font-family: IranSansBold;
  text-decoration: none;
  background-color: transparent;
}

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
      color: #141414;
      background-color: transparent;
    }
  }
}
</style>
