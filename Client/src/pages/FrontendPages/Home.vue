<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-content-homepage">
      <div class="container-fluid">
        <div class="row">
          <div class="col-lg-5 col-md-9 hero-text-section text-right pr-5">
            <h1 class="hero-title font-dn-bold">آیا میخواهید مثل یک نیتیو انگلیسی حرف بزنید؟</h1>
            <p class="hero-subtitle">با ما همراه باشید تا بهترین ها را به شما عزیزان تقدیم کنیم.</p>
            <div class="pt-3">
              <router-link to="login">
                <base-button
                  native-type="submit"
                  type="danger"
                  class="btn animation-on-hover"
                >ورود به پنل کاربری</base-button>
              </router-link>
            </div>
          </div>
          <div class="col-lg-7 col-md-3"></div>
        </div>
      </div>
    </section>

    <div class="text-center py-3 pb-5">
      <a
        href
        v-scroll-to="{ el: '#element', duration: 950, easing: 'linear', offset: -30, force: true, cancelable: true, }"
      >
        <img class="arrow" src="img/frontend/scroll-down-arrow.svg" alt="Scroll Down Arrow">
      </a>
    </div>

    <!-- Top Courses Section -->
    <div class="container">
      <!-- Top Courses -->
      <div class="top-courses-section">
        <div class="card custom-card">
          <p class="text-center top-section-header py-2">پیشنهادهای ویژه اسک آریا برای شما</p>
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
    <div id="element" class="ou-section-homepage">
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
  background: url(/img/frontend/SVG-Background-5.svg) no-repeat;
  background-size: cover;
  background-position: center;
  min-height: 72vh;
  position: relative;
  width: 100%;
  z-index: 999;

  .hero-text-section {
    padding: 7% 0 0 0;
  }

  .section-header {
    font-size: 1.2rem;
    color: white !important;
  }
  .btn {
    padding: 10px 15px;
  }

  .hero-title {
    font-size: 4rem;
    line-height: inherit;
    color: #ffffff !important;
  }

  .hero-subtitle {
    font-size: 1.3rem;
    color: #ebebeb !important;
    line-height: inherit;
    padding: 0 0 0 40%;
  }
}
@keyframes pulse {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0.7;
  }
}
.arrow {
  animation: pulse 0.7s infinite;
  margin: 0 auto;
  display: table;
  margin-top: 20px;
  animation-direction: alternate;
  &:hover {
    cursor: pointer;
  }
}

@media (max-width: 680px) {
  .hero-content-homepage {
    background: url(/img/frontend/SVG-Background-5.svg) no-repeat;
    background-size: cover;
    background-position: bottom;
    min-height: 65vh;
    position: relative;

    .hero-text-section {
      padding: 9% 0 0 25%;
    }

    .btn {
      padding: 10px 15px;
    }

    .hero-title {
      font-size: 1.7rem;
      padding: 0;
      margin: 0;
      text-align: right;
    }
    .hero-subtitle {
      font-size: 0.9rem;
      color: rgb(109, 109, 109);
      padding: 46% 0 0 30%;
      text-align: right;
    }
  }
  .top-courses-section {
    padding: 0 10%;
  }
}

@media (max-width: 670px) and (min-width: 1020px) {
  .hero-text-section {
    padding: 9% 6% 0 16%;
  }

  .hero-title {
    font-size: 2.1rem;
    padding: 0;
    margin: 0;
  }
  .hero-subtitle {
    font-size: 0.8rem;
    color: rgb(109, 109, 109);
    padding: 0 2rem;
    margin: 0;
  }
}

.white-content .card:not(.card-white) {
  border-radius: 20px;
  background: #dfdfdf;
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
</style>