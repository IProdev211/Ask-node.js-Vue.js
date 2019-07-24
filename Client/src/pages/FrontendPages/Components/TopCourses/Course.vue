<template>
  <div class="mb-4 ml-auto">
    <router-link :to="'courses/' + slug">
      <div class="CourseCard hover">
        <div>
          <img class="CourseCard__courseimage" :src="thumb">
        </div>
        <div>
          <h4 class="text-center course-title pt-3">{{ title }}</h4>
        </div>
        <hr class="fadeline">
        <div class="bottom-section">
          <div class="CourseCard__course__info d-flex justify-content-between text-center py-1">
            <div>
              <p class="courseTime">
                {{ minutes }}
                <br>
                <span class="courseTimeSpan">دقیقه ویدیو</span>
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
          <div class="px-4 py-3 text-center" v-if="! purchased">
            <div class="row">
              <div class="col-12 text-center pricehighlight" v-if="isVip">اعضای ویژه</div>
              <div class="col-12 text-center pricehighlight" v-else-if="isFree">رایگان</div>
              <div class="col-6" v-if="! isVip && ! isFree">
                <p class="oldPrice" v-if="oldPrice > 0">{{ formatedOldPrice }}</p>
              </div>
              <div class="col-6 text-center" v-if="! isVip && ! isFree">
                <p class="pricehighlight">{{ formatedPrice }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="buyCourse text-center" v-if="! purchased">
          <hr class="fadeline2">
          <p class="buyCourseTitle pb-1">تهیه دوره‌</p>
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
        minutes += Math.round(
          parseInt(time[i]) * Math.pow(60, time.length - i - 2)
        );
      }
      return Math.max(minutes, 1);
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
  border-radius: 15px;
}

.pricehighlight {
  font-size: 0.9rem;
  color: #00b35f !important;
  font-family: IranSansBold !important;
  margin: 0;
  padding: 0;
}

.oldPrice {
  font-size: 0.8rem;
  color: rgb(83, 83, 83);
  text-decoration: line-through;
  margin: 0;
  padding: 0;
}

.fadeline {
  height: 1px;
  background-image: linear-gradient(
    90deg,
    rgba(255, 0, 0, 0) 40% rgba(168, 168, 168, 0.1) 50%,
    rgba(255, 0, 0, 0) 40%
  ) !important ;
  margin: 0;
}

.fadeline2 {
  height: 1px;
  background-image: linear-gradient(
    90deg,
    rgba(255, 0, 0, 0),
    rgba(181, 216, 181, 0.123) 50%,
    rgba(255, 0, 0, 0) 100%
  );
  margin: 0;
}

.course-info {
  border-top: 3px solid rgba(110, 85, 85, 0.473);
}

.CourseCard {
  background-color: #f0f0f0;
  border: 1px solid rgba(224, 224, 224, 0.6);
  -webkit-box-shadow: 0 10px 30px -5px rgba(117, 117, 117, 0.3);
  box-shadow: 0 8px 16px 4px rgba(0, 0, 0, 0.12);
  border-radius: 15px;
}

.hover:hover,
.hover:focus {
  -webkit-box-shadow: 0 10px 30px -5px rgba(117, 117, 117, 0.6);
  box-shadow: 40px rgba(121, 121, 121, 0.6);
  transition: transform 0.6s;
  -webkit-transform: translateY(-10px);
  transform: translateY(-10px);
  cursor: pointer;
}

.CourseCard__title {
  text-align: center;
}

.course-title {
  font-size: 1rem;
  font-family: IranSansBold;
  color: #424242;
}

.CourseCard .CourseCard__courseimage {
  border-radius: 15px 15px 0 0;
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
  margin: 0 14%;
}

.courseTime {
  color: rgb(78, 78, 78);
  padding-right: 0.7rem;
  font-size: 1.2rem;
  font-family: IranSansBold;
}
.courseTimeSpan {
  font-size: 0.73rem;
  color: #3f3f3f;
}

.unitsAvailable {
  color: rgb(78, 78, 78);
  padding-left: 0.7rem;
  font-size: 1.2rem;
  font-family: IranSansBold;
}
.unitsAvailableSpan {
  font-size: 0.73rem;
  color: #3f3f3f;
}

.bottom-section {
  padding: 0;
  margin: 0;
}

.buyCourseTitle {
  font-size: 1rem;
  color: rgb(86, 173, 223);
}

.CourseCard:hover {
  .buyCourseTitle {
    color: rgb(81, 202, 206);
    font-family: IranSansBold;
  }
  .course-title,
  .courseTime,
  .unitsAvailable,
  .pricehighlight {
    color: #00b35f;
  }
}

@media (max-width: 768px) {
  .CourseCard__course__info {
    margin: 0 14%;
  }

  .pricehighlight {
    font-size: 0.9rem;
  }

  .oldPrice {
    font-size: 0.8rem;
  }

  .course-title {
    font-size: 0.92rem;
  }

  .courseTimeSpan {
    font-size: 0.7rem;
  }

  .courseTime {
    font-size: 1.1rem;
  }

  .unitsAvailableSpan {
    font-size: 0.7rem;
  }

  .unitsAvailable {
    font-size: 1.1rem;
  }
}
</style>
