<template>
  <section class="bg text-right">
    <div class="container">
      <div class="text-block">
        <h2 class="pb-5">راه حل؟ دوره های آموزشی مجازی اسک آریا.</h2>
        <p class="main-text">
          هدف اسک آریا یاددهی درست و اصولی به زبان آموزان است، آموختن با برنامه اصولی و کارآمد.
          <br>
          <br>به احتمال زیاد تا به حال بسیاری از شما در کلاس های آموزش زبان شرکت کرده اید و یا اکنون هم در حال گذراندن دوره های مربوط به خود هستید، اما بعد از مدتی متوجه عدم پیشرفت خود شده اید، چرا که بسیاری از زبان آموزان به اشتباه فکر میکنند شرکت در این کلاس ها کافی بوده و با تکیه بر آن سعی در ارتقاء سطح زبان خود دارند، در صورتی که این تنها کافی نیست.
          <br>
          <br>زبان آموز برای درک درست مفاهیم زبان، یادگیری کاربردی جملات و اصطلاحات نیاز به تمرین در محیطی سازنده همراه با استادی نیتیو و با تجربه دارد. ما این محیط را برای شما فراهم کرده ایم.
        </p>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.bg {
  background: linear-gradient(135deg, #1abc9cef 20%, #297fb9ef 80%),
    url(/img/frontend/hero-bg-opt.png) repeat;
  background-position: center;
  background-size: cover;
}

h2 {
  font-size: 1.7em;
  line-height: inherit !important;
  color: #fff !important;
  font-family: IranSansBold;
  padding: 0;
  margin: 0;
}

.main-text {
  font-size: 1.3em;
  line-height: inherit !important;
  color: #fff !important;
}

.text-block {
  padding: 3% 0;
}

@media (max-width: 900px) {
  .bg {
    background: linear-gradient(135deg, #1abc9cea 20%, #297fb9ea 80%),
      url(/img/frontend/hero-bg-opt.png) repeat;
    background-position: right;
    background-size: cover;
    padding: 5% 0;
  }

  .text-black {
    color: rgb(255, 255, 255) !important;
    padding-left: 15px;
    padding-right: 15px;
  }
  h2 {
    font-size: 1.2rem !important;
  }

  .main-text {
    font-size: 0.9rem !important;
  }
}
</style>

