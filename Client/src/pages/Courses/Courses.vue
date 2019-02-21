<template>
  <div class="container">
    <div class="unitHeader pt-3">
      <h1 class="text-center pb-2 text-success">220 lessons • 13 Hours • 13 Courses
        <br>
        <h3 class="text-danger pt-3">New content is added every week!</h3>
      </h1>
    </div>

    <div class="row">
      <!-- Course Go Here  -->
      <div class="col-lg-4 col-md-6 mb-4">
        <Course1></Course1>
      </div>

      <div class="col-lg-4 col-md-6 mb-4">
        <Course2></Course2>
      </div>

      <div class="col-lg-4 col-md-6 mb-4">
        <Course3></Course3>
      </div>

      <!-- VIP  -->
      <div class="col-lg-12 my-3">
        <Vip></Vip>
      </div>
    </div>
  </div>
</template>

<script>
import Course1 from './ExampleCourses/Course1.vue';
import Course2 from './ExampleCourses/Course2.vue';
import Course3 from './ExampleCourses/Course3.vue';
import Vip from './Vip.vue';

export default {
  components: {
    Vip,
    Course1,
    Course2,
    Course3
  }
};
</script>
