<template>
<section class="bg">
  <div class="container">
    <div class="row">
    <div class="col-lg-6 col-md-9 ml-auto mr-auto pt-5">
        <form @submit="checkForm">
          <card class="card-login">
            <template slot="header">
              <h2 class="card-title text-center py-1 px-4 text-danger">بازیابی پسورد</h2>
              <p class="container pt-3 text-center">با استفاده از این فرم میتوانید پسورد خود را بازیابی کنید</p>
            </template>
            <div class="pt-4">
              <label class="pull-right">پست الکترونیک</label>
              <base-input  
                class="text-ltr"
                v-model="email" 
                :required="true" 
                :error="fieldErrors.email">
              </base-input>
            </div>     
            
            <p class="text-right" v-if="formErrors.length">
              <b>لطفا اشتباهات زیر را تصحیح کنید:</b>
              <ul>
                <li v-for="(error, key) in formErrors" :key="key">{{ error }}</li>
              </ul>
            </p>
            <div slot="footer">
              <base-button type="primary" nativeType="submit" class="mb-3" size="lg" :loading="loading" block>بازیابی پسورد</base-button>
            </div>
          </card>
        </form>
    </div>
    </div>
  </div>
  </section>
</template>
<script>
import backend from "../../backend";

export default {
  data() {
    return {
      fieldErrors: {},
      email: null,
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
      backend.post("password/email", {
        email: this.email,
      }).then((response) => {
        this.loading = false;
        if (response.data.status === "error") {
          errorHandler(response);
          return;
        }
        alert("ایمیل حاوی لینک پسورد به ایمیل شما ارسال شد");
      }).catch((error) => {
        this.loading = false;
        errorHandler(error.response);
      });
    }
  }
};
</script>
<style lang="scss" scoped>

.card-title {
  font-family: IranSansBold;
}

.bg {
  background: url(/img/frontend/SVG-Background-4.svg) no-repeat;
  background-size: cover;
  background-position: top;
  min-height: 70vh;
}

.card {
  background: rgb(241, 241, 241) !important;
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
