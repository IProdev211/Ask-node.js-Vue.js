<template>
  <div>
    <!-- Hero Section -->
    <section class="hero-content-homepage">
      <div class="hero-text-section text-center">
        <h1 class="hero-title pb-3">آیا میخواهید مثل یک بومی انگلیسی حرف بزنید؟</h1>
        <p
          class="text-center hero-subtitle py-3 hero-large"
        >باور ما اینست که کاربران ایرانی لایق بهترین ها هستند و باید بهترین و بروزترین فیلم های آموزشی و مقالات در اختیار آنها قرار بگیرد تا بتوانند به سرعت پیشرفت کنند و جزء بهترین ها شوند. با ما همراه باشید تا بهترین ها رو لایق بهترین کاربران کنیم.</p>

        <p
          class="text-center hero-subtitle py-3 hero-small"
        >با ما همراه باشید تا بهترین ها رو لایق بهترین کاربران کنیم.</p>

        <div class="pt-3 d-flex justify-content-center text-center">
          <div>
            <router-link to="login">
              <base-button
                native-type="submit"
                type="warning"
                class="btn animation-on-hover"
              >ورود به پنل کاربری</base-button>
            </router-link>
          </div>

          <div class="pr-3">
            <router-link to="allcourses">
              <base-button
                native-type="submit"
                type="primary"
                class="btn animation-on-hover"
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
    <div class="container py-5">
      <div class="top-courses-section">
        <div class="d-flex justify-content-between">
          <p class="text-right top-section-header pt-1">پیشنهادهای ویژه اسک آریا برای شما</p>
        </div>
        <div class="row pt-4">
          <div
            class="col-lg-3 col-md-6 col-sm-12"
            v-for="course in topCourses"
            v-bind:key="course.id"
          >
            <Course v-bind="course"></Course>
          </div>
        </div>
        <div class="pt-3">
          <router-link to="allcourses">
            <base-button
              native-type="submit"
              type="default"
              class="btn animation-on-hover"
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
    <div class="py-4">
      <ImprovementBanner2></ImprovementBanner2>
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
      // The list of types is available here: http://ogp.me/#types
      { property: 'og:type', content: 'website' },
      // Should the the same as your canonical link, see below.
      {
        property: 'og:url',
        content: 'https://www.askarya.ir/'
      },
      {
        property: 'og:image',
        content: 'https://www.askarya.ir/img/askarya-logo.png'
      },
      // Often the same as your meta description, but not always.
      {
        property: 'og:description',
        content:
          'زبان آموز برای درک درست مفاهیم زبان، یادگیری کاربردی جملات و اصطلاحات نیاز به تمرین در محیطی سازنده همراه با استادی نیتیو و با تجربه دارد. ما این محیط را برای شما فراهم کرده ایم.'
      },
      // Google / Schema.org markup:
      { itemprop: 'name', content: 'Ask Arya English' },
      {
        itemprop: 'description',
        content:
          'زبان آموز برای درک درست مفاهیم زبان، یادگیری کاربردی جملات و اصطلاحات نیاز به تمرین در محیطی سازنده همراه با استادی نیتیو و با تجربه دارد. ما این محیط را برای شما فراهم کرده ایم.'
      }
    ]
  },
  link: [{ rel: 'canonical', href: 'https://www.askarya.ir/' }]
};
</script>

<style lang="scss" scoped>
.sticky {
  position: sticky;
  top: 0;
}

.hero-content-homepage {
  background: linear-gradient(to left, #7028e4dc, #e5b2cade),
    url(/img/frontend/london-bg-opt.jpg);
  background-size: cover;
  background-position: bottom;
  height: 55vh !important;
  width: 100%;
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 2vw));
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 2vw));

  .hero-text-section {
    position: relative;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 0 10%;
  }

  .hero-title {
    font-size: 4.2em;
    line-height: inherit;
    font-family: IranSansBold;
    color: #fff !important;
    padding: 0;
    margin: 0;
    text-shadow: 2px 2px #300a3f27;
  }

  .hero-subtitle {
    font-size: 1.3em;
    text-shadow: 1px 1px #79797949;
    line-height: 1.6em;
    font-family: IranSansDN;
    color: rgba(255, 255, 255, 0.75) !important;
  }
  .hero-small {
    display: none;
  }

  .btn {
    font-weight: inherit;
    border-radius: 30px;
    padding: 14px 25px;
    font-size: 1.1em;
    font-family: IranSansBold;
  }
}

@media (max-width: 680px) {
  .hero-content-homepage {
    // background: linear-gradient((180deg, #30076186), #00000046),
    //   url(/img/frontend/london-bg-opt.jpg);

    background: linear-gradient(to left, #6723d4e5, #e5b2cad0),
      url(/img/frontend/london-bg-opt.jpg);
    background-size: cover;
    background-position: right;
    min-height: 40vh !important;
    // clip-path: polygon(0 0, 100% 0, 100% 90%, 0 100%);
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 6vw));
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 calc(100% - 3vw));

    .hero-text-section {
      position: relative;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 0 10%;
      text-align: right !important;
    }

    .hero-small {
      display: block;
    }

    .hero-large {
      display: none;
    }

    .btn {
      font-weight: inherit;
      border-radius: 30px;
      padding: 14px 15px;
      font-size: 0.9em;
      font-family: IranSansBold;
    }

    .hero-title {
      font-size: 2.5rem;
      line-height: inherit;
      color: #fff !important;
    }
    .hero-subtitle {
      font-size: 1.3em;
      color: rgba(255, 255, 255, 0.877) !important;
      text-align: right !important;
      line-height: 1.5em !important;
      padding-left: 4em;
    }
  }
  .top-courses-section {
    padding: 0 11%;
  }

  .top-courses-section {
    .top-section-header {
      font-size: 1em !important;
    }
  }
}

@media (max-width: 480px) {
  .hero-content-homepage {
    // background: linear-gradient((180deg, #30076186), #00000046),
    //   url(/img/frontend/london-bg-opt.jpg);

    background: linear-gradient(to left, #6723d4e5, #e5b2cad0),
      url(/img/frontend/london-bg-opt.jpg);

    background-size: cover;
    background-position: right;
    height: 65vh !important;

    .hero-text-section {
      position: relative;
      top: 43%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 0 10%;
      text-align: right !important;
    }
    .btn {
      font-weight: inherit;
      border-radius: 30px;
      padding: 10px 12px;
      font-size: 0.85em;
      font-family: IranSansBold;
    }
    .hero-title {
      font-size: 2em;
      line-height: inherit;
      color: #fff !important;
      padding-top: 35px;
    }
    .hero-subtitle {
      padding-left: 1.4em;
      font-size: 1.1em;
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