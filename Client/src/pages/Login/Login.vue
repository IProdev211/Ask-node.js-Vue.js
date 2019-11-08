<template>
  <div class="full-height">
    <div class="col-lg-3 col-md-12 col-sm-12 login-section d-flex align-items-center">
      <div class="container login-boxes">
        <form @submit="checkForm">
          <h1 class="login-title text-primary pb-2">ورود</h1>
          <div class="row">
            <div class="col-12">
              <base-input
                class="text-rtl pb-2"
                placeholder="پست الکترونیک"
                v-model="email"
                :required="true"
                :error="fieldErrors.email"
              ></base-input>
            </div>

            <div class="col-12">
              <base-input
                class="text-rtl"
                placeholder="کلمه عبور"
                type="password"
                autocomplete="current-password"
                v-model="password"
                :required="true"
                :error="fieldErrors.password"
              ></base-input>
            </div>
          </div>
          <div class="text-right">
            <base-checkbox
              class="pb-3"
              name="remember"
              :checked="remember"
              @input="() => {remember = !remember;}"
            >
              <p>یادآوری ورود</p>
            </base-checkbox>
          </div>

          <div class="text-center pb-2">
            <a :href="googleAuthUrl">
              <h4 class="googleicon">
                <i class="fab fa-google icon"></i>
              </h4>
            </a>
            <p class="google-text">شما میتوانید با اکانت گوگل وارد سایت شوید</p>
          </div>
          <!-- <div class="py-2 d-flex justify-content-center">
            <vue-recaptcha :sitekey="sitekey" @verify="verifyRecaptcha"></vue-recaptcha>
          </div>-->
          <div class="text-right pt-2" v-if="formErrors.length">
            <p class="pb-1 text-danger font-weight-bold">لطفا اشتباهات زیر را تصحیح کنید:</p>
            <ul>
              <li v-for="(error, key) in formErrors" :key="key">{{ error }}</li>
            </ul>
          </div>

          <div slot="footer">
            <base-button
              type="primary"
              nativeType="submit"
              class="mb-2 animation-on-hover"
              size="lg"
              :loading="loading"
              block
            >ورود</base-button>
            <div class="pt-2 text-center">
              <h6>
                <router-link to="/forgotpassword" class="footer-link">رمز عبور را فراموش کرده ام</router-link>
              </h6>
              <!-- <div class="pull-left">
                <h6>
                  <router-link class="footer-link" :to="registerUrl">فرم عضویت</router-link>
                </h6>
              </div>-->
            </div>
          </div>
        </form>
      </div>
    </div>
    <div class="col-lg-9 col-md-12 col-sm-12 d-none d-lg-block bg">
      <div class="product">
        <div class="centre-div d-flex justify-content-center row">
          <img
            class="image-bg img-fluid pt-3 w-100"
            src="/img/frontend/loginscreenbg.svg"
            alt="Picture of our fearless leader 2"
          />
          <h1 class="new-content-title pt-5">محتوای جدید هر هفته اضافه می شود!</h1>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import VueRecaptcha from 'vue-recaptcha';
import backend from '../../backend';
// import config from '../../config';
import Swal from 'sweetalert';

