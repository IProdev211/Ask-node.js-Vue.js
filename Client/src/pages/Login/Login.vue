<template>
  <div class="container">
    <div class="row">
    <div class="col-lg-5 col-md-9 ml-auto mr-auto pt-5">
        <form @submit="checkForm">
          <card class="card-login">
            <template slot="header">
              <img class="card-img" src="img/card-primary.png" alt="Card image" />
              <h4 class="card-title py-1 px-4 text-white">ورود</h4>
            </template>
            <div>
              <base-input placeholder="Email" v-model="email" :required="true" :error="fieldErrors.email" addon-left-icon="tim-icons icon-email-85"></base-input>
              <base-input placeholder="Password" v-model="password" :required="true" :error="fieldErrors.password"  addon-left-icon="tim-icons icon-lock-circle"></base-input>
            </div>
            <div class="GoogleSignin pt-4">
              <router-link to="googlesignin">
                <h4>
                  <i class="fab fa-google text-danger px-2"></i>Sign in With Google
                </h4>
              </router-link>
            </div>
            <p v-if="formErrors.length">
              <b>Please correct the following error(s):</b>
              <ul>
                <li v-for="(error, key) in formErrors" :key="key">{{ error }}</li>
              </ul>
            </p>
            <div slot="footer">
              <base-button type="primary" nativeType="submit" class="mb-3" size="lg" :loading="loading" block>Login</base-button>
              <div class="d-flex justify-content-around">
              <div class="pull-left">
                <h6>
                  <router-link class="link footer-link" to="/register">Create Account</router-link>
                </h6>
              </div>
              <div class="pull-right">
                <h6>
                  <a href="/forgotpassword" class="link footer-link">Forgot Your Password?</a>
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
        this.fieldErrors.email = 'Email required.';
        haveError = true;
      }
      if (!this.password) {
        this.fieldErrors.password = 'Password required.';
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
          message: `You successfully logged in!`,
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
.GoogleSignin :hover {
  color: #fd5d93;
}
</style>
