<template>
  <div class="container">
    <div class="unitHeader pt-2">
      <h1 class="text-center pb-2 text-success text-ltr">
        <span class="headerStyling">{{ episodes }}</span> lessons •
        <span class="headerStyling">{{ hours }}</span> Hours •
        <span class="headerStyling">{{ total }}</span> Courses
        <br>
        <h3 class="text-danger pt-3 text-rtl">محتوای جدید هر هفته اضافه می شود!</h3>
      </h1>
    </div>

    <div class="row">
      <!-- Course Go Here  -->
      <div class="col-lg-4 col-md-6 mb-4" v-for="course in courses" v-bind:key="course.id">
        <Course v-bind="course"></Course>
      </div>

      <!-- VIP  -->
      <div class="col-lg-12 my-3" v-if="!isVIP">
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
        this.pages = response.data.pages;
        this.total = response.data.total;
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
.headerStyling {
  font-size: 2.8rem;
  font-weight: bold;
  color: rgb(56, 218, 164);
}
</style>
