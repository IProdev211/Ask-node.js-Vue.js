<template>
  <div class="home-blog container pt-5">
    <h1 class="pb-5 section-header text-danger">Our Blog Posts</h1>
    <div class="row px-4">
      <div class="card-deck">
        <div class="col-lg-3 col-md-6 py-2 pb-4" v-for="post in posts" v-bind:key="post.id">
          <BlogCard v-bind="post"></BlogCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BlogCard from './BlogCard.vue';
export default {
  props: ["posts"],
  components: {
    BlogCard
  }
};
</script>

<style lang="scss" scoped>
.section-header {
  font-size: 1.5rem;
  // color: white;
}
</style>

