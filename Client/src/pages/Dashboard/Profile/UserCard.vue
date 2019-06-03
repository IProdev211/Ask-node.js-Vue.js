<template>
  <section class="box">
    <card class="card-user">
      <p class="card-text"></p>
      <div class="author">
        <!-- <div class="block block-one"></div>
        <div class="block block-two"></div>
        <div class="block block-three"></div>
        <div class="block block-four"></div> -->
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
          <i class="fas px-2" :class="isVIP ? 'fa-check tick' : 'fa-times cross'"></i>{{ 'وضعیت عضویت ویژه' }} -
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
            <div class="col-md-3 text-ltr">
              <label class="pull-right font-weight-bold">نام و نام خانوادگی</label>
              <base-input
                type="text"
                placeholder="Your Name"
                v-model="name"
                :error="fieldErrors.name"
              ></base-input>
            </div>
            <div class="col-md-3 text-ltr">
              <label class="pull-right font-weight-bold">پست الکترونیک</label>
              <base-input
                type="email"
                placeholder="info@askarya.ir"
                v-model="email"
                :error="fieldErrors.email"
              ></base-input>
            </div>
             <div class="col-md-3 text-ltr">
              <label class="pull-right font-weight-bold">تغییر رمز عبور</label>
              <base-input
                type="password"
                placeholder="پسورد جدید خود را وارد کنید"
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
      return this.user.avatar || '/img/default-avatar.png';
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
  background-color: #26283c;
background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='606' height='505' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.01'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/svg%3E");
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
