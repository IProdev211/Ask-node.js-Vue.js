<template>
  <div v-if="post.id">
    <div class="heading-section">
      <div class="container">
        <div class="text-center pb-2">
          <BlogHeader :title="post.name"></BlogHeader>
        </div>
        <div class="text-center pb-1">
          <img class="blog-img" :src="post.image" :alt="post.name">
        </div>
        <div class="pb-3 pt-4">
          <BlogInfo
            :name="post.author.name"
            :createdAt="post.createdAt"
            :categories="post.categories"
          ></BlogInfo>
        </div>
      </div>
    </div>
    <div class="container text-ltr py-5">
      <h3 class="subheading pt-3">{{post.name}}</h3>
      <div v-html="post.content"></div>
    </div>
  </div>
</template>

<script>
import BlogHeader from './BlogComponents/BlogHeader.vue';
import BlogInfo from './BlogComponents/BlogInfo.vue';
import backend from '../../../../backend';

export default {
  components: {
    BlogInfo,
    BlogHeader
  },
  data() {
    return {
      post: {}
    };
  },
  methods: {
    dataLoad() {
      backend.get(`blog/${this.$route.params.slug}`).then(response => {
        this.post = response.data.post;
      });
    }
  },
  mounted() {
    this.dataLoad();
  }
};
</script>

<style lang="scss" scoped>
.heading-section {
  background: #c63264;
}
p {
  font-size: 1rem;
}
.blog-img {
  width: 13rem;
}
</style>
