<template>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <BlogHeader></BlogHeader>
      </div>
      <div class="card mt-5 col-md-9">
        <h2 class="pt-5 text-danger">Sample Blog</h2>
      </div>
      <div class="col-md-3">
        <BlogCategories></BlogCategories>
      </div>
    </div>
  </div>
</template>

<script>
import BlogHeader from './BlogComponents/BlogHeader.vue';
import BlogCategories from './BlogComponents/BlogCategories.vue';

export default {
  components: {
    BlogCategories,
    BlogHeader
  }
};
</script>

<style lang="scss" scoped>
.card {
  border-radius: 20px;
}
</style>
