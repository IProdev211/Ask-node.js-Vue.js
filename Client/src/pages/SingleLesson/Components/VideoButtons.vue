<template>
  <section class="container">
    <div class="d-flex justify-content-between py-2">
      <div class="next-episode" v-if="next">
        <base-button
          native-type="submit"
          type="info"
          class="btn animation-on-hover custom-button"
          @click.prevent="nextEpisodeListener"
          :loading="loadingNext"
        >
          <i class="fas fa-caret-right pl-2"></i>
          پخش بعدی
        </base-button>
      </div>

      <div class="unit-complete">
        <base-button
          native-type="submit"
          type="default"
          class="btn btn-simple animation-on-hover custom-button"
          @click="markAsDoneListener"
          :loading="loadingMarkAsDone"
          v-if="canMarkAsDone"
        >
          {{ isDoneEpisode ? 'این بخش را ندیدم' : 'این بخش را دیدم'}}
          <i
            :class="'fas fa-' + (isDoneEpisode ? 'eye-slash text-danger ' : 'eye text-success ') + 'pr-2'"
          ></i>
        </base-button>
      </div>

      <div class="previous-episode" v-if="prev">
        <base-button
          native-type="submit"
          type="info"
          class="btn animation-on-hover custom-button"
          @click.prevent="prevEpisodeListener"
          :loading="loadingPrev"
        >
          پخش قبلی
          <i class="fas fa-caret-left pr-2"></i>
        </base-button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    next: Boolean,
    prev: Boolean,
    loadingNext: Boolean,
    loadingPrev: Boolean,
    isDoneEpisode: Boolean,
    canMarkAsDone: Boolean,
    loadingMarkAsDone: Boolean
  },
  methods: {
    nextEpisodeListener(e) {
      this.$emit('nextLesson');
    },
    prevEpisodeListener(e) {
      this.$emit('prevLesson');
    },
    markAsDoneListener(e) {
      this.$emit('markAsDone');
    }
  }
};
</script>

<style lang="scss" scoped>
.custom-button {
  -webkit-box-shadow: 3px 3px 2px -1px rgba(107, 107, 107, 0.6);
  -moz-box-shadow: 3px 3px 2px -1px rgba(107, 107, 107, 0.6);
  box-shadow: 3px 3px 2px -1px rgba(107, 107, 107, 0.6);
}

@media (max-width: 680px) {
  .custom-button {
    font-size: 0.8em !important;

    -webkit-box-shadow: 6px 6px 4px -1px rgba(107, 107, 107, 0);
    -moz-box-shadow: 6px 6px 4px -1px rgba(107, 107, 107, 0);
    box-shadow: 6px 6px 4px -1px rgba(107, 107, 107, 0);
    padding: 7px 6px;
  }
}
</style>

