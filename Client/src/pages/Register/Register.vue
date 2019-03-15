<template>
  <div class="container">
    <div class="row">
      <div class="col-md-7 mr-auto">
        <card class="card-register">
          <template slot="header">
            <img class="card-img" src="img/card-primary.png" alt="Card image" />
            <h4 class="card-title py-1 px-4 text-white">Register</h4>
          </template>

          <form @submit="checkForm" id="register-form">
            <p v-if="formErrors.length">
              <b>Please correct the following error(s):</b>
              <ul>
                <li v-for="(error, key) in formErrors" :key="key">{{ error }}</li>
              </ul>
            </p>

            <base-input v-model="name" :required="true" :error="fieldErrors.name" placeholder="Full Name" addon-left-icon="tim-icons icon-single-02"></base-input>
            <base-input v-model="email" :required="true" :error="fieldErrors.email" placeholder="Email" addon-left-icon="tim-icons icon-email-85"></base-input>
            <base-input v-model="password" :required="true" :error="fieldErrors.password" placeholder="Password" addon-left-icon="tim-icons icon-lock-circle"></base-input>

            <div class="GoogleSignin py-3">
              <router-link to="googlesignin">
                <h4>
                  <i class="fab fa-google text-danger px-2"></i>Sign in With
                  Google
                </h4>
              </router-link>
            </div>
            <base-checkbox v-model="terms" class="text-left" :class="{'has-danger': fieldErrors.terms !== undefined}">
              I agree to the
              <a href="#ASKARYATERMS">terms and conditions</a>.
            </base-checkbox>

            <base-button nativeType="submit" type="primary" :loading="loading" round block size="lg">Get Started</base-button>
          </form>
        </card>
      </div>
      <div class="col-md-5 ml-auto mt-3 mb-5">
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
      </div>
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
        this.fieldErrors.name = 'Your name required.';
        haveError = true;
      }
      if (!this.email) {
        this.fieldErrors.email = 'Email required.';
        haveError = true;
      }
      if (!this.password) {
        this.fieldErrors.password = 'Password required.';
        haveError = true;
      }
      if (!this.terms) {
        this.fieldErrors.terms = 'Accepting our terms is required for using Aradask services!';
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
          message: `You successfully signed up!`,
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

.GoogleSignin :hover {
  color: #fd5d93;
}
</style>
