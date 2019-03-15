<template>
  <div class="pt-4" id="contactSection">
    <!--Intro Section-->
    <div class="introSection text-center">
      <div class="container">
        <h1 class="hero-header text-danger">Contact Us</h1>
        <p
          class="header-sub pt-3"
        >We are pleased that we were able to awaken your interest in Ask Arya English.</p>
        <p class="header-sub pt-1">Don't hesitate to contact us :)</p>
      </div>
    </div>

    <!--Contact Section-->
    <div class="container text-center pt-5">
      <div class="row">
        <div class="col-md-6 iconSection text-left px-4 pt-4">
          <p class="lead pt-4">
            <a href="https://t.me/AskAryaSomething" class="li-ic">
              <i class="fab fa-telegram mx-5 icon-text"></i>@AskAryaSomething
            </a>
          </p>
          <p class="lead pt-4">
            <a href="tel:+989032227796" class="fb-ic">
              <i class="fa fa-phone mx-5 icon-text"></i>(+98) 0903 222 7796
            </a>
          </p>
          <p class="lead pt-4">
            <a href="mailto:info@askarya.ir" class="fb-ic">
              <i class="fa fa-envelope mx-5 icon-text"></i>info@askarya.ir
            </a>
          </p>
        </div>
        <div class="col-md-6 text-center d-none d-md-block">
          <img
            src="img/frontend/askaryaunderground.svg"
            width="300"
            height="300"
            alt="Ask Arya london underground logo"
          >
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.hero-header {
  font-size: 2.5rem;
}

.header-sub {
  font-size: 1.1rem;
}

#contactSection .iconSection a,
#contactSection .iconSection i,
#contactSection .iconSection p {
  color: #fff;
  font-size: 1.7rem;
}

#contactSection .iconSection a:hover {
  color: #eb2b36 !important;
}

#contactSection .iconSection a:hover,
#contactSection .iconSection a:hover .fa::before {
  color: #eb2b36;
}

@media (max-width: 768px) {
  #contactSection .iconSection a,
  #contactSection .iconSection i,
  #contactSection .iconSection p {
    font-size: 1.3rem;
    padding: 0;
  }
}
</style>