<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-content-homepage">
      <div class="container">
        <div class="row">
          <div class="col-lg-5 col-md-9 hero-text-section text-right pt-4 px-2">
            <h1 class="hero-title">آیا میخواهید مثل یک نیتیو انگلیسی حرف بزنید؟</h1>
            <p
              class="hero-subtitle text-right"
            >با ما همراه باشید تا بهترین ها را به شما عزیزان تقدیم کنیم.</p>
            <!-- <div class="pt-3 text-center">
              <router-link to="login">
                <base-button
                  native-type="submit"
                  type="danger"
                  class="btn btn-sm animation-on-hover"
                >ورود به پنل کاربری</base-button>
              </router-link>
            </div>-->
          </div>
          <div class="col-lg-7 col-md-3"></div>
        </div>
      </div>
    </section>

    <!-- <div class="text-center py-3 pb-5">
      <a
        href
        v-scroll-to="{ el: '#element', duration: 950, easing: 'linear', offset: -30, force: true, cancelable: true, }"
      >
        <img class="arrow" src="img/frontend/scroll-down-arrow.svg" alt="Scroll Down Arrow">
      </a>
    </div>-->

    <!-- Top Courses Section -->
    <div class="container pt-4">
      <!-- Top Courses -->
      <div class="top-courses-section">
        <div class="card custom-card">
          <p class="text-center top-section-header py-2">پیشنهادهای ویژه اسک آریا برای شما</p>
        </div>
        <div class="row">
          <div class="col-lg-3 col-md-6" v-for="course in topCourses" v-bind:key="course.id">
            <Course v-bind="course"></Course>
          </div>
        </div>
      </div>
    </div>

    <!--Founder Section-->
    <div class="founder-section-homepage pt-5">
      <founder-section></founder-section>
    </div>

    <!--Our Courses Section-->
    <div id="element" class="ou-section-homepage">
      <our-courses></our-courses>
    </div>
    <!-- Blog Section-->
    <div class="blog-section">
      <blog-section v-bind="{posts: topPosts}"></blog-section>
    </div>
  </div>
</template>

<script>
import FounderSection from './Components/FounderSection/FounderSection.vue';
import Course from './Components/TopCourses/Course.vue';
import BlogSection from './Components/Blog/BlogSection.vue';
import OurCourses from './Components/OurCourses/OurCourses.vue';

export default {
  data: function() {
    return {
      topCourses: [],
      topPosts: []
    };
  },
  methods: {
    dataLoad() {
      this.topCourses = this.$root.$data.topCourses;
      this.topPosts = this.$root.$data.topPosts;
    }
  },
  mounted() {
    this.dataLoad();
  },
  watch() {},
  components: {
    FounderSection,
    OurCourses,
    Course,
    BlogSection
  }
};
</script>


<style lang="scss">
.hero-content-homepage {
  background: url(/img/frontend/svg-bg.svg) no-repeat;
  background-size: cover;
  background-position: left;
  min-height: 70vh;
  position: relative;
  width: 100%;
  z-index: 999;

  .hero-title {
    font-size: 3.6rem;
    font-family: IranSansBold;
    line-height: inherit;
    color: #ffffff !important;
  }

  .hero-subtitle {
    font-size: 1.4rem;
    color: #ebebeb !important;
    line-height: inherit;
    padding: 0 0 0 40%;
  }
  .section-header {
    font-size: 1.2rem;
    color: white !important;
  }
}
@keyframes pulse {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.7;
  }
}

.arrow {
  animation: pulse 0.7s infinite;
  margin: 0 auto;
  display: table;
  margin-top: 20px;
  animation-direction: alternate;
  &:hover {
    cursor: pointer;
  }
}

@media (max-width: 680px) {
  .hero-content-homepage {
    background: url(/img/frontend/svg-bg-mobile.svg) no-repeat;
    background-size: cover;
    background-position: bottom;
    min-height: 90vh;
    position: relative;

    .hero-title {
      font-size: 2.2rem;
      text-align: center !important;
      padding: 0 1rem;
    }
    .hero-subtitle {
      font-size: 0.85rem;
      text-align: center !important;
      color: rgb(139, 139, 139);
      padding: 0 1rem;
    }
  }
  .top-courses-section {
    padding: 0 7%;
  }
}

.white-content .card:not(.card-white) {
  border-radius: 20px;
  background: #dfdfdf;
  border: 0;
  position: relative;
  width: 100%;
  -webkit-box-shadow: 0 1px 20px 0px rgba(0, 0, 0, 0.4);
  box-shadow: 0 1px 20px 0px rgba(0, 0, 0, 0.1);
}
.top-section-header {
  font-size: 0.9rem;
  color: rgb(216, 216, 216);
  margin: 0;
  padding: 0;
}

.fadeline2 {
  height: 1px;
  margin: 40px 20% 0 20%;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0)
  );
}
</style>