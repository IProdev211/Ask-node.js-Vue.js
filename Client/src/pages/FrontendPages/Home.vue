<template>
  <div>
    <!-- Hero Section -->
    <vue-particles :lineLinked="false" :moveSpeed="2" :particleSize="2"></vue-particles>
    <div class="hero-content-homepage">
      <div class="container">
        <h1
          class="display-2 text-success text-center pb-5"
        >آیا میخواهید مثل یک نیتیو انگلیسی حرف بزنید؟</h1>
        <h2
          class="d-flex justify-content-start my-4 section-header-homepage"
        >دوره‌های پیشنهادی اسک آریا</h2>
        <div class="row">
          <!-- Top Courses -->
          <div class="col-lg-4 col-md-6 mb-4" v-for="course in topCourses" v-bind:key="course.id">
            <Course v-bind="course"></Course>
          </div>
        </div>

        <div class="text-center">
          <router-link to="ourcourses">
            <base-button
              native-type="submit"
              type="success"
              class="btn btn-primary btn-simple"
            >دوره های آموزشی</base-button>
          </router-link>
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
  font-size: 1.4rem;
  color: white;
}
</style>