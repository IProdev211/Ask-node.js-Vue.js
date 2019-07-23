<template>
  <div>
    <div v-if="id" :key="id">
      <div class="top-banner">
        <div class="pt-4 pb-2">
          <div class="text-center">
            <!-- Course Title -->
            <h1 class="course-title">{{ title }}</h1>
            <p class="episode-title" v-if="episode.id">{{ course.title }}</p>
            <!-- Course Image -->
            <img class="course-image rounded-circle img-fluid py-4" :src="course.image" />
          </div>

          <div class="body text-center container pt-3 px-5" v-html="body"></div>
          <!-- COURSE INFORMATION -->
          <div class="container pt-5 text-center d-flex justify-content-between">
            <!-- COURSE CREATED AT -->
            <div class="col">
              <h5 class="icon-data">
                <i class="pl-1 icon far fa-calendar-alt"></i>
                <span class="icon-text pr-1 d-none d-md-block">ایجاد شده در</span>
                {{ getEpisodeCreateDate() }}
              </h5>
            </div>

            <!-- COURSE LENGTH -->
            <div class="col">
              <h5 class="icon-data">
                <i class="pl-1 icon far fa-clock"></i>
                <span
                  class="icon-text pr-1 d-none d-md-block"
                >{{ episode.time ? "زمان این درس" : "زمان کل دوره" }}</span>
                {{ episode.time ? episodeTime : courseTime }}
              </h5>
            </div>

            <!-- COURSE USERS  -->
            <div class="col" v-if="notEnrolled">
              <h5 class="icon-data">
                <i class="pl-1 icon fas fa-users"></i>
                <span class="icon-text pr-1 d-none d-md-block">تعداد شرکت کنندگان</span>
                {{ enrolledCount }}
              </h5>
            </div>

            <!-- COURSE PRICE  -->
            <div class="col" v-if="notEnrolled && type == 'paid'">
              <h5 class="icon-data">
                <i class="pl-1 icon fas fa-money-check-alt"></i>
                <span class="icon-text pr-1 d-none d-md-block">قیمت</span>
                {{ getCoursePrice() }}
              </h5>
            </div>

            <!-- INSTRUCTOR -->
            <div class="col">
              <h5 class="icon-data">
                <i class="pl-1 icon fas fa-chalkboard-teacher"></i>
                <span class="icon-text pr-1 d-none d-md-block">مدرس</span>
                {{ course.user.name }}
              </h5>
            </div>
          </div>
        </div>
      </div>

      <!-------------- COURSE INFO SECTION  -------------->
      <div class="container">
        <div class="pb-3">
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
      </div>

      <!-- VIDEO SECTION -->
      <div class="container">
        <div class="py-3">
          <vue-plyr class="plyr--video" :key="id">
            <video>
              <source :src="`/api/v1${download}`" type="video/mp4" size="720" />
            </video>
          </vue-plyr>
        </div>

        <!-- VIDEO BUTTONS -->
        <div class="video-buttons">
          <video-buttons />
        </div>

        <div class="all-units py-5">
          <h4 class="text-right pr-3 pt-4">سرفصل دوره</h4>
          <!-- Timeline Unit Section -->
          <AllUnits
            :course="course"
            :episodes="course.episodes"
            :scrollable="false"
            :maxepisodes="4"
            :purchased="! notEnrolled"
            @buy="openBuyCourse"
          ></AllUnits>
          <p
            class="quote-text text-center pb-2 d-none d-md-block"
          >"تا زمانی که متوقف نشوید، مهم نیست که چقدر آهسته حرکت می کنید."</p>
        </div>

        <!-- <div class="row pt-4">
            <div class="col-lg-3 col-md-6" v-for="course in topCourses" v-bind:key="course.id">
              <Course v-bind="course"></Course>
            </div>
        </div>-->
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
import CustomCard from './Components/CustomCard.vue';
import VideoButtons from './Components/VideoButtons.vue';

import moment from 'jalali-moment';
import backend from '../../backend';
import time from '../../util/time';
import { Modal } from 'src/components/index';
import Swal from 'sweetalert';
export default {
  components: {
    AllUnits,
    CustomCard,
    VideoButtons,
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
            `courses/${this.$route.params.course}/unit-${this.$route.params.unit}`
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


<style lang="scss" scoped>
.swal-text-center {
  .swal-text {
    text-align: center !important;
  }
}

.top-banner {
  background-image: linear-gradient(270deg, #351dbd, #b835cc);

  .course-title {
    font-size: 1.7rem;
    font-family: IranSansBold;
    color: #fff !important;
    line-height: inherit;
    margin: 0;
    padding: 0;
  }

  .episode-title {
    font-size: 1em;
    color: rgba(255, 255, 255, 0.795) !important;
  }

  .course-explanation {
    font-size: 1.2rem;
    font-family: IranSans;
    color: #fff !important;
  }

  .body {
    /deep/ p {
      color: #fff !important;
      font-size: 1.1em !important;
      line-height: inherit !important;
    }
  }
}

.course-image {
  width: 150px;
}

.modal-title {
  font-size: 1rem;
}

.icon {
  font-size: 1.4em;
  color: rgba(255, 255, 255, 0.815) !important;
  display: block;
  padding-bottom: 8px;
}

.icon-text {
  font-size: 0.75em;
  color: rgba(255, 255, 255, 0.493) !important;
  font-family: IranSans;
  padding-left: 0;
  display: block;
  padding-bottom: 4px;
}

.icon-data {
  font-size: 1.1em;
  font-family: IranSansBold;
  color: rgba(255, 255, 255, 0.87) !important;
}

@media (max-width: 768px) {
  .custom-button {
    font-size: 0.9em;
    font-weight: 0;
    padding: 10px 10px;
  }

  .icon {
    font-size: 0.9rem;
    display: block;
    padding-bottom: 10px;
  }

  .icon-data {
    font-size: 0.7rem;
  }

  .icon-text {
    font-size: 0.7rem;
    padding-left: 0;
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
  color: rgb(163, 163, 163) !important;
}

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

h4 {
  font-family: IranSansBold;
  font-size: 1.3em;
}

@media (min-width: 480px) {
  .plyr--video .plyr__controls {
    border-radius: 25px !important;
  }
}
</style>