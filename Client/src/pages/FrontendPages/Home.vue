<template>
  <div>
    <!-- <vue-particles :lineLinked="false" :moveSpeed="2" :particleSize="2"></vue-particles> -->
    <!-- Hero Section -->
    <section class="hero-content-homepage pt-2">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-12 mt-auto mb-auto">
            <h1 class="hero-title text-center pt-3">آیا میخواهید مثل یک نیتیو انگلیسی حرف بزنید؟</h1>
            <p
              class="hero-subtitle text-center pt-2 px-5"
            >با ما همراه باشید تا بهترین ها را به شما عزیزان تقدیم کنیم.</p>
            <div class="d-flex justify-content-center py-5">
              <div>
                <router-link to="ourcourses">
                  <base-button
                    native-type="submit"
                    type="info"
                    class="btn-simple btn"
                  >دوره های آموزشی</base-button>
                </router-link>
              </div>
              <div class="pr-3">
                <router-link to="register">
                  <base-button native-type="submit" type="success" class="btn-simple btn">عضویت</base-button>
                </router-link>
              </div>
            </div>
          </div>
          <!-- Top Courses -->
          <div class="col-lg-8 col-md-12 top-courses-section pt-4">
            <div class="row">
              <div class="col-lg-4 col-md-6" v-for="course in topCourses" v-bind:key="course.id">
                <Course v-bind="course"></Course>
              </div>
            </div>
            <p class="text-center top-section-header pb-3">پیشنهادهای ویژه اسک آریا برای شما</p>
          </div>
        </div>
      </div>
    </section>
    <!--Stats Section-->
    <div class="Stats-section-homepage pt-4 pb-2">
      <Stats></Stats>
    </div>
    <!--Founder Section-->
    <div class="founder-section-homepage py-5">
      <founder-section></founder-section>
    </div>
    <hr class="fadeline2">
    <!-- Blog Section-->
    <div class="blog-section pb-3">
      <blog-section v-bind="{posts: topPosts}"></blog-section>
    </div>
  </div>
</template>

<script>
import FounderSection from './Components/FounderSection/FounderSection.vue';
import Course from './Components/TopCourses/Course.vue';
import BlogSection from './Components/Blog/BlogSection.vue';
import Stats from './Components/Stats/Stats.vue';

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
    BlogSection,
    Stats
  }
};
</script>


<style lang="scss">
.hero-content-homepage {
  // background-color: #34246b;
  // background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Cpolygon fill='%23120a5c' points='957 450 539 900 1396 900'/%3E%3Cpolygon fill='%231f129e' points='957 450 872.9 900 1396 900'/%3E%3Cpolygon fill='%2329085e' points='-60 900 398 662 816 900'/%3E%3Cpolygon fill='%234e008a' points='337 900 398 662 816 900'/%3E%3Cpolygon fill='%233a0660' points='1203 546 1552 900 876 900'/%3E%3Cpolygon fill='%23620077' points='1203 546 1552 900 1162 900'/%3E%3Cpolygon fill='%23490461' points='641 695 886 900 367 900'/%3E%3Cpolygon fill='%236c0066' points='587 900 641 695 886 900'/%3E%3Cpolygon fill='%23560262' points='1710 900 1401 632 1096 900'/%3E%3Cpolygon fill='%23700057' points='1710 900 1401 632 1365 900'/%3E%3Cpolygon fill='%23630063' points='1210 900 971 687 725 900'/%3E%3Cpolygon fill='%23700c4b' points='943 900 1210 900 971 687'/%3E%3C/svg%3E");
  // background-attachment: fixed;
  // background-size: cover;
  background: linear-gradient(90deg, #4305b4b4, #770ca1bb),
    url(/img/frontend/hero-bg-opt.png) no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  width: 100%;
  z-index: 999;
  .top-courses-section {
    padding: 0 1%;
    .section-header {
      font-size: 1.2rem;
      color: white !important;
    }
    @media (max-width: 850px) {
      padding: 0 13%;
    }
  }
}

.hero-title {
  font-size: 2.6rem;
  line-height: inherit;
  font-weight: 600;
  color: #dbdbdb;
  margin: 0;
  padding: 0;
}

.hero-subtitle {
  font-size: 0.9rem;
  color: #cecece;
  line-height: inherit;
  margin: 0;
  padding: 0;
}

#particles-js {
  position: absolute;
  background-size: cover;
  color: #979797;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow-y: hidden;
  z-index: 0;
}

@media (max-width: 768px) {
  .hero-content-homepage {
    min-height: 55vh;
  }
  .hero-title {
    font-size: 1.9rem;
    line-height: inherit;
    font-weight: 600;
    color: #dbdbdb;
  }
  .hero-subtitle {
    font-size: 0.95rem;
    line-height: inherit;
  }
}

.top-section-header {
  font-size: 0.8rem;
  color: rgb(150, 150, 150);
  margin: 0;
  padding: 0;
}

.fadeline2 {
  height: 1px;
  margin: 20px 20% 0 20%;
  background-image: linear-gradient(
    to right,
    rgba(255, 255, 255, 0),
    rgba(255, 255, 255, 0.15),
    rgba(255, 255, 255, 0)
  );
}
</style>