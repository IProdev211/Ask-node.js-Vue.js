<template>
  <div v-if="post.id">
    <div class="heading-section">
      <div class="container">
        <div class="text-center">
          <BlogHeader :title="post.name"></BlogHeader>
          <img class="blog-img avatar" :src="post.image" :alt="post.name" />

          <div class="pt-5">
            <BlogInfo
              :name="post.author.name"
              :createdAt="post.createdAt"
              :categories="post.categories"
            ></BlogInfo>
          </div>
        </div>
      </div>
    </div>
    <div class="container text-ltr py-5">
      <h3 class="subheading text-center py-3">{{post.name}}</h3>
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
  padding: 2.5em 0;
  background-color: #1703ad;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='37' height='37' viewBox='0 0 90 90'%3E%3Ccircle fill-opacity='0.07' fill='%23ffffff' cx='45' cy='45' r='7'/%3E%3Cg fill='%23ffffff' fill-opacity='0.07'%3E%3Ccircle cx='0' cy='90' r='10'/%3E%3Ccircle cx='90' cy='90' r='10'/%3E%3Ccircle cx='90' cy='0' r='10'/%3E%3Ccircle cx='0' cy='0' r='10'/%3E%3C/g%3E%3C/svg%3E");
}

@media only screen and (min-width: 700px) {
  .row {
    padding: 2em 3.5em;
  }
  .blog-img {
    width: 13rem;
  }
}

.subheading {
  font-family: IranSansBold;
}

.blog-img {
  width: 10em;
  height: 10em;
}
</style>
