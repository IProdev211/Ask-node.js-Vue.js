<template>
  <div class="blogBox pb-2">
    <router-link :to="`/blog/${slug}`">
      <div class="card">
        <img class="card-img-top" :src="image" :alt="name" />
        <div class="category">{{ categories.length ? categories.pop().name : "" }}</div>
        <div class="card-body">
          <h3 class="card-title text-center pb-2">{{ name }}</h3>
          <div class="d-flex justify-content-between px-3 blog-info">
            <span class="blog-info">
              {{views}}
              <i class="fa fa-eye"></i>
            </span>
            <div class="blog-info">
              <span class="pl-2">{{ publishedAt }}</span>
              <i class="far fa-calendar-alt"></i>
            </div>
          </div>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import moment from 'jalali-moment';

export default {
  props: ['slug', 'image', 'tags', 'categories', 'name', 'createdAt', 'views'],
  computed: {
    publishedAt: function() {
      return moment(this.createdAt)
        .locale('fa')
        .format('YYYY-MM-DD');
    },
    isLtr: function() {
      const regex = /[\u0590-\u083F]|[\u08A0-\u08FF]|[\uFB1D-\uFDFF]|[\uFE70-\uFEFF]/gm;
      return !regex.test(this.name.trim());
    }
  }
};
</script>
<style lang="scss" scoped>
.blog-info {
  color: #646464;
  font-size: 0.82rem;
}
.blogBox {
  border-radius: 10px;
}
.home-blog .card-img-top {
  border-radius: 10px 10px 0 0;
}

.home-blog .card {
  -webkit-box-shadow: 0 0 0 0 #fff;
  box-shadow: 0 8px 16px 4px rgba(0, 0, 0, 0.12);
  -webkit-transition: 0.3s;
  transition: 0.3s;
  -webkit-transform: translateY(0);
  transform: translateY(0);
  border: 1px solid rgba(218, 218, 218, 0.582);
  border-radius: 20px;
  background: transparent;
}
.card-body {
  background: rgb(241, 241, 241);
  border-radius: 0 0 20px 20px;
}

.blog-info {
  color: rgba(0, 0, 0, 0.4);
}

.home-blog .card:hover {
  -webkit-box-shadow: 0 10px 30px -5px rgb(107, 107, 107);
  box-shadow: 0 15px 35px -5px rgba(95, 95, 95, 0.658);
  -webkit-transform: translateY(-10px);
  transform: translateY(-10px);
  cursor: pointer;
}
.home-blog .card-title {
  color: #292929;
  font-size: 1rem;
  font-family: IranSansBold;
  line-height: inherit !important;

  @media (max-width: 680px) {
    font-size: 0.9rem;
  }
}

.home-blog .category {
  border-radius: 10px;
  position: absolute;
  padding: 3px 10px;
  margin: 8px;
  color: rgb(211, 211, 211) !important;
  background-color: #505050 !important;
  font-family: Arial, Helvetica, sans-serif;
  // font-size: 0.85em !important;
}
.home-blog .card:hover .card-title {
  color: #000285;
}
.home-blog h3 {
  color: #27408b;
}
</style>