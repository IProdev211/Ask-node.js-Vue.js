<template>
  <div class="home-blog container pt-5">
    <h3 class="pb-5 section-header text-danger text-right">پست های وبلاگ</h3>
    <div class="row px-4 text-ltr">
      <div class="col-lg-3 m-auto col-md-6 py-2 pb-4" v-for="post in posts" v-bind:key="post.id">
        <BlogCard
        :slug="post.slug"
        :image="post.image"
        :name="post.name"
        :createdAt="post.createdAt"
        :categories="post.categories"
        :tags="post.tags"
        :views="post.views"
        ></BlogCard>
      </div>
    </div>
  </div>
</template>

<script>
import BlogCard from './BlogCard.vue';
export default {
  props: ['posts'],
  components: {
    BlogCard
  }
};
</script>

<style lang="scss" scoped>
.section-header {
  font-size: 1.4rem;
  color: white !important;
}
</style>

