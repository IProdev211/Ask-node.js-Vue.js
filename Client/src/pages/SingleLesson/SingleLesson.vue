<template>
  <div>
    <div v-if="id" :key="id">
      <div class="top-banner">
        <div class="container text-right py-5">
          <!-- Course Title -->
          <h1 class="course-title">{{ title }}</h1>
          <p class="episode-title" v-if="episode.id">{{ course.title }}</p>
          <!-- COURSE DESCRIPTION -->
          <p class="course-subtitle pt-5 pb-3">توضیحات:</p>
          <div class="body" v-html="body"></div>

          <!-- COURSE INFORMATION -->
          <div class="text-center pt-5">
            <div class="row justify-content-center">
              <!-- COURSE CREATED AT -->
              <div class="col py-2">
                <i class="pl-2 icon far fa-calendar-alt"></i>
                <!-- <p class="icon-text pr-1">ایجاد شده در</p> -->
                <h5 class="icon-data pt-1 pl-2">{{ getEpisodeCreateDate() }}</h5>
              </div>
              <!-- COURSE LENGTH -->
              <div class="col py-2">
                <i class="pl-2 icon far fa-clock"></i>
                <!-- <p class="icon-text pr-1">{{ episode.time ? "طول درس" : "طول دوره" }}</p> -->
                <h5 class="icon-data pt-1 pl-2">{{ episode.time ? episodeTime : courseTime }}</h5>
              </div>
              <!-- COURSE PRICE  -->
              <div class="col py-2" v-if="notEnrolled && type == 'paid'">
                <i class="pl-2 icon fas fa-money-check-alt"></i>
                <!-- <p class="icon-text pr-1">قیمت</p> -->
                <h5 class="icon-data pt-1 pl-2">{{ getCoursePrice() }}</h5>
              </div>
              <div class="w-100 d-md-none"></div>
              <!-- COURSE USERS  -->
              <div class="col py-2">
                <i class="pl-2 icon fas fa-users"></i>
                <!-- <p class="icon-text pr-1">تعداد شرکت کنندگان</p> -->
                <h5 class="icon-data pt-1 pl-2">{{ enrolledCount }}</h5>
              </div>
              <!-- COURSE INSTRUCTOR -->
              <div class="col py-2">
                <i class="pl-2 icon fas fa-chalkboard-teacher"></i>
                <!-- <p class="icon-text pr-1">معلم</p> -->
                <h5 class="icon-data pt-1 pl-2">{{ course.user.name }}</h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-------------- COURSE INFO SECTION  -------------->
      <section class="container">
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
      </section>

      <div class="row">
        <div class="col-md-8">
          <!-- video element -->
          <div class="video-container">
            <vue-plyr class="plyr--ideo" :key="id">
              <video>
                <!-- <video poster="poster.png" src="video.mp4"> -->
                <source :src="`/api/v1${download}`" type="video/mp4" size="720">
                <!-- <track kind="captions" label="English" srclang="en" src="captions-en.vtt" default> -->
              </video>
            </vue-plyr>
          </div>
          <p
            class="quote-text text-center py-3 d-none d-md-block"
          >"تا زمانی که متوقف نشوید، مهم نیست که چقدر آهسته حرکت می کنید."</p>
        </div>
        <div class="col-md-4">
          <!-- Timeline Unit Section -->
          <div class="container py-3">
            <AllUnits
              :course="course"
              :episodes="course.episodes"
              :scrollable="true"
              :maxepisodes="4"
              :purchased="! notEnrolled"
              @buy="openBuyCourse"
            ></AllUnits>
          </div>
        </div>
      </div>
    </div>
    <modal ref="buymodal" centered="true" footerClasses="justify-content-center" type="notice">
      <h5 slot="header" class="modal-title">
        خرید دوره:
        <span class="font-weight-bold text-danger">{{ course.title }}</span>
      </h5>
      <div slog="body" class="text-right rtl">
        <p>پرداخت از درگاه بانک با استفاده از کلیه کارت‌های عضو شتاب.</p>
        <ul class="list-group">
          <li class="list-group-item">
            <strong class="float-right text-dark">قیمت دوره</strong>
            <span class="float-left text-danger">{{ getCoursePrice() }}</span>
          </li>
        </ul>
      </div>
      <div slot="footer" class="d-block w-100">
        <base-button
          @click="buyCourseListener"
          native-type="button"
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
import Swal from 'sweetalert';
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
      download: '',
      canClose: true
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
    buyCourseListener(e) {
      e.target.disabled = true;
      e.target.innerHTML = `<i class="fas fa-spinner fa-spin"></i>`;
      backend.post(`courses/${this.course.id}/buy`).then(
        response => {
          e.target.disabled = false;
          window.location.href = response.data.redirect;
          e.target.innerHTML = `پرداخت از درگاه`;
        },
        response => {
          e.target.disabled = false;
          e.target.innerHTML = `پرداخت از درگاه`;
          Swal({
            icon: 'error',
            title: 'خطا',
            className: 'swal-text-center',
            text: `ارتباط با سامانه به خوبی برقرار نشد. لطفا اینترنت خود را بررسی کنید.`
          });
        }
      );
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

<style lang="scss">
.swal-text-center {
  .swal-text {
    text-align: center !important;
  }
}
.top-banner {
  background-color: #004966;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='540' height='450' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.04'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/svg%3E");

  .course-title {
    font-size: 1.7rem;
    font-family: IranSansBold;
    color: #fff !important;
    line-height: inherit;
    margin: 0;
    padding: 0;
  }

  .episode-title {
    font-size: 1.1em;
    color: rgb(233, 233, 233) !important;
  }

  .course-subtitle {
    font-size: 1.2rem;
    font-family: IranSansBold;
    color: #fff !important;
  }

  .body {
    /deep/ p {
      color: rgb(255, 255, 255) !important;
      font-size: 1em !important;
      line-height: auto !important;
    }
  }
}

.modal-title {
  font-size: 1rem;
}

.icon {
  font-size: 1.7rem;
  color: #ffffff !important;
  padding-bottom: 8px;
}

.icon-text {
  font-size: 0.65rem;
  color: rgb(247, 247, 247) !important;
  padding-bottom: 3px;
}

.icon-data {
  font-size: 0.9rem;
  font-family: IranSansBold;
  color: #fff !important;
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
  font-family: IranSansBold;
}

.pay-icon {
  font-size: 1rem;
  font-family: IranSansBold;
  color: rgb(0, 255, 98);
}

.quote-text {
  font-size: 0.8rem;
  color: rgb(109, 109, 109);
}

// .card-background {
//   background: #27293d;
//   border-radius: 25px;
// }

.purchase-status {
  font-size: 1.1rem;
}

.pricehighlight {
  font-size: 0.8rem;
  font-family: IranSansBold;
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