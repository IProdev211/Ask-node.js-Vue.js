<template>
  <section class="bg">
    <div class="container pt-5 text-right">
      <h1>دستورالعمل برای گرفتن امتحان</h1>

      <div class="text-center quiz-title pt-5">
        <h2>Common Noun Quiz</h2>
        <div class="pt-2">
          <router-link to="/courses/دوره-ی-گرامر-انگلیسی">General English Course</router-link>
        </div>
      </div>

      <div class="d-flex justify-content-center py-5 text-center">
        <div class="pl-5">
          <h3 class="quiz-info">
            <span>20 دقیقه</span>
            <div class="w-100 pb-3"></div>محدودیت زمان امتحان
          </h3>
        </div>

        <div class="pr-5">
          <h3 class="quiz-info text-center">
            <span>28</span>
            <div class="w-100 pb-3"></div>تعداد سوالات امتحان
          </h3>
        </div>
      </div>

      <p class="pt-3 exam-description">
        آزمون تعیین سطح انگلیسی حاضر آزمون استانداری است که توسط دانشگاه کمبریج طراحی شده است. این آزمون تعیین سطح شامل 25 سوال چند گزینه ای است که همه آنها مربوط به انگلیسی عمومی می باشند.
        با پاسخ دادن به هر سوال یک امتیاز دریافت خواهید کرد و مجموع امتیازات هم 25 است. در نظر داشته باشید برای اتمام آزمون باید به تمامی سوالات پاسخ داده شود.
        با انجام این آزمون تعیین سطح آنلاین کاملا رایگان، از سطح تقریبی زبان خود آگاه خواهید شد. به طور کلی (طبق دانشگاه کمبریج) امتیازات کسب شده را می توان به با سطوح زیر تفسیر کرد:
      </p>

      <div class="py-5 text-left">
        <router-link to="/singlequizlayout">
          <base-button native-type="submit" type="default" class="btn animation-on-hover">Start Quiz</base-button>
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
  background-color: #730000;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 800 400'%3E%3Cdefs%3E%3CradialGradient id='a' cx='396' cy='281' r='514' gradientUnits='userSpaceOnUse'%3E%3Cstop offset='0' stop-color='%23b32f7a'/%3E%3Cstop offset='1' stop-color='%23730000'/%3E%3C/radialGradient%3E%3ClinearGradient id='b' gradientUnits='userSpaceOnUse' x1='400' y1='148' x2='400' y2='333'%3E%3Cstop offset='0' stop-color='%23fffb1c' stop-opacity='0'/%3E%3Cstop offset='1' stop-color='%23fffb1c' stop-opacity='0.5'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect fill='url(%23a)' width='800' height='400'/%3E%3Cg fill-opacity='0.3'%3E%3Ccircle fill='url(%23b)' cx='267.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='532.5' cy='61' r='300'/%3E%3Ccircle fill='url(%23b)' cx='400' cy='30' r='300'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}
h1 {
  font-size: 1.7em;
  color: rgb(223, 223, 223) !important;
}
.quiz-title {
  h2 {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-weight: 600;
    font-size: 2em;
    padding: 0;
    margin: 0;
    color: rgb(223, 223, 223) !important;
  }
  a {
    color: rgb(255, 255, 255) !important;
    font-size: 1.35em;
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
  color: rgb(223, 223, 223) !important;
}
</style>

