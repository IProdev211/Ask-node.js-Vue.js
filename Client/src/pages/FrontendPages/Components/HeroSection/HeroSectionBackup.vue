<template>
  <section class="hero-content-homepage">
    <div class="container d-none d-md-block">
      <div class="row d-flex align-items-center">
        <div class="col-md-5">
          <div class="hero-text-section">
            <h1 class="hero-title text-right pb-3">اسک آریا سریع ترین راه یادگیری زبان</h1>
            <p
              class="text-right hero-subtitle py-3"
            >ما از سریع ترین روش های آموزشی استفاده میکنیم تا یادگیری زبان برای شما در موثر ترین و کوتاه ترین زمان ممکن صورت گیرد.</p>

            <div class="pt-3 row button-section">
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
        <div class="col-md-7">
          <img
            class="image img-fluid"
            src="/img/frontend/loginscreenbg.svg"
            alt="Picture of our fearless leader 2"
          />
        </div>
      </div>
    </div>

    <div class="hero-text-section-s container d-sm-none px-4">
      <h1 class="hero-title text-right pb-2">اسک آریا سریع ترین راه یادگیری زبان</h1>
      <p
        class="text-right hero-subtitle py-3"
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
  width: 500px !important;
  padding-top: 3em;
  padding-bottom: 2em;
}

.hero-content-homepage {
  background-color: #6e72fc;
  background: linear-gradient(315deg, #ad1debee 0%, #6e73fce7 74%);
  background-color: #6e72fc;
  // background-color: #6e72fc;
  // background: linear-gradient(315deg, #ad1debee 0%, #6e73fce7 74%),
  // url(/img/frontend/london-bg-opt.jpg);
  // background-color: #6e72fc;
  background-size: cover;
  background-position: bottom;
  min-height: 45vh !important;
  width: 100%;

  // .hero-text-section {
  //   position: relative;
  //   top: 50%;
  //   left: 50%;
  //   transform: translate(-50%, -50%);
  //   padding: 0 10%;
  // }

  .hero-title {
    font-size: 3.5em;
    line-height: inherit;
    font-family: IranSansBold !important;
    color: #fff !important;
    // padding: 0;
    // margin: 0;
    text-shadow: 2px 2px #300a3f27;
  }

  .hero-subtitle {
    font-size: 1.2em;
    line-height: 1.5em;
    font-family: IranSans;
    color: rgba(255, 255, 255, 0.9) !important;
  }

  .btn {
    font-weight: inherit;
    border-radius: 30px;
    padding: 14px 25px;
    font-size: 1.1em;
    font-family: IranSansBold;
  }
}

@media screen and (max-width: 730px) {
  .button-section {
    -webkit-box-pack: center !important;
    justify-content: center !important;
  }

  .hero-content-homepage {
    background: linear-gradient(225deg, #ad1debee, #6e73fce7),
      url(/img/frontend/london-bg-opt.jpg);
    background-size: cover;
    background-position: bottom;
    min-height: 62vh !important;
    background-position: right;

    .hero-title {
      font-size: 2.6em;
      line-height: inherit;
      color: #fff !important;
      text-align: right !important;
      padding-top: 1em;
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
    }
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
    min-height: 80vh !important;
    background-position: bottom right;
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
    }
  }
}

@media only screen and (min-width: 1500px) {
  .hero-content-homepage {
    height: 55vh !important;
  }
}
</style>
