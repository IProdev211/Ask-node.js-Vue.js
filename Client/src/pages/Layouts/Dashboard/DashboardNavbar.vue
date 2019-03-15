<template>
  <base-nav v-model="showMenu" class="navbar-absolute top-navbar" type="white" :transparent="true">
    <div slot="brand" class="navbar-wrapper">
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
      <a class="navbar-brand" href="/">{{ routeName }}</a>
    </div>

    <ul class="navbar-nav" :class="$rtl.isRTL ? 'mr-auto' : 'ml-auto'">
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
          <div class="photo">
            <img :src="userAvatar">
          </div>
          <b class="caret d-none d-lg-block d-xl-block"></b>
          <p class="d-lg-none">Profile</p>
        </a>
        <li class="nav-link">
          <a href="/" class="nav-item dropdown-item">Profile</a>
        </li>
        <li class="nav-link">
          <a href="courses" class="nav-item dropdown-item">Courses</a>
        </li>
        <div class="dropdown-divider"></div>
        <li class="nav-link">
          <a href="/" class="nav-item dropdown-item">Logout</a>
          <!-- <router-link class="nav-item dropdown-item" to="/">Logout</router-link> -->
        </li>
      </base-dropdown>
    </ul>
  </base-nav>
</template>
<script>
import { CollapseTransition } from 'vue2-transitions';
import { BaseNav, Modal } from '@/components';
import SidebarToggleButton from './SidebarToggleButton';

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
      return this.$root.$data.user.avatar || '/img/default-avatar-OLD.png';
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
    }
  }
};
</script>
<style scoped>
.top-navbar {
  top: 0px;
}
</style>
