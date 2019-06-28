<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-content-homepage">
      <div class="hero-text-section text-center">
        <h1 class="hero-title pb-3">آیا میخواهید مثل یک نیتیو انگلیسی حرف بزنید؟</h1>
        <p class="hero-subtitle">با ما همراه باشید تا بهترین ها را به شما عزیزان تقدیم کنیم.</p>
        <div class="pt-4 d-flex justify-content-center">
          <div class="pt-5 text-center">
            <router-link to="dashboard">
              <base-button
                native-type="submit"
                type="warning"
                class="btn animation-on-hover"
              >ورود به پنل کاربری</base-button>
            </router-link>
          </div>
          <div class="pt-5 pr-1 text-center">
            <router-link to="dashboard">
              <base-button
                native-type="submit"
                type="default"
                class="btn animation-on-hover"
                v-scroll-to="{ el: '#blog', duration: 950, easing: 'linear', offset: -30, force: true, cancelable: true, }"
              >مقالات آموزشی</base-button>
            </router-link>
          </div>
          <div class="pt-5 pr-1 text-center">
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
// .el-carousel__item h3 {
//   color: #475669;
//   font-size: 14px;
//   opacity: 0.75;
//   line-height: 150px;
//   margin: 0;
// }

// .el-carousel__item:nth-child(2n) {
//   background-color: #99a9bf;
// }

// .el-carousel__item:nth-child(2n + 1) {
//   background-color: #d3dce6;
// }

.hero-content-homepage {
  background: linear-gradient((180deg, #368bdbb0, #53535328)),
    url(/img/frontend/london-bg-opt.jpg);
  background-size: cover;
  background-position: bottom;
  background-repeat: no-repeat;
  min-height: 60vh;
  position: relative;
  width: 100%;

  .hero-text-section {
    padding: 15vh 25px 15vh 25px;
  }

  .hero-title {
    font-size: 4em;
    line-height: inherit;
    font-family: IranSansBold;
    color: #fff !important;
    padding: 0;
    margin: 0;
  }

  .hero-subtitle {
    font-size: 1.5em;
    font-family: IranSansDN;
    color: #fff !important;
  }
}

.top-courses-section {
  // padding: 0 6%;
}

// @keyframes pulse {
//   0% {
//     opacity: 1;
//   }
//   100% {
//     opacity: 0.7;
//   }
// }

// .arrow {
//   animation: pulse 0.7s infinite;
//   margin: 0 auto;
//   display: table;
//   margin-top: 20px;
//   animation-direction: alternate;
//   &:hover {
//     cursor: pointer;
//   }
// }

@media (max-width: 680px) {
  .hero-content-homepage {
    background: linear-gradient((180deg, #368bdbb0, #53535328)),
      url(/img/frontend/london-bg-opt.jpg);
    // background: linear-gradient(rgba(81, 194, 217, 0.918)),
    //   url(/img/frontend/london-seemless-bg.svg);
    background-size: cover;
    background-position: top right;
    min-height: 20vh;
    position: relative;

    .hero-text-section {
      padding: 4vh 2em !important;
    }

    .btn {
      font-size: 0.74rem;
      padding: 10px 7px;
    }

    .hero-title {
      font-size: 2rem;
      line-height: inherit;
    }
    .hero-subtitle {
      font-size: 1rem;
      color: rgb(194, 194, 194);
      padding: 0 2.4em !important;
    }

    .hero-text-section {
      padding: 10vh 9px 10vh 9px;
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