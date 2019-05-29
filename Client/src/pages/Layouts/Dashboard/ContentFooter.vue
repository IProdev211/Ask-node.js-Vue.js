<template>
  <section>
    <!-- FOOTER SECTION -->
    <footer class="footer-bottom">
      <div class="container">
        <div class="footer-top">
          <div class="row text-right">
            <div class="col-md-5 about-us">
              <h4 class="title">درباره اسک آریا</h4>
              <!-- <hr class="fadeline3"> -->
              <p>اسک آریا یکی از پرتلاش‌ترین و بروزترین وبسایت های آموزشی در سطح ایران است که همیشه تلاش کرده تا بتواند جدیدترین و بروزترین مقالات و دوره‌های آموزشی را در اختیار علاقه‌مندان ایرانی قرار دهد.</p>
            </div>
            <div class="col-md-3 askarya-sections">
              <h4 class="title">بخش های سایت</h4>
              <!-- <hr class="fadeline3"> -->
              <ul>
                <li class="footer-li">
                  <router-link to="خانه">خانه</router-link>
                </li>
                <li class="footer-li">
                  <router-link to="ourcourses">دوره های ما</router-link>
                </li>
                <li class="footer-li">
                  <router-link to="privateclasses">کلاس های حضوری</router-link>
                </li>
                <li class="footer-li">
                  <router-link to="meetups">میت آپ</router-link>
                </li>
                <li class="footer-li">
                  <router-link to="contact">تماس با ما</router-link>
                </li>
              </ul>
            </div>
            <div class="col-md-4 contact-section">
              <h4 class="title">ارتباط با ما</h4>
              <!-- <hr class="fadeline3"> -->
              <p class="pt-3">شما میتوانید با استفاده از یکی از راه‌های زیر با ما ارتباط برقرار کنید</p>
              <p class="pt-2 telegram">
                <a href="https://t.me/AskAryaSomething" class="li-ic">
                  AskAryaSomething
                  <i class="fab fa-telegram icon-text"></i>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
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
  background: #2c2e31;
  color: #fff;
}

.footer-bottom {
  background: #37393b;
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


