<template>
  <section class="container">
    <div class="d-flex justify-content-between pb-4">
      <div class="next-question">
        <base-button
          native-type="submit"
          type="default"
          class="btn btn-simple animation-on-hover custom-button"
        >
          <i class="fas fa-caret-right pl-2"></i>
          سوال بعدی
        </base-button>
      </div>
      <div class="previous-question">
        <base-button
          native-type="submit"
          type="default"
          class="btn btn-simple animation-on-hover custom-button"
        >
          سوال قبلی
          <i class="fas fa-caret-left pr-2"></i>
        </base-button>
      </div>
    </div>

    <div class="pt-3 text-center">
      <router-link to="/gradesheet">
        <base-button native-type="submit" type="default" class="btn animation-on-hover">
          <i class="fas pl-2 fa-ban"></i>
          پایان آزمون
        </base-button>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
// .btn {
//   color: white;
// }

@media (max-width: 678px) {
  .custom-button {
    font-size: 0.9em;
    font-weight: 0;
    padding: 10px 10px;
  }
}
</style>

