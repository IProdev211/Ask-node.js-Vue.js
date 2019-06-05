<template>
  <div>
    <div class="row">
      <div class="col-md-8 m-md-auto col-12 card-background card-body text-center my-3">
        <div v-if="pymentStatus.loading">
          <h2 class="text-center my-3">
            <i class="fa fa-5x fa-spinner fa-pulse fa-fw"></i>
          </h2>
          <p class="text-light">لطفا منتظر باشید ...</p>
        </div>
        <div v-if="pymentStatus.success">
          <h2 class="text-center my-3">
            <i class="fa fa-5x fa-check-circle text-success"></i>
          </h2>
          <h3 class="mt-3 mb-2">تراکنش موفق</h3>
          <p class="text-light">خرید دوره با موفقیت انجام شد.</p>
          <p>
            <router-link v-if="course.id" :to="`/courses/${course.slug}`">
              <i class="fas fa-angle-double-left"></i>
              <span class="return-text">برگشت به دوره</span>
            </router-link>
          </p>
        </div>
        <div v-if="pymentStatus.error">
          <h2 class="text-center my-3">
            <i class="fa fa-5x fa-exclamation-circle text-danger"></i>
          </h2>
          <h3 class="mt-4 mb-2 text-danger">تراکنش ناموفق</h3>
          <p class="text-light text-center">
            تراکنش شما با موفقیت پرداخت نشد.
            <br>درصورتی که مبلغی از حساب بانکی شما کسر شده، توسط سیستم بانکی طی 48 ساعت آینده مرجوع خواهد شد.
          </p>
          <p>
            <router-link v-if="course.id" :to="`/courses/${course.slug}`">
              <span class="text-underline">برگشت به دوره</span>
            </router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import backend from '../../backend';

export default {
  data() {
    return {
      pymentStatus: {
        loading: true,
        error: false,
        success: false
      },
      course: {}
    };
  },
  methods: {
    dataLoad() {
      if (
        this.$route.query.hasOwnProperty('Authority') &&
        this.$route.query.hasOwnProperty('Status')
      ) {
        const authority = this.$route.query.Authority;
        const status = this.$route.query.Status;
        if (status !== 'OK') {
          this.pymentStatus.loading = false;
          this.pymentStatus.error = true;
          return;
        }
        backend
          .post(`courses/payments/verification`, {
            status: status,
            authority: authority
          })
          .then(response => {
            this.course = response.data.course;
            this.pymentStatus.loading = false;
            if (response.data.status === 'error') {
              this.pymentStatus.error = true;
              return;
            }
            this.pymentStatus.success = true;
          })
          .catch(err => {
            this.pymentStatus.loading = false;
            this.pymentStatus.error = true;
          });
      } else {
        this.$router.push('dashboard');
      }
    }
  },
  mounted() {
    this.dataLoad();
  }
};
</script>

<style lang="scss" scoped>
.return-text {
  font-size: 1.2rem;
  text-decoration: underline;
}

.swal-modal {
  .swal-text {
    text-align: center;
  }
}
</style>
