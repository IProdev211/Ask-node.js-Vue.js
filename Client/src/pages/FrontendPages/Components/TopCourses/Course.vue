<template>
  <div class="CourseCard hover mb-4" @click="onClick">
    <img class="CourseCard__courseimage" alt="askarya-coursecard-image" :src="thumb" />
    <h4 class="text-center course-title pt-3">{{ title }}</h4>
    <hr class="fadeline" />
    <div class="bottom-section">
      <div class="CourseCard__course__info d-flex justify-content-between text-center pt-1">
        <div>
          <p class="courseTime">
            {{ minutes }}
            <br />
            <span class="courseTimeSpan">دقیقه ویدیو</span>
          </p>
        </div>
        <div>
          <p class="unitsAvailable">
            {{ episodes }}
            <br />
            <span class="unitsAvailableSpan">درس گفتار</span>
          </p>
        </div>
      </div>
      <hr class="fadeline" v-if="! purchased" />
      <div class="px-4 price-section text-center" v-if="! purchased">
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
      <hr class="fadeline" />
      <p class="buyCourseTitle py-2">تهیه دوره‌</p>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import Swal from 'sweetalert';

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
    'purchased',
    'tags'
  ],
  methods: {
    onClick() {
      if (!this.tags) {
        this.tags = '';
      }
      // console.log('salam', this.tags.toLowerCase().search('coming soon'));
      // console.log('salam', this.tags);
      if (this.tags.toLowerCase().search('coming soon') >= 0) {
        Swal({
          title: 'وضعیت دوره: در حال برگزاری',
          className: 'text-rtl',
          icon: 'info',
          button: 'بسیار خوب'
        });
      } else {
        this.$router.push('courses/' + this.slug);
      }
    }
  },
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
.CourseCard {
  background-color: #f7f7f7;
  border-radius: 15px;
  box-shadow: 0 8px 16px 4px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0 8px 16px 4px rgba(0, 0, 0, 0.2);
  -webkit-box-shadow: 0 8px 16px 4px rgba(0, 0, 0, 0.2);
  -o-box-shadow: 0 8px 16px 4px rgba(0, 0, 0, 0.2);

  .course-title {
    font-size: 1rem;
    font-family: IranSansBold;
    color: #333333;
  }

  .CourseCard__courseimage {
    border-radius: 15px 15px 0 0 !important;
    // position: relative;
  }

  .CourseCard__course__info {
    margin: 0 14%;
  }

  .courseTime {
    color: rgb(66, 66, 66);
    padding-right: 0.7rem;
    font-size: 1.4em !important;
    font-family: IranSansBold;
  }

  .courseTimeSpan {
    font-size: 0.73rem;
    color: #696969;
  }

  .unitsAvailable {
    color: rgb(66, 66, 66);
    padding-left: 0.7rem;
    font-size: 1.4em !important;
    font-family: IranSansBold;
  }

  .unitsAvailableSpan {
    font-size: 0.73rem;
    color: #696969;
  }

  .bottom-section {
    padding: 0;
    margin: 0;
  }

  .buyCourseTitle {
    font-size: 1rem;
    color: rgb(86, 173, 223);
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
    border-top: 2px solid rgba(207, 207, 207, 0.2);
    margin: 0;
  }
}

.price-section {
  padding: 0.8em 0;
}

.hover:hover,
.hover:focus {
  -webkit-box-shadow: 0 10px 30px -5px rgba(117, 117, 117, 0.65);
  box-shadow: 40px rgba(121, 121, 121, 0.65);
  transition: transform 0.8s !important;
  -webkit-transform: translateY(-8px);
  transform: translateY(-8px);
  cursor: pointer;

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

@media (max-width: 1200px) {
  .pricehighlight {
    font-size: 0.75rem;
  }

  .oldPrice {
    font-size: 0.7rem;
  }
}

@media only screen and (min-device-width: 768px) and (max-device-width: 1024px) and (orientation: landscape) {
  .CourseCard .course-title {
    font-size: 1em !important;
  }

  .CourseCard .pricehighlight {
    font-size: 0.8em;
  }

  .CourseCard .oldPrice {
    font-size: 0.8em;
  }

  .CourseCard .courseTime[data-v-81edaea2] {
    font-size: 1.1em;
  }

  .CourseCard .unitsAvailable[data-v-81edaea2] {
    font-size: 1.1em;
  }

  .CourseCard .buyCourseTitle[data-v-81edaea2] {
    font-size: 1em;
  }
}

@media (max-width: 768px) {
  .CourseCard {
    -webkit-box-shadow: 0 10px 30px -5px rgba(117, 117, 117, 0) !important;
    box-shadow: 0 8px 16px 4px rgba(0, 0, 0, 0) !important;
  }

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

  .courseTimeSpan,
  .unitsAvailableSpan {
    font-size: 0.7rem;
  }

  .courseTime,
  .unitsAvailable {
    font-size: 1.1rem;
  }
}

@media (max-width: 480px) {
  .pricehighlight {
    font-size: 0.75rem;
  }
  .course-title {
    font-size: 0.83rem;
  }
}
</style>
