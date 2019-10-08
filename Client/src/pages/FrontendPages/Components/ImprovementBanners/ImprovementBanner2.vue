<template>
  <section class="container">
    <div class="bg">
      <div class="text-section">
        <h2 class="pb-5">راه حل؟ دوره های آموزشی مجازی اسک آریا.</h2>
        <p class="main-text">
          هدف اسک آریا یاددهی درست و اصولی به زبان آموزان است، آموختن با برنامه اصولی و کارآمد.
          <br />
          <br />به احتمال زیاد تا به حال بسیاری از شما در کلاس های آموزش زبان شرکت کرده اید و یا اکنون هم در حال گذراندن دوره های مربوط به خود هستید، اما بعد از مدتی متوجه عدم پیشرفت خود شده اید، چرا که بسیاری از زبان آموزان به اشتباه فکر میکنند شرکت در این کلاس ها کافی بوده و با تکیه بر آن سعی در ارتقاء سطح زبان خود دارند، در صورتی که این تنها کافی نیست.
          <br />
          <br />زبان آموز برای درک درست مفاهیم زبان، یادگیری کاربردی جملات و اصطلاحات نیاز به تمرین در محیطی سازنده همراه با استادی نیتیو و با تجربه دارد. ما این محیط را برای شما فراهم کرده ایم.
        </p>

        <div class="text-left pt-3">
          <router-link to="allcourses">
            <base-button
              native-type="submit"
              type="warning"
              class="btn btn-round animation-on-hover"
            >
              <i class="fas fa-graduation-cap ml-2"></i>
              مشاهده همه دوره ها
            </base-button>
          </router-link>
        </div>
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
  background-image: linear-gradient(315deg, #ef6d89fa 0%, #ee8e6bfa 74%),
    url(/img/frontend/london-seemless-bg.svg);
  border-radius: 30px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
  -o-box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
}

.text-section {
  text-align: right;
  padding: 3em 2.5em 2em 2.5em;

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

.btn {
  box-shadow: 0 4px 6px rgba(50, 50, 93, 0.11), 0 1px 3px rgba(0, 0, 0, 0.08);
}

@media (max-width: 680px) {
  .container {
    padding-right: 0;
    padding-left: 0;
    margin-right: 0;
    margin-left: 0;
  }

  .bg {
    border-radius: 0px !important;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1) !important;
  }

  .text-left {
    text-align: center !important;
  }

  .text-section {
    padding: 1.6em;

    h2 {
      font-size: 1.6em;
      padding-top: 15px;
    }
    .main-text {
      font-size: 1.1em;
    }
  }
}
</style>

