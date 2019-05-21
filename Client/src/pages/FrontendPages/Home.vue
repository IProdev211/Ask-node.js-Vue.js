<template>
  <div>
    <vue-particles :lineLinked="false" :moveSpeed="2" :particleSize="2"></vue-particles>
    <!-- Hero Section -->
    <section class="hero-content-homepage py-5 d-flex align-items-center">
      <div class="container">
        <div class="row">
          <div class="col pb-5">
            <h1 class="hero-title text-center">آیا میخواهید مثل یک نیتیو انگلیسی حرف بزنید؟</h1>
            <p
              class="hero-subtitle text-center px-4"
            >باور ما اینست که کاربران ایرانی لایق بهترین هاو بروزترین متد آموزشی، فیلم های آموزشی و مقالات هستند. با ما همراه باشید تا بهترین ها را به شما عزیزان تقدیم کنیم.</p>
          </div>
        </div>
        <!-- Top Courses -->
        <div class="top-courses-section">
          <div class="col-lg-4 col-md-6" v-for="course in topCourses" v-bind:key="course.id">
            <Course v-bind="course"></Course>
          </div>
        </div>
        <div class="col d-flex justify-content-center py-4">
          <div>
            <router-link to="/ourcourses">
              <base-button
                native-type="submit"
                type="info"
                class="btn btn-primary"
              >مشاهده همه دوره ها</base-button>
            </router-link>
          </div>
          <div class="pr-2">
            <router-link to="/register">
              <base-button native-type="submit" type="warning" class="btn btn-primary">عضویت</base-button>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <section class="top-courses-section">
      <div class="container">
        <!-- <p class="text-right section-header pb-2">پیشنهادهای ویژه اسک آریا برای شما</p> -->
        <!-- <hr class="fadeline2"> -->
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
.hero-content-homepage {
  // background: linear-gradient(
  //     135deg,
  //     rgba(199, 91, 216, 0.5),
  //     rgba(80, 28, 201, 0.5),
  //     rgba(57, 127, 218, 0.6)
  //   ),
  //   url(/img/frontend/hero-bg-opt.png) no-repeat;
  // background-size: cover;
  // background-position: center;
  // position: relative;
  // width: 100%;
  // min-height: 60vh;
  // z-index: 999;
  // clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 5vw));
  // background: linear-gradient(180deg, rgb(86, 7, 133), #1e1e2f);
  background: linear-gradient(180deg, rgb(61, 32, 163), #1e1e2f);

  .special-colour {
    color: rgb(187, 255, 0);
  }
  .top-courses-section {
    // background: linear-gradient(180deg, rgb(86, 7, 133), #1e1e2f);
    // clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 4vw));
    padding: 0 10%;
    .section-header {
      font-size: 1.2rem;
      color: white !important;
    }
    // @media (min-width: 800px) {
    //   padding: 0 24%;
    // }
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
  font-size: 3.2rem;
  line-height: inherit;
  font-weight: 600;
  color: #dbdbdb;
}

.hero-subtitle {
  font-size: 1rem;
  line-height: inherit;
}

@media (max-width: 768px) {
  .hero-content-homepage {
    min-height: 55vh;
  }
  .hero-title {
    font-size: 2rem;
    line-height: inherit;
    font-weight: 600;
    color: #dbdbdb;
  }
  .hero-subtitle {
    font-size: 1rem;
    line-height: inherit;
  }
  #particles-js {
    padding-top: 600px;
  }
}

.section-header-homepage {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.658);
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