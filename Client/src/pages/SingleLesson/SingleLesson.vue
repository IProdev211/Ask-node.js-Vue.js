<template>
  <div class="container">
    <div v-if="id" :key="id">
      <div class="container text-right pb-4">
        <!-- Course Title -->
        <h1 class="course-title">{{ title }}</h1>
        <p class="text-muted" v-if="episode.id">{{ course.title }}</p>

        <!-- COURSE DESCRIPTION -->
        <div class="py-5">
          <p class="course-subtitle pb-1">توضیحات:</p>
          <div v-html="body"></div>
        </div>
      </div>

      <!-------------- COURSE INFO SECTION  -------------->
      <section class="container">
        <div class="card text-center pt-4 mt-2">
          <div class="row justify-content-sm-center">
            <!-- COURSE CREATED AT -->
            <div class="col py-2">
              <i class="pl-2 icon far fa-calendar-alt"></i>
              <p class="icon-text pr-1">ایجاد شده در</p>
              <h5 class="icon-data pl-2">{{ getEpisodeCreateDate() }}</h5>
            </div>
            <!-- COURSE LENGTH -->
            <div class="col py-2">
              <i class="pl-2 icon far fa-clock"></i>
              <p class="icon-text pr-1">طول دوره</p>
              <h5 class="icon-data pl-2">{{ episode.time ? episodeTime : courseTime }}</h5>
            </div>
            <!-- COURSE PRICE  -->
            <div class="col py-2" v-if="notEnrolled && type == 'paid'">
              <i class="pl-2 icon fas fa-money-check-alt"></i>
              <p class="icon-text pr-1">قیمت</p>
              <h5 class="icon-data pl-2">{{ getCoursePrice() }}</h5>
            </div>
            <div class="w-100 d-md-none"></div>
            <!-- COURSE USERS  -->
            <div class="col py-2">
              <i class="pl-2 icon fas fa-users"></i>
              <p class="icon-text pr-1">تعداد شرکت کنندگان</p>
              <h5 class="icon-data pl-2">{{ enrolledCount }}</h5>
            </div>
            <!-- COURSE INSTRUCTOR -->
            <div class="col py-2">
              <i class="pl-2 icon fas fa-chalkboard-teacher"></i>
              <p class="icon-text pr-1">معلم</p>
              <h5 class="icon-data pl-2">{{ course.user.name }}</h5>
            </div>
          </div>
        </div>
        <!-- COURSE PRICING STRUCTURE -->
        <div class="container pb-3">
          <span
            class="head-section purchase-status text-right"
            v-if="notEnrolled && type != 'free'"
          >
            <p v-if="type == 'paid'" class="pay-text text-danger">
              <i class="fas fa-info pl-3 pay-icon"></i>
              برای دسترسی به این درس لطفا لینک
              خرید را دنبال کنید.
              <span
                class="text-right"
                v-if="notEnrolled && type == 'paid'"
              >
                <span class="pr-2">
                  <base-button
                    @click="openBuyCourse"
                    native-type="button"
                    class="btn-fill btn-danger btn btn-sm"
                  >تهیه درس غیرحضوری</base-button>
                </span>
              </span>
            </p>
            <p v-else-if="type == 'vip'" class="text-danger pay-text">
              <i class="fas fa-info pl-3 pay-icon"></i>
              برای دسترسی به این درس اکانت VIP تهیه کنید.
              <span class="pr-2">
                <router-link to="/courses">
                  <base-button native-type="submit" type="danger" class="btn btn-sm">تهیه عضویت ویژه</base-button>
                </router-link>
              </span>
            </p>
          </span>
        </div>
        <!-- video element -->
        <div class="video-container">
          <vue-plyr class="plyr--video text-rtl" :key="id">
            <video>
              <!-- <video poster="poster.png" src="video.mp4"> -->
              <source :src="`/api/v1${download}`" type="video/mp4" size="720">
              <!-- <track kind="captions" label="English" srclang="en" src="captions-en.vtt" default> -->
            </video>
          </vue-plyr>
        </div>
      </section>

      <p
        class="quote-text text-center py-3 d-none d-md-block"
      >"تا زمانی که متوقف نشوید، مهم نیست که چقدر آهسته حرکت می کنید."</p>

      <!-- Timeline Unit Section -->
      <div class="col-md-12 py-3">
        <AllUnits
          :course="course"
          :episodes="course.episodes"
          :scrollable="true"
          :maxepisodes="30"
          :purchased="! notEnrolled"
          @buy="openBuyCourse"
        ></AllUnits>
      </div>
    </div>
    <modal
      ref="buymodal"
      centered="true"
      footerClasses="justify-content-center"
      type="notice"
    >
      <h5 slot="header" class="modal-title">خرید دوره {{ course.title }}</h5>
      <div slog="body" class="text-right rtl">
        <p>پرداخت از درگاه بانک با استفاده از کلیه کارت‌های عضو شتاب</p>
        <ul class="list-group">
          <li class="list-group-item">
            <strong class="float-right text-dark">قیمت دوره</strong>
            <span class="float-left text-success">{{ getCoursePrice() }}</span>
          </li>
        </ul>
      </div>
      <div slot="footer" class="d-block w-100">
        <base-button
          @click="buyCourseListener"
          native-type="button"
          :loading="loading"
          class="btn-block btn-success d-block w-100"
        >پرداخت از درگاه</base-button>
      </div>
    </modal>
  </div>
