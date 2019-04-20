<template>
  <div class="row text-ltr">
    <div class="col-md-12">
      <card class="stacked-form">
        <h4 slot="header" class="card-title">
          <span class="font-weight-bold pr-1">Add/Edit</span> Course
        </h4>
        <form @submit.prevent>
          <div>
            <div class="row">
              <div class="col-md-10">
                <div class="row">
                  <div class="col-md-3">
                    <base-input label="Course Name" placeholder="Course Name"></base-input>
                  </div>
                  <div class="col-md-2">
                    <base-input label="Course Price" placeholder="Course Price"></base-input>
                  </div>
                  <div class="col-md-2">
                    <base-input label="xP Points" placeholder="xP"></base-input>
                  </div>
                  <div class="col-md-5">
                    <base-input
                      class="coursetext"
                      label="Course Text (CKEditor 5)"
                      placeholder="Course Text"
                    >
                      <textarea class="form-control"></textarea>
                    </base-input>
                  </div>
                  <div class="col-md-6 pt-4">
                    <h4 class="lead">Tags</h4>
                    <tags-input v-model="tags.dynamicTags"></tags-input>
                  </div>
                  <div class="col-md-4 pt-5">
                    <el-select
                      class="select-primary"
                      size="large"
                      placeholder="Course Type"
                      v-model="selects.simple"
                    >
                      <el-option
                        v-for="option in selects.CourseType"
                        class="select-primary"
                        :value="option.value"
                        :label="option.label"
                        :key="option.label"
                      ></el-option>
                    </el-select>
                  </div>
                </div>
              </div>
              <div class="col-md-2">
                <h4 class="lead">Course Image</h4>
                <image-upload @change="onImageChange" select-text="Select Image"/>
              </div>
            </div>
            <div class="mt-5 pull-right">
              <base-button class="px-5" native-type="submit" type="primary">Create / Edit Course</base-button>
            </div>
          </div>
        </form>
      </card>
    </div>
  </div>
</template>

<script>
import { Select, Option } from 'element-ui';
import { ImageUpload, TagsInput } from 'src/components/index';

export default {
  components: {
    [Option.name]: Option,
    [Select.name]: Select,
    ImageUpload,
    TagsInput
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
          { value: 'Paid', label: 'Paid' },
          { value: 'VIP', label: 'VIP' },
          { value: 'Free', label: 'Free' }
        ],
        multiple: 'ARS'
      },
      tags: {
        dynamicTags: ['Tag 1', 'Tag 2']
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
