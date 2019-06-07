<template>
  <div class="blogBox pb-4">
    <router-link :to="`/blog/${slug}`">
      <div class="card">
        <img class="card-img-top" :src="image" :alt="name">
        <div class="category">{{ categories.length ? categories.pop().name : "" }}</div>
        <div class="card-body">
          <h3 class="card-title py-2">{{ name }}</h3>
          <div class="d-flex justify-content-between px-1 blog-info">
            <span>
              <i class="fa fa-eye"></i>
              {{views}}
            </span>
            <div>
              <span class="pr-2 text-rtl">{{ publishedAt }}</span>
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
        .format('D MMMM YYYY');
    }
  }
};
</script>
<style lang="scss" scoped>
.blog-info {
  color: #27408b;
}
.blogBox {
  border-radius: 15px;
}
.home-blog .card-img-top {
  border-radius: 20px 20px 0 0;
}

.home-blog .card {
  -webkit-box-shadow: 0 0 0 0 #fff;
  box-shadow: 0 5px 15px -5px rgba(83, 83, 83, 0.2);
  -webkit-transition: 0.3s;
  transition: 0.3s;
  -webkit-transform: translateY(0);
  transform: translateY(0);
  border: 1px solid rgba(218, 218, 218, 0.582);
  border-radius: 20px;
  background: transparent;
}
.card-body {
  background: #fff;
  border-radius: 0 0 20px 20px;
}
.home-blog .card:hover {
  -webkit-box-shadow: 0 10px 30px -5px rgb(107, 107, 107);
  box-shadow: 0 15px 35px -5px rgba(95, 95, 95, 0.658);
  -webkit-transform: translateY(-10px);
  transform: translateY(-10px);
  cursor: pointer;
}
.home-blog .card-title {
  color: #27408b;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 120%;
}
.home-blog .category {
  border-radius: 10px;
  position: absolute;
  padding: 3px 10px;
  margin: 10px;
  color: #fff;
  background-color: #fc0076;
  text-transform: uppercase;
  font-size: 0.85em;
}
.home-blog .card:hover .card-title {
  color: #f23030;
}
.home-blog h3 {
  color: #27408b;
}
</style>