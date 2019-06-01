<template>
  <section>
    <!-- FOOTER SECTION -->
    <footer class="copyright text-center">
      <div class="container">
        &copy; طراحی و تولید شده توسط
        <a
          class="font-weight-bold"
          href="/terms"
          target="_blank"
        >اسک آریا</a>، با افتخار در ایران
        <i class="tim-icons icon-heart-2"></i>
        سال ١٣٩٧
      </div>
    </footer>
  </section>
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
.copyright {
  padding: 20px 0;
  background: #171b2c;
  color: #fff;
}

.footer-bottom {
  // background: #37393b;
  padding: 25px 0;
  color: #fff;
  line-height: 2;

  .title {
    margin-bottom: 15px;
    font-size: 1.3em;
    font-weight: 500;
    padding-bottom: 15px;
    border-bottom: 1px solid hsla(0, 0%, 100%, 0.1);
  }
  ul {
    list-style: none;
  }
  a {
    color: #fff;
  }
  .telegram {
    direction: ltr;
  }
}
</style>


