<template>
  <div>
    <!-- Hero Section -->
    <vue-particles :lineLinked="false" :moveSpeed="2" :particleSize="2"></vue-particles>
    <div class="hero-content">
      <div class="text-center container">
        <div class="row">
          <div class="col-md-12">
            <h1 class="hero-header pb-5">
              Want to Speak Like an English
              <span class="font-weight-bold text-success">Native</span>?
            </h1>
            <!-- All Courses Section -->
            <h2
              class="d-flex justify-content-start my-5 section-header text-primary"
            >Our Top Courses</h2>
            <!-- MOBILE -->
            <div class="pt-4 MOBILE d-md-none">
              <carousel
                :navigationEnabled="true"
                :loop="true"
                navigationClickTargetSize
                :speed="1200"
                :perPage="1"
              >
                <slide class="col-lg-3 col-md-4 mb-4">
                  <Course3></Course3>
                </slide>
                <slide class="col-lg-3 col-md-4 mb-4">
                  <Course2></Course2>
                </slide>
                <slide class="col-lg-3 col-md-4 mb-4">
                  <Course1></Course1>
                </slide>
              </carousel>
            </div>
            <!-- DESKTOP -->
            <div class="pt-4 DESKTOP d-none d-md-block">
              <carousel
                :navigationEnabled="true"
                :paginationEnabled="false"
                :loop="true"
                navigationClickTargetSize
                :speed="1200"
                :perPage="3"
              >
                <slide class="col-lg-4 col-md-6 mb-4">
                  <Course3></Course3>
                </slide>
                <slide class="col-lg-4 col-md-6 mb-4">
                  <Course2></Course2>
                </slide>
                <slide class="col-lg-4 col-md-6 mb-4">
                  <Course1></Course1>
                </slide>
              </carousel>
            </div>
            <router-link to="courses">
              <base-button
                native-type="submit"
                type="success"
                class="btn btn-primary btn-simple"
              >All Our Courses</base-button>
            </router-link>
          </div>
        </div>
      </div>
    </div>

    <!--Founder Section-->
    <div class="founder-section">
      <founder-section></founder-section>
    </div>

    <!-- Meetups Section PlaceHolder (coming soon)-->
    <!-- Blog Section-->
    <div>
      <blog-section></blog-section>
    </div>
  </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';
import FounderSection from './Components/FounderSection/FounderSection.vue';
import Course1 from './../Courses/ExampleCourses/Course1.vue';
import Course2 from './../Courses/ExampleCourses/Course2.vue';
import Course3 from './../Courses/ExampleCourses/Course3.vue';
import BlogSection from './Components/Blog/BlogSection.vue';

export default {
  components: {
    Carousel,
    Slide,
    FounderSection,
    Course1,
    Course2,
    Course3,
    BlogSection
  }
};
</script>


<style scoped lang="scss">
.hero-content {
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
  padding-bottom: 80px;
  min-height: 100vh;
  z-index: 999;
  // clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 5vw));
  .hero-header {
    font-size: 3.4rem;
    line-height: 3.7rem;
  }
  .special-colour {
    color: rgb(187, 255, 0);
  }
}
.founder-section {
  background: linear-gradient(180deg, #1e1e2f, rgb(86, 7, 133));
  // url(/img/frontend/founder-hero-bg-opt.png) no-repeat center;
  width: 100%;
  padding-top: 60px;
  padding-bottom: 80px;
  min-height: 50vh;
  // clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 4vw));
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 5vw));
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

.VueCarousel-navigation-button .VueCarousel-navigation-next {
  right: 18px;
  font-size: 25px;
  color: white;
  transform: translateY(-50%) translateX(100%);
  font-family: 'system';
}

// .private-classes {
//   background: linear-gradient(180deg, rgba(68, 31, 233, 0.9), #1e1e2f);
//   width: 100%;
//   padding-top: 60px;
//   padding-bottom: 80px;
//   min-height: 50vh;
//   clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 4vw));
// }

.section-header {
  font-size: 1.5rem;
  color: white;
}
h2 {
  margin-bottom: 5px !important;
}
p {
  font-size: 15px;
  padding-top: 13px;
}
</style>