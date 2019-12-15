<template>
  <div>
    <TopBanner id="top"></TopBanner>
    <base-nav
      v-model="showMenu"
      type="custom"
      :transparent="false"
      menu-classes
      class="auth-navbar sticky-top"
    >
      <div slot="brand" class="navbar-wrapper">
        <router-link to="/">
          <img src="/img/askarya-logo.png" width="110" alt="Ask Arya Logo" />
        </router-link>
      </div>
      <ul class="navbar-nav">
        <router-link class="nav-item" tag="li" to="/">
          <a :class="getNavClass('home')">{{ 'خانه' }}</a>
        </router-link>

        <router-link class="nav-item" tag="li" to="/allcourses">
          <a :class="getNavClass('allcourses')">{{ 'آموزش های غیر حضوری' }}</a>
        </router-link>

        <router-link class="nav-item" tag="li" to="/privateclasses">
          <a :class="getNavClass('privateclasses')">{{ 'کلاس های حضوری' }}</a>
        </router-link>

        <router-link class="nav-item" tag="li" to="/contact">
          <a :class="getNavClass('contact')">{{ 'تماس با ما' }}</a>
        </router-link>

        <div class="d-md-none pr-3" v-if="this.$root.$data.user !== undefined">
          <router-link class="row d-flex align-items-center nav-item" tag="li" to="/dashboard">
            <div class="photo">
              <img :src="userAvatar" />
            </div>
            <div class="pr-3">
              <a :class="getNavClass('profile')">{{ 'پروفایل من' }}</a>
            </div>
          </router-link>
        </div>
      </ul>

      <ul class="navbar-nav mr-auto ipad-fix">
        <div class="row">
          <div v-if="this.$root.$data.user !== undefined">
            <div class="row">
              <ul class="navbar-nav text-right">
                <!-- <ul class="navbar-nav text-right" :class="$rtl.isRTL ? 'mr-auto' : 'ml-auto'"> -->
                <base-dropdown
                  tag="li"
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
                    <div class="user-item d-none d-md-block">
                      <div class="row pl-4">
                        <div class="photo">
                          <img :src="userAvatar" />
                        </div>
                        <div class="d-flex align-items-center pr-3 profile-link-text">
                          <p class="px-2">پروفایل من</p>
                          <i class="i-chevron fas fa-chevron-down"></i>
                        </div>
                      </div>
                    </div>
                  </a>

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

                  <!-- <li class="nav-link">
                    <router-link to="/quizzes" class="nav-item dropdown-item">
                      <i class="far fa-check-square pl-2"></i>
                      امتحان ها
                    </router-link>
                  </li>-->

                  <li class="nav-link">
                    <router-link to="/tickets" class="nav-item dropdown-item">
                      <i class="fas fa-headset pl-2"></i>
                      پشتیبانی
                    </router-link>
                  </li>

                  <li v-if="isAdmin" class="nav-link">
                    <router-link to="/managementpage" class="nav-item dropdown-item">
                      <i class="fas fa-tools pl-2"></i>
                      پنل مدیریت
                    </router-link>
                  </li>

                  <li class="nav-link nav-link-exit">
                    <router-link
                      class="nav-item dropdown-item"
                      to="#"
                      @click.native="logoutListener"
                    >
                      <i class="fas fa-sign-out-alt pl-2"></i>
                      خروج
                    </router-link>
                  </li>
                </base-dropdown>
              </ul>
            </div>
          </div>
          <div class="row login-register-buttons" v-else>
            <div class="pr-3 register-button">
              <router-link to="/register">
                <base-button native-type="submit" type="danger" class="btn-simple btn">ثبت نام</base-button>
              </router-link>
            </div>
            <div class="pr-3 login-button">
              <router-link to="/login">
                <base-button native-type="submit" type="info" class="btn-simple btn">ورود کاربر</base-button>
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

        <i
          v-scroll-to="{
              el: '#top',
              duration: 900,
              easing: 'linear',
              offset: -1000,
              force: true,
              cancelable: true,
              onStart: onStart,
              onDone: onDone,
              onCancel: onCancel,
              x: false,
              y: true
            }"
          class="fas fa-chevron-up go-to-top"
        ></i>

        <!-- FOOTER SECTION -->
        <footer class="footer-bottom">
          <div class="container">
            <div class="footer-top">
              <div class="row text-right">
                <div class="col-md-5 about-us">
                  <h4 class="title text-white">درباره اسک آریا</h4>
                  <hr class="fadeline3 d-none d-md-block" />
                  <p
                    class="text-white"
                  >اسک آریا یکی از پرتلاش‌ترین و بروزترین وبسایت های آموزشی در سطح ایران است که همیشه تلاش کرده تا بتواند جدیدترین و بروزترین مقالات و دوره‌های آموزشی را در اختیار علاقه‌مندان ایرانی قرار دهد.</p>
                </div>
                <div class="col-md-3 askarya-sections">
                  <hr class="fadeline3 d-md-none" />
                  <h4 class="title text-white">بخش های سایت</h4>
                  <hr class="fadeline3 d-none d-md-block" />
                  <ul>
                    <li class="footer-li">
                      <router-link to="/privateclasses">کلاس های حضوری</router-link>
                    </li>
                    <li class="footer-li">
                      <router-link to="/comingsoon">میت آپ</router-link>
                    </li>
                    <li class="footer-li">
                      <router-link to="/terms">قوانین و مقررات</router-link>
                    </li>
                    <li class="footer-li">
                      <router-link to="/contact">تماس با ما</router-link>
                    </li>
                  </ul>
                </div>
                <div class="col-md-4 contact-section">
                  <hr class="fadeline3 d-md-none" />
                  <h4 class="title text-white">ارتباط با ما</h4>
                  <hr class="fadeline3 d-none d-md-block" />
                  <p
                    class="pt-3 text-white"
                  >شما میتوانید با استفاده از یکی از راه‌های زیر با ما ارتباط برقرار کنید:</p>
                  <p class="telegram">
                    <a href="https://t.me/AskAryaSomething" class="li-ic">
                      شماره تلگرام:‌ 09032227796
                      <i class="fab fa-telegram icon-text pl-1"></i>
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
        <footer class="copyright text-center">
          <div class="container">
            <!-- &copy;  -->
            طراحی و تولید شده توسط
            <router-link to="/terms">اسک آریا</router-link>، با افتخار در ایران
            <i class="tim-icons icon-heart-2"></i>
            سال ١٣٩۸
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
import { BaseNav } from 'src/components';
import { ZoomCenterTransition } from 'vue2-transitions';
import TopBanner from './Components/TopBanner.vue';
import backend from '../../../backend';

