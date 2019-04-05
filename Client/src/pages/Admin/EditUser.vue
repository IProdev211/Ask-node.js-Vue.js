<template>
  <div class="row text-ltr">
    <div class="col-md-12">
      <card class="stacked-form" title="Stacked Form">
        <h4 slot="header" class="card-title">Edit User</h4>
        <form @submit.prevent>
          <div>
            <div class="row">
              <div class="col-md-12">
                <div class="row">
                  <div class="col-md-5">
                    <base-input label="User Full Name" placeholder="User Full Name"></base-input>
                  </div>
                  <div class="col-md-5">
                    <base-input label="User Email" placeholder="User Email"></base-input>
                  </div>
                  <div class="col-md-2">
                    <base-input label="User xP Points" placeholder="xP"></base-input>
                  </div>
                  <div class="col-md-4">
                    <base-input label="User Password" placeholder="User Password"></base-input>
                  </div>

                  <div class="col-md-5 py-4">
                    <el-select
                      class="select-primary text-ltr"
                      size="large"
                      placeholder="User Account Type"
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
                  <div class="col-md-2">
                    <h4 class="lead">User Profile Image</h4>
                    <image-upload @change="onImageChange" select-text="Select Image"/>
                  </div>
                </div>
              </div>
            </div>
            <div class="mt-5">
              <base-button class="px-5" native-type="submit" type="primary">Edit User</base-button>
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
          { value: '1-Month VIP', label: '1-Month VIP Access' },
          { value: '2-Month VIP', label: '2-Month VIP Access' },
          { value: '3-Month VIP', label: '3-Month VIP Access' }
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

<style scoped></style>
