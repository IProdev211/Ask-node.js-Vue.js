<template>
  <div>
    <div class="row" v-if="id" :key="id">
      <!-- Video Section -->
      <div class="col-md-12 card-background card-body text-center my-3">
        <div class="row">
          <!-- Course Info DIV  -->
          <div class="col-lg-3 col-md-12 col-sm-12 mb-3 container">
            <div class="hover m-widget7 m-widget7--skin-dark infoBox">
              <!-- COURSE HEADER / LEARNING OBJECTIVES -->
              <div class="head-section px-3">
                <h1 class="course-title font-weight-bold pt-3">{{ title }}</h1>
                <p class="course-subtitle text-muted py-2" v-if="episode.id">{{ course.title }}</p>
                <div class="pt-5" v-html="body"></div>
              </div>
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

              <hr>

              <!-- COURSE CREATED AT -->
              <div class="d-flex justify-content-between px-3 pt-1">
                <div>
                  <h5>
                    <i class="tim-icons icon-badge pl-2"></i>ایجاد شده در:
                  </h5>
                </div>
                <div>
                  <h5 class="bold">{{ getEpisodeCreateDate() }}</h5>
                </div>
              </div>
              <!-- COURSE LENGTH -->
              <div class="d-flex justify-content-between px-3 pt-2">
                <div>
                  <h5>
                    <i class="tim-icons icon-watch-time pl-2"></i>طول دوره:
                  </h5>
                </div>
                <div>
                  <h5 class="bold">{{ episode.time ? episodeTime : courseTime }}</h5>
                </div>
              </div>
              <!-- COURSE PRICE  -->
              <div
                v-if="notEnrolled && type == 'paid'"
                class="d-flex justify-content-between px-3 pt-1"
              >
                <div>
                  <h5>
                    <i class="tim-icons icon-money-coins pl-2"></i>قیمت:
                  </h5>
                </div>
                <div>
                  <h5 class="bold">{{ getCoursePrice() }}</h5>
                </div>
              </div>

              <!-- COURSE VIEWS  -->
              <div class="d-flex justify-content-between px-3 pt-1">
                <div>
                  <h5>
                    <i class="tim-icons icon-single-02 pl-2"></i>تعداد شرکت کنندگان:
                  </h5>
                </div>
                <div>
                  <h5 class="bold">{{ enrolledCount }}</h5>
                </div>
              </div>

              <!-- COURSE INSTRUCTOR -->
              <div class="d-flex justify-content-between px-3 pt-1">
                <div>
                  <h5>
                    <i class="tim-icons icon-badge pl-2"></i>معلم:
                  </h5>
                </div>
                <div>
                  <h5 class="bold">{{ course.user.name }}</h5>
                </div>
              </div>
              <div v-if="notEnrolled && type.toLowerCase() == 'paid'">
								<base-button @click="openBuyCourse" native-type="button" class="btn-fill btn-success btn btn-sm">خرید</base-button>
								<modal ref="buymodal" centered="true" footerClasses="justify-content-center" type="notice">
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
										<base-button @click="buyCourseListener" native-type="button" :loading="loading" class="btn-block btn-success d-block w-100">پرداخت از درگاه</base-button>
									</div>
								</modal>
              </div>
            </div>
          </div>
          <!-- video element -->
          <div class="col-lg-9 col-md-12 col-sm-12 mb-3">
            <vue-plyr class="videoWidth videoPlayer plyr--video" :key="id">
              <video poster="poster.png" src="video.mp4">
                <source :src="`/api/v1${download}`" type="video/mp4" size="720">
                <track kind="captions" label="English" srclang="en" src="captions-en.vtt" default>
              </video>
            </vue-plyr>
          </div>
        </div>
        <p
          class="card-description py-3"
        >"تا زمانی که متوقف نشوید، مهم نیست که چقدر آهسته حرکت می کنید."</p>
      </div>
      <!-- Timeline Unit Section -->
      <div class="col-md-12 pt-2">
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
import { Modal } from "src/components/index";
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
        if (this.$route.query.hasOwnProperty('Authority') && this.$route.query.hasOwnProperty('Status')) {
          const authority = this.$route.query.Authority;
          const status = this.$route.query.Status;
          if (status !== "OK") {
            Swal({
              title: 'تراکنش ناموفق',
              text: `تراکنش شما با موفقیت پرداخت نشد. درصورتی که مبلغی از حساب بانکی شما کسر شده، توسط سیستم بانکی طی 48 ساعت آینده مرجوع خواهد شد`,
              icon: 'warning',
            });
          } else {
            backend.post(`courses/payments/verification`, {
              status: status,
              authority: authority,
            }).then((response) => {
              if (response.data.status === "error") {
                Swal({
                  title: 'تراکنش ناموفق',
                  text: `تراکنش شما با موفقیت پرداخت نشد.<br>درصورتی که مبلغی از حساب بانکی شما کسر شده، توسط سیستم بانکی طی 48 ساعت آینده مرجوع خواهد شد`,
                  icon: 'warning',
                });
                return;
              }
              Swal({
                title: 'تراکنش موفق',
                text: `خرید دوره با موفقیت انجام شد.`,
                icon: 'success',
              });
              this.enrolled = true;
              this.enrolledCount++;
            }).catch((err) => {
              console.log("error", err);
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
		},
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
  font-size: 1.3rem;
  line-height: inherit;
  margin: 0;
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
</style>
