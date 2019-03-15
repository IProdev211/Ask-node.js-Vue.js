<template>
  <router-view></router-view>
</template>

<script>
export default {
  methods: {
    initializeLayout() {
      if (this.$root.$data.user && this.$root.$data.user.lang == "fa") {
          this.$rtl.enableRTL();
          this.$i18n.locale = 'fa';
      } else {
        this.$i18n.locale = 'en';
        this.$rtl.disableRTL();
      }
    },
  },
  mounted() {
    this.initializeLayout();
  },
};
</script>
