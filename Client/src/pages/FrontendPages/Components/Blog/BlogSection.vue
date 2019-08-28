<template>
  <div class="home-blog pt-5">
    <div class="container">
      <h2 class="section-header text-right">آخرین مقالات</h2>
      <p class="subtitle text-right">مقالات به‌روز و کاربردی برای افزایش سطح دانش شما</p>
      <div class="row mt-5">
        <div
          class="col-lg-3 col-md-6 col-sm-12 blog-section"
          v-for="post in posts"
          v-bind:key="post.id"
        >
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

      <!-- <div class="mt-5">
        <Carousel :perPageCustom="[[0, 1], [576, 2], [768, 3], [992, 4]]">
          <slide 
              v-for="post in posts"
              v-bind:key="post.id"
              :per-page="1">
            <BlogCard
              :slug="post.slug"
              :image="post.image"
              :name="post.name"
              :createdAt="post.createdAt"
              :categories="post.categories"
              :tags="post.tags"
              :views="post.views"
            ></BlogCard>
          </slide>
        </Carousel>
      </div>-->
    </div>
  </div>
</template>

<script>
import BlogCard from './BlogCard.vue';
// import { Carousel, Slide } from 'vue-carousel';

export default {
  props: ['posts'],
  components: {
    BlogCard
    // Carousel,
    // Slide
  }
};
</script>

<style lang="scss" scoped>
// .blog-section {
//   padding: 0 3%;
// }
@media (max-width: 680px) {
  .blog-section {
    padding: 0 16% !important;
  }
}

.section-header {
  font-size: 1.6em;
  font-family: IranSansBold;
  margin: 0 0 7px 0;
}

.subtitle {
  font-size: 0.95rem;
  color: rgb(150, 150, 150) !important;
}
</style>

