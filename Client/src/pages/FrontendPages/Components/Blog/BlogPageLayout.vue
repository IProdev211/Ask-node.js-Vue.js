<template>
  <div v-if="post.id">
    <div class="heading-section">
      <div class="container">
        <div class="text-center">
          <BlogHeader :title="post.name"></BlogHeader>
          <img class="blog-img" :src="post.image" :alt="post.name" />
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
    <div class="main-blog-section d-flex justify-content-between">
      <div class="main-blog-text">
        <div v-html="post.content"></div>
      </div>
      <div class="sticky">
        <custom-card :class="sticky" />
      </div>
    </div>
    <div>
      <custom-card :class="SmallDevices" />
    </div>
  </div>
</template>

<script>
import BlogHeader from './BlogComponents/BlogHeader.vue';
import BlogInfo from './BlogComponents/BlogInfo.vue';
import RelatedCards from './BlogComponents/RelatedCards.vue';

import CustomCard from '../../../SingleLesson/Components/CustomCard';

import backend from '../../../../backend';

export default {
  components: {
    BlogInfo,
    BlogHeader,
    CustomCard
  },
  data() {
    return {
      post: {},
      sticky: 'sticky',
      SmallDevices: 'small-devices'
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
  padding: 2em 0;
  margin-bottom: 2em;
  background-color: #7f53ac;
  background-image: linear-gradient(to left, #9737e6 0%, #64a4ee 74%);
  border-bottom-left-radius: 30%;
  border-bottom-right-radius: 30%;
}

.blog-img {
  width: 250px;
  height: 250px;
  border-radius: 20px;
}

.main-blog-section {
  padding: 3em 5%;
}

.main-blog-text {
  margin: 0 15%;
  font-size: 1.4em !important;
  line-height: 2.1em !important;
}

.sticky {
  position: -webkit-sticky;
  position: sticky;
  top: 10em;
}

.small-devices {
  display: none;
}

@media only screen and (max-width: 1258px) {
  .heading-section {
    border-bottom-left-radius: 10%;
    border-bottom-right-radius: 10%;
  }

  .blog-img {
    width: 250px;
    height: 250px;
  }

  .main-blog-section {
    padding: 0 5% 8% 5%;
  }
  .main-blog-text {
    margin: 0 8% !important;
    font-size: 1.2em !important;
  }

  .sticky {
    display: none !important;
  }

  .small-devices {
    padding: 15px 20%;
    display: block;
  }
}
</style>
