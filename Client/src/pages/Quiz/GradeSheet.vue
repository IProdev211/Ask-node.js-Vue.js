<template>
  <div class="container-fluid">
    <h1 class="page-title text-right container pt-5">کارنامه شما</h1>
    <div class="quiz-result-card mb-5">
      <div class="quiz-title py-3 text-center">
        <h2>Common Noun Quiz</h2>
        <div class="pt-2">
          <router-link to="/courses/دوره-ی-گرامر-انگلیسی">General English Course</router-link>
        </div>
      </div>

      <div class="grade-section text-center">
        <h2 class="grade">78%</h2>
      </div>

      <div class="d-flex justify-content-center py-3 text-center">
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

      <p class="py-3 exam-description">
        آزمون تعیین سطح انگلیسی حاضر آزمون استانداری است که توسط دانشگاه کمبریج طراحی شده است. این آزمون تعیین سطح شامل 25 سوال چند گزینه ای است که همه آنها مربوط به انگلیسی عمومی می باشند.
        با پاسخ دادن به هر سوال یک امتیاز دریافت خواهید کرد و مجموع امتیازات هم 25 است. در نظر داشته باشید برای اتمام آزمون باید به تمامی سوالات پاسخ داده شود.
        با انجام این آزمون تعیین سطح آنلاین کاملا رایگان، از سطح تقریبی زبان خود آگاه خواهید شد. به طور کلی (طبق دانشگاه کمبریج) امتیازات کسب شده را می توان به با سطوح زیر تفسیر کرد:
      </p>

      <!-- <div class="py-5 text-center">
        <router-link to="/singlequizlayout">
          <base-button
            native-type="submit"
            type="success"
            class="btn btn-simple animation-on-hover"
          >Start Quiz</base-button>
        </router-link>
      </div>-->
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.page-title {
  font-size: 1.9rem;
  font-family: IranSansBold;
  color: #667eea !important;
}

.quiz-result-card {
  border-radius: 20px;
  padding: 1em;
  margin: 0 8em;
  background-color: #7f53ac;
  background-image: linear-gradient(315deg, #7f53ac 0%, #647dee 74%);
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
  -moz-box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
  -webkit-box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
  -o-box-shadow: 0 0 8px rgba(0, 0, 0, 0.4);
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
    color: rgb(0, 230, 19) !important;
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
  text-align: right;
  color: rgb(255, 255, 255) !important;
  padding: 1em;
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

.grade {
  font-size: 3em;
  font-family: IranSansBold;
  color: rgb(34, 241, 34) !important;
}

@media (max-width: 760px) {
  .quiz-result-card {
    margin: 0 1em;
  }
  .exam-description {
    padding: 0.5em;
  }

  .quiz-title {
    font-size: 0.8em;
  }
}
</style>