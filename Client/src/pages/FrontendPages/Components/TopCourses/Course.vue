<template>
  <div>
    <router-link to="singlecourse">
      <div class="hover m-widget7 m-widget7--skin-dark widget-3">
        <div class="m-widget7__courseimage">
          <img class="m-widget7__courseimage" :src="thumb">
        </div>
        <div class="course__name">
          <h4 class="text-center font-weight-bold course-title pt-4">{{ title }}</h4>
        </div>
        <div class="m-widget7__course__info d-flex justify-content-between text-center pt-2">
          <div>
            <p class="courseTime">
              {{ time }}۶۵۴
              <br>
              <span class="courseTimeSpan">دقیقه صوت و تصویر</span>
            </p>
          </div>

          <div>
            <p class="unitsAvailable">
              ۱۳۶
              <br>
              <span class="unitsAvailableSpan">درس گفتار</span>
            </p>
          </div>
        </div>

        <hr class="fadeline">
        <div class="text-center">
          <div>
            <p class="pricehighlight">
              <i class="tim-icons icon-money-coins pl-2"></i>
              {{ formatedPrice }}
            </p>
          </div>
        </div>
        <hr class="fadeline2">
        <div class="buyCourse text-center">
          <p class="buyCourseTitle pb-3">تهیه دوره‌</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: [
    'title',
    'thumb',
    'time',
    'slug',
    'type',
    'price',
    'updatedAt',
    'user'
  ],
  computed: {
    date() {
      return moment(this.updatedAt).format('MM/DD/YYYY');
    },
    formatedPrice() {
      if (this.type == 'free') {
        return 'رایگان';
      }
      return (
        new Intl.NumberFormat().format(
          parseInt(this.price.replace(',', ''), 10)
        ) + ' تومان '
      );
    }
  }
};
</script>


<style lang="scss" scoped>
.outline {
  border-radius: 20px;
}

.pricehighlight {
  font-size: 1rem;
  color: #fff;
  font-weight: 600;
}

.fadeline {
  height: 1px;
  background-image: linear-gradient(
    90deg,
    rgba(255, 0, 0, 0),
    rgba(145, 161, 145, 0.705) 50%,
    rgba(255, 0, 0, 0) 100%
  );
}

.fadeline2 {
  height: 1px;
  background-image: linear-gradient(
    90deg,
    rgba(255, 0, 0, 0),
    rgba(181, 216, 181, 0.226) 50%,
    rgba(255, 0, 0, 0) 100%
  );
}

.course-info {
  border-top: 3px solid rgba(110, 85, 85, 0.473);
}

.widget-3 {
  background-color: #32325d;
  // padding: 20px 0;
  /* border: 1px solid #1d1d46; */
  border-radius: 25px;
}

.hover:hover,
.hover:focus {
  -webkit-box-shadow: 0 10px 30px -5px rgba(97, 97, 97, 0.144);
  box-shadow: 0 15px 35px -5px rgba(7, 78, 45, 0.288);
  transition: transform 0.6s;
  -webkit-transform: translateY(-6px);
  transform: translateY(-6px);
  cursor: pointer;
}

.m-widget7__title {
  text-align: center;
}

.course-title {
  font-size: 1.2rem;
  color: #f1f1f1;
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
  margin-left: 1.9rem;
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

.m-widget7__course__info {
  margin: 0 15%;
}

.courseTime {
  color: rgb(207, 207, 207);
  font-size: 1.2rem;
  font-weight: 600;
}
.courseTimeSpan {
  font-size: 0.8rem;
  color: #adadad;
}

.unitsAvailable {
  color: rgb(207, 207, 207);
  font-size: 1.2rem;
  font-weight: 600;
}
.unitsAvailableSpan {
  font-size: 0.8rem;
  color: #adadad;
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

.buyCourseTitle {
  font-size: 1.1rem;
  color: rgb(119, 119, 247);
}

.m-widget7:hover {
  .buyCourseTitle {
    color: rgb(81, 202, 206);
    font-weight: 600;
  }
  .course-title {
    color: #f3ef1f;
  }
  .courseTime {
    color: #f3ef1f;
  }
  .unitsAvailable {
    color: #f3ef1f;
  }
  .pricehighlight {
    color: #f3ef1f;
  }
}
</style>
