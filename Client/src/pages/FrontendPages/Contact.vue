<template>
  <div class="bg">
    <div class="contactSection">
      <!--Intro Section-->
      <div class="introSection text-center pt-4">
        <div class="container">
          <h1 class="pt-2">تماس با ما</h1>
          <p class="subtitle">راه ارتباطی ما فقط از این سه طریق می باشد.</p>
        </div>
      </div>

      <!--Contact Section-->
      <div class="container text-center pt-4">
        <div class="row">
          <div class="col-md-6 text-center d-none d-md-block">
            <img
              src="img/frontend/askaryaunderground.svg"
              width="300"
              height="300"
              alt="Ask Arya london underground logo"
            >
          </div>
          <div class="col-md-6 iconSection text-left px-3 pt-5">
            <p class="lead pt-4">
              <a href="https://t.me/AskAryaSomething" class="li-ic">
                AskAryaSomething@
                <i class="fab fa-telegram mx-5 icon-text"></i>
              </a>
            </p>
            <p class="lead pt-4 text-rtl">
              <a href="tel:+989032227796" class="fb-ic">
                09032227796
                <i class="fa fa-phone mx-5 icon-text"></i>
              </a>
            </p>
            <p class="lead pt-4">
              <a href="mailto:info@askarya.ir" class="fb-ic">
                info@askarya.ir
                <i class="fa fa-envelope mx-5 icon-text"></i>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg {
  min-height: 85vh;
}

.contactSection .iconSection a,
.contactSection .iconSection i,
.contactSection .iconSection p {
  color: rgb(34, 34, 34);
  font-size: 1.7rem;
}

.contactSection .iconSection a:hover {
  color: rgb(17, 67, 133) !important;
}

.contactSection .iconSection a:hover,
.contactSection .iconSection a:hover .fa::before,
.contactSection .iconSection a:hover .fab::before {
  color: rgb(3, 108, 168) !important;
  /* font-weight: 600; */
}

.subtitle {
  font-size: 1.3rem;
}

@media (max-width: 768px) {
  .contactSection .iconSection a,
  .contactSection .iconSection i,
  .contactSection .iconSection p {
    font-size: 1.3rem;
    padding: 0;
  }
  .subtitle {
    font-size: 1rem;
  }
}
</style>