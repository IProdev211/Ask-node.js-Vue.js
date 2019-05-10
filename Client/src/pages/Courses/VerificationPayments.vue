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
            <router-link v-if="course.id" :to="`/courses/${course.slug}`">برگشت به دوره</router-link>
          </p>
        </div>
        <div v-if="pymentStatus.error">
          <h2 class="text-center my-3">
            <i class="fa fa-5x fa-exclamation-circle text-danger"></i>
          </h2>
          <h3 class="mt-3 mb-2 text-danger">تراکنش ناموفق</h3>
          <p class="text-light text-center">
            تراکنش شما با موفقیت پرداخت نشد.
            <br>درصورتی که مبلغی از حساب بانکی شما کسر شده، توسط سیستم بانکی طی 48 ساعت آینده مرجوع خواهد شد
          </p>
          <p>
            <router-link v-if="course.id" :to="`/courses/${course.slug}`">برگشت به دوره</router-link>
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
.videoPlayer {
  border-radius: 25px !important;
}
.card-background {
  background: #27293d;
  border-radius: 25px;
}

.purchase-status {
  font-size: 0.9rem;
}
.outline {
  border-radius: 25px;
}

.pricehighlight {
  font-size: 0.8rem;
  font-weight: 600;
}

.course-title {
  font-size: 1.1rem;
}

.course-subtitle {
  font-size: 0.8rem;
}
.course-info {
  border-top: 3px solid rgba(110, 85, 85, 0.473);
}

.bold {
  font-weight: 600;
}

.infoBox {
  background-image: linear-gradient(180deg, #3a2669, #27293d);
  /* padding: 20px 0; */
  /* border: 0.4px solid #49494928; */
  border-radius: 25px;
  min-height: 100%;
}

.courseInstructorImage {
  width: 2.8rem;
  margin: 0 auto;
  border-radius: 50%;
}

.m-widget7 .m-widget7__courseimage {
  border-radius: 15px;
}

.m-widget7 .m-widget7__description {
  text-align: center;
  margin-top: 4rem;
  padding: 0 30px;
  font-size: 1.1rem;
}

.m-widget7 .m-widget7__user {
  margin: 0 auto;
  display: table;
  margin-top: 0.35rem;
  margin-bottom: 1rem;
}

.m-widget7 .m-widget7__user .m-widget7__user-img .m-widget7__img {
  width: 2.3rem;
  border-radius: 50%;
  margin-top: 1.14rem;
}

.m-widget7 .m-widget7__user .m-widget7__info {
  display: table-cell;
}

.m-widget7 .m-widget7__user .m-widget7__info .m-widget7__username {
  margin-top: 0.71rem;
  margin-left: 0.71rem;
  font-size: 0.8rem;
  font-weight: 500;
}

.m-widget7 .m-widget7__user .m-widget7__info .m-widget7__time {
  margin-left: 0.71rem;
  margin-top: 0.71rem;
  font-size: 0.75rem;
}

.m-widget7 .m-widget7__button {
  text-align: center;
  margin-bottom: 1.85rem;
}

.m-widget7 .m-widget7__description {
  color: #575962;
}

.m-widget7 .m-widget7__info .m-widget7__username {
  color: #575962;
}

.m-widget7 .m-widget7__info .m-widget7__time {
  color: #9c9c9c !important;
}

.m-widget7.m-widget7--skin-dark .m-widget7__description {
  color: #fff;
}

.m-widget7.m-widget7--skin-dark .m-widget7__info .m-widget7__username {
  color: #fff;
}

.m-widget7.m-widget7--skin-dark .m-widget7__info .m-widget7__time {
  color: #fff;
}

.plyr__video-wrapper {
  border-radius: 25px;
}

.plyr--video {
  background: #000;
  overflow: hidden;
  border-radius: 25px;
}

.badge-size {
  font-size: 0.9rem;
  font-weight: 600;
}
.swal-modal {
  .swal-text {
    text-align: center;
  }
}
</style>
