<template>
  <div class="container">
    <div class="row">
      <div class="pt-4 col-md-7 mr-auto ml-auto">
        <card class="card-register">
          <template slot="header">
            <img class="card-img" src="img/card-primary.png" alt="Card image" />
            <h4 class="card-title py-1 px-4 text-white">فرم عضویت</h4>
          </template>
          <form @submit="checkForm" id="register-form">
            <div class="row pt-5">
              <div class="col-md-6 text-ltr">
                <label class="pull-right font-weight-bold pt-2">نام و نام خانوادگی</label>
                <base-input 
                  v-model="name" 
                  :required="true" 
                  :error="fieldErrors.name">
                </base-input>
              </div>
            
              <div class="col-md-6 text-ltr">
                <label class="pull-right font-weight-bold pt-2" >پست الکترونیک</label>
                <base-input
                  v-model="email" 
                  :required="true" 
                  :error="fieldErrors.email">
                </base-input>
              </div>

              <div class="col-md-12 text-ltr">
              <label class="pull-right font-weight-bold pt-2">کلمه عبور</label>
                <base-input
                  type="password"
                  v-model="password" 
                  :required="true" 
                  :error="fieldErrors.password">
                </base-input>
              </div>
            </div>

            <div class="text-right text-rtl">
              <base-checkbox v-model="terms" class="pb-3" :class="{'has-danger': fieldErrors.terms !== undefined}">
                <router-link to="/terms">شرایط را قبول دارم</router-link>
              </base-checkbox>
            </div>
            <div class="row d-flex justify-content-around">
              <div class="text-center py-3">
                <router-link to="googlesignin">
                  <i class="fab fa-google icon pb-4"></i>
                  <h4>
                    شما میتوانید بدون ثبت نام با اکانت گوگل وارد سایت شوید.
                  </h4>
                </router-link>
              </div>          
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
</template>
<script>
import backend from "../../backend";
import { BaseCheckbox } from 'src/components';

export default {
  components: {
    BaseCheckbox
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

    };
  },
  methods: {
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
        this.fieldErrors.terms = 'پذیرش شرایط ما لازم است!';
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
  }
};
</script>

<style lang="scss" scoped>
 
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

</style>
