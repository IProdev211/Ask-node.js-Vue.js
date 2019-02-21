<template>
  <div class="home-blog container pt-5">
    <h1 class="pb-5 section-header text-danger">Our Blog Posts</h1>
    <div class="row px-4">
      <div class="card-deck">
        <!-- Article 1 -->
        <div class="col-lg-3 col-md-6 py-2 pb-4">
          <Blog1></Blog1>
        </div>
        <!-- Article 2 -->
        <div class="col-lg-3 col-md-6 py-2 pb-4">
          <Blog2></Blog2>
        </div>
        <!-- Article 3 -->
        <div class="col-lg-3 col-md-6 py-2 pb-4">
          <Blog3></Blog3>
        </div>
        <!-- Article 4 -->
        <div class="col-lg-3 col-md-6 py-2 pb-4">
          <Blog4></Blog4>
        </div>
        <!-- Article 5 -->
        <div class="col-lg-3 col-md-6 py-2 pb-4">
          <Blog5></Blog5>
        </div>
        <!-- Article 6 -->
        <div class="col-lg-3 col-md-6 py-2 pb-4">
          <Blog6></Blog6>
        </div>
        <!-- Article 7 -->
        <div class="col-lg-3 col-md-6 py-2 pb-4">
          <Blog3></Blog3>
        </div>
        <!-- Article 8 -->
        <div class="col-lg-3 col-md-6 py-2 pb-4">
          <Blog1></Blog1>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Blog1 from './ExamplePosts/Blog1.vue';
import Blog2 from './ExamplePosts/Blog2.vue';
import Blog3 from './ExamplePosts/Blog3.vue';
import Blog4 from './ExamplePosts/Blog4.vue';
import Blog5 from './ExamplePosts/Blog5.vue';
import Blog6 from './ExamplePosts/Blog6.vue';
export default {
  components: {
    Blog1,
    Blog2,
    Blog3,
    Blog4,
    Blog5,
    Blog6
  }
};
</script>

<style lang="scss" scoped>
.section-header {
  font-size: 1.5rem;
  // color: white;
}
</style>

