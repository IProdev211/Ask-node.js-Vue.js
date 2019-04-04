<template>
  <router-view></router-view>
</template>

<script>
export default {
  methods: {
    initializeLayout() {
      this.$rtl.enableRTL();
      this.$i18n.locale = 'fa';
    }
  },
  mounted() {
    this.initializeLayout();
  }
};
</script>
