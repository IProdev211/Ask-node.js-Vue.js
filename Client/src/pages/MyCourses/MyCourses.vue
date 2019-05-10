<template>
  <div class="container">
    <div class="text-right pb-5">
      <h1 class="text-success">دوره های در حال یادگیری</h1>
      <p class="pb-4">در این بخش دور های نقدی که در آن ثبت نام کرده اید لیست میشود</p>
      <hr class="fadeline2">
    </div>
    <div class="row" v-if="courses.length">
      <div class="col-lg-4 col-md-6 mb-4" v-for="course in courses" :key="course.id">
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
.no-courses-message {
  font-size: 1.1rem;
  color: rgb(180, 180, 180);
}
p {
  font-size: 1.1rem;
  color: rgb(180, 180, 180);
}

.fadeline2 {
  height: 1px;
  background-image: linear-gradient(
    270deg,
    rgba(255, 0, 0, 0),
    rgb(65, 65, 65) 20%,
    rgba(255, 0, 0, 0)
  );
}
</style>
