<template>
  <div class="container">
    <div class="d-flex justify-content-center text-center">
      <div>
        <p class="info-items">
          <i class="far fa-address-card pl-2"></i>نویسنده مقاله:
          <span class="pr-1">{{ name }}</span>
        </p>
      </div>
      <div class="pr-5">
        <p class="info-items">
          <i class="far fa-calendar-alt pl-2"></i> تاریخ انتشار:
          <span class="pr-1 item-date">{{ dateFormated() }}</span>
        </p>
      </div>
      <div class="pr-5">
        <p class="info-items post-categories">
          <i class="fas fa-bullseye pl-2"></i>
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
// .info {
//   padding: 0 6% !important;
// }

.info-items {
  font-size: 0.9rem;
  color: rgb(230, 230, 230) !important;
  font-family: IranSansBold;
}
span {
  font-size: 0.9rem;
  color: rgb(230, 230, 230) !important;
  font-family: IranSans;
}
.item-date {
  display: inline-block;
  direction: rtl;
}
.post-categories {
  span {
    &::after {
      content: ',';
      display: inline-block;
      padding: 0 5px;
    }
    &:last-child {
      margin-right: 0.5rem !important;
      &::after {
        display: none;
      }
    }
  }
}
</style>