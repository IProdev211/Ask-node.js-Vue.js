<template>
  <div class="mb-4">
    <router-link :to="'courses/' + slug">
      <div class="CourseCard hover">
        <div>
          <img class="CourseCard__courseimage" :src="thumb">
        </div>
        <div>
          <h4 class="text-center font-weight-bold course-title pt-4">{{ title }}</h4>
        </div>
        <hr class="fadeline">
        <div class="CourseCard__course__info d-flex justify-content-between text-center">
          <div>
            <p class="courseTime">
              {{ minutes }}
              <br>
              <span class="courseTimeSpan">دقیقه تصویر</span>
            </p>
          </div>
          <div>
            <p class="unitsAvailable">
              {{ episodes }}
              <br>
              <span class="unitsAvailableSpan">درس گفتار</span>
            </p>
          </div>
        </div>
        <hr class="fadeline" v-if="! purchased">
        <div class="text-center" v-if="! purchased">
          <div class="row px-4">
            <div class="col-12 text-center pricehighlight" v-if="isVip">اعضای ویژه</div>
            <div class="col-12 text-center pricehighlight" v-else-if="isFree">رایگان</div>
            <div class="col-md-6" v-if="! isVip && ! isFree">
              <p class="oldPrice" v-if="oldPrice > 0">{{ formatedOldPrice }}</p>
            </div>
            <div class="col-md-6 text-center" v-if="! isVip && ! isFree">
              <p class="pricehighlight">{{ formatedPrice }}</p>
            </div>
          </div>
        </div>
        <hr class="fadeline2">
        <div class="buyCourse text-center" v-if="! purchased">
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
    'oldPrice',
    'updatedAt',
    'user',
    'episodes',
    'purchased'
  ],
  computed: {
    date() {
      return moment(this.updatedAt).format('MM/DD/YYYY');
    },
    formatedPrice() {
      return (
        new Intl.NumberFormat().format(
          parseInt(this.price.replace(',', ''), 10)
        ) + ' تومان '
      );
    },
    formatedOldPrice() {
      return (
        new Intl.NumberFormat().format(
          parseInt(this.oldPrice.replace(',', ''), 10)
        ) + ' تومان '
      );
    },
    minutes() {
      const time = this.time.split(':', 3);
      let minutes = 0;
      for (let i = 0; i < time.length; i++) {
        minutes += Math.ceil(
          parseInt(time[i]) * Math.pow(60, time.length - i - 2)
        );
      }
      return minutes;
    },
    isVip() {
      return this.type.toLowerCase() === 'vip';
    },
    isFree() {
      return this.type.toLowerCase() === 'free';
    }
  }
};
</script>


<style lang="scss" scoped>
.outline {
  border-radius: 20px;
}

.pricehighlight {
  font-size: 1.1rem;
  color: white;
  font-weight: 600;
}

.oldPrice {
  font-size: 1rem;
  color: rgb(206, 206, 206);
  font-weight: 600;
  text-decoration: line-through;
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
    rgba(181, 216, 181, 0.123) 50%,
    rgba(255, 0, 0, 0) 100%
  );
}

.course-info {
  border-top: 3px solid rgba(110, 85, 85, 0.473);
}

.CourseCard {
  background-color: #32325d;
  border-radius: 35px;
}

.hover:hover,
.hover:focus {
  -webkit-box-shadow: 0 10px 30px -5px rgba(141, 141, 141, 0.144);
  box-shadow: 10px rgba(185, 185, 185, 0.089);
  transition: transform 0.6s;
  -webkit-transform: translateY(-6px);
  transform: translateY(-6px);
  cursor: pointer;
}

.CourseCard__title {
  text-align: center;
}

.course-title {
  font-size: 1.1rem;
  color: #f1f1f1;
}

.CourseCard .CourseCard__courseimage {
  border-radius: 30px 30px 0 0;
}

.CourseCard .CourseCard__description {
  text-align: center;
  margin-top: 4rem;
  padding: 0 30px;
  font-size: 1.1rem;
}

.CourseCard .CourseCard__user {
  margin: 0 auto;
  display: table;
  margin-top: 0.35rem;
  margin-bottom: 1rem;
  margin-left: 1.9rem;
}

.CourseCard .CourseCard__user .CourseCard__user-img .CourseCard__img {
  width: 2.3rem;
  border-radius: 50%;
  margin-top: 1.14rem;
}

.CourseCard .CourseCard__user .CourseCard__info {
  display: table-cell;
}

.CourseCard .CourseCard__user .CourseCard__info .CourseCard__username {
  margin-top: 0.71rem;
  margin-left: 0.71rem;
  font-size: 0.8rem;
  font-weight: 500;
}

.CourseCard .CourseCard__user .CourseCard__info .CourseCard__time {
  margin-left: 0.71rem;
  margin-top: 0.71rem;
  font-size: 0.75rem;
}

.CourseCard .CourseCard__button {
  text-align: center;
  margin-bottom: 1.85rem;
}

.CourseCard__course__info {
  margin: 0 20%;
}

.courseTime {
  color: rgb(219, 219, 219);
  padding-right: 0.7rem;
  font-size: 1.2rem;
  font-weight: 600;
}
.courseTimeSpan {
  font-size: 0.73rem;
  color: #adadad;
}

.unitsAvailable {
  color: rgb(219, 219, 219);
  padding-left: 0.7rem;
  font-size: 1.2rem;
  font-weight: 600;
}
.unitsAvailableSpan {
  font-size: 0.73rem;
  color: #adadad;
}

.CourseCard .CourseCard__description {
  color: #575962;
}

.CourseCard .CourseCard__info .CourseCard__username {
  color: #575962;
}

.CourseCard .CourseCard__info .CourseCard__time {
  color: #9c9c9c !important;
}

.CourseCard.CourseCard--skin-dark .CourseCard__description {
  color: #fff;
}

.CourseCard.CourseCard--skin-dark .CourseCard__info .CourseCard__username {
  color: #fff;
}

.CourseCard.CourseCard--skin-dark .CourseCard__info .CourseCard__time {
  color: #fff;
}

.buyCourseTitle {
  font-size: 1.1rem;
  color: rgb(92, 92, 252);
}

.CourseCard:hover {
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
