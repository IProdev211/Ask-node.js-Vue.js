<template>
<section class="bg">
  <div class="container">
    <div class="row">
      <div class="py-3 col-md-5 mr-auto ml-auto">
        <card class="card-register">
          <template slot="header">
            <img class="card-img" src="img/card-primary.png" alt="Card image" />
            <h4 class="card-title text-right text-white py-1 px-2">فرم عضویت</h4>
          </template>
          <form @submit="checkForm" id="register-form">
            <div class="row pt-4">
              <div class="col-md-12 text-ltr">
                <label class="pull-right pt-2">نام و نام خانوادگی</label>
                <base-input 
                  v-model="name" 
                  :required="true" 
                  :error="fieldErrors.name">
                </base-input>
              </div>
            
              <div class="col-md-12 text-ltr">
                <label class="pull-right pt-2" >پست الکترونیک</label>
                <base-input
                  v-model="email" 
                  :required="true" 
                  :error="fieldErrors.email">
                </base-input>
              </div>

              <div class="col-md-12 text-ltr">
              <label class="pull-right pt-2">کلمه عبور</label>
                <base-input
                  type="password"
                  v-model="password" 
                  :required="true" 
                  :error="fieldErrors.password">
                </base-input>
              </div>
            </div>

            <div class="text-right">
              <base-checkbox v-model="terms" class="pb-3" :class="{'has-danger': fieldErrors.terms !== undefined, 'terms-checkbox': true}">
                <router-link to="/terms">شرایط را قبول دارم</router-link>
              </base-checkbox>
            </div>
            <div class="row d-flex justify-content-around">
              <div class="text-center pb-3">
                <a href="/auth/google">
                  <h4 class="googleicon">
                    <i class="fab fa-google icon"></i>
                  </h4>
                </a>
                 <p class="px-5 google-text">
                    شما میتوانید بدون ثبت نام با اکانت گوگل وارد سایت شوید.
                  </p>
              </div>          
            </div>
            <div class="d-flex justify-content-center pb-3">
              <vue-recaptcha :sitekey="sitekey" @verify="verifyRecaptcha"></vue-recaptcha>
            </div>
            <p v-if="formErrors.length">
              <b>لطفا اشتباهات زیر را تصحیح کنید:</b>
              <ul>
                <li v-for="(error, key) in formErrors" :key="key">{{ error }}</li>
              </ul>
            </p>
            <base-button nativeType="submit" type="primary" :loading="loading" round block size="lg">عضویت</base-button>
          </form>
        </card>
      </div>
      <!-- <div class="col-md-5 ml-auto mt-4 mb-5">
        <div class="info-area info-horizontal my-3">
          <div class="icon icon-warning">
            <i class="tim-icons icon-wifi"></i>
          </div>
          <div class="description">
            <h3 class="info-title">Fast Learning</h3>
            <p class="description">
              We employ the fastest teaching methods, so that you can learn as
              quickly, and as efficiently possible.
            </p>
          </div>
        </div>
        <div class="info-area info-horizontal mb-3">
          <div class="icon icon-primary">
            <i class="tim-icons icon-triangle-right-17"></i>
          </div>
          <div class="description">
            <h3 class="info-title">Active Learning</h3>
            <p class="description">
              Learn by completing real-world tasks that will help you learn
              faster and better.
            </p>
          </div>
        </div>
        <div class="info-area info-horizontal mb-3">
          <div class="icon icon-info">
            <i class="tim-icons icon-trophy"></i>
          </div>
          <div class="description">
            <h3 class="info-title">European Standards</h3>
            <p class="description">
              We base our teaching styles and methods heavily on European
              Standards and Guidelines.
            </p>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</section>

</template>
<script>
import VueRecaptcha from 'vue-recaptcha';
import backend from "../../backend";
import config from "../../config";
import { BaseCheckbox } from 'src/components';


export default {
  components: {
    BaseCheckbox,
    VueRecaptcha,
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
      recaptcha: ""
    };
  },
  methods: {
     verifyRecaptcha(response) {
      this.recaptcha = response;
    },
    createRecaptcha () {
      const script = document.createElement('script');
      script.setAttribute('async', '');
      script.setAttribute('defer', '');
      script.id = 'recaptchaScript';
      script.src = 'https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit'
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
      const errorHandler = (response) => {
        if (response && response.data && response.data.status === "error") {
          this.formErrors = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
          return;
        };
      }
      this.loading = true;
      backend.post("register", {
        name: this.name,
        email: this.email,
        password: this.password,
        "g-recaptcha-response": this.recaptcha,
      }).then((response) => {
        this.loading = false;
        if (response.data.status === "error") {
          errorHandler(response);
          return;
        }
        this.$root.$data.user = response.data.user;
        this.$notify({
          type: 'success',
          message: `شما با موفقیت ثبت نام کردید!`,
          icon: 'tim-icons icon-bell-55'
        });
        this.$router.push("dashboard");
      }).catch((error) => {
        this.loading = false;
        errorHandler(error.response);
      });
    }
  },
  mounted(){
    this.createRecaptcha();
  },
  destroyed() {
    document.getElementById('recaptchaScript').remove();
  }
};
</script>

<style lang="scss" scoped>
.bg {
  background: url(/img/frontend/SVG-Background-4.svg) no-repeat;
  background-size: cover;
  background-position: top;
  min-height: 70vh;
}
@media (max-width: 768px) {
.card-title {
  font-size: 1.7rem !important;
}
}
.card {
  background: rgb(241, 241, 241) !important;
}

.white-content .card:not(.card-white) label:not(.btn) {
  color: #344675 !important;
  font-size: 0.9rem;
}
.icon {
font-size: 1.8rem;
color: #D557D9 !important;
}

.icon:hover {
  color: #00ffaa !important;
}

a {
  font-size: 1rem;
}

.googleicon {
  font-size: 2rem;
  margin: 0;
  padding: 0;
}

.google-text {
  font-size: 0.8rem;
  color: rgb(94, 94, 94) !important;
}
.terms-checkbox {
  &::after {
    display: none;
  }
  &.has-danger label a {
    color: #ec250d;
  }
}
</style>
