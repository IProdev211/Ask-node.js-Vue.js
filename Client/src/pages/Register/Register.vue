<template>
  <div class="container">
    <div class="row">
      <div class="col-md-7 mr-auto">
        <card class="card-register">
          <template slot="header">
            <img class="card-img" src="img/card-primary.png" alt="Card image" />
            <h4 class="card-title py-1 px-4 text-white">Register</h4>
          </template>

          <form @submit.prevent>
            <base-input
              placeholder="Full Name"
              addon-left-icon="tim-icons icon-single-02"
            ></base-input>

            <base-input
              placeholder="Email"
              addon-left-icon="tim-icons icon-email-85"
            ></base-input>

            <base-input
              placeholder="Password"
              addon-left-icon="tim-icons icon-lock-circle"
            ></base-input>

            <div class="GoogleSignin py-3">
              <router-link to="googlesignin">
                <h4>
                  <i class="fab fa-google text-danger px-2"></i>Sign in With
                  Google
                </h4>
              </router-link>
            </div>
            <base-checkbox class="text-left">
              I agree to the
              <a href="#ASKARYATERMS">terms and conditions</a>.
            </base-checkbox>
          </form>

          <base-button slot="footer" type="primary" round block size="lg"
            >Get Started</base-button
          >
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
import { BaseCheckbox } from 'src/components';

export default {
  components: {
    BaseCheckbox
  }
};
</script>

<style scoped>

.GoogleSignin :hover {
  color: #fd5d93;
}
</style>
