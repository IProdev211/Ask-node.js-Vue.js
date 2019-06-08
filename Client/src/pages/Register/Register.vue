<template>
<section class="bg">
  <div class="container">
    <div class="row">
      <div class="py-3 col-md-5 mr-auto ml-auto">
        <card class="card-register">
          <template slot="header">
            <img class="card-img" src="img/card-primary.png" alt="Card image" />
            <h4 class="card-title text-left py-1 px-4 text-white">فرم عضویت</h4>
          </template>
          <form @submit="checkForm" id="register-form">
            <div class="row pt-3">
              <div class="col-md-12 text-ltr">
                <label class="pull-right pt-2 text-white">نام و نام خانوادگی</label>
                <base-input 
                  v-model="name" 
                  :required="true" 
                  :error="fieldErrors.name">
                </base-input>
              </div>
            
              <div class="col-md-12 text-ltr">
                <label class="pull-right pt-2 text-white" >پست الکترونیک</label>
                <base-input
                  v-model="email" 
                  :required="true" 
                  :error="fieldErrors.email">
                </base-input>
              </div>

              <div class="col-md-12 text-ltr">
              <label class="pull-right pt-2 text-white">کلمه عبور</label>
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
 background-color: #26283c;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='487' height='405.8' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.03'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/svg%3E");
}
.icon {
font-size: 1.8rem;
color: #D557D9
}

.icon:hover {
  color: #00ffaa;
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
  color: rgb(201, 201, 201) !important;
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
