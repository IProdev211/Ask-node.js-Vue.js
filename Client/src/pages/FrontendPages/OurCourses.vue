<template>
  <div class="container pt-4">
    <h1 class="text-center pt-5">دوره‌های آموزشی</h1>
    <div class="row pt-5">
      <div class="col-lg-4 col-md-6 mb-4" v-for="course in topCourses" v-bind:key="course.id">
        <Course v-bind="course"></Course>
      </div>
    </div>
  </div>
</template>

<script>
import Course from './Components/TopCourses/Course.vue';

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
    Course
  }
};
</script>