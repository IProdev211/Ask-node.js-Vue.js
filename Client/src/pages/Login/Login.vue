<template>
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
                <div class="col-12">
                  <label class="pull-right font-weight-bold">پست الکترونیک</label>
                  <base-input 
                    class="text-ltr"
                    v-model="email" 
                    :required="true" 
                    :error="fieldErrors.email">
                  </base-input>
                </div>

                <div class="col-12">
                  <label class="pull-right font-weight-bold">کلمه عبور</label>
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
                 <p>یادآوری ورود</p>
              </base-checkbox>
            </div>
              
              <div class="text-center">
                <a href="/auth/google">
                  <h4 class="googleicon">
                    <i class="fab fa-google text-danger"></i>
                  </h4>
                </a>
                <p class="google-text pt-1">شما میتوانید با اکانت گوگل وارد سایت شوید</p>
              </div>
              <p class="text-right" v-if="formErrors.length">
                <b>لطفا اشتباهات زیر را تصحیح کنید:</b>
                <ul>
                  <li v-for="(error, key) in formErrors" :key="key">{{ error }}</li>
                </ul>
              </p>
              <vue-recaptcha :sitekey="sitekey" @verify="verifyRecaptcha"></vue-recaptcha>
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

.google-text {
  font-size: 0.8rem;
  color: rgb(177, 177, 177);
}

</style>
