<template>
  <el-tooltip
    content="Sidebar toggle"
    effect="light"
    :open-delay="300"
    placement="right"
  >
    <button
      class="minimize-sidebar btn btn-link btn-just-icon"
      @click="minimizeSidebar"
      rel="tooltip"
      data-original-title="Sidebar toggle"
      data-placement="right"
    >
      <i class="tim-icons icon-align-center visible-on-sidebar-regular"></i>
      <i class="tim-icons icon-bullet-list-67 visible-on-sidebar-mini"></i>
    </button>
  </el-tooltip>
</template>
<script>
export default {
  name: 'SidebarToggleButton',
  methods: {
    minimizeSidebar() {
      // Remove this code if you don't want to display notifications while minimizing sidebar
      let isMinimizedText = this.$sidebar.isMinimized
        ? 'activated'
        : 'deactivated';
      this.$notify({
        type: 'danger',
        message: `Sidebar mini ${isMinimizedText}...`,
        icon: 'tim-icons icon-bell-55'
      });
      this.$sidebar.toggleMinimize();
    }
  }
};
</script>
<style></style>
