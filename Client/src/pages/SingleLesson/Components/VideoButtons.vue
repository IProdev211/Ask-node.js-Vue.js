<template>
  <section class="container">
    <div class="d-flex justify-content-between py-2">
      <div class="next-episode">
        <base-button
          native-type="submit"
          type="default"
          class="btn animation-on-hover custom-button"
        >
          <i class="fas fa-caret-right pl-2"></i>
          جلسه بعدی
        </base-button>
      </div>

      <div class="unit-complete">
        <base-button
          native-type="submit"
          type="default"
          class="btn btn-simple animation-on-hover custom-button"
        >
          <i class="fas fa-check pl-2"></i>
          Mark Complete
        </base-button>
      </div>

      <div class="previous-episode">
        <base-button
          native-type="submit"
          type="default"
          class="btn animation-on-hover custom-button"
        >
          جلسه قبلی
          <i class="fas fa-caret-left pr-2"></i>
        </base-button>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.custom-button {
  -webkit-box-shadow: 6px 6px 4px -1px rgba(107, 107, 107, 1);
  -moz-box-shadow: 6px 6px 4px -1px rgba(107, 107, 107, 1);
  box-shadow: 6px 6px 4px -1px rgba(107, 107, 107, 1);
}

@media (max-width: 680px) {
  .custom-button {
    font-size: 0.8em !important;
    -webkit-box-shadow: 0;
    -moz-box-shadow: 0;
    box-shadow: 0;
    // -webkit-box-shadow: 6px 6px 4px -1px rgba(107, 107, 107, 1);
    // -moz-box-shadow: 6px 6px 4px -1px rgba(107, 107, 107, 1);
    // box-shadow: 6px 6px 4px -1px rgba(107, 107, 107, 1);
    padding: 5px 7px;
  }
}
</style>

