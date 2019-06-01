<template>
  <div class="home-blog pt-5">
    <div class="container">
      <h2 class="pb-5 section-header text-right">پست های وبلاگ</h2>
      <div class="row px-4 text-ltr">
        <div class="col-lg-3 col-md-6" v-for="post in posts" v-bind:key="post.id">
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
}
</style>

