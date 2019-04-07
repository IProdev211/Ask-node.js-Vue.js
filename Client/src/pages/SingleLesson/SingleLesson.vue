<template>
  <div>
    <div class="row">
      <!-- Video Section -->
      <div class="col-md-12 card-background card-body text-center my-3">
        <div class="row">
          <!-- Course Info DIV  -->
          <div class="col-lg-3 col-md-12 col-sm-12 mb-3 container">
            <div class="hover m-widget7 m-widget7--skin-dark infoBox">
              <!-- COURSE HEADER / LEARNING OBJECTIVES -->
              <div class="head-section px-3">
                <p class="course-title font-weight-bold pt-3">UNIT NAME GOES HERE</p>
                <p class="course-subtitle text-muted pb-4">COURSE NAME GOES HERE</p>

                <p
                  class="lead"
                >در این سخنرانی شما اصول زبان انگلیسی را خواهید آموخت. ما اسم ها، فعل ها، صفت ها، اعراض ها و خیلی بیشتر را پوشش خواهیم داد.</p>
              </div>
              <hr>
              <div class="head-section purchase-status px-3">
                <p v-if="notEnrolled" class="text-danger">
                  برای دسترسی به این درس لطفا لینک
                  خرید را دنبال کنید.
                </p>
                <p v-else class="text-success">شما به طور کامل به این دوره دسترسی دارید.</p>
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
                  <h5 class="bold">25/01/2019</h5>
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
                  <h5 class="bold">13:22:57</h5>
                </div>
              </div>
              <!-- COURSE PRICE  -->
              <div v-if="notEnrolled" class="d-flex justify-content-between px-3 pt-1">
                <div>
                  <h5>
                    <i class="tim-icons icon-money-coins pl-2"></i>قیمت:
                  </h5>
                </div>
                <div>
                  <h5 class="bold">149,000 Tomans</h5>
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
                  <h5 class="bold">1,542</h5>
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
                  <h5 class="bold">Arya Doroudian</h5>
                </div>
              </div>
              <base-button native-type="submit" class="btn-fill btn-success btn btn-sm">خرید</base-button>
            </div>
          </div>
          <!-- video element -->
          <div class="col-lg-9 col-md-12 col-sm-12 mb-3">
            <vue-plyr class="videoWidth videoPlayer">
              <video poster="poster.png" src="video.mp4">
                <source
                  src="https://cdn.plyr.io/static/demo/View_From_A_Blue_Moon_Trailer-720p.mp4"
                  type="video/mp4"
                  size="720"
                >
                <track kind="captions" label="English" srclang="en" src="captions-en.vtt" default>
              </video>
            </vue-plyr>
          </div>
        </div>
        <p class="card-description py-3">
          "The only person who is educated is the one who has learned how to
          learn and change - Carl Rogers"
        </p>
      </div>
      <!-- Timeline Unit Section -->
      <div class="col-md-12 pt-2">
        <AllUnits></AllUnits>
      </div>
    </div>
  </div>
</template>
<script>
import AllUnits from './Components/AllUnits.vue';
import { TimeLine, TimeLineItem } from 'src/components';

export default {
  components: {
    AllUnits,
    TimeLine,
    TimeLineItem
  },
  data() {
    return {
      notEnrolled: true
    };
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
</style>
