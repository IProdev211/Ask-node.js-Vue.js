<template>
  <div class="container-fluid">
    <div class="text-right">
      <div>
        <p class="info-items">
          <i class="icon far fa-address-card pl-2"></i>
          نویسنده مقاله:
          <span>{{ name }}</span>
        </p>
      </div>
      <div>
        <p class="info-items">
          <i class="icon far fa-calendar-alt pl-2"></i>
          تاریخ انتشار:
          <span class="item-date">{{ dateFormated() }}</span>
        </p>
      </div>
      <div>
        <p class="info-items post-categories">
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
.info-items {
  font-size: 0.9rem;
  font-family: IranSans;
  padding-top: 3px;

  color: rgb(230, 230, 230) !important;
  .icon {
    font-size: 1.1rem;
  }
}

span {
  font-size: 0.85rem;
  color: rgb(230, 230, 230) !important;
  font-family: IranSansBold;
  padding-right: 3px;
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

// @media (max-width: 680px) {
//   .info-items {
//     font-size: 0.75rem;
//   }
//   span {
//     font-size: 0.7rem;
//   }
// }
</style>