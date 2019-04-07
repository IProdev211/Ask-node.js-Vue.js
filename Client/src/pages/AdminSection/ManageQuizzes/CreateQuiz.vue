<template>
  <div class="row text-ltr">
    <div class="col-md-12">
      <card class="stacked-form" title="Stacked Form">
        <h4 slot="header" class="card-title">Create Quiz</h4>
        <form @submit.prevent>
          <div>
            <div class="row pb-4">
              <div class="col-md-5">
                <base-input
                  label="Quiz Name"
                  placeholder="Quiz Name"
                ></base-input>
              </div>
              <div class="col-md-2">
                <base-input
                  label="Quiz Number"
                  placeholder="Number"
                ></base-input>
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
                  placeholder="Quiz Type"
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
            <div class="d-flex justify-content-center">
              <div class="px-2">
                <base-button type="success">Add Question</base-button>
              </div>
              <div class="px-2">
                <base-button native-type="submit" type="primary"
                  >Create Quiz</base-button
                >
              </div>
            </div>
          </div>
        </form>
      </card>
    </div>
    <!-- Quiz Questions -->
    <div class="col-md-12">
      <card class="stacked-form" title="Stacked Form">
        <h4 slot="header" class="card-title">Quiz Question</h4>
        <form @submit.prevent>
          <div class="row">
            <div class="col-md-2">
              <base-input label="Question No." placeholder="#"></base-input>
            </div>
            <div class="col-md-8">
              <base-input
                label="Quiz Question"
                placeholder="Quiz Question"
              ></base-input>
            </div>
            <div class="col-md-2">
              <base-input label="xP Points" placeholder="xP"></base-input>
            </div>
            <div class="col-md-3">
              <base-input label="Answer A" placeholder="Answer A"></base-input>
            </div>
            <div class="col-md-3">
              <base-input label="Answer B" placeholder="Answer B"></base-input>
            </div>
            <div class="col-md-3">
              <base-input label="Answer C" placeholder="Answer C"></base-input>
            </div>
            <div class="col-md-3">
              <base-input label="Answer D" placeholder="Answer D"></base-input>
            </div>
          </div>
          <div class="mt-2">
            <base-button native-type="submit" type="primary"
              >Create Question</base-button
            >
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
          { value: 'Course 1', label: 'Course 1' },
          { value: 'Course 2', label: 'Course 2' },
          { value: 'Course 3', label: 'Course 3' }
        ],
        multiple: 'ARS'
      }
    };
  }
};
</script>

<style scoped></style>
