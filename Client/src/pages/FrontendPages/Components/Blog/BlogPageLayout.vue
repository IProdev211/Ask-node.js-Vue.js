<template>
  <div class="container" v-if="post.id">
    <div class="row pb-5">
      <div class="col-12 pb-2">
        <BlogHeader :title="post.name"></BlogHeader>
      </div>
      <div class="ml-auto mr-auto pb-5 text-center">
        <img class="blog-img" :src="post.image" :alt="post.name">
      </div>
      <div class="card pt-3 col-md-12">
        <BlogInfo
          :name="post.author.name"
          :createdAt="post.createdAt"
          :categories="post.categories"
        ></BlogInfo>
      </div>
      <div class="container text-ltr py-5">
        <h3 class="subheading pt-3">{{post.name}}</h3>
        <div v-html="post.content"></div>
      </div>
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
.card {
  border-radius: 20px;
  margin: 0 20px;
  background: transparent;
}
p {
  font-size: 1rem;
}
</style>
