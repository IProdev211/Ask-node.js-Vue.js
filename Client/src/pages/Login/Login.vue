<template>
  <div class="container">
    <div class="row">
    <div class="col-lg-5 col-md-9 ml-auto mr-auto pt-4">
        <form @submit="checkForm">
          <card class="card-login">
            <template slot="header">
              <img class="card-img" src="img/card-primary.png" alt="Card image" />
              <h4 class="card-title text-left py-1 px-4 text-white">ورود</h4>
              <!-- <p class="container pt-3 text-center">با ورود به پنل کاربری میتوانید به سادگی به ویدیو های سایت دسترسی پیدا کنید و مقالات جدید را مطالعه کنید.</p> -->
            </template>
            <div>
              <div>
                <label class="pull-right font-weight-bold">پست الکترونیک</label>
                <base-input 
                  v-model="email" 
                  :required="true" 
                  :error="fieldErrors.email">
                </base-input>
              </div>

              <div>
                <label class="pull-right font-weight-bold pt-2">کلمه عبور</label>
                <base-input
                  type="password"
                  v-model="password" 
                  :required="true" 
                  :error="fieldErrors.password">
                </base-input>
              </div>
            </div>     
            
            <div class="text-center pt-4">
              <p>شما میتوانید با اکانت گوگل وارد سایت شوید</p>
              <router-link to="googlesignin">
                <h4 class="googleicon pt-2">
                  <i class="fab fa-google text-danger"></i>
                </h4>
              </router-link>
            </div>
            <p class="text-right" v-if="formErrors.length">
              <b>لطفا اشتباهات زیر را تصحیح کنید:</b>
              <ul>
                <li v-for="(error, key) in formErrors" :key="key">{{ error }}</li>
              </ul>
            </p>
            <div slot="footer">
              <base-button type="primary" nativeType="submit" class="mb-3" size="lg" :loading="loading" block>ورود</base-button>
              <div class="d-flex justify-content-around">
              <div class="pull-right">
                <h6>
                  <a href="/forgotpassword" class="link footer-link">رمز عبور را فراموش کرده ام</a>
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
import backend from "../../backend";

export default {
  data() {
    return {
      fieldErrors: {},
      email: null,
      password: null,
      formErrors: [],
      loading: false

    };
  },
  methods: {
    checkForm(e) {
      console.log(e);
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
      }).then((response) => {
        this.loading = false;
        if (response.data.status === "error") {
          errorHandler(response);
          return;
        }
        this.$root.$data.user = response.data.user;
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
  }
};
</script>
<style scoped>
.login-card {
  padding-top: 20%;
}
.navbar-nav .nav-item p {
  line-height: inherit;
  margin-left: 5px;
}
.googleicon {
  font-size: 2rem;
}
</style>
