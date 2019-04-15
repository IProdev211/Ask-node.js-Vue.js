<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="copyright">
        &copy; طراحی و تولید شده توسط
        <a
          class="font-weight-bold"
          href="https://askarya.ir"
          target="_blank"
        >اسک آریا</a>، با افتخار در ایران
        <i class="tim-icons icon-heart-2"></i>
        سال ١٣٩٧
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>

<style lang="scss" scoped>
.footer {
  padding-right: 20%;
}

@media (min-width: 768px) {
  .footer {
    padding-right: 0;
  }
}
</style>


