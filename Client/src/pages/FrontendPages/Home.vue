<template>
  <div>
    <!-- Hero Section -->
    <HeroSection id="hero" />
    <!-- Top Courses Section -->
    <div class="container py-5">
      <div class="top-courses-section">
        <div class="d-flex justify-content-between">
          <p class="text-right top-section-header pt-1">پیشنهادهای ویژه اسک آریا برای شما</p>
        </div>
        <div class="pt-4 padding-test">
          <div
            class="col-lg-3 col-md-6 col-sm-12 d-none d-md-block"
            v-for="course in topCourses"
            v-bind:key="course.id"
          >
            <Course v-bind="course"></Course>
          </div>
          <div class="d-sm-none">
            <el-carousel type="card" :autoplay="true" :interval="2500" arrow="always">
              <el-carousel-item v-for="course in topCourses" :key="course.id">
                <Course v-bind="course"></Course>
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="pt-5">
          <router-link to="allcourses">
            <base-button
              native-type="submit"
              type="default"
              class="btn btn-round animation-on-hover"
            >مشاهده همه دوره ها</base-button>
          </router-link>
        </div>
      </div>
    </div>

    <!--Improvement Banner 1-->
    <div class="pt-5">
      <ImprovementBanner1></ImprovementBanner1>
    </div>

    <!-- Blog Section-->
    <div id="blog" class="blog-section pb-2">
      <blog-section v-bind="{posts: topPosts}"></blog-section>
    </div>

    <!--Improvement Banner 2-->
    <div id="element" class="pt-4">
      <ImprovementBanner2></ImprovementBanner2>
    </div>

    <!--Founder Section-->
    <!-- <div class="founder-section-homepage pb-4">
      <founder-section></founder-section>
    </div>-->

    <!-- <base-button
        v-scroll-to="{
              el: '#hero',
              duration: 900,
              easing: 'linear',
              offset: -1000,
              force: true,
              cancelable: true,
              onStart: onStart,
              onDone: onDone,
              onCancel: onCancel,
              x: false,
              y: true
            }"
        native-type="submit"
        type="success"
        class="btn btn-lg btn-round go-to-top animation-on-hover"
    ></base-button>-->

    <i
      v-scroll-to="{
              el: '#hero',
              duration: 900,
              easing: 'linear',
              offset: -1000,
              force: true,
              cancelable: true,
              onStart: onStart,
              onDone: onDone,
              onCancel: onCancel,
              x: false,
              y: true
            }"
      class="fas fa-chevron-up go-to-top"
    ></i>
  </div>
</template>

<script>
import HeroSection from './Components/HeroSection/HeroSection.vue';
import FounderSection from './Components/FounderSection/FounderSection.vue';
import Course from './Components/TopCourses/Course.vue';
import BlogSection from './Components/Blog/BlogSection.vue';
import OurCourses from './Components/OurCourses/OurCourses.vue';
import ImprovementBanner1 from './Components/ImprovementBanners/ImprovementBanner1.vue';
import ImprovementBanner2 from './Components/ImprovementBanners/ImprovementBanner2.vue';
import { Carousel, CarouselItem } from 'element-ui';

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
    HeroSection,
    FounderSection,
    OurCourses,
    Course,
    BlogSection,
    ImprovementBanner1,
    ImprovementBanner2,
    [Carousel.name]: Carousel,
    [CarouselItem.name]: CarouselItem
  },

  metaInfo: {
    title: 'Ask Arya English',
    titleTemplate: '%s ← Learn English Like a Native, From a Native!',
    htmlAttrs: {
      lang: 'fa',
      amp: true
    }
  },
  metaInfo: {
    meta: [
      // OpenGraph data (Most widely used)
      { property: 'og:title', content: 'Ask Arya English' },
      { property: 'og:site_name', content: 'Ask Arya English' },
      { property: 'og:type', content: 'website' },
      {
        property: 'og:url',
        content: 'https://www.askarya.ir/'
      },
      {
        property: 'og:image',
        content: 'https://www.askarya.ir/img/askarya-logo.png'
      },
      {
        property: 'og:description',
        content:
          'ما از سریع ترین روش های آموزشی استفاده میکنیم تا یادگیری زبان آموزان در موثر ترین و کوتاه ترین زمان ممکن صورت بگیرد.'
      },
      { itemprop: 'name', content: 'Ask Arya English' },
      {
        itemprop: 'description',
        content:
          'ما از سریع ترین روش های آموزشی استفاده میکنیم تا یادگیری زبان آموزان در موثر ترین و کوتاه ترین زمان ممکن صورت بگیرد.'
      }
    ]
  },
  link: [{ rel: 'canonical', href: 'https://www.askarya.ir/' }]
};
</script>


<style lang="scss" scoped>
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

.go-to-top {
  position: fixed; /* Fixed/sticky position */
  bottom: 20px; /* Place the button at the bottom of the page */
  left: 20px; /* Place the button 30px from the left */
  z-index: 99; /* Make sure it does not overlap */
  border: none; /* Remove borders */
  outline: none; /* Remove outline */
  cursor: pointer; /* Add a mouse pointer on hover */
  padding: 10px; /* Some padding */
  border-radius: 5px; /* Rounded corners */
  font-size: 2em; /* Increase font size */
  background-color: rgba(0, 0, 0, 0.15); /* Set a background color */
}

.go-to-top:hover {
  background-color: #555; /* Add a dark-grey background on hover */
  color: white;
}

@media (max-width: 760px) {
  .go-to-top {
    bottom: 15px; /* Place the button at the bottom of the page */
    left: 15px; /* Place the button 30px from the left */
    z-index: 99; /* Make sure it does not overlap */
    padding: 0.3em; /* Some padding */
    font-size: 1.6em; /* Increase font size */
    background-color: rgba(0, 0, 0, 0.02); /* Set a background color */
    color: rgba(15, 15, 15, 0.13);
  }
}
</style>