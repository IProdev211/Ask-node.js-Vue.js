<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-content-homepage d-flex align-items-center">
      <div class="container">
        <h1 class="hero-title font-dn-bold text-center">آیا میخواهید مثل یک نیتیو انگلیسی حرف بزنید؟</h1>
        <p
          class="hero-subtitle text-center"
        >با ما همراه باشید تا بهترین ها را به شما عزیزان تقدیم کنیم.</p>
        <div class="d-flex justify-content-center pt-5">
          <div>
            <router-link to="ourcourses">
              <base-button
                native-type="submit"
                type="success"
                class="btn animation-on-hover"
              >ورود به پنل کاربری</base-button>
            </router-link>
          </div>
          <div class="pr-3">
            <router-link to="register">
              <base-button native-type="submit" type="warning" class="btn animation-on-hover">عضویت</base-button>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- Top Courses Section -->
    <div class="container">
      <!-- Top Courses -->
      <div class="top-courses-section">
        <div class="custom-card py-2 mt-4">
          <p class="text-center top-section-header">پیشنهادهای ویژه اسک آریا برای شما</p>
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
    <div class="ou-section-homepage">
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
  background: linear-gradient(180deg, #731bade1, #f5f5f5),
    url(/img/frontend/london-painting-bg-opt.png) no-repeat;

  // background: linear-gradient(90deg, #4305b4b4, #770ca1bb),
  //   url(/img/frontend/london-painting-bg-opt.png) no-repeat;

  background-size: cover;
  background-position: center;
  min-height: 90vh;
  position: relative;
  width: 100%;
  z-index: 999;

  .section-header {
    font-size: 1.2rem;
    color: white !important;
  }
  .btn {
    padding: 10px 15px;
  }
}
@media (max-width: 768px) {
  .top-courses-section {
    padding: 0 9%;
  }
  .hero-title {
    padding-top: 20px;
  }
}

.hero-title {
  font-size: 3.5rem;
  line-height: inherit;
  color: #ffffff !important;
}

.hero-subtitle {
  font-size: 1.5rem;
  color: #ebebeb !important;
  line-height: inherit;
  margin: 0;
  padding: 0;
}

@media (max-width: 768px) {
  .hero-content-homepage {
    min-height: 55vh;
  }
  .hero-title {
    font-size: 2.1rem;
    line-height: inherit;
    color: #dbdbdb;
  }
  .hero-subtitle {
    font-size: 1rem;
    line-height: inherit;
  }
}
.custom-card {
  border-radius: 20px;
  background: #e4e4e4;
  border: 0;
  position: relative;
  width: 100%;
  margin-bottom: 30px;
  -webkit-box-shadow: 0 1px 20px 0px rgba(0, 0, 0, 0.1);
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