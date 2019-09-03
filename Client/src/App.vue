<template>
  <router-view></router-view>
</template>

<script>
export default {
  methods: {
    initializeLayout() {
      this.$rtl.enableRTL();
    }
  },
  mounted() {
    this.initializeLayout();
  }
};
</script>