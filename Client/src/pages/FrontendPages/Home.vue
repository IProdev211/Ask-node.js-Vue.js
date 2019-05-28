<template>
  <div>
    <!-- <vue-particles :lineLinked="false" :moveSpeed="2" :particleSize="2"></vue-particles> -->
    <!-- Hero Section -->
    <section class="hero-content-homepage">
      <div class="container">
        <div class="row">
          <div class="col-md-4 py-4">
            <h1 class="hero-title text-center">آیا میخواهید مثل یک نیتیو انگلیسی حرف بزنید؟</h1>
            <!-- <p class="hero-subtitle text-center pt-3 px-4">
              باور ما اینست که کاربران ایرانی لایق بهترین هاو بروزترین متد آموزشی، فیلم های آموزشی و مقالات هستند.
              <br>
              <span>با ما همراه باشید تا بهترین ها را به شما عزیزان تقدیم کنیم.</span>
            </p>-->
            <p
              class="hero-subtitle text-center px-4"
            >با ما همراه باشید تا بهترین ها را به شما عزیزان تقدیم کنیم.</p>
          </div>

          <!-- Top Courses -->
          <div class="col-md-8 top-courses-section pt-4">
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
    <div class="founder-section-homepage">
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
// body {
//   background: #f8f8f8;
// }
.hero-content-homepage {
  background: linear-gradient(rgba(42, 0, 156, 0.911)),
    url(/img/frontend/hero-bg-opt.png) no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  width: 100%;
  z-index: 999;
  // min-height: 60vh;

  // clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 5vw));

  .top-courses-section {
    // background: linear-gradient(180deg, rgb(86, 7, 133), #1e1e2f);
    // clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 4vw));
    padding: 0 2%;
    .section-header {
      font-size: 1.2rem;
      color: white !important;
    }
<<<<<<< HEAD
    @media (max-width: 850px) {
      padding: 0 13%;
=======
    @media (max-width: 800px) {
      padding: 0 7%;
>>>>>>> parent of 3818955... 2.1.4.1
    }
  }
}

.founder-section-homepage {
  // background: linear-gradient(180deg, rgb(86, 7, 133), #1e1e2f);
  // url(/img/frontend/founder-hero-bg-opt.png) no-repeat center;
  width: 100%;
  padding-top: 70px;
  padding-bottom: 80px;
  min-height: 50vh;
  // clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 4vw));
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 6vw));
}

// .blog-section {
//   // background: linear-gradient(180deg, #1e1e2f, rgb(86, 7, 133));
// }

#particles-js {
  position: absolute;
  background-size: cover;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  // padding-top: 450px;
  overflow-y: hidden;
  z-index: 0;
}
.hero-title {
  font-size: 3rem;
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
  font-size: 0.9rem;
  color: rgb(177, 177, 177);
  margin: 0;
  padding: 0;
}

.fadeline2 {
  height: 1px;
  margin: 0 20%;
  background-image: linear-gradient(
    90deg,
    rgba(255, 0, 0, 0),
    rgba(181, 216, 181, 0.521) 50%,
    rgba(255, 0, 0, 0) 100%
  );
}
</style>