export default {
  // components: { VueRecaptcha },
  data() {
    return {
      fieldErrors: {},
      email: null,
      password: null,
      formErrors: [],
      loading: false,
      remember: false,
      // sitekey: config.recaptcha.sitekey,
      // recaptcha: '',
      googleAuthUrl: '/auth/google',
      registerUrl: '/register'
    };
  },
  methods: {
    // verifyRecaptcha(response) {
    //   this.recaptcha = response;
    // },
    // createRecaptcha() {
    //   const script = document.createElement('script');
    //   script.setAttribute('async', '');
    //   script.setAttribute('defer', '');
    //   script.id = 'recaptchaScript';
    //   script.src =
    //     'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit';
    //   document.getElementsByTagName('head')[0].appendChild(script);
    // },
    checkForm(e) {
      e.preventDefault();
      this.fieldErrors = {};
      this.formErrors = [];
      let haveError = false;

      if (!this.email) {
        this.fieldErrors.email = 'ایمیل مورد نیاز است';
        haveError = true;
      }
      if (!this.password) {
        this.fieldErrors.password = 'رمز عبور مورد نیاز است';
        haveError = true;
      }
      if (haveError) {
        return;
      }
      const errorHandler = response => {
        if (response && response.data && response.data.status === 'error') {
          this.formErrors = Array.isArray(response.data.data)
            ? response.data.data
            : [response.data.data];
          return;
        }
      };
      this.loading = true;
      backend
        .post('login', {
          email: this.email,
          password: this.password,
          remember: this.remember ? 1 : 0
          // 'g-recaptcha-response': this.recaptcha
        })
        .then(response => {
          this.loading = false;
          if (response.data.status === 'error') {
            errorHandler(response);
            return;
          }
          this.$root.$data.user = response.data.data.user;
          this.$notify({
            type: 'success',
            message: `شما با موفقیت وارد شدید!`,
            icon: 'tim-icons icon-bell-55'
          });
          this.$router.push(this.$route.query.backTo || 'dashboard');
        })
        .catch(error => {
          this.loading = false;
          errorHandler(error.response);
        });
    }
  },
  mounted() {
    // this.createRecaptcha();
    if (this.$route.query.hasOwnProperty('backTo')) {
      this.googleAuthUrl += `?backTo=${this.$route.query.backTo}`;
      this.registerUrl += `?backTo=${this.$route.query.backTo}`;
    }
    if (this.$route.query.hasOwnProperty('error') && this.$route.query.error) {
      if (
        [
          'متاسفانه چنین لینک فعال سازی وجود ندارد',
          'مهلت استفاده از این لینک به پایان رسیده است',
          'این لینک قبلا مورد استفاده قرار گرفته است'
        ].indexOf(this.$route.query.error) !== -1
      ) {
        Swal({
          icon: 'error',
          title: 'خطا',
          className: 'swal-text-center',
          text: this.$route.query.error
        });
        this.$router.push({
          query: Object.assign({}, this.$route.query, { error })
        });
      }
    }
  },
  // destroyed() {
  //   document.getElementById('recaptchaScript').remove();
  // },
  metaInfo: {
    title: 'ورود به سایت | اسک آریا',
    titleTemplate: 'ورود به سایت | اسک آریا',
    htmlAttrs: {
      lang: 'fa',
      amp: true
    },

    meta: [
      // OpenGraph data (Most widely used)
      { property: 'og:title', content: 'اسک آریا' },
      { property: 'og:site_name', content: 'اسک آریا' },
      { property: 'og:type', content: 'website' },
      {
        property: 'og:url',
        content: 'https://www.askarya.ir/'
      },
      {
        property: 'og:image',
        content: 'https://www.askarya.ir/img/askarya-logo.png'
      },
      // {
      //   property: 'og:description',
      //   content:
      //     'ما از سریع ترین روش های آموزشی استفاده میکنیم تا یادگیری زبان آموزان در موثر ترین و کوتاه ترین زمان ممکن صورت بگیرد.'
      // },
      { itemprop: 'name', content: 'اسک آریا' },
      {
        itemprop: 'description',
        content:
          'ما از سریع ترین روش های آموزشی استفاده میکنیم تا یادگیری زبان آموزان در موثر ترین و کوتاه ترین زمان ممکن صورت بگیرد.'
      }
    ],
    link: [{ rel: 'canonical', href: 'https://www.askarya.ir/' }]
  }
};
</script>
<style lang="scss" scoped>
.full-height {
  height: 84vh !important;
}

@media only screen and (min-width: 1500px) {
  .full-height {
    height: 77vh !important;
  }
}

.bg {
  height: 100%;
  background-color: rgb(8, 7, 104);
}

.product {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  text-align: center;
  height: calc(100% - 160px);
  margin-top: 80px;
  margin-bottom: 80px;
  position: relative;
}

.centre-div {
  margin: 0;
  position: absolute;
  top: 50%;
  -ms-transform: translateY(-50%);
  transform: translateY(-50%);
  text-align: center !important;
}

.image-bg {
  height: 25em;
  width: 25em;
}

.login-section {
  height: 100%;
  background-color: #f5f7fa;
}

.login-title {
  font-size: 2.8em;
  font-family: IranSansBold;
  // color: #080768 !important;
  text-align: center;
}

.login-boxes {
  max-width: 330px;
  margin-right: auto;
  margin-left: auto;
}

.card-title {
  font-size: 2em !important;
}

.new-content-title {
  font-family: IranSansBold;
  font-size: 2em !important;
  color: #fff !important;
}

.googleicon {
  font-size: 2rem;
  margin: 0;
  padding: 0;
}

.icon {
  font-size: 1.8rem;
  color: #d557d9 !important;
}

.icon:hover {
  color: #00ffaa !important;
}

.google-text {
  font-size: 0.8rem;
  color: rgb(167, 167, 167) !important;
}

.footer-link {
  font-size: 0.9rem;
  color: rgb(92, 92, 92) !important;
}

.footer-link:hover {
  color: #cc51e1 !important;
  font-family: IranSansBold;
}

@media screen and (max-width: 767px) {
  .login-section {
    background-color: #ffffff;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(240)'%3E%3Cstop offset='0' stop-color='%23ffffff'/%3E%3Cstop offset='1' stop-color='%23ffffff'/%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='540' height='450' x='0' y='0' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.01'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25'/%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
  }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) {
  // .login-section {
  //   background: url(/img/frontend/SVG-Background-4.svg) no-repeat;
  //   background-position: top;
  //   // height: 90vh;
  //   position: inherit;
  // }

  .new-content-title {
    font-size: 20px;
    padding: 0 10px;
    line-height: 1.4em;
  }

  .image-bg {
    height: 18em !important;
    width: 18em !important;
  }
}
</style>