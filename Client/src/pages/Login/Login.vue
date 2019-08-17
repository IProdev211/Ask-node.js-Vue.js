<template>
  <div class="bg">
    <div class="col-lg-3 col-md-5 col-sm-12 login-section">
      <div class="container">
        <form @submit="checkForm">
          <h1 class="login-title pt-5 pb-3">ورود به سایت</h1>
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
                v-model="password"
                :required="true"
                :error="fieldErrors.password"
              ></base-input>
            </div>
          </div>
          <div class="text-right text-rtl">
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
          <div class="py-2 d-flex justify-content-center">
            <vue-recaptcha :sitekey="sitekey" @verify="verifyRecaptcha"></vue-recaptcha>
          </div>
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
            <div class="pt-2 d-flex justify-content-around">
              <div class="pull-right">
                <h6>
                  <router-link to="/forgotpassword" class="footer-link">رمز عبور را فراموش کرده ام</router-link>
                </h6>
              </div>
              <div class="pull-left">
                <h6>
                  <router-link class="footer-link" :to="registerUrl">فرم عضویت</router-link>
                </h6>
              </div>
            </div>
          </div>
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
import Swal from 'sweetalert';

export default {
  components: { VueRecaptcha },
  data() {
    return {
      fieldErrors: {},
      email: null,
      password: null,
      formErrors: [],
      loading: false,
      remember: false,
      sitekey: config.recaptcha.sitekey,
      recaptcha: '',
      googleAuthUrl: '/auth/google',
      registerUrl: '/register'
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
          remember: this.remember ? 1 : 0,
          'g-recaptcha-response': this.recaptcha
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
    this.createRecaptcha();
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
  destroyed() {
    document.getElementById('recaptchaScript').remove();
  }
};
</script>
<style lang="scss" scoped>
.bg {
  height: 100vh;
  background-color: rgb(8, 7, 104);
}

.login-section {
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
  font-size: 0.8rem;
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
</style>
