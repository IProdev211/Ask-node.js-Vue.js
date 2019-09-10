<template>
  <div class="bg">
    <div class="col-lg-3 col-md-5 col-sm-12 register-section">
      <div class="container">
        <form @submit="checkForm" id="register-form">
          <h1 class="login-title pt-5 pb-3">فرم عضویت</h1>
          <div class="row">
            <div class="col-md-12 text-rtl">
              <base-input
                placeholder="نام و نام خانوادگی"
                v-model="name"
                :required="true"
                :error="fieldErrors.name"
              ></base-input>
            </div>

            <div class="col-md-12 text-rtl">
              <base-input
                placeholder="پست الکترونیک"
                v-model="email"
                :required="true"
                :error="fieldErrors.email"
              ></base-input>
            </div>

            <div class="col-md-12 text-rtl">
              <base-input
                placeholder="کلمه عبور"
                type="password"
                v-model="password"
                :required="true"
                :error="fieldErrors.password"
              ></base-input>
            </div>
          </div>
          <div class="text-right pb-2">
            <base-checkbox
              v-model="terms"
              class="pb-3 text-right"
              :class="{'has-danger': fieldErrors.terms !== undefined, 'terms-checkbox': true}"
            >
              <router-link class="tc" to="/terms">
                <i class="fas fa-info-circle pl-1"></i>
                شرایط را قبول دارم
              </router-link>
            </base-checkbox>
          </div>
          <div class="text-center">
            <a :href="googleAuthUrl">
              <h4 class="googleicon">
                <i class="fab fa-google icon"></i>
              </h4>
            </a>
            <p class="google-text">شما میتوانید بدون ثبت نام با اکانت گوگل وارد سایت شوید.</p>
          </div>
          <div class="d-flex justify-content-center py-3">
            <vue-recaptcha :sitekey="sitekey" @verify="verifyRecaptcha"></vue-recaptcha>
          </div>
          <div class="text-right pt-2" v-if="formErrors.length">
            <p class="pb-1 text-danger font-weight-bold">لطفا اشتباهات زیر را تصحیح کنید:</p>
            <ul>
              <li v-for="(error, key) in formErrors" :key="key">{{ error }}</li>
            </ul>
          </div>
          <base-button
            nativeType="submit"
            type="primary"
            :loading="loading"
            round
            block
            size="lg"
            class="mb-3 animation-on-hover"
          >عضویت</base-button>
        </form>
      </div>
    </div>
    <div class="col-lg-9 col-md-7 col-sm-12 d-none d-md-block">
      <div class="image-bg text-center">
        <h1 class="new-content-title pt-5">محتوای جدید هر هفته اضافه می شود!</h1>
        <img
          class="login-image img-fluid"
          src="/img/frontend/loginscreenbg.svg"
          alt="Picture of our fearless leader 2"
        />
      </div>
    </div>
  </div>
</template>
<script>
import VueRecaptcha from 'vue-recaptcha';
import backend from '../../backend';
import config from '../../config';
import { BaseCheckbox } from 'src/components';
import Swal from 'sweetalert';

export default {
  components: {
    BaseCheckbox,
    VueRecaptcha
  },
  data() {
    return {
      fieldErrors: {},
      name: null,
      email: null,
      password: null,
      formErrors: [],
      loading: false,
      terms: false,
      sitekey: config.recaptcha.sitekey,
      recaptcha: '',
      googleAuthUrl: '/auth/google'
    };
  },
  methods: {
    verifyRecaptcha(response) {
      this.recaptcha = response;
    },
    createRecaptcha() {
      const script = document.createElement('script');
      script.setAttribute('async', '');
      script.setAttribute('defer', '');
      script.id = 'recaptchaScript';
      script.src =
        'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit';
      document.getElementsByTagName('head')[0].appendChild(script);
    },
    checkForm(e) {
      e.preventDefault();
      this.fieldErrors = {};
      this.formErrors = [];
      let haveError = false;

      if (!this.name) {
        this.fieldErrors.name = 'نام شما مورد نیاز است';
        haveError = true;
      }
      if (!this.email) {
        this.fieldErrors.email = 'ایمیل شما مورد نیاز است.';
        haveError = true;
      }
      if (!this.password) {
        this.fieldErrors.password = 'رمز عبور شما مورد نیاز است';
        haveError = true;
      }
      if (!this.terms) {
        this.fieldErrors.terms = true;
        this.formErrors.push('پذیرش شرایط ما لازم است!');
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
        .post('register', {
          name: this.name,
          email: this.email,
          password: this.password,
          'g-recaptcha-response': this.recaptcha
        })
        .then(response => {
          this.loading = false;
          if (response.data.status === 'error') {
            errorHandler(response);
            return;
          }
          if (
            typeof response.data.data === 'string' &&
            response.data.data ===
              'ایمیل حاوی لینک فعال سازی به ایمیل شما ارسال شد'
          ) {
            Swal({
              icon: 'success',
              title: `شما با موفقیت ثبت نام کردید!`,
              text:
                'ایمیل حاوی لینک فعال سازی به ایمیل شما ارسال شد. بعد از تایید آدرس ایمیل میتوانید از قسمت ورود با اطلاعاتی که وارد کردید وارد شوید.',
              className: 'text-center',
              button: 'بسیار خوب'
            });
          } else {
            this.$root.$data.user = response.data.user;
            Swal({
              icon: 'success',
              title: `شما با موفقیت ثبت نام کردید!`,
              className: 'text-center',
              text: '',
              button: 'بسیار خوب'
            });
            this.$router.push(this.$route.query.backTo || 'dashboard');
          }
        })
        .catch(error => {
          this.loading = false;
          errorHandler(error.response);
        });
    }
  },
  mounted() {
    this.createRecaptcha();
    if (this.$route.query.hasOwnProperty('backTo')) {
      this.googleAuthUrl += `?backTo=${this.$route.query.backTo}`;
    }
  },
  destroyed() {
    document.getElementById('recaptchaScript').remove();
  },
  metaInfo: {
    title: 'فرم عضویت | اسک آریا',
    titleTemplate: 'فرم عضویت | اسک آریا',
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
      {
        property: 'og:description',
        content:
          'ما از سریع ترین روش های آموزشی استفاده میکنیم تا یادگیری زبان آموزان در موثر ترین و کوتاه ترین زمان ممکن صورت بگیرد.'
      },
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
.bg {
  background-color: rgb(8, 7, 104);
  height: 100vh;
}

.register-section {
  height: 100vh;
  background-color: #f5f7fa;
}

.card-title {
  font-size: 2em !important;
}

.new-content-title {
  font-family: IranSansBold;
  // font-size: 3em !important;
  color: #fff !important;
}

.tc {
  color: #3a3a3a;
}

.image-bg {
  .login-image {
    height: 40em;
    width: 40em;
  }
}

.login-title {
  font-size: 2.8em;
  font-family: IranSansBold;
  color: #080768 !important;
  text-align: center;
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
  font-size: 0.7rem;
  color: rgb(94, 94, 94) !important;
}

.footer-link {
  font-size: 0.9rem;
  color: rgb(128, 128, 128) !important;
}

.footer-link:hover {
  color: #cc51e1 !important;
  font-family: IranSansBold;
}

@media (max-width: 760px) {
  .register-section {
    padding-bottom: 100px !important;
  }
}
</style>
