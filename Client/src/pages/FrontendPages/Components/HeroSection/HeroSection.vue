<template>
  <section class="hero-content-homepage">
    <div class="container d-none d-md-block">
      <div class="row d-flex align-items-center">
        <div class="col-md-6">
          <div class="hero-text-section">
            <h1 class="hero-title text-right">سریع ترین راه آموزش زبان انگلیسی.</h1>
            <p
              class="text-right hero-subtitle py-1"
            >ما از سریع ترین روش های آموزشی استفاده میکنیم تا یادگیری زبان برای شما در موثر ترین و کوتاه ترین زمان ممکن صورت گیرد.</p>

            <div class="py-2 row button-section">
              <router-link to="dashboard">
                <base-button
                  native-type="submit"
                  type="warning"
                  class="btn animation-on-hover"
                >ورود به پنل کاربری</base-button>
              </router-link>

              <div class="pr-3">
                <router-link to="allcourses">
                  <base-button
                    native-type="submit"
                    type="primary"
                    class="btn animation-on-hover"
                  >مشاهده همه دوره ها</base-button>
                </router-link>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <img
            class="image img-fluid"
            src="/img/frontend/loginscreenbg.svg"
            alt="Picture of our fearless leader 2"
          />
        </div>
      </div>
    </div>

    <div class="hero-text-section-s container d-md-none px-4">
      <h1 class="hero-title text-right">سریع ترین راه آموزش زبان انگلیسی.</h1>
      <p
        class="text-right hero-subtitle pb-3"
      >ما از سریع ترین روش های آموزشی استفاده میکنیم تا یادگیری زبان برای شما در موثر ترین و کوتاه ترین زمان ممکن صورت گیرد.</p>

      <div class="pt-3 row text-right">
        <router-link to="dashboard">
          <base-button
            native-type="submit"
            type="warning"
            class="btn animation-on-hover"
          >ورود به پنل کاربری</base-button>
        </router-link>

        <div class="pr-3">
          <router-link to="allcourses">
            <base-button
              native-type="submit"
              type="primary"
              class="btn animation-on-hover"
            >مشاهده همه دوره ها</base-button>
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
.image {
  width: 440px !important;
  padding-top: 3em;
  padding-bottom: 2em;
}

.hero-content-homepage {
  background-color: #6e72fc;
  background: linear-gradient(315deg, #ad1debee 0%, #6e73fce7 84%, #ad1deb75);
  background-color: #6e72fc;
  background-size: cover;
  background-position: bottom;
  min-height: 44vh !important;
  width: 100%;

  .hero-title {
    font-size: 4.2em;
    line-height: inherit;
    font-family: IranSansBold !important;
    color: #fff !important;
    // text-shadow: 2px 2px #300a3f27;
  }

  .hero-subtitle {
    font-size: 1.2em;
    line-height: 1.7em;
    font-family: IranSans;
    color: rgba(255, 255, 255, 0.9) !important;
  }

  .btn {
    font-weight: inherit;
    border-radius: 30px;
    padding: 13px 23px !important;
    font-size: 1.1em;
    font-family: IranSansBold;
  }
}

@media only screen and (min-width: 1500px) {
  .hero-content-homepage {
    height: 48vh !important;
  }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
  .hero-content-homepage .hero-title {
    font-size: 3.8em;
  }

  .hero-content-homepage .hero-subtitle {
    font-size: 1.2em;
  }

  .hero-content-homepage .btn {
    padding: 13px 23px !important;
    font-size: 1em;
    font-family: IranSansBold;
  }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
  .hero-title {
    font-size: 2em;
    padding-top: 30px;
    line-height: inherit;
  }

  .hero-subtitle {
    padding-left: 1.1em;
    font-size: 1.1em;
    text-align: right !important;
  }

  .image {
    width: 400px !important;
    padding-top: 3em;
    padding-bottom: 2em;
  }

  .btn {
    padding: 8px !important;
    margin-bottom: 40px;
    font-size: 0.7em;
    font-family: IranSansBold;
  }
}

@media screen and (max-width: 767px) {
  .hero-content-homepage {
    background: linear-gradient(225deg, #d223e9f6, #5e62dff1),
      url(/img/frontend/westminsterlondon-opt.jpeg);
    background-size: cover;
    background-position: top;
    min-height: 45vh !important;

    .hero-title {
      font-size: 3.3em;
      color: #fff !important;
      text-align: right !important;
      padding-top: 0.5em;
    }

    .hero-subtitle {
      padding-left: 1.1em;
      font-size: 1.1em;
      text-align: right !important;
    }

    .btn {
      font-weight: inherit;
      border-radius: 30px;
      padding: 14px 15px;
      font-size: 0.9em;
      font-family: IranSansBold;
      margin-bottom: 2.5em;
    }
  }

  .button-section {
    -webkit-box-pack: center !important;
    justify-content: center !important;
  }

  .top-courses-section {
    .top-section-header {
      font-size: 1em !important;
      text-align: right !important;
    }
  }
}

@media screen and (max-width: 330px) {
  .hero-content-homepage {
    min-height: 65vh !important;
    background-position: top;
    .hero-text-section {
      position: relative;
      top: 45%;
      left: 50%;
      transform: translate(-50%, -50%);
      padding: 0 10%;
    }

    .hero-title {
      font-size: 2.3em;
      padding-top: 30px;
    }

    .hero-subtitle {
      padding-left: 1.1em;
      font-size: 1.1em;
      text-align: right !important;
    }

    .btn {
      padding: 14px 15px;
      font-size: 0.7em;
      font-family: IranSansBold;
      margin-bottom: 2.5em;
    }
  }
}
</style>
