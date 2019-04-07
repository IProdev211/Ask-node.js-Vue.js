<template>
  <div class="row text-ltr">
    <div class="col-md-12">
      <card class="stacked-form" title="Stacked Form">
        <h4 slot="header" class="card-title">
          <span class="font-weight-bold pr-1">Add/Edit</span> Episode
        </h4>
        <form @submit.prevent>
          <div>
            <div class="row pb-4">
              <div class="col-md-3">
                <base-input label="Episode Name" placeholder="Episode Name"></base-input>
              </div>
              <div class="col-md-2">
                <base-input label="Video Length" placeholder="Length"></base-input>
              </div>
              <div class="col-md-2">
                <base-input label="Unit No." placeholder="No."></base-input>
              </div>
              <div class="col-md-5">
                <base-input label="Video Link" placeholder="Video Link"></base-input>
              </div>
              <div class="col-md-4">
                <base-input label="Unit Description" placeholder="Unit Description">
                  <textarea class="form-control"></textarea>
                </base-input>
              </div>
              <div class="col-md-2">
                <base-input label="xP Points" placeholder="xP"></base-input>
              </div>
              <div class="col-md-2 pt-4">
                <el-select
                  class="select-primary"
                  size="large"
                  placeholder="Related Course"
                  v-model="selects.course"
                >
                  <el-option
                    v-for="option in selects.RelatedCourse"
                    class="select-primary"
                    :value="option.value"
                    :label="option.label"
                    :key="option.label"
                  ></el-option>
                </el-select>
              </div>
              <div class="col-md-3 pt-4">
                <el-select
                  class="select-primary"
                  size="large"
                  placeholder="Unit Type"
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

            <div class="mt-5 pull-right">
              <base-button class="px-5" native-type="submit" type="primary">Create / Edit Episode</base-button>
            </div>
          </div>
        </form>
      </card>
    </div>
  </div>
</template>

<script>
import { Select, Option } from 'element-ui';

export default {
  components: {
    [Option.name]: Option,
    [Select.name]: Select
  },
  data() {
    return {
      images: {
        regular: null,
        avatar: null
      },
      selects: {
        simple: '',
        course: '',
        CourseType: [
          { value: 'Paid', label: 'Paid' },
          { value: 'VIP', label: 'VIP' },
          { value: 'Free', label: 'Free' }
        ],
        RelatedCourse: [
          { value: 'Course 1', label: 'COURSES SHOULD ALL SHOW HERE' },
          { value: 'Course 2', label: 'COURSES SHOULD ALL SHOW HERE' },
          { value: 'Course 3', label: 'COURSES SHOULD ALL SHOW HERE' }
        ],
        multiple: 'ARS'
      }
    };
  }
};
</script>

<style scoped></style>
