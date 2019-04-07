<template>
  <div class="row text-ltr">
    <div class="col-md-12">
      <card class="stacked-form" title="Stacked Form">
        <h4 slot="header" class="card-title">
          <span class="font-weight-bold pr-1">Add/Edit</span> User
        </h4>
        <form @submit.prevent>
          <div>
            <div class="row pt-2">
              <div class="col-md-12">
                <div class="row">
                  <div class="text-center col-md-12">
                    <div class="pb-4">
                      <img class="avatar" :src="userAvatar" alt="Users Profile Image">
                    </div>
                    <div class="py-4">
                      <image-upload @change="onImageChange" select-text="Edit User Image"/>
                    </div>
                  </div>
                  <div class="col-md-3">
                    <base-input label="Edit User Full Name" placeholder="User Full Name"></base-input>
                  </div>
                  <div class="col-md-3">
                    <base-input label="Edit User Email" placeholder="User Email"></base-input>
                  </div>
                  <div class="col-md-2">
                    <base-input label="Edit User Password" placeholder="User Password"></base-input>
                  </div>
                  <div class="col-md-2">
                    <base-input label="Edit User xP Points" placeholder="xP"></base-input>
                  </div>

                  <div class="col-md-2 py-4">
                    <el-select
                      class="select-primary text-ltr"
                      size="large"
                      placeholder="VIP Access"
                      v-model="selects.simple"
                    >
                      <el-option
                        v-for="option in selects.CourseType"
                        class="select-primary text-ltr"
                        :value="option.value"
                        :label="option.label"
                        :key="option.label"
                      ></el-option>
                    </el-select>
                  </div>

                  <!-- User Stats  -->
                  <div class="container pt-4">
                    <!-- Enrolled Courses -->
                    <div>
                      <p class="enrolled-on font-weight-bold">Courses Enrolled On:</p>
                      <ul>
                        <li class="enrolled-course">
                          Grammar in Use 1
                          <span>14/12/2018</span>
                        </li>
                      </ul>
                    </div>

                    <!-- VIP Membership -->
                    <div class="pt-4">
                      <p class="vip-on font-weight-bold">VIP Member:</p>
                      <p class="vip-status">
                        From:
                        <span class="pr-4">14/12/2018</span>
                        To:
                        <span>14/02/2019</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5 pull-right">
              <base-button class="px-5" native-type="submit" type="primary">Create / Edit User</base-button>
            </div>
          </div>
        </form>
      </card>
    </div>
  </div>
</template>

<script>
import { Select, Option } from 'element-ui';
import { ImageUpload } from 'src/components/index';

export default {
  components: {
    [Option.name]: Option,
    [Select.name]: Select,
    ImageUpload
  },
  data() {
    return {
      images: {
        regular: null,
        avatar: null
      },
      selects: {
        simple: '',
        CourseType: [
          { value: '1-Month VIP', label: '1-Month Access' },
          { value: '2-Month VIP', label: '2-Month Access' },
          { value: '3-Month VIP', label: '3-Month Access' }
        ],
        multiple: 'ARS'
      }
    };
  },
  methods: {
    onImageChange(file) {
      this.images.regular = file;
    },
    onAvatarChange(file) {
      this.images.avatar = file;
    }
  }
};
</script>


<style lang="scss" scoped>
.enrolled-on {
  font-size: 1rem;
}
.enrolled-course {
  padding-top: 10px;
  span {
    font-size: 0.8rem;
    padding-left: 10px;
    color: rgb(165, 165, 165);
  }
}

.vip-on {
  font-size: 1rem;
}
.vip-status {
  padding-top: 10px;
  span {
    padding-left: 3px;
    color: rgb(161, 161, 161);
  }
}
</style>
