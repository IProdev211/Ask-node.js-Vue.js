<template>
  <div v-if="post.id">
    <div class="heading-section">
      <div class="container text-center">
        <BlogHeader :title="post.name"></BlogHeader>
        <img class="blog-img" :src="post.image" :alt="post.name" />
        <div class="my-4">
          <BlogInfo
            :name="post.author.name"
            :createdAt="post.createdAt"
            :categories="post.categories"
          ></BlogInfo>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="main-blog-section">
        <h3 class="post-title">{{post.name}}</h3>
        <div class="row">
          <div class="card main-blog-text col-lg-9 col-md-12">
            <div v-html="post.content"></div>
          </div>

          <div class="sticky col-lg-3 col-md-12">
            <custom-card :class="sticky" />
          </div>
        </div>
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
  border-bottom-left-radius: 25%;
  border-bottom-right-radius: 25%;
}

.blog-img {
  width: 250px;
  height: 250px;
  border-radius: 20px;
}

.post-title {
  text-align: center;
  font-family: IranSansBold;
  padding-bottom: 2em;
}

.main-blog-section {
  padding: 2em 0 5em 0;
}

.main-blog-text {
  // margin: 0 15%;
  padding: 4%;
  font-size: 1.3em !important;
  line-height: 2.1em !important;
  direction: ltr !important;
  font-family: IranSans;
}

.white-content .card:not(.card-white) {
  margin-top: 1em;
  background: #ffffff;
  -webkit-box-shadow: 0 1px 15px 0 rgba(123, 123, 123, 0.137);
  box-shadow: 0 1px 15px 0 rgba(155, 155, 155, 0.158);
  border-radius: 15px;
}

.sticky {
  position: -webkit-sticky;
  position: sticky;
  margin-top: 1em;
  top: 7em;
  padding: 0 1.3em;
}

.small-devices {
  display: none;
}

@media only screen and (max-width: 767px) {
  .heading-section {
    border-bottom-left-radius: 1%;
    border-bottom-right-radius: 1%;
  }

  .blog-img {
    width: 250px;
    height: 250px;
  }

  .main-blog-section {
    padding: 0 3% 8% 3%;
  }
  .main-blog-text {
    margin: 0 !important;
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
