<template>
  <div class="container">
    <div class="row text-center pb-4">
      <div class="col-md-4">
        <p class="info-items">
          <i class="far fa-address-card pl-2"></i>نویسنده مقاله:
          <span class="pr-2">آریا درودیان</span>
        </p>
      </div>
      <div class="col-md-4">
        <p class="info-items">
          <i class="far fa-calendar-alt pl-2"></i> تاریخ انتشار:
          <span class="pr-2">۱۲ اردیبهشت ۱۳۹۸</span>
        </p>
      </div>
      <div class="col-md-4">
        <p class="info-items">
          <i class="fas fa-bullseye pl-2"></i>
          دسته بندی ها:
          <span class="pr-2">IELTS</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.card {
  border-radius: 40px;
}
.info-items {
  font-size: 1rem;
}
span {
  color: rgb(206, 206, 206);
  font-weight: 600;
}
</style>