<template>
  <div class="container">
    <div class="row">
      <div class="col-lg-6 col-md-9 ml-auto mr-auto pt-5">
        <form @submit="checkForm">
          <card class="card-login">
            <template slot="header">
              <h2 class="card-title text-center py-1 px-4 text-danger">بازیابی پسورد</h2>
            </template>
            <div class="pt-4">
              <label class="pull-right">پست الکترونیک</label>
              <base-input
                placeholder="پست الکترونیک"
                autocomplete="username"
                v-model="email"
                :required="true"
                :error="fieldErrors.email"
              ></base-input>
            </div>
            <div class="pt-4">
              <label class="pull-right">کلمه عبور جدید</label>
              <base-input
                type="password"
                v-model="password"
                :required="true"
                :error="fieldErrors.password"
              ></base-input>
            </div>

            <div class="text-right" v-if="formErrors.length">
              <b>لطفا اشتباهات زیر را تصحیح کنید:</b>
              <ul>
                <li v-for="(error, key) in formErrors" :key="key">{{ error }}</li>
              </ul>
            </div>
            <div slot="footer">
              <base-button
                type="primary"
                nativeType="submit"
                class="mb-3"
                size="lg"
                :loading="loading"
                block
              >بازیابی پسورد</base-button>
            </div>
          </card>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import backend from '../../backend';

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
      e.preventDefault();
      this.fieldErrors = {};
      this.formErrors = [];
      let haveError = false;

      if (!this.email) {
        this.fieldErrors.email = 'ایمیل مورد نیاز است';
        haveError = true;
      }
      if (!this.password) {
        this.fieldErrors.password = 'کلمه عبور جدید مورد نیاز است.';
        haveError = true;
      }
      if (haveError) {
        return;
      }
      const errorHandler = response => {
        if (response && response.data && response.data.status === 'error') {
          this.formErrors = Array.isArray(response.data.data)
            ? response.data.data
            : [response.data.data];
          return;
        }
      };
      this.loading = true;
      backend
        .post('password/reset/' + this.$route.params.token, {
          email: this.email,
          password: this.password
        })
        .then(response => {
          this.loading = false;
          if (response.data.status === 'error') {
            errorHandler(response);
            return;
          }
        })
        .catch(error => {
          this.loading = false;
          errorHandler(error.response);
        });
      this.$router.push('/login');
    }
  }
};
</script>
<style scoped>
.card {
  background: rgb(241, 241, 241) !important;
}

.card-title {
  font-family: IranSansBold !important;
}

.white-content .card:not(.card-white) label:not(.btn) {
  color: #344675 !important;
  font-size: 0.9rem;
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
}
</style>
