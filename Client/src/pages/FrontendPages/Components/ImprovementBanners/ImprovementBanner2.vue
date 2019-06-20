<template>
  <section class="bg text-right">
    <div class="container">
      <div class="row">
        <div class="col-md-6">
          <h2 class="pb-4 text-black">راه حل؟ دوره های آموزشی مجازی اسک آریا.</h2>
          <p class="main-text text-black pt-3">
            هدف اسک آریا یاددهی درست و اصولی به زبان آموزان است، آموختن با برنامه اصولی و کارآمد.
            <br>
            <br>به احتمال زیاد تا به حال بسیاری از شما در کلاس های آموزش زبان شرکت کرده اید و یا اکنون هم در حال گذراندن دوره های مربوط به خود هستید، اما بعد از مدتی متوجه عدم پیشرفت خود شده اید، چرا که بسیاری از زبان آموزان به اشتباه فکر میکنند شرکت در این کلاس ها کافی بوده و با تکیه بر آن سعی در ارتقاء سطح زبان خود دارند، در صورتی که این تنها کافی نیست.
            <br>
            <br>زبان آموز برای درک درست مفاهیم زبان، یادگیری کاربردی جملات و اصطلاحات نیاز به تمرین در محیطی سازنده همراه با استادی نیتیو و با تجربه دارد. ما این محیط را برای شما فراهم کرده ایم.
          </p>
        </div>
        <div class="col-md-6"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.bg {
  background: linear-gradient((#00ca6c00)),
    url(/img/frontend/success-banner.svg) no-repeat;
  background-position: left bottom;
  background-size: cover;
  padding: 8em 0;
}

@media (max-width: 830px) {
  .bg {
    background: linear-gradient((#001755d0)),
      url(/img/frontend/success-banner.svg) no-repeat;
    background-position: left;
    background-size: cover;
    padding: 4em 0;
  }
  .main-section {
    padding: 0;
  }

  .text-black {
    color: rgb(255, 255, 255) !important;
  }
}

h2 {
  line-height: inherit !important;
  font-family: IranSansBold;
  padding: 0;
  margin: 0;
}

.main-text {
  font-size: 1rem;
  line-height: inherit !important;
}
</style>

