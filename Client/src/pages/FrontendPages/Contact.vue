<template>
  <div class="bg">
    <div class="contactSection">
      <!--Contact Section-->
      <div class="container-fluid text-center pt-4">
        <!--Intro Section-->
        <div class="introSection pt-4">
          <h1 class="text-white pt-2">تماس با ما</h1>
          <p class="subtitle">راه ارتباطی ما فقط از این سه طریق می باشد.</p>
        </div>
        <!-- <div class="col-md-6 text-center d-none d-md-block">
            <img
              src="img/frontend/askaryaunderground.svg"
              width="300"
              height="300"
              alt="Ask Arya london underground logo"
            >
        </div>-->
        <div class="d-flex justify-content-center">
          <div class="iconSection text-left pt-5">
            <p class="pt-4">
              <a href="https://t.me/AskAryaSomething" class="li-ic">AskAryaSomething@</a>
              <i class="fab fa-telegram mr-4 icon-text"></i>
            </p>
            <p class="pt-3 text-rtl">
              <a href="tel:+989032227796" class="fb-ic">09032227796</a>
              <i class="fa fa-phone mr-4 icon-text"></i>
            </p>
            <p class="pt-3">
              <a href="mailto:info@askarya.ir" class="fb-ic">info@askarya.ir</a>
              <i class="fa fa-envelope mr-4 icon-text"></i>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.bg {
  background: url(/img/frontend/SVG-Background-4.svg) no-repeat;
  background-size: cover;
  background-position: center;
  // min-height: 90vh;
  position: relative;
}

h1 {
  font-family: IranSansBold;
}
.contactSection .iconSection a,
.contactSection .iconSection i,
.contactSection .iconSection p {
  color: rgb(255, 255, 255) !important;
  font-size: 1.5rem;
}

.contactSection .iconSection a:hover {
  color: rgb(255, 0, 157) !important;
}

.contactSection .iconSection a:hover,
.contactSection .iconSection a:hover .fa::before,
.contactSection .iconSection a:hover .fab::before {
  color: rgb(255, 0, 157) !important;
}

.subtitle {
  font-size: 1rem;
  color: rgb(218, 218, 218) !important;
}

@media (max-width: 768px) {
  .bg {
    background: url(/img/frontend/SVG-Background-4.svg) no-repeat;
    background-size: cover;
    background-position: top;
    min-height: 100vh;
    position: relative;
  }

  .contactSection .iconSection a,
  .contactSection .iconSection i,
  .contactSection .iconSection p {
    font-size: 1.4rem;
    padding: 0;
  }
  .subtitle {
    font-size: 0.9rem;
    color: rgb(218, 218, 218) !important;
  }
}
@media (max-width: 340px) {
  .bg {
    background: url(/img/frontend/SVG-Background-4.svg) no-repeat;
    background-size: cover;
    background-position: center;
    min-height: 120vh;
    position: relative;
  }
}
</style>