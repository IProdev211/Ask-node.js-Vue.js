<template>
  <section class="box">
    <card class="card-user">
      <p class="card-text"></p>
      <div class="author">
        <div class="block block-one"></div>
        <div class="block block-two"></div>
        <div class="block block-three"></div>
        <div class="block block-four"></div>
        <img class="avatar" :src="userAvatar" alt="Users Profile Image">
        <h2 class="title">
          {{ user.name }}
          <br>
          <span class="description emailText px-1">{{ user.email }}</span>
        </h2>
        <p class="description font-weight-bold">
          <i class="fas fa-check tick px-2"></i>{{ user.admin ? "مدیر" : "دانشجو"}} -
          <span class="description" :class="user.active ? 'tick' : 'cross'">{{ user.active ? "فعال" : "غیر فعال" }}</span>
        </p>
        <p class="description font-weight-bold">
          <i class="fas fa-times px-2 cross"></i>{{ 'وضعیت عضویت ویژه' }} -
          <span class="description" :class="isVIP ? 'tick' : 'cross'">{{ isVIP ? "فعال" : "غیر فعال" }}</span>
        </p>
        <div class="row d-flex justify-content-center">
          <div class="pt-3 px-2">
            <base-button
              @click="showForm = !showForm"
              native-type="submit"
              class="btn-fill btn btn-sm"
            >{{ 'ویرایش مشخصات' }}</base-button>
          </div>
          <div class="pt-3 px-2">
            <router-link to="courses">
              <base-button
                native-type="submit"
                type="primary"
                class="btn-fill btn btn-sm"
              >{{ 'شارژ VIP' }}</base-button>
            </router-link>
          </div>
        </div>
      </div>

      <!-- Edit Profile Section -->
      <div class="editUserForm">
        <form v-if="showForm" @submit.prevent="updateProfile">
          <p v-if="formErrors.length">
            <b>لطفا اشتباهات زیر را تصحیح کنید:</b>
            <ul>
              <li v-for="(error, key) in formErrors" :key="key">{{ error }}</li>
            </ul>
          </p>
          <div class="row pt-3">
            <div class="col-md-4 text-ltr">
              <label class="pull-right font-weight-bold">نام و نام خانوادگی</label>
              <base-input
                type="text"
                placeholder="Your Name"
                v-model="name"
                :error="fieldErrors.name"
              ></base-input>
            </div>
            <div class="col-md-4 text-ltr">
              <label class="pull-right font-weight-bold">پست الکترونیک</label>
              <base-input
                type="email"
                placeholder="info@askarya.ir"
                v-model="email"
                :error="fieldErrors.email"
              ></base-input>
            </div>
            <div class="col-md-3 pt-3">
              <image-upload
                type="avatar"
                select-text="+ آپلود عکس"
                @change="onAvatarChange"
              />
            </div>
            <div class="col-md-2 mt-3 mr-auto">
              <base-button
                native-type="submit"
                type="primary"
                class="btn btn-success btn-simple btn-sm"
              >ذخیره</base-button>
            </div>
          </div>
        </form>
      </div>
    </card>
  </section>
</template>
<script>
import backend from "../../../backend";
import { ImageUpload } from 'src/components/index';

export default {
  components: {
    ImageUpload
  },
  props: ["user"],
  data() {
    return {
      showForm: false,
      formErrors: [],
      loading: false,
      fieldErrors: {},
      name: this.$root.$data.user.name,
      email: this.$root.$data.user.email,
      lang: this.$root.$data.user.lang,
      avatar: null,

    };
  },
  computed: {
    isVIP() {
      return (this.user.vipTime && new Date(this.user.vipTime) > new Date());
    },
    userAvatar() {
      return this.user.avatar || '/img/default-avatar-OLD.png';
    }
  },
  methods: {
    updateProfile() {
      this.fieldErrors = {};
      this.formErrors = [];
      let haveError = false;

      if (!this.email) {
        this.fieldErrors.email = 'ایمیل مورد نیاز';
        haveError = true;
      }
      if (!this.name) {
        this.fieldErrors.name = 'نام مورد نیاز';
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
      var formData = new FormData();
      formData.append("name", this.name);
      formData.append("email", this.email);
      formData.append("lang", this.lang);
      if (this.avatar) {
        formData.append("avatar", this.avatar, this.avatar.name);
      }
      backend.put("profile", formData).then((response) => {
        this.loading = false;
        if (response.data.status === "error") {
          errorHandler(response);
          return;
        }
        this.$root.$data.user = response.data.user;
        this.$notify({
          type: 'success',
          message: `مشخصات شما با موفقیت به روز شده!`,
          icon: 'tim-icons icon-bell-55'
        });
        this.$router.push("dashboard");
      }).catch((error) => {
        this.loading = false;
        errorHandler(error.response);
      });
    },
    changeLangFa() {
      this.i18n = this.$i18n;
      this.i18n.locale = 'fa';
      this.$rtl.enableRTL();
      this.lang = "fa";
    },
    changeLangEn() {
      this.i18n = this.$i18n;
      this.i18n.locale = 'en';
      this.$rtl.disableRTL();
      this.lang = "en";
    },
    onAvatarChange(file) {
      this.avatar = file;
    }
  },
};
</script>

<style scoped>
.emailText {
  font-size: 1rem;
}
.box {
  height: 100%;
}
.card-user {
  height: 100%;
}
.tick {
  color: #57c09a;
  font-weight: 600;
}
.cross {
  color: #ff0000;
  font-weight: 600;
}
</style>
