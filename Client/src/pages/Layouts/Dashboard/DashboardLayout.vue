<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <notifications></notifications>
    <sidebar-fixed-toggle-button/>
    <side-bar
      :background-color="sidebarBackground"
      :short-title="$t('sidebar.shortTitle')"
      :title="$t('sidebar.title')"
    >
      <template slot="links">
        <sidebar-item
          :link="{
            name: $t('sidebar.dashboard'),
            icon: 'far fa-user',
            path: '/dashboard'
          }"
        ></sidebar-item>

        <sidebar-item :link="{ name: $t('sidebar.courses'), icon: 'fas fa-graduation-cap' }">
          <sidebar-item :link="{ name: $t('View All Courses'), path: '/courses' }"></sidebar-item>
          <sidebar-item :link="{ name: $t('single lesson'), path: '/singlelesson' }"></sidebar-item>
          <sidebar-item :link="{ name: $t('quiz'), path: '/quiz' }"></sidebar-item>
        </sidebar-item>

        <sidebar-item
          :link="{
            name: $t('xP Points'),
            icon: 'fas fa-gem',
            path: '/xp'
          }"
        ></sidebar-item>

        <sidebar-item :link="{ name: $t('sidebar.adminSection'), icon: 'fas fa-tools' }">
          <sidebar-item :link="{ name: $t('manage users'), path: '/manageusers' }"></sidebar-item>
          <sidebar-item :link="{ name: $t('course overview'), path: '/courseoverview' }"></sidebar-item>
          <sidebar-item :link="{ name: $t('episode overview'), path: '/episodeoverview' }"></sidebar-item>
          <sidebar-item :link="{ name: $t('create course'), path: '/createcourse' }"></sidebar-item>
          <sidebar-item :link="{ name: $t('edit course'), path: '/editcourse' }"></sidebar-item>
          <sidebar-item :link="{ name: $t('create episode'), path: '/createepisode' }"></sidebar-item>
          <sidebar-item :link="{ name: $t('edit episode'), path: '/editepisode' }"></sidebar-item>
          <sidebar-item :link="{ name: $t('create quiz'), path: '/createquiz' }"></sidebar-item>
        </sidebar-item>
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
/* eslint-disable no-new */
import PerfectScrollbar from 'perfect-scrollbar';
import 'perfect-scrollbar/css/perfect-scrollbar.css';

function hasElement(className) {
  return document.getElementsByClassName(className).length > 0;
}

function initScrollbar(className) {
  if (hasElement(className)) {
    new PerfectScrollbar(`.${className}`);
  } else {
    // try to init it later in case this component is loaded async
    setTimeout(() => {
      initScrollbar(className);
    }, 100);
  }
}

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
    }
  }
};
</script>
<style lang="scss">
.sidebar
  .nav
  li.active
  > a[data-toggle='collapse']
  + div
  .nav
  .active
  a
  .sidebar-normal {
  font-weight: 400;
  color: white;
}

.sidebar .nav li.active > a:not([data-toggle='collapse']) p {
  font-weight: 400;
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
