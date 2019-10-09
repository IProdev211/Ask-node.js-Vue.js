<template>
  <div class="container py-5">
    <div class="d-flex justify-content-around d-flex align-items-center text-center headerDigits">
      <div>
        <h2 class="headerStyling">{{ total }}</h2>
        <p>دوره</p>
      </div>
      <span class="bullet-point">•</span>
      <div>
        <h2 class="headerStyling">{{ episodes }}</h2>
        <p>درس</p>
      </div>
      <span class="bullet-point">•</span>
      <div>
        <h2 class="headerStyling">{{ hours }}</h2>
        <p>ساعت</p>
      </div>
    </div>

    <h3
      class="headerDigitsText text-danger text-center py-4 text-rtl"
    >محتوای جدید هر هفته اضافه می شود!</h3>

    <div class="row">
      <div
        class="col-lg-3 col-md-6 col-sm-12 course-section"
        v-for="course in courses"
        v-bind:key="course.id"
      >
        <Course v-bind="course"></Course>
      </div>
    </div>
  </div>
</template>

<script>
import Course from '../FrontendPages/Components/TopCourses/Course.vue';

import backend from '../../backend';
export default {
  data: function() {
    return {
      courses: [],
      page: 1,
      pages: 1,
      isVIP:
        this.$root.$data.user &&
        new Date(this.$root.$data.user.vipTime) > new Date(),
      total: 0,
      hours: 0,
      episodes: 0
    };
  },
  methods: {
    dataLoad(page) {
      backend.get('/courses?page=' + page).then(response => {
        this.courses = response.data.docs;
        this.page = response.data.page;
        this.pages = response.data.totalPages;
        this.total = response.data.totalDocs;
        this.episodes = response.data.episodes;
        this.hours = Math.ceil(response.data.seconds / 3600);
      });
    }
  },
  mounted() {
    this.dataLoad(1);
  },
  components: {
    Course
  },
  metaInfo: {
    title:
      'آموزش های غیر حضوری | سبک آموزشی ما متناسب با استاندارهای اروپا میباشد.',

    titleTemplate:
      'آموزش های غیر حضوری | سبک آموزشی ما متناسب با استاندارهای اروپا میباشد.',
    htmlAttrs: {
      lang: 'fa',
      amp: true
    },

    meta: [
      // OpenGraph data (Most widely used)
      { property: 'og:title', content: 'اسک آریا' },
      { property: 'og:site_name', content: 'اسک آریا' },
      { property: 'og:type', content: 'website' },
      {
        property: 'og:url',
        content: 'https://www.askarya.ir/'
      },
      {
        property: 'og:image',
        content:
          'https://www.askarya.ir/img/Ask Arya LOGO 2019 - 200x200 - OPT.png'
      },
      {
        property: 'og:description',
        content:
          'ما از سريع ترین روش و متد آموزشی استفاده میکنیم که با استانداردهای آموزشی اروپا طراحی شده، تا یادگیری برای شما آسانتر و موثر تر واقع شود.'
      },
      { itemprop: 'name', content: 'اسک آریا' },
      {
        itemprop: 'description',
        content:
          'ما از سريع ترین روش و متد آموزشی استفاده میکنیم که با استانداردهای آموزشی اروپا طراحی شده، تا یادگیری برای شما آسانتر و موثر تر واقع شود.'
      }
    ],
    link: [{ rel: 'canonical', href: 'https://www.askarya.ir/' }]
  }
};
</script>

<style lang="scss" scoped>
@media (max-width: 768px) {
  .course-section {
    padding: 0 4%;
  }
}

@media (max-width: 468px) {
  .course-section {
    padding: 0 14%;
  }
}

.headerDigits {
  padding: 0 35%;
}

.headerDigitsText {
  font-size: 1.1rem;
}

.bullet-point {
  font-size: 2rem;
  color: #3cecb1d7;
}

@media only screen and (max-width: 768px) {
  .headerDigits {
    padding: 0 5%;
  }
  .headerDigitsText {
    font-size: 0.9rem;
  }
}
.headerStyling {
  font-size: 3rem;
  font-family: IranSansBold;
  color: rgb(56, 218, 164) !important;
  padding: 0px;
  margin: 0px;
}
</style>
