<template>
  <footer class="footer">
    <div class="container-fluid">
      <div class="copyright">
        &copy; طراحی و تولید شده توسط
        <a href="https://askarya.ir" target="_blank">اسک آریا</a>، با افتخار در ایران
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

