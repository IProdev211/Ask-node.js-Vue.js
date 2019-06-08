<template>
<section class="bg">
  <div class="container">
    <div class="row">
      <div class="col-lg-5 col-md-9 ml-auto mr-auto pt-4 pb-2">
          <form @submit="checkForm">
            <card class="card-login">
              <template slot="header">
                <img class="card-img" src="img/card-primary.png" alt="Card image" />
                <h4 class="card-title text-left px-4 text-white">ورود</h4>
                <!-- <p class="container pt-3 text-center">با ورود به پنل کاربری میتوانید به سادگی به ویدیو های سایت دسترسی پیدا کنید و مقالات جدید را مطالعه کنید.</p> -->
              </template>
              <div class="row mt-4">
                <div class="col-md-6">
                  <label class="pull-right text-white">پست الکترونیک</label>
                  <base-input 
                    class="text-ltr"
                    v-model="email" 
                    :required="true" 
                    :error="fieldErrors.email">
                  </base-input>
                </div>

                <div class="col-md-6">
                  <label class="pull-right text-white">کلمه عبور</label>
                  <base-input
                    class="text-ltr"
                    type="password"
                    v-model="password" 
                    :required="true" 
                    :error="fieldErrors.password">
                  </base-input>
                </div>
              </div>     
              <div class="text-right text-rtl">
              <base-checkbox class="pb-2" name="remember" :checked="remember" @input="() => {remember = !remember;}">
                 <p class="text-white">یادآوری ورود</p>
              </base-checkbox>
            </div>
              
              <div class="text-center">
                <a href="/auth/google">
                  <h4 class="googleicon">
                    <i class="fab fa-google icon "></i>
                  </h4>
                </a>
                <p class="google-text pt-1">شما میتوانید با اکانت گوگل وارد سایت شوید</p>
              </div>
              <div class="pt-3 d-flex justify-content-center">
                <vue-recaptcha  :sitekey="sitekey" @verify="verifyRecaptcha"></vue-recaptcha>
              </div>
              <p class="text-right pt-4" v-if="formErrors.length">
                <b>لطفا اشتباهات زیر را تصحیح کنید:</b>
                <ul class="pt-2">
                  <li v-for="(error, key) in formErrors" :key="key">{{ error }}</li>
                </ul>
              </p>
              
              <div slot="footer">
                <base-button type="primary" nativeType="submit" class="mb-3" size="lg" :loading="loading" block>ورود</base-button>
                <div class="d-flex justify-content-around">
                <div class="pull-right">
                  <h6>
                    <router-link to="/forgotpassword" class="link footer-link">رمز عبور را فراموش کرده ام</router-link>
                  </h6>
                </div>
                <div class="pull-left">
                  <h6>
                    <router-link class="link footer-link" to="/register">فرم عضویت</router-link>
                  </h6>
                </div>
                </div>
              </div>
            </card>
          </form>
      </div>
    </div>
  </div>
  </section>
</template>
<script>
import VueRecaptcha from 'vue-recaptcha';
import backend from "../../backend";
import config from "../../config";

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
      recaptcha: "",
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
      const errorHandler = (response) => {
        if (response && response.data && response.data.status === "error") {
          this.formErrors = Array.isArray(response.data.data) ? response.data.data : [response.data.data];
          return;
        };
      }
      this.loading = true;
      backend.post("login", {
        email: this.email,
        password: this.password,
        remember: this.remember ? 1 : 0,
        "g-recaptcha-response": this.recaptcha,
      }).then((response) => {
        this.loading = false;
        if (response.data.status === "error") {
          errorHandler(response);
          return;
        }
        this.$root.$data.user = response.data.data.user;
        this.$notify({
          type: 'success',
          message: `شما با موفقیت وارد شدید!`,
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
.login-card {
  padding-top: 20%;
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
color: #D557D9
}

.icon:hover {
  color: #00ffaa;
}

.google-text {
  font-size: 0.8rem;
  color: rgb(160, 160, 160) !important;
}

.footer-link {
  font-size: 0.9rem;
  color: rgb(182, 182, 182);
}
</style>
