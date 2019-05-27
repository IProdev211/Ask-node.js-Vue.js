<template>
  <base-nav v-model="showMenu" class="navbar-absolute top-navbar" type="dark" :transparent="true">
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
      <a class="navbar-brand" href="/">اسک آریا</a>
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
          <div class="photo">
            <img :src="userAvatar">
          </div>
          <b class="caret d-none d-lg-block d-xl-block"></b>
          <p class="d-lg-none">پنل کاربری</p>
        </a>
        <li class="nav-link">
          <router-link to="/dashboard" class="nav-item dropdown-item">پنل کاربری</router-link>
        </li>
        <li class="nav-link">
          <router-link to="/courses" class="nav-item dropdown-item">دوره های آموزشی</router-link>
        </li>
        <div class="dropdown-divider"></div>
        <li class="nav-link">
          <router-link class="nav-item dropdown-item" to="#" @click.native="logoutListener">خروج</router-link>
        </li>
      </base-dropdown>
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

.navbar .dropdown .dropdown-menu li a {
  color: #fff;
}
</style>
