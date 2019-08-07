<template>
  <div class="container">
    <div class="d-flex justify-content-center flex-wrap text-center">
      <div class="item-section">
        <p class="info-items d-flex align-items-center">
          <i class="icon far fa-address-card pl-2"></i>
          نویسنده مقاله:
          <span>{{ name }}</span>
        </p>
      </div>
      <div class="w-100 d-md-none pt-1"></div>

      <div class="item-section">
        <p class="info-items d-flex align-items-center">
          <i class="icon far fa-calendar-alt pl-2"></i>
          تاریخ انتشار:
          <span class="item-date">{{ dateFormated() }}</span>
        </p>
      </div>
      <div class="w-100 d-md-none pt-1"></div>

      <div class="item-section">
        <p class="info-items post-categories d-flex align-items-center">
          <i class="icon fas fa-bullseye pl-2"></i>
          دسته بندی ها:
          <span
            v-for="category of categories"
            :key="category"
          >{{category.name}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'jalali-moment';
export default {
  props: ['name', 'createdAt', 'categories'],
  methods: {
    dateFormated() {
      return moment(this.createdAt)
        .locale('fa')
        .format('D MMMM YYYY');
    }
  }
};
</script>

<style lang="scss" scoped>
.item-section {
  padding-right: 4em;
}

@media (max-width: 680px) {
  .item-section {
    padding-right: 0;
    width: 100% !important;
  }
}

.info-items {
  font-size: 0.9rem;
  font-family: IranSansBold;
  padding-top: 3px;

  color: rgb(255, 255, 255) !important;
  .icon {
    font-size: 1.1rem;
  }
}

span {
  font-size: 0.85rem;
  color: rgb(255, 255, 255) !important;
  font-family: IranSans;
  padding-right: 5px;
}

.item-date {
  display: inline-block;
  direction: rtl;
}

.post-categories {
  span {
    &::after {
      content: '،';
      display: inline-block;
      padding: 0 0 0 5px;
    }

    &:last-child {
      margin-right: 0.1rem !important;
      &::after {
        display: none;
      }
    }
  }
}
</style>