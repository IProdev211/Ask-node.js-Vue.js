<template>
  <div class="container">
    <div class="col-lg-5 col-md-9 ml-auto mr-auto">
        <form @submit.prevent>
          <card class="card-login">
            <template slot="header">
              <img src="img/card-primary.png" alt />
              <h2 class="card-title text-white py-2 px-2">Login</h2>
            </template>
            <div>
              <base-input
                placeholder="Email"
                addon-left-icon="tim-icons icon-email-85"
              ></base-input>
              <base-input
                placeholder="Password"
                addon-left-icon="tim-icons icon-lock-circle"
              ></base-input>
            </div>
            <div class="GoogleSignin">
              <router-link to="googlesignin">
                <h4>
                  <i class="fab fa-google text-danger px-2"></i>Sign in With
                  Google
                </h4>
              </router-link>
            </div>
            <div slot="footer">
              <base-button type="primary" class="mb-3" size="lg" block
                >Login</base-button
              >
              <div class="pull-left">
                <h6>
                  <router-link class="link footer-link" to="/register"
                    >Create Account</router-link
                  >
                </h6>
              </div>
              <div class="pull-right">
                <h6>
                  <a href="/forgotpassword" class="link footer-link"
                    >Forgot Your Password?</a
                  >
                </h6>
              </div>
            </div>
          </card>
        </form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      model: {
        email: '',
        password: '',
        subscribe: true
      }
    };
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
