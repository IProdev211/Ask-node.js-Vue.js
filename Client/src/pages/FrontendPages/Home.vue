<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-content-homepage">
      <div class="hero-text-section text-center">
        <h1 class="hero-title pb-3">آیا میخواهید مثل یک نیتیو انگلیسی حرف بزنید؟</h1>
        <!-- <p class="hero-subtitle">با ما همراه باشید تا بهترین ها را به شما عزیزان تقدیم کنیم.</p> -->
        <div class="pt-4 d-flex justify-content-center">
          <div class="pt-3 text-center">
            <router-link to="dashboard">
              <base-button
                native-type="submit"
                type="warning"
                class="btn animation-on-hover"
              >ورود به پنل کاربری</base-button>
            </router-link>
          </div>
          <div class="pt-3 pr-1 text-center">
            <router-link to="dashboard">
              <base-button
                native-type="submit"
                type="default"
                class="btn animation-on-hover"
                v-scroll-to="{ el: '#blog', duration: 950, easing: 'linear', offset: -30, force: true, cancelable: true, }"
              >مقالات آموزشی</base-button>
            </router-link>
          </div>
          <div class="pt-3 pr-1 text-center">
            <router-link to="dashboard">
              <base-button
                native-type="submit"
                type="primary"
                class="btn animation-on-hover"
                v-scroll-to="{ el: '#element', duration: 950, easing: 'linear', offset: -30, force: true, cancelable: true, }"
              >مشاهده همه دوره ها</base-button>
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- <div class="container-fluid py-4">
      <el-carousel :autoplay="true" :interval="4000" type="card" arrow="always" height="240px">
        <el-carousel-item>
          <img
            class="img-fluid"
            src="img/frontend/london-bg-opt.jpg"
            alt="Picture of our fearless leader 2"
          >
        </el-carousel-item>
        <el-carousel-item>
          <img
            class="img-fluid"
            src="img/frontend/london-bg-opt.jpg"
            alt="Picture of our fearless leader 2"
          >
        </el-carousel-item>
        <el-carousel-item>
          <img
            class="img-fluid"
            src="img/frontend/london-bg-opt.jpg"
            alt="Picture of our fearless leader 2"
          >
        </el-carousel-item>
      </el-carousel>
    </div>-->

    <!-- Top Courses Section -->
    <div class="container pt-5">
      <!-- Top Courses -->
      <div class="top-courses-section">
        <!-- <div class="card custom-card">
          <p class="text-center top-section-header py-2">پیشنهادهای ویژه اسک آریا برای شما</p>
        </div>-->
        <div class="d-flex justify-content-between">
          <p class="text-right top-section-header pt-1">پیشنهادهای ویژه اسک آریا برای شما</p>
        </div>
        <div class="row pt-4">
          <div class="col-lg-3 col-md-6" v-for="course in topCourses" v-bind:key="course.id">
            <Course v-bind="course"></Course>
          </div>
        </div>
        <div class="pt-3">
          <router-link to="#">
            <base-button
              native-type="submit"
              type="default"
              class="btn btn-sm animation-on-hover"
              v-scroll-to="{ el: '#element', duration: 950, easing: 'linear', offset: -30, force: true, cancelable: true, }"
            >مشاهده همه دوره ها</base-button>
          </router-link>
        </div>
      </div>
    </div>

    <!--Improvement Banner Section-->
    <div class="pt-5">
      <ImprovementBanner1></ImprovementBanner1>
    </div>

    <!--Our Courses Section-->
    <div id="element">
      <our-courses></our-courses>
    </div>

    <!--Improvement Banner Section-->
    <div>
      <ImprovementBanner2></ImprovementBanner2>
    </div>

    <!-- Blog Section-->
    <div id="blog" class="blog-section my-5">
      <blog-section v-bind="{posts: topPosts}"></blog-section>
    </div>

    <!--Founder Section-->
    <!-- <div class="founder-section-homepage pb-4">
      <founder-section></founder-section>
    </div>-->
  </div>
</template>

<script>
import FounderSection from './Components/FounderSection/FounderSection.vue';
import Course from './Components/TopCourses/Course.vue';
import BlogSection from './Components/Blog/BlogSection.vue';
import OurCourses from './Components/OurCourses/OurCourses.vue';
import ImprovementBanner1 from './Components/ImprovementBanners/ImprovementBanner1.vue';
import ImprovementBanner2 from './Components/ImprovementBanners/ImprovementBanner2.vue';

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
    BlogSection,
    ImprovementBanner1,
    ImprovementBanner2
  }
};
</script>

<style lang="scss" scoped>
.sticky {
  position: sticky;
  top: 0;
}

.hero-content-homepage {
  // background: linear-gradient((#6b5b5b81)), url(/img/frontend/london-bg-opt.jpg);

  // background: linear-gradient((90deg, #3b0a6881, #9730f871), #3b0a6881),
  //   url(/img/frontend/london-bg-opt.jpg);

  background: linear-gradient((90deg, #1900ff98, #b463ff69), #1900ff98),
    url(/img/frontend/london-bg-opt.jpg);

  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
  min-height: 55vh;
  position: relative;
  width: 100%;

  .hero-text-section {
    padding: 15vh 10%;
  }

  .hero-title {
    font-size: 4.1em;
    line-height: inherit;
    font-family: IranSansBold;
    color: #fff !important;
    padding: 0;
    margin: 0;
    text-shadow: 2px 2px #3a0f6349;
  }

  .hero-subtitle {
    font-size: 1.6em;
    font-family: IranSans;
    color: #fff !important;
  }
}

@media (max-width: 680px) {
  .hero-content-homepage {
    // background: linear-gradient((180deg, #631fa381, #53535328)),
    //   url(/img/frontend/london-bg-opt.jpg);

    background: linear-gradient((90deg, #1707a198, #8400ff69), #1707a198),
      url(/img/frontend/london-bg-opt.jpg);

    background-size: cover;
    background-position: top right;
    min-height: 50vh;
    position: relative;

    .hero-text-section {
      padding: 7vh 2em !important;
    }

    .btn {
      font-size: 0.74rem;
      padding: 10px 7px;
    }

    .hero-title {
      font-size: 2.4rem;
      line-height: inherit;
      color: #fff !important;
      // text-align: right;
    }
    .hero-subtitle {
      font-size: 1.2em;
      color: #fff !important;
      padding: 20px 0;
      text-align: right;
    }
  }
  .top-courses-section {
    padding: 0 9%;
  }

  .top-courses-section {
    .top-section-header {
      font-size: 1em !important;
    }

    .btn {
      padding: 8px 18px;
      margin: 0;
    }
  }
}

.white-content .card:not(.card-white) {
  border-radius: 20px;
  background: #e7e7e7ec;
  border: 0;
  position: relative;
  width: 100%;
  -webkit-box-shadow: 0 1px 20px 0px rgba(0, 0, 0, 0.4);
  box-shadow: 0 1px 20px 0px rgba(0, 0, 0, 0.1);
}
.top-section-header {
  font-size: 1.3em;
  color: rgb(216, 216, 216);
  font-family: IranSansBold;
  // margin: 0;
  // padding: 0;
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
.btn {
  font-weight: inherit;
}
</style>