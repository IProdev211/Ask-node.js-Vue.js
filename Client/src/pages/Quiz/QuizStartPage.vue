<template>
  <section class="bg">
    <div class="container pt-5 text-right">
      <h1>دستورالعمل برای گرفتن امتحان</h1>

      <div class="text-center quiz-title pt-3 pb-2">
        <h2>Common Noun Quiz</h2>
        <div class="pt-2">
          <router-link to="/courses/دوره-ی-گرامر-انگلیسی">General English Course</router-link>
        </div>
      </div>

      <div class="d-flex justify-content-center py-5 text-center">
        <div class="pl-5">
          <h3 class="quiz-info">
            <span>20 دقیقه</span>
            <div class="w-100 pb-3"></div>مدت زمان امتحان
          </h3>
        </div>

        <div class="pr-5">
          <h3 class="quiz-info text-center">
            <span>28</span>
            <div class="w-100 pb-3"></div>تعداد سوالات
          </h3>
        </div>
      </div>

      <p class="pt-3 exam-description">
        آزمون تعیین سطح انگلیسی حاضر آزمون استانداری است که توسط دانشگاه کمبریج طراحی شده است. این آزمون تعیین سطح شامل 25 سوال چند گزینه ای است که همه آنها مربوط به انگلیسی عمومی می باشند.
        با پاسخ دادن به هر سوال یک امتیاز دریافت خواهید کرد و مجموع امتیازات هم 25 است. در نظر داشته باشید برای اتمام آزمون باید به تمامی سوالات پاسخ داده شود.
        با انجام این آزمون تعیین سطح آنلاین کاملا رایگان، از سطح تقریبی زبان خود آگاه خواهید شد. به طور کلی (طبق دانشگاه کمبریج) امتیازات کسب شده را می توان به با سطوح زیر تفسیر کرد:
      </p>

      <div class="py-5 text-center">
        <router-link to="/singlequizlayout">
          <base-button
            native-type="submit"
            type="success"
            class="btn btn-simple animation-on-hover"
          >Start Quiz</base-button>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.bg {
  background-color: #5622b5;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(0,960,468)'%3E%3Cstop offset='0' stop-color='%235622b5'/%3E%3Cstop offset='1' stop-color='%23b33dff'/%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='540' height='450' x='0' y='0' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.03'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25'/%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
  min-height: 75vh;
}
h1 {
  font-size: 1.7em;
  color: rgb(255, 255, 255) !important;
}
.quiz-title {
  h2 {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 600;
    font-size: 2.5em;
    padding: 0;
    margin: 0;
    color: rgb(255, 255, 255) !important;
  }
  a {
    color: rgb(255, 255, 255) !important;
    font-size: 1.5em;
  }
  a:hover {
    color: rgb(38, 204, 52) !important;
    text-decoration: underline;
  }
}
.quiz-info {
  font-size: 0.95em;
  font-family: IranSans;
  color: rgb(255, 255, 255) !important;

  span {
    color: rgb(255, 255, 255);
    font-size: 1.5em;
    padding-right: 10px;
    font-family: IranSansBold;
  }
}
.exam-description {
  font-size: 1.2em;
  text-align: center;
  color: rgb(255, 255, 255) !important;
}
.btn {
  color: #fff !important;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-weight: 600;
  font-size: 1.7em;
  text-decoration: underline;
  border-color: #fff !important;
  border-color: transparent !important;
  padding: 0;
  margin: 0;
}
.btn:hover {
  color: rgb(0, 255, 255) !important;
  box-shadow: transparent !important;
}
</style>

