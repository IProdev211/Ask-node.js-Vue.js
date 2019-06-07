<template>
  <div class="bg pb-5">
    <div class="container pt-3 mb-5">
      <h1 class="text-center display-3 text-white py-5">آموزش های غیر حضوری</h1>
      <!-- <p
      v-if="courses.length"
      class="card-category py-3"
      >Showing {{ from + 1 }} to {{ to }} of {{ totalItems }} entries</p>-->
      <div class="row course-section">
        <div class="col-lg-3 col-md-6 mb-4" v-for="course in courses" v-bind:key="course.id">
          <Course v-bind="course"></Course>
        </div>
      </div>
      <div
        v-if="courses.length"
        slot="footer"
        class="col-12 d-flex justify-content-center justify-content-sm-between flex-wrap text-rtl"
      >
        <base-pagination
          class="ml-auto mr-auto"
          v-model="page"
          :value="page"
          :per-page="limit"
          :total="total"
          :pageCount="pages"
          v-on:input="chagePageListener"
        ></base-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Course from './Components/TopCourses/Course.vue';
import { BasePagination } from 'src/components';
import backend from '../../backend';

export default {
  data: function() {
    return {
      courses: [],
      page: 1,
      pages: 1,
      limit: 0,
      totalItems: 0
    };
  },
  methods: {
    dataLoad(page) {
      backend.get('/courses?page=' + page).then(response => {
        this.courses = response.data.docs;
        this.page = parseInt(response.data.page, 10);
        this.pages = response.data.totalPages;
        this.totalItems = response.data.totalDocs;
        this.limit = response.data.limit;
      });
    },
    chagePageListener(item) {
      this.page = item;
      this.dataLoad(item);
    }
  },
  mounted() {
    this.dataLoad(1);
  },
  watch() {},
  components: {
    Course,
    BasePagination
  },
  computed: {
    to() {
      return Math.min(this.totalItems, this.from + this.limit);
    },
    from() {
      return this.limit * (this.page - 1);
    },
    total() {
      return this.courses.length;
    }
  }
};
</script>


<style lang="scss" scoped>
.full-page > .content-custom {
  padding-bottom: 10px !important;
  padding-top: 10px !important;
}

@media (max-width: 850px) {
  .course-section {
    padding: 0 10%;
  }
}
</style>
