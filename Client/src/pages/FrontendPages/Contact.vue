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
        <div class="row">
          <!-- <div class="col-md-6 text-center d-none d-md-block">
            <img
              src="img/frontend/askaryaunderground.svg"
              width="300"
              height="300"
              alt="Ask Arya london underground logo"
            >
          </div>-->
          <div class="col-md-6"></div>
          <div class="col-md-6 iconSection text-left pl-4 pt-5">
            <p class="lead pt-4">
              <a href="https://t.me/AskAryaSomething" class="li-ic">
                AskAryaSomething@
                <i class="fab fa-telegram mx-2 icon-text"></i>
              </a>
            </p>
            <p class="lead pt-4 text-rtl">
              <a href="tel:+989032227796" class="fb-ic">
                09032227796
                <i class="fa fa-phone mx-2 icon-text"></i>
              </a>
            </p>
            <p class="lead pt-4">
              <a href="mailto:info@askarya.ir" class="fb-ic">
                info@askarya.ir
                <i class="fa fa-envelope mx-2 icon-text"></i>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.bg {
  background: url(/img/frontend/SVG-Background-3.svg) no-repeat;
  background-size: cover;
  background-position: center;
  min-height: 90vh;
  position: relative;
}

h1 {
  font-family: IranSansBold;
}
.contactSection .iconSection a,
.contactSection .iconSection i,
.contactSection .iconSection p {
  color: rgb(255, 255, 255);
  font-size: 2.1rem;
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
  font-size: 1.3rem;
}

@media (max-width: 768px) {
  .bg {
    background: url(/img/frontend/SVG-Background-3.svg) no-repeat;
    background-size: cover;
    background-position: left;
    min-height: 80vh;
    position: relative;
  }

  .contactSection .iconSection a,
  .contactSection .iconSection i,
  .contactSection .iconSection p {
    font-size: 1.5rem;
    padding: 0;
  }
  .subtitle {
    font-size: 0.9rem;
    color: rgb(199, 199, 199) !important;
  }
}
</style>