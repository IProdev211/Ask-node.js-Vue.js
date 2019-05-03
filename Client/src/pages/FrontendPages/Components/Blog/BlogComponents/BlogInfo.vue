<template>
  <div class="container">
    <div class="row text-center text-rtl pb-3">
      <div class="col-md-4">
        <p class="info-items">
          <i class="far fa-address-card pl-2"></i>نویسنده مقاله:
          <span class="pr-2">{{ name }}</span>
        </p>
      </div>
      <div class="col-md-4">
        <p class="info-items">
          <i class="far fa-calendar-alt pl-2"></i> تاریخ انتشار:
          <span class="pr-2 item-date">{{ dateFormated() }}</span>
        </p>
      </div>
      <div class="col-md-4">
        <p class="info-items">
          <i class="fas fa-bullseye pl-2"></i>
          دسته بندی ها:
          <span
            class="pr-2"
            v-for="category of categories"
            :key="category"
          >{{category.name}}</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
export default {
  props: ['name', 'createdAt', 'categories'],
  methods: {
    dateFormated() {
      return moment(this.createdAt).format('D MMMM YYYY');
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  border-radius: 40px;
}
.info-items {
  font-size: 1.1rem;
  font-weight: 600;
  color: rgb(148, 148, 148);
}
span {
  color: rgb(165, 165, 165);
  font-size: 0.95rem;
}
.item-date {
  display: inline-block;
  direction: ltr;
}
</style>