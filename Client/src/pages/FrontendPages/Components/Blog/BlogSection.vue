<template>
  <div class="home-blog pt-5">
    <div class="container">
      <h2 class="section-header text-right">آخرین مقالات</h2>
      <p class="subtitle text-right">مقالات به‌روز و کاربردی برای افزایش سطح دانش شما</p>
      <div class="row px-4 mt-5 text-ltr">
        <div class="col-lg-3 col-md-6 blog-section" v-for="post in posts" v-bind:key="post.id">
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
.blog-section {
  padding: 0 3%;
}
.home-blog {
  background-color: #ececec;
}
.section-header {
  font-size: 1.4rem;
  font-family: IranSansBold;
  margin: 0 0 7px 0;
}
.subtitle {
  font-size: 0.95rem;
  color: rgb(150, 150, 150) !important;
}
</style>

