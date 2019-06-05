<template>
  <div class="bg">
    <div class="text-center">
      <h1 class="display-1 text-danger">صفحه مورد نظر پیدا نشد</h1>
      <h3 class="display-2">خطای ۴۰۴</h3>
      <div class="pt-3 px-2">
        <router-link to="/">
          <base-button
            native-type="submit"
            type="success"
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
.bg {
  min-height: 100vh;
}
</style>
