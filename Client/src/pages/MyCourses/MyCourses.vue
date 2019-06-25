<template>
  <div class="container">
    <div class="text-right pb-5">
      <h1 class="text-danger">دوره های در حال یادگیری</h1>
      <p class="pb-3">در این بخش دور های نقدی که در آن ثبت نام کرده اید لیست میشود</p>
    </div>
    <div class="row" v-if="courses.length">
      <div class="col-lg-3 col-md-6 mb-4" v-for="course in courses" :key="course.id">
        <Course v-bind="course" :purchased="true"></Course>
      </div>
    </div>

    <p class="no-courses-message text-right pt-5" v-else>هیچ درسی تهیه نشده است 😣</p>
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
      pages: 1
    };
  },
  methods: {
    dataLoad(page) {
      backend.get('/courses/purchased?page=' + page).then(response => {
        this.courses = response.data.docs;
        this.page = response.data.page;
        this.pages = response.data.pages;
      });
    }
  },
  mounted() {
    this.dataLoad(1);
  },
  components: {
    Course
  }
};
</script>

<style lang="scss" scoped>
h1 {
  font-family: IranSansBold;
  line-height: inherit !important;
}

.no-courses-message {
  font-size: 1.1rem;
  color: rgb(141, 141, 141);
}
p {
  font-size: 1.1rem;
  color: rgb(134, 134, 134);
}
.fadeline2 {
  display: none !important;
}
</style>
