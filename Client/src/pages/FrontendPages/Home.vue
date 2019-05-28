<template>
  <div>
    <vue-particles :lineLinked="false" :moveSpeed="2" :particleSize="2"></vue-particles>
    <!-- Hero Section -->
    <section class="hero-content-homepage pt-2">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-12 mt-auto mb-auto">
            <h1 class="hero-title text-center pt-3">آیا میخواهید مثل یک نیتیو انگلیسی حرف بزنید؟</h1>
            <!-- <p class="hero-subtitle text-center pt-3 px-4">
              باور ما اینست که کاربران ایرانی لایق بهترین هاو بروزترین متد آموزشی، فیلم های آموزشی و مقالات هستند.
              <br>
              <span>با ما همراه باشید تا بهترین ها را به شما عزیزان تقدیم کنیم.</span>
            </p>-->
            <p
              class="hero-subtitle text-center pt-2 px-5"
            >با ما همراه باشید تا بهترین ها را به شما عزیزان تقدیم کنیم.</p>
            <div class="d-flex justify-content-center py-4">
              <div>
                <router-link to="ourcourses">
                  <base-button
                    native-type="submit"
                    type="danger"
                    class="btn-simple btn"
                  >دوره های آموزشی</base-button>
                </router-link>
              </div>
              <div class="pr-2">
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
  background: linear-gradient(270deg, #0a2968b7, #286bc4b4),
    url(/img/frontend/hero-bg-opt.png) no-repeat;
  // background: linear-gradient(270deg, rgba(21, 11, 112, 0.808), #4f29b69f),
  //   url(/img/frontend/hero-bg-opt.png) no-repeat;
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