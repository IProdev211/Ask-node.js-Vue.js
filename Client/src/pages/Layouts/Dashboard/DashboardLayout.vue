<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <div class="container text-center">
      <notifications></notifications>
    </div>
    <side-bar :background-color="sidebarBackground">
      <template slot="links">
        <sidebar-item
          :link="{
            name: 'پنل کاربری',
            icon: 'far fa-user',
            path: '/dashboard'
          }"
        ></sidebar-item>
        <sidebar-item :link="{ name: 'همه دوره‌ها', path: '/courses', icon: 'fas fa-university' }"></sidebar-item>
        <sidebar-item
          :link="{ name: 'در حال یادگیری', path: '/mycourses', icon: 'fas fa-graduation-cap' }"
        ></sidebar-item>
        <sidebar-item :link="{ name: 'امتحان ها', path: '/quizzes', icon: 'far fa-check-square' }"></sidebar-item>

        <sidebar-item :link="{ name: 'پشتیبانی', path: '/tickets', icon: 'fas fa-headset' }"></sidebar-item>

        <sidebar-item
          v-if="isAdmin"
          :link="{ name: 'پنل مدیریت', path: '/managementpage', icon: 'fas fa-tools' }"
        ></sidebar-item>

        <hr class="line mt-4" />

        <div class="pr-4 text-right d-flex align-items-center">
          <i class="fas fa-power-off"></i>
          <router-link
            class="nav-item dropdown-item exitButton"
            to="#"
            @click.native="logoutListener"
          >خروج</router-link>
        </div>
      </template>
    </side-bar>
    <div class="main-panel" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>
      <router-view name="header"></router-view>
      <div :class="{ content: !$route.meta.hideContent }" @click="toggleSidebar">
        <zoom-center-transition :duration="200" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </zoom-center-transition>
      </div>
      <content-footer v-if="!$route.meta.hideFooter"></content-footer>
    </div>
  </div>
</template>

<script>
import backend from '../../../backend';
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

// function initScrollbar(className) {
//   if (hasElement(className)) {
//     new PerfectScrollbar(`.${className}`);
//   } else {
//     // try to init it later in case this component is loaded async
//     setTimeout(() => {
//       initScrollbar(className);
//     }, 100);
//   }
// }

import DashboardNavbar from './DashboardNavbar.vue';
import ContentFooter from './ContentFooter.vue';
import DashboardContent from './Content.vue';
import SidebarFixedToggleButton from './SidebarFixedToggleButton.vue';
import { SlideYDownTransition, ZoomCenterTransition } from 'vue2-transitions';

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
    SidebarFixedToggleButton,
    DashboardContent,
    SlideYDownTransition,
    ZoomCenterTransition
  },
  data() {
    return {
      sidebarBackground: 'red' //vue|blue|orange|green|red|primary
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
    initScrollbar() {
      let docClasses = document.body.classList;
      let isWindows = navigator.platform.startsWith('Win');
      if (isWindows) {
        // if we are on windows OS we activate the perfectScrollbar function
        initScrollbar('sidebar');
        initScrollbar('sidebar-wrapper');

        docClasses.add('perfect-scrollbar-on');
      } else {
        docClasses.add('perfect-scrollbar-off');
      }
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
.exitButton {
  font-size: 1em;
  color: #fff !important;
  padding: 0;
  margin: 0;

  .fas {
    color: #fff !important;
  }
}

.line {
  border-top: 1px solid rgba(255, 255, 255, 0.178);
}

.content {
  background-color: #f5f4f4 !important;
  min-height: 80vh !important;
}
.sidebar
  .nav
  li.active
  > a[data-toggle='collapse']
  + div
  .nav
  .active
  a
  .sidebar-normal {
  font-family: IranSansBold;
  font-size: 1.1rem;
  color: white;
}

.rtl .sidebar .nav a {
  font-size: 0.95rem;
  color: rgb(216, 216, 216);
}

.sidebar .nav li.active > a:not([data-toggle='collapse']) p {
  font-size: 1.2rem;
  font-family: IranSansBold;
}

.dropdown-item:hover,
.dropdown-item:active {
  background-color: transparent !important;
}

$scaleSize: 0.95;
@keyframes zoomIn95 {
  from {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
  to {
    opacity: 1;
  }
}

.main-panel .zoomIn {
  animation-name: zoomIn95;
}

@keyframes zoomOut95 {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    transform: scale3d($scaleSize, $scaleSize, $scaleSize);
  }
}

.main-panel .zoomOut {
  animation-name: zoomOut95;
}
</style>