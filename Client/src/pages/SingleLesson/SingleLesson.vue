<template>
  <div class="container-fluid">
    <div v-if="id" :key="id">
      <div class="container text-right pb-4">
        <!-- Course Title -->
        <h1 class="course-title">{{ title }}</h1>
        <p class="text-muted" v-if="episode.id">{{ course.title }}</p>

        <!-- COURSE DESCRIPTION -->
        <div class="pt-4">
          <p class="course-subtitle pb-3">توضیحات دوره:</p>
          <div v-html="body"></div>
        </div>
      </div>
      <section>
        <!-------------- COURSE INFO SECTION  -------------->
        <div class="d-flex justify-content-around text-center pt-4">
          <!-- COURSE CREATED AT -->
          <div>
            <i class="pl-2 icon far fa-calendar-alt"></i>
            <p class="icon-text">ایجاد شده در</p>
            <h5 class="icon-data">{{ getEpisodeCreateDate() }}</h5>
          </div>
          <!-- COURSE LENGTH -->
          <div>
            <i class="pl-2 icon far fa-clock"></i>
            <p class="icon-text">طول دوره</p>
            <h5 class="icon-data">{{ episode.time ? episodeTime : courseTime }}</h5>
          </div>
          <!-- COURSE PRICE  -->
          <div
            v-if="notEnrolled && type == 'paid'"
            class="d-flex justify-content-between px-3 pt-1"
          >
            <div>
              <i class="icon tim-icons icon-money-coins pl-2"></i>
              <p class="icon-text">قیمت</p>
            </div>
            <h5 class="icon-data">{{ getCoursePrice() }}</h5>
          </div>
          <!-- COURSE USERS  -->
          <div>
            <i class="pl-2 icon fas fa-users"></i>
            <p class="icon-text">تعداد شرکت کنندگان</p>
            <h5 class="icon-data">{{ enrolledCount }}</h5>
          </div>
          <!-- COURSE INSTRUCTOR -->
          <div>
            <i class="pl-2 icon fas fa-chalkboard-teacher"></i>
            <p class="icon-text">معلم</p>
            <h5 class="icon-data">{{ course.user.name }}</h5>
          </div>
        </div>
        <!-- video element -->
        <div class="video-container">
          <vue-plyr class="plyr--video text-rtl" :key="id">
            <video poster="poster.png" src="video.mp4">
              <source :src="`/api/v1${download}`" type="video/mp4" size="720">
              <!-- <track kind="captions" label="English" srclang="en" src="captions-en.vtt" default> -->
            </video>
          </vue-plyr>
        </div>

        <div>
          <!-- COURSE PRICING STRUCTURE -->
          <div class="head-section purchase-status px-3" v-if="notEnrolled && type != 'free'">
            <hr>
            <p v-if="type == 'paid'" class="text-danger">
              برای دسترسی به این درس لطفا لینک
              خرید را دنبال کنید.
            </p>
            <p
              v-else-if="type == 'vip'"
              class="text-danger"
            >برای دسترسی به این درس اکانت VIP تهیه کنید.</p>
          </div>
          <div v-if="notEnrolled && type == 'paid'">
            <base-button
              @click="openBuyCourse"
              native-type="button"
              class="btn-fill btn-success btn btn-sm"
            >خرید</base-button>
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
        </div>
      </section>

      <p
        class="quote-text text-center py-3"
      >"تا زمانی که متوقف نشوید، مهم نیست که چقدر آهسته حرکت می کنید."</p>
      <!-- Timeline Unit Section -->
      <div class="col-md-12 py-3">
        <AllUnits
          :course="course"
          :episodes="course.episodes"
          :scrollable="true"
          :maxepisodes="8"
          :purchased="! notEnrolled"
        ></AllUnits>
      </div>
    </div>
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
.video-container {
  padding: 0 20px;
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
  font-size: rem;
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
    font-size: 0.6rem;
  }

  .icon-data {
    font-size: 0.7rem;
  }
}

.quote-text {
  font-size: 0.8rem;
  color: rgb(165, 165, 165);
}

.plyr--video {
  border-radius: 20px !important;
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

.plyr__video-wrapper {
  border-radius: 25px;
}

// .plyr--video {
//   background: #000;
//   overflow: hidden;
//   border-radius: 25px;
// }

.badge-size {
  font-size: 0.9rem;
  font-weight: 600;
}
</style>
