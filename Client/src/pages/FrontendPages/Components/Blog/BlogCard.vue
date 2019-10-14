<template>
  <div class="blogBox pb-2">
    <router-link :to="`/blog/${slug}`">
      <div class="card">
        <img class="card-img-top" :src="image" :alt="name" />
        <div class="category">{{ categories.length ? categories[categories.length - 1].name : "" }}</div>
        <div class="card-body">
          <h3 class="card-title text-center" :class="isLtr ? 'title-ltr' : ''">{{ name }}</h3>
          <div class="d-flex justify-content-between card-footer">
            <span class="card-footer-text">
              {{ views }}
              <i class="fa fa-eye"></i>
            </span>

            <div class="card-footer-text">
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
.home-blog .card {
  border-radius: 25px !important;
  background: transparent;
  box-shadow: 0 8px 16px 4px rgba(0, 0, 0, 0.2) !important;
  -moz-box-shadow: 0 8px 16px 4px rgba(0, 0, 0, 0.2) !important;
  -webkit-box-shadow: 0 8px 16px 4px rgba(0, 0, 0, 0.2) !important;
  -o-box-shadow: 0 8px 16px 4px rgba(0, 0, 0, 0.2) !important;
}

.blogBox {
  border-radius: 10px;
}

.home-blog .card-img-top {
  border-radius: 25px 25px 0 0;
}

.card-body {
  background: rgb(241, 241, 241);
  border-radius: 0 0 15px 15px;
}

.home-blog .card:hover {
  -webkit-box-shadow: 0 10px 30px -5px rgba(117, 117, 117, 0.6);
  box-shadow: 40px rgba(121, 121, 121, 0.6);
  transition: transform 0.6s;
  -webkit-transform: translateY(-5px);
  transform: translateY(-5px);
  cursor: pointer;
}

.home-blog .card-title {
  color: #292929;
  font-size: 1rem;
  font-family: IranSansBold;
  line-height: inherit !important;

  @media (max-width: 680px) {
    font-size: 1.1em;
  }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
  .home-blog .card-title {
    font-size: 0.87em !important;
  }

  .card .card-footer .card-footer-text {
    font-size: 0.9em !important;
  }

  .category,
  .card-category {
    font-size: 0.75em;
  }
}

.home-blog .category {
  top: 1em;
  left: 1em;
  border-radius: 15px;
  position: absolute;
  padding: 4px 12px;
  color: rgb(54, 54, 54) !important;
  background-color: #fff !important;
  font-family: Arial, Helvetica, sans-serif;
  text-align: center !important;
}

.home-blog .card:hover .card-title {
  color: #000285;
}

.home-blog h3 {
  color: #27408b;
}

.title-ltr {
  direction: ltr;
}

.card .card-footer {
  background-color: transparent;
  border-top: 1px solid rgba(158, 158, 158, 0.1);
  padding: 1em 1.2em 0 1.2em;

  .card-footer-text {
    color: #646464 !important;
    font-size: 1em;
  }
}
</style>