<template>
  <div>
    <div v-if="id" :key="id">
      <div class="top-banner">
        <div class="container">
          <!-- Course Title & Description -->
          <div class="text-center px-3 py-5">
            <h1 class="course-title">{{ title }}</h1>
            <!-- Course Image -->
            <img class="course-image rounded-circle img-fluid py-4" :src="course.image" />
            <p class="episode-title" v-if="episode.id">{{ course.title }}</p>
            <div class="body pt-3" v-html="body"></div>
          </div>
          <div class="py-3 row">
            <!-- COURSE CREATED AT -->
            <div class="col d-none d-md-block text-center">
              <i class="icon far fa-calendar-alt"></i>
              <p class="icon-data">
                {{ getEpisodeCreateDate() }}
                <span class="icon-text pr-1">ایجاد شده در</span>
              </p>
            </div>

            <!-- COURSE LENGTH -->
            <div class="col text-center">
              <i class="icon far fa-clock"></i>
              <h5 class="icon-data">
                {{ episode.time ? episodeTime : courseTime }}
                <span
                  class="icon-text pr-1"
                >{{ episode.time ? "زمان این درس" : "زمان کل دوره" }}</span>
              </h5>
            </div>

            <!----------------- COURSE USERS  ----------------->
            <!-- <div  v-if="notEnrolled">
              <h5 class="icon-data">
                <i class=" icon fas fa-users"></i>
                {{ enrolledCount }}
                <span class="icon-text pr-1 d-none d-md-block">تعداد شرکت کنندگان</span>
              </h5>
            </div>-->

            <!-- COURSE PRICE  -->
            <!-- <div  v-if="notEnrolled && type == 'paid'"> -->
            <div class="col text-center" v-if="notEnrolled">
              <i class="icon fas fa-money-check-alt"></i>
              <h5 class="icon-data">
                {{ getCoursePrice() }}
                <span class="icon-text pr-1">قیمت دوره</span>
              </h5>
            </div>

            <!-- INSTRUCTOR -->
            <div class="col text-center">
              <i class="icon fas fa-chalkboard-teacher"></i>
              <h5 class="icon-data">
                {{ course.user.name }}
                <span class="icon-text pr-1">مدرس دوره</span>
              </h5>
            </div>
          </div>
        </div>

        <!-------------- COURSE INFO SECTION  -------------->
        <div class="py-3 container">
          <span
            class="head-section purchase-status text-center"
            v-if="notEnrolled && type.toLowerCase() != 'free'"
          >
            <!-- <p v-if="type == 'paid'" class="pay-text text-center">
              برای دسترسی به این درس لطفا لینک
            خرید را دنبال کنید.-->
            <div class="text-center" v-if="type.toLowerCase() == 'paid'">
              <!-- <div class="w-100 d-md-none pt-2"></div> -->
              <base-button
                @click="openBuyCourse"
                native-type="button"
                class="btn btn-round btn-danger btn mt-3 mr-2 buy-btn"
              >
                <i class="fas fa-shopping-basket pl-2"></i>
                تهیه دوره
              </base-button>
              <p class="text-center pay-text pt-2">
                برای دسترسی به این درس لطفا لینک
                خرید را دنبال کنید.
              </p>
            </div>
            <!-- </p> -->
            <p v-else-if="type.toLowerCase() == 'vip'" class="text-center pay-text">
              <!-- <i class="fas fa-info pl-3"></i> -->
              برای دسترسی به این درس اکانت VIP تهیه کنید.
              <span class="text-center pr-3">
                <div class="w-100 d-md-none pt-2"></div>
                <router-link to="/courses">
                  <base-button native-type="submit" type="info" class="btn">تهیه عضویت ویژه</base-button>
                </router-link>
              </span>
            </p>
          </span>
        </div>
      </div>
    </div>

    <!-- VIDEO SECTION -->
    <div class="container">
      <div class="pt-5">
        <vue-plyr class="plyr--video" :key="id">
          <video>
            <source :src="`/api/v1${download}`" type="video/mp4" size="720" />
          </video>
        </vue-plyr>
      </div>
      <!-- VIDEO BUTTONS -->
      <div class="video-buttons">
        <video-buttons
          :next="next"
          :prev="prev"
          v-on:nextLesson="nextLessonListener"
          v-on:prevLesson="prevLessonListener"
          :loadingNext="loadingNext"
          :loadingPrev="loadingPrev"
          :isDoneEpisode="isDoneEpisode"
          :canMarkAsDone="canMarkAsDone"
          :loadingMarkAsDone="loadingMarkAsDone"
          v-on:markAsDone="markAsDone"
        />
      </div>
      <div class="all-units py-5">
        <h4 class="text-right pr-3 py-4">سرفصل دوره</h4>
        <!-- Timeline Unit Section -->
        <AllUnits
          :course="course"
          :episodes="course.episodes"
          :scrollable="false"
          :maxepisodes="4"
          :purchased="! notEnrolled"
          :courseDonePercentage="courseDonePercentage"
          :courseRemainPercentage="courseRemainPercentage"
          :activeEpisode="this.episode ? this.episode.id : ''"
          @buy="openBuyCourse"
        ></AllUnits>
        <p
          class="quote-text text-center pb-2 d-none d-md-block"
        >"تا زمانی که متوقف نشوید، مهم نیست که چقدر آهسته حرکت می کنید."</p>
      </div>
    </div>
    <modal ref="buymodal" centered="true" footerClasses="justify-content-center" type="notice">
      <h5 slot="header" class="modal-title">
        خرید دوره:
        <span class="course-title-modal text-danger">{{ course.title }}</span>
      </h5>
      <div slog="body" class="text-right rtl">
        <p>{{ this.$root._data.user ? "پرداخت از درگاه بانک با استفاده از کلیه کارت‌های عضو شتاب." : "برای ثبت نام در این دوره باید حتما به حساب کاربری اسک آریا وارد شوید." }}</p>
        <ul class="list-group">
          <li class="list-group-item">
            <p class="float-right text-dark course-price-title">قیمت دوره</p>
            <span class="float-left text-danger">{{ getCoursePrice() }}</span>
          </li>
        </ul>
      </div>
      <div slot="footer" class="d-block w-100">
        <base-button
          @click="buyCourseListener"
          native-type="button"
          class="btn-block btn-success d-block w-100"
        >{{ this.$root._data.user ? "پرداخت از درگاه" : "ورود" }}</base-button>
      </div>
    </modal>
  </div>