</template>
<script>
import AllUnits from './Components/AllUnits.vue';
import moment from 'jalali-moment';
import backend from '../../backend';
import time from '../../util/time';
import { Modal } from 'src/components/index';
export default {
  components: {
    AllUnits,
    modal: Modal
  },
  data() {
    return {
      notEnrolled: true,
      enrolledCount: true,
      course: {
        id: '',
        title: '',
        slug: '',
        body: '',
        image: '',
        categories: [],
        user: {
          id: '',
          name: ''
        },
        episodes: [],
        price: '',
        createdAt: '',
        download: ''
      },
      episode: {
        id: '',
        title: '',
        body: '',
        type: '',
        number: 0,
        createdAt: '',
        download: '',
        time: '',
        downloadCount: 0,
        viewCount: 0,
        commentCount: 0
      },
      id: '',
      title: '',
      type: '',
      body: '',
      download: ''
    };
  },
  methods: {
    dataLoad() {
      if (this.$route.name === 'Single Lesson') {
        backend
          .get(
            `courses/${this.$route.params.course}/unit-${
              this.$route.params.unit
            }`
          )
          .then(response => {
            this.episode = response.data.data.episode;
            this.course = response.data.data.course;
            this.notEnrolled = !response.data.data.enrolled;
            this.enrolledCount = response.data.data.enrolledCount;
            this.id = this.episode.id;
            this.title = this.episode.title;
            this.type = this.episode.type.toLowerCase();
            this.body = this.episode.body;
            this.download = this.episode.download;
            if (this.notEnrolled) {
              this.openBuyCourse();
            }
          });
      } else {
        backend.get(`courses/${this.$route.params.slug}`).then(response => {
          this.course = response.data.data.course;
          this.notEnrolled = !response.data.data.enrolled;
          this.enrolledCount = response.data.data.enrolledCount;
          this.id = this.course.id;
          this.title = this.course.title;
          this.type = this.course.type;
          this.body = this.course.body;
          this.download = this.course.download;
        });
        if (
          this.$route.query.hasOwnProperty('Authority') &&
          this.$route.query.hasOwnProperty('Status')
        ) {
          const authority = this.$route.query.Authority;
          const status = this.$route.query.Status;
          if (status !== 'OK') {
            Swal({
              title: 'تراکنش ناموفق',
              text: `تراکنش شما با موفقیت پرداخت نشد. درصورتی که مبلغی از حساب بانکی شما کسر شده، توسط سیستم بانکی طی 48 ساعت آینده مرجوع خواهد شد`,
              icon: 'warning'
            });
          } else {
            backend
              .post(`courses/payments/verification`, {
                status: status,
                authority: authority
              })
              .then(response => {
                if (response.data.status === 'error') {
                  Swal({
                    title: 'تراکنش ناموفق',
                    text: `تراکنش شما با موفقیت پرداخت نشد.<br>درصورتی که مبلغی از حساب بانکی شما کسر شده، توسط سیستم بانکی طی 48 ساعت آینده مرجوع خواهد شد`,
                    icon: 'warning'
                  });
                  return;
                }
                Swal({
                  title: 'تراکنش موفق',
                  text: `خرید دوره با موفقیت انجام شد.`,
                  icon: 'success'
                });
                this.enrolled = true;
                this.enrolledCount++;
              })
              .catch(err => {
                console.log('error', err);
              });
          }
        }
      }
    },
    getEpisodeCreateDate() {
      return moment(
        this.episode.createdAt ? this.episode.createdAt : this.course.createdAt
      )
        .locale('fa')
        .format('YYYY/MM/DD');
    },
    getCoursePrice() {
      switch (this.course.type.toLowerCase()) {
        case 'free':
          return 'رایگان !';
        case 'cash':
        case 'paid':
          return this.course.price + ' تومان';
        case 'vip':
          return 'اکانت VIP نیاز است';
      }
    },
    openBuyCourse() {
      console.log(this.$refs);
      this.$refs.buymodal.show = true;
    },
    buyCourseListener() {
      this.loading = true;
      backend.post(`courses/${this.course.id}/buy`).then(response => {
        window.location.href = response.data.redirect;
      });
    }
  },
  computed: {
    episodeTime() {
      return time.secondsToTime(time.timeToSeconds(this.episode.time));
    },
    courseTime() {
      let seconds = 0;
      for (const episode of this.course.episodes) {
        seconds += time.timeToSeconds(episode.time);
      }
      return time.secondsToTime(seconds);
    }
  },
  mounted() {
    this.dataLoad();
  },
  watch: {
    '$route.params.unit': function() {
      this.dataLoad();
    },
    '$route.params.slug': function() {
      this.dataLoad();
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  border-radius: 25px;
  background: #1c2135;
}

.icon {
  font-size: 1.7rem;
  color: rgb(238, 238, 238);
  padding-bottom: 6px;
}

.icon-text {
  font-size: 0.7rem;
  color: rgb(177, 177, 177);
}

.icon-data {
  font-size: 0.9rem;
  font-weight: 600;
  color: #fff;
}
@media (max-width: 768px) {
  .video-container {
    padding: 0 4px;
  }
  .icon {
    font-size: 1.2rem;
  }

  .icon-text {
    font-size: 0.7rem;
  }

  .icon-data {
    font-size: 0.8rem;
  }

  .pay-text {
    font-size: 1rem;
  }
}
.pay-text {
  font-size: 1rem;
  font-weight: 600;
}

.pay-icon {
  font-size: 1rem;
  font-weight: 600;
  color: rgb(0, 255, 98);
}

.quote-text {
  font-size: 0.8rem;
  color: rgb(109, 109, 109);
}

.card-background {
  background: #27293d;
  border-radius: 25px;
}

.purchase-status {
  font-size: 1.1rem;
}

.pricehighlight {
  font-size: 0.8rem;
  font-weight: 600;
}

.course-title {
  font-size: 1.7rem;
  font-weight: 600;
  line-height: inherit;
  margin: 0;
  padding: 0;
}

.course-subtitle {
  font-size: 1.2rem;
}

.course-info {
  border-top: 3px solid rgba(110, 85, 85, 0.473);
}

.courseInstructorImage {
  width: 2.8rem;
  margin: 0 auto;
  border-radius: 50%;
}

.plyr--video {
  border-radius: 25px !important;
}

.plyr__video-wrapper {
  border-radius: 25px !important;
}

.plyr--video .plyr__controls {
  border-radius: 25px !important;
}

@media (min-width: 480px) {
  .plyr--video .plyr__controls {
    border-radius: 25px !important;
  }
}
</style>