export default {
  components: {
    BaseNav,
    ZoomCenterTransition,
    TopBanner
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
      // year: new Date().getFullYear(),
      pageClass: 'login-page',
      onStart: () => {},
      onDone: () => {},
      onCancel: () => {}
    };
  },
  computed: {
    title() {
      return `${this.$route.name} Page`;
    },
    userAvatar() {
      return (
        (this.$root.$data.user ? this.$root.$data.user.avatar : undefined) ||
        '/img/default-avatar.png'
      );
    },
    isAdmin() {
      // console.log(
      //   'isAdmin = ',
      //   this.$root.$data.user && this.$root.$data.user.admin
      // );
      return this.$root.$data.user && this.$root.$data.user.admin;
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
        case 'privateclasses':
          isActive = this.$route.name == 'PrivateClasses';
          break;
        case 'allcourses':
          isActive = this.$route.name == 'AllCourses';
          break;
        // case 'comingsoon':
        //   isActive = this.$route.name == 'ComingSoon';
        //   break;
        case 'contact':
          isActive = this.$route.name == 'Contact';
          break;
        case 'profile':
          isActive = this.$route.name == 'Profile';
          break;
      }
      if (isActive) {
        classes += ' text-danger';
      }
      return classes;
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
.go-to-top {
  position: fixed; /* Fixed/sticky position */
  bottom: 20px; /* Place the button at the bottom of the page */
  left: 20px; /* Place the button 30px from the left */
  z-index: 99; /* Make sure it does not overlap */
  border: none; /* Remove borders */
  outline: none; /* Remove outline */
  cursor: pointer; /* Add a mouse pointer on hover */
  padding: 10px; /* Some padding */
  border-radius: 5px; /* Rounded corners */
  font-size: 2em; /* Increase font size */
  background-color: rgba(0, 0, 0, 0.15); /* Set a background color */
}

.go-to-top:hover {
  background-color: #555; /* Add a dark-grey background on hover */
  color: white;
}

.dropdown-menu .dropdown-item:hover {
  background-color: rgba(222, 222, 222, 0) !important;
  color: #a053ee !important;
}

@media (max-width: 768px) {
  .navbar-nav {
    font-size: 1rem;
    color: #fff;
    padding: 22px 0 0 0;
  }
  .navbar-nav li {
    padding: 7px 0 !important;
    border-bottom: 1px solid #c7c7c765 !important;
    font-size: 1em !important;
  }
  .login-register-buttons {
    padding: 10px 0;
  }

  .go-to-top {
    bottom: 20px; /* Place the button at the bottom of the page */
    left: 20px; /* Place the button 30px from the left */
    z-index: 99; /* Make sure it does not overlap */
    padding: 0.3em; /* Some padding */
    font-size: 1.6em; /* Increase font size */
    background-color: rgba(0, 0, 0, 0.02); /* Set a background color */
    color: rgba(15, 15, 15, 0.13);
  }
}

.dropdown-item.active {
  color: rgb(255, 0, 98);
  background-color: transparent !important;
}

@media (min-width: 768px) and (max-width: 1000px) {
  // .ipad-fix {
  //   width: 100% !important;
  // }

  .user-item {
    padding-right: 2em !important;
  }

  .dropdown-toggle[aria-expanded='true']:after {
    display: none;
  }
}

@media (min-width: 990px) and (max-width: 1050px) {
  .navbar-collapse .navbar-nav .nav-link {
    font-size: 1.2em !important;
  }
  .navbar-nav li {
    font-size: 0.9em !important;
  }
}

.dropdown-toggle[aria-expanded='true']:after {
  display: none;
}

.profile-link-text {
  p,
  .fas {
    font-size: 0.9em;
    color: rgb(20, 20, 20);
  }
}
.navbar-nav li i {
  color: rgb(0, 0, 0);
  font-size: 1em;
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

.navbar-nav li {
  font-size: 1.2em;
  padding: 0 10px;
  color: rgb(0, 0, 0);
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
  .navbar-nav li {
    font-size: 1.2em !important;
  }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
  .navbar-nav li {
    font-size: 0.95em !important;
  }
}

.navbar-nav li a {
  padding: 9px 0 9px 10px !important;
  font-size: 0.95em;
}

.navbar-collapse .navbar-nav .nav-link .dropdown-item {
  font-size: 0.9em !important;
}

.btn {
  font-weight: inherit;
}
.text-danger {
  font-family: IranSansBold !important;
  font-size: 0.95em !important;
}
p,
.copyright {
  font-size: 0.85rem;
}

.content-custom {
  background-color: #ffffff;
  background-attachment: fixed;
}

.usertitle {
  color: #0f7bf7;
  font-size: 1.1rem;
  font-family: IranSansBold;
}

.navbar-collapse .navbar-nav .nav-link {
  color: rgb(29, 29, 29);
}

.navbar-collapse .navbar-nav .nav-link .dropdown-item {
  font-size: 0.85em !important;
  color: rgb(49, 49, 49);
  border-bottom: 1px solid #fcfcfc;
}

.navbar-collapse .navbar-nav .nav-link-exit .dropdown-item {
  color: rgb(49, 49, 49);
  border-bottom: 1px solid #fcfcfc00 !important;
}

@media (min-width: 768px) {
  .navbar-nav {
    float: none !important;
  }
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

.footer-bottom {
  background: #212942;
  padding: 25px 0;
  color: #fff !important;
  line-height: 2;
  clear: both;

  .fadeline3 {
    background-color: #777777c2;
  }

  .title {
    font-size: 1.3em;
    font-family: IranSansBold;
  }
  ul {
    list-style: none;
    padding: 0 0;
  }
  a {
    color: #fff !important;
  }
  .telegram {
    direction: ltr;
  }
  .fab {
    font-size: 1.2em;
    color: #fff !important;
  }
}

.copyright {
  padding: 20px 0;
  background: #1c2236;
  color: #fff;
}
</style>