</template>
<script>
import AllUnits from './Components/AllUnits.vue';
import CustomCard from './Components/CustomCard.vue';
import VideoButtons from './Components/VideoButtons.vue';
import { Carousel, CarouselItem } from 'element-ui';

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
    modal: Modal,
    [Carousel.name]: Carousel,
    [CarouselItem.name]: CarouselItem
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
      canClose: true,
      next: true,
      prev: true,
      nextEpisode: undefined,
      prevEpisode: undefined,
      loadingNext: false,
      loadingPrev: false,
      isDoneEpisode: false,
      canMarkAsDone: false,
      loadingMarkAsDone: false,
      courseDonePercentage: 0,
      courseRemainPercentage: 0
    };
  },
  methods: {
    dataLoad() {
      if (this.$route.name === 'Single Lesson') {
        backend
          .get(
            `courses/${this.$route.params.course}/unit-${this.$route.params.unit}`
          )
          .then(
            response => {
              this.episode = response.data.data.episode;
              this.course = response.data.data.course;
              this.notEnrolled = !response.data.data.enrolled;
              //   console.log("this.notEnrolled", this.notEnrolled);
              this.enrolledCount = response.data.data.enrolledCount;
              this.id = this.episode.id;
              this.title = this.episode.title;
              this.type = this.episode.type.toLowerCase();
              this.body = this.episode.body;
              this.download = this.episode.download;
              this.next = false;
              this.nextEpisode = undefined;
              if (this.episode.number == 1) {
                this.prev = false;
                this.prevEpisode = undefined;
              }
              for (let i = 0; i < this.course.episodes.length; i++) {
                if (this.course.episodes[i].number > this.episode.number) {
                  this.next = true;
                  this.nextEpisode = this.course.episodes[i];
                  break;
                }
              }
              for (let i = this.course.episodes.length - 1; i >= 0; i--) {
                if (this.course.episodes[i].number < this.episode.number) {
                  this.prev = true;
                  this.prevEpisode = this.course.episodes[i];
                  break;
                }
              }
              this.loadingNext = false;
              this.loadingPrev = false;
              this.canMarkAsDone = true;
              this.loadingMarkAsDone = false;
              this.isDoneEpisode = this.episode.done;
              this.courseDonePercentage = this.course.done;
              this.courseRemainPercentage = (100 - this.course.done).toFixed(2);
            },
            err => {
              this.loadingNext = false;
              this.loadingPrev = false;
              this.loadingMarkAsDone = false;
            }
          );
      } else {
        this.canMarkAsDone = false;
        backend.get(`courses/${this.$route.params.slug}`).then(
          response => {
            this.course = response.data.data.course;
            this.notEnrolled = !response.data.data.enrolled;
            console.log('this.notEnrolled', this.notEnrolled);
            this.enrolledCount = response.data.data.enrolledCount;
            this.id = this.course.id;
            this.title = this.course.title;
            this.type = this.course.type;
            this.body = this.course.body;
            this.download = this.course.download;
            this.prev = false;
            this.next = false;
            if (this.course.episodes.length) {
              this.next = true;
              this.nextEpisode = this.course.episodes[0];
            }
            this.loadingNext = false;
            this.loadingPrev = false;
            this.loadingMarkAsDone = false;
            this.courseDonePercentage = this.course.done;
            this.courseRemainPercentage = (100 - this.course.done).toFixed(2);
          },
          err => {
            this.loadingNext = false;
            this.loadingPrev = false;
            this.loadingMarkAsDone = false;
          }
        );
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
      console.log('this.course.type.price', this.course.type);
      switch (this.type.toLowerCase()) {
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
      if (this.$root._data.user) {
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
      } else {
        this.$refs.buymodal.show = false;
        setTimeout(() => {
          this.$router.push({
            name: 'Login',
            query: { backTo: encodeURI(`courses/${this.course.slug}`) }
          });
        }, 100);
      }
    },
    nextLessonListener(e) {
      if (!this.next) {
        return;
      }
      if (
        ['cash', 'paid', 'vip'].indexOf(this.nextEpisode.type.toLowerCase()) >
          0 &&
        this.notEnrolled
      ) {
        this.openBuyCourse();
      } else {
        this.loadingNext = true;
        this.$router.push(
          '/courses/' + this.course.slug + '/unit-' + this.nextEpisode.number
        );
      }
    },
    prevLessonListener(e) {
      if (!this.prev) {
        return;
      }
      if (
        ['cash', 'paid', 'vip'].indexOf(this.prevEpisode.type.toLowerCase()) >
          0 &&
        this.notEnrolled
      ) {
        this.openBuyCourse();
      } else {
        console.log('this.prevEpisode', this.prevEpisode);
        this.loadingPrev = true;
        this.$router.push(
          '/courses/' + this.course.slug + '/unit-' + this.prevEpisode.number
        );
      }
    },
    markAsDone() {
      if (!this.canMarkAsDone) {
        return;
      }
      this.loadingMarkAsDone = true;
      backend
        .post(
          `/course/episodes/${this.episode.id}/${
            this.episode.done ? 'mark-as-notdone' : 'mark-as-done'
          }`
        )
        .then(
          response => {
            this.courseDonePercentage = response.data.done;
            this.courseRemainPercentage = (100 - response.data.done).toFixed(2);
            this.loadingMarkAsDone = false;
            this.isDoneEpisode = !this.isDoneEpisode;
            this.episode.done = !this.episode.done;
            for (const item of this.course.episodes) {
              if (item.id == this.episode.id) {
                item.done = !item.done;
                break;
              }
            }
          },
          err => {
            this.loadingMarkAsDone = false;
            this.$notify({
              type: 'danger',
              message: 'ارتباط با سرور بدرستی برقرار نشد.',
              icon: 'tim-icons icon-bell-55'
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
.top-banner {
  background-image: linear-gradient(270deg, #870eb8, #351dbd);
}

.buy-btn {
  font-family: IranSansBold;
}

.custom-padding {
  padding: 0 10%;
}
.swal-text-center {
  .swal-text {
    text-align: center !important;
  }
}

.course-title-modal {
  font-family: IranSansDNBold;
}

.course-price-title {
  font-family: IranSansBold;
}

.course-title {
  font-size: 1.7rem;
  font-family: IranSansBold;
  color: rgb(255, 255, 255) !important;
  line-height: inherit;
  // margin: 0;
  // padding: 0;
}

.episode-title {
  font-size: 1em;
  color: rgba(255, 255, 255, 0.795) !important;
}

.course-explanation {
  font-size: 1.2rem;
  font-family: IranSans;
  color: rgb(255, 255, 255) !important;
}

.body {
  /deep/ p {
    color: rgb(255, 255, 255) !important;
    font-size: 1.2em !important;
    line-height: inherit !important;
  }
}

.course-image {
  width: 150px;
}

.modal-title {
  font-size: 1rem;
}

.icon {
  font-size: 1.8em !important;
  color: rgba(255, 255, 255, 1) !important;
  padding-bottom: 10px;
}

.icon-data {
  font-size: 1.2em;
  font-family: IranSansBold;
  color: rgba(255, 255, 255, 1) !important;
}

.icon-text {
  font-size: 0.75em;
  color: rgba(255, 255, 255, 0.568) !important;
  font-family: IranSans !important;
  padding-left: 0;
  display: block;
}

.pay-text {
  font-size: 0.7em !important;
  color: rgba(255, 255, 255, 0.5) !important;
  font-family: IranSans;
}

@media (max-width: 768px) {
  .custom-button {
    font-size: 0.9em;
    font-weight: 0;
    padding: 10px 10px;
  }

  .icon {
    font-size: 1.6em;
    display: block;
    padding-bottom: 10px;
  }

  .icon-data {
    font-size: 1em;
  }

  .icon-text {
    font-size: 0.7rem;
    padding-left: 0;
  }

  .body {
    /deep/ p {
      color: #fff !important;
      font-size: 1.1em !important;
      line-height: inherit !important;
    }
  }
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

.go-to-top {
  position: fixed; /* Fixed/sticky position */
  bottom: 20px; /* Place the button at the bottom of the page */
  left: 20px; /* Place the button 30px from the left */
  z-index: 99; /* Make sure it does not overlap */
  border: none; /* Remove borders */
  outline: none; /* Remove outline */
  cursor: pointer; /* Add a mouse pointer on hover */
  padding: 10px; /* Some padding */
  border-radius: 5px; /* Rounded corners */
  font-size: 2em; /* Increase font size */
  background-color: rgba(0, 0, 0, 0.15); /* Set a background color */
}

.go-to-top:hover {
  background-color: #555; /* Add a dark-grey background on hover */
  color: white;
}

@media (max-width: 760px) {
  .go-to-top {
    bottom: 15px; /* Place the button at the bottom of the page */
    left: 15px; /* Place the button 30px from the left */
    z-index: 99; /* Make sure it does not overlap */
    padding: 0.3em; /* Some padding */
    font-size: 1.6em; /* Increase font size */
    background-color: rgba(0, 0, 0, 0.02); /* Set a background color */
    color: rgba(15, 15, 15, 0.13);
  }
}
</style>