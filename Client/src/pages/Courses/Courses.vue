<template>
  <div class="container pb-5 mb-5">
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
      <!-- Courses  -->
      <div
        class="col-lg-3 col-md-6 course-section"
        v-for="course in courses"
        v-bind:key="course.id"
      >
        <Course v-bind="course"></Course>
      </div>

      <!-- VIP -->
      <div class="col-lg-12 my-5">
        <Vip></Vip>
      </div>
    </div>
  </div>
</template>

<script>
import Course from '../FrontendPages/Components/TopCourses/Course.vue';

import backend from '../../backend';
import Vip from './Vip.vue';

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
    Vip,
    Course
  }
};
</script>

<style lang="scss" scoped>
.headerDigits {
  padding: 0 36%;
}

.headerDigitsText {
  font-size: 1.1rem;
}

.headerStyling {
  font-size: 4em;
  font-family: IranSansBold;
  color: rgb(17, 207, 144);
  padding: 0px;
  margin: 0px;
}

.bullet-point {
  font-size: 2rem;
  color: rgb(17, 207, 144);
}

@media only screen and (max-width: 768px) {
  .headerDigits {
    padding: 0 5%;
  }
  .headerDigitsText {
    font-size: 0.9rem;
  }
}

@media (max-width: 768px) {
  .course-section {
    padding: 0 7%;
  }
}
</style>
