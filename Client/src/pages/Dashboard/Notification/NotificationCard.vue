<template>
  <div class="card container">
    <h4 class="title d-flex justify-content-start py-3">اعلانات</h4>
    <div class="py-3 text-right">
      <div class="Message py-1">
        <p>
          <i class="fas fa-shield-alt iconSize"></i> پنجشنبه ۹۷/۱۰/۲۷ ۲۳:۰۵:۴۹ - گزارش ورود به سیستم با آدرس آی پی ۱۷۸.۷۳.۲۲۰.۱۰۲ ثبت شده است. در صورتی که فکر میکنید این کار توسط شما انجام نشده هر چه سریع تر با مدیریت اسک آریا تماس بگیرید.
        </p>
      </div>
      <div class="Message pt-4">
        <p>
          <i class="fas fa-shopping-basket iconSize"></i> پنجشنبه ۹۷/۱۰/۱۳ ۲۳:۱۲:۲۰ - با تشکر از حسن انتخاب شما, خرید ....... با موفقیت انجام شد و هم اکنون می توانید بصورت کامل از این دوره استفاده کنید
        </p>
      </div>
    </div>

    <base-pagination
      class="pagination-no-border mt-auto mr-auto"
      v-model="pagination.currentPage"
      :per-page="pagination.perPage"
      :total="total"
    ></base-pagination>
  </div>
</template>
<script>
import { BasePagination } from 'src/components';

export default {
  components: {
    BasePagination
  },
  computed: {
    pagination() {
      return {
        perPage: 5,
        currentPage: 0,
        total: 0
      };
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 1.2rem;
}

.card {
  height: 100%;
  background-image: linear-gradient(#97288c, #f37335);
}

.iconSize {
  font-size: 1rem;
  padding-left: 10px;
}
</style>
