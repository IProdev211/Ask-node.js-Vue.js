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
  background-color: #0abcf9;
  background-image: linear-gradient(135deg, #0abcf9 0%, #2c69d1 74%);
}

@media only screen and (min-width: 700px) {
  .row {
    padding: 2em 3.5em;
  }
  .blog-img {
    width: 12rem;
  }
}

.subheading {
  font-family: IranSansBold;
}

.blog-img {
  width: 9em;
  height: 9em;
}
</style>
