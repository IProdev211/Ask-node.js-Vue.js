<template>
  <card class="card-stats" :show-footer-line="true">
    <div class="row">
      <div class="col-5" v-if="$slots.icon || icon">
        <div class="info-icon text-center" :class="`icon-${type}`">
          <slot name="icon">
            <i :class="icon"></i>
          </slot>
        </div>
      </div>
      <div class="col-7" v-if="$slots.content || title || subTitle">
        <div class="numbers">
          <slot>
            <p v-if="subTitle" class="card-category pb-2">{{ subTitle }}</p>
            <h3 v-if="title" class="card-title">{{ title }}</h3>
          </slot>
        </div>
      </div>
    </div>
    <div class="stats d-flex justify-content-start" slot="footer" v-if="$slots.footer">
      <slot name="footer"></slot>
    </div>
  </card>
</template>
<script>
import Card from './Card.vue';

export default {
  name: 'stats-card',
  components: {
    Card
  },
  props: {
    type: {
      type: String,
      default: 'primary'
    },
    icon: String,
    title: String,
    subTitle: String
  }
};
</script>
<style scoped></style>
