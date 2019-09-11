<template>
  <section class="bg">
    <div class="container">
      <div class="text-section">
        <h2 class="pb-5">راه حل؟ دوره های آموزشی مجازی اسک آریا.</h2>
        <p class="main-text">
          هدف اسک آریا یاددهی درست و اصولی به زبان آموزان است، آموختن با برنامه اصولی و کارآمد.
          <br />
          <br />به احتمال زیاد تا به حال بسیاری از شما در کلاس های آموزش زبان شرکت کرده اید و یا اکنون هم در حال گذراندن دوره های مربوط به خود هستید، اما بعد از مدتی متوجه عدم پیشرفت خود شده اید، چرا که بسیاری از زبان آموزان به اشتباه فکر میکنند شرکت در این کلاس ها کافی بوده و با تکیه بر آن سعی در ارتقاء سطح زبان خود دارند، در صورتی که این تنها کافی نیست.
          <br />
          <br />زبان آموز برای درک درست مفاهیم زبان، یادگیری کاربردی جملات و اصطلاحات نیاز به تمرین در محیطی سازنده همراه با استادی نیتیو و با تجربه دارد. ما این محیط را برای شما فراهم کرده ایم.
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
  background-color: #ee8e6b;
  background-image: linear-gradient(315deg, #ef6d89f5 0%, #ee8e6bf6 74%),
    url(/img/frontend/london-seemless-bg.svg);
  border-radius: 30px;
  margin: 2% 12%;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
  -moz-box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
  -webkit-box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
  -o-box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
}

.text-section {
  text-align: right;
  padding: 3em 2em;

  h2 {
    font-size: 2em;
    color: #fff !important;
    line-height: inherit !important;
    font-family: IranSansBold;
    padding: 0;
    margin: 0;
  }

  .main-text {
    color: #fff !important;
    font-size: 1.3em;
    line-height: 1.7em !important;
  }
}
@media (max-width: 680px) {
  .bg {
    margin: 1.2em;
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
    -moz-box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
    -webkit-box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
    -o-box-shadow: 0 0 15px rgba(0, 0, 0, 0.6);
  }

  .text-section {
    padding: 2em 0.5em;
    h2 {
      font-size: 1.6em;
    }
    .main-text {
      font-size: 1.1em;
    }
  }
}
</style>

