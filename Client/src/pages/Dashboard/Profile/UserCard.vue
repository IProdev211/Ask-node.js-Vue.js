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
        <p class="description">
          <i class="fas fa-check tick px-2"></i>{{ user.admin ? "مدیر" : "دانشجو"}} -
          <span class="description" :class="user.active ? 'tick' : 'cross'">{{ user.active ? "فعال" : "غیر فعال" }}</span>
        </p>
        <p class="description">
          <i class="fas px-2" :class="isVIP ? 'fa-check tick' : 'fa-times cross'"></i>{{ 'وضعیت عضویت ویژه' }} -
          <span class="description" :class="isVIP ? 'tick' : 'cross'">{{ isVIP ? "فعال" : "غیر فعال" }} <span class="vip-date"> روز دیگر شارژ دارید </span></span>
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
              <label class="pull-right">نام و نام خانوادگی</label>
              <base-input
                type="text"
                placeholder="Your Name"
                v-model="name"
                :error="fieldErrors.name"
              ></base-input>
            </div>
            <div class="col-md-3 text-ltr">
              <label class="pull-right">پست الکترونیک</label>
              <base-input
                type="email"
                placeholder="info@askarya.ir"
                v-model="email"
                :error="fieldErrors.email"
              ></base-input>
            </div>
             <div class="col-md-3 text-ltr">
              <label class="pull-right">تغییر رمز عبور</label>
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


<style lang="scss" scoped>
.avatar {
  width: 7em;
  height: 7em;
}
.emailText {
  font-size: 1rem;
}
.box {
  height: 100%;
}
.card-user {
  height: 100%;
  background-color: #ffffff !important;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='384' height='384' viewBox='0 0 800 800'%3E%3Cg fill='none' stroke='%23fafafa' stroke-width='1'%3E%3Cpath d='M769 229L1037 260.9M927 880L731 737 520 660 309 538 40 599 295 764 126.5 879.5 40 599-197 493 102 382-31 229 126.5 79.5-69-63'/%3E%3Cpath d='M-31 229L237 261 390 382 603 493 308.5 537.5 101.5 381.5M370 905L295 764'/%3E%3Cpath d='M520 660L578 842 731 737 840 599 603 493 520 660 295 764 309 538 390 382 539 269 769 229 577.5 41.5 370 105 295 -36 126.5 79.5 237 261 102 382 40 599 -69 737 127 880'/%3E%3Cpath d='M520-140L578.5 42.5 731-63M603 493L539 269 237 261 370 105M902 382L539 269M390 382L102 382'/%3E%3Cpath d='M-222 42L126.5 79.5 370 105 539 269 577.5 41.5 927 80 769 229 902 382 603 493 731 737M295-36L577.5 41.5M578 842L295 764M40-201L127 80M102 382L-261 269'/%3E%3C/g%3E%3Cg fill='%23fafafa'%3E%3Ccircle cx='769' cy='229' r='5'/%3E%3Ccircle cx='539' cy='269' r='5'/%3E%3Ccircle cx='603' cy='493' r='5'/%3E%3Ccircle cx='731' cy='737' r='5'/%3E%3Ccircle cx='520' cy='660' r='5'/%3E%3Ccircle cx='309' cy='538' r='5'/%3E%3Ccircle cx='295' cy='764' r='5'/%3E%3Ccircle cx='40' cy='599' r='5'/%3E%3Ccircle cx='102' cy='382' r='5'/%3E%3Ccircle cx='127' cy='80' r='5'/%3E%3Ccircle cx='370' cy='105' r='5'/%3E%3Ccircle cx='578' cy='42' r='5'/%3E%3Ccircle cx='237' cy='261' r='5'/%3E%3Ccircle cx='390' cy='382' r='5'/%3E%3C/g%3E%3C/svg%3E") !important;
  background-attachment: fixed !important;
}
.tick {
  color: #57c09a;
  /* font-weight: 600; */
}
.cross {
  color: #ff0000;
  /* font-weight: 600; */
}
.vip-date {
  font-size: 0.8rem;
  color: rgb(141, 141, 141);
}

</style>
