<template>
  <div class="bg">
    <div class="text-center pt-5 container">
      <h1 class="display-1 text-danger pt-3">خطای ۴۰۴</h1>
      <p class="subtitle">صفحه مورد نظر پیدا نشد</p>
      <div class="pt-5">
        <router-link to="/">
          <base-button
            native-type="submit"
            type="danger"
            class="btn btn-simple"
          >{{ 'مشاهده صفحه اصلی' }}</base-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
h1 {
  font-size: 4em;
  font-family: IranSansBold !important;
}

.subtitle {
  font-size: 1.5em;
  color: rgb(95, 95, 95) !important;
  font-family: IranSans !important;
}

.bg {
  height: 70vh;
}
</style>
