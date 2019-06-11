<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-content-homepage">
      <div class="hero-text-section text-center">
        <h1 class="hero-title">آیا میخواهید مثل یک نیتیو انگلیسی حرف بزنید؟</h1>
        <p class="hero-subtitle">با ما همراه باشید تا بهترین ها را به شما عزیزان تقدیم کنیم.</p>
        <div class="d-flex justify-content-center pt-2 text-center">
          <div>
            <router-link to="dashboard">
              <base-button
                native-type="submit"
                type="warning"
                class="btn animation-on-hover"
              >ورود به پنل کاربری</base-button>
            </router-link>
          </div>
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
          <div class="col-lg-4 col-md-6" v-for="course in topCourses" v-bind:key="course.id">
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
    <div id="element">
      <our-courses></our-courses>
    </div>

    <!--Improvement Banner Section-->
    <div>
      <ImprovementBanner></ImprovementBanner>
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
import ImprovementBanner from './Components/ImprovementBanners/ImprovementBanner.vue';

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
    ImprovementBanner
  }
};
</script>


<style lang="scss">
.hero-content-homepage {
  background: linear-gradient(rgba(81, 194, 217, 0.918)),
    url(/img/frontend/london-seemless-bg.svg);
  // background-size: auto;
  // background-position: center;
  // background-repeat: repeat;
  min-height: 25vh;
  position: relative;
  width: 100%;

  .hero-text-section {
    padding: 14vh 5px 8vh 5px;
  }

  .hero-title {
    font-size: 3.5em;
    line-height: inherit;
    font-family: IranSansBold;
    color: #ffffff !important;
  }

  .hero-subtitle {
    font-size: 1.3em;
    color: #f5f5f5 !important;
  }
  // .btn-info {
  //   background: hsl(98, 100%, 50%);
  // }
}

.top-courses-section {
  padding: 0 15%;
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
    background: linear-gradient(rgba(81, 194, 217, 0.918)),
      url(/img/frontend/london-seemless-bg.svg);
    background-size: auto cover;
    background-position: bottom;
    min-height: 20vh;
    position: relative;

    .hero-text-section {
      padding: 4vh 5px 4vh 5px;
    }

    .btn {
      font-size: 0.75rem;
    }
    .hero-title {
      font-size: 2rem;
      line-height: inherit;
    }
    .hero-subtitle {
      font-size: 1rem;
      color: rgb(194, 194, 194);
    }

    .hero-text-section {
      padding: 10vh 9px 10vh 9px;
    }
  }
  .top-courses-section {
    padding: 0 9%;
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
.btn {
  font-weight: inherit;
}
</style>