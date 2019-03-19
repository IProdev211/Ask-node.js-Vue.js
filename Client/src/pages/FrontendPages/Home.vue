<template>
  <div>
    <!-- Hero Section -->
    <vue-particles :lineLinked="false" :moveSpeed="2" :particleSize="2"></vue-particles>
    <div class="hero-content-homepage">
      <div class="text-center container">
        <div class="row">
          <div class="col-md-12">
            <h1
              class="hero-header font-weight-bold text-success pb-5"
            >{{ $t('frontendHome.heroMessage') }}</h1>
            <!-- All Courses Section -->
            <h2
              class="d-flex justify-content-start my-3 section-header-homepage text-primary"
            >{{ $t('frontendHome.TopCourses') }}</h2>
            <!-- MOBILE -->
            <div class="pt-4 px-3 MOBILE d-md-none">
              <carousel
                :navigationEnabled="true"
                :paginationEnabled="false"
                :loop="true"
                navigationClickTargetSize
                :speed="1200"
                :perPage="1"
              >
                <slide
                  class="col-lg-3 col-md-4 mb-4"
                  v-for="course in topCourses"
                  v-bind:key="course.id"
                >
                  <Course v-bind="course"></Course>
                </slide>
              </carousel>
            </div>
            <!-- DESKTOP -->
            <div class="pt-4 DESKTOP d-none d-md-block">
              <carousel
                :navigationEnabled="true"
                :paginationEnabled="false"
                :loop="true"
                navigationClickTargetSize
                :speed="1200"
                :perPage="3"
              >
                <slide
                  class="col-lg-4 col-md-6 mb-4"
                  v-for="course in topCourses"
                  v-bind:key="course.id"
                >
                  <Course v-bind="course"></Course>
                </slide>
              </carousel>
            </div>
            <router-link to="ourcourses">
              <base-button
                native-type="submit"
                type="success"
                class="btn btn-primary btn-simple"
              >{{ $t('frontendHome.AllCourses') }}</base-button>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!--Founder Section-->
    <div class="founder-section-homepage">
      <founder-section></founder-section>
    </div>

    <!-- Meetups Section PlaceHolder (coming soon)-->
    <!-- Blog Section-->
    <div>
      <blog-section v-bind="{posts: topPosts}"></blog-section>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import FounderSection from './Components/FounderSection/FounderSection.vue';
import Course from './Components/TopCourses/Course.vue';
import BlogSection from './Components/Blog/BlogSection.vue';

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
    Carousel,
    Slide,
    FounderSection,
    Course,
    BlogSection
  }
};
</script>


<style lang="scss">
.hero-content-homepage {
  background: linear-gradient(
      135deg,
      rgba(199, 91, 216, 0.6),
      rgba(80, 28, 201, 0.5),
      rgba(199, 91, 216, 0.6)
    ),
    url(/img/frontend/hero-bg-opt.png) no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  width: 100%;
  padding-top: 60px;
  padding-bottom: 85px;
  min-height: 100vh;
  z-index: 999;
  // clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 5vw));
  .hero-header {
    font-size: 3.4rem;
    line-height: 4rem;
  }
  .special-colour {
    color: rgb(187, 255, 0);
  }
}
.founder-section-homepage {
  background: linear-gradient(180deg, #1e1e2f, rgb(86, 7, 133));
  // url(/img/frontend/founder-hero-bg-opt.png) no-repeat center;
  width: 100%;
  padding-top: 70px;
  padding-bottom: 80px;
  min-height: 50vh;
  // clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 4vw));
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 6vw));
}
#particles-js {
  position: absolute;
  // background-size: cover;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: hidden;
  z-index: 0;
}

.VueCarousel {
  .VueCarousel-navigation-button {
    color: #fff !important;
    font-size: 30px !important;
  }
}
.section-header-homepage {
  font-size: 1.5rem;
  color: white;
}
</style>