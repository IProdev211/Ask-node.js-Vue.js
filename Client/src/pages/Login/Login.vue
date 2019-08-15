<template>
  <section class="bg">
    <div class="row">
      <div class="col-lg-4 login-section">
        <div class="container">
          <div class="d-flex align-items-center justify-content-center mt-2">
            <form @submit="checkForm">
              <p class="login-title text-center pt-3 text-default">ورود به سایت</p>
              <div class="row mt-2">
                <div class="col-12">
                  <base-input
                    class="text-rtl"
                    addon-left-icon="fas fa-user-lock"
                    placeholder="پست الکترونیک"
                    v-model="email"
                    :required="true"
                    :error="fieldErrors.email"
                  ></base-input>
                </div>

                <div class="col-12">
                  <base-input
                    class="text-rtl"
                    addon-left-icon="fas fa-key"
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
                  class="pb-2"
                  name="remember"
                  :checked="remember"
                  @input="() => {remember = !remember;}"
                >
                  <p>یادآوری ورود</p>
                </base-checkbox>
              </div>

              <div class="text-center">
                <a :href="googleAuthUrl">
                  <h4 class="googleicon">
                    <i class="fab fa-google icon"></i>
                  </h4>
                </a>
                <p class="google-text pt-1">شما میتوانید با اکانت گوگل وارد سایت شوید</p>
              </div>
              <div class="pt-3 d-flex justify-content-center">
                <vue-recaptcha :sitekey="sitekey" @verify="verifyRecaptcha"></vue-recaptcha>
              </div>
              <div class="text-right pt-4" v-if="formErrors.length">
                <p>لطفا اشتباهات زیر را تصحیح کنید:</p>
                <ul class="pt-2">
                  <li v-for="(error, key) in formErrors" :key="key">{{ error }}</li>
                </ul>
              </div>

              <div slot="footer">
                <base-button
                  type="primary"
                  nativeType="submit"
                  class="mb-3"
                  size="lg"
                  :loading="loading"
                  block
                >ورود</base-button>
                <div class="d-flex justify-content-around">
                  <div class="pull-right">
                    <h6>
                      <router-link
                        to="/forgotpassword"
                        class="link footer-link"
                      >رمز عبور را فراموش کرده ام</router-link>
                    </h6>
                  </div>
                  <div class="pull-left">
                    <h6>
                      <router-link class="link footer-link" :to="registerUrl">فرم عضویت</router-link>
                    </h6>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div class="col-lg-8 image-bg d-flex justify-content-center align-items-center">
          <img
            class="login-image img-fluid"
            src="/img/frontend/loginscreenbg.svg"
            alt="Picture of our fearless leader 2"
          />
        </div>
      </div>
    </div>
  </section>
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
  background-color: rgb(8, 7, 104);
  background-size: cover;
  height: 90vh;
}

.card-title {
  font-size: 2em !important;
}

.image-bg {
  .login-image {
    height: 40em;
    width: 40em;
  }
}

.login-section {
  height: 90vh;
  background-position: left;
  background-color: #f5f7fa;
}

.card {
  background: rgb(241, 241, 241) !important;
  border-radius: 20px;
}

.white-content .card:not(.card-white) label:not(.btn) {
  color: #344675 !important;
  font-size: 0.9rem;
}
.login-card {
  padding-top: 20%;
}

.login-title {
  font-size: 2.8em;
  font-family: IranSansBold;
}
.navbar-nav .nav-item p {
  line-height: inherit;
  margin-left: 5px;
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
  color: rgb(68, 68, 68) !important;
}
</style